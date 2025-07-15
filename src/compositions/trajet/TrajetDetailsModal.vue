<template>
  <div v-if="visible" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      {{ console.log("Modal is rendering, trajet:", trajet) }}
      <div class="modal-header">
        <h2>Détails du trajet</h2>
        <button class="close-button" @click="closeModal">
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
        <div class="trajet-info">
          <div class="info-section">
            <h3>Informations générales</h3>
            <div class="info-row">
              <span class="info-label">Date et heure :</span>
              <span class="info-value">{{
                formatDateTime(trajet.dateHeure)
              }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Rôle :</span>
              <span class="info-value">{{ getRoleText(trajet.role) }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Nombre de places :</span>
              <span class="info-value">{{ trajet.nombrePlaces }}</span>
            </div>
          </div>

          <div class="info-section">
            <h3>Itinéraire</h3>
            <div class="itinerary">
              <div class="itinerary-point departure">
                <div class="point-indicator"></div>
                <div class="point-info">
                  <span class="point-label">Départ</span>
                  <span class="point-address">{{
                    trajet.localisationDepart.adresse
                  }}</span>
                </div>
              </div>
              <div class="itinerary-line"></div>
              <div class="itinerary-point arrival">
                <div class="point-indicator"></div>
                <div class="point-info">
                  <span class="point-label">Arrivée</span>
                  <span class="point-address">{{
                    trajet.localisationArrivee.adresse
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="map-container">
          <MapComponent
            v-if="mapStart && mapEnd"
            theme="light"
            :start="mapStart"
            :end="mapEnd"
            :points-of-interest="[]"
            :editable="false"
          />
          {{ console.log("Map coordinates:", mapStart, mapEnd) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { map } from "leaflet";
import { ref, computed, onMounted } from "vue";
export interface TrajetResponseDTO {
  id: number;
  localisationDepart: Localisation;
  localisationArrivee: Localisation;
  conducteur?: UserResponseDTO; // Optionnel car pas toujours présent
  dateHeure: Date;
  nombrePlaces: number;
  role: "R" | "C";
}
import MapComponent from "./MapComponent.vue"; // Ajustez le chemin selon votre structure

interface Props {
  visible: boolean;
  trajet: TrajetResponseDTO | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
}>();

const closeModal = () => {
  emit("close");
};

const formatDateTime = (date: Date) => {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(date));
};

const getRoleText = (role: "R" | "C") => {
  return role === "R" ? "Conducteur" : "Passager";
};

// Computed properties pour les coordonnées de la carte
const mapStart = computed(() => {
  if (!props.trajet) return null;
  return {
    lat: props.trajet.localisationDepart.latitude,
    lng: props.trajet.localisationDepart.longitude,
  };
});

const mapEnd = computed(() => {
  if (!props.trajet) return null;
  return {
    lat: props.trajet.localisationArrivee.latitude,
    lng: props.trajet.localisationArrivee.longitude,
  };
});

// Gestion des touches clavier
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && props.visible) {
      closeModal();
    }
  };

  document.addEventListener("keydown", handleKeydown);

  return () => {
    document.removeEventListener("keydown", handleKeydown);
  };
});
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-container {
  background: white;
  border-radius: 12px;
  max-width: 1000px;
  max-height: 90vh;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
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
  padding: 24px;
  max-height: calc(90vh - 100px);
  overflow-y: auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px;
  }
}

.trajet-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-section {
  h3 {
    margin: 0 0 16px 0;
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    border-bottom: 2px solid #10b981;
    padding-bottom: 8px;
  }
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 8px 0;

  .info-label {
    font-weight: 500;
    color: #6b7280;
  }

  .info-value {
    font-weight: 600;
    color: #111827;
    text-align: right;
  }
}

.itinerary {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.itinerary-point {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;

  .point-indicator {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 3px solid;
    background: white;
    flex-shrink: 0;
  }

  .point-info {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .point-label {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .point-address {
      font-size: 14px;
      color: #111827;
    }
  }

  &.departure {
    .point-indicator {
      border-color: #10b981;
    }
    .point-label {
      color: #10b981;
    }
  }

  &.arrival {
    .point-indicator {
      border-color: #ef4444;
    }
    .point-label {
      color: #ef4444;
    }
  }
}

.itinerary-line {
  width: 3px;
  height: 30px;
  background: linear-gradient(to bottom, #10b981, #ef4444);
  margin-left: 6px;
  border-radius: 2px;
}

.map-container {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  min-height: 400px;
}

// Styles pour rendre la carte responsive dans la modal
:deep(.map-wrapper) {
  height: 100%;
}

:deep(.map) {
  height: 400px !important;
}
</style>
