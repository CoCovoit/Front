<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header class="flex justify-between items-center p-4">
    <h1 class="text-2xl font-bold">CoCovoit</h1>
    <ThemeToggle />
  </header>
  <RouterView />
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
