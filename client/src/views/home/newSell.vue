<template>
  <div class="new-sell-container">
    <div
      class="tip animate__animated animate__delay-0.8s"
      :class="{
        animate__fadeInLeft: use_animate,
      }"
      :style="{ visibility: use_animate ? 'visible' : 'hidden' }"
    >
      <Tip />
      <div style="height: 20px"></div>
      <Tip />
    </div>
    <div
      class="image animate__animated animate__delay-0.8s"
      :class="{
        animate__fadeInRight: use_animate,
      }"
      :style="{ visibility: use_animate ? 'visible' : 'hidden' }"
    >
      <img src="../../assets/down.png" alt="" />
    </div>
  </div>
</template>

<script setup>
import Tip from '@/components/Tip.vue';
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
.new-sell-container {
  display: flex;
  .image {
    width: 390px;
    height: 441px;
    margin-left: 20px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
