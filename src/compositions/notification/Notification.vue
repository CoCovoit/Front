<template>
<div :class="['notification', props.type]">
  <i :class="props.icon"></i>
  <div class="content">
    <h2 class="title">{{props.title}}</h2>
    <p class="description">{{props.description}}</p>
  </div>
</div>
</template>

<script setup lang="ts">
import {Notification} from "@/compositions/notification/index.ts";

const props = defineProps<Notification>()

</script>

<style scoped lang="scss">
.notification{
  display: flex;
  width: 100%;
  padding: 0.9rem 1.6rem;
  align-items: center;
  gap: 0.8rem;
  align-self: stretch;
  border-radius: 0.6rem;
  background: #EFF6FF;

  i{
    font-size: 2.7rem;
  }
  .content{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 0.2rem;


    .title{
      color: #000;
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
    .description{
      color: #64748B;
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis ;
      width: 100%;

    }
  }
  // ==== variantes selon le type ====

  &.success {
    background: #ECFDF5;

    i {
      color: #10B981;
    }
    .content {
      .title {
        color: #047857;
      }
    }
  }

  &.error {
    background: #FEF2F2;

    i {
      color: #EF4444;
    }
    .content {
      .title {
        color: #B91C1C;
      }
    }
  }

  &.info {
    background: #EFF6FF;

    i {
      color: #3B82F6;
    }
    .content {
      .title {
        color: #1E40AF;
      }
    }
  }

  &.warn {
    background: #FFFAEB;

    i {
      color: #F59E0B;
    }

    .content {
      .title {
        color: #92400E;
      }
    }
  }
}
</style>