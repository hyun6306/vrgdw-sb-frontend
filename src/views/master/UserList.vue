<template>
  <div>
    <!-- 검색필터 영역 -->
    <UserMngSearch v-if="page == 'userMng'" ref="userMngSearch" :authButton="authButton" />
    <AdUserReqSearch v-if="page == 'adUserReqList'" ref="adUserReqSearch" :authButton="authButton" />
    <!-- //검색필터 영역 -->

    <!-- 리얼그리드 -->
    <div class="realgrid_container" :class="page == 'userMng' ? 'realgrid_container11' : 'realgrid_container06'">
      <div class="real_head">
        <div class="real_head_left">
          <small class=""
            >{{ $t('message.totalSelection1') }}<i>{{ count }}</i
            >{{ $t('message.totalSelection2') }}</small
          >
        </div>
        <div class="real_head_right"></div>
      </div>
      <div class="real_top_filter">
        <div class="real_top_left"></div>
        <div class="real_top_right">
          <button class="btn_default btn_filter" @click="setFilter">
            <!-- <img src="@/assets/img/icon_vertical.png" /> -->
            <span v-if="!filterOn">{{ $t('message.btnFilterOn') }}</span>
            <span v-else>{{ $t('message.btnFilterOff') }}</span>
          </button>
          <button class="btn_default btn_filter" @click="fixGrid('column')">
            <img src="@/assets/img/icon_vertical.png" />
            <span v-if="isFixColumn">{{ $t('message.btnUnfixColumn') }}</span>
            <span v-else>{{ $t('message.btnFixColumn') }}</span>
          </button>
          <button class="btn_default btn_filter" @click="fixGrid('row')">
            <img src="@/assets/img/icon_hori.png" />
            <span v-if="isFixRow">{{ $t('message.btnUnfixRow') }}</span>
            <span v-else>{{ $t('message.btnFixRow') }}</span>
          </button>
          <MultiSelect id="Material_Group" class="btn_select_layout" style="width: 100%" v-model="layoutValue" @input="layoutSave" :options="layoutOptions" label="text" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Layout"></MultiSelect>
        </div>
      </div>
      <div class="real_body real_body08" v-if="page == 'userMng'">
        <!-- AD 사용자 관리 -->
        <UserMngGrid style="height: 100%" ref="userMngGrid" @sendRowCount="sendRowCount" :gridLang="gridLang" :menuId="menuId" :savePage="savePage" :authButton="authButton" @getOtherLogin="getOtherLogin" />
      </div>
      <div class="real_body real_body08" v-if="page == 'adUserReqList'">
        <!-- AD 미등록 사용자 관리 -->
        <AdUserReqListGrid style="height: 100%" ref="adUserReqListGrid" @sendRowCount="sendRowCount" :gridLang="gridLang" :menuId="menuId" :savePage="savePage" :authButton="authButton" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <button class="btn_default btn_function" v-if="authButton.exlAuth == 'Y'" @click="excelDownLoad">{{ $t('message.btnDownloadExcel') }}</button>
        </div>
        <div class="footer_right">
          <!-- <button v-if="page == 'userMng' && authButton.savAuth == 'Y'" class="btn_default btn_critical_process" @click="showInfoModal()">{{ $t('message.btnUpdate') }}</button>
          <button v-if="page == 'adUserReqList' && authButton.savAuth == 'Y'" class="btn_default btn_critical_process" @click="showInfoModal()">{{ $t('message.btnRegist') }}</button> -->
        </div>
      </div>
    </div>
    <!-- //리얼그리드 -->
    <DetailAlarmModal :ment="ment" :type="type" @modalReturn="modalReturn" />
    <AdUserDtlsModal ref="AdUserDtlsModal" />
  </div>
</template>

<script>
import UserMngSearch from '@/components/master/UserMngSearch.vue';
import AdUserReqSearch from '@/components/master/AdUserReqSearch.vue';
import UserMngGrid from '@/components/gridView/master/UserMngGrid.vue';
import AdUserReqListGrid from '@/components/gridView/master/AdUserReqListGrid.vue';
import AdUserDtlsModal from '@/modal/master/AdUserDtlsModal';
import { mapGetters, mapMutations } from 'vuex';
import languageApi from '@/api/language';
import DetailAlarmModal from '@/modal/detail/DetailAlarmModal';
import masterApi from '@/api/master/master';

export default {
  components: {
    UserMngSearch,
    AdUserReqSearch,
    UserMngGrid,
    AdUserReqListGrid,
    AdUserDtlsModal,
    DetailAlarmModal,
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
  },
  data() {
    return {
      filterOn: true,
      count: 0,
      gridLang: [],
      //행,열고정
      isFixColumn: false,
      isFixRow: false,
      //레이아웃
      layoutValue: { value: 'layout', text: this.$i18n.t('message.btnLayout') },
      layoutOptions: [
        { value: 'save', text: this.$i18n.t('message.btnSave') },
        { value: 'reset', text: this.$i18n.t('message.btnInit') },
      ],
      ment: '',
      type: '',
    };
  },
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
  },

  methods: {
    sendRowCount(count) {
      this.count = count;
    },
    userSearch(param) {
      if (this.page == 'userMng') {
        this.$refs.userMngGrid.getList(param);
      } else {
        this.$refs.adUserReqListGrid.getList(param);
      }
    },
    async showModal(type) {
      if (this.page == 'userMng') {
        await this.$refs.userMngSearch.userSearch('search');
        this.$modal.hide('AdUserDtlsModal');
        if (type == 'suss') {
          this.$EventBus.$emit('openYesModal', 'message.msgSave');
        }
      } else {
        await this.$refs.adUserReqSearch.userSearch('search');
        this.$modal.hide('AdUserDtlsModal');
        if (type == 'suss') {
          this.$EventBus.$emit('openYesModal', 'message.msgSaveAdUser');
        }
      }
    },
    async showInfoModal(data) {
      // let checkedData = {};
      if (this.page == 'userMng') {
        // checkedData = this.$refs.userMngGrid.sendCheckedData();
        // if (checkedData.length == 0) {
        //   this.$EventBus.$emit('openYesModal', 'message.msgNoSelect');
        // } else if (checkedData.length > 1) {
        //   this.$EventBus.$emit('openYesModal', 'message.msgVaildOneUser');
        // } else {
        this.$modal.show('AdUserDtlsModal', { rowData: data, id: null });
        // }
      } else {
        // checkedData = this.$refs.adUserReqListGrid.sendCheckedData();
        // if (checkedData.length == 0) {
        //   this.$EventBus.$emit('openYesModal', 'message.msgNoSelect');
        // } else if (checkedData.length > 1) {
        //   this.$EventBus.$emit('openYesModal', 'message.msgVaildOneUser');
        // } else {
        if (data.cfmYn == this.$t('message.regist')) {
          this.$EventBus.$emit('openYesModal', 'message.errorsRequireRequst');
        } else if (data.cfmYn == this.$t('message.request')) {
          this.$modal.show('AdUserDtlsModal', { rowData: null, id: data.empNum });
        }
        // }
      }
    },
    fixGrid(type) {
      if (this.page == 'userMng') {
        if (this.$refs.userMngGrid.focusCheck()) {
          const rows = this.$refs.userMngGrid.sendJsonRows();
          if (rows.length > 0) {
            this.$refs.userMngGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
            if (type === 'column') {
              this.isFixColumn = !this.isFixColumn;
            } else if (type === 'row') {
              this.isFixRow = !this.isFixRow;
            }
          } else {
            this.ment = 'message.msgNoProduct';
            this.$EventBus.$emit('openYesModal', this.ment);
          }
        } else {
          this.ment = 'message.msgNoSelection';
          this.$EventBus.$emit('openYesModal', this.ment);
        }
      } else {
        if (this.$refs.adUserReqListGrid.focusCheck()) {
          const rows = this.$refs.adUserReqListGrid.sendJsonRows();
          if (rows.length > 0) {
            this.$refs.adUserReqListGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
            if (type === 'column') {
              this.isFixColumn = !this.isFixColumn;
            } else if (type === 'row') {
              this.isFixRow = !this.isFixRow;
            }
          } else {
            this.ment = 'message.msgNoProduct';
            this.$EventBus.$emit('openYesModal', this.ment);
          }
        } else {
          this.ment = 'message.msgNoSelection';
          this.$EventBus.$emit('openYesModal', this.ment);
        }
      }
    },
    layoutSave(type) {
      this.layoutOpen = !this.layoutOpen;
      this.type = type.value;
      if (this.type == 'save') {
        this.ment = 'message.msgAskSave';
      } else if (this.type == 'reset') {
        this.ment = 'message.msgAskRefresh';
      }
      this.$modal.show('DetailAlarmModal');
      this.layoutValue = { value: 'layout', text: this.$i18n.t('message.btnLayout') };
    },
    modalReturn(data) {
      if (data == 'save' || data == 'reset') {
        if (this.page == 'userMng') {
          this.$refs.userMngGrid.saveLayout(data);
        } else {
          this.$refs.adUserReqListGrid.saveLayout(data);
        }
      }
    },
    excelDownLoad() {
      this.excelData = {
        showProgress: true,
        progressMessage: 'Exporting..',
        indicator: 'hidden',
        header: 'default',
        footer: 'hidden',
        compatibility: true,
      };
      let fileNm = '';
      if (this.page == 'userMng') {
        fileNm = { fileNm: `userMng.xlsx` };
        this.excelData = { ...fileNm, ...this.excelData };
        this.$refs.userMngGrid.excelExport(this.excelData);
      } else {
        fileNm = { fileNm: `adUserReqList.xlsx` };
        this.excelData = { ...fileNm, ...this.excelData };
        this.$refs.adUserReqListGrid.excelExport(this.excelData);
      }
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
    async setFilter() {
      this.filterOn = !this.filterOn;
      if (this.page == 'userMng') {
        this.$refs.userMngGrid.setFilter(this.filterOn);
      } else if (this.page == 'adUserReqList') {
        this.$refs.adUserReqListGrid.setFilter(this.filterOn);
      }
    },
    async getOtherLogin(userInfo) {
      try {
        let param = {
          userCd: userInfo.userCd,
        };
        const resp = await masterApi.getOtherLogin(param);

        let otherToken = {
          Authorization: resp.headers.authorization,
          Token: resp.headers.token,
          menuGrpCd: userInfo.menuGrpCd,
        };

        if (userInfo.menuGrpCd == 'CUSTOMER') otherToken = { ...otherToken, ...{ id: userInfo.custId } };
        else if (userInfo.menuGrpCd == 'TRANSCUS') otherToken = { ...otherToken, ...{ id: userInfo.trncusId } };

        this.setBackUpToken(otherToken);
        window.location.reload(true);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    ...mapMutations('userInfo', ['setBackUpToken']),
  },
  created() {},
  mounted() {
    this.getGridMutiLanguage();
    this.setFilter();
  },
  destroyed() {},
};
</script>

<style>
.checkbox-label {
  display: block;
}
</style>
