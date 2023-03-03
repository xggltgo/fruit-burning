<template>
  <div class="about-us-container">
    <div class="content">
      <div class="left"></div>
      <div class="right">
        <img src="../../assets/aboutUs.png" alt="" />
      </div>
    </div>
    <div
      class="extra-title extra animate__animated animate__delay-1s"
      :class="{
        animate__fadeInRight: use_animate,
      }"
      :style="{ visibility: use_animate ? 'visible' : 'hidden' }"
    >
      GUO&nbsp;RAN<br />
      FRUITS
    </div>
    <div
      class="extra-desc extra animate__animated animate__delay-2s"
      :class="{
        animate__fadeInRight: use_animate,
      }"
      :style="{ visibility: use_animate ? 'visible' : 'hidden' }"
    >
      在专栏设置面板中，您可以更换背景图片的<br />
      非常简单的，不需要任何别的设置
    </div>
    <button
      class="extra-btn extra animate__animated animate__delay-2s"
      :class="{
        animate__fadeInRight: use_animate,
      }"
      :style="{ visibility: use_animate ? 'visible' : 'hidden' }"
      @click="router.push({ name: 'about' })"
    >
      查看更多详情
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
defineProps({
  use_animate: {
    type: Boolean,
    required: true,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
@use '@/styles/var.scss' as *;
.content {
  height: 600px;
  display: flex;
  .left {
    width: 30vw;
  }
  .right {
    width: 70vw;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
}
.extra {
  position: absolute;
  top: 24%;
  left: 20%;
}
.extra-title {
  font-family: arial;
  font-size: 42px;
  font-weight: bold;
  color: #333333;
  line-height: 50px;
  text-shadow: 3px 0px 5px #fff, -3px 0px 5px #fff, 0px 3px 5px #fff,
    0px -3px 5px #fff;
}
.extra-desc {
  font-family: 微软雅黑;
  font-size: 15px;
  color: $dark;
  top: 45%;
  text-shadow: 3px 0px 5px #fff, -3px 0px 5px #fff, 0px 3px 5px #fff,
    0px -3px 5px #fff;
}
.extra-btn {
  border: 1px solid $dark;
  color: rgb(0, 0, 0);
  background: transparent;
  padding: 10px 15px;
  font-size: 12px;
  cursor: pointer;
  top: 58%;
  &:hover {
    background: $dark;
    color: #fff;
  }
}
</style>
