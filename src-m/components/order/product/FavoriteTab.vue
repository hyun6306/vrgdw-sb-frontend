<template>
  <div class="favorite_contents">
    <!-- 검색결과 목록 영역 -->
    <div class="ks_result_section">
      <div class="ks_search_form">
        <label class="list_title">{{ $t('message.searchWord') }}</label>
        <span class="list_form"><input type="text" placeholder="" class="d_input" v-model="filter" /></span>
        <button class="btn_search" @click="getProductFavorite(filter, true)">{{ $t('message.search') }}</button>
      </div>
    </div>
    <ProductList :list="productList" ref="ProductList" :pageInfo="pageInfo" />
    <!-- //검색결과 목록 영역 -->
  </div>
</template>
<script>
import ProductList from '@m/components/order/product/ProductList';

export default {
  props: ['productList', 'pageNumber', 'currentTab', 'pageInfo'],
  components: {
    ProductList,
  },
  data() {
    return {
      filter: '',
    };
  },
  watch: {
    pageNumber() {
      if (this.currentTab === 1) this.getProductFavorite(this.filter);
    },
  },
  computed: {},
  methods: {
    pageMove(page) {
      this.$router.push(`${page}`);
    },
    getProductFavorite(filter, click = false) {
      if (click && this.pageNumber !== 0) {
        this.$emit('resetPageNum');
      }
      const param = {
        // custId: 21,
        filter,
        pageNumber: this.pageNumber,
        pageSize: 10,
      };
      this.$emit('getProductList', { type: 'favorite', param, click });
    },
    checkedProduct() {
      return this.$refs.ProductList.checkedProduct();
    },
  },
};
</script>

<style></style>
