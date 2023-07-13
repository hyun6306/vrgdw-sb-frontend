<template>
  <div class="wrap">
    <!-- 상단 헤더 -->
    <div class="header">
      <div class="header_title header_title_logo">
        <h1 class="logo in_img"><img src="@m/assets/img/logo_header.svg" alt="VRG Dongwha D-Sales" /></h1>
      </div>
      <div class="header_left">
        <button class="btn_header in_img" @click="leftMenuOpen = !leftMenuOpen"><img src="@m/assets/img/icon_menu.png" /></button>
      </div>
      <div class="header_right">
        <button @click="bookmarkbox = !bookmarkbox" class="btn_header btn_hader_bookmark in_img" :class="{ bookmarkbox_on: bookmarkbox }"><img src="@m/assets/img/icon_top_menu_star.png" /></button>
        <button class="btn_header in_img">
          <img src="@m/assets/img/icon_top_menu_alarm.png" />
          <!-- 신규알람 발생 시 -->
          <i class="icon_alram"></i>
        </button>
        <!-- 자주찾는 메뉴 -->
        <div class="bookmark_box" :class="{ bookmarkbox_on: bookmarkbox }">
          <p class="bookmark_title">자주찾는 메뉴</p>
          <ul>
            <li class="bookmark_list" @click="bookmark = !bookmark">
              <i class="btn_head_bookmark" :class="{ bookmark_on: bookmark }"></i>
              <span>견적요청</span>
            </li>
            <li class="bookmark_list" @click="bookmark = !bookmark">
              <i class="btn_head_bookmark" :class="{ bookmark_on: bookmark }"></i>
              <span>견적요청</span>
            </li>
          </ul>
        </div>
        <!-- //자주찾는 메뉴 -->
      </div>
    </div>
    <!-- //상단 헤더 -->
    <!-- 왼쪽메뉴 -->
    <div class="left_menu_contents" :class="{ left_menu_open: leftMenuOpen }">
      <button class="btn_close" @click="leftMenuOpen = !leftMenuOpen"></button>
      <div class="left_menu_compo">
        <div class="info_section">
          <div class="menu_head">
            <span class="menu_logo in_img"><img src="@m/assets/img/logo.png" /></span>
            <MultiSelect id="배송형태" style="100%" class="select_lang" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="KOR"></MultiSelect>
          </div>
          <div class="user_info">
            <i class="profile in_img"><img src="@m/assets/img/profile_img.png" /></i>
            <span class="user_name">구매자님</span>
            <button class="btn_logout">로그아웃</button>
            <div class="call_box">
              <a href="tel:010-1111-1111" class="btn_call">
                <small>MDF</small>
                <i class="in_img"><img src="@m/assets/img/icon_call.png" /></i>
                <strong>123-1234-1234</strong>
              </a>
              <a href="tel:010-1111-1111" class="btn_call">
                <small>MDF</small>
                <i class="in_img"><img src="@m/assets/img/icon_call.png" /></i>
                <strong>123-1234-1234</strong>
              </a>
            </div>
          </div>
        </div>
        <div class="menu_section">
          <div class="menu_box" :class="{ main_menu_open: MainMenuOpen }">
            <div class="main_menu" @click="MainMenuOpen = !MainMenuOpen">
              <span>메인메뉴</span>
              <i class="in_img ml-a"><img src="@m/assets/img/icon_up.png" /></i>
            </div>
            <div class="sub_menu_list_box">
              <p class="sub_menu_title">서브메뉴 타이틀</p>
              <ul>
                <li class="sub_menu_list">
                  <a href="">서브메뉴</a>
                  <button @click="hbookmark = !hbookmark" class="btn_bookmark" :class="{ bookmark_on: hbookmark }"></button>
                </li>
                <li class="sub_menu_list">
                  <a href="">서브메뉴</a>
                  <button @click="hbookmark = !hbookmark" class="btn_bookmark" :class="{ bookmark_on: hbookmark }"></button>
                </li>
              </ul>
            </div>
          </div>
          <div class="menu_box" :class="{ main_menu_open: MainMenuOpen }">
            <div class="main_menu" @click="MainMenuOpen = !MainMenuOpen">
              <span>메인메뉴</span>
              <i class="in_img ml-a"><img src="@m/assets/img/icon_up.png" /></i>
            </div>
            <div class="sub_menu_list_box">
              <p class="sub_menu_title">서브메뉴 타이틀</p>
              <ul>
                <li class="sub_menu_list">
                  <a href="">서브메뉴</a>
                  <button @click="bookmark = !bookmark" class="btn_bookmark" :class="{ bookmark_on: bookmark }"></button>
                </li>
                <li class="sub_menu_list">
                  <a href="">서브메뉴</a>
                  <button @click="bookmark = !bookmark" class="btn_bookmark" :class="{ bookmark_on: bookmark }"></button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- //왼쪽메뉴 -->
    <!-- 컨텐츠 바디 -->
    <div class="container" id="main_container">
      <section class="new_regist_section" :class="{ regist_close: registClose }">
        <div class="btn_new_order">
          <img src="@m/assets/img/icon_m_neworder.png" alt="new" />
          <a href="">견적의뢰</a>
          <span>신규 견적을 요청해주세요</span>
        </div>
        <div class="btn_new_order btn_regist_info">
          <img src="@m/assets/img/icon_m_myinfo.png" alt="myinfo" />
          <a href="">내 정보변경</a>
          <span>배송지 및 기본정보를 등록해주세요</span>
        </div>
      </section>
    </div>
    <!-- //컨텐츠 바디 -->
    <!-- 하단 글로벌메뉴 -->
    <div class="footer">
      <section class="g_menu_section">
        <!-- 
          터치 한 경우,
          현재 페이지인 경우 "on 클래스 추가"
         -->
        <a href="" class="g_menu on">
          <i class="in_img"><img src="@m/assets/img/icon_g_menu01.png" alt="견적요청" /></i>
          <span>견적요청</span>
          <!-- <span>Yêu cầu báo giá</span> -->
        </a>
        <a href="" class="g_menu">
          <i class="in_img"><img src="@m/assets/img/icon_g_menu02.png" alt="견적관리" /></i>
          <span>견적관리</span>
          <!-- <span>Quản lý báo giá</span> -->
        </a>
        <a href="" class="g_menu">
          <i class="in_img"><img src="@m/assets/img/icon_g_menu03.png" alt="부킹관리" /></i>
          <span>부킹관리</span>
          <!-- <span>Quản lý đặt chỗ</span> -->
        </a>
        <a href="" class="g_menu">
          <i class="in_img"><img src="@m/assets/img/icon_g_menu04.png" alt="배송현황" /></i>
          <span>배송현황</span>
          <!-- <span>Tình trạng giao hàng</span> -->
        </a>
        <a href="" class="g_menu">
          <i class="in_img"><img src="@m/assets/img/icon_g_menu05.png" alt="배송지관리" /></i>
          <span>배송지관리</span>
          <!-- <span>Quản lý địa chỉ giao hàng</span> -->
        </a>
      </section>
    </div>
    <!-- 하단 글로벌메뉴 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookmarkbox: false,
      bookmark: false,
      hbookmark: false,
      MainMenuOpen: false,
      leftMenuOpen: false,
      registClose: false,
      selectOptions: ['KOR', 'ENG', 'VET'],
    };
  },
};
</script>

<style></style>
