<template>
  <Button class="custom-button">
    <template #default>
      <i :class=icon></i>
      <span>{{label}}</span>
    </template>
  </Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button';

defineProps({
    label: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: false
    }
})
</script>

<style scoped lang="scss">
.custom-button {
    background-color: #10B981;
    color: white;
    border: none;
    padding: 0 8px;
    height: 37px;
    text-align: center;
    border-radius: 5px;
    font-size: 14px;
    letter-spacing: 0.1rem;
    // transition: background-color 0.3s ease;
    gap: 8px;
    align-items: center;
    justify-content: center;
}
</style>
