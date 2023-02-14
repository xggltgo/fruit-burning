<template>
  <div class="tab-container" ref="tabRef">
    <!-- 标题区域 -->
    <div
      class="title animate__animated"
      :class="{
        animate__fadeInRight:use_animate,
      }"
      :style="{
        visibility: use_animate ? 'visible' : 'hidden',
        marginBottom: `${marginBottom}px`,
        margin: `0 ${title.margin}px`,
      }"
    >
      <span class="cn">{{ title.cn }}</span>
      <span class="en">{{ title.en }}</span>
    </div>
    <!-- 内容区域 -->
    <slot :use_animate="use_animate"></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';

defineProps({
  title: {
    type: Object,
    required: true,
    default: {
      cn: '标题',
      en: 'Title',
      margin: 0,
    },
  },
  marginBottom: {
    type: Number,
    default: 30,
  },
});

const tabRef = ref(null);
const use_animate = ref(false);
onMounted(() => {
  const tabDiv = tabRef.value;
  const timer = setInterval(() => {
    const rect = tabDiv.getBoundingClientRect();
    if (document.documentElement.clientHeight - rect.top > 100) {
      use_animate.value = true;
      clearInterval(timer);
    }
  }, 1000);
});
</script>

<style lang="scss" scoped>
@use '@/styles/var.scss' as *;
.tab-container {
  margin-top: 100px;
  position: relative;
}
.title {
  border-bottom: 1px solid #bababa;
  height: 39px;
  visibility: hidden;
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
