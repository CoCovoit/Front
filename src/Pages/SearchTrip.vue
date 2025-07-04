<!-- SearchTripForm.vue -->
<template>
	<section class="top-search py-4 surface-0">
		<form @submit.prevent="onSearch" class="form">
			<!-- Départ -->
			<div class="w-full md:w-4 form-input">
				<InputGroup>
					<InputGroupAddon>
						<i class="pi pi-map-marker"></i>
					</InputGroupAddon>
					<AutoComplete
							v-model="startInput"
							:suggestions="fromSuggestions"
							placeholder="Lieu de départ"
							:minLength="3"
							:delay="300"
							appendTo="body"
							forceSelection
							@complete="searchFrom"
							@item-select="onFromSelect"
					/>
				</InputGroup>
			</div>

			<!-- Arrivée -->
			<div class="w-full md:w-3 form-input">
				<InputGroup>
					<InputGroupAddon>
						<i class="pi pi-map-marker"></i>
					</InputGroupAddon>
					<AutoComplete
							v-model="endInput"
							:suggestions="toSuggestions"
							placeholder="Lieu d'arrivée"
							:minLength="3"
							:delay="300"
							appendTo="body"
							forceSelection
							@complete="searchTo"
							@select="onToSelect"
					/>
				</InputGroup>
			</div>

			<!-- Date & Heure -->
			<div class="w-full md:w-3 form-input">
				<DefaultInput
						v-model="form.date"
						type="date"
						label="Date"
						icon="pi pi-calendar"
						:inputProps="{ placeholder: 'jj/mm/aaaa' }"
				/>
			</div>
			<div class="w-full md:w-3 form-input">
				<DefaultInput
						v-model="form.time"
						type="time"
						label="Heure"
						icon="pi pi-clock"
						:inputProps="{ placeholder: 'plage horaire' }"
				/>
			</div>

			<!-- Bouton -->
			<Button
					type="submit"
					label="Rechercher"
					icon="pi pi-search"
					class="w-full md:w-auto submit-button"

					@click="onSearch"

			/>
		</form>
	</section>

	<section class="main-content">
		<section v-if="trajets.length !== 0" class="list-trip">
			<FindTripCard :trajets="trajets"     @selected-trip="handleSelectedTrip"/>
		</section>
		<section v-else>
			<div class="list-trip">
				<p>Aucun trajet trouvé pour cette recherche.</p>
			</div>
		</section>
		<section v-if="!isMobile" class="map">
			<MapComponent
					theme="light"
					:start="start"
					:end="end"
					:points-of-interest="pointsOfInterest"
					@update:start="start = $event"
					@update:end="end     = $event"
			/>
		</section>
	</section>


  <MapComponent
      theme="light"
      :points-of-interest="[
    { id:'1', position:{lat:48.86,lng:2.35}, iconUrl:'https://i.pravatar.cc/100?img=5', popupText:'Point 1' },
    { id:'2', position:{lat:48.85,lng:2.36}, iconUrl:'https://i.pravatar.cc/100?img=8', popupText:'Point 2' }
  ]"
  />
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import AutoComplete from 'primevue/autocomplete';
import Button from 'primevue/button';
import DefaultInput from '@/components/DefaultInput.vue';
import MapComponent from '@/compositions/trajet/MapComponent.vue';
import FindTripCard from '@/compositions/trajet/FindTripCard.vue';
import {TrajetResponseDTO, useTrajet} from '@/compositions/trajet';
import {useIsMobile} from '@/utils/useIsMobile.ts';

const {getTrajetByProximite} = useTrajet();

// Mobile detection
const {isMobile} = useIsMobile();

// Carte
const start = ref({lat: 45.7566177381623, lng:  4.868364463341703});
const end = ref({lat: 48.8606, lng: 2.3376});
const pointsOfInterest = [
	{id: '1', position: {lat: 48.86, lng: 2.35}, iconUrl: 'https://i.pravatar.cc/100?img=5', popupText: 'Point 1'},
	{id: '2', position: {lat: 48.85, lng: 2.36}, iconUrl: 'https://i.pravatar.cc/100?img=8', popupText: 'Point 2'}
];

// Trajets
const trajets = ref<TrajetResponseDTO[]>([]);
const selectedTrip = ref<TrajetResponseDTO | null>(null)

// Formulaire
const form = reactive({
	start: {lat: 0, lng: 0},
	end: {lat: 0, lng: 0},
	date: null as Date | null,
	time: null as Date | null
})

// Nominatim
interface NominatimItem {
	lat: string;
	lon: string;
	address?: unknown;
}

type Suggestion = NominatimItem & { display_name: string };

const startInput = ref('')
const endInput = ref('')
const fromSuggestions = ref<string[]>([]);
const toSuggestions = ref<string[]>([]);
const rawFromResults = ref<Suggestion[]>([]);
const rawToResults = ref<Suggestion[]>([]);

async function fetchPlaces(q: string): Promise<Suggestion[]> {
	const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(q)}`;
	const res = await fetch(url);
	const items = res.ok ? await res.json() as NominatimItem[] : [];
	return items.map(item => {
		const addr = item.address || {};
		const street = [addr.house_number, addr.road || addr.pedestrian]
				.filter(Boolean).join(' ');
		const city = [addr.city, addr.town, addr.village, addr.county]
				.filter(Boolean)[0] || '';
		const postcode = addr.postcode || '';
		return {
			...item,
			display_name: [street, city, postcode].filter(Boolean).join(', ')
		};
	});
}

function handleSelectedTrip(trip: TrajetResponseDTO) {
	selectedTrip.value = trip
	console.log('Selected trip:', trip);

	start.value = {
		lat: trip.localisationDepart.latitude,
		lng: trip.localisationDepart.longitude
	};
	end.value = {
		lat: trip.localisationArrivee.latitude,
		lng: trip.localisationArrivee.longitude
	};
}

// Recherche Autocomplete
function searchFrom(e: { query: string }) {
	if (e.query.length < 3) {
		fromSuggestions.value = [];
		rawFromResults.value = [];
		return;
	}
	fetchPlaces(e.query).then(data => {
		rawFromResults.value = data;
		console.log('data', data);
		fromSuggestions.value = data.map(p => p.display_name);
	});
}

function searchTo(e: { query: string }) {
	if (e.query.length < 3) {
		toSuggestions.value = [];
		rawToResults.value = [];
		return;
	}
	fetchPlaces(e.query).then(data => {
		rawToResults.value = data;
		toSuggestions.value = data.map(p => p.display_name);
	});
}

function onFromSelect(selected: object) {
	const item = rawFromResults.value.find(p => p.display_name === selected.value)
	if (item) {
		form.start.lat = parseFloat(item.lat)
		form.start.lng = parseFloat(item.lon)
	}
}

function onToSelect(selected: string) {
	const item = rawToResults.value.find(p => p.display_name === selected)
	if (item) {
		form.end.lat = parseFloat(item.lat)
		form.end.lng = parseFloat(item.lon)
	}
}


// Soumission
async function onSearch() {
	let dateTime: Date | null = null;
	if (form.date && form.time) {
		dateTime = new Date(form.date);
		dateTime.setHours(form.time.getHours(), form.time.getMinutes());
	}

	await getTrajetByProximite(form.start.lat, form.start.lng).then(data => {
		trajets.value = filterTrajetsByExactDate(data);

	}).catch(err => {
		console.error('Error fetching trajets:', err);
	});


}


/**
 * Filtre et trie un tableau de TrajetResponseDTO pour ne garder
 * que ceux dont la dateHeure tombe **le même jour** que form.date.
 * Si form.date est null, renvoie tous les trajets (mais triés par ordre croissant).
 */
function filterTrajetsByExactDate(
		data: TrajetResponseDTO[]
): TrajetResponseDTO[] {
	// Si aucune date sélectionnée, on renvoie tout (trié)
	if (!form.date) {
		return data.sort((a, b) =>
				new Date(a.dateHeure).getTime() - new Date(b.dateHeure).getTime()
		);
	}

	const year  = form.date.getFullYear();
	const month = form.date.getMonth();
	const day   = form.date.getDate();

	return data
			.filter(trajet => {
				const d = new Date(trajet.dateHeure);
				return (
						d.getFullYear()  === year  &&
						d.getMonth()     === month &&
						d.getDate()      === day
				);
			})
			.sort((a, b) =>
					new Date(a.dateHeure).getTime() - new Date(b.dateHeure).getTime()
			);
}

</script>

<style scoped lang="scss">
.form {
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
	margin: 0 auto;



}

.main-content {
	display: flex;
	gap: 16px;
	margin-top: 16px;
	height: 100%;
	max-height: 80vh;
	overflow-y: auto;
	background-color: #FFF;

	.list-trip {
		width: 40%;
		min-width: 450px;
		overflow: auto;
	}

	.map {
		flex: 1;
		height: 400px;
	}
}

@media (max-width: 780px) {
	.list-trip {
		width: 100% !important;
	}
	.form{
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
		flex-direction: column;


		&:last-child{
			justify-self: flex-end;
		}

	}
	.form-input{
		width: 80% !important;
	}
	.submit-button{
		width: 80%;
	}
}
</style>
