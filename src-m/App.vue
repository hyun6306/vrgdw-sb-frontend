<template>
  <div id="app" class="lang_eng">
    <!--로딩  -->
    <div :class="[isLoading ? 'loading' : 'loading none-display']">
      <div class="img">
        <div class="sk-fading-circle">
          <div class="sk-circle1 sk-circle"></div>
          <div class="sk-circle2 sk-circle"></div>
          <div class="sk-circle3 sk-circle"></div>
          <div class="sk-circle4 sk-circle"></div>
          <div class="sk-circle5 sk-circle"></div>
          <div class="sk-circle6 sk-circle"></div>
          <div class="sk-circle7 sk-circle"></div>
          <div class="sk-circle8 sk-circle"></div>
          <div class="sk-circle9 sk-circle"></div>
          <div class="sk-circle10 sk-circle"></div>
          <div class="sk-circle11 sk-circle"></div>
          <div class="sk-circle12 sk-circle"></div>
        </div>
      </div>
    </div>
    <!-- //로딩 -->
    <router-view></router-view>
    <router-view name="footer"></router-view>
    <CommonAlarmYesModal :ment="ment" />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import CommonAlarmYesModal from '@m/modal/CommonAlarmYesModal';
import commonApi from '@/api/common';
import { mapGetters, mapMutations } from 'vuex';
import defs from '@/consts/defs';

export default {
  components: {
    CommonAlarmYesModal,
  },
  data() {
    return {
      page: null,
      ment: '',
      v2RouterPath: defs.v2RouterPath,
    };
  },
  computed: {
    ...mapState(['isLoading', 'isNetworkError']),
    ...mapGetters({
      menuList: 'menuList/getMenuListAll',
    }),
  },
  watch: {
    isNetworkError(value) {
      if (value) {
        this.ment = 'Network Error';
        this.$modal.show('CommonAlarmYesModal');
        this.$store.state.isNetworkError = false;
      }
    },
  },
  methods: {
    onDWPushDeepLinkProc(extArr) {
      if (this.$DWAPI) {
        if (extArr.length === 3) {
          if (this.v2RouterPath.includes(this.$route.path)) {
            this.setShortUrl(extArr[1]);
          } else {
            this.getShortUrl(extArr[1]);
          }
        }
      }
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
    ...mapMutations('userInfo', ['setShortUrl']),
  },
  created() {
    this.$EventBus.$on('openYesModal', ment => {
      this.ment = ment;
      this.$modal.show('CommonAlarmYesModal');
    });
  },
  destroyed() {
    this.$EventBus.$off('openYesModal');
  },
};
</script>
<style lang="scss">
@import '@m/assets/scss/index.scss';
</style>
