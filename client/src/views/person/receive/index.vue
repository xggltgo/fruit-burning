<template>
  <div class="receive-container">
    <el-collapse v-model="activeNames">
      <el-collapse-item
        :name="item.id"
        v-for="item in receiveStore.receiveList"
        :key="item.id"
      >
        <template #title>
          <div class="title" @click="handleChoose(item.id)">
            <span class="name">{{ item.name }}</span>
            <span class="phone">{{ item.phone }}</span>
            <el-tag class="ml-2" v-if="item.isDefault">默认</el-tag>
          </div>
        </template>
        <div class="detail">
          <div class="left">
            <div>
              {{
                (map[item.province] || '') +
                ' ' +
                (map[item.city] || '') +
                ' ' +
                (map[item.county] || '')
              }}
            </div>
            <div>
              {{ item.detailAddress }}
            </div>
          </div>
          <div class="right">
            <el-tooltip content="编辑" placement="top">
              <i class="iconfont icon-edit" @click="handleEdit(item)"></i>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <i
                class="iconfont icon-delete1"
                @click="handleDelete(item.id)"
              ></i>
            </el-tooltip>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>

    <div class="btn">
      <el-button type="primary" @click="handleAdd">添加收货地址</el-button>
    </div>

    <!-- 编辑收货地址 -->
    <el-dialog
      v-model="dialogVisible"
      title="编辑收货地址"
      width="30%"
      :before-close="handleClose"
    >
      <!-- 表单 -->
      <el-form :model="form" label-width="100px">
        <el-form-item label="收货人">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="所在地区">
          <el-cascader
            v-model="form.value"
            :options="options"
            @change="handleSelectChange"
            placeholder="请选择您的收货地址"
          />
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="form.detailAddress" />
        </el-form-item>
        <el-form-item label="设为默认地址">
          <el-switch v-model="form.isDefault" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useReceiveStore } from '@/store/receive';
import { injectDataToObject } from '@/utils/tools';
import { ElNotification } from 'element-plus';
import { getReceiveById } from '@/api/receive';
import { updateOrder } from '@/api/order';

const handleSelectChange = (value) => {
  form.value.province = value[0];
  form.value.city = value[1];
  form.value.county = value[2];
};

const route = useRoute();
const options = ref([]);
const receiveStore = useReceiveStore();
const map = reactive({});
const dialogVisible = ref(false);
const activeNames = computed(() => receiveStore.receiveList[0]?.id);
const form = ref({});
const isUsing = ref(false);
const type = ref('update');
const emit = defineEmits();

const fetchCityList = async () => {
  const res = await fetch('https://study.duyiedu.com/api/citylist');
  const result = await res.json();
  options.value = result.data;
  injectDataToObject(map, result.data);
};

fetchCityList();

const handleClose = (done) => {
  done();
};

// 编辑收货地址
const handleEdit = async (receiveInfo) => {
  form.value = {
    ...receiveInfo,
    value: [receiveInfo.province, receiveInfo.city, receiveInfo.county],
  };
  dialogVisible.value = true;
  const { using } = await getReceiveById(form.value.id);
  isUsing.value = using;
};

//确认编辑 发送请求到服务器修改
const handleSubmit = async () => {
  // 发送之前 判断是否已有订单正在使用该地址
  const data = { ...form.value };
  delete data.value;
  if (type.value === 'update') {
    if (isUsing.value) {
      dialogVisible.value = false;
      ElNotification({
        title: '温馨提示',
        message: '当前已有订单正在使用该地址，请在订单取消或交易成功后重试!',
        duration: 0,
        type: 'warning',
      });
      return;
    }
    const result = await receiveStore.updataReceiveInfo(data);
  } else {
    const result = await receiveStore.addReceiveInfo(data);
  }
  dialogVisible.value = false;
  ElNotification({
    title: 'Success',
    message: type.value === 'update' ? '收货信息修改成功!' : '添加收货信息成功',
    type: 'success',
  });
};

// 添加收货信息
const handleAdd = async () => {
  form.value = {};
  type.value = 'add';
  dialogVisible.value = true;
};

// 删除收货信息
const handleDelete = async (id) => {
  const { using } = await getReceiveById(id);
  isUsing.value = using;
  if (isUsing.value) {
    dialogVisible.value = false;
    ElNotification({
      title: '温馨提示',
      message: '当前已有订单正在使用该地址，请在订单取消或交易成功后重试!',
      duration: 0,
      type: 'warning',
    });
    return;
  }
  const result = await receiveStore.removeReceiveInfo(id);
  ElNotification({
    title: 'Success',
    message: '删除收货信息成功',
    type: 'success',
  });
};

// 如果在订单详情页面时，点击title区域可以选中该地址
const handleChoose = async (receiveid) => {
  if (route.name !== 'orderDetail') {
    return;
  }
  // 修改对应订单的 receiveid
  const result = await updateOrder(route.params.id, {
    receiveid,
  });
  // 通知父组件修改完成
  emit('receiveDone',result.receiveid)
};
</script>

<style lang="scss" scoped>
@use '@/styles/var.scss' as *;
@import url('//at.alicdn.com/t/c/font_3920335_f53dc4y1i9i.css');
.receive-container {
  color: $dark;
}

.iconfont {
  &:hover {
    color: $base;
  }
  &.icon-delete1 {
    margin-left: 5px;
  }
}

.title {
  .name {
    font-size: 16px;
    font-weight: bold;
    margin-right: 10px;
  }
  .phone {
    font-size: 12px;
    color: #999;
    margin-right: 10px;
  }
}

.detail {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .right {
    cursor: pointer;
  }
}

.btn {
  margin-top: 30px;
}
</style>
