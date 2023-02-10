<template>
  <div class="home-container">
    <Carousel />
    <Tab :title="{cn:'热卖商品',en:'New product'}" v-slot="slotProps">
      <AboutUs :animate__fadeInRight='slotProps.animate__fadeInRight' />
    </Tab>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Carousel from "./carousel.vue";
import AboutUs from './aboutUs.vue'
import Tab from '@/components/Tab.vue';
// import About from './about.vue';

</script>

<style lang="scss" scoped>
</style>
