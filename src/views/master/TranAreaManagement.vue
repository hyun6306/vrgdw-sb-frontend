<template>
  <div>
    <TranAreaManagementSearch ref="tranAreaMngSearch" :page="page" @sendSearchList="getSearchList" :authButton="authButton" />

    <!-- 리얼그리드 -->
    <div class="realgrid_container_row" style="height: calc(100% - 55px)">
      <div class="realgrid_container w30p realgrid_container14">
        <div class="real_head">
          <div class="real_head_left">
            <span class="subTitle">{{ $t('message.trnAdd') }}</span>
            <small class="ml-10">
              {{ $t('message.totalSelection1') }}
              <i>{{ listRows01.length }}</i>
              {{ $t('message.totalSelection2') }}
            </small>
          </div>
          <div class="real_head_right"></div>
        </div>
        <div class="real_body real_body12">
          <TranAreaManagementGrid01 style="height: 100%" ref="tranAreaMngGrid01" :listRows="listRows01" :gridLang="gridLang" @prntCd="setPrntCd" />
        </div>
        <div class="real_footer">
          <div class="footer_left">
            <button v-if="this.authButton.exlAuth == 'Y'" class="btn_default btn_function" @click="excelTemplateDownload">
              {{ $t('message.btnExcelTemplate') }}
            </button>
            <button v-if="this.authButton.exlAuth == 'Y'" class="btn_default btn_function" @click="openPopup('ExcelUploadModal')">
              {{ $t('message.btnExcelUpload') }}
            </button>
            <button v-if="this.authButton.exlAuth == 'Y'" class="btn_default btn_function" :disabled="prntCd == ''" @click="excelDownload">
              {{ $t('message.btnDownloadExcel') }}
            </button>
          </div>
          <div class="footer_right"></div>
        </div>
      </div>

      <div class="realgrid_container w70p realgrid_container14">
        <div class="real_head">
          <div class="real_head_left">
            <span class="subTitle">{{ $t('message.trnAddDetail') }}</span>
            <small class="ml-10">
              {{ $t('message.totalSelection1') }}
              <i>{{ listRows02.length }}</i>
              {{ $t('message.totalSelection2') }}
            </small>
          </div>
          <div class="real_head_right">
            <button class="btn_default btn_function" @click="setFilter">
              <!-- <img src="@/assets/img/icon_vertical.png" /> -->
              <span v-if="!filterOn">{{ $t('message.btnFilterOn') }}</span>
              <span v-else>{{ $t('message.btnFilterOff') }}</span>
            </button>
            <!--             
            <button class="btn_default btn_add" @click="addRow('tranAreaMngGrid02', 1)" :disabled="prntCd == ''">{{ $t('message.btnAdd') }}</button>
            <button class="btn_default btn_delete" @click="getCheckedData('tranAreaMngGrid02')" :disabled="prntCd == ''">{{ $t('message.btnDelete') }}</button>
            -->
            <button class="btn_default btn_critical_process" :class="prntCd == '' ? '' : 'btn_deep_green'" @click="getNewAndChangeData('tranAreaMngGrid02')" :disabled="prntCd == ''">{{ $t('message.btnSave') }}</button>
          </div>
        </div>
        <div class="real_body real_body12">
          <TranAreaManagementGrid02 style="height: 100%" ref="tranAreaMngGrid02" :listRows="listRows02" :gridLang="gridLang" />
        </div>
      </div>
    </div>
    <!-- //리얼그리드 -->
    <ExcelUploadModal :prntCd="prntCd" :page="page" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import languageApi from '@/api/language';
import masterApi from '@/api/master/master';
import TranAreaManagementSearch from '@/components/master/TranAreaManagementSearch';
import TranAreaManagementGrid01 from '@/components/gridView/master/TranAreaManagementGrid01';
import TranAreaManagementGrid02 from '@/components/gridView/master/TranAreaManagementGrid02';

import { loadLanguageAsync } from '@/plugins/i18n';
import fileApi from '@/api/file';
import ExcelUploadModal from '@/modal/master/ExcelUploadModal';
import fileDownload from '@/mixins/fileDownload';

export default {
  components: {
    TranAreaManagementSearch,
    TranAreaManagementGrid01,
    TranAreaManagementGrid02,
    ExcelUploadModal,
  },
  props: ['authButton', 'savePage', 'menuId', 'page', 'openInfo', 'routerPath'],
  data() {
    return {
      pageInfo: { totalCount: 0 },
      pageNumber: 0,
      listRows01: [],
      listRows02: [],
      gridLang: [],
      prntCd: '',
      filterOn: true,
    };
  },
  watch: {},
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
    getSearchList(list) {
      this.listRows01 = list;
      this.listRows02 = [];
      this.$refs.tranAreaMngGrid01.initDisptRow();
      if (this.listRows01.length !== 0) this.setPrntCd(this.listRows01[0].trncusId);
    },
    setPrntCd(prntCd) {
      this.prntCd = prntCd;
      if (this.prntCd) this.getAreaPriceListDetail(this.prntCd);
    },
    async getAreaPriceListDetail(prntCd) {
      try {
        const param = {
          trncusId: prntCd,
        };
        const resp = await masterApi.getAreaPriceListDetail(param);
        this.listRows02 = resp.data.ds;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async excelDownload() {
      if (this.listRows02.length == 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoInquireItem');
      } else {
        const excelData = {
          fileNm: 'Tran-Area-management-Excel.xlsx',
          showProgress: true,
          progressMessage: 'Exporting..',
          indicator: 'hidden',
          header: 'default',
          footer: 'hidden',
          compatibility: true,
        };
        this.$refs.tranAreaMngGrid02.excelExport(excelData);
      }
    },
    async openPopup(modalNm) {
      let url = '/modal/excelUpload';
      // if (this.prntCd === '') {
      //   this.$EventBus.$emit('openYesModal', 'message.msgValidSelectFCT');
      //   return;
      // }
      try {
        await loadLanguageAsync(url, this.menuId);
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
      this.$modal.show(modalNm);
    },
    async excelTemplateDownload() {
      try {
        const fileNm = 'AreaPrice-Upload.xlsx';
        const savePath = '/upload/templete/AreaPrice-Upload.xlsx';
        const response = await fileApi.download(savePath, fileNm);
        fileDownload.downloadFile(response, fileNm);
        // api 확인 후 진행
        // const response = await masterApi.getAreaPriceExcelTemplateDownload();
        // fileDownload.downloadFile(response, 'AreaPrice-Upload.xlsx');
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    getNewAndChangeData() {
      const rows = this.$refs.tranAreaMngGrid02.getNewAndChangeData();
      this.putAreaPriceSave(rows);
    },
    async putAreaPriceSave(rows) {
      try {
        const param = rows;
        const resp = await masterApi.putAreaPriceSave(param);
        this.$EventBus.$emit('openYesModal', resp.data.message);

        this.getAreaPriceListDetail(this.prntCd);
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    setFilter() {
      this.filterOn = !this.filterOn;
      this.$refs.tranAreaMngGrid02.setFilter(this.filterOn);
    },
  },
  created() {},
  mounted() {
    this.getRouterLanguage();
    this.setFilter();
  },
  destroyed() {},
};
</script>

<style scoped>
.subTitle {
  font-size: 1em;
  font-weight: bold;
}
.realgrid_container_row > .realgrid_container.w30p {
  width: calc(30% - 5px);
}
.realgrid_container_row > .realgrid_container.w70p {
  width: calc(70% - 5px);
}
.checkbox-label {
  display: block;
}
</style>
