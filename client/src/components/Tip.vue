<template>
  <div class="tip-container">
    <div class="image">
      <img src="../assets/new.png" alt="" />
    </div>
    <div class="content">
      <div class="title">绿色又好吃的葡萄</div>
      <div class="time">上新时间：2023-02-10</div>
      <div class="desc">
        秋天的拉萨，天气比较干燥，这个时候在家里养一些可以制造氧气和水分的植物大有好处。记者走访多个花店后发现，很多店老板都会同时提到一种制氧植物——红豆杉。红豆杉有“植物增氧机”之称...
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.tip-container {
  width: 785px;
  height: 211px;
  border: 1px solid rgba(221, 221, 221);
  padding: 5px;
  display: flex;
  .image {
    width: 280px;
    height: 200px;
    margin-right: 15px;
    flex-shrink: 0;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .content {
    flex-grow: 1;
    .title {
      margin-top: 25px;
      color: #333333;
      font-size: 16px;
      font-family: 微软雅黑;
      line-height: 16px;
      margin-bottom: 10px;
      font-weight: 700;
      cursor: pointer;
    }
    .time {
      color: #999;
      font-size: 13px;
      line-height: 13px;
      font-family: 微软雅黑;
    }
    .desc {
      margin-top: 20px;
      color: #777777;
      font-size: 13px;
      font-family: 微软雅黑;
      line-height: 22px;
    }
  }
}
</style>
