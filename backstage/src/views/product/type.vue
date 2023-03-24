<template>
  <div class="product-type-container">
    <div class="add">
      <el-input
        v-model="name"
        placeholder="请填写分类名称，并在左侧选择分类等级（默认为1）"
        class="input-with-select"
      >
        <template #prepend>
          <el-select
            v-model="order"
            placeholder="请选择分类等级"
            style="width: 100px"
          >
            <el-option label="1" :value="1" />
            <el-option label="2" :value="2" />
            <el-option label="3" :value="3" />
            <el-option label="4" :value="4" />
            <el-option label="5" :value="5" />
          </el-select>
        </template>
      </el-input>
      <el-button type="primary" @click="handleAddCategory">添加</el-button>
    </div>
    <!-- 数据表格 -->
    <el-table :data="tableData" style="width: 100%" stripe border>
      <el-table-column label="序号" width="100">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="分类名称" />
      <el-table-column prop="count" label="商品数量" width="180" />
      <el-table-column prop="order" label="分类等级" width="180" />

      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >

          <el-popconfirm
            title="删除此分类后，所属商品将变为未分类状态，您是否真的要删除该分类？"
            @confirm="confirmEvent(scope.row)"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑dialog -->
    <el-dialog
      v-model="dialogVisible"
      title="编辑分类信息"
      :before-close="handleClose"
    >
      <el-form :model="editForm" label-position="top">
        <el-form-item label="商品名称">
          <el-input v-model="editForm.name" maxlength="30" show-word-limit />
        </el-form-item>
        <el-form-item label="商品描述">
          <el-select
            v-model="editForm.order"
            placeholder="请选择分类等级"
            style="width: 150px"
          >
            <el-option label="1" :value="1" />
            <el-option label="2" :value="2" />
            <el-option label="3" :value="3" />
            <el-option label="4" :value="4" />
            <el-option label="5" :value="5" />
          </el-select>
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
import { ref } from 'vue';
import {
  getAllCategories,
  addOneCategory,
  deleteCategoryInfoById,
  UpdateCategoryInfoById,
} from '@/api/category';

let tableData = ref([]);
const dialogVisible = ref(false);
const name = ref('');
const order = ref(1);
const editForm = ref({
  name: '',
  order: '',
});
//获取所有商品分类
(async () => {
  const result = await getAllCategories();
  tableData.value = result;
})();

// 关闭dialog
const handleClose = (done) => {
  done();
};

// 添加分类
const handleAddCategory = async () => {
  if (name.value && order.value) {
    const data = {
      name: name.value,
      order: order.value,
    };
    const result = await addOneCategory(data);
    tableData.value.push(result);
    name.value = '';
    ElMessage({
      message: '添加商品分类成功！',
      type: 'success',
    });
  }
};

// 编辑按钮
const handleEdit = (index, row) => {
  dialogVisible.value = true;
  editForm.value = { ...row };
};

const confirmEvent = async ({ id }) => {
  const result = await deleteCategoryInfoById(id);
  ElMessage({
    message: '删除商品分类成功！',
    type: 'success',
  });
  const index = tableData.value.findIndex((item) => item.id === id);
  tableData.value.splice(index, 1);
};

const handleConfirmEdit = async () => {
  const { id, ...data } = { ...editForm.value };
  const result = await UpdateCategoryInfoById(id, data);
  const index = tableData.value.findIndex((item) => item.id === id);
  tableData.value[index] = result;
  dialogVisible.value = false;
  ElMessage({
    message: '修改商品分类信息成功！',
    type: 'success',
  });
};
</script>

<style lang="scss" scoped>
:deep(.el-table .cell) {
  text-align: center;
}

:deep(.el-input-group) {
  width: 450px;
  margin-right: 15px;
}
.add {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
}
</style>
