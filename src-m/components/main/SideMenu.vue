<template>
  <div class="left_menu_compo">
    <div class="info_section">
      <div class="menu_head">
        <span class="menu_logo in_img"><img src="@m/assets/img/logo_header.svg" /></span>
        <MultiSelect @input="isCheckChangeLanuage" id="배송형태" style="100%" class="select_lang" track-by="name" label="name" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false"></MultiSelect>
      </div>
      <div class="user_info">
        <i class="profile in_img"><img src="@m/assets/img/profile_img.png" /></i>
        <span class="user_name">{{ userInfo.userNm }}</span>
        <button class="btn_logout" @click="logout">{{ $t('message.userLogout') }}</button>
        <div class="call_box" v-if="userMenuGrp == 'CUSTOMER' || userMenuGrp == 'TRANSCUS'">
          <!-- 국가번호 사용할 경우, (sales.mobileCt != undefined ? sales.mobileCt : sales.phoneCt != undefined ? sales.phoneCt : '') + (sales.mobileNum ? sales.mobileNum : sales.phoneNum) -->
          <a :href="`tel:${sales.mobileNum ? sales.mobileNum : sales.phoneNum}`" class="btn_call" v-for="(sales, index) in loginInfo.salesInfo" :key="index">
            <small>{{ sales.prdtClsNm }}</small>
            <i class="in_img"><img src="@m/assets/img/icon_call.png" /></i>
            <strong>{{ sales.mobileNum }}</strong>
          </a>
        </div>
        <div class="call_box" v-else>
          <div class="sales_box">
            <strong>{{ loginInfo.cityNm }}</strong>
          </div>
          |
          <div class="sales_box">
            <strong>{{ loginInfo.distrNm }}</strong>
          </div>
        </div>
      </div>
    </div>
    <div class="menu_section">
      <div v-for="(dept1, index) in menuList" :key="index">
        <div class="menu_box" :class="{ main_menu_open: mainMenuOpen[index] }">
          <div class="main_menu" @click="[changeMainMenuOpen(index)]" v-if="dept1.mobileIncYn === 'Y'">
            <span>{{ dept1.menuNm }}</span>
            <i class="in_img ml-a"><img src="@m/assets/img/icon_up.png" /></i>
          </div>
          <div class="sub_menu_list_box" v-for="(dept2, index2) in dept1.children" :key="index2">
            <div class="sub_menu_list_box_div" v-if="dept2.children.length > 0 && dept2.mobileIncYn === 'Y'">
              <p class="sub_menu_title">{{ dept2.menuNm }}</p>
              <ul v-for="(dept3, index3) in dept2.children" :key="index3">
                <li class="sub_menu_list" v-if="dept3.mobileIncYn === 'Y'">
                  <a @click="pageMove(dept3)">{{ dept3.menuNm }}</a>
                  <button @click="changeFavorite(dept3)" class="btn_bookmark" :class="[dept3.favoriteYn === 'Y' ? 'bookmark_on' : '']"></button>
                </li>
              </ul>
            </div>
            <div class="sub_menu_list_box_div" v-else-if="dept2.mobileIncYn === 'Y'">
              <ul>
                <li class="sub_menu_list">
                  <a @click="pageMove(dept2)">{{ dept2.menuNm }}</a>
                  <button @click="changeFavorite(dept2)" class="btn_bookmark" :class="[dept2.favoriteYn === 'Y' ? 'bookmark_on' : '']"></button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AlarmModal @okOrNo="setCommonChangeLanguage" :name="``" />
  </div>
</template>

<script>
import commonApi from '@/api/common';
import { mapMutations, mapGetters } from 'vuex';
import AlarmModal from '@m/modal/AlarmModal';
export default {
  components: {
    AlarmModal,
  },
  data() {
    return {
      bookmarkbox: false,
      bookmark: false,
      hbookmark: false,
      mainMenuOpen: [],
      selectValue: '',
      originSelectValue: '',
      selectOptions: [
        { name: 'KOR', lang: 'ko' },
        { name: 'ENG', lang: 'en' },
        // { name: 'VET', lang: 'vn' },
      ],
      loginInfo: {},
      routeList: [],
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userLocale: 'userInfo/getUserLocale',
      menuList: 'menuList/getMenuListAll',
      userMenuGrp: 'userInfo/getUserMenuGrpCd',
    }),
    // mainMenuOpen() {
    //   let isOpen = [];
    //   this.menuList.forEach(() => {
    //     isOpen.push(false);
    //   });
    //   return isOpen;
    // },
  },
  watch: {
    menuList() {
      this.menuList.forEach(() => {
        this.mainMenuOpen.push(false);
      });
    },
  },
  methods: {
    changeFavorite(dept) {
      if (dept.favoriteYn === 'Y') {
        dept.favoriteYn = 'N';
      } else {
        dept.favoriteYn = 'Y';
      }
      this.setCommonFavoritesSave(dept);
    },
    async setCommonFavoritesSave(dept) {
      try {
        const param = {
          menuId: dept.menuId,
          useYn: dept.favoriteYn,
        };
        await commonApi.setCommonFavoritesSave(param);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
        if (dept.favoritYn === 'Y') {
          dept.favoritYn = 'N';
        } else {
          dept.favoritYn = 'Y';
        }
      }
    },
    changeMainMenuOpen(index) {
      this.$set(this.mainMenuOpen, index, !this.mainMenuOpen[index]);
    },
    logout() {
      this.reset();
      let data = {
        notFirst: 'Y',
      };
      if (this.$DWAPI) {
        this.$DWAPI.post(['setStorageData', 'loginInfo', JSON.stringify(data)]);
      }
      this.$router.push('/');
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
    pageMove(pageInfo) {
      let isExist = false;
      this.routeList.forEach(list => {
        if (list === pageInfo.routerPath) {
          isExist = true;
        }
      });
      if (isExist) this.$router.push(pageInfo.routerPath + '?menuId=' + pageInfo.menuId);
      else this.$EventBus.$emit('openYesModal', 'message.msgNoFrontFile');
    },
    isCheckChangeLanuage() {
      this.$modal.show('AlarmModal', { message: 'message.msgChangeLanguage' });
    },
    async setCommonChangeLanguage(isChange) {
      if (isChange.result) {
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
    },
    setFavoriteMenu(menu) {
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
    setRouterList() {
      this.$router.options.routes.forEach(route => {
        this.routeList.push(route.path);
      });
    },
    ...mapMutations('userInfo', ['reset']),
  },
  created() {},
  mounted() {
    this.selectOptions.forEach(option => {
      if (option.lang === this.userLocale) {
        this.selectValue = option;
        this.originSelectValue = option;
      }
    });
    this.getCommonUserInfo();
    this.setRouterList();
  },
};
</script>

<style></style>
