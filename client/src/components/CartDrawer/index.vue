<template>
  <div class="cart-drawer-container">
    <el-drawer
      v-model="props.cartValue"
      :title="`${store.userInfo?.nickname} 的购物车`"
      direction="rtl"
      :before-close="handleClose"
      :size="500"
      class=""
    >
      <CartItem
        v-for="item in cartStore.cartList"
        :key="item.id"
        :cartInfo="item"
        @delete="handleDelete"
      />
      <div class="cart-footer" v-if="cartStore.cartList?.length">
        <div class="left">
          <el-checkbox v-model="allChecked" label="全选" size="large" />
        </div>
        <div class="right">
          <div class="price">
            <span class="normal">合计：</span><span class="mark">&yen;</span
            >{{ totalPrice }}
          </div>
          <div class="pay">
            <el-button type="primary" round @click="handlePay">结算</el-button>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import { useUserStore } from "@/store/user";
import { useCartStore } from "@/store/cart";
import { useReceiveStore } from "@/store/receive";
import { updateCartInfo, deleteOneCart } from "@/api/cart";
import { addOrder } from "@/api/order";
import CartItem from "./CartItem.vue";

const props = defineProps({
  cartValue: {
    type: Boolean,
    required: true,
  },
});

const router = useRouter();
const store = useUserStore();
const cartStore = useCartStore();
const receiveStore = useReceiveStore();
const emit = defineEmits();
const deleting = ref(false);

// 全选按钮状态设置
const allChecked = computed({
  get() {
    return cartStore.cartList?.every((item) => item.checked);
  },
  set(val) {
    cartStore.cartList.forEach((item) => {
      updateCartInfo(item.id, {
        checked: val,
      });
      item.checked = val;
    });
  },
});

// 商品总价
const totalPrice = computed(() =>
  cartStore.cartList.reduce((a, b) => {
    if (b.checked) {
      return a + b.quantity * b.product.price;
    } else {
      return a;
    }
  }, 0)
);

const handleClose = (done) => {
  emit("update:cartValue", false);
  done();
};

// 删除购物车中的一项
const handleDelete = async (cartid) => {
  if (deleting.value) {
    return;
  }
  deleting.value = true;
  cartStore.cartList = cartStore.cartList.filter((item) => item.id !== cartid);
  store.userInfo.cartCount -= 1;
  const result = await deleteOneCart(cartid);
  deleting.value = false;
};

// 结算
const handlePay = async () => {
  // 创建一个订单 导航到订单详情页面

  const productInfo = cartStore.cartList
    .filter((item) => item.checked === true)
    .map((item) => ({
      productid: item.product.id,
      productCount: item.quantity,
    }));
  if (productInfo.length === 0) {
    ElNotification({
      title: "温馨提示",
      message: "您还没有选中任何商品",
      type: "info",
      duration: 3000,
    });
    return;
  }
  const result = await receiveStore.getAllReceive();

  if (result.length === 0) {
    // 如果当前没有收货地址 导航到添加收货信息页面 并提示用户添加一个收货地址
    emit("update:cartValue", false);
    router.push({
      name: "receive",
    });
    ElNotification({
      title: "温馨提示",
      message: "请您添加一个默认地址后结算！",
      type: "info",
    });
    return;
  }

  const data = {
    payment: totalPrice.value,
    status: 1,
    userid: store.userInfo.id,
    receiveid: result[0].id,
    productInfo,
  };
  // 1.创建一个新的订单
  const order = await addOrder(data);
  // 关闭 购物车抽屉
  emit("update:cartValue", false);
  // 2. 导航到订单详情页面
  router.push({
    name: "orderDetail",
    params: {
      id: order.id,
    },
  });
  // 3. 更新用户cartCount字段
  store.userInfo.cartCount -= productInfo.length;
  // 4.清除对应的购物车商品
  cartStore.deteleDoneCart();
};
</script>

<style lang="scss" scoped>
@use "@/styles/var.scss" as *;

:deep(.el-drawer__title) {
  color: $dark;
  font-weight: bold;
}

:deep(.el-checkbox__label) {
  color: $dark;
}

:deep(.el-drawer__header) {
  margin: 0;
}

:deep(.el-drawer__body) {
  padding-bottom: 0;
}

.cart-footer {
  padding: 0 30px;
  background: #fff;
  height: 100px;
  width: 100%;
  position: sticky;
  bottom: 0;
  right: 0;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 0 3px #fff, 0 1px 3px #fff, -1px 0 3px #fff, 0 -1px 0 3px #fff;
  .right {
    display: flex;
    align-items: center;
    .price {
      margin-right: 15px;
      color: $base;
      font-size: 20px;
      .normal {
        color: $dark;
        font-size: 14px;
      }
      .mark {
        font-size: 12px;
      }
    }
  }
}
</style>
