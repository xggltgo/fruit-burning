<template>
  <div class="search-container animate__animated animate__slideInUp">
    <h1 class="page-name">“{{ route.query.searchText }}”搜索结果</h1>
    <!-- 内容区域 -->
    <div class="content">
      <div class="fruit-list">
        <div class="list-item" v-for="item in searchProductList" :key="item.id">
          <Hot :productInfo="item" :marginBottom="0" />
        </div>
        <el-empty description="暂无对应商品" v-if="searchProductList.length === 0" />
      </div>
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
import { ref, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getProductByPage } from '@/api/product';
import Hot from '@/components/Hot.vue';

const route = useRoute();
const searchProductList = ref([]);

const pageInfo = reactive({
  page: 1,
  limit: 20,
});
const total = ref(0);
//从服务器获取搜索结果
const fetchSearchProductList = async () => {
  const result = await getProductByPage({
    ...pageInfo,
    keyword: route.query.searchText,
  });
  searchProductList.value = result.productList;
  total.value = result.total;
};
fetchSearchProductList();

watch(
  () => route.query.searchText,
  () => {
    pageInfo.page = 1;
    fetchSearchProductList();
  }
);

// 处理翻页逻辑
const handlePageChange = (newPage) => {
  // 滚动条置顶
  document.querySelector('.app-container').scrollTo(0, 0);
  pageInfo.page = newPage;
  fetchSearchProductList();
};
</script>

<style lang="scss" scoped>
@use '@/styles/var.scss' as *;
.search-container {
  margin: 15px 300px;
  color: $dark;
  min-height: 100%;
}
.content {
  margin-top: 10px;
  box-shadow: var(--el-box-shadow-light);
  padding: 30px 15px 20px 15px;
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

.pager {
  margin: 30px auto;
  display: flex;
  justify-content: center;
}

:deep(.el-empty){
  margin: 0 auto;
}
</style>
