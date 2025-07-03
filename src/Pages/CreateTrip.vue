<template>
	<section class="main-content">
		<section class="left">
			<form @submit.prevent="onSubmit" class="p-fluid">
				<!-- Localisation de départ -->
				<div class="field">
					<label for="depart">Localisation de départ</label>
<!--					<AutoComplete-->
<!--							id="depart"-->
<!--							v-model="form.localisationDepart"-->
<!--							:suggestions="suggestions"-->
<!--							field="name"-->
<!--							dropdown-->
<!--							@complete="searchLocations"-->
<!--							placeholder="Rechercher..."-->
<!--							class="p-inputtext"-->
<!--					/>-->
					<Select v-model="form.localisationDepart" :options="allLocalisation" filter optionLabel="adresse" placeholder="Choisissez une adresse de départ" class="p-inputtext">
						<template #value="slotProps">
							<div v-if="slotProps.value" class="flex items-center">
								<div>{{ slotProps.value.adresse }}</div>
							</div>
							<span v-else>
            {{ slotProps.placeholder }}
        </span>
						</template>
						<template #option="slotProps">
							<div class="flex items-center">
								<div>{{ slotProps.option.adresse }}</div>
							</div>
						</template>
					</Select>
					<small v-if="errors.localisationDepart" class="p-error">{{ errors.localisationDepart }}</small>
				</div>

				<!-- Localisation d'arrivée -->
				<div class="field">
					<label for="arrivee">Localisation d'arrivée</label>
<!--					<Select filter v-model="form.localisationArrivee" placeholder="Choisissez une adresse d'arrivée"-->
<!--					        :options="suggestions" optionLabel="name" optionValue="id" class="p-inputtext"-->
<!--					/>-->
					{{ console.log('allLocalisation',allLocalisation) }}
					<Select v-model="form.localisationArrivee" :options="allLocalisation" filter optionLabel="adresse" placeholder="Choisissez une adresse d'arrivée" class="p-inputtext">
						<template #value="slotProps">
							<div v-if="slotProps.value" class="flex items-center">
								<div>{{ slotProps.value.adresse }}</div>
							</div>
							<span v-else>
            {{ slotProps.placeholder }}
        </span>
						</template>
						<template #option="slotProps">
							<div class="flex items-center">
								<div>{{ slotProps.option.adresse }}</div>
							</div>
						</template>
					</Select>

					<!--

							<AutoComplete-->
<!--							id="arrivee"-->
<!--							v-model="form.localisationArrivee"-->
<!--							:suggestions="suggestions"-->
<!--							field="name"-->
<!--							dropdown-->
<!--							@complete="searchLocations"-->
<!--							placeholder="Rechercher..."-->
<!--							class="p-inputtext"-->
<!--					/>-->
					<small v-if="errors.localisationArrivee" class="p-error">{{ errors.localisationArrivee }}</small>
				</div>

				<!-- Date & heure -->
				<div class="field">
					<DefaultInput
							id="dateHeure"
							v-model="form.dateHeure"
							type="datetime"
							label="Date & Heure"
							icon="pi pi-calendar"
							:floatLabel="true"
					/>
					<small v-if="errors.dateHeure" class="p-error">{{ errors.dateHeure }}</small>
				</div>

				<!-- Nombre de places -->
				<div class="field">
					<DefaultInput
							id="nombrePlaces"
							v-model="form.nombrePlaces"
							type="text"
							label="Nombre de places"
							icon="pi pi-users"
							:floatLabel="true"
							:inputProps="{ type: 'number', min: 1 }"
					/>
					<small v-if="errors.nombrePlaces" class="p-error">{{ errors.nombrePlaces }}</small>
				</div>

				<!-- Bouton de soumission -->
				<div class="field">
					<Button label="Créer le trajet" icon="pi pi-check" type="submit"/>
				</div>
			</form>
		</section>
		<section class="right">

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
import {ref, reactive, onMounted, watch} from 'vue';
import DefaultInput from '@/components/DefaultInput.vue';
import AutoComplete from 'primevue/autocomplete';
import Button from 'primevue/button';
import MapComponent from "@/compositions/trajet/MapComponent.vue";
import {useIsMobile} from "@/utils/useIsMobile.ts";
import {Localisation, useLocalisation} from "@/compositions/localisation";
import {Select} from "primevue";

interface FormState {
	localisationDepart: Localisation | null;
	localisationArrivee: Localisation | null;
	dateHeure: Date | null;
	nombrePlaces: number | null;
}

// Mobile detection
const {isMobile} = useIsMobile();

// Carte
const start = ref({lat: 45.762278, lng: 4.84827});
const end = ref({lat: 45.7564657, lng: 4.8683961});
const pointsOfInterest = [
	{id: '1', position: {lat: 45.746620178222656, lng: 4.868138790130615}, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQJ5EzZ4u8Bmib0W8EY4j17OBObaJVvJV5HA&s', popupText: 'Science U'},
	{id: '2', position: {lat: 48.85, lng: 2.36}, iconUrl: 'https://i.pravatar.cc/100?img=8', popupText: 'Point 2'}
];



// const conducteurId = store.state.user.id as number;

const form = reactive<FormState>({
	localisationDepart: null,
	localisationArrivee: null,
	dateHeure: null,
	nombrePlaces: null,
});

const suggestions = ref<Location[]>([]);

const errors = reactive<Partial<Record<keyof FormState, string>>>({});

const allLocalisation = ref<Localisation[]>([]);

const {getLocalisations} = useLocalisation();

onMounted(async ()=>{

	allLocalisation.value = await getLocalisations();

})

// Watcher sur la sélection du départ
watch(
		() => form.localisationDepart,
		(loc) => {
			console.log('form.localisationDepart', loc);

			if (loc) {
				// ajustez ici les noms de propriétés en fonction de votre type Localisation
				start.value = {
					lat: loc.latitude,
					lng: loc.longitude,
				};
			}
		},
		{ immediate: false } // si vous voulez initialiser dès le montage : true
);

// Watcher sur la sélection de l’arrivée
watch(
		() => form.localisationArrivee,
		(loc) => {
			console.log('form.localisationDepart', loc);

			if (loc) {
				end.value = {
					lat: loc.latitude,
					lng: loc.longitude,
				};
			}
		},
		{ immediate: false }
);
const searchLocations = async (event: { query: string }) => {
	try {
		const res = await fetch(`/api/locations?search=${encodeURIComponent(event.query)}`);
		const data: Location[] = await res.json();
		suggestions.value = data;
	} catch (err) {
		console.error(err);
		suggestions.value = [];
	}
};


const validate = (): boolean => {
	errors.localisationDepart = form.localisationDepart ? '' : 'Veuillez sélectionner une localisation de départ.';
	errors.localisationArrivee = form.localisationArrivee ? '' : 'Veuillez sélectionner une localisation d\'arrivée.';
	errors.dateHeure = form.dateHeure ? '' : 'La date et l\'heure sont requises.';
	errors.nombrePlaces =
			form.nombrePlaces && form.nombrePlaces > 0
					? ''
					: 'Le nombre de places doit être un entier positif.';
	return Object.values(errors).every(msg => !msg);
};

// const emit = defineEmits<{
// 	(e: 'create', payload: {
// 		// conducteurId: number;
// 		localisationDepartId: number;
// 		localisationArriveeId: number;
// 		dateHeure: string;
// 		nombrePlaces: number;
// 	}): void;
// }>();

const onSubmit = () => {

	console.log('onSubmit form', form);

	if (!validate()) {
		return;
	}
	// Construction de l'objet final
	const payload = {
		// conducteurId,
		localisationDepartId: form.localisationDepart!.id,
		localisationArriveeId: form.localisationArrivee!.id,
		dateHeure: form.dateHeure!.toISOString(),
		nombrePlaces: form.nombrePlaces!,
	};
	console.log('payload', payload)

	// emit('create', payload);
};
</script>

<style scoped lang="scss">
.main-content {
	display: flex;
	flex-direction: row;
	width: 100%;
	gap: 3.2rem;

	.left {
		width: 30%;
	}

	.right {
		width: 70%;
	}
}


.field {
	margin-bottom: 1.5rem;
	display: flex;
	flex-direction: column;
}

.p-error {
	margin-top: 0.4rem;
	font-size: 0.875rem;
	color:red;
}
</style>
