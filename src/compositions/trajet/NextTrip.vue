<template>
	<div>
		<div class="next-trip-container">
			<div v-if="!isMobile" class="next-trip-left"></div>
			<div v-if="trajet !== undefined" class="next-trip-middle">
				<span class="next-trip-middle-date">{{ getRelativeDate(trajet.dateHeure)
					}} à {{ formatTime(trajet.dateHeure) }} </span>
				<span class="next-trip-middle-depart-arrivee">{{ trajet.localisationDepart.adresse
					}} → {{ trajet.localisationArrivee.adresse }}</span>
				<span class="next-trip-middle-places"> {{ role(trajet.role) }} - {{trajet.nbrReservation}} / {{ trajet.nombrePlaces
					}}</span>
			</div>
			<div class="next-trip-right">
				<Button class="next-trip-button danger" label="Annuler" @click="handleCancelTrip(trajet)"/>
				<Button class="next-trip-button" label="Voir les détails"/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {TrajetResponseDTO} from './index';
import Button from 'primevue/button';
import {getRelativeDate, formatTime} from '@/utils/dateUtils';
import {defineProps} from 'vue';
import {useIsMobile} from "@/utils/useIsMobile.ts";
import {useUserStore} from "@/compositions/user/userStore.ts";

const {isMobile} = useIsMobile()
const userStore = useUserStore();

defineProps<{
	trajet?: TrajetResponseDTO;
}>();


const handleCancelTrip = async (trajet: TrajetResponseDTO) => {
	await userStore.cancelReservation(trajet.id)
}

const role = (role: 'P' | 'C') => {
	if (role === 'C') {
		return 'Conducteur';
	} else if (role === 'P') {
		return 'Passager';
	}
	return '';
}
</script>

<style scoped lang="scss">
.next-trip-container {
	display: flex;
	align-items: center;
	padding: 16px;
	border-radius: 10px;

	.next-trip-left {
		width: 26px;

		background-color: #CBD5E1;
		border-radius: 10px;


	}

	.next-trip-middle {
		display: flex;
		flex-direction: column;
		width: 100%;

		.next-trip-middle-date {
			font-size: 14px;
			font-weight: 400;
			color: #64748B;
		}

		.next-trip-middle-depart-arrivee {
			font-size: 16px;
			font-weight: 500;
			color: #000;
		}

		.next-trip-middle-places {
			font-size: 14px;
			font-weight: 400;
			color: #64748B;
		}
	}

	.next-trip-right {
		display: flex;
		width: 35%;
		justify-content: flex-end;
		gap: 10px;

		.next-trip-button {
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

		.next-trip-button.danger {
			border: none;
			background-color: #FEF2F2;
			color: #DC2626;

			&:hover {
				background-color: #FEE2E2;
				color: #B91C1C;
				box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);
			}

			&:active {
				transform: translateY(0);
				box-shadow: none;
			}
		}

	}

}

@media (max-width: 768px) {
	.next-trip-container {
		padding: 0;
		display: flex;
		flex-direction: column;

		.next-trip-right {
			width: 100%;
		}
	}
}

</style>
