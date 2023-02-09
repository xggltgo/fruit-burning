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
              v-model="input3"
              placeholder="搜索商品关键字"
              class="input-with-select"
            >
              <template #append>
                <IEpSearch />
              </template>
            </el-input>
          </div>
        </div>
        <div class="user">
          <IEpUser />
        </div>
        <div class="cart">
          <IEpShoppingCartFull />
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
        style="--el-menu-text-color:#fff;"
      >
        <el-menu-item index="/"> 商城首页</el-menu-item>
        <el-menu-item index="/all">所有商品</el-menu-item>
        <el-menu-item index="/dynamic">商城动态</el-menu-item>
        <el-menu-item index="/pay">支付方式</el-menu-item>
        <el-menu-item index="/about">关于店铺</el-menu-item>
        <el-menu-item index="/offline">线下门店</el-menu-item>
      </el-menu>
    </nav>
  </div>
</template>

<script setup>
import {  useRoute } from "vue-router";
import { ref, watch } from "vue";

const route = useRoute();
const input3 = ref("");
let activeIndex = ref("");
// 当参数更改时获取用户信息
watch(
  () => route.path,
  async (newPath) => {
    activeIndex.value = newPath;
  },
  {
    deep: true,
  }
);
</script>

<style lang="scss" scoped>
@use "@/styles/var.scss" as *;
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
    }
  }
}
.nav {
  height: 59px;
  :deep(.el-menu) {
    padding-left: 300px;
    background: $dark;
    .el-menu-item {
      &:hover,&:focus {
        background: unset;
        color: $base;
        border-bottom: 2px solid $base;
      }
    }
  }
}
</style>
