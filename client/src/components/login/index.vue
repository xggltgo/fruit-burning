<template>
  <div class="login-container">
    <el-dialog
      v-model="props.modelValue"
      title="GUORAN(登录/注册)"
      width="30%"
      :before-close="handleClose"
    >
      <el-tabs v-model="activeName" class="demo-tabs" type="border-card">
        <el-tab-pane label="登录" name="first">
          <LoginForm @close="emit('update:modelValue', false)" />
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <RegisterForm @toggleLogin="handleToggleLogin" />
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits();

const activeName = ref('first');

const handleClose = (done) => {
  emit('update:modelValue', false);
  done();
};

// 用户注册成功 切换到登录表单
const handleToggleLogin = () => {
  activeName.value = 'first';
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
