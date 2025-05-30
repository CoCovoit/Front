<template>
	<div class="mainLayout">
    <Header :user="user"/>
		<section class="page-container">
      <router-view />
		</section>
	</div>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue';

const user = {
    name: 'Matteo Nossereau',
    avatar: 'https://github.com/Matteo-Nossro.png'
}
</script>

<style scoped lang="scss">

.page-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 0 280px;
    background-color: #F9FAFB;
    margin-top: 65px;
    padding: 32px;
}

</style> 