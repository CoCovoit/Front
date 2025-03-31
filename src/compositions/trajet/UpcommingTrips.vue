<template>
    <div>
        <h1>Upcomming Trips</h1>
        <div v-for="trajet in trajets" :key="trajet.id">
            <div class="trajet-card">
                <div class="trajet-card-header">
                    <h2>{{ trajet.date }}</h2>
                </div>
                <div class="trajet-card-body">
                    <p>{{ trajet.adresseDepart }}</p>
                    <p>{{ trajet.adresseArrivee }}</p>
                    <p>{{ trajet.heureDebut }}</p>
                    <p>{{ trajet.heureFin }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Trajet } from './index';
defineProps<{
    trajets: Trajet[];
}>();


</script>

<style scoped lang="scss">

</style>
