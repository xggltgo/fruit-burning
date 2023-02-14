<template>
  <div class="home-container">
    <Carousel />
    <Tab
      :title="{ cn: '关于我们', en: 'About us', margin: 40 }"
      :marginBottom="0"
      v-slot="slotProps"
    >
      <AboutUs :use_animate="slotProps.use_animate" />
    </Tab>
    <Tab
      :title="{ cn: '热卖商品', en: 'New product' }"
      :style="{ width: '1190px', marginLeft: 'auto', marginRight: 'auto' }"
      v-slot="slotProps"
    >
      <HotSell :use_animate="slotProps.use_animate" />
    </Tab>
    <Tab
      :title="{ cn: '近期上新', en: 'New product' }"
      :style="{ width: '1190px', marginLeft: 'auto', marginRight: 'auto' }"
      v-slot="slotProps"
    >
      <newSell :use_animate="slotProps.use_animate" />
    </Tab>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Carousel from './carousel.vue';
import AboutUs from './aboutUs.vue';
import Tab from '@/components/Tab.vue';
import HotSell from './hotSell.vue';
import newSell from './newSell.vue';
// import About from './about.vue';
</script>

<style lang="scss" scoped></style>
