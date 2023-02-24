<template>
  <div class="login-container">
    <el-dialog
      v-model="dialogVisible"
      title="GUORAN(登录/注册)"
      width="30%"
      :before-close="handleClose"
    >
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="登录" name="first">
          <LoginForm />
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <RegisterForm />
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';

const activeName = ref('first');

const handleClick = (tab, event) => {
  console.log(tab, event);
};

const dialogVisible = ref(true);

const handleClose = (done) => {
  done();
};
</script>

<style lang="scss" scoped>
@use '@/styles/var.scss' as *;

.dialog-footer button:first-child {
  margin-right: 10px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
