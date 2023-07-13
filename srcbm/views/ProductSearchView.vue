<template>
  <div class="wrap">
    <!-- 상단 헤더 -->
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">상품검색</h1>
      </div>
      <div class="header_left"></div>
      <div class="header_right">
        <button class="btn_header btn_close"></button>
      </div>
    </div>
    <!-- //상단 헤더 -->

    <!-- 컨텐츠 바디 -->
    <div class="container">
      <div class="product_s_contents">
        <div id="TabS">
          <ul class="tab-menu">
            <li v-for="(tab, index) in tabs" v-bind:class="{ active: currentTab === index }" :key="index">
              <a v-on:click="currentTab = index">{{ tab }}</a>
            </li>
          </ul>
          <div class="tab-content">
            <div v-show="currentTab == 0"><ProductSearchTab /></div>
            <div v-show="currentTab == 1"><FavoriteTab /></div>
            <div v-show="currentTab == 2"><PrevOrderTab /></div>
          </div>
        </div>
      </div>
      <!-- 하단 버튼 -->
      <div class="bottom_select_result_contents">
        <div class="btn_box">
          <button class="btn_cancle">취소</button>
          <button class="btn_add">추가</button>
        </div>
      </div>
      <!-- //하단 버튼 -->
    </div>
    <!-- //컨텐츠 바디 -->
  </div>
</template>

<script>
import ProductSearchTab from '@mb/components/ProductSearchTab'; //상품검색
import FavoriteTab from '@mb/components/FavoriteTab'; //즐겨찾기
import PrevOrderTab from '@mb/components/PrevOrderTab'; //이전주문

export default {
  components: {
    ProductSearchTab,
    FavoriteTab,
    PrevOrderTab,
  },
  data() {
    return {
      registClose: false,
      selectOptions: ['선택1', '선택2', '선택3'],
      currentTab: 0,
      tabs: ['분류검색', '즐겨찾기', '이전주문'],
    };
  },
};
</script>

<style></style>
