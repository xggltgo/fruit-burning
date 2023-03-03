<template>
  <div class="cart-item-container">
    <input
      class="input"
      type="checkbox"
      :checked="cartInfo.checked"
      @change="handleChange($event, cartInfo)"
    />
    <div class="left">
      <img :src="cartInfo.product.image_sm" alt="" />
    </div>
    <div class="right">
      <div class="name">{{ cartInfo.product.name }}</div>
      <div class="desc">
        <div class="price">&yen;{{ cartInfo.product.price }}</div>
        <div class="count">
          <el-button @click="handleDecrease(cartInfo)">-</el-button>
          <span class="num">{{ cartInfo.quantity }}</span>
          <el-button @click="handleIncrease(cartInfo)">+</el-button>
        </div>
      </div>
    </div>
    <i class="iconfont icon-delete" @click="emit('delete', cartInfo.id)"></i>
  </div>
</template>

<script setup>
import { updateCartInfo } from '@/api/cart';

const emit = defineEmits();

const props = defineProps({
  cartInfo: {
    type: Object,
    required: true,
    default: () => {},
  },
});

const handleIncrease = (cartInfo) => {
  if (cartInfo.quantity === cartInfo.product.stock) {
    return;
  }
  cartInfo.quantity++;
  updateCartInfo(cartInfo.id, {
    quantity: cartInfo.quantity,
  });
};

const handleDecrease = (cartInfo) => {
  if (cartInfo.quantity === 1) {
    return;
  }
  cartInfo.quantity--;
  updateCartInfo(cartInfo.id, {
    quantity: cartInfo.quantity,
  });
};

const handleChange = (e, cartInfo) => {
  cartInfo.checked = !cartInfo.checked;
  updateCartInfo(cartInfo.id, {
    checked: cartInfo.checked,
  });
};
</script>

<style lang="scss" scoped>
@use '@/styles/var.scss' as *;
@import url('//at.alicdn.com/t/c/font_3920335_f53dc4y1i9i.css');
.cart-item-container {
  padding: 20px 30px;
  display: flex;
  align-items: center;
  box-shadow: var(--el-box-shadow-lighter);
  margin-top: 18px;
  position: relative;

  .left {
    width: 150px;
    height: 100px;
    margin: 0 15px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
  .right {
    flex-grow: 1;
    .name {
      font-weight: bold;
      margin-top: 20px;
    }
    .desc {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price {
        color: $base;
      }
      .count {
        color: $dark;
        .num {
          margin: 0 5px;
        }
      }
    }
  }
  .icon-delete {
    position: absolute;
    right: 15px;
    top: 5px;
    color: $dark;
    cursor: pointer;
  }
  .input {
    cursor: pointer;
  }
}
</style>
