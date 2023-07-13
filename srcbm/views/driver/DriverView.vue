<template>
  <div class="wrap">
    <!-- 상단 헤더 -->
    <div class="header header_dirver">
      <div class="header_left">
        <h1 class="logo in_img"><img src="@m/assets/img/logo_header.svg" /></h1>
      </div>
      <div class="header_right">
        <span class="car_number">02더4321</span>
        <button class="btn_logout">logout</button>
      </div>
    </div>
    <!-- //상단 헤더 -->

    <!-- 컨텐츠 바디 -->
    <div class="container">
      <div class="product_s_contents">
        <div id="TabS">
          <ul class="car_tabs_ul">
            <li :class="{ active: currentTab === 0 }" @click="currentTab = 0">
              <a>
                <div class="tab_icon">
                  <span class="icon_exit"></span>
                  <i>5</i>
                </div>
                <span class="tab_title">출차처리</span>
              </a>
            </li>
            <li :class="{ active: currentTab === 1 }" @click="currentTab = 1">
              <a>
                <div class="tab_icon">
                  <span class="icon_sign"></span>
                  <i>5</i>
                </div>
                <span class="tab_title">인수서명</span>
              </a>
            </li>
            <li :class="{ active: currentTab === 2 }" @click="currentTab = 2">
              <a>
                <div class="tab_icon">
                  <span class="icon_dispatch"></span>
                </div>
                <span class="tab_title">배차이력</span>
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div v-show="currentTab == 0"><ExitProcessingTab /></div>
            <div v-show="currentTab == 1"><SignatureTab /></div>
            <div v-show="currentTab == 2"><DispatchResumeTab /></div>
          </div>
        </div>
      </div>
    </div>
    <!-- //컨텐츠 바디 -->
  </div>
</template>
<script>
import ExitProcessingTab from '@mb/components/driver/ExitProcessingTab'; //출차처리
import SignatureTab from '@mb/components/driver/SignatureTab'; //인수서명
import DispatchResumeTab from '@mb/components/driver/DispatchResumeTab'; //배차이력

export default {
  components: {
    ExitProcessingTab,
    SignatureTab,
    DispatchResumeTab,
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
