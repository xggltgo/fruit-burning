<template>
  <div class="not-found-container">
    <img src="../assets/404.jpg" alt="" />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.not-found-container {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
}
</style>
