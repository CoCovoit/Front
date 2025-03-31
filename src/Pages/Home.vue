<template>
    <div>
        <h1>Home</h1>
        <MainButton icon="pi pi-plus" label="Créer un trajet" />
        <DefaultContainer title="Mes trajets">
            <div class="content">
            <p>Vous n'avez pas de trajets</p>
            </div>
        </DefaultContainer>
    </div>
</template>

<script setup lang="ts">
import MainButton from '../components/MainButton.vue';
import DefaultContainer from '../components/DefaultContainer.vue';
</script>

<style scoped lang="scss">

</style>