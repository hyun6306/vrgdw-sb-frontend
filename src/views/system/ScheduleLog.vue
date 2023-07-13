<template>
  <div>
    <ScheduleLogSearch :page="page" @sendSearchList="getSearchList" @sendPageInfo="getPageInfo" :changePageNumber="pageNumber" @resetPageNumber="resetPageNumber" :authButton="authButton" />

    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container10">
      <div class="real_head">
        <div class="real_head_left">
          <small
            >{{ $t('message.totalSelection1') }} <i>{{ pageInfo.totalCount }}</i> {{ $t('message.totalSelection2') }}</small
          >
        </div>
        <div class="real_head_right"></div>
      </div>

      <div class="real_body real_body15">
        <ScheduleLogGird :listRows="listRows" :gridLang="gridLang" />
      </div>
      <div class="real_footer"></div>
    </div>
    <PagIng :pageInfo="pageInfo" :length="listRows.length" ref="PagIng" @alterPageNumber="alterPageNumber" />
    <!-- //리얼그리드 -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import languageApi from '@/api/language';
import PagIng from '@/components/commonComponent/PagIng';
import ScheduleLogSearch from '@/components/system/ScheduleLogSearch';
import ScheduleLogGird from '@/components/gridView/system/ScheduleLogGird';

export default {
  components: { PagIng, ScheduleLogSearch, ScheduleLogGird },
  props: ['authButton', 'savePage', 'menuId', 'page', 'openInfo', 'routerPath'],
  data() {
    return {
      pageInfo: { totalCount: 0 },
      pageNumber: 0,
      listRows: [],
      gridLang: [],
    };
  },
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  methods: {
    getSearchList(list) {
      this.listRows = list;
    },
    getPageInfo(pageInfo) {
      this.pageInfo = pageInfo;
    },
    alterPageNumber(pageNumber) {
      this.pageNumber = pageNumber;
    },
    resetPageNumber() {
      this.$refs.PagIng.resetPageNumber();
    },
    async getRouterLanguage() {
      try {
        const resp = await languageApi.getRouterLanguage(this.routerPath, this.menuId, this.userLocale, 'Y');
        this.gridLang = resp.data.rs.language;
      } catch (e) {
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
    this.getRouterLanguage();
  },
  destroyed() {},
};
</script>

<style></style>
