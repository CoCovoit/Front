<template>
	<Dialog
			v-model:visible="show"
			modal
			:dismissableMask="true"
			:closable="false"
			:breakpoints="{ '640px': '90vw' }"
			style="width: 65vw ; height: 45vh"
	>
		<div class="modal-header">
			<h2>Détails du trajet</h2>
			<button class="close-button" @click="show = false">
				<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
				>
					<path
							d="M18 6L6 18M6 6l12 12"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
					/>
				</svg>
			</button>
		</div>
		<div class="modal-content">
		<form @submit.prevent="onSubmit" class="p-fluid">

			<!-- Départ -->
			<div class="field">
				<label for="depart">Localisation de départ</label>
				<Select
						v-model="form.localisationDepart"
						:options="allLocalisation"
						filter optionLabel="adresse"
						placeholder="Choisissez une adresse de départ"
				>
					<template #value="{ value, placeholder }">
						<div v-if="value">{{ value.adresse }}</div>
						<span v-else>{{ placeholder }}</span>
					</template>
					<template #option="{ option }">
						<div>{{ option.adresse }}</div>
					</template>
				</Select>
				<small v-if="errors.localisationDepart" class="p-error">{{ errors.localisationDepart }}</small>
			</div>

			<!-- Arrivée -->
			<div class="field">
				<label for="arrivee">Localisation d'arrivée</label>
				<Select
						v-model="form.localisationArrivee"
						:options="allLocalisation"
						filter optionLabel="adresse"
						placeholder="Choisissez une adresse d'arrivée"
				>
					<template #value="{ value, placeholder }">
						<div v-if="value">{{ value.adresse }}</div>
						<span v-else>{{ placeholder }}</span>
					</template>
					<template #option="{ option }">
						<div>{{ option.adresse }}</div>
					</template>
				</Select>
				<small v-if="errors.localisationArrivee" class="p-error">{{ errors.localisationArrivee }}</small>
			</div>

			<!-- Date & Heure -->
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
						label="Nombre de places"
						icon="pi pi-users"
						:floatLabel="true"
						:inputProps="{ type: 'number', min: 1 }"
				/>
				<small v-if="errors.nombrePlaces" class="p-error">{{ errors.nombrePlaces }}</small>
			</div>

			<!-- Actions -->
			<div class="field action-buttons">
				<Button label="Annuler" icon="pi pi-times" class="p-button-text" @click="onCancel" />
				<Button label="Enregistrer" icon="pi pi-check" type="submit" />
			</div>
		</form>

		<!-- Carte -->
		<div class="map-container">
			<!-- Affiche la carte avec les points de départ et d'arrivée -->
		<MapComponent
				theme="light"
				:start="start"
				:end="end"
				:points-of-interest="pointsOfInterest"
				@update:start="start = $event"
				@update:end="end   = $event"
		/>
		</div>
		</div>
	</Dialog>
</template>

<script setup lang="ts">
// imports Vue / PrimeVue
import { ref, reactive, watch, onMounted, computed } from 'vue'
import  Dialog  from 'primevue/dialog'
import  Select  from 'primevue/select'
import Button from 'primevue/button'
import DefaultInput from '@/components/DefaultInput.vue'
import MapComponent from '@/compositions/trajet/MapComponent.vue'
import { useToast } from 'primevue/usetoast'

// imports composition/localisation
import { Localisation, useLocalisation } from '@/compositions/localisation'

// imports store & types
import { useUserStore } from '../user/userStore.ts'          // ou '@/compositions/user/userStore.ts'
import { TrajetResponseDTO } from '@/compositions/trajet'

/** Props **/
const props = defineProps<{
	visible: boolean,
	trajetId: number
}>()


const emit = defineEmits<{
	(e: 'update:visible', value: boolean): void
}>()
/** Store **/
const userStore = useUserStore()

/** V-model pour la modal **/
const show = ref(props.visible)
watch(() => props.visible, v => show.value = v)
watch(show, v => emit('update:visible', v))

/** Récupération et pré-remplissage **/
const trajet = computed<TrajetResponseDTO | undefined>(
		() => userStore.currentUserTrajets.find(t => t.id === props.trajetId)
)

interface FormState {
	localisationDepart: Localisation | null
	localisationArrivee: Localisation | null
	dateHeure: Date | null
	nombrePlaces: number | null
}
const form = reactive<FormState>({
	localisationDepart: null,
	localisationArrivee: null,
	dateHeure: null,
	nombrePlaces: null
})
const errors = reactive<Partial<Record<keyof FormState,string>>>({})

const allLocalisation = ref<Localisation[]>([])
const { getLocalisations } = useLocalisation()

const start = ref({ lat: 45.762278, lng: 4.84827 })
const end   = ref({ lat: 45.7564657, lng: 4.8683961 })
const pointsOfInterest = [
	{ id: '1', position: { lat: 45.7466, lng: 4.8681 },  iconUrl:'…', popupText:'Science U' },
	{ id: '2', position: { lat: 48.85,   lng: 2.36 },    iconUrl:'…', popupText:'Point 2' }
]

const toast = useToast()

// Charger toutes les localisations
onMounted(async () => {
	allLocalisation.value = await getLocalisations()
})

// Dès qu'on a le trajet, pré-remplir le formulaire
watch(trajet, t => {
	if (!t) return
	form.localisationDepart  = t.localisationDepart
	form.localisationArrivee = t.localisationArrivee
	form.dateHeure           = new Date(t.dateHeure)
	form.nombrePlaces        = t.nombrePlaces

	start.value = { lat: t.localisationDepart.latitude,  lng: t.localisationDepart.longitude }
	end.value   = { lat: t.localisationArrivee.latitude, lng: t.localisationArrivee.longitude }
}, { immediate: true })

// Watchers carte
watch(() => form.localisationDepart, loc => loc && (start.value = { lat: loc.latitude, lng: loc.longitude }))
watch(() => form.localisationArrivee, loc => loc && (end.value   = { lat: loc.latitude, lng: loc.longitude }))

// Validation
const validate = (): boolean => {
	errors.localisationDepart  = form.localisationDepart  ? '' : 'Sélectionnez le point de départ.'
	errors.localisationArrivee = form.localisationArrivee ? '' : 'Sélectionnez le point d’arrivée.'
	errors.dateHeure           = form.dateHeure           ? '' : 'Date et heure requises.'
	errors.nombrePlaces        =
			form.nombrePlaces && form.nombrePlaces > 0
					? ''
					: 'Le nombre de places doit être un entier positif.'
	return Object.values(errors).every(e => !e)
}

// Soumission
const onSubmit = async () => {
	if (!validate() || !trajet.value) return

	// Construit un nouveau DTO complet
	const updated: TrajetResponseDTO = {
		...trajet.value,
		localisationDepart:  form.localisationDepart!,
		localisationArrivee: form.localisationArrivee!,
		dateHeure:           form.dateHeure!,
		nombrePlaces:        form.nombrePlaces!
	}

	try {
		await userStore.updateUserTrajet(updated)
		toast.add({ severity:'success', summary:'Trajet mis à jour', life:3000 })
		show.value = false
	}
	catch (err: any) {
		toast.add({ severity:'error', summary:'Erreur', detail: err.message, life:5000 })
	}
}

// Annulation
const onCancel = () => {
	show.value = false
}
</script>

<style scoped lang="scss">
.field {
	margin-bottom: 1.2rem;
	display: flex;
	flex-direction: column;
}
.p-error {
	margin-top: 0.3rem;
	font-size: 0.875rem;
	color: #d9534f;
}
.action-buttons {
	display: flex;
	justify-content: flex-end;
	gap: 0.5rem;
	margin-top: 1rem;
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 24px;
	border-bottom: 1px solid #e5e7eb;
	background: #f9fafb;

	h2 {
		margin: 0;
		font-size: 20px;
		font-weight: 600;
		color: #111827;
	}

	.close-button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 8px;
		border-radius: 6px;
		color: #6b7280;
		transition: all 0.2s;

		&:hover {
			background: #e5e7eb;
			color: #111827;
		}
	}
}
.modal-content {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 24px;
	max-height: 35vh;
	padding: 24px;
	overflow-y: hidden;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		gap: 16px;
		padding: 16px;
	}
}

.map-container {
	border-radius: 8px;
	overflow: hidden;
	border: 1px solid #e5e7eb;
	min-height: 350px;
}
</style>
