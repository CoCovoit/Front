<!-- SearchTripForm.vue -->
<template>
	<section class="top-search py-4 surface-0">
		<div class="search-container mx-auto px-4 max-w-6xl">
			<!-- p-fluid = pleine largeur sur mobile ; md:flex = ligne à partir du breakpoint md -->
			<form
					@submit.prevent="onSearch"
					class="p-fluid md:flex md:align-items-end gap-3"
			>
				<!-- Destination ------------------------------------------------ -->
				<div class="w-full md:w-4">
					<DefaultInput
							v-model="form.destination"
							type="text"
							label="Destination"
							icon="pi pi-search"
					/>
				</div>

				<!-- Date -------------------------------------------------------- -->
				<div class="w-full md:w-3">
					<DefaultInput
							v-model="form.date"
							type="date"
							label="Date"
							icon="pi pi-calendar"
					/>
				</div>

				<!-- Heure ------------------------------------------------------- -->
				<div class="w-full md:w-3">
					<DefaultInput
							v-model="form.time"
							type="time"
							label="Heure"
							icon="pi pi-clock"
					/>
				</div>

				<!-- Bouton ------------------------------------------------------ -->
				<Button
						type="submit"
						label="Rechercher"
						icon="pi pi-search"
						class="w-full md:w-auto"
				/>
			</form>
		</div>
	</section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import DefaultInput from '@/components/DefaultInput.vue';
import Button       from 'primevue/button';

/* ------------------------------------------------------------------ */
/*  Modèle du formulaire                                              */
/* ------------------------------------------------------------------ */
const form = reactive<{
	destination: string;
	date: Date | null;
	time: Date | null;
}>({
	destination: '',
	date: null,
	time: null
});

/* ------------------------------------------------------------------ */
/*  Soumission                                                        */
/* ------------------------------------------------------------------ */
function onSearch() {
	// Exemple : fusionner la date et l’heure en un seul Date
	let dateTime: Date | null = null;

	if (form.date && form.time) {
		dateTime = new Date(form.date);
		dateTime.setHours(form.time.getHours(), form.time.getMinutes());
	}

	// Remplace par ta logique (appel API, emit, navigation, …)
	console.log({
		destination: form.destination.trim(),
		date: form.date,
		time: form.time,
		dateTime
	});
}
</script>

<style scoped lang="scss">
/* Ajoute tes couleurs ou images de fond ici si besoin */
.top-search {
	// background: url('/img/banner.jpg') center / cover no-repeat;
}
</style>
