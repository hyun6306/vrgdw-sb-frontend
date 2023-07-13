<template>
  <div>
    <StandardListSearch ref="StandardListSearch" @sendStandardList="sendStandardList" @sendPrdtClsCd="sendPrdtClsCd" @sendCityCd="sendCityCd" @sendDistrCd="sendDistrCd" :authButton="authButton" :page="page" />
    <!-- 리얼그리드 -->
    <div :class="[searchOpen ? 'realgrid_container realgrid_container08' : 'realgrid_container realgrid_container08 padding-on']">
      <div class="real_head">
        <div class="real_head_left">
          <small class="">
            {{ $t('message.totalSelection1') }}
            <i>{{ standardList.length }}</i>
            {{ $t('message.totalSelection2') }}
          </small>
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
          <!-- MultiSelect -->
          <MultiSelect id="Material_Group" class="btn_select_layout" style="width: 100%" v-model="layoutValue" :options="layoutOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" @input="layoutBtn" label="text"></MultiSelect>
        </div>
      </div>
      <div class="real_body real_body04">
        <TranStandardListGrid style="height: 100%" :gridName="'TranStandardListGrid'" ref="TranStandardListGrid" :standardList="standardList" :gridLang="gridLang" :savePage="savePage" :menuId="menuId" :page="page" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <button v-if="this.authButton.exlAuth === 'Y'" class="btn_default btn_function" @click="$modal.show('ExcelUploadModal')">{{ $t('message.btnExcelUpload') }}</button>
          <button v-if="this.authButton.exlAuth === 'Y'" class="btn_default btn_function" @click="fileDownload">{{ $t('message.btnDownloadExcel') }}</button>
        </div>
        <div class="footer_right">
          <button v-if="this.authButton.savAuth === 'Y'" class="btn_default btn_critical_process" @click="saveStandardList()">{{ $t('message.btnSave') }}</button>
        </div>
      </div>
    </div>
    <!-- //리얼그리드 -->
    <MasterAlarmModal :ment="ment" @okOrNo="okOrNo" :type="type" />
    <ExcelUploadModal @downloadExcel="fileDownload" :page="page" />
  </div>
</template>

<script>
// import fileApi from '@/api/file';
import fileDownload from '@/mixins/fileDownload';
import { mapGetters } from 'vuex';
import languageApi from '@/api/language';
import masterApi from '@/api/master/master';
import StandardListSearch from '@/components/master/StandardListSearch';
import TranStandardListGrid from '@/components/gridView/master/TranStandardListGrid';
import MasterAlarmModal from '@/modal/master/MasterAlarmModal';
import ExcelUploadModal from '@/modal/master/ExcelUploadModal';
import dayjs from 'dayjs';

export default {
  components: {
    StandardListSearch,
    TranStandardListGrid,
    MasterAlarmModal,
    ExcelUploadModal,
  },
  props: {
    routerPath: {
      type: String,
    },
    menuId: {
      type: Number,
    },
    page: {
      type: String,
    },
    authButton: {
      type: Object,
    },
    savePage: {
      type: Array,
    },
  },
  data() {
    return {
      filterOn: true,
      standardList: [],
      type: '',
      ment: '',
      isFixRow: false,
      isFixColumn: false,
      layoutValue: { text: this.$t('message.btnLayout'), value: '' },
      layoutOptions: [
        { text: this.$t('message.btnSave'), value: 'save' },
        { text: this.$t('message.btnInit'), value: 'reset' },
      ],
      searchOpen: false,
      gridLang: [],
      result: '',
      checkRows: [],
      prdtClsCd: {},
      cityCd: {},
      distrCd: {},
    };
  },
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  methods: {
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
    validation(type) {
      this.checkRows = this.$refs.TranStandardListGrid.sendCheckedData();
      const result = { validation: true };

      if (this.standardList.length === 0) {
        result.validation = false;
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      }
      if (type === 'download') {
        if (this.cityCd.value && !this.distrCd.value) {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgNoDistrCd');
        }
      }

      if (type === 'save') {
        if (this.checkRows.length === 0) {
          result.validation = false;
          this.$EventBus.$emit('openYesModal', 'message.msgNoCheck');
        }
      }
      return result;
    },
    async saveStandardList() {
      this.result = this.validation('save');
      if (this.result.validation) {
        const paramData = [];
        this.checkRows.forEach(row => {
          paramData.push({
            prdtClsCd: row.prdtClsCd,
            cityCd: row.cityCd,
            distrCd: row.distrCd,
            closeTi: row.closeTiHour + ':' + row.closeTiMin + ':00',
            trnBfor: row.trnBfor ? JSON.parse(row.trnBfor).value : '',
            trnAftr: row.trnAftr ? JSON.parse(row.trnAftr).value : '',
            trnHour: row.trnHour ? JSON.parse(row.trnHour).value : '',
          });
        });
        const param = JSON.parse(JSON.stringify(paramData));
        try {
          const response = await masterApi.saveTranStandardList(param);
          if (response.data.rs) {
            await this.search();
            this.$EventBus.$emit('openYesModal', 'message.msgSaveChange');
          }
        } catch (e) {
          console.log(e);
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    async search() {
      this.$refs.StandardListSearch.search();
    },
    okOrNo(result) {
      if (result) {
        if (this.type === 'reset') {
          this.$refs.TranStandardListGrid.resetLayout();
        } else {
          this.$refs.TranStandardListGrid.saveLayout();
        }
      }
    },
    layoutBtn(status) {
      this.ment = '';
      this.type = '';
      if (status.value === 'save') {
        this.type = 'save';
        this.ment = 'message.msgAskSave';
        this.$modal.show('MasterAlarmModal');
      } else {
        this.type = 'reset';
        this.ment = 'message.msgAskRefresh';
        this.$modal.show('MasterAlarmModal');
      }
      this.layoutValue = { text: this.$t('message.btnLayout'), value: '' };
    },
    fixGrid(type) {
      const rows = this.$refs.TranStandardListGrid.sendJsonRows();
      const isChooseCell = this.$refs.TranStandardListGrid.isChooseCell();
      if (this.standardList.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      } else if (!isChooseCell) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoSelection');
      } else {
        if (rows.length > 0) {
          this.$refs.TranStandardListGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
          if (type === 'column') {
            this.isFixColumn = !this.isFixColumn;
          } else if (type === 'row') {
            this.isFixRow = !this.isFixRow;
          }
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgNoCheck');
        }
      }
    },
    sendStandardList(standardList) {
      this.standardList = standardList;
      this.$refs.TranStandardListGrid.gridCommit();
    },
    sendPrdtClsCd(prdtClsCd) {
      this.prdtClsCd = prdtClsCd;
    },
    sendCityCd(cityCd) {
      this.cityCd = cityCd;
    },
    sendDistrCd(distrCd) {
      this.distrCd = distrCd;
    },
    async fileDownload() {
      this.result = this.validation('download');
      if (this.result.validation) {
        try {
          const param = {
            prdtClsCd: this.prdtClsCd.value ? this.prdtClsCd.value : '',
            cityCd: this.cityCd.value ? this.cityCd.value : '',
            distrCd: this.distrCd.value ? this.distrCd.value : '',
            fileNm: `ExpireDate List-${dayjs().format('DDMMYYYY')}.xlsx`,
          };
          const resp = await masterApi.getStandardExcelDownload(param);
          fileDownload.downloadFile(resp, param.fileNm);
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    setFilter() {
      this.filterOn = !this.filterOn;
      this.$refs.TranStandardListGrid.setFilter(this.filterOn);
    },
  },
  created() {},
  mounted() {
    this.getRouterLanguage();
    this.setFilter();
  },
};
</script>

<style>
.checkbox-label {
  display: block;
}
</style>
