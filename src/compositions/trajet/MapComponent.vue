<template>
  <div ref="mapContainer" class="map"></div>
</template>

<script setup lang="ts">
// Vue
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

// Leaflet core + CSS
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Routing Machine
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// Control Geocoder (recherche)
// @ts-ignore
import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

// --- Types ---
interface LatLng { lat: number; lng: number; }
interface POI {
  id: string;
  position: LatLng;
  iconUrl: string;
  popupText?: string;
}

// --- Props ---
const props = defineProps<{
  theme: 'light' | 'dark';
  pointsOfInterest: POI[];
}>();

// --- References et états ---
const mapContainer = ref<HTMLDivElement>();
let map: L.Map;
let tileLayer: L.TileLayer;
let routingControl: L.Routing.Control | null = null;
let startMarker: L.Marker | null = null;
let endMarker: L.Marker | null = null;
let poiLayer: L.LayerGroup;

// --- Helpers ---
function updateRoute() {
  if (routingControl) {
    map.removeControl(routingControl);
    routingControl = null;
  }
  if (startMarker && endMarker) {
    routingControl = L.Routing.control({
      waypoints: [
        startMarker.getLatLng(),
        endMarker.getLatLng()
      ],
      lineOptions: { styles: [{ color: '#007bff', weight: 4 }] },
      draggableWaypoints: false,
      addWaypoints: false,
      fitSelectedRoutes: true,
      show: false
    }).addTo(map);
  }
}

function addPOI(poi: POI) {
  const icon = L.divIcon({
    className: 'poi-div-icon',
    html: `<img src="${poi.iconUrl}" class="poi-avatar" />`,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  });
  L.marker(poi.position, { icon })
      .addTo(poiLayer)
      .bindPopup(poi.popupText || '');
}

// --- Lifecycle ---
onMounted(() => {
  // 1) Initialisation de la carte
  map = L.map(mapContainer.value!, {
    zoomControl: false,
    attributionControl: false
  }).setView([48.8566, 2.3522], 13);

  // zoom en bas à droite
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  // 2) Tile layer simple
  const tiles = {
    light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    dark:  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
  };
  tileLayer = L.tileLayer(tiles[props.theme], {
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  // 3) Geocoder “Départ”
  const geocoderFrom = (L.Control as any).geocoder({
    placeholder: 'Départ',
    defaultMarkGeocode: false
  })
      .on('markgeocode', (e: any) => {
        const c: LatLng = e.geocode.center;
        if (startMarker) map.removeLayer(startMarker);
        startMarker = L.marker(c).addTo(map).bindPopup('Départ').openPopup();
        updateRoute();
      })
      .addTo(map);

  // 4) Geocoder “Arrivée”
  const geocoderTo = (L.Control as any).geocoder({
    placeholder: 'Arrivée',
    defaultMarkGeocode: false
  })
      .on('markgeocode', (e: any) => {
        const c: LatLng = e.geocode.center;
        if (endMarker) map.removeLayer(endMarker);
        endMarker = L.marker(c).addTo(map).bindPopup('Arrivée').openPopup();
        updateRoute();
      })
      .addTo(map);

  // 5) Couche pour les POI
  poiLayer = L.layerGroup().addTo(map);
  props.pointsOfInterest.forEach(addPOI);
});

onBeforeUnmount(() => {
  map.remove();
});

// --- Réactivité ---
watch(() => props.theme, (newTheme) => {
  tileLayer.setUrl(
      newTheme === 'light'
          ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
          : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
  );
});

watch(() => props.pointsOfInterest, (list) => {
  poiLayer.clearLayers();
  list.forEach(addPOI);
}, { deep: true });
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
.poi-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 2px rgba(0,0,0,0.3);
}
</style>
