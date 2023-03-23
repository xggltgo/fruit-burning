<template>
  <div class="product-list-container">
    <!-- 数据表格 -->
    <el-table :data="tableData" style="width: 100%" stripe border>
      <el-table-column label="序号" width="100">
        <template #default="scope">
          {{ (pageInfo.page - 1) * pageInfo.limit + (scope.$index + 1) }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="商品名称" width="180" />
      <el-table-column prop="description" label="商品描述" width="180" />
      <el-table-column prop="price" label="商品单价" width="150" />
      <el-table-column prop="stock" label="商品库存" width="150" />
      <el-table-column label="商品状态" width="150">
        <template #default="scope">
          <el-tag :type="mapStatus(scope.row.status).type">{{
            mapStatus(scope.row.status).text
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="图片预览" width="200">
        <template #default="scope">
          <el-image
            style="width: 150px; height: 100px"
            :src="scope.row.image_mid"
            fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column label="所属分类" width="180">
        <template #default="scope">
          {{
            categoryList.find((item) => item.id === scope.row.categoryid)
              ?.name || '暂未分类'
          }}
        </template>
      </el-table-column>
      <el-table-column label="创建日期" width="200">
        <template #default="scope">
          {{ formatLocaleTime(scope.row.createDate) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 页码区域 -->
    <div class="pager">
      <el-pagination
        layout="prev, pager, next,jumper,total"
        background
        :total="total"
        :page-size="pageInfo.limit"
        :pager-count="9"
        :hide-on-single-page="true"
        :current-page="pageInfo.page"
        @current-change="handlePageChange"
      />
    </div>

    <!-- 编辑dialog -->
    <el-dialog
      v-model="dialogVisible"
      title="编辑商品信息"
      :before-close="handleClose"
      fullscreen
    >
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
            <img :src="editForm.image_sm" class="avatar" />
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
              :src="editForm.image_mid"
              :style="{
                width: 300 + 'px',
                height: 200 + 'px',
              }"
              class="avatar"
            />
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
        <el-form-item label="创建日期">
          <el-button disabled>{{
            formatLocaleTime(editForm.createDate)
          }}</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmEdit">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import {
  getProductByPage,
  deleteProductById,
  updateProductInfo,
} from '@/api/product';
import { getAllCategories } from '@/api/category';
import { formatLocaleTime } from '@/utils//tools';

const headers = {
  Authorization: 'Bearer ' + localStorage.getItem('token'),
};
const dialogVisible = ref(false);
let tableData = ref([]);
const categoryList = ref([]);
const total = ref(0);
const pageInfo = reactive({
  page: 1,
  limit: 10,
});
const editForm = ref({
  name: '',
  description: '',
  price: '',
  stock: '',
  status: '',
  image_sm: '',
  image_mid: '',
  categoryid: '',
  createDate: '',
});

//获取所有商品分类
(async () => {
  const result = await getAllCategories();
  categoryList.value = result;
})();

//分页获取商品数据
const fetchProductByPage = async () => {
  const result = await getProductByPage(pageInfo);
  tableData.value = result.productList;
  total.value = result.total;
};
fetchProductByPage();

// 处理翻页逻辑
const handlePageChange = (newPage) => {
  // 滚动条置顶
  pageInfo.page = newPage;
  fetchProductByPage();
};

// 映射商品状态
const mapStatus = (status) => {
  switch (status) {
    case 0:
      return { text: '普通', type: 'info' };
    case 1:
      return { text: '热销', type: '' };
    case 2:
      return { text: '新品', type: 'danger' };

    default:
      return { text: '未知', type: 'warning' };
  }
};

// 编辑按钮
const handleEdit = (index, row) => {
  dialogVisible.value = true;
  editForm.value = { ...row };
};

const handleConfirmEdit = async () => {
  const { id, ...data } = { ...editForm.value };
  const result = await updateProductInfo(id, data);
  await fetchProductByPage();
  dialogVisible.value = false;
  ElMessage({
    message: '修改商品信息成功！',
    type: 'success',
  });
};

//删除按钮
const handleDelete = async (index, row) => {
  const result = await deleteProductById(row.id);
  if (result) {
    // 删除商品后重新获取本页数据
    fetchProductByPage();
  }
};

const handleClose = (done) => {
  done();
};

const handleImageSmSuccess = (response) => {
  // 拿到上传至服务器的 图片地址
  editForm.value.image_sm = response.data;
};

const handleImageMidSuccess = (response) => {
  editForm.value.image_mid = response.data;
};
</script>

<style lang="scss" scoped>
.product-list-container {
  width: 100%;
  height: 100%;
}

.pager {
  margin: 30px auto;
  display: flex;
  justify-content: center;
}

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

.dialog-footer button:first-child {
  margin-right: 10px;
}

:deep(.el-table .cell) {
  text-align: center;
}
</style>
