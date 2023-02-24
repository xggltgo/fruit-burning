<template>
  <div class="login-form-container">
    <el-form :model="form" label-width="120px">
      <el-form-item label="账号">
        <el-input v-model="form.loginId" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.loginPwd" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
const form = reactive({
  loginId: '',
  loginPwd: '',
});

const onSubmit = () => {
  console.log('submit!');
};
</script>

<style lang="" scoped></style>
