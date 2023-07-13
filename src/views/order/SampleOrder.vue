<template>
  <div>
    <OrderInfoInput :menuId="menuId" />
    <!-- 리얼그리드 -->
    <div class="realgrid_container">
      <div class="real_head">
        <div class="real_head_left">
          <span class="real_title">{{ $t('message.prdtList') }}</span>
          <small>{{ $t('message.totalSelection1') }} <i>4</i> {{ $t('message.totalSelection2') }}</small>
        </div>
        <div class="real_head_right">
          <button class="btn_default btn_deep_green" @click="openPopup('ProductSearchModal', 'addPrdt')">{{ $t('message.btnAddPrdt') }}</button>
          <button class="btn_default btn_deep_green" @click="openPopup('ProductSearchModal', 'addFavorite')">{{ $t('message.btnFavorite') }}</button>
        </div>
      </div>
      <div class="real_top_filter">
        <div class="real_top_left">
          <span class="real_top_filter_title">{{ $t('message.applyMonth') }} <i>(2)</i></span>
          <!-- 데이터피커 -->
          <div class="form_calendar">
            <input type="text" placeholder="날짜 선택" />
            <button class="icon_calendar" @click="datePicker('DatePicker')"><img src="@/assets/img/icon_calendar.png" /></button>
          </div>
        </div>
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
          <button class="btn_default btn_filter">
            <img src="@/assets/img/icon_filter.png" />
            <span>{{ $t('message.btnFilter') }}</span>
          </button>
          <button class="btn_default btn_filter" @click="deleteRows()">
            <img src="@/assets/img/icon_trace.png" />
            <span>
              {{ $t('message.btnSelectionDelete') }} <i> ({{ checkedCount }}) </i>
            </span>
          </button>
        </div>
      </div>
      <div class="real_body">
        <!-- 얘인가.,..? -->
        <SampleOrderGrid style="height: 400px" @openSingleCalendar="openSingleCalendar" :selectMonth="selectMonth" />
      </div>
      <div class="real_total">
        <p>
          <span>{{ $t('message.priceTotal') }} :</span>
          <i>44,977,504,000</i>
        </p>
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <button class="btn_default btn_ref">{{ $t('message.btnInit') }}</button>
        </div>
        <div class="footer_right">
          <button class="btn_default btn_excel" @click="excelDownload()">{{ $t('message.btnExcelTemplate') }}</button>
          <button class="btn_default btn_excel" @click="openPopup('ExcelUploadModal')">{{ $t('message.btnExcelUpload') }}</button>
          <button class="btn_default btn_temp">{{ $t('message.btnTemporarySave') }}</button>
          <button class="btn_default btn_quta">{{ $t('message.btnRequestQuote') }}</button>
        </div>
      </div>
    </div>
    <!-- //리얼그리드 -->
    <ProductSearchModal :addPrdtType="addPrdtType" @resetAddrPrdt="resetAddrPrdt" />
    <ExcelUploadModal @downloadExcel="excelDownload()" />
    <!-- 달력 -->
    <DateMonthPickerModal @chooseMonth="chooseMonth" :currentMonth="currentMonth" />
  </div>
</template>

<script>
import { loadLanguageAsync } from '@/plugins/i18n';
import OrderInfoInput from '@/components/order/OrderInfoInput';
import ProductSearchModal from '@/modal/order/ProductSearchModal';
import fileApi from '@/api/file';
import fileDownload from '@/mixins/fileDownload';
import ExcelUploadModal from '@/modal/order/ExcelUploadModal';
import SampleOrderGrid from '@/components/gridView/order/SampleOrderGrid';
// import OrderGeneralGrid from '@/components/gridView/order/OrderGeneralGrid';
import DateMonthPickerModal from '@/modal/DateMonthPickerModal';

export default {
  components: { OrderInfoInput, ProductSearchModal, ExcelUploadModal, SampleOrderGrid, DateMonthPickerModal },
  data() {
    return {
      filterOn: true,
      addPrdtType: '',
      selectMonth: '',
      currentMonth: '',
      isFixColumn: false,
      isFixRow: false,
      checkedCount: 0,
    };
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
  },
  methods: {
    fixGrid(type) {
      this.$refs.OrderGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
      if (type === 'column') {
        this.isFixColumn = !this.isFixColumn;
      } else if (type === 'row') {
        this.isFixRow = !this.isFixRow;
      }
    },
    deleteRows() {
      this.$refs.OrderGrid.deleteRows();
    },
    chooseMonth(month) {
      this.selectMonth = month;
    },
    openSingleCalendar(currentMonth) {
      this.currentMonth = currentMonth;
      this.$modal.show('DateMonthPicker');
    },
    async openPopup(modalNm, type) {
      let url = '';
      if (modalNm === 'ProductSearchModal') {
        url = '/modal/product/add';
        this.addPrdtType = type;
      } else if (modalNm === 'ExcelUploadModal') {
        url = '/modal/excelUpload';
      }
      try {
        await loadLanguageAsync(url, this.menuId);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
      this.$modal.show(modalNm);
    },
    resetAddrPrdt() {
      this.addPrdtType = '';
    },
    async excelDownload() {
      const fileNm = 'Offer-Upload.xlsx';
      const savePath = '/upload/templete/Offer-Upload.xlsx';
      try {
        const response = await fileApi.download(savePath, fileNm);
        fileDownload.downloadFile(response, fileNm);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async upload(file) {
      const formData = new FormData();
      //   formData.append('file', this.setFile);
      formData.append('file', file);
      try {
        await fileApi.upload(formData);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    setFilter() {
      this.filterOn = !this.filterOn;
      this.$refs.SampleOrderGrid.setFilter(this.filterOn);
    },
  },
  created() {},
  mounted() {
    this.setFilter();
  },
};
</script>

<style></style>
