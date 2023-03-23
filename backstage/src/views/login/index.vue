<template>
  <div class="login-container">
    <div class="wrapper">
      <h3 class="title">果燃商城后台管理系统</h3>
      <el-divider />
      <el-form :model="form" label-width="50px">
        <el-form-item label="账号">
          <el-input v-model="form.loginId" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.loginPwd" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAdminStore } from '@/stores/admin';

const adminStore = useAdminStore();
const router = useRouter();
const form = reactive({
  loginId: '',
  loginPwd: '',
});

const onSubmit = async () => {
  const result = await adminStore.login(form);
  result && router.push('/');
};
</script>

<style lang="scss" scoped>
@use '@/styles/var.scss' as *;
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: url(../../assets/login-bg.png) no-repeat center/cover;
}

.wrapper {
  width: 300px;
  text-align: center;
  background: #fff;
  padding: 30px;
  margin-left: 100px;
  box-shadow: var(--el-box-shadow-dark);
  .title {
    color: $dark;
  }
}

:deep(.el-divider--horizontal) {
  margin: 10px 0 24px 0;
}
</style>
