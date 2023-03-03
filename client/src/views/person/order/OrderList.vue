<template>
  <div class="order-list-container">
    <el-card class="box-card" v-for="item in orderList">
      <template #header>
        <div class="card-header">
          <span class="name" @click="NavToOrderDetail(item.id)"
            >订单详情({{ item.products?.length }})</span
          >
          <el-badge
            :value="mapStatus(item.status)"
            class="item"
            :type="mapType(item.status)"
          >
            <span class="payment">&yen;{{ item.payment }}</span>
          </el-badge>
        </div>
      </template>

      <!-- 存放商品列表 -->
      <div class="content">
        <OrderItem
          v-for="productItem in item.products"
          :key="productItem.id"
          :productInfo="productItem"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import OrderItem from './OrderItem.vue';
defineProps({
  orderList: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const router = useRouter();

const mapStatus = (status) => {
  switch (status) {
    case 0:
      return '已取消';
    case 2:
      return '待发货';
    case 3:
      return '已发货';
    case 4:
      return '交易完成';
    default:
      return '待付款';
  }
};

const mapType = (status) => {
  switch (status) {
    case 0:
      return 'info';
    case 2:
      return 'primary';
    case 3:
      return 'danger';
    case 4:
      return 'success';
    default:
      return 'warning';
  }
};

const NavToOrderDetail = (id) => {
  router.push({
    name: 'orderDetail',
    params: {
      id: id,
    },
  });
};
</script>

<style lang="scss" scoped>
@use '@/styles/var.scss' as *;

.order-list-container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.el-card__header) {
  padding: 10px 10px;
}

:deep(.el-card__body) {
  padding: 15px 15px;
}

.name {
  font-weight: bold;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: $base;
  }
}

.payment {
  color: $base;
}

.item {
  margin-top: 10px;
  margin-right: 40px;
}

.box-card {
  width: 300px;
}
</style>
