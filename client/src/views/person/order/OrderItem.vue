<template>
  <div class="order-item-container" :style="{ marginTop: marginTop + 'px' }">
    <div class="image">
      <img :src="productInfo.image_sm" />
    </div>
    <div class="desc">
      <div class="tip">
        <div class="name" :class="overflow ? 'overflow' : ''">
          {{ productInfo.name }}
        </div>
        <div class="price">&yen;{{ productInfo.price }}</div>
      </div>
      <div class="extra">
        <div class="status">
          <el-tag v-if="productInfo.status" type="danger">{{
            productInfo.status === 1 ? "热销" : "新品"
          }}</el-tag>
        </div>
        <div class="count">×{{ productInfo.orderDetail?.productCount }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  marginTop: {
    type: Number,
    default: 10,
  },
  productInfo: {
    type: Object,
    required: true,
    default: () => {},
  },
  overflow: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
@use "@/styles/var.scss" as *;
.order-item-container {
  color: $dark;
  display: flex;
}

.image {
  cursor: pointer;
  width: 130px;
  height: 80px;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.desc {
  flex-grow: 1;
  margin-left: 15px;
  .tip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
      font-size: 14px;
      font-weight: bold;
      &.overflow {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 80px;
      }
    }
    .price {
      font-size: 13px;
      font-weight: bold;
    }
  }
  .count {
    color: #867e7e;
    font-size: 12px;
    text-align: right;
  }
}
</style>
