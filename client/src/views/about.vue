<template>
  <div class="about-container animate__animated animate__backInRight">
    <div class="page-title">
      <div class="zh">品牌介绍</div>
      <div class="en">Brand Introduction</div>
    </div>
    <el-divider />

    <p class="paragraph">
      果“燃”精品水果直供平台是一家以在线销售高品质水果为主营业务的购物平台。该平台提供多样化的水果品种选择，旨在为消费者提供优质、健康的水果购物体验。
    </p>
    <p class="paragraph">
      平台采用前后端分离的技术架构，支持在线下单、支付、配送等全流程服务，同时还提供在线客服、会员积分、优惠券等功能，为用户提供便捷的购物体验。
    </p>
    <ol class="paragraph">
      <p>
        果“燃”是一家精品水果直供平台，致力于提供高品质、新鲜的水果产品，并为用户提供便捷的购物体验。平台主要特点包括以下几个方面:
      </p>
      <li>
        1.
        产品品质保障：平台选择优质果源，采用全程冷链配送，保证水果品质新鲜，口感美味，无添加，无污染，安全健康。
      </li>
      <li>
        2.
        多样化产品：平台提供多种水果类别，包括热带水果、柑橘水果、核果类水果、浆果类水果等等，品种丰富，选择多样。
      </li>
      <li>
        3.
        便捷的购物体验：平台采用用户友好的设计，为用户提供在线选购、在线支付、快递送货等便捷的服务，用户可随时随地进行购物。
      </li>
      <li>
        4.
        优质的服务体验：平台为用户提供专业的售后服务，包括7天无理由退货、售后维权等服务，让用户安心购物。
      </li>
    </ol>
  </div>
</template>

<script setup>
(() => {
  document.querySelector(".app-container").scrollTo(0, 0);
})();
</script>

<style lang="scss" scoped>
@use "@/styles/var.scss" as *;
.about-container {
  min-height: 100%;
  color: $dark;
  width: 1190px;
  margin: 30px auto;
}
.page-title {
  .zh {
    font-size: 22px;
  }
  .en {
    font-size: 14px;
    color: #a9a9a9;
  }
}

.paragraph {
  font-family: 微软雅黑;
  font-size: 12px;
  color: #808080;
}
ol {
  margin: 0;
  padding: 0;
  margin-top: 30px;
  list-style: none;
  li {
    height: 30px;
    line-height: 30px;
  }
}
</style>
