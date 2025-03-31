<template>
	<div class="mainLayout">
    <Header />
		<section class="page-container">
      <router-view />
		</section>
	</div>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue';
</script>

<style scoped lang="scss">

</style> 