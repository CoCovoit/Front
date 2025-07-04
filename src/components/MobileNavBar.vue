<!-- src/components/MobileNavBar.vue -->
<template>
	<nav class="mobile-nav">
		<RouterLink to="/" class="nav-item" exact-active-class="active">
			<i class="pi pi-home"></i>
			<span>Accueil</span>
		</RouterLink>
		<RouterLink to="/rechercher-un-trajet" class="nav-item" exact-active-class="active">
			<i class="pi pi-search"></i>
			<span>Trajet</span>
		</RouterLink>
		<RouterLink to="/chiffres-cles" class="nav-item" exact-active-class="active">
			<i class="pi pi-chart-line"></i>
			<span>Chiffrés</span>
		</RouterLink>
		<RouterLink to="/creer-un-trajet" class="nav-item" exact-active-class="active">
			<i class="pi pi-plus"></i>
			<span>Créer</span>
		</RouterLink>
		<RouterLink to="/profil" class="nav-item" exact-active-class="active">
			<i class="pi pi-user"></i>
			<span>Profil</span>
		</RouterLink>
	</nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped lang="scss">
.mobile-nav {
	position: fixed;
	bottom: env(safe-area-inset-bottom, 0);
	left: 0;
	right: 0;
	height: 60px;
	padding-bottom: env(safe-area-inset-bottom);
	background: #fff;
	box-shadow: 0 -1px 2px rgba(0, 0, 0, .1);
	z-index: 100;
	justify-content: space-around;
	align-items: center;
	display: flex;
}

.nav-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 12px;
	color: #444;
	text-decoration: none;
	transition: color .2s;
}
.nav-item i {
	font-size: 20px;
	line-height: 1;
}
.nav-item.active {
	color: #10B981;
}

@media (min-width: 769px) {
	.mobile-nav {
		display: none !important;
	}
}
@media (max-width: 768px) {
	.mobile-nav {
		display: flex !important;
	}
}
</style>
