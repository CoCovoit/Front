<template>
<div class="header">
    <h1 class="text-2xl font-bold">
        <span style="color: #4285F4">C</span>
        <span style="color: #EA4335">o</span>
        <span style="color: #FBBC05">C</span>
        <span style="color: #4285F4">o</span>
        <span style="color: #34A853">v</span>
        <span style="color: #EA4335">o</span>
        <span style="color: #FBBC05">i</span>
        <span style="color: #4285F4">t</span>
    </h1>
    <div class="right-side">
        <MainButton icon="pi pi-plus" label="Créer un trajet" />
        <div class="avatar-container">
            <span class="text-sm">{{ user.name }}</span>
            <Avatar shape="circle" size="xlarge" :image="user.avatar" />
        </div>
    </div>
</div>

</template>

<script setup lang="ts">
import MainButton from './MainButton.vue';
import Avatar from 'primevue/avatar';

defineProps<{
    user: {
        name: string;
        avatar: string;
    }
}>();

</script>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px 14px;
    background-color: #fff;
    height: 65px;
    width: 100%;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    
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
    
    
}

</style>
