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
							:loadingIcon="null"
							@complete="searchFrom"
							@select="onFromSelect"
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
							:loadingIcon="null"
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
			/>
		</form>
	</section>

	<section class="main-content">
		<section class="list-trip">
			<FindTripCard :user="user" :trajets="trajets"/>
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
import {mockTrajets} from '@/data/mokeTravels.ts';
import {Trajet} from '@/compositions/trajet';
import {useIsMobile} from '@/utils/useIsMobile.ts';

// Mobile detection
const {isMobile} = useIsMobile();

// Carte
const start = ref({lat: 48.8566, lng: 2.3522});
const end = ref({lat: 48.8606, lng: 2.3376});
const pointsOfInterest = [
	{id: '1', position: {lat: 48.86, lng: 2.35}, iconUrl: 'https://i.pravatar.cc/100?img=5', popupText: 'Point 1'},
	{id: '2', position: {lat: 48.85, lng: 2.36}, iconUrl: 'https://i.pravatar.cc/100?img=8', popupText: 'Point 2'}
];

// Trajets
const trajets = ref<Trajet[]>(mockTrajets);
const user = {
	name: 'Matteo Nossereau',
	avatar: 'https://github.com/Matteo-Nossro.png'
};
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
	address?: any;
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

// Sélection Autocomplete
const emit = defineEmits<{
	(e: 'update:start', coord: { lat: number; lng: number }): void;
	(e: 'update:end', coord: { lat: number; lng: number }): void;
}>();

// Todo : le problème est la
function onFromSelect(selected: string) {
	console.log('onFromSelect')
	const item = rawFromResults.value.find(p => p.display_name === selected)
	console.log('onFromSelect item', item);

	if (item) {
		console.log('onFromSelect item', item);
		form.start.lat = parseFloat(item.lat)
		form.start.lng = parseFloat(item.lon)
	}
	console.log('onFromSelect form.start', form.start);

}

function onToSelect(selected: string) {
	console.log('onToSelect')

	const item = rawToResults.value.find(p => p.display_name === selected)
	console.log('onToSelect item', item);

	if (item) {
		console.log('onToSelect item', item);

		form.end.lat = parseFloat(item.lat)
		form.end.lng = parseFloat(item.lon)
	}
}


// Soumission
function onSearch() {
	let dateTime: Date | null = null;
	if (form.date && form.time) {
		dateTime = new Date(form.date);
		dateTime.setHours(form.time.getHours(), form.time.getMinutes());
	}
	// console.log(rawFromResults);
	console.log({
		start: form.start,   // { lat: ..., lng: ... }
		end: form.end,     // { lat: ..., lng: ... }
		date: form.date,
		time: form.time
	})
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
