<template>
  <div class="map-wrapper">
    <div ref="mapContainer" class="map"></div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  withDefaults,
  defineProps,
} from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// --- Types ---
interface LatLng {
  lat: number;
  lng: number;
}
interface POI {
  id: string;
  position: LatLng;
  iconUrl: string;
  popupText?: string;
}

// Props
const props = withDefaults(
  defineProps<{
    theme: "light" | "dark";
    pointsOfInterest: POI[];
    start?: LatLng;
    end?: LatLng;
    editable?: boolean;
  }>(),
  {
    editable: true,
  }
);

const startIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const endIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Leaflet references
const mapContainer = ref<HTMLDivElement>();
let map: L.Map;
let tileLayer: L.TileLayer;
let routingControl: L.Routing.Control;
let poiLayer: L.LayerGroup;

// POI avatars
function addPOI(poi: POI) {
  const icon = L.divIcon({
    className: "poi-avatar",
    html: `<img src="${poi.iconUrl}" alt="POI icon" style="   width: 40px;   height: 40px;   border-radius: 50%;   object-fit: cover;   display: block;"/>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  L.marker(poi.position, { icon })
    .addTo(poiLayer)
    .bindPopup(poi.popupText || "");
}

// Update waypoints
function updateWaypoints(start?: LatLng, end?: LatLng) {
  console.log("updateWaypoints called with:", start, end);

  const wps: L.LatLng[] = [];
  if (start) wps.push(L.latLng(start.lat, start.lng));
  if (end) wps.push(L.latLng(end.lat, end.lng));

  console.log("Setting waypoints:", wps);
  routingControl.setWaypoints(wps);

  // Si on a les deux points, ajuster la vue pour les inclure
  if (start && end) {
    const bounds = L.latLngBounds([start.lat, start.lng], [end.lat, end.lng]);
    map.fitBounds(bounds, { padding: [20, 20] });
  }
}

// Init map
onMounted(async () => {
  const initial = {
    lat: props.start?.lat ?? 45.7566177381623,
    lng: props.start?.lng ?? 4.868364463341703,
  };
  map = L.map(mapContainer.value!, {
    zoomControl: false,
    attributionControl: false,
  }).setView([initial.lat, initial.lng], 13);

  const urls = {
    light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  };
  tileLayer = L.tileLayer(urls[props.theme], {
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(map);

  poiLayer = L.layerGroup().addTo(map);
  props.pointsOfInterest.forEach(addPOI);

  // Routing Machine with custom markers
  const initWps: L.LatLng[] = [];

  routingControl = L.Routing.control({
    waypoints: initWps,
    lineOptions: { styles: [{ color: "#007bff", weight: 4 }] },
    show: false,
    addWaypoints: false,
    fitSelectedRoutes: false,
    draggableWaypoints: props.editable,
    routeWhileDragging: props.editable,
    createMarker(i, wp) {
      // i===0 → départ, i===1 → arrivée
      const icon = i === 0 ? startIcon : endIcon;
      return L.marker(wp.latLng, {
        draggable: props.editable,
        icon: icon,
      })
        .addTo(map)
        .bindPopup(i === 0 ? "Départ" : "Arrivée")
        .on("dragend", (e) => {
          const pos = e.target.getLatLng();
          const pts = routingControl
            .getWaypoints()
            .map((w, idx) =>
              idx === i ? L.latLng(pos.lat, pos.lng) : w.latLng
            );
          routingControl.setWaypoints(pts);
        });
    },
  }).addTo(map);

  routingControl.on("waypointschanged", () => {
    routingControl.getWaypoints();
  });

  // Initialiser les waypoints si start et end sont déjà définis
  if (props.start && props.end) {
    console.log("Initial waypoints setup:", props.start, props.end);
    updateWaypoints(props.start, props.end);
  }
});

onBeforeUnmount(() => map.remove());

// Reactivity - Watch both start and end together
watch(
  () => [props.start, props.end],
  ([start, end]) => {
    console.log("Watch triggered - start:", start, "end:", end);
    if (map && routingControl) {
      updateWaypoints(start, end);
    }
  },
  {
    deep: true,
    immediate: true, // Important: déclenche immédiatement même si les valeurs sont undefined
  }
);

watch(
  () => props.theme,
  (t) =>
    tileLayer.setUrl(
      t === "light"
        ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    )
);

watch(
  () => props.pointsOfInterest,
  (list) => {
    poiLayer.clearLayers();
    list.forEach(addPOI);
  },
  { deep: true }
);
</script>

<style scoped>
.map-wrapper {
  display: flex;
  flex-direction: column;
}
.map {
  width: 100%;
  height: 80vh;
}
</style>
