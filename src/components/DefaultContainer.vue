<template>
    <div class="default-container" :class="styles">
        <span class="container-title">{{ title }}</span>
        <slot class="content"/>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title?: string;
    styles?: string;
}>();

</script>

<style scoped lang="scss">
.default-container {
    height: auto;
    padding: 24px;
    background-color: #FFFFFF;
    border-radius: 6px;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 16px;

    .container-title {
    font-size: 18px;
    font-weight: 600;
    color: #000000;
    }

    .content {
        font-size: 14px;
        font-weight: 400;
        color: #000000;
    }
}


</style>
