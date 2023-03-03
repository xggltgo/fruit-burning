<template>
  <div class="person-container animate__animated animate__slideInUp">
    <div class="nav">
      <RouterLink :to="{ name: 'info' }">个人信息</RouterLink>
      <RouterLink :to="{ name: 'order' }">订单信息</RouterLink>
      <RouterLink :to="{ name: 'receive' }">收货地址</RouterLink>
    </div>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@use '@/styles/var.scss' as *;
.person-container {
  margin: 50px 300px;
  display: flex;
  min-height: 100%;
}

.nav {
  width: 100px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  // border-right: 3px solid $base;
  a {
    color: $dark;
    height: 50px;
    line-height: 50px;
    text-align: center;
    width: 100%;
    font-size: 14px;
  }
  .router-link-exact-active {
    color: #fff;
    background: $base;
  }
}

.content {
  padding: 0 30px;
}
</style>
