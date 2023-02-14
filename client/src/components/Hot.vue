<template>
  <div class="hot-container hvr-glow">
    <div class="image">
      <img src="../assets/cover.png" alt="" />
    </div>
    <div class="name">粉色葡萄012</div>
    <div class="price">&yen;2800</div>
  </div>  
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.hot-container {
  border: 1px solid rgba(229, 229, 229, 1);
  background-color: #ffffff;
  padding: 20px 0;
  width: 280px;
  text-align: center;
  transition: all 0.5s;
  margin-bottom: 30px;
  &:hover{
    transform: scale(1.03);
    .name{
      color: #555;
    }
  }
  .image {
    height: 205px;
    cursor: pointer;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .name {
    margin-top: 10px;
    padding: 10px 0px;
    color: #999;
    line-height: 15px;
    cursor: pointer;
  }
  .price {
    margin-top: 5px;
    color: #666;
    font-size: 15px;
    font-family: 微软雅黑;
  }
}
</style>
