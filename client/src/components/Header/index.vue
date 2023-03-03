<template>
  <div class="header-container">
    <div class="top-bar">
      <div class="left">
        <div class="logo">
          <img src="../../assets/logo.png" alt="" />
        </div>
      </div>
      <div class="right">
        <div class="search">
          <div class="mt-4">
            <el-input
              @keyup.enter="handleSearch"
              v-model="searchText"
              placeholder="搜索商品关键字"
              class="input-with-select"
            >
              <template #append>
                <IEpSearch @click="handleSearch" />
              </template>
            </el-input>
          </div>
        </div>
        <!-- 登录 注册 -->
        <div class="user" @click="handleUserClick">
          <el-icon size="20" v-if="!userInfo"><IEpUser /></el-icon>
          <el-dropdown v-else>
            <el-avatar :size="50" :src="userInfo.avatar" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="router.push({ name: 'info' })"
                  >个人中心</el-dropdown-item
                >
                <el-dropdown-item divided @click="handleLoginOut"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <!-- 购物车 -->
        <div class="cart" @click="handleCartClick">
          <el-badge
            :value="userInfo?.cartCount"
            class="item"
            type="primary"
            :max="10"
          >
            <el-icon size="20"><IEpShoppingCartFull /></el-icon>
          </el-badge>
        </div>
      </div>
    </div>
    <nav class="nav">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        :router="true"
        style="--el-menu-text-color: #fff"
      >
        <el-menu-item index="/"> 商城首页</el-menu-item>
        <el-menu-item index="/all">所有商品</el-menu-item>
        <!-- <el-menu-item index="/dynamic">商城动态</el-menu-item> -->
        <!-- <el-menu-item index="/pay">支付方式</el-menu-item> -->
        <el-menu-item index="/about">关于店铺</el-menu-item>
        <!-- <el-menu-item index="/offline">线下门店</el-menu-item> -->
        <el-menu-item index="/person/info" v-show="userInfo"
          >个人中心</el-menu-item
        >
      </el-menu>
    </nav>
  </div>
  <!-- 登录注册  -->
  <Login v-model="dialogVisible" />
  <!-- 购物车抽屉 -->
  <CartDrawer v-model:cartValue="drawerVisible" />
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, watch, computed } from 'vue';

import { useUserStore } from '@/store/user';
import Login from '@/components/login/index.vue';
import CartDrawer from '@/components/CartDrawer/index.vue';

const router = useRouter();
const store = useUserStore();

const dialogVisible = ref(false);
const drawerVisible = ref(false);
const route = useRoute();
const searchText = ref('');
let activeIndex = ref('');

const userInfo = computed(() => store.userInfo);

// 用户点击icon 登录
function handleUserClick() {
  if (userInfo.value) {
    return;
  }
  dialogVisible.value = true;
}

// 处理退出登录
function handleLoginOut() {
  store.loginOut();
  router.push('/');
}

// 用户点击购物车
const handleCartClick = () => {
  if (!store.userInfo) {
    ElNotification({
      title: 'Error',
      message: '您尚未登录，请登录后重试！',
      type: 'error',
    });
    return;
  }
  drawerVisible.value = true;
};

// 处理搜索商品
const handleSearch = () => {
  // 1. 导航到所有商品页面
  router.push({
    name: 'search',
    query: {
      searchText: searchText.value,
    },
  });
};

//
watch(
  () => route.path,
  async (newPath) => {
    if (newPath.startsWith('/person')) {
      activeIndex.value = '/person/info';
      return;
    }
    activeIndex.value = newPath;
  },
  {
    deep: true,
  }
);
</script>

<style lang="scss" scoped>
@use '@/styles/var.scss' as *;
.top-bar {
  display: flex;
  align-items: center;
  height: 99px;
  padding: 0 150px 0 300px;
  .left {
    color: #000;
    font-size: 30px;
    flex-grow: 1;
    height: 100%;
    .logo {
      line-height: 99px;
      height: 100%;
      img {
        height: 100%;
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    .search {
      color: #fff;
      margin-right: 35px;
      .input-with-select {
        border: 2px solid $base;
        :deep(.el-input__wrapper) {
          box-shadow: unset;
        }
      }
      :deep(.el-input-group__append) {
        background: $base;
        color: #fff;
        border-radius: initial;
      }
    }
    .user {
      margin-right: 35px;
      cursor: pointer;
    }
    .cart {
      cursor: pointer;
    }
  }
}
.nav {
  height: 59px;
  :deep(.el-menu) {
    padding-left: 300px;
    background: $dark;
    .el-menu-item {
      &:hover,
      &:focus {
        background: unset;
        color: $base;
        border-bottom: 2px solid $base;
      }
    }
  }
}

:deep(.el-input-group__append) {
  cursor: pointer;
}
</style>
