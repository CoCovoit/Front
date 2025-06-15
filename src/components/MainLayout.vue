<template>
	<div class="mainLayout">
		<Header :user="user"/>
		<section class="page-container">
			<router-view />
		</section>
		<MobileNavBar />
	</div>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue';
import MobileNavBar from '../components/MobileNavBar.vue';

const user = {
	name: 'Matteo Nossereau',
	avatar: 'https://github.com/Matteo-Nossro.png'
};
</script>

<style scoped lang="scss">
.mainLayout {
	display: flex;
	flex-direction: column;
	height: 100vh;            /* 1 écran */
}

/* la seule partie scrollable */
.page-container {
	flex: 1;                  /* prend tout l’espace restant */
	overflow-y: auto;         /* permet au contenu de défiler */
	background-color: #F9FAFB;
	padding: 32px;
	margin-top: 65px;         /* pour ne pas passer sous le header desktop */
}

/* Votre media-query existante */
@media (max-width: 768px) {
	.page-container {
		margin-top: 0;          /* plus de header desktop en mobile */
	}
}
</style>
