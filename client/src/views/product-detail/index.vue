<template>
  <div class="product-detail-container animate__animated animate__slideInUp">
    <h1 class="page-name">商品详情</h1>
    <div class="content">
      <div class="content-left">
        <div class="detail">
          <div class="left">
            <div class="mid-image">
              <img :src="productInfo.image_mid" alt="" />
            </div>
            <div class="sm-image">
              <img :src="productInfo.image_sm" alt="" />
            </div>
          </div>
          <div class="right">
            <div class="name">
              {{ productInfo.name
              }}<el-tag v-if="productInfo.status" type="danger">{{
                productInfo.status === 1 ? "热销" : "新品"
              }}</el-tag>
            </div>
            <div class="line"></div>
            <div class="price">&yen;{{ productInfo.price }}</div>
            <el-divider border-style="dashed" />
            <div class="stock">库存：{{ productInfo.stock }}</div>
            <el-divider border-style="dashed" />
            <div class="category">
              分类：<span class="type">{{ productInfo.category?.name }}</span>
            </div>
            <div class="cart">
              <el-button
                type="primary"
                size="large"
                @click="handleAddToCart"
                :disabled="disabled"
                >加入购物车</el-button
              >
              <el-button size="large" @click="handleDecrease">-</el-button>
              <span class="num">{{ count }}</span>
              <el-button size="large" @click="handleIncrease">+</el-button>
            </div>
          </div>
        </div>

        <el-divider />
        <!-- 相关商品区域 -->
        <div class="about-other">
          <div class="title">相关商品</div>
          <div class="list">
            <div
              class="list-item"
              v-for="item in aboutProductList"
              :key="item.id"
            >
              <Hot
                :productInfo="item"
                :imageHeight="185"
                :marginBottom="0"
                :overflow="true"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧店铺信息 -->
      <div class="shop-info">
        <div class="title">金牌店铺，值得信赖</div>
        <div class="shop-info-content">
          <div class="name">GUO RAN</div>
          <!-- 此处可添加 信誉、服务、描述、物流 -->
          <div class="sub-title">
            <span class="zh-cn">热卖商品</span><span class="en">HOT SALE</span>
          </div>
          <div class="sub-content">
            <div class="list-item" v-for="item in hotSellList" :key="item.id">
              <Hot
                :productInfo="item"
                :imageHeight="85"
                :fontSize="12"
                :marginBottom="0"
                :overflow="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Hot from "@/components/Hot.vue";
import { useUserStore } from "@/store/user";
import { useCartStore } from "@/store/cart";
import { getProductById, getProductByPage } from "@/api/product";
import { addOneCart } from "@/api/cart";
import { ElNotification } from "element-plus";

const userStore = useUserStore();
const cartStore = useCartStore();
const route = useRoute();
// 指定id的商品详细信息
const productInfo = ref({});
// 相关商品列表
const aboutProductList = ref([]);
// 右侧热销商品
const hotSellList = ref([]);
// 当前商品数量，默认为 1
const count = ref(1);
// 禁用加入购物车按钮
const disabled = ref(false);

watchEffect(
  // 获取当前商品信息、获取相关商品列表
  async () => {
    // 获取当前商品信息
    const result = await getProductById(route.params.id);
    productInfo.value = result;
    // 获取相关商品列表
    const list = await getProductByPage({
      page: 1,
      limit: 5,
      categoryid: result?.categoryid || -1,
    });
    const initList = list.productList.filter(
      (item) => item.id !== +route.params.id
    );
    initList.length === 5 && initList.splice(4);
    aboutProductList.value = initList;
  }
);

// 获取热销商品列表
(async () => {
  const result = await getProductByPage({
    page: 1,
    limit: 6,
    status: 1,
  });
  hotSellList.value = result.productList;
})();

const handleDecrease = () => {
  if (count.value === 1) {
    return;
  } else {
    count.value -= 1;
  }
};

const handleIncrease = () => {
  if (count.value === productInfo.value.stock) {
    return;
  } else {
    count.value += 1;
  }
};

// 添加商品到购物车
const handleAddToCart = async () => {
  if (!userStore.userInfo) {
    ElNotification({
      title: "Error",
      message: "您尚未登录，请登录后重试！",
      type: "error",
    });
    return;
  }
  disabled.value = true;
  const item = cartStore.cartList.find(
    (item) => item.product.id === +route.params.id
  );
  if (!item) {
    userStore.userInfo.cartCount += 1;
  }
  const data = {
    userid: userStore.userInfo.id,
    productid: route.params.id,
    checked: false,
    quantity: count.value,
  };
  const result = await addOneCart(data);
  ElNotification({
    title: "Success",
    message: "成功加入至购物车！",
    type: "success",
  });
  count.value = 1;
  // 更新购物车仓库信息
  await cartStore.getAllCart();
  disabled.value = false;
};
</script>

<style lang="scss" scoped>
@use "@/styles/var.scss" as *;
.product-detail-container {
  width: 1190px;
  margin: 0 auto;
  .content {
    margin-top: 10px;
    box-shadow: var(--el-box-shadow-light);
    padding: 30px 15px;
    display: flex;
    .content-left {
      flex: 1 0 auto;
      .detail {
        display: flex;
        margin-bottom: 24px;
        .left {
          .mid-image {
            width: 375px;
            height: 235px;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .sm-image {
            width: 105px;
            height: 75px;
            margin-top: 50px;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
        .right {
          flex-grow: 1;
          margin: 0 50px;
          .name {
            font-size: 20px;
            color: $dark;
            font-family: å¾®è½¯é›…é»‘;
            height: 70px;
            line-height: 35px;
            width: 350px;
          }
          .line {
            width: 80px;
            background-color: #ddd;
            height: 3px;
            margin: 15px 0;
          }
          .price {
            font-size: 28px;
            color: $base;
            font-family: tahoma;
            line-height: 28px;
            margin-bottom: 10px;
          }
          .stock {
            font-size: 12px;
            color: #777;
            font-family: å¾®è½¯é›…é»‘;
          }
          .category {
            font-size: 12px;
            color: #777;
            font-family: å¾®è½¯é›…é»‘;
            .type {
              color: $base;
            }
          }
          .cart {
            margin-top: 30px;
            .num {
              margin: 0 5px;
            }
          }
        }
      }
    }
  }
}

// 相关商品
.about-other {
  margin-top: 15px;
  .title {
    font-size: 14px;
    font-weight: bold;
    color: #555;
    font-family: å¾®è½¯é›…é»‘;
  }
  .list {
    margin-top: 15px;
    display: flex;
    gap: 20px;
    .list-item {
      width: 215px;
    }
  }
}

// 右侧店铺信息
.shop-info {
  margin-left: 30px;
  flex-shrink: 0;
  width: 300px;
  .title {
    line-height: 1.5em;
    background-color: $dark;
    padding-top: 12px;
    padding-bottom: 8px;
    padding-right: 12px;
    padding-left: 12px;
    color: #fff;
    font-weight: bold;
  }
  .shop-info-content {
    background: rgb(244, 244, 244);
    padding: 15px 10px;
    .name {
      font-family: arial;
      font-size: 42px;
      font-weight: bold;
      color: #fff;
      line-height: 50px;
      text-shadow: 3px 0px 5px #55abe9, -3px 0px 5px #55abe9,
        0px 3px 5px #55abe9, 0px -3px 5px #55abe9;
    }
    .zh-cn {
      font-size: 20px;
      font-weight: bold;
    }
    .en {
      font-size: 14px;
      margin-left: 5px;
    }
    .sub-content {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      .list-item {
        width: 130px;
      }
    }
  }
}

:deep(.el-divider) {
  margin: 5px 0;
}

:deep(.el-tag) {
  margin-left: 10px;
}
</style>
