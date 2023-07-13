<template>
  <modal name="ProductSearch" width="100%" height="100%" :adaptive="true" :clickToClose="false" @before-open="open">
    <div class="wrap">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">{{ $t('message.btnSearchPrdt') }}</h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="close"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <div class="product_s_contents" @scroll="handleScroll">
          <div id="TabS">
            <ul class="tab-menu">
              <li v-for="(tab, index) in tabs" v-bind:class="{ active: currentTab === index }" :key="index">
                <a v-on:click="[(currentTab = index), (productList = []), (pageNumber = 0), (pageInfo = {})]">{{ tab }}</a>
              </li>
            </ul>
            <div class="tab-content">
              <div v-show="currentTab == 0"><SearchTab ref="SearchTab" :productCdList="productCdList" @getProductList="getProductList" :productList="productList" :pageNumber="pageNumber" :prdtCdList="prdtCdList" :currentTab="currentTab" :pageInfo="pageInfo" @resetPageNum="pageNumber = 0" /></div>
              <div v-show="currentTab == 1"><FavoriteTab ref="FavoriteTab" @getProductList="getProductList" :productList="productList" :pageNumber="pageNumber" :currentTab="currentTab" :pageInfo="pageInfo" @resetPageNum="pageNumber = 0" /></div>
              <div v-show="currentTab == 2"><PrevOrderTab ref="PrevOrderTab" @getProductList="getProductList" :productList="productList" :pageNumber="pageNumber" :currentTab="currentTab" :pageInfo="pageInfo" @resetPageNum="pageNumber = 0" /></div>
            </div>
          </div>
        </div>
        <!-- 하단 버튼 -->
        <div class="bottom_select_result_contents">
          <div class="btn_box">
            <button class="btn_cancle" @click="close">{{ $t('message.btnCancel') }}</button>
            <button class="btn_add" @click="addProduct">{{ $t('message.btnAdd') }}</button>
          </div>
        </div>
        <!-- //하단 버튼 -->
      </div>
      <!-- //컨텐츠 바디 -->
      <HomeTap @goToTop="goToTop" :showHome="false" />
    </div>
  </modal>
</template>

<script>
import { mapGetters } from 'vuex';
import productApi from '@/api/order/product';
import SearchTab from '@m/components/order/product/SearchTab'; //상품검색
import FavoriteTab from '@m/components/order/product/FavoriteTab'; //즐겨찾기
import PrevOrderTab from '@m/components/order/product/PrevOrderTab'; //이전주문
import HomeTap from '@m/components/HomeTap';

export default {
  props: ['custId', 'prdtCdList', 'page'],
  components: {
    SearchTab,
    FavoriteTab,
    PrevOrderTab,
    HomeTap,
  },
  computed: {
    ...mapGetters({
      authButton: 'userInfo/getAuthButton',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
    }),
  },
  data() {
    return {
      currentTab: 0,
      tabs: [this.$t('message.searchCategory'), this.$t('message.btnFavorite'), this.$t('message.previousOrder')],
      productCdList: {},
      productList: [],
      pageNumber: 0,
      pageInfo: {},
      el: '',
    };
  },
  methods: {
    goToTop() {
      if (Object.keys(this.el).length > 0) this.el.target.scrollTop = 0;
    },
    handleScroll(el) {
      this.el = el;
      if (Math.ceil(el.target.offsetHeight + el.target.scrollTop) >= el.target.scrollHeight) {
        if (this.pageInfo.finalPageNo - 1 > this.pageNumber) this.pageNumber++;
      }
    },
    open() {
      // this.getProductCode();
      if (this.userMenuGrpCd !== 'CUSTOMER') {
        this.tabs = [this.$t('message.searchCategory')];
      }
    },
    async getProductCode() {
      try {
        const resp = await productApi.getProductCode();
        resp.data.ds.forEach(list => {
          if (list.groupCd === 'PRDT_TSK') {
            this.productCdList[list.groupCd] = list.codeList.filter(code => code.data2 === 'Y');
          } else {
            this.productCdList[list.groupCd] = list.codeList;
          }
        });
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    getProductList(data) {
      data.param['custId'] = this.custId;
      if (data.type === 'search') {
        this.searchProduct(data);
      } else if (data.type === 'favorite') {
        this.getProductFavorite(data);
      } else if (data.type === 'prev') {
        this.getProductPrevious(data);
      }
    },
    async searchProduct(data) {
      try {
        const resp = await productApi.searchProductCode(data.param);
        if (data.click) {
          this.productList = [];
          window.scrollTo(0, 0);
          this.productList = resp.data.ds;
        } else this.productList.push(...resp.data.ds);
        this.pageInfo = resp.data.page;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getProductFavorite(data) {
      try {
        const resp = await productApi.getProductFavorite(data.param);
        if (data.click) this.productList = resp.data.ds;
        else this.productList.push(...resp.data.ds);
        this.pageInfo = resp.data.page;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getProductPrevious(data) {
      try {
        const resp = await productApi.getProductPrevious(data.param);
        if (data.click) this.productList = resp.data.ds;
        else this.productList.push(...resp.data.ds);
        this.pageInfo = resp.data.page;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    addProduct() {
      let currentList = this.$parent.currentProductList(); // 일반견적요청에 등록되어있는 제품 목록
      let checkedProduct = []; // 추가할 제품 목록
      if (this.currentTab === 0) {
        checkedProduct = this.$refs.SearchTab.checkedProduct();
      } else if (this.currentTab === 1) {
        checkedProduct = this.$refs.FavoriteTab.checkedProduct();
      } else if (this.currentTab === 2) {
        checkedProduct = this.$refs.PrevOrderTab.checkedProduct();
      }

      let existIndex = [];

      if (currentList.length > 0) {
        for (let i = 0; i < checkedProduct.length; i++) {
          for (let j = 0; j < currentList.length; j++) {
            if (checkedProduct[i].prdtClsCd !== currentList[j].prdtClsCd) {
              this.$EventBus.$emit('openYesModal', 'message.msgConfirmSameCategory');
              return;
            }
            if (checkedProduct[i].prdtCd === currentList[j].prdtCd) {
              existIndex.push(i);
            }
          }
        }
      } else {
        let prdtClsCd = '';
        let isDiff = false;
        for (let i = 0; i < checkedProduct.length; i++) {
          if (i === 0) {
            prdtClsCd = checkedProduct[i].prdtClsCd;
          } else if (prdtClsCd !== checkedProduct[i].prdtClsCd) {
            this.$EventBus.$emit('openYesModal', 'message.msgConfirmSameCategory');
            isDiff = true;
            return;
          }
        }
        if (isDiff) return;
      }

      existIndex.sort((num1, num2) => {
        return num2 - num1;
      });

      existIndex.forEach(num => {
        checkedProduct.splice(num, 1);
      });

      this.$emit('addProductList', checkedProduct);
      this.close();
    },
    close() {
      this.$emit('close');
      this.reset();
      this.$modal.hide('ProductSearch');
    },
    reset() {
      this.currentTab = 0;
      this.productList = [];
    },
  },
  created() {
    this.getProductCode();
  },
};
</script>

<style></style>
