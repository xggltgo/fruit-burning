<template>
  <div class="login-form-container">
    <el-form
      :model="form"
      label-width="50px"
      status-icon
      :rules="rules"
      ref="ruleFormRef"
    >
      <el-form-item label="账号" prop="loginId">
        <el-input v-model="form.loginId" />
      </el-form-item>
      <el-form-item label="密码" prop="loginPwd">
        <el-input v-model="form.loginPwd" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useUserStore } from '@/store/user';

const store = useUserStore();
const ruleFormRef = ref();

const form = reactive({
  loginId: '',
  loginPwd: '',
});

const rules = reactive({
  loginId: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
  loginPwd: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
});

const emit = defineEmits();

const onSubmit = async () => {
  if (ruleFormRef.value) {
    ruleFormRef.value.validate(async (valid) => {
      if (valid) {
        // 表单验证通过 进行登录
        // 登录成功 关闭弹框 保存用户信息到pinia
        const result = await store.login(form);
        if (result) {
          // 通知父元素关闭弹框
          emit('close');
          ElNotification({
            title: 'Success',
            message: '登录成功，GUORAN欢迎您的到来！',
            type: 'success',
            duration: 3000,
          });
        }
      } else {
        // 表单验证失败 提示用户
        ElNotification({
          title: 'Error',
          message: '登录失败，请完善表单每一项',
          type: 'error',
          duration: 3000,
        });
        return false;
      }
    });
  }
};
</script>

<style lang="scss" scoped></style>
