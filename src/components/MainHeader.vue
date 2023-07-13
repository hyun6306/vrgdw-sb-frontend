<template>
  <div id="header">
    <div class="header_top">
      <div class="top_section">
        <div class="top_left">
          <h1><img src="@/assets/img/logo.png" /></h1>
          <span><img src="@/assets/img/head_title.svg" alt="D-Sales" /></span>
        </div>
        <div class="top_right confi_myinfo">
          <button class="btn_confi" @click="[isOpenConfi(), closeInfoMenu()]">
            <i class="user"><img src="@/assets/img/icon_man.png" alt="User" /></i>
            <span v-if="userMenuGrp === 'CUSTOMER' || userMenuGrp === 'TRANSCUS'">{{ loginInfo.custNm }}</span>
            <span v-else>{{ loginInfo.userNm }}</span>
            <i class="arrow"><img src="@/assets/img/arrow_down.png" alt="down" /></i>
          </button>
          <FavoritesModal @choosePage="choosePage" @faMe="faMe" />
          <!-- confimation 드롭다운 메뉴 -->
          <div class="confi_dropdown_box" :class="{ drop_active: myinfoOpen }">
            <a @click="favoriteMenu()" class="" v-if="myinfoOpen">{{ $t('message.favoriteMenu') }}</a>
            <!-- <a lass="" v-if="myinfoOpen">{{ $t('message.userMypage') }}</a> -->
            <a @click="logout()" class="" v-if="myinfoOpen">{{ $t('message.userLogout') }}</a>
          </div>
          <!-- //confimation 드롭다운 메뉴 -->
          <button class="btn_menu" @click="[isOpenMyInfo(), clickMenu()]" :class="{ myinfo_on: myinfoOpen }"></button>
          <!-- 내정보 드롭다운 메뉴 -->
          <div class="myinfo_dropdown_box" :class="{ drop_myinfo: confiOpen }">
            <div class="myinfo_head">
              <div class="profile">
                <i @click="revertToken"><img src="@/assets/img/icon_man_m.png" alt="프로필 사진" /></i>
                <span class="profile_info">{{ loginInfo.custNm }}</span>
              </div>
              <MultiSelect @input="isCheckChangeLanguage" id="address01" style="width: 105px; flex-shrink: 0" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value" label="name" :allow-empty="false"></MultiSelect>
            </div>
            <div class="myinfo_body" v-if="userInfo && (userInfo.menuGrpCd === 'CUSTOMER' || userInfo.menuGrpCd === 'TRANSCUS')">
              <table>
                <colgroup>
                  <col style="width: 40%" />
                  <col style="width: 60%" />
                </colgroup>
                <tr>
                  <th class="t-l">{{ $t('message.companyNm') }}</th>
                  <td>{{ loginInfo.custNm }}</td>
                </tr>
                <tr>
                  <th class="t-l">{{ $t('message.companyCode') }}</th>
                  <td v-if="userMenuGrp === 'CUSTOMER'">{{ userInfo.custCd }}</td>
                  <td v-else-if="userMenuGrp === 'TRANSCUS'">{{ userInfo.trncusCd }}</td>
                </tr>
                <!-- 등록된 주소가 없을경우 -->
                <tr v-if="userMenuGrp === 'CUSTOMER'">
                  <th class="t-l">{{ $t('message.defaultAddr') }}</th>
                  <td>
                    <button class="btn_default btn_function" @click="pageMove('/mypage/delivery')">
                      {{ $t('message.btnAddrManagement') }}
                    </button>
                  </td>
                </tr>
                <tr v-if="!loginInfo.cityNm && !loginInfo.addr && !loginInfo.distrNm && userMenuGrp === 'CUSTOMER'">
                  <td colspan="2">
                    <div class="a-c">
                      <span class="f-g">{{ $t('message.msgEmptyInform') }}</span>
                    </div>
                  </td>
                </tr>
                <tr v-else-if="userMenuGrp === 'CUSTOMER'">
                  <td colspan="2">
                    <!-- <div class="a-c"> -->
                    <span>[ {{ loginInfo.cityNm }} ]</span>
                    <span>{{ loginInfo.distrNm }}</span>
                    <div class="a-l">
                      <span>{{ loginInfo.addr }}</span>
                    </div>
                    <!-- </div> -->
                  </td>
                </tr>
                <tr v-if="loginInfo.phoneNum">
                  <th class="t-l">{{ $t('message.addrNum1') }}</th>
                  <td>{{ loginInfo.phoneNum }}</td>
                </tr>
              </table>
            </div>
            <div class="myinfo_body" v-if="userInfo && userInfo.menuGrpCd !== 'CUSTOMER' && userInfo.menuGrpCd !== 'TRANSCUS'">
              <table>
                <colgroup>
                  <col style="width: 40%" />
                  <col style="width: 60%" />
                </colgroup>
                <tr>
                  <th class="t-l">{{ $t('message.userCd') }}</th>
                  <td>{{ loginInfo.custNm }}</td>
                </tr>
                <tr>
                  <th class="t-l">{{ $t('message.deptNm') }}</th>
                  <td>{{ loginInfo.cityNm }}</td>
                </tr>
                <tr>
                  <th class="t-l">{{ $t('message.positNm') }}</th>
                  <td>{{ loginInfo.distrNm }}</td>
                </tr>
                <tr>
                  <th class="t-l">{{ $t('message.menuGrp') }}</th>
                  <td>
                    <MultiSelect @input="isCheckChangeMenuGrp" id="address01" style="width: 150px; flex-shrink: 0" v-model="menuGrpValue" :options="menuGrpOptions" :searchable="false" :close-on-select="false" :show-labels="false" :allow-empty="false"></MultiSelect>
                  </td>
                </tr>
              </table>
            </div>
            <div v-if="userInfo && (userInfo.menuGrpCd === 'CUSTOMER' || userInfo.menuGrpCd === 'TRANSCUS')" class="myinfo_footer">
              <div class="profile" v-for="(sales, index) in loginInfo.salesInfo" :key="index">
                <i><img src="@/assets/img/icon_man_m.png" alt="프로필 사진" /></i>
                <div class="profile_info">
                  <span>{{ sales.salesMngNm }}</span>
                  <small>{{ sales.mobileNum }}</small>
                  <small>{{ sales.salesEmail }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header_bottom" @mouseleave="closeMenu()">
      <!-- @mouseleave="closeMenu()" -->
      <div class="bottom_section">
        <ul class="navi">
          <li v-for="(list, index) in menuList" :key="'list' + index">
            <button class="btn_main" v-if="list.menuIncYn === 'Y'" @click="openMenu(list.children)">
              {{ list.menuNm }}
            </button>
          </li>
        </ul>
        <!-- 서브메뉴 
        기본상태 sub_navi 클래스만 존해
        메인 메뉴 마우스 오버시 active 클래스 추가
         -->
        <div :class="['sub_navi', isOpenMenu ? 'active' : '']">
          <div v-for="(dept2, index) in subMenuList" :key="'2dept' + index">
            <div class="sub_navi_cate" v-if="dept2.children.length > 0">
              <p class="sub_navi_title">{{ dept2.menuNm }}</p>
              <ul v-if="dept2.children.length > 0">
                <li v-for="(dept3, index2) in dept2.children" :key="'3dept' + index2">
                  <button @click="changeFavoriteMenu(dept3)" class="btn_fav" :class="{ fav_on: dept3.favoriteYn === 'Y' }" v-if="dept3.menuIncYn === 'Y'"></button>
                  <a @click="choosePage(dept3)" v-if="dept3.menuIncYn === 'Y'">{{ dept3.menuNm }}</a>
                </li>
              </ul>
            </div>
            <div class="sub_navi_cate" v-else>
              <ul>
                <li v-if="dept2.menuIncYn === 'Y'">
                  <button @click="changeFavoriteMenu(dept2)" class="btn_fav" :class="{ fav_on: dept2.favoriteYn === 'Y' }"></button>
                  <a @click="choosePage(dept2)">{{ dept2.menuNm }}</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- v-for end -->
        </div>
        <!-- subMenu end -->
      </div>
    </div>
    <AlarmModal :ment="ment" @okOrNo="setCommonChangeOption" />
  </div>
</template>

<script>
import loginApi from '@/api/login';
import commonApi from '@/api/common';
import myInfoApi from '@/api/mypage/myInfo';
import { mapMutations, mapGetters, mapState } from 'vuex';
import FavoritesModal from '@/modal/order/FavoritesModal'; //즐겨찾기
import AlarmModal from '@/modal/AlarmModal';

export default {
  name: 'MainHeader',
  components: { FavoritesModal, AlarmModal },
  data() {
    return {
      current: [],
      menuList: [],
      active: false,
      isOpenMenu: false,
      subMenuList: [],
      confiOpen: false,
      myinfoOpen: false,
      chooseMenu: {
        menuId: '',
        favoriteYn: '',
      },
      loginInfo: {},
      originSelectValue: '',
      selectValue: '',
      selectOptions: [
        { name: 'KOREA', lang: 'ko' },
        { name: 'ENGLISH', lang: 'en' },
        // { name: 'VIETNAM', lang: 'vn' },
      ],
      ment: '',
      type: '',
      originMenuGrpValue: {},
      menuGrpValue: {},
      menuGrpOptions: [],
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userLocale: 'userInfo/getUserLocale',
      userMenuGrp: 'userInfo/getUserMenuGrpCd',
      backUpToken: 'userInfo/getBackUpToken',
    }),
    ...mapState(['isLoading']),
  },
  watch: {
    loginInfo(info) {
      this.menuGrpOptions = info.menuGroup;
      this.menuGrpValue = this.userMenuGrp;
      this.originMenuGrpValue = this.menuGrpValue;
    },
  },
  methods: {
    logout() {
      this.reset(false);
      this.$router.push('/');
    },
    faMe(menu) {
      this.menuList.forEach(dept1 => {
        if (dept1.children.length > 0) {
          dept1.children.forEach(dept2 => {
            if (dept2.menuId === menu.menuId) {
              dept2.favoriteYn = menu.useYn;
            }
            if (dept2.children.length > 0) {
              dept2.children.forEach(dept3 => {
                if (dept3.menuId === menu.menuId) {
                  dept3.favoriteYn = menu.useYn;
                }
              });
            }
          });
        }
      });
    },
    choosePage(page) {
      this.isOpenMenu = false;
      this.$emit('choosePage', page);
    },
    pageMove(routerPath) {
      let page = {};
      page = this.searchPageObj(routerPath);
      if (Object.keys(page)) {
        this.$emit('choosePage', page);
        this.confiOpen = false;
      }
    },
    searchPageObj(routerPath) {
      let pageObj;
      this.menuList.forEach(dept1 => {
        if (dept1.routerPath === routerPath) {
          pageObj = dept1;
        }
        dept1.children.forEach(dept2 => {
          if (dept2.routerPath === routerPath) {
            pageObj = dept2;
          }
          dept2.children.forEach(dept3 => {
            if (dept3.routerPath === routerPath) {
              pageObj = dept3;
            }
          });
        });
      });
      return pageObj;
    },
    async getUserMenu() {
      try {
        const response = await loginApi.getUserMenu();
        this.menuList = response.data.ds;
        console.log('menuList:', this.menuList);
        this.setMenuList(this.menuList);
        const vm = this;
        this.menuList.forEach(list => {
          if (list.routerPath === '/main') {
            vm.choosePage(list);
          } else {
            list.children.forEach(li => {
              if (li.routerPath === '/main') {
                vm.choosePage(li);
              }
            });
          }
        });
        this.getCommonUserInfo();
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    openMenu(list) {
      this.isOpenMenu = true;
      if (list) {
        this.subMenuList = list;
      }
    },
    clickMenu() {
      this.confiOpen = false;
      window.removeEventListener('click', this.checkParentConfi);
    },
    closeMenu() {
      if (!this.isLoading) this.isOpenMenu = false;
    },
    closeInfoMenu() {
      this.myinfoOpen = false;
      window.removeEventListener('click', this.checkParentMyInfo);
    },
    changeFavoriteMenu(menu) {
      this.chooseMenu = menu;

      if (this.chooseMenu.favoriteYn === 'Y') {
        this.chooseMenu.favoriteYn = 'N';
      } else {
        this.chooseMenu.favoriteYn = 'Y';
      }
      this.setCommonFavoritesSave();
    },
    async favoriteMenu() {
      this.closeInfoMenu();
      this.$modal.show('FavoritesModal');
    },
    async setCommonFavoritesSave() {
      try {
        const param = {
          menuId: this.chooseMenu.menuId,
          useYn: this.chooseMenu.favoriteYn,
        };
        await commonApi.setCommonFavoritesSave(param);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getCommonUserInfo() {
      try {
        const response = await commonApi.getCommonUserInfo();
        this.loginInfo = response.data.rs;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    isCheckChangeLanguage() {
      this.type = 'lang';
      this.ment = 'message.msgChangeLanguage';
      this.$modal.show('AlarmModal');
    },
    isCheckChangeMenuGrp() {
      //메뉴그룹 변경
      this.type = 'menuGrp';
      this.ment = 'message.msgChangeMenuGrp';
      this.$modal.show('AlarmModal');
    },
    async setCommonChangeOption(isChange = false) {
      if (this.type == 'lang') {
        if (isChange) {
          try {
            const param = {
              lang: this.selectValue.lang,
            }; //ko,en.vn`
            await commonApi.setCommonChangeLanguage(param);
          } catch (e) {
            console.log(e);
            if (e && e.err && e.err.data && e.err.data.message) {
              this.$EventBus.$emit('openYesModal', e.err.data.message);
            } else {
              this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
            }
          }
          this.logout();
        } else {
          this.selectValue = this.originSelectValue;
        }
      } else if (this.type == 'menuGrp') {
        if (isChange) {
          //메뉴그룹 변동
          try {
            const param = {
              userCd: this.loginInfo.userCd,
              menuGrpInfo: this.loginInfo.menuGroup.join(','),
              menuGrpCd: this.menuGrpValue,
            };
            await myInfoApi.changeMenuGroup(param);
            this.setMenuGrpCd(this.menuGrpValue);
            window.location.reload(true);
          } catch (e) {
            console.log(e);
            this.menuGrpValue = this.originMenuGrpValue;
            if (e && e.err && e.err.data && e.err.data.message) {
              this.$EventBus.$emit('openYesModal', e.err.data.message);
            } else {
              this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
            }
          }
        } else {
          this.menuGrpValue = this.originMenuGrpValue;
        }
      }
    },
    isOpenConfi() {
      if (!this.confiOpen) {
        this.confiOpen = true;
        window.addEventListener('click', this.checkParentConfi);
      } else {
        this.confiOpen = false;
        window.removeEventListener('click', this.checkParentConfi);
      }
    },
    isOpenMyInfo() {
      if (!this.myinfoOpen) {
        this.myinfoOpen = true;
        window.addEventListener('click', this.checkParentMyInfo);
      } else {
        this.myinfoOpen = false;
        window.removeEventListener('click', this.checkParentMyInfo);
      }
    },
    checkParentConfi(event) {
      let existConfi = false;
      event.composedPath().forEach(path => {
        if (path.className && path.className.includes(`confi_myinfo`)) {
          existConfi = true;
        }
      });
      if (!existConfi) {
        this.confiOpen = false;
        window.removeEventListener('click', this.checkParentConfi);
      }
    },
    checkParentMyInfo(event) {
      let existMyinfo = false;
      event.composedPath().forEach(path => {
        if (path.className && path.className.includes(`confi_myinfo`)) {
          existMyinfo = true;
        }
      });
      if (!existMyinfo) {
        this.myinfoOpen = false;
        window.removeEventListener('click', this.checkParentMyInfo);
      }
    },
    revertToken() {
      if (Object.keys(this.backUpToken).length > 0) {
        this.setRevertToken();
        window.location.reload(true);
      }
    },

    ...mapMutations('menuList', ['setMenuList']),
    ...mapMutations('userInfo', ['setRefreshToken', 'setRevertToken']),
    ...mapMutations('userInfo', ['reset', 'setMenuGrpCd']),
  },
  created() {
    this.getUserMenu();
    // 마이페이지에서 비밀번호 5회 오류 시, 로그아웃 처리를 위한 EvenetBus
    this.$EventBus.$on('logoutInMyPage', () => {
      this.logout();
    });
  },
  mounted() {
    this.selectOptions.forEach(option => {
      if (option.lang === this.userLocale) {
        this.selectValue = option;
        this.originSelectValue = option;
      }
    });
  },
};
</script>

<style></style>
