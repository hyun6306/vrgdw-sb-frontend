<template>
  <div>
    <!-- 검색필터 영역 -->
    <!-- //검색필터 영역 -->
    <CustListSearch v-if="page == 'custList'" :authButton="authButton" />
    <CarriersInfo v-if="page == 'carriersList'" :authButton="authButton" />
    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container02">
      <div class="real_head">
        <div class="real_head_left">
          <small v-if="page == 'custList'">
            {{ $t('message.totalSelection1') }} <i>{{ count }}</i
            >{{ $t('message.totalSelection2') }}</small
          >
          <small v-if="page == 'carriersList'">
            {{ $t('message.totalSelection1') }}
            <i>{{ count }}</i
            >{{ $t('message.totalSelection2') }}</small
          >
        </div>
        <div class="real_head_right"></div>
      </div>
      <div class="real_body real_body16">
        <CustListGrid style="height: 100%" v-if="page == 'custList'" ref="CustListGrid" @sendRowCount="sendRowCount" :gridLang="gridLang" />
        <CarriersListGrid style="height: 100%" v-if="page == 'carriersList'" ref="CarriersListGrid" @sendRowCount="sendRowCount" :gridLang="gridLang" />
      </div>
      <div class="real_footer">
        <div class="footer_left"></div>
        <div class="footer_right"></div>
      </div>
    </div>
    <!-- //리얼그리드 -->
  </div>
</template>

<script>
import CustListSearch from '@/components/mypage/CustListSearch';
import CustListGrid from '@/components/gridView/mypage/CustListGrid';
import CarriersListGrid from '@/components/gridView/mypage/CarriersListGrid';
import CarriersInfo from '@/components/mypage/CarriersInfo';

import languageApi from '@/api/language';
import { mapGetters } from 'vuex';

export default {
  components: {
    CustListGrid,
    CustListSearch,
    CarriersListGrid,
    CarriersInfo,
  },
  computed: {
    ...mapGetters({
      menuList: 'menuList/getMenuListAll',
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  props: {
    menuId: {
      type: Number,
    },
    page: {
      type: String,
    },
    routerPath: {
      type: String,
    },
    authButton: {
      type: Object,
    },
  },
  data() {
    return {
      count: 0,
      gridLang: [],
      pageObj: '',
    };
  },
  methods: {
    sendRowCount(count) {
      this.count = count;
    },
    searchList(param) {
      if (this.page == 'custList') {
        this.$refs.CustListGrid.loadCustList(param);
      } else {
        this.$refs.CarriersListGrid.loadCarriersList(param);
      }
    },
    pageMoveTest(data) {
      const thirdResult = [];
      this.menuList.forEach(first => {
        first.children.forEach(second => {
          second.children.forEach(third => {
            thirdResult.push(third);
          });
        });
      });
      thirdResult.find(element => {
        if (element.routerPath == '/mypage/cust/cust-dtls-list') {
          this.pageObj = element;
          this.$emit('setNewObject', this.pageObj, data);
        }
      });
    },
    async getGridMutiLanguage() {
      try {
        const resp = await languageApi.getRouterLanguage(this.routerPath, this.menuId, this.userLocale, 'Y');
        this.gridLang = resp.data.rs.language;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
  },
  created() {},
  mounted() {
    this.getGridMutiLanguage();
  },
  destroyed() {},
};
</script>

<style>
.checkbox-label {
  display: block;
}
</style>
