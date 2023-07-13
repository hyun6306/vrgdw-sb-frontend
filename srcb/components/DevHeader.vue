<template>
  <div id="header">
    <div class="header_top">
      <div class="top_section">
        <div class="top_left">
          <h1><img src="@/assets/img/logo.png" /></h1>
          <span><img src="@/assets/img/head_title.svg" alt="D-Sales" /></span>
        </div>
        <div class="top_right">
          <button class="btn_confi" @click="confiOpen = !confiOpen">
            <i class="user"><img src="@/assets/img/icon_man.png" alt="User" /></i>
            <span>confimation</span>
            <i class="arrow"><img src="@/assets/img/arrow_down.png" alt="down" /></i>
          </button>
          <!-- confimation 드롭다운 메뉴 -->
          <div class="confi_dropdown_box" :class="{ drop_active: myinfoOpen }">
            <a class="">자주 찾는 메뉴</a>
            <a class="">마이페이지</a>
            <a class="">로그아웃</a>
          </div>
          <!-- //confimation 드롭다운 메뉴 -->
          <button class="btn_menu" @click="myinfoOpen = !myinfoOpen" :class="{ myinfo_on: myinfoOpen }"></button>
          <!-- 내정보 드롭다운 메뉴 -->
          <div class="myinfo_dropdown_box" :class="{ drop_myinfo: confiOpen }">
            <div class="myinfo_head">
              <div class="profile">
                <i><img src="@/assets/img/icon_man_m.png" alt="프로필 사진" /></i>
                <span class="profile_info">구매자</span>
              </div>
              <MultiSelect id="adderss01" style="width: 105px; flex-shrink: 0" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="KOREA"></MultiSelect>
            </div>
            <div class="myinfo_body">
              <table>
                <colgroup>
                  <col style="width: 30%" />
                  <col style="width: 70%" />
                </colgroup>
                <tr>
                  <th class="t-l">회사명</th>
                  <td>Wood world company</td>
                </tr>
                <tr>
                  <th class="t-l">회사 코드</th>
                  <td>r4890</td>
                </tr>
                <!-- 등록된 주소가 없을경우 -->
                <tr>
                  <th class="t-l">기본 배송지 주소</th>
                  <td><button class="btn_deep_gray">배송지 관리</button></td>
                </tr>
                <tr>
                  <td colspan="2">
                    <div class="a-c">
                      <span class="f-g">등록된 정보가 없습니다.</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th class="t-l">기본 배송지 주소</th>
                  <td><button class="btn_deep_gray">배송지 관리</button></td>
                </tr>
                <tr>
                  <td colspan="2">
                    <div class="address_detail">
                      <span>[호치민대리점]</span>
                      <span>cities and provinces county districts</span>
                      <span>Hïu Bang, Huyen Th¡ch Thât,Thành phô Hà Noi, Viet Nam</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th class="t-l">배송지 연락처 1</th>
                  <td>0000-000-0000</td>
                </tr>
                <tr>
                  <th class="t-l">배송지 연락처 2</th>
                  <td>0000-000-0000</td>
                </tr>
              </table>
            </div>
            <div class="myinfo_footer">
              <!-- 지정된 영업 사원이 있는 경우 -->
              <div class="profile">
                <i><img src="@/assets/img/icon_man_m.png" alt="프로필 사진" /></i>
                <div class="profile_info">
                  <span>김 영업</span>
                  <small>000-000-0000</small>
                  <small>Dongwha@dongwha.com</small>
                </div>
              </div>
              <!-- //지정된 영업 사원이 있는 경우 -->
              <!-- 지정된 영업 사원이 없는 경우 -->
              <div class="profile">
                <i><img src="@/assets/img/icon_man_m.png" alt="프로필 사진" /></i>
                <div class="profile_info">
                  <span>지정된 영업사원이 없습니다.</span>
                  <small>대표 연락처 : 000-000-0000</small>
                </div>
              </div>
              <!-- //지정된 영업 사원이 없는 경우 -->
            </div>
          </div>
          <!-- //내정보 드롭다운 메뉴 -->
        </div>
      </div>
    </div>
    <div class="header_bottom">
      <div class="bottom_section">
        <ul class="navi">
          <li>
            <button class="btn_main">QUOTATION REQUEST</button>
          </li>
          <li>
            <button class="btn_main">DELIVERY REQUEST</button>
          </li>
          <li>
            <button class="btn_main">SERVICE</button>
          </li>
          <li>
            <button class="btn_main">REPORT</button>
          </li>
          <li>
            <button class="btn_main">UTILITY</button>
          </li>
        </ul>

        <!-- 서브메뉴 
        기본상태 sub_navi 클래스만 존해
        메인 메뉴 마우스 오버시 active 클래스 추가
         -->
        <div class="sub_navi sub_navi">
          <div class="sub_navi_cate">
            <p class="sub_navi_title">Sample estimate management</p>
            <ul>
              <li>
                <button @click="active = !active" class="btn_fav" :class="{ fav_on: active }"></button>
                <a>Sample estimate management</a>
              </li>
              <li>
                <button @click="active = !active" class="btn_fav" :class="{ fav_on: active }"></button>
                <a>일반견적현황</a>
              </li>
              <li>
                <button @click="active = !active" class="btn_fav" :class="{ fav_on: active }"></button>
                <a>표준판가조회</a>
              </li>
            </ul>
          </div>
          <div class="sub_navi_cate">
            <p class="sub_navi_title">샘플견적</p>
            <ul>
              <li>
                <button @click="active = !active" class="btn_fav" :class="{ fav_on: active }"></button>
                <a>샘플견적요청</a>
              </li>
              <li>
                <button @click="active = !active" class="btn_fav" :class="{ fav_on: active }"></button>
                <a>샘플견적현황</a>
              </li>
            </ul>
          </div>
          <div class="sub_navi_cate">
            <p class="sub_navi_title">부킹상세</p>
            <ul>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      current: [],
      active: false,
      confiOpen: false,
      myinfoOpen: false,
      selectValue: '',
      selectOptions: ['KOREA', 'ENGLISH', 'VIETNAM'],
    };
  },
  computed: {
    ...mapGetters({
      notLogin: 'userInfo/getNotLogin',
      menuList: 'userInfo/getMenuList',
    }),
  },
  methods: {
    pageMove(page) {
      this.$router.push(`${page}`);
    },
  },
};
</script>

<style></style>
