<template>
  <div class="map-wrapper">
    <div ref="mapContainer" class="map"></div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount, watch, withDefaults, defineProps, computed} from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import {Localisation, useLocalisation} from "../localisation/index.ts";
import {useUserStore} from "@/compositions/user/userStore.ts";

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

watch(() => props.start, (newStart) => {
	// if (newStart) {
		console.log('Start point updated:', newStart);
	// }
});

console.log('Mapcomponent props',props)

// Emits
// const emit = defineEmits<{
//   (e: 'update:start', val: LatLng): void;
//   (e: 'update:end',   val: LatLng): void;
// }>();

// Leaflet references
const mapContainer = ref<HTMLDivElement>();
let map:            L.Map;
let tileLayer:      L.TileLayer;
let routingControl: L.Routing.Control;
let poiLayer:       L.LayerGroup;

// 3) On select: update waypoints & emit
// function onFromSelect(selected: string) {
//   const item = rawFromResults.value.find(p => p.display_name === selected);
//   if (!item) return;
//   const coord = { lat: +item.lat, lng: +item.lon };
//   updateWaypoints(coord, props.end);
//   emit('update:start', coord);
// }
// function onToSelect(selected: string) {
//   const item = rawToResults.value.find(p => p.display_name === selected);
//   if (!item) return;
//   const coord = { lat: +item.lat, lng: +item.lon };
//   updateWaypoints(props.start, coord);
//   emit('update:end', coord);
// }

// 4) POI avatars
function addPOI(poi: POI) {
  const icon = L.divIcon({
    className: 'poi-avatar',
    html:  `<img src="${poi.iconUrl}" alt="POI icon" style="   width: 40px;   height: 40px;   border-radius: 50%;   object-fit: cover;   display: block;"/>`,
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

const {getLocalisations} = useLocalisation()

const allLocalisation = ref<Localisation[]>([])

const userStore = useUserStore()

const currentUser = computed(() => userStore.currentUser)


// 6) Init map
onMounted(async () => {

  // allLocalisation.value = await getLocalisations()

	console.log('currentUser.value?.localisation',currentUser.value?.localisation.latitude)
	console.log('currentUser.value?.localisation',currentUser.value?.localisation.longitude)

  // TODO: mettre la localisation par défault de la personne connectée
	// const initial = props.start ?? {
	// 	lat: currentUser.value?.localisation.latitude ?? 0,
	// 	lng: currentUser.value?.localisation.longitude ?? 0
	// };
	// const initial =  {
	// 	lat: 45.7566177381623,
	// 	lng: 4.868364463341703
	// };
	console.log('props.start.lat',props.start.lat)
	console.log('props.start.lng',props.start.lng)

	const initial =  {
		lat: props.start?.lat,
		lng:props.start?.lng
	};
	map = L.map(mapContainer.value!, { zoomControl:false, attributionControl:false })
			.setView([ initial.lat, initial.lng ], 13);

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
  // if (props.start) initWps.push(L.latLng(props.start.lat, props.start.lng));
  // if (props.end)   initWps.push(L.latLng(props.end.lat,   props.end.lng));
  initWps.push(L.latLng(45.7566177381623, 4.868364463341703));
  initWps.push(L.latLng( 45.758007,4.832016));

  routingControl = L.Routing.control({
    waypoints:           initWps,
    lineOptions:         { styles:[{ color:'#007bff', weight:4 }] },
    show:                false,
    addWaypoints:        false,
		fitSelectedRoutes:   false,
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
        // if (i===0) emit('update:start', {lat:pos.lat,lng:pos.lng});
        // if (i===1) emit('update:end',   {lat:pos.lat,lng:pos.lng});
      });
      return marker;
    }
  }).addTo(map);

  routingControl.on('waypointschanged', () => {
    const wps = routingControl.getWaypoints();
    // if (wps[0]) emit('update:start', { lat:wps[0].latLng.lat, lng:wps[0].latLng.lng });
    // if (wps[1]) emit('update:end',   { lat:wps[1].latLng.lat, lng:wps[1].latLng.lng });
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
