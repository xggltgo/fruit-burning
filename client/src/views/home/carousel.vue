<template>
  <div class="carousel-container">
    <el-carousel height="64vh">
      <h3 class="title-seat" v-if="titleSeat">GUORAN FRUITS</h3>
      <h3 class="title animate__animated animate__heartBeat" ref="titleRef">
        GUORAN FRUITS
      </h3>
      <button class="btn" @click="handleClick">进入在线商城</button>
      <el-carousel-item v-for="(item, index) in carousels" :key="index">
        <img :src="item" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import c1 from '@/assets/carousel-1.png';
import c2 from '@/assets/carousel-2.png';
import c3 from '@/assets/carousel-3.png';
import c4 from '@/assets/carousel-4.png';
import c5 from '@/assets/carousel-5.png';

const carousels = [c1, c2, c3, c4, c5];
const router = useRouter();
console.log(router);
const titleRef = ref(null);
let titleSeat = ref(false);

onMounted(() => {
  const titleDiv = titleRef.value;
  titleDiv.addEventListener('animationend', () => {
    titleSeat.value = true;
  });
});

const handleClick = () => router.push('/all');
</script>

<style lang="scss" scoped>
@use '@/styles/var.scss' as *;
:deep(.el-carousel) {
  position: relative;
}
.title {
  font-size: 52px;
  font-family: arial;
  font-weight: 700;
  color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
}
.title-seat {
  font-size: 52px;
  font-family: arial;
  font-weight: 700;
  color: transparent;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 66;
  text-shadow: 3px 0px 5px $base, -3px 0px 5px $base, 0px 3px 5px $base,
    0px -3px 5px $base;
}
img {
  object-fit: cover;
  height: 100%;
  width: 100%;
  display: block;
}
.btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, calc(-50% + 94px));
  z-index: 99;
  border: none;
  padding: 20px 60px;
  background: #fff;
  font-family: 微软雅黑;
  color: rgb(0, 29, 93);
  font-weight: bold;
  cursor: pointer;
  border: 1px solid #fff;
  &:hover {
    background: rgb(240, 240, 240);
    border: 1px solid rgb(240, 240, 240);
  }
}
</style>
