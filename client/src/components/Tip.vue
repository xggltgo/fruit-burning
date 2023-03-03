<template>
  <div class="tip-container hvr-float-shadow">
    <div
      class="image"
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
    <div class="content">
      <div
        class="title"
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
      <div class="time">上新时间：{{ formatDate(productInfo.createDate) }}</div>
      <div class="desc">
        {{ productInfo.description }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { formatDate } from '@/utils/tools';

const router = useRouter();

defineProps({
  productInfo: {
    type: Object,
    required: true,
    default: () => {},
  },
});
</script>

<style lang="scss" scoped>
.tip-container {
  width: 785px;
  height: 211px;
  border: 1px solid rgba(221, 221, 221);
  padding: 5px;
  display: flex;
  margin-bottom: 20px;
  .image {
    width: 280px;
    height: 200px;
    margin-right: 15px;
    flex-shrink: 0;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .content {
    flex-grow: 1;
    .title {
      margin-top: 25px;
      color: #333333;
      font-size: 16px;
      font-family: 微软雅黑;
      line-height: 16px;
      margin-bottom: 10px;
      font-weight: 700;
      cursor: pointer;
    }
    .time {
      color: #999;
      font-size: 13px;
      line-height: 13px;
      font-family: 微软雅黑;
    }
    .desc {
      margin-top: 20px;
      color: #777777;
      font-size: 13px;
      font-family: 微软雅黑;
      height: 75px;
      line-height: 25px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
