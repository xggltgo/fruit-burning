<template>
  <div class="order-detail-container animate__animated animate__slideInUp">
    <h1 class="page-name">订单详情</h1>
    <!-- 内容区域 -->
    <div class="content">
      <OrderItem
        v-for="item in orderInfo.products"
        :key="item.id"
        :productInfo="item"
      />
      <el-divider />
      <div class="pay flex">
        <div class="key">商品总价：</div>
        <div class="val">&yen;{{ orderInfo.payment }}</div>
      </div>
      <div class="status flex">
        <div class="key">订单状态：</div>
        <el-tag class="val" :type="mapType(orderInfo.status)">{{
          mapStatus(orderInfo.status)
        }}</el-tag>
      </div>
      <el-divider border-style="dashed" />

      <div class="receive flex">
        <div class="key">收货信息：</div>
        <div class="val">
          {{ receiveInfo.name }}，{{ receiveInfo.phone }}，{{
            receiveInfo.province
          }}&nbsp;{{ receiveInfo.city }}&nbsp;{{ receiveInfo.county }}&nbsp;{{
            receiveInfo.detailAddress
          }}
          <span class="edit" @click="handleEditReceiveInfo"
            >去修改<i class="iconfont icon-arrow-right"></i
          ></span>
        </div>
      </div>
      <el-divider border-style="dashed" />

      <div class="createtime flex time">
        <div class="key">创建时间：</div>
        <div class="val">{{ formatLocaleTime(orderInfo.createTime) }}</div>
      </div>
      <div class="paytime flex time" v-if="orderInfo.payTime">
        <div class="key">付款时间：</div>
        <div class="val">{{ formatLocaleTime(orderInfo.payTime) }}</div>
      </div>
      <div class="sendtime flex time" v-if="orderInfo.sendTime">
        <div class="key">发货时间：</div>
        <div class="val">{{ formatLocaleTime(orderInfo.sendTime) }}</div>
      </div>
      <div class="endtime flex time" v-if="orderInfo.endTime">
        <div class="key">成交时间：</div>
        <div class="val">{{ formatLocaleTime(orderInfo.endTime) }}</div>
      </div>

      <div class="btn">
        <el-button
          @click="handleDeleteOrder"
          v-if="orderInfo.status === 0 || orderInfo.status === 4"
          >删除订单</el-button
        >
        <el-button
          @click="handleCancelOrder"
          type="danger"
          v-if="orderInfo.status === 1 || orderInfo.status === 2"
          >取消订单</el-button
        >
        <el-button
          type="primary"
          @click="handlePayOrder"
          v-if="orderInfo.status === 1"
          >立即支付</el-button
        >
      </div>
    </div>

    <!-- 左侧收货地址抽屉 -->
    <el-drawer v-model="drawerVisible" title="我的收货地址" direction="ltr">
      <Receive @receiveDone="handleReceiveDone" />
    </el-drawer>

    <!-- 支付类型选则区域 -->
    <el-dialog
      v-model="dialogVisible"
      title="选择支付方式"
      width="700px"
      :before-close="handleClose"
    >
      <div class="pay-content">
        <div class="wx hvr-float-shadow" @click="handleConfirmPay(false)">
          <img src="../../assets/wx.png" alt="" />
        </div>
        <div class="zfb hvr-float-shadow" @click="handleConfirmPay(true)">
          <img src="../../assets/zfb.png" alt="" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getOrderById, updateOrder, removeOrder } from '@/api/order';
import { getReceiveById } from '@/api/receive';
import OrderItem from '../person/order/OrderItem.vue';
import { formatLocaleTime } from '@/utils/tools';
import Receive from '@/views/person/receive/index.vue';

const route = useRoute();
const router = useRouter();
const orderInfo = ref({});
const receiveInfo = ref({});
const drawerVisible = ref(false);
const dialogVisible = ref(false);
// 根据订单id获取对应的订单信息
(async () => {
  const result = await getOrderById(route.params.id);
  orderInfo.value = result;
  // 根据收货地址id获取对应的地址信息
  const res = await getReceiveById(result.receiveid);
  receiveInfo.value = res;
})();

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

const handleEditReceiveInfo = () => {
  drawerVisible.value = true;
};

const handleReceiveDone = async (receiveid) => {
  const res = await getReceiveById(receiveid);
  receiveInfo.value = res;
  drawerVisible.value = false;
};

// 关闭付款类型dialog回调
const handleClose = (done) => {
  done();
};

// 取消订单
const handleCancelOrder = async () => {
  // 1. 修改对应订单的 status 为 0
  const result = await updateOrder(route.params.id, {
    status: 0,
  });
  // 2. 导航到结果页面
  router.push({
    name: 'result',
    state: {
      orderid: route.params.id,
      title: '已取消',
      subtitle: '订单已取消，看看其他的吧',
    },
  });
};

// 删除订单
const handleDeleteOrder = async () => {
  // 1. 删除对应订单
  const result = await removeOrder(route.params.id);
  // 2. 导航到结果页面
  router.push({
    name: 'result',
    state: {
      orderid: null,
      title: '已删除',
      subtitle: '订单已删除，看看其他的吧',
    },
  });
};

// 支付一个订单
const handlePayOrder = () => {
  dialogVisible.value = true;
};

// 确认支付类型
const handleConfirmPay = async (type) => {
  dialogVisible.value = false;
  // 1. 更改订单信息
  const result = await updateOrder(route.params.id, {
    status: 2,
    payType: type,
    payTime: Date.now() + '',
  });
  // 2. 导航到结果页面
  router.push({
    name: 'result',
    state: {
      orderid: route.params.id,
      title: '付款成功',
      subtitle: '订单已付款，看看其他的吧',
    },
  });
};
</script>

<style lang="scss" scoped>
@use '@/styles/var.scss' as *;
@import url('//at.alicdn.com/t/c/font_3920335_f53dc4y1i9i.css');
.order-detail-container {
  margin: 15px 300px;
  color: $dark;
  min-height: 100%;
}
.content {
  margin-top: 10px;
  box-shadow: var(--el-box-shadow-light);
  padding: 30px 15px 20px 15px;
}

.flex {
  display: flex;
  justify-content: space-between;
  height: 30px;
  line-height: 30px;
  &.pay {
    .val {
      font-weight: bold;
      color: $base;
    }
  }
  &.time {
    .val {
      color: #867e7e;
      font-size: 13px;
    }
  }
  &.receive {
    .val {
      font-size: 14px;
    }
  }
}

.btn {
  margin-top: 15px;
  text-align: right;
}

.edit {
  color: $base;
  margin-left: 15px;
  cursor: pointer;
  .icon-arrow-right {
    margin-left: 5px;
  }
  &:hover {
    text-decoration: underline;
  }
}

:deep(.el-drawer__title) {
  color: $dark;
  font-weight: bold;
}

:deep(.el-checkbox__label) {
  color: $dark;
}

:deep(.el-drawer__header) {
  margin: 0;
}

:deep(.el-drawer__body) {
  padding-bottom: 0;
}

.pay-content {
  display: flex;
  align-items: center;
  gap: 30px;
  .wx,
  .zfb {
    width: 300px;
    height: 300px;
    box-shadow: var(--el-box-shadow-lighter);
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
  }
}
</style>
