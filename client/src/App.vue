<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <!-- <RouterView /> -->
  <div class="app-container">
    <Header />
    <RouterView />
    <Footer />
    <el-backtop
      target=".app-container"
      :right="70"
      :bottom="50"
      :visibility-height="500"
    >
      <div
        style="
          height: 100%;
          width: 100%;
          background-color: var(--el-bg-color-overlay);
          box-shadow: var(--el-box-shadow-lighter);
          text-align: center;
          line-height: 40px;
          color: #1989fa;
        "
      >
        UP
      </div>
    </el-backtop>
  </div>
</template>

<script setup>
// import { RouterLink, RouterView } from "vue-router";
import Header from '@/components/Header/index.vue';
import Footer from '@/components/Footer.vue';
</script>

<style scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
</style>
