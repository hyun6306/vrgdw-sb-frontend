<template>
  <div>
    <!-- 검색필터 영역 -->
    <StaffSearch :authButton="authButton" ref="staffSearch" />
    <!-- //검색필터 영역 -->
    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container02">
      <!-- 그리드헤더영역 -->
      <div class="real_head">
        <div class="real_head_left">
          <!-- 총건 -->
          <small>
            {{ $t('message.totalSelection1') }} <i> {{ count }} </i>{{ $t('message.totalSelection2') }}
          </small>
        </div>
      </div>
      <!-- 그리드선언영역 -->
      <div class="real_body real_body15">
        <staffListGrid ref="staffListGrid" @sendRowCount="sendRowCount" :gridLang="gridLang" :authButton="authButton" style="height: 100%" />
      </div>
      <!-- 그리드푸터영역 -->
      <div class="real_footer">
        <div class="footer_left"></div>
        <div class="footer_right">
          <!-- 등록버튼 -->
          <button class="btn_default btn_critical_process" @click="addStaff(null)" v-if="authButton.savAuth == 'Y'">
            {{ $t('message.btnRegistration') }}
          </button>
        </div>
      </div>
    </div>
    <!-- 모달섹션 -->
    <StaffInfoModal />
  </div>
</template>

<script>
import staffListGrid from '@/components/gridView/mypage/StaffListGrid.vue';
import languageApi from '@/api/language';
import { mapGetters } from 'vuex';
import StaffSearch from '@/components/mypage/StaffSearch.vue';
import StaffInfoModal from '@/modal/mypage/StaffInfoModal';
// import { EventBus } from '@/views/devPage/tabTest/EventBus';

export default {
  components: {
    staffListGrid,
    StaffSearch,
    StaffInfoModal,
  },
  props: {
    authButton: {
      type: Object,
    },
    savePage: {
      type: Array,
    },
    menuId: {
      type: Number,
    },
    page: {
      type: String,
    },
    routerPath: {
      type: String,
    },
    openInfo: {
      type: Object,
    },
  },
  data() {
    return {
      gridLang: [],
      //
      count: 0,
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  methods: {
    sendRowCount(count) {
      this.count = count;
    },
    staffSearch(param) {
      //직원목록 조회 함수와 연결
      this.$refs.staffListGrid.loadStaffList(param);
    },
    addStaff(data) {
      //신규등록 이동
      this.$modal.show('StaffInfoModal', { info: data });
    },
    async saveSuss() {
      //저장 성공
      this.$modal.hide('StaffInfoModal');
      await this.$refs.staffSearch.staffSearch('search');
      this.$EventBus.$emit('openYesModal', 'message.msgSave');
    },
    // 그리드 다국어
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
  created() {
    this.getGridMutiLanguage();
  },
  mounted() {},
  destroyed() {},
};
</script>

<style></style>
