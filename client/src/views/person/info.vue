<template>
  <div class="info-container">
    <el-descriptions title="个人信息" border>
      <el-descriptions-item label="昵称">{{
        userInfo.nickname
      }}</el-descriptions-item>
      <el-descriptions-item label="账号">{{
        userInfo.loginId
      }}</el-descriptions-item>
      <el-descriptions-item label="电话">{{
        userInfo.phone || '暂未填写'
      }}</el-descriptions-item>
      <el-descriptions-item label="头像">
        <el-avatar :size="50" :src="userInfo.avatar" />
      </el-descriptions-item>
      <el-descriptions-item label="Remarks">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Address"
        >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
        Province</el-descriptions-item
      >
    </el-descriptions>
    <el-button
      type="primary"
      :style="{ marginTop: 15 + 'px' }"
      @click="dialogVisible = true"
      >编辑</el-button
    >
    <el-dialog
      v-model="dialogVisible"
      title="编辑个人信息"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="form" label-width="50px">
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :headers="headers"
          >
            <img :src="form.avatar" class="avatar" />
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleClick"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { useUserStore } from '@/store/user';

const handleAvatarSuccess = (response) => {
  // 拿到上传至服务器的 图片地址
  form.avatar = response.data;
};

const dialogVisible = ref(false);

const store = useUserStore();
const form = reactive({ ...store.userInfo });
const userInfo = computed(() => store.userInfo);

const headers = {
  Authorization: 'Bearer ' + localStorage.getItem('token'),
};

const handleClose = (done) => {
  done();
};

const handleClick = async () => {
  const data = { ...form };
  delete data.id;
  await store.update(data);
  dialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.avatar-uploader .avatar {
  width: 80px;
  height: 80px;
  object-fit: cover;
  display: block;
}

:deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
</style>
