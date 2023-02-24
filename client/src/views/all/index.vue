<template>
  <div class="all-container">
    <div class="search">
      <SearchArea />
    </div>
    <div class="fruit-list">
      <Hot v-for="item in 16" key="item" />
    </div>
  </div>
</template>

<script setup>
import SearchArea from './SearchArea.vue';
import Hot from '../../components/Hot.vue';
</script>

<style lang="scss" scoped>
.all-container {
  width: 1190px;
  margin: 0 auto;
}

.fruit-list {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
