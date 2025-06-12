<template>
  <div class="map-wrapper">
    <!-- Recherche hors carte -->
    <div v-if="editable" class="search-container">
      <AutoComplete
          v-model="fromModel"
          :suggestions="fromSuggestions"
          placeholder="Départ"
          :minLength="3"
          :delay="300"
          appendTo="body"
          forceSelection
          @complete="searchFrom"
          @select="onFromSelect"
      />

      <AutoComplete
          v-model="toModel"
          :suggestions="toSuggestions"
          placeholder="Arrivée"
          :minLength="3"
          :delay="300"
          appendTo="body"
          forceSelection
          @complete="searchTo"
          @select="onToSelect"
      />
    </div>

    <!-- La carte -->
    <div ref="mapContainer" class="map"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, withDefaults, defineProps, defineEmits } from 'vue';
import AutoComplete from 'primevue/autocomplete';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

interface LatLng { lat: number; lng: number; }
interface POI {
  id: string;
  position: LatLng;
  iconUrl: string;
  popupText?: string;
}

// Raw Nominatim result type
interface NominatimItem {
  lat: string;
  lon: string;
  address?: {
    house_number?: string;
    road?: string;
    pedestrian?: string;
    footway?: string;
    city?: string;
    town?: string;
    village?: string;
    county?: string;
    postcode?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

// Our suggestion type with overridden display_name
type Suggestion = NominatimItem & { display_name: string };

// Props
const props = withDefaults(defineProps<{
  theme: 'light' | 'dark';
  pointsOfInterest: POI[];
  start?: LatLng;
  end?: LatLng;
  editable?: boolean;
}>(), {
  editable: true
});

// Emits
const emit = defineEmits<{
  (e: 'update:start', val: LatLng): void;
  (e: 'update:end',   val: LatLng): void;
}>();

// Leaflet references
const mapContainer = ref<HTMLDivElement>();
let map:            L.Map;
let tileLayer:      L.TileLayer;
let routingControl: L.Routing.Control;
let poiLayer:       L.LayerGroup;

// Autocomplete state
const fromModel       = ref<string|null>(null);
const toModel         = ref<string|null>(null);
const fromSuggestions = ref<string[]>([]);
const toSuggestions   = ref<string[]>([]);
const rawFromResults  = ref<Suggestion[]>([]);
const rawToResults    = ref<Suggestion[]>([]);

// 1) Fetch & remap Nominatim
async function fetchPlaces(q: string): Promise<Suggestion[]> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(q)}`;
  const res = await fetch(url);
  const data = res.ok ? await res.json() as NominatimItem[] : [];
  return data.map(item => {
    const addr = item.address || {};
    const num      = addr.house_number || '';
    const road     = addr.road || addr.pedestrian || addr.footway || '';
    const city     = addr.city || addr.town || addr.village || addr.county || '';
    const postcode = addr.postcode || '';
    const street   = [num, road].filter(Boolean).join(' ');
    const display_name = [street, city, postcode].filter(Boolean).join(', ');
    return { ...item, display_name };
  });
}

// 2) Autocomplete handlers
function searchFrom(e: { query: string }) {
  if (e.query.length < 3) {
    fromSuggestions.value = [];
    rawFromResults.value = [];
    return;
  }
  fetchPlaces(e.query).then(data => {
    rawFromResults.value = data;
    fromSuggestions.value = data.map(p => p.display_name);
  });
}
function searchTo(e: { query: string }) {
  if (e.query.length < 3) {
    toSuggestions.value = [];
    rawToResults.value = [];
    return;
  }
  fetchPlaces(e.query).then(data => {
    rawToResults.value = data;
    toSuggestions.value = data.map(p => p.display_name);
  });
}

// 3) On select: update waypoints & emit
function onFromSelect(selected: string) {
  const item = rawFromResults.value.find(p => p.display_name === selected);
  if (!item) return;
  const coord = { lat: +item.lat, lng: +item.lon };
  updateWaypoints(coord, props.end);
  emit('update:start', coord);
}
function onToSelect(selected: string) {
  const item = rawToResults.value.find(p => p.display_name === selected);
  if (!item) return;
  const coord = { lat: +item.lat, lng: +item.lon };
  updateWaypoints(props.start, coord);
  emit('update:end', coord);
}

// 4) POI avatars
function addPOI(poi: POI) {
  const icon = L.divIcon({
    className: 'poi-div-icon',
    html: `<img src="${poi.iconUrl}" class="poi-avatar"/>`,
    iconSize:   [40,40],
    iconAnchor: [20,40]
  });
  L.marker(poi.position, { icon })
      .addTo(poiLayer)
      .bindPopup(poi.popupText || '');
}

// 5) Update waypoints
function updateWaypoints(start?: LatLng, end?: LatLng) {
  const wps: L.LatLng[] = [];
  if (start) wps.push(L.latLng(start.lat, start.lng));
  if (end)   wps.push(L.latLng(end.lat,   end.lng));
  routingControl.setWaypoints(wps);
}

// 6) Init map
onMounted(() => {
  map = L.map(mapContainer.value!, { zoomControl:false, attributionControl:false })
      .setView([48.8566,2.3522],13);
  L.control.zoom({ position:'bottomright' }).addTo(map);

  const urls = {
    light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    dark:  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
  };
  tileLayer = L.tileLayer(urls[props.theme], { subdomains:'abcd', maxZoom:19 }).addTo(map);

  poiLayer = L.layerGroup().addTo(map);
  props.pointsOfInterest.forEach(addPOI);

  // Prepare default Leaflet icon
  const defaultIcon = new L.Icon.Default();

  // Routing Machine with custom markers
  const initWps: L.LatLng[] = [];
  if (props.start) initWps.push(L.latLng(props.start.lat, props.start.lng));
  if (props.end)   initWps.push(L.latLng(props.end.lat,   props.end.lng));

  routingControl = L.Routing.control({
    waypoints:           initWps,
    lineOptions:         { styles:[{ color:'#007bff', weight:4 }] },
    show:                false,
    addWaypoints:        false,
    draggableWaypoints:  props.editable,
    routeWhileDragging:  props.editable,
    createMarker(i, wp, nWps) {
      const marker = L.marker(wp.latLng, {
        draggable: props.editable,
        icon: defaultIcon
      }).addTo(map).bindPopup(i===0?'Départ':'Arrivée');
      marker.on('dragend', e => {
        const pos = (e.target as L.Marker).getLatLng();
        // rebuild waypoints array
        const pts = routingControl.getWaypoints().map((w,i2) =>
            i2===i ? L.latLng(pos.lat,pos.lng) : w.latLng
        );
        routingControl.setWaypoints(pts);
        if (i===0) emit('update:start', {lat:pos.lat,lng:pos.lng});
        if (i===1) emit('update:end',   {lat:pos.lat,lng:pos.lng});
      });
      return marker;
    }
  }).addTo(map);

  routingControl.on('waypointschanged', () => {
    const wps = routingControl.getWaypoints();
    if (wps[0]) emit('update:start', { lat:wps[0].latLng.lat, lng:wps[0].latLng.lng });
    if (wps[1]) emit('update:end',   { lat:wps[1].latLng.lat, lng:wps[1].latLng.lng });
  });
});

onBeforeUnmount(() => map.remove());

// 7) Reactivity
watch(() => props.theme, t =>
    tileLayer.setUrl(
        t==='light'
            ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
            : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    )
);
watch(() => props.pointsOfInterest, list => {
  poiLayer.clearLayers();
  list.forEach(addPOI);
}, { deep:true });
watch(() => props.start, s => { if (s) updateWaypoints(s, props.end); });
watch(() => props.end,   e => { if (e) updateWaypoints(props.start, e); });
</script>

<style scoped>
.map-wrapper {
  display: flex;
  flex-direction: column;
}
.search-container {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}
:deep(.p-autocomplete-panel) {
  z-index: 9999 !important;
}
.map {
  width: 100%;
  height: 80vh;
}
.poi-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 3px rgba(0,0,0,0.2);
}
</style>
