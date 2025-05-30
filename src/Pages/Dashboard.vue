<template>
    <div class="dashboard-page">
        <div class="dashboard-page-left">
            <DefaultContainer title="Mon prochain trajet réservé">
                <div class="content">
                    <NextTrip :trajet="trajets[0]" />
                </div>
            </DefaultContainer>
            <DefaultContainer>
                <div class="content">
                    <Tabs value="0">
                        <TabList>
                            <Tab value="0">Trajet à venir</Tab>
                            <Tab value="1">Historique des trajets</Tab>
                            <Tab value="2">Trajets recommandés</Tab>
                        </TabList>
                        <TabPanels class="p-0">
                            <TabPanel value="0" class="p-1">
                                <p class="m-0">
                                    <UpcommingTrips :trajets="trajets" />
                                </p>
                            </TabPanel>
                            <TabPanel value="1">
                                <p class="m-0">
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                </p>
                            </TabPanel>
                            <TabPanel value="2">
                                <p class="m-0">
                                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
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
                    <p>Vous n'avez pas de trajets</p>
                </div>
            </DefaultContainer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Trajet } from '../compositions/trajet';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import UpcommingTrips from '../compositions/trajet/UpcommingTrips.vue';
import NextTrip from '../compositions/trajet/NextTrip.vue';
import DefaultContainer from '../components/DefaultContainer.vue';
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
</style>