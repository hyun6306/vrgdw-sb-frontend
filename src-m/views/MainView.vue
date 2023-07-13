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
      <div class="header_right favorite_menu">
        <button @click="[(bookmarkbox = !bookmarkbox), getCommonFavoritesList(), isOpenFavorite()]" class="btn_header btn_hader_bookmark in_img" :class="{ bookmarkbox_on: bookmarkbox }"><img src="@m/assets/img/icon_top_menu_star.png" /></button>
        <button class="btn_header in_img" @click="$modal.show('MainPushModal')">
          <img src="@m/assets/img/icon_top_menu_alarm.png" />
          <!-- 신규알람 발생 시 -->
          <!--          <i class="icon_alram"></i>-->
        </button>
        <!-- 자주찾는 메뉴 -->
        <div class="bookmark_box" :class="{ bookmarkbox_on: bookmarkbox }">
          <p class="bookmark_title">{{ $t('message.favoriteMenu') }}</p>
          <ul>
            <li class="bookmark_list" v-for="(list, index) in favoritesList" :key="index">
              <i class="btn_head_bookmark" :class="[list.useYn === 'Y' ? 'bookmark_on' : '']" @click="setCommonFavoritesSave(list)"></i>
              <span @click="favoritMove(list)">{{ list.menuNm }}</span>
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
      <SideMenu ref="SideMenu" />
    </div>
    <!-- //왼쪽메뉴 -->
    <!-- 컨텐츠 바디 -->
    <div class="container" id="main_container">
      <!-- <section class="new_regist_section" :class="{ regist_close: registClose }"> -->
      <!-- <button class="btn_close" @click="registClose = !registClose"></button> -->
      <!-- <div class="btn_new_order">
          <img src="@m/assets/img/icon_m_neworder.png" alt="new" />
          <a @click="pageMove('/order/general')">{{ $t('message.quoteRequest') }}</a>
          <span>{{ $t('message.msgNewQuote') }}</span>
        </div>
        <div class="btn_new_order btn_regist_info">
          <img src="@m/assets/img/icon_m_myinfo.png" alt="myinfo" />
          <a @click="pageMove('')">{{ $t('message.modifyMyInfo') }}</a>
          <span>{{ $t('message.msgRegistDefault') }}</span>
        </div>
      </section> -->
      <DashBoard />
    </div>
    <!-- //컨텐츠 바디 -->
    <!-- 하단 글로벌메뉴 -->
    <FooterMenu v-if="userMenuGrpCd === 'CUSTOMER' || userMenuGrpCd === 'VRGDW_SALES' || userMenuGrpCd === 'VRGDW_SUPPORT'" />
    <MainModal :noLogitsReq="noLogitsReq" @closeMainModal="closeMainModal" />
    <MainPushModal @choosePush="choosePush" />
    <!-- 하단 글로벌메뉴 -->
  </div>
</template>

<script>
import loginApi from '@/api/login';
import commonApi from '@/api/common';
import SideMenu from '@m/components/main/SideMenu';
import FooterMenu from '@m/components/main/FooterMenu';
import { mapMutations, mapGetters } from 'vuex';
import DashBoard from '@m/components/main/DashBoard';
import MainModal from '@m/modal/main/MainModal';
import MainPushModal from '@m/modal/main/MainPushModal.vue';

export default {
  name: 'MainView',
  components: {
    MainPushModal,
    SideMenu,
    FooterMenu,
    DashBoard,
    MainModal,
  },
  computed: {
    ...mapGetters({
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      shortUrl: 'userInfo/getShortUrl',
      logitsRegYn: 'userInfo/getLogitsRegYn',
    }),
  },
  data() {
    return {
      leftMenuOpen: false,
      registClose: false,
      menuList: [],
      bookmarkbox: false,
      favoritesList: [],
      noLogitsReq: false,
    };
  },
  methods: {
    isOpenFavorite() {
      if (this.bookmarkbox) {
        document.addEventListener('click', this.checkParentFavorite);
        document.addEventListener('touchstart', this.checkParentFavorite);
      } else {
        document.removeEventListener('click', this.checkParentFavorite);
        document.removeEventListener('touchstart', this.checkParentFavorite);
      }
    },
    checkParentFavorite(event) {
      let existFavo = false;
      if (event) {
        event.composedPath().forEach(path => {
          if (path.className && path.className.includes(`favorite_menu`)) {
            existFavo = true;
          }
        });
      }
      if (!existFavo) {
        this.bookmarkbox = false;
        document.removeEventListener('click', this.checkParentFavorite);
        document.removeEventListener('touchstart', this.checkParentFavorite);
      }
    },
    async getCommonFavoritesList() {
      try {
        if (this.bookmarkbox) {
          const response = await commonApi.getCommonFavoritesList();
          this.favoritesList = response.data.ds;
        }
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async setCommonFavoritesSave(menu) {
      try {
        const param = {
          menuId: menu.menuId,
          useYn: menu.useYn === 'Y' ? 'N' : 'Y',
        };
        await commonApi.setCommonFavoritesSave(param);
        this.$refs.SideMenu.setFavoriteMenu(param);
        await this.getCommonFavoritesList();
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getUserMenu() {
      try {
        const response = await loginApi.getUserMenu();
        this.menuList = response.data.ds;
        this.setMenuList(this.menuList);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    pageMove(routerPath) {
      let menuId = this.searchMenuId(routerPath);
      this.$router.push(`${routerPath}?menuId=${menuId}`);
    },
    favoritMove(page) {
      this.$router.push(`${page.routerPath}?menuId=${page.menuId}`);
    },
    searchMenuId(routerPath) {
      let menuId;
      this.menuList.forEach(dept1 => {
        if (dept1.routerPath === routerPath) {
          menuId = dept1.menuId;
        }
        dept1.children.forEach(dept2 => {
          if (dept2.routerPath === routerPath) {
            menuId = dept2.menuId;
          }
          dept2.children.forEach(dept3 => {
            if (dept3.routerPath === routerPath) {
              menuId = dept3.menuId;
            }
          });
        });
      });
      return menuId;
    },
    choosePush(shortUrl) {
      this.getShortUrl(shortUrl);
    },
    async getShortUrl(shortUrl) {
      try {
        const param = {
          shortUrl,
        };
        const resp = await commonApi.getShortUrl(param);

        this.setShortUrl('');
        let routerPath = resp.data.rs.routerPath;
        let data = JSON.parse(resp.data.rs.paramData);
        let menuId = this.searchMenuId(routerPath);
        this.$router.push(`${routerPath}?menuId=${menuId}&id=${data.id}&custId=${data.custId}`);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
        this.setShortUrl('');
      }
    },
    closeMainModal(routerPath) {
      this.noLogitsReq = false;
      if (routerPath !== '') this.pageMove(routerPath);
    },
    ...mapMutations('menuList', ['setMenuList']),
    ...mapMutations('userInfo', ['setShortUrl']),
  },

  created() {
    this.getUserMenu();
    this.getCommonFavoritesList();
  },
  mounted() {
    if (this.shortUrl !== '') {
      this.getShortUrl(this.shortUrl);
    }
    if (this.logitsRegYn === 'N') {
      this.noLogitsReq = true;
    } else {
      this.noLogitsReq = false;
    }
  },
};
</script>

<style></style>
