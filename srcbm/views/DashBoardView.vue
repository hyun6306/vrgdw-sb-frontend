<template>
  <div class="wrap">
    <!-- 상단 헤더 -->
    <div class="header">
      <div class="header_title">
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
    <!-- 컨텐츠 바디 -->
    <div class="container" id="main_container">
      <!-- 대시보드     -->
      <section class="dashboard_contents">
        <!--        공지사항-->
        <div class="dashboard_notice">
          <p class="dashboard_title">
            <strong>Notice</strong>
            <a href="">+</a>
          </p>
          <ul class="dashboard_notice_list">
            <li>
              <a href="">
                <span>VRGDW 공지사항입니다.</span>
                <i>[2022/10/30]</i>
              </a>
            </li>
            <li>
              <a href="">
                <span>VRGDW 공지사항입니다.</span>
                <i>[2022/10/30]</i>
              </a>
            </li>
            <li>
              <a href="">
                <span>VRGDW 공지사항입니다.</span>
                <i>[2022/10/30]</i>
              </a>
            </li>
          </ul>
        </div>
        <!--진행 상태-->
        <div class="dashboard_status">
          <div class="status_box quote">
            <span>견적확정</span>
            <strong><i>7</i>items</strong>
            <i class="i_deco"><img src="@m/assets/img/icon_dash_check.png" /></i>
          </div>
          <div class="status_box booking">
            <span>
              부킹확정
              <!-- 영업 할당요청 -->
            </span>
            <strong><i>7</i>items</strong>
            <i class="i_deco"><img src="@m/assets/img/icon_dash_check.png" /></i>
          </div>
          <div class="status_box delivery">
            <span>
              배송가능
              <!-- 영업 배송요청 -->
            </span>
            <strong><i>7</i>items</strong>
            <i class="i_deco"><img src="@m/assets/img/icon_dash_check.png" /></i>
          </div>
          <div class="status_box delivery_start">
            <span>
              배송출발
              <!-- 영업 배송완료 -->
            </span>
            <strong><i>17</i>items</strong>
            <i class="i_deco"><img src="@m/assets/img/icon_dash_check.png" /></i>
          </div>
        </div>
        <!-- 출고예정현황       -->
        <!-- <div class="dashboard_week">
          <p class="dashboard_title">
            <strong>출고예정현황</strong>
          </p>
          
          <div class="dashboard_week_box">
            <p class="dashboard_week_box_month">2022년 11월</p>
            <div class="week_contens">
              <ul class="week_title">
                <li>SUN</li>
                <li>MON</li>
                <li>TUE</li>
                <li>WED</li>
                <li>THR</li>
                <li>FRI</li>
                <li>SAT</li>
              </ul>
              <ul class="week_day">
                <li><button>1</button></li>
                <li><button class="day_event">2</button></li>
                <li><button>3</button></li>
                <li><button class="day_event">4</button></li>
                <li><button>5</button></li>
                <li><button>6</button></li>
                <li><button>7</button></li>
              </ul>
            </div>
          </div>
          
        </div> -->

        <!-- 배송현황 -->
        <div class="dashboard_delivery">
          <p class="dashboard_title">
            <strong>배송현황</strong>
          </p>
          <div class="delivery_box">
            <div class="delivery_box_head">
              <strong>배송지명 Wood inc</strong>
              <span class="delivery_icon delivery_ing">배송중</span>
            </div>
            <div class="delivery_box_info">
              <table>
                <colgroup>
                  <col style="width: 40%" />
                  <col style="width: 27%" />
                  <col style="width: 15%" />
                  <col style="width: 18%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>배차계획번호</th>
                    <td>22020830-0001</td>
                    <th>Volumn</th>
                    <td>128,744</td>
                  </tr>
                  <tr>
                    <th>Delivery Method</th>
                    <td colspan="3">VRGDW</td>
                  </tr>
                  <tr>
                    <th>Delivery Start Date</th>
                    <td colspan="3">21-10-2-22</td>
                  </tr>
                  <tr>
                    <th>Delivery Completion Date</th>
                    <td colspan="3">21-10-2-22</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="delivery_box">
            <div class="delivery_box_head">
              <strong>배송지명 Wood inc</strong>
              <span class="delivery_icon delivery_end">배송완료</span>
            </div>
            <div class="delivery_box_info">
              <table>
                <colgroup>
                  <col style="width: 40%" />
                  <col style="width: 27%" />
                  <col style="width: 15%" />
                  <col style="width: 18%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>배차계획번호</th>
                    <td>22020830-0001</td>
                    <th>Volumn</th>
                    <td>128,744</td>
                  </tr>
                  <tr>
                    <th>Delivery Method</th>
                    <td colspan="3">VRGDW</td>
                  </tr>
                  <tr>
                    <th>Delivery Start Date</th>
                    <td colspan="3">21-10-2-22</td>
                  </tr>
                  <tr>
                    <th>Delivery Completion Date</th>
                    <td colspan="3">21-10-2-22</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
import days from 'dayjs';

export default {
  data() {
    return {
      selectDate: '',
      active: false,
      bookmarkbox: false,
      bookmark: false,
      hbookmark: false,
      MainMenuOpen: false,
      leftMenuOpen: false,
      registClose: false,
      selectOptions: ['KOR', 'ENG', 'VET'],
    };
  },
  methods: {
    test() {
      this.selectDate = days(this.time2).format('YYYY.MM.DD');
    },
    onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    },
    chooseDay() {
      console.log('chooseDay');
      this.$emit('chooseDay', this.selectDate);
      this.$modal.hide('DatePicker');
    },
  },
};
</script>

<style></style>
