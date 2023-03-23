<template>
  <div class="home-container">
    <el-row class="tac">
      <el-col :span="3">
        <el-menu
          :default-active="active"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          active-text-color="#409eff"
          background-color="#001529"
          text-color="#fff"
        >
          <!-- <el-menu-item index="userList">
            <el-icon><UserFilled /></el-icon>
            <RouterLink :to="{ name: 'userList' }">用户列表</RouterLink>
          </el-menu-item> -->
          <el-sub-menu index="2">
            <template #title>
              <el-icon><Grid /></el-icon>
              <span>商品管理</span>
            </template>
            <el-menu-item index="productList">
              <el-icon><Apple /></el-icon>
              <RouterLink :to="{ name: 'productList' }">商品列表</RouterLink>
            </el-menu-item>
            <el-menu-item index="addProduct">
              <el-icon><Plus /></el-icon>
              <RouterLink :to="{ name: 'addProduct' }">添加商品</RouterLink>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item index="productType">
            <el-icon><HelpFilled /></el-icon>
            <RouterLink :to="{ name: 'productType' }">商品分类</RouterLink>
          </el-menu-item>
          <el-menu-item index="orderList">
            <el-icon><Management /></el-icon>
            <RouterLink :to="{ name: 'orderList' }">订单列表</RouterLink>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <div class="route">
          <RouterView />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {
  Apple,
  Plus,
  Grid,
  Management,
  HelpFilled,
  UserFilled,
} from '@element-plus/icons-vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const active = ref(route.path.substring(1));

const handleOpen = (key, keyPath) => {
  // console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  // console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
}
.route{
  width: 100%;
  height: 100%;
  padding: 50px 30px;
  position: relative;
}

:deep(.el-row) {
  height: 100%;
}
:deep(.el-menu--vertical) {
  height: 100%;
}

.el-menu-item a {
  flex-grow: 1;
}
</style>
