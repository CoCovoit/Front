<template>
	<div class="header-wrapper">
		<!-- Header desktop animé -->
		<transition name="slide-down">
			<section v-if="!isMobile" class="header">
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
					<nav class="menu">
						<RouterLink to="/" class="menu-link" exact-active-class="active">Accueil</RouterLink>
						<RouterLink to="/rechercher-un-trajet" class="menu-link" exact-active-class="active">Rechercher un trajet
						</RouterLink>
						<RouterLink to="/chiffres-cles" class="menu-link" exact-active-class="active">Chiffres clés</RouterLink>
					</nav>
				</div>
				<div class="right-side">
					<RouterLink to="/creer-un-trajet">
						<MainButton icon="pi pi-plus" label="Créer un trajet"/>
					</RouterLink>
					<RouterLink to="/profil">
						<div class="avatar-container">
							<span class="text-sm">{{ currentUser?.nom }}</span>
							<Avatar shape="circle" size="xlarge"  :label="currentUser?.nom[0]"/>
						</div>
					</RouterLink>
				</div>
			</section>
		</transition>
	</div>
</template>

<script setup lang="ts">
import {RouterLink} from 'vue-router';
import MainButton from './MainButton.vue';
import Avatar from 'primevue/avatar';
import {useIsMobile} from "@/utils/useIsMobile.ts";
import {useUserStore} from "@/compositions/user/userStore.ts";
import {computed} from "vue";

const userStore = useUserStore()

const currentUser = computed(() => userStore.currentUser)

const {isMobile} = useIsMobile()

</script>

<style scoped lang="scss">
.header-wrapper {
	position: relative;
}

/* === HEADER DESKTOP === */
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 32px 14px;
	background: #fff;
	height: 65px;
	width: 100%;
	box-shadow: 0 1px 2px rgba(0, 0, 0, .05);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
}

.brand-and-nav {
	display: flex;
	align-items: center;
	gap: 48px;
}

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

.menu-link:hover,
.menu-link.active {
	color: #10B981;
}

.menu-link::after {
	content: "";
	position: absolute;
	left: 0;
	right: 0;
	bottom: -4px;
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

/* === TRANSITIONS === */
.slide-down-enter-active,
.slide-down-leave-active {
	transition: transform .3s ease, opacity .3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
	transform: translateY(-100%);
	opacity: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
	transform: translateY(0);
	opacity: 1;
}

.slide-up-enter-active,
.slide-up-leave-active {
	transition: transform .3s ease, opacity .3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
	transform: translateY(100%);
	opacity: 0;
}

.slide-up-enter-to,
.slide-up-leave-from {
	transform: translateY(0);
	opacity: 1;
}
</style>
