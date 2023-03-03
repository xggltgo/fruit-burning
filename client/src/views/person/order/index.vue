<template>
  <div class="order-container">
    <div class="nav">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane :label="`全部（${orderList.length}）`" name="all">
          <OrderList :orderList="orderList" />
        </el-tab-pane>
        <el-tab-pane
          :label="`已取消（${canceledOrderList.length}）`"
          name="cancel"
        >
          <OrderList :orderList="canceledOrderList" />
        </el-tab-pane>
        <el-tab-pane :label="`待支付（${noPayOrderList.length}）`" name="noPay">
          <OrderList :orderList="noPayOrderList" />
        </el-tab-pane>
        <el-tab-pane :label="`待发货（${payedOrderList.length}）`" name="payed">
          <OrderList :orderList="payedOrderList" />
        </el-tab-pane>
        <el-tab-pane
          :label="`已发货（${sendedOrderList.length}）`"
          name="sended"
        >
          <OrderList :orderList="sendedOrderList" />
        </el-tab-pane>
        <el-tab-pane :label="`交易完成（${doneOrderList.length}）`" name="done">
          <OrderList :orderList="doneOrderList" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getAllOrder } from '@/api/order';
import OrderList from './OrderList.vue';

const orderList = ref([]);
const activeName = ref('all');
(async () => {
  const result = await getAllOrder();
  orderList.value = result;
})();

const canceledOrderList = computed(() => {
  return orderList.value.filter((item) => item.status === 0);
});
const noPayOrderList = computed(() => {
  return orderList.value.filter((item) => item.status === 1);
});
const payedOrderList = computed(() => {
  return orderList.value.filter((item) => item.status === 2);
});
const sendedOrderList = computed(() => {
  return orderList.value.filter((item) => item.status === 3);
});
const doneOrderList = computed(() => {
  return orderList.value.filter((item) => item.status === 4);
});
</script>

<style lang="scss" scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
