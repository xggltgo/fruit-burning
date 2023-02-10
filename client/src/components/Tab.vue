<template>
  <div class="tab-container" ref="tabRef">
    <!-- 标题区域 -->
    <div
      class="title animate__animated"
      :class="{
        animate__fadeInRight,
      }"
      :style="{ visibility: animate__fadeInRight ? 'visible' : 'hidden' }"
    >
      <span class="cn">{{title.cn}}</span>
      <span class="en">{{title.en}}</span>
    </div>
    <!-- 内容区域 -->
    <slot :animate__fadeInRight='animate__fadeInRight'></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";

defineProps({
  title: {
    type: Object,
    required: true,
    default: {
      cn: "标题",
      en: "Title",
    },
  },
});

const tabRef = ref(null);
const animate__fadeInRight = ref(false);
onMounted(() => {
  const tabDiv = tabRef.value;
  const timer = setInterval(() => {
    const rect = tabDiv.getBoundingClientRect();
    if (document.documentElement.clientHeight - rect.top > 100) {
      animate__fadeInRight.value = true;
      clearInterval(timer);
    }
  }, 1000);
});
</script>

<style lang="scss" scoped>
@use "@/styles/var.scss" as *;
.tab-container {
  margin-top: 100px;
  position: relative;
}
.title {
  margin: 0 40px;
  border-bottom: 1px solid #bababa;
  height: 39px;
  visibility: hidden;
  margin-bottom: 30px;
  .cn {
    font-family: 微软雅黑;
    font-size: 20px;
    font-weight: bold;
    font-style: normal;
    margin: 0 5px 0px 0;
    color: #333333;
    height: 100%;
    display: inline-block;
    border-bottom: 2px solid $base;
  }
  .en {
    font-family: Raleway;
    font-size: 15px;
    color: #bababa;
    padding: 2px;
    vertical-align: -1px;
  }
}
</style>
