<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
    <router-view />
</template>

<style>
/* Transitions de thème */
:root {
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Classes Tailwind pour le mode sombre */
:root.dark {
  color-scheme: dark;
}
</style>
