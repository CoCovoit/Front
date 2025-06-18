<template>
	<div class="trajet-card-container">
		<div v-for="trajet in trajets" :key="trajet.id">
			<div class="trajet-card" @click="handleShowDetails(trajet)">
				<div class="trajet-card-left">
					<span class="trajet-card-date">{{ getRelativeDate(trajet.dateHeure) }} à {{ formatTime(trajet.dateHeure)
						}}</span>
					<span class="trajet-card-depart-arrivee">{{ trajet.depart }} → {{ trajet.arrivee }}</span>
					<span class="trajet-card-places"> - {{ trajet.placesDisponibles }} / {{ trajet.places }}</span>
				</div>
				<div v-if="!isMobile" class="trajet-card-right">
					<Button class="trajet-card-button" label="Détails" @click="handleShowDetails(trajet)"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {Trajet} from './index';
import Button from 'primevue/button';
import {getRelativeDate, formatTime} from '@/utils/dateUtils';
import {useIsMobile} from "@/utils/useIsMobile.ts";


const {isMobile} = useIsMobile()

defineProps<{
	trajets: Trajet[];
}>();

// TODO: faire la logique de détails du trajet
const handleShowDetails = (trajet: Trajet) => {
	console.log('handleShowDetails trajet', trajet);
}

</script>

<style scoped lang="scss">
.trajet-card-container {
	margin: 16px 0;
	display: flex;
	flex-direction: column;
	gap: 16px;
	max-height: 500px;
	overflow-y: auto;
	scrollbar-width: thin;
	scrollbar-color: #CBD5E1 #F1F5F9;

	.trajet-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px;
		border-radius: 10px;
		border: 1px solid #CBD5E1;
		transition: ease-in-out 0.2s;


		&:hover {
			transition: ease-in-out 0.2s;
			box-shadow: 0 0px 4px rgba(16, 185, 129, 0.25);
			border: 1px solid #10B981;
		}
	}

	.trajet-card-left {
		display: flex;
		// align-items: center;
		flex-direction: column;

		.trajet-card-date {
			font-size: 14px;
			font-weight: 400;
			color: #64748B;
		}

		.trajet-card-depart-arrivee {
			font-size: 16px;
			font-weight: 500;
			color: #000;
		}

		.trajet-card-places {
			font-size: 14px;
			font-weight: 400;
			color: #64748B;
		}
	}

	.trajet-card-right {
		display: flex;
		align-items: center;
		gap: 10px;

		.trajet-card-button {
			border: 1px solid #CBD5E1;
			background-color: transparent;
			color: #000;
			border-radius: 6px;
			padding: 9px 16px;
			font-size: 14px;
			font-weight: 600;
			transition: all 0.2s ease-in-out;

			&:hover {
				background-color: #CBD5E1;
				transform: translateY(-2px);
				box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
			}

			&:active {
				transform: translateY(0);
				box-shadow: none;
			}
		}
	}
}
</style>
