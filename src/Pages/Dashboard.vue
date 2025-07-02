<template>
	<div class="dashboard-page">
		<div class="dashboard-page-left">
			<DefaultContainer title="Mon prochain trajet réservé">
				<div class="content">
					<NextTrip :trajet="upcomingTrips[0]"/>
				</div>
			</DefaultContainer>
			<DefaultContainer>
				<div class="content">
					<Tabs value="0" scrollable>
						<TabList>
							<Tab value="0">Trajet à venir</Tab>
							<Tab value="1">Historique des trajets</Tab>
							<Tab value="2">Trajets recommandés</Tab>
						</TabList>
						<TabPanels class="p-0">
							<TabPanel value="0" class="p-1">
								<p class="m-0">
									<UpcommingTrips :trajets="upcomingTrips" :is-past-trip=false />
								</p>
							</TabPanel>
							<TabPanel value="1">
								<p class="m-0">
									<UpcommingTrips :trajets="pastTrips" :is-past-trip=true />
								</p>
							</TabPanel>
							<TabPanel value="2">
								<p class="m-0">
									Cette partie est en cours de développement, elle sera bientôt disponible.
								</p>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</div>
			</DefaultContainer>
		</div>
		<div class="dashboard-page-right">
			<DefaultContainer title="Statistiques">
				<div class="content">
					<p>Vous n'avez pas de trajets</p>
				</div>
			</DefaultContainer>
			<DefaultContainer title="Notifications">
				<div class="content">
					<Notification title="Je suis un test" icon="pi pi-spin pi-cog"
												description="je suis une superbe description aze  sd aze  qsd azaz daz dazdazd azdjazdj aoizqdjoqjsdizahj iazh dazhdoiqahdoiazdhoiazd azoid oiaz doiazdju oaizdjiazodjaodiaz oi dioad ioazd jaoizd oaizdio aoid oiqsdoiaz oidazoid azd j"
												type="info"></Notification>
					<p>Vous n'avez pas de trajets</p>
				</div>
			</DefaultContainer>
		</div>
	</div>
</template>

<script setup lang="ts">
import {onMounted, ref, computed, watch} from 'vue';
import {Trajet, useTrajet, TrajetResponseDTO} from '../compositions/trajet';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import UpcommingTrips from '../compositions/trajet/UpcommingTrips.vue';
import NextTrip from '../compositions/trajet/NextTrip.vue';
import DefaultContainer from '../components/DefaultContainer.vue';
import {mockTrajets} from '../data/mokeTravels';
import Notification from "@/compositions/notification/Notification.vue";
import {useUserStore} from "@/compositions/user/userStore.ts";
// const trajets = ref<Trajet[]>(mockTrajets);


const userStore = useUserStore()

// const allTrips = ref<TrajetResponseDTO[]>(mockTrajets)
const allTrips = ref<TrajetResponseDTO[]>([])

const now = ref(new Date())

const currentUser = computed(() => userStore.currentUser)
const currentUserTrajets = computed(() => userStore.currentUserTrajets)

// currentUser.id = 1 // pour le mock, on force l'id à 1

// au montage, fetch + parsing des dates

watch(currentUserTrajets, (newCurrentUserTrajets) => {
  console.log('newCurrentUserTrajets',newCurrentUserTrajets)

  const test = newCurrentUserTrajets.filter(t => t.localisationArrivee.adresse === '')

  const testAlltrips = newCurrentUserTrajets.map(t => ({ ...t, dateHeure: new Date(t.dateHeure) }))
  const testpastTrips = newCurrentUserTrajets.filter(t => new Date(t.dateHeure).getTime() < Date.now())
      .sort((a, b) =>
          // on compare deux timestamps, du plus récent au plus ancien
          new Date(b.dateHeure).getTime() - new Date(a.dateHeure).getTime()
      )
  const testupcomingTrips = newCurrentUserTrajets.filter(t => new Date(t.dateHeure).getTime() > Date.now())
      .sort((a, b) =>
          // on compare deux timestamps, du plus ancien au plus récent
          new Date(a.dateHeure).getTime() - new Date(b.dateHeure).getTime()
      )

  console.log('test', test)
  console.log('testAlltrips', testAlltrips)
  console.log('testpastTrips', testpastTrips)
  console.log('testupcomingTrips', testupcomingTrips)

  allTrips.value = newCurrentUserTrajets

})

// onMounted(async () => {
// 	// await userStore.fetchUserByEmail()
//   console.log('currentUser', currentUser.value)
//
//
// 	// await userStore.fetchUserTrajets(currentUser.value?.id)
//
//   console.log('currentUserTrajet',currentUserTrajets.value)
//
//   const test = currentUserTrajets.value.filter(t => t.role === 'C')
//
//   console.log('test', test)
//
//
//   //
// 	// allTrips.value = currentUserTrajets.value
// 	// 		.map(t => ({ ...t, dateHeure: new Date(t.dateHeure) }))
// })

// filtres + tris

const pastTrips = computed(() =>
    allTrips.value
        .filter(t => new Date(t.dateHeure).getTime() < Date.now())
        .sort((a, b) =>
            // on compare deux timestamps, du plus récent au plus ancien
            new Date(b.dateHeure).getTime() - new Date(a.dateHeure).getTime()
        )
)

const upcomingTrips = computed(() =>
    allTrips.value
        .filter(t => new Date(t.dateHeure).getTime() > Date.now())
        .sort((a, b) =>
            // on compare deux timestamps, du plus ancien au plus récent
            new Date(a.dateHeure).getTime() - new Date(b.dateHeure).getTime()
        )
)

const nextTrip = computed(() =>
    upcomingTrips.value.length > 0 ? upcomingTrips.value[0] : null
)

// helpers pour l’affichage
const formatDate = (d: Date) =>
		d.toLocaleString('fr-FR', {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		})

const formatTrip = (t: TrajetResponseDTO) =>
		`${t.localisationDepart.nom} → ${t.localisationArrivee.nom} — ${formatDate(
				t.dateHeure as unknown as Date
		)}`

const nextTripDate = computed(() =>
		nextTrip.value ? formatDate(nextTrip.value.dateHeure as unknown as Date) : ''
)
</script>

<style scoped lang="scss">
.dashboard-page {
	display: flex;
	width: 100%;
	height: 100%;
	gap: 32px;

	.dashboard-page-left {
		display: flex;
		flex-direction: column;
		gap: 32px;
		width: 60%;
	}

	.dashboard-page-right {
		display: flex;
		flex-direction: column;
		gap: 32px;
		width: 40%;
	}
}

/* ===== Responsivité ===== */
@media (max-width: 780px) {
	.dashboard-page {
		flex-direction: column;
	}
	.dashboard-page-left,
	.dashboard-page-right {
		width: 100% !important;
		max-width: 100%;
	}
	.dashboard-page-right {
		padding-bottom: 32px;
	}
}

@media (max-width: 640px) {
	/* Resserrez les marges/paddings sur mobile si besoin */
	.dashboard-page {
		gap: 16px;
	}
}
</style>