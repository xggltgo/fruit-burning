<template>
  <div class="new-sell-container">
    <div
      class="tip animate__animated animate__delay-0.8s"
      :class="{
        animate__fadeInLeft: use_animate,
      }"
      :style="{ visibility: use_animate ? 'visible' : 'hidden' }"
    >
      <Tip v-for="item in newSellList" :key="item.id" :productInfo="item" />
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
import { ref } from 'vue';
import Tip from '@/components/Tip.vue';
import { getProductByPage } from '@/api/product';

defineProps({
  use_animate: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// 新品商品列表
const newSellList = ref([]);

// 获取2个新品
(async () => {
  const result = await getProductByPage({
    page: 1,
    limit: 2,
    status: 2,
  });
  newSellList.value = result.productList;
})();
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
