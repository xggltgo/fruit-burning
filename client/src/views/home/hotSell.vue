<template>
  <div
    class="hot-sell-container animate__animated animate__delay-1s"
    :class="{ animate__fadeInUp: use_animate }"
    :style="{ visibility: use_animate ? 'visible' : 'hidden' }"
  >
    <template v-for="item in 8" key="item">
      <Hot />
    </template>
  </div>
</template>

<script setup>
import Hot from '@/components/Hot.vue';
import { defineProps } from 'vue';
defineProps({
  use_animate: {
    type: Boolean,
    required: true,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.hot-sell-container {
  // display: grid;
  // grid-template-columns: repeat(4, 1fr);
  // justify-content: center;
  // gap: 30px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
