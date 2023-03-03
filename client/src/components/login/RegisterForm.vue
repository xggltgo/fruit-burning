<template>
  <div class="register-form-container">
    <el-form
      :model="form"
      label-width="80px"
      status-icon
      :rules="rules"
      ref="ruleFormRef"
    >
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="账号" prop="loginId">
        <el-input v-model="form.loginId" />
      </el-form-item>
      <el-form-item label="密码" prop="loginPwd">
        <el-input v-model="form.loginPwd" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPwd">
        <el-input
          v-model="form.confirmPwd"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { exist, register } from '@/api/user';

const ruleFormRef = ref();
const emit = defineEmits()

const form = reactive({
  nickname: '',
  loginId: '',
  loginPwd: '',
  confirmPwd: '',
});

const validateExist = async (rule, value, callback) => {
  const result = await exist(value);
  if (result) {
    callback('当前账号已存在');
  }
  callback();
};

const validateSame = (rule, value, callback) => {
  if (value !== form.loginPwd) {
    callback('两次密码不一致');
  }
  callback();
};

const rules = reactive({
  nickname: [{ required: true, message: '昵称不能为空', trigger: 'blur' }],
  loginId: [
    { required: true, message: '账号不能为空', trigger: 'blur' },
    { validator: validateExist, trigger: 'blur' },
  ],
  loginPwd: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  confirmPwd: [
    { required: true, message: '确认不能为空', trigger: 'blur' },
    { validator: validateSame, trigger: 'blur' },
  ],
});

const onSubmit = () => {
  if (ruleFormRef.value) {
    ruleFormRef.value.validate(async (valid) => {
      if (valid) {
        // 表单验证通过 进行注册
        const result = await register(form);
        ElNotification({
          title: 'Success',
          message: '注册成功，您可以去登录啦！',
          type: 'success',
          duration: 3000,
        });
        emit('toggleLogin')
      } else {
        // 表单验证失败 提示用户
        ElNotification({
          title: 'Error',
          message: '注册失败，请修改表单后重试',
          type: 'error',
          duration: 3000,
        });
        return false;
      }
    });
  }
};
</script>

<style lang="" scoped></style>
