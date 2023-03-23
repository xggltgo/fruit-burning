<template>
  <div class="order-list-container">
    <!-- 数据表格 -->
    <el-table :data="tableData" style="width: 100%" stripe border>
      <el-table-column label="序号" width="100">
        <template #default="scope">
          {{ (pageInfo.page - 1) * pageInfo.limit + (scope.$index + 1) }}
        </template>
      </el-table-column>

      <el-table-column label="订单条目">
        <template #default="scope">
          <div v-for="item in scope.row.products">
            {{ `${item.name}（数量：${item.orderDetail.productCount}）` }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="payment" label="订单总额" width="150" />

      <el-table-column label="订单状态" width="150">
        <template #default="scope">
          <el-tag :type="mapStatus(scope.row.status).type">{{
            mapStatus(scope.row.status).text
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="收货信息">
        <template #default="scope">
          <div>收货人：{{ scope.row.receive.name }}</div>
          <div>联系电话：{{ scope.row.receive.phone }}</div>
          <div>
            收货地址： {{ map[scope.row.receive.province] }}&nbsp;{{
              map[scope.row.receive.city]
            }}&nbsp;{{ map[scope.row.receive.county] }}&nbsp;{{
              scope.row.receive.detailAddress
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" width="200">
        <template #default="scope">
          {{ formatLocaleTime(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            :disabled="scope.row.status !== 2"
            @click="handleSend(scope.$index, scope.row)"
            >发货</el-button
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
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { getAllOrder, updateOrder } from '@/api/order';
import { formatLocaleTime, injectDataToObject } from '@/utils//tools';
import { getCityList } from '@/api/address';

let tableData = ref([]);
const options = ref([]);
const total = ref(0);
const map = reactive({});
const pageInfo = reactive({
  page: 1,
  limit: 10,
});

// 分页获取订单
const fetchOrderByPage = async () => {
  const result = await getAllOrder(pageInfo);
  tableData.value = result.orderList;
  total.value = result.total;
};
fetchOrderByPage();

// 获取城市数据
const fetchCityList = async () => {
  const result = await getCityList();
  options.value = result;
  injectDataToObject(map, result);
};
fetchCityList();

// 处理翻页逻辑
const handlePageChange = (newPage) => {
  // 滚动条置顶
  pageInfo.page = newPage;
  fetchOrderByPage();
};

// 映射商品状态
const mapStatus = (status) => {
  switch (status) {
    case 0:
      return { text: '已取消', type: 'info' };
    case 2:
      return { text: '待发货', type: '' };
    case 3:
      return { text: '已发货', type: 'danger' };
    case 4:
      return { text: '交易完成', type: 'success' };

    default:
      return { text: '待付款', type: 'warning' };
  }
};

// 处理发货
const handleSend = async (index, { id }) => {
  const result = await updateOrder(id, {
    status: 3,
    sendTime: Date.now() + '',
  });
  await fetchOrderByPage();
  ElMessage({
    message: '发货成功！',
    type: 'success',
  });
};
</script>

<style lang="scss" scoped>
.order-list-container {
  width: 100%;
  height: 100%;
}

.pager {
  margin: 30px auto;
  display: flex;
  justify-content: center;
}

// 表格文字居中
:deep(.el-table .cell) {
  text-align: center;
}
</style>
