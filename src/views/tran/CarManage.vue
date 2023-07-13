<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.trnNm') }}</span>
              <!-- 운송사 로그인시 선택 불가 -->
              <input type="text" id="담당자명" style="" class="disabled t-l" v-if="this.userMenuGrpCd == 'TRANSCUS'" disabled placeholder="" v-model="trnCustNm.text" />
              <!-- 물류담당자 로그인시 선택 가능 -->
              <MultiSelect id="Material_Group" style="width: 100%" v-else v-model="trnCustNm" :options="trnCustOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
              <!-- <MultiSelect id="Material_Group" class="essential" style="width: 100%" v-model="trnCustNm" :options="trnCustOptions" :custom-label="customLabel" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect> -->
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.tranCarNum') }}</span>
              <!-- 데이터피커 -->
              <input type="text" id="" style="" class="t-l" placeholder="" v-model="tranCarNum" ref="filter" @keyup.enter="carSearch()" />
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.useYn') }}</span>
              <MultiSelect id="Material_Group" style="width: 100%" v-model="useYn" :options="useYnOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
            </label>
            <button v-if="authButton.schAuth === 'Y'" class="btn_reset" @click="carSearch('reset')">{{ $t('message.btnInit') }}</button>
            <button v-if="authButton.schAuth === 'Y'" class="btn_search_text ml-0" @click="carSearch()">{{ $t('message.btnSearch') }}</button>
          </div>
        </div>
      </div>
    </div>
    <!-- //검색필터 영역 -->
    <CarInfoRegistModal :rowData="rowData" :trnCustOptions="trnCustOptions" :carTypeList="carTypeList" @infoMent="infoMent" :page="page" />
    <TranAlarmYesModal :ment="ment" />
    <TranAlarmModal @okOrNo="okOrNo" :ment="ment" :type="layoutData" />
    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container09">
      <div class="real_head">
        <div class="real_head_left">
          <small
            >{{ $t('message.totalSelection1') }}<i>{{ totalRowCount }}</i
            >{{ $t('message.totalSelection2') }}</small
          >
        </div>
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
          <!-- <button class="btn_default btn_filter">
            <img src="@/assets/img/icon_filter.png" />
            <span>Filter</span>
          </button> -->
          <!-- <button class="btn_default btn_filter">
            <img src="@/assets/img/icon_trace.png" />
            <span>{{ $t('button.deleteChoose') }}<i>(2)</i></span>
          </button> -->
          <!-- drop down -->
          <MultiSelect id="Material_Group" class="btn_select_layout" style="width: 100%" @input="layoutSave" v-model="layoutValue" :options="layoutOptions" label="text" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Layout"></MultiSelect>
          <!-- //drop down -->
        </div>
      </div>
      <div class="real_body real_body04">
        <CarManageGrid style="height: 100%" ref="CarManageGrid" @sendCheckedData="sendCheckedData" @sendRowCount="sendRowCount" @gridMent="gridMent" :menuId="menuId" :layoutData="layoutData" :savePage="savePage" :gridLang="gridLang" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <button v-if="authButton.exlAuth == 'Y'" class="btn_default btn_function" @click="excelDL">{{ $t('message.btnDownloadExcel') }}</button>
        </div>
        <div class="footer_right">
          <button v-if="authButton.delAuth == 'Y'" class="btn_default btn_function" @click="carDelete">{{ $t('message.btnDelete') }}</button>
          <button v-if="authButton.fn1Auth == 'Y'" class="btn_default btn_critical_process" @click="carSave">{{ $t('message.btnRegistNew') }}</button>
        </div>
      </div>
    </div>
    <!-- //리얼그리드 -->
  </div>
</template>

<script>
import CarManageGrid from '@/components/gridView/tran/CarManageGrid';
// import commonApi from '@/api/common';
import tranApi from '@/api/tran/tran';
import TranAlarmYesModal from '@/modal/tran/TranAlarmYesModal';
import TranAlarmModal from '@/modal/tran/TranAlarmModal';
import CarInfoRegistModal from '@/modal/tran/CarInfoRegistModal.vue';
import dayjs from 'dayjs';
import languageApi from '@/api/language';
import { mapGetters } from 'vuex';
import { loadLanguageAsync } from '@/plugins/i18n';

export default {
  components: {
    CarManageGrid,
    CarInfoRegistModal,
    TranAlarmYesModal,
    TranAlarmModal,
  },
  props: {
    savePage: {
      type: Array,
    },
    menuId: {
      type: Number,
    },
    authButton: {
      type: Object,
    },
    routerPath: {
      type: String,
    },
    page: {
      type: String,
    },
  },
  computed: {
    ...mapGetters({
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      userNm: 'userInfo/getUserNm',
      userLocale: 'userInfo/getUserLocale',
      userInfo: 'userInfo/getUserInfo',
    }),
  },
  data() {
    return {
      filterOn: true,
      checkedData: [],
      trnCustNm: { text: this.$i18n.t('message.all'), value: '' },
      trnCustOptions: [],
      useYn: { text: this.$i18n.t('message.all'), value: '' },
      useYnOptions: [
        { text: this.$i18n.t('message.all'), value: '' },
        { text: 'Y', value: 'Y' },
        { text: 'N', value: 'N' },
      ],
      tranCarNum: '',
      rowData: [],
      //열고정,행고정
      isFixColumn: false,
      isFixRow: false,
      //레이아웃
      layoutValue: { value: 'layout', text: this.$i18n.t('message.btnLayout') },
      layoutOptions: [
        { value: 'save', text: this.$i18n.t('message.btnSave') },
        { value: 'reset', text: this.$i18n.t('message.btnInit') },
      ],
      layoutData: '',
      totalRowCount: 0,
      ment: '',
      carTypeList: [],
      gridLang: [],
    };
  },
  methods: {
    // customLabel(option) {
    //   return `${option.library}`;
    // },
    sendCheckedData(data) {
      this.checkedData = data;
    },
    sendRowCount(count) {
      //아이템 수
      this.totalRowCount = count;
    },
    infoMent(data) {
      this.ment = data;
    },
    gridMent(data) {
      this.ment = data;
    },
    okOrNo(Yn) {
      if (Yn) {
        this.$refs.CarManageGrid.saveLayout(this.layoutData);
      }
    },
    fixGrid(type) {
      //열고정,행공정
      if (this.$refs.CarManageGrid.focusCheck()) {
        const rows = this.$refs.CarManageGrid.sendJsonRows();
        if (rows.length > 0) {
          this.$refs.CarManageGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
          if (type === 'column') {
            this.isFixColumn = !this.isFixColumn;
          } else if (type === 'row') {
            this.isFixRow = !this.isFixRow;
          }
        } else {
          this.ment = 'message.msgNoProduct';
          this.$modal.show('TranAlarmYesModal');
        }
      } else {
        this.ment = 'message.msgNoSelection';
        this.$modal.show('TranAlarmYesModal');
      }
    },
    layoutSave(type) {
      //레이아웃 변경
      this.layoutData = type.value;
      if (this.layoutData == 'reset') {
        this.ment = 'message.msgAskRefresh';
      } else {
        this.ment = 'message.msgAskSave';
      }
      this.layoutValue = { value: 'layout', text: this.$i18n.t('message.btnLayout') };
      this.$modal.show('TranAlarmModal');
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
    async carSearch(type = '') {
      if (this.authButton.schAuth === 'Y') {
        if (type == 'reset') {
          // this.$refs.CarManageGrid.getList();
          if (this.userMenuGrpCd !== 'TRANSCUS') {
            this.trnCustNm = { text: this.$i18n.t('message.all'), value: '' }; //운송사 초기화
          }
          this.tranCarNum = ''; //차량번호 초기화
          this.useYn = { text: this.$i18n.t('message.all'), value: '' }; //사용여부 초기화
          this.checkedData = [];
        } else {
          this.$refs.filter.blur();
          let param = {
            tranCarNum: this.tranCarNum,
            useYn: this.useYn.value,
            trncusId: this.trnCustNm.value,
          };
          this.checkedData = [];
          this.$refs.CarManageGrid.getList(param);
        }
      }
    },
    async carDelete() {
      this.$refs.CarManageGrid.sendCheckedData();
      if (this.checkedData.length == 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoSelect');
        return;
      }
      const some = this.checkedData.some(row => row.useYn == 'Y');
      if (some == true) {
        this.$EventBus.$emit('openYesModal', 'message.msgDeleteNotice');
        return;
      }
      let param = [];
      this.checkedData.forEach(row => {
        param.push({
          id: row.id,
          tranCarNum: row.tranCarNum,
        });
      });
      try {
        const resp = await tranApi.putCarMangDelete(param);
        if (resp.data.status == 200) {
          this.ment = 'message.msgCarDelete';
          this.$modal.show('TranAlarmYesModal');
          await this.carSearch();
        }
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async tranList() {
      //운송사목록
      try {
        const response = await tranApi.getTranList();
        this.trnCustOptions = response.data.ds;
        const all = { value: '', text: this.$i18n.t('message.all') };
        this.trnCustOptions.splice(0, 0, all);
        if (this.userMenuGrpCd == 'TRANSCUS') {
          this.trnCustOptions.forEach(data => {
            if (data.value == this.userInfo.trncusId) {
              this.trnCustNm = data;
            }
          });
          this.trnCustNm;
        }
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    carSave(gridData) {
      this.rowData = gridData;
      if (!gridData.id) {
        if (this.checkedData.length >= 1) {
          this.$EventBus.$emit('openYesModal', 'message.msgRegistNotice');
          return;
        }
      }
      this.openPopup('CarInfoRegistModal', { searchTrnCusId: this.trnCustNm });
    },
    excelDL() {
      const excelData = {
        fileNm: `carManage${dayjs().format('DD-MM-YYYY')}.xlsx`,
        showProgress: true,
        progressMessage: 'Exporting..',
        indicator: 'hidden',
        header: 'default',
        footer: 'hidden',
        compatibility: true,
      };
      this.$refs.CarManageGrid.excelExport(excelData);
    },

    async loadCarTypeList() {
      try {
        const response = await tranApi.getCarTypeList();
        this.carTypeList = response.data.ds;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    // async listRefresh() {
    //   await this.$refs.CarManageGrid.getList();
    // },
    showModal() {
      this.$modal.show('TranAlarmYesModal');
    },
    async openPopup(modalNm, data) {
      let url = '/modal/tranModal';
      if (url !== '') {
        try {
          const resp = await loadLanguageAsync(url, this.menuId);
          resp;
        } catch (e) {
          console.log(e);
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
      if (modalNm === 'CarInfoRegistModal') {
        this.$modal.show(modalNm, data);
      } else {
        this.$modal.show(modalNm);
      }
    },
    setFilter() {
      this.filterOn = !this.filterOn;
      this.$refs.CarManageGrid.setFilter(this.filterOn);
    },
  },
  created() {
    // this.tranList();
    this.loadCarTypeList();
    this.tranList();
    this.getGridMutiLanguage();
  },
  mounted() {
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
