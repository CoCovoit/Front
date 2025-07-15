<template>
  <div class="trajet-card-container">
    <div v-for="trajet in trajets" :key="trajet.id">
      <div class="trajet-card" @click="handleShowDetails(trajet)">
        <div class="trajet-card-left">
          <span class="trajet-card-date"
            >{{ getRelativeDate(trajet.dateHeure) }} à
            {{ formatTime(trajet.dateHeure) }}</span
          >
          <span class="trajet-card-depart-arrivee"
            >{{ trajet.localisationDepart.adresse }} →
            {{ trajet.localisationArrivee.adresse }}</span
          >
          <span class="trajet-card-places"
            >{{ role(trajet.role) }} - {{ trajet.nbrReservation}} / {{ trajet.nombrePlaces }}</span>
				</div>
				<div v-if="!isMobile || isPastTrip" class="trajet-card-right">
					<Button v-if="!isPastTrip" class="next-trip-button danger" label="Annuler" @click="handleCancelTrip(trajet)"/>
          <Button
            class="trajet-card-button"
            label="Détails"
            @click.stop="handleShowDetails(trajet)"
          />
        </div>
      </div>
    </div>

    <!-- Modal pour les détails du trajet -->
    <TrajetDetailsModal
      :visible="showDetailsModal"
      :trajet="selectedTrajet"
      @close="closeDetailsModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {  TrajetResponseDTO } from "./index";
import Button from "primevue/button";
import { getRelativeDate, formatTime } from "@/utils/dateUtils";
import { useIsMobile } from "@/utils/useIsMobile.ts";
import { useUserStore } from "@/compositions/user/userStore.ts";
import TrajetDetailsModal from "./TrajetDetailsModal.vue";


const {isMobile} = useIsMobile()
const userStore = useUserStore();


defineProps<{
	trajets: TrajetResponseDTO[];
	isPastTrip : boolean;
}>();



const showDetailsModal = ref(false);
const selectedTrajet = ref<TrajetResponseDTO | null>(null);

// État pour la modal
const showDetailsModal = ref(false);
const selectedTrajet = ref<TrajetResponseDTO | null>(null);

console.log("Component mounted, initial modal state:", showDetailsModal.value);

const handleShowDetails = (trajet: TrajetResponseDTO) => {
	console.log("handleShowDetails trajet", trajet);
	selectedTrajet.value = trajet;
	showDetailsModal.value = true;
	console.log("Modal state:", showDetailsModal.value);
	console.log("Selected trajet:", selectedTrajet.value);
};

const handleCancelTrip = async (trajet: TrajetResponseDTO) => {
	await userStore.cancelReservation(trajet.id)
}

const handleCancelTrip = async (trajet: TrajetResponseDTO) => {
	await userStore.cancelReservation(trajet.id)
}

const role = (role : 'P' | 'C') => {
	if (role === 'C') {
		return 'Conducteur';
	} else if (role === 'P') {
		return 'Passager';
	}
	return '';
}

const closeDetailsModal = () => {
  showDetailsModal.value = false;
  selectedTrajet.value = null;
};

const role = (role: "R" | "C") => {
  if (role === "R") {
    return "Conducteur";
  } else if (role === "C") {
    return "Passager";
  }
  return "";
};
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
  scrollbar-color: #cbd5e1 #f1f5f9;

  .trajet-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-radius: 10px;
    border: 1px solid #cbd5e1;
    transition: ease-in-out 0.2s;

    &:hover {
      transition: ease-in-out 0.2s;
      box-shadow: 0 0px 4px rgba(16, 185, 129, 0.25);
      border: 1px solid #10b981;
    }
  }

  .trajet-card-left {
    display: flex;
    // align-items: center;
    flex-direction: column;

    .trajet-card-date {
      font-size: 14px;
      font-weight: 400;
      color: #64748b;
    }

    .trajet-card-depart-arrivee {
      font-size: 16px;
      font-weight: 500;
      color: #000;
    }

    .trajet-card-places {
      font-size: 14px;
      font-weight: 400;
      color: #64748b;
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

.next-trip-button.danger {
	border: none;
	background-color: #FEF2F2;
	color: #DC2626;
	border-radius: 6px;
	padding: 9px 16px;
	font-size: 14px;
	font-weight: 600;
	transition: all 0.2s ease-in-out;


	&:hover {
		background-color: #FEE2E2 !important;
		color: #B91C1C !important;
		box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);
		border: none;
	}

	&:active {
		transform: translateY(0);
		box-shadow: none;
	}
}
</style>
