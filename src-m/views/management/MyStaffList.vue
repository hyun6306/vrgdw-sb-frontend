<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">{{ $t('message.staffList') }}</h1>
      </div>
      <div class="header_left">
        <button class="btn_header in_img" @click="clickBack"><img src="@m/assets/img/icon_back.png" /></button>
      </div>
      <div class="header_right">
        <button class="btn_header in_img" @click="$modal.show('StaffSearchModal')"><img src="@m/assets/img/icon_search.png" /></button>
      </div>
    </div>
    <!-- //상단 헤더 -->

    <!-- 컨텐츠 바디 -->
    <div class="container">
      <!-- 직원검색 -->
      <!-- 직원목록 -->

      <div class="quote_list_contents" v-show="showStaffList">
        <div class="bl_head" v-if="searchYn">
          <div class="head_count">
            <strong>{{ count }}</strong> {{ $t('message.totalSelection2') }}
          </div>
        </div>
        <MyStaffList ref="staffList" />
      </div>
      <div class="no_result" v-if="listNull">
        <span>{{ $t('message.gridMessageNoSearch') }}</span>
      </div>
      <MyStaffDetail ref="staffDetail" v-show="!showStaffList" />
    </div>
    <!-- //컨텐츠 바디 -->
    <StaffSearchModal />
  </div>
</template>

<script>
import MyStaffList from '@m/components/management/MyStaffList.vue';
import MyStaffDetail from '@m/components/management/MyStaffDetail.vue';
import StaffSearchModal from '@m/modal/management/StaffSearchModal';
import mypageApi from '@/api/mypage/staff';

export default {
  components: {
    MyStaffList,
    MyStaffDetail,
    StaffSearchModal,
  },
  data() {
    return {
      showStaffList: true,
      staffList: [],
      searchYn: false,
      count: 0,
      //
      listNull: false,
      //
    };
  },
  computed: {},
  methods: {
    clickBack() {
      if (this.showStaffList == true) {
        this.$router.go(-1);
      } else {
        this.loadStaffList();
        this.showStaffList = true;
      }
    },
    moveDetail(data) {
      //직원상세페이지 이동
      this.$refs.staffDetail.setting(data);
      this.showStaffList = false;
    },
    async loadStaffList(params) {
      try {
        let param = {};
        if (params == null) {
          param = { filter: '', useYn: 'Y' };
          this.searchYn = false;
        } else {
          param = params;
          this.searchYn = true;
        }
        const response = await mypageApi.getStaffList(param);
        this.$modal.hide('StaffSearchModal');
        this.staffList = response.data.ds;
        if (this.staffList.length > 0) {
          this.listNull = false;
        } else {
          this.listNull = true;
        }
        this.$refs.staffList.settingList(this.staffList);
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
  },
  mounted() {
    this.loadStaffList(null);
  },
};
</script>

<style></style>
