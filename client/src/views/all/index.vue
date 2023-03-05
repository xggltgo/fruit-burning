<template>
  <div class="all-container">
    <div class="search animate__animated animate__slideInRight">
      <div class="left">
        <el-statistic title="GUORAN 商品总数" :value="total" />
      </div>
      <el-divider direction="vertical" />
      <div class="right">
        <div class="status">
          <span class="tip">商品状态</span>
          <el-radio-group v-model="statusRadio" @change="handleStatusChange">
            <el-radio-button label="全部" />
            <el-radio-button label="热销商品" />
            <el-radio-button label="最近上新" />
          </el-radio-group>
        </div>
        <el-divider border-style="dashed" />
        <div class="category">
          <span class="tip">商品分类</span>
          <el-radio-group
            v-model="categoryRadio"
            @change="handleCategoryChange"
            size="small"
            fill="#F56C6C"
          >
            <el-radio-button label="全部" />
            <el-radio-button
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
            />
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="fruit-list">
      <div class="list-item animate__animated animate__zoomIn animate__delay-1s" v-for="item in productList" :key="item.id">
        <Hot :productInfo="item" :marginBottom="0" />
      </div>
      <el-empty description="暂无对应商品" v-if="productList.length === 0" />
    </div>
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
import { reactive, ref } from 'vue';
import Hot from '../../components/Hot.vue';
import { getProductByPage } from '@/api/product';
import { getAllCategories } from '@/api/category';

const categoryList = ref([]);
const productList = ref([]);
const total = ref(0);
const statusRadio = ref('全部');
const categoryRadio = ref('全部');

const pageInfo = reactive({
  page: 1,
  limit: 20,
  categoryid: -1,
  status: 0,
});

//获取所有商品分类
(async () => {
  const result = await getAllCategories();
  categoryList.value = result;
})();

// 分页获取所有商品列表
const fetchProductByPage = async () => {
  const result = await getProductByPage(pageInfo);
  productList.value = result.productList;
  total.value = result.total;
};
fetchProductByPage();

// 处理翻页逻辑
const handlePageChange = (newPage) => {
  // 滚动条置顶
  document.querySelector('.app-container').scrollTo(0, 0);
  pageInfo.page = newPage;
  fetchProductByPage();
};

const handleStatusChange = (newVal) => {
  if (newVal === '热销商品') {
    pageInfo.status = 1;
  } else if (newVal === '最近上新') {
    pageInfo.status = 2;
  } else {
    pageInfo.status = 0;
  }
  fetchProductByPage();
};

const handleCategoryChange = (newVal) => {
  const item = categoryList.value.find((item) => item.name === newVal);
  pageInfo.categoryid = item?.id || -1;
  fetchProductByPage();
};
</script>

<style lang="scss" scoped>
@use '@/styles/var.scss' as *;
.all-container {
  width: 1190px;
  margin: 0 auto;
  min-height: 100%;
}

.search {
  width: 100%;
  height: 150px;
  display: flex;
  margin-top: 30px;
  padding: 30px 15px;
  box-shadow: var(--el-box-shadow-light);
  .right {
    flex-grow: 1;
    .status {
      display: flex;
      align-items: center;
    }
    .category {
      display: flex;
      align-items: center;
    }
  }
  .left{
    flex-shrink: 0;
  }
}

.fruit-list {
  margin: 30px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 30px 23px;
  .list-item {
    width: 280px;
  }
}

:deep(.el-empty) {
  margin: 0 auto;
}

.tip {
  font-size: 15px;
  font-weight: bold;
  margin-right: 15px;
  color: $dark;
}

.pager {
  margin: 30px auto;
  display: flex;
  justify-content: center;
}

:deep(.el-statistic__head) {
  font-size: 24px;
  font-weight: bold;
}

:deep(.el-statistic__number) {
  font-size: 30px;
  font-weight: bold;
}

:deep(.el-statistic__content) {
  text-align: center;
}

:deep(.el-divider--vertical) {
  height: 100%;
  margin: 0 30px;
}

:deep(.el-divider--horizontal) {
  margin: 10px 0;
}

:deep(.el-radio-button--small) {
  margin: 0 10px;
}
:deep(.el-radio-group){
  row-gap: 10px;
}
</style>
