<template>
	<div class="find-trip-card">

		<div class="content">
			<div v-for="trajet in trajets" :key="trajet.id" class="elements">
				<div class="conducteur">
					<div class="avatar-container">
						<Avatar shape="circle" size="xlarge" :label="trajet.conducteur.nom[0]"/>
						<span class="name">{{ trajet.conducteur.nom }}</span>
					</div>
				</div>
				<div class="trajet-card" @click="handleShowDetails(trajet)">
					<div class="trajet-card-left">
					<span class="trajet-card-date">{{ getRelativeDate(trajet.dateHeure) }} à {{ formatTime(trajet.dateHeure)
						}}</span>
						<span class="trajet-card-depart-arrivee">{{ trajet.localisationDepart.adresse }} → {{ trajet.localisationArrivee.adresse }}</span>
						<span class="trajet-card-places">Passager - {{ randint(trajet.nombrePlaces) }} / {{ trajet.nombrePlaces }}</span>
						<span class="trajet-card-places">{{ getRandomCarModel() }}</span>
					</div>
					<div class="trajet-card-right">
						<Button class="trajet-card-button" label="Réserver" @click.stop="handleBookTrip(trajet)"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import {formatTime, getRelativeDate} from "@/utils/dateUtils.ts";
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import {TrajetResponseDTO} from "@/compositions/trajet/index.ts";
import {randint,getRandomCarModel} from "@/utils/randomUtils.ts";

const props = defineProps<{
	trajets : TrajetResponseDTO[]
}>();


const emit = defineEmits<{
	(e: 'selectedTrip', trajet: TrajetResponseDTO): void
}>();

function handleShowDetails(trajet: TrajetResponseDTO) {
	emit('selectedTrip', trajet);
}
console.log('FindTripCard props',props)

function handleBookTrip(trajet: TrajetResponseDTO) {
	// Emit an event to the parent component to handle the booking logic
	console.log('Booking trip:', trajet);
}

</script>

<style scoped lang="scss">
.find-trip-card {
	background-color: #FFF;

	.conducteur {
		.avatar-container {
			display: flex;
			align-items: center;
			gap: 16px;
			margin-bottom: 16px;

			.name {
				font-size: 18px;
				font-weight: 500;
			}
		}

	}

	.content {
		padding: 16px 0;
		display: flex;
		flex-direction: column;
		//gap: 16px;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: #CBD5E1 #F1F5F9;


		.elements {
			border-bottom: solid 1px #CBD5E1;
			padding: 16px;


			&:hover {
				box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 -4px 8px rgba(0, 0, 0, 0.2);
				transform: translateY(-2px);
				transition: box-shadow 0.5s ease, transform 0.5s ease;
				border: none;
			}

			&:active {
				transform: translateY(0);
				box-shadow: none;
			}

			&:last-child {
				border-bottom: none;
			}

			.trajet-card {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 16px;
				transition: ease-in-out 0.2s;


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
		}
	}
}

@media (max-width: 768px) {
	.find-trip-card {
		.content {
			padding: 8px 0;

			.elements {
				padding: 16px 8px;
			}
		}
	}
}
</style>