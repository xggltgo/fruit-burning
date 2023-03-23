<template>
  <div class="add-product-container">
    <h1 :style="{ marginBottom: 30 + 'px' }">添加商品</h1>
    <el-form :model="editForm" label-position="top">
      <el-form-item label="商品名称">
        <el-input v-model="editForm.name" maxlength="30" show-word-limit />
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="editForm.description" />
      </el-form-item>
      <el-form-item label="商品单价（元）">
        <el-input-number
          v-model="editForm.price"
          :precision="2"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="商品库存">
        <el-input-number v-model="editForm.stock" />
      </el-form-item>
      <el-form-item label="商品状态">
        <el-radio-group v-model="editForm.status">
          <el-radio-button :label="0">普通</el-radio-button>
          <el-radio-button :label="1">热销</el-radio-button>
          <el-radio-button :label="2">新品</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品小图">
        <el-upload
          class="avatar-uploader"
          action="/api/upload"
          :show-file-list="false"
          :on-success="handleImageSmSuccess"
          :headers="headers"
        >
          <img
            v-if="editForm.image_sm"
            :src="editForm.image_sm"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon-sm"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品中图">
        <el-upload
          class="avatar-uploader"
          action="/api/upload"
          :show-file-list="false"
          :on-success="handleImageMidSuccess"
          :headers="headers"
        >
          <img
            v-if="editForm.image_mid"
            :src="editForm.image_mid"
            :style="{
              width: 300 + 'px',
              height: 200 + 'px',
            }"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon-mid"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品类型">
        <el-select v-model="editForm.categoryid" placeholder="请选择商品类型">
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <div class="btn">
        <el-button type="primary" size="large" @click="handleAddProduct"
          >添加商品</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAllCategories } from '@/api/category';
import { addOneProduct } from '@/api/product';
import { isfullInfo } from '@/utils//tools';
import { Plus } from '@element-plus/icons-vue';

const router = useRouter();
const categoryList = ref([]);
const editForm = ref({
  name: '',
  description: '',
  price: 9.99,
  stock: 100,
  status: 0,
  image_sm: '',
  image_mid: '',
  categoryid: '',
});
const headers = {
  Authorization: 'Bearer ' + localStorage.getItem('token'),
};

//获取所有商品分类
(async () => {
  const result = await getAllCategories();
  categoryList.value = result;
})();

const handleImageSmSuccess = (response) => {
  // 拿到上传至服务器的 图片地址
  editForm.value.image_sm = response.data;
};

const handleImageMidSuccess = (response) => {
  editForm.value.image_mid = response.data;
};

const handleAddProduct = async () => {
  const data = { ...editForm.value };
  if (isfullInfo(data)) {
    const result = await addOneProduct({
      ...data,
      image_big: data.image_mid,
    });
    router.push({ name: 'productList' });
    ElMessage({
      message: '添加商品信息成功！',
      type: 'success',
    });
  } else {
    ElMessage({
      message: '请完整填写商品信息后重试！',
      type: 'warning',
    });
  }
};
</script>

<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 150px;
  height: 100px;
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

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon-sm {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 100px;
  text-align: center;
}
.el-icon.avatar-uploader-icon-mid {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 200px;
  text-align: center;
}
.btn {
  margin: 50px 0;
}
</style>
