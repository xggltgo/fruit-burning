<template>
  <div class="user-list-container">
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
            categoryList.find((item) => item.id === scope.row.categoryid).name
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
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
let tableData = ref([]);
</script>

<style lang="scss" scoped></style>
