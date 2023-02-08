<template>
  <div class="header-container">
    <div class="top-bar">
      <div class="left">
        <div class="logo">
          <img src="../../assets/logo.png" alt="">
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
      
      
      
      
      <!-- <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="User" name="first">User</el-tab-pane>
        <el-tab-pane label="Config" name="second">Config</el-tab-pane>
        <el-tab-pane label="Role" name="third">Role</el-tab-pane>
        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
      </el-tabs> -->
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <el-menu-item index="0">
          <RouterLink to="/">商城首页</RouterLink></el-menu-item
        >
        <el-menu-item index="1"
          ><RouterLink to="/all">所有商品</RouterLink></el-menu-item
        >
        <el-menu-item index="2"
          ><RouterLink to="/dynamic">商城动态</RouterLink></el-menu-item
        >
        <el-menu-item index="3"
          ><RouterLink to="/pay">支付方式</RouterLink></el-menu-item
        >
        <el-menu-item index="4"
          ><RouterLink to="/about">关于店铺</RouterLink></el-menu-item
        >
        <el-menu-item index="5"
          ><RouterLink to="/offline">线下门店</RouterLink></el-menu-item
        >
      </el-menu>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
const input3 = ref('');
const activeIndex = ref('1');
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
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
        border: 2px solid #1365f2;
        :deep(.el-input__wrapper) {
          box-shadow: unset;
        }
      }
      :deep(.el-input-group__append) {
        background: #1365f2;
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
  :deep(.el-menu){
    padding-left: 300px;
  }
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
