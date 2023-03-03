<template>
  <div
    class="hot-container hvr-glow"
    :style="{
      marginBottom: marginBottom + 'px',
    }"
  >
    <div
      class="image"
      :style="{
        height: imageHeight + 'px',
      }"
      @click="
        router.push({
          name: 'productDetail',
          params: {
            id: productInfo.id,
          },
        })
      "
    >
      <img :src="productInfo.image_mid" alt="" />
    </div>
    <div
      class="name"
      :style="{
        fontSize: fontSize + 'px',
      }"
      @click="
        router.push({
          name: 'productDetail',
          params: {
            id: productInfo.id,
          },
        })
      "
    >
      {{ productInfo.name }}
    </div>
    <div
      class="price"
      :style="{
        fontSize: fontSize + 'px',
      }"
    >
      &yen;{{ productInfo.price }}
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
  productInfo: {
    type: Object,
    required: true,
    default: () => {},
  },
  imageHeight: {
    type: Number,
    default: 205,
  },
  fontSize: {
    type: Number,
    default: 15,
  },
  marginBottom: {
    type: Number,
    default: 30,
  },
});
</script>

<style lang="scss" scoped>
.hot-container {
  border: 1px solid rgba(229, 229, 229, 1);
  background-color: #ffffff;
  padding: 20px 0;
  width: 100%;
  text-align: center;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.03);
    .name {
      color: #555;
    }
  }
  .image {
    cursor: pointer;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .name {
    margin-top: 10px;
    color: #999;
    cursor: pointer;
  }
  .price {
    margin-top: 5px;
    color: #666;
    font-family: 微软雅黑;
  }
}
</style>
