<template>
  <div class="result-container animate__animated animate__slideInUp">
      <h1 class="page-name">处理结果</h1>
      <!-- 内容区域 -->
      <div class="content">
        <el-result
          icon="success"
          :title="titleInfo?.title"
          :sub-title="titleInfo?.subtitle"
        >
          <template #extra>
            <el-button type="primary" @click="router.push({ name: 'home' })"
              >返回首页</el-button
            >
            <el-button
              type="info"
              v-if="titleInfo.orderid"
              @click="
                router.push({
                  name: 'orderDetail',
                  params: {
                    id: titleInfo.orderid,
                  },
                })
              "
              >查看订单</el-button
            >
          </template>
        </el-result>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const titleInfo = ref({
  title: history.state.title,
  subtitle: history.state.subtitle,
  orderid: history.state.orderid,
});
</script>

<style lang="scss" scoped>
@use '@/styles/var.scss' as *;
.result-container {
  margin: 15px 300px;
  color: $dark;
  min-height: 100%;
}
.content {
  margin-top: 10px;
  box-shadow: var(--el-box-shadow-light);
  padding: 30px 15px 20px 15px;
}
</style>
