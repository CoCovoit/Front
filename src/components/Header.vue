<template>
	<header class="header">
		<!-- Marque + menu -->
		<div class="brand-and-nav">
			<h1 class="logo text-2xl font-bold">
				<span style="color:#4285F4">C</span>
				<span style="color:#EA4335">o</span>
				<span style="color:#FBBC05">C</span>
				<span style="color:#4285F4">o</span>
				<span style="color:#34A853">v</span>
				<span style="color:#EA4335">o</span>
				<span style="color:#FBBC05">i</span>
				<span style="color:#4285F4">t</span>
			</h1>

			<!-- Menu principal -->
			<nav class="menu">
				<RouterLink to="/"        class="menu-link" active-class="active">Accueil</RouterLink>
				<RouterLink to="/Rechercher un trajet" class="menu-link" active-class="active">Trajets</RouterLink>
				<RouterLink to="/chiffres clés"  class="menu-link" active-class="active">Profil</RouterLink>
			</nav>
		</div>

		<!-- Actions + avatar -->
		<div class="right-side">
			<MainButton icon="pi pi-plus" label="Créer un trajet" />
			<div class="avatar-container">
				<span class="text-sm">{{ user.name }}</span>
				<Avatar shape="circle" size="xlarge" :image="user.avatar" />
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';         // ⬅️  indispensable si l’auto-import n’est pas activé
import MainButton from './MainButton.vue';
import Avatar      from 'primevue/avatar';

defineProps<{
	user: { name: string; avatar: string }
}>();
</script>

<style scoped lang="scss">
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 32px 14px;
	background: #fff;
	height: 65px;
	width: 100%;
	box-shadow: 0 1px 2px rgba(0,0,0,.05);
	position: fixed;
	inset: 0 0 auto 0;           /* top:0; left:0; right:0 */
	z-index: 100;
}

/* Marque + nav groupé pour que le menu reste collé au logo */
.brand-and-nav {
	display: flex;
	align-items: center;
	gap: 48px;                   /* espace entre “Cocovoit” et le menu */
}

/* Menu horizontal */
.menu {
	display: flex;
	gap: 32px;
}
.menu-link {
	font-weight: 500;
	text-decoration: none;
	color: #444;
	position: relative;
	transition: color .2s;
}
.menu-link:hover { color: #4285F4; }
.menu-link.active {
	color: #4285F4;
}
/* Petit soulignement animé (optionnel) */
.menu-link::after {
	content: "";
	position: absolute;
	left: 0; right: 0; bottom: -4px;
	height: 2px;
	background: currentColor;
	transform: scaleX(0);
	transform-origin: left;
	transition: transform .2s;
}
.menu-link:hover::after,
.menu-link.active::after {
	transform: scaleX(1);
}

/* Zone de droite (bouton + avatar) */
.right-side {
	display: flex;
	align-items: center;
	gap: 32px;

	.avatar-container {
		display: flex;
		align-items: center;
		gap: 11px;
	}
}
</style>
