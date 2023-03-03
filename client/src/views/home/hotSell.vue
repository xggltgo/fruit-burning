<template>
  <div
    class="hot-sell-container animate__animated animate__delay-1s"
    :class="{ animate__fadeInUp: use_animate }"
    :style="{ visibility: use_animate ? 'visible' : 'hidden' }"
  >
    <div class="list-item" v-for="item in hotSellList" :key="item.id">
      <Hot :productInfo="item" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Hot from '@/components/Hot.vue';
import { getProductByPage } from '@/api/product';

defineProps({
  use_animate: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// 热销商品列表
const hotSellList = ref([]);

// 获取8个热销商品
(async () => {
  const result = await getProductByPage({
    page: 1,
    limit: 8,
    status: 1,
  });
  hotSellList.value = result.productList;
})();
</script>

<style lang="scss" scoped>
.hot-sell-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.list-item {
  width: 280px;
}
</style>
