<template>
  <div class="parent-map-view">
    <!-- Contrôles de recherche -->
    <div class="controls">
      <InputText
          v-model="fromSearch"
          placeholder="Point de départ"
          class="p-mr-2"
      />
      <Button
          label="Localiser"
          icon="pi pi-search"
          @click="searchFrom"
          class="p-button-outlined p-mr-4"
      />

      <InputText
          v-model="toSearch"
          placeholder="Point d’arrivée"
          class="p-mr-2"
      />
      <Button
          label="Localiser"
          icon="pi pi-search"
          @click="searchTo"
          class="p-button-outlined"
      />
    </div>

    <!-- Sélecteur de thème -->
    <div class="theme-switcher p-my-4">
      <span>Thème :</span>
      <SelectButton
          v-model="theme"
          :options="['light','dark']"
          class="p-ml-2"
      />
    </div>

    <!-- La carte -->
    <MapComponent
        class="h-80"
        :theme="theme"
        :routes="routes"
        :points-of-interest="pointsOfInterest"
    >
      <!-- slot pour personnaliser le popup des POI -->
      <template #poiPopup="{ poi }">
        <Avatar
            :image="poi.iconUrl"
            shape="circle"
            size="large"
            class="p-mb-2"
        />
        <div>{{ poi.popupText }}</div>
      </template>
    </MapComponent>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import MapComponent from '@/compositions/trajet/MapComponent.vue';

// PrimeVue components
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import Avatar from 'primevue/avatar';

// 1. État réactif
const theme = ref<'light'|'dark'>('light');

const fromSearch = ref<string>('');
const toSearch   = ref<string>('');

// Coordonnées de départ et d’arrivée
const start = ref<{ lat:number; lng:number } | null>(null);
const end   = ref<{ lat:number; lng:number } | null>(null);

// Routes et POIs
const routes = ref<Array<{
  id: string;
  path: Array<{ lat:number; lng:number }>;
  color?: string;
}>>([]);

const pointsOfInterest = ref<Array<{
  id: string;
  position: { lat:number; lng:number };
  iconUrl: string;
  popupText: string;
}>>([
  // exemples de POI
  {
    id: 'poi1',
    position: { lat: 48.8566, lng: 2.3522 },
    iconUrl: 'https://i.pravatar.cc/100?img=32',
    popupText: 'Tour Eiffel'
  },
  {
    id: 'poi2',
    position: { lat: 48.8606, lng: 2.3376 },
    iconUrl: 'https://i.pravatar.cc/100?img=47',
    popupText: 'Louvre Museum'
  }
]);

// 2. Fonctions de géocodage (Mapbox)
async function geocode(query: string) {
  const token = import.meta.env.VITE_MAPBOX_TOKEN;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${token}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.features?.length) {
    const [lng, lat] = data.features[0].center;
    return { lat, lng };
  }
  return null;
}

async function searchFrom() {
  const coord = await geocode(fromSearch.value);
  if (coord) start.value = coord;
}

async function searchTo() {
  const coord = await geocode(toSearch.value);
  if (coord) end.value = coord;
}

// 3. Calcul d’itinéraire dès que start ET end sont définis
watch([start, end], async ([s, e]) => {
  if (!s || !e) return;
  const coords = `${s.lng},${s.lat};${e.lng},${e.lat}`;
  const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;
  const res = await fetch(url);
  const json = await res.json();
  if (json.routes?.length) {
    const line = json.routes[0].geometry.coordinates.map(
        ([lng, lat]: [number, number]) => ({ lat, lng })
    );
    routes.value = [{ id: 'route1', path: line, color: '#2196F3' }];
  }
});
</script>

<style scoped>
.parent-map-view {
  display: flex;
  flex-direction: column;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.theme-switcher {
  display: flex;
  align-items: center;
}
.h-80 {
  height: 80vh;
  width: 100%;
}
</style>
