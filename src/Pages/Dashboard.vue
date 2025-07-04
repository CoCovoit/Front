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
					<p>Vous n'avez pas encore de statistique</p>
				</div>
			</DefaultContainer>
			<DefaultContainer title="Notifications">
				<div class="content">
					<Notification title="Je suis un test" icon="pi pi-spin pi-cog"
												description="je suis une superbe description aze  sd aze  qsd azaz daz dazdazd azdjazdj aoizqdjoqjsdizahj iazh dazhdoiqahdoiazdhoiazd azoid oiaz doiazdju oaizdjiazodjaodiaz oi dioad ioazd jaoizd oaizdio aoid oiqsdoiaz oidazoid azd j"
												type="info"></Notification>
					<p>Vous n'avez pas de notifications</p>
				</div>
			</DefaultContainer>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch} from 'vue';
import {TrajetResponseDTO} from '@/compositions/trajet';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import UpcommingTrips from '../compositions/trajet/UpcommingTrips.vue';
import NextTrip from '../compositions/trajet/NextTrip.vue';
import DefaultContainer from '../components/DefaultContainer.vue';
import Notification from "@/compositions/notification/Notification.vue";
import {useUserStore} from "@/compositions/user/userStore.ts";

const userStore = useUserStore()

const allTrips = ref<TrajetResponseDTO[]>([])

const currentUserTrajets = computed(() => userStore.currentUserTrajets)


watch(currentUserTrajets, (newCurrentUserTrajets) => {
  allTrips.value = newCurrentUserTrajets
})

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
import { mockTrajets } from '../data/mokeTravels';
const trajets = ref<Trajet[]>(mockTrajets);
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
	.dashboard-page {
		gap: 16px;
	}
}
</style>