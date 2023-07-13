<template>
  <div>
    <!-- 검색필터 영역 -->
    <QuotaDetailInfo v-if="this.page == 'orderDtls'" :authButton="this.authButton" :userInfo="userInfo" :offrInfo="offrInfo" :layoutData="layoutData" :canQtyTotal="canQtyTotal" ref="CustQuotaInfo" @searchOpen="searchOpen" :menuId="menuId" @infoMent="infoMent" :openInfo="openInfo" />
    <SampleDetailInfo v-if="this.page == 'sampleDtls'" :authButton="this.authButton" :userInfo="userInfo" :offrInfo="offrInfo" :layoutData="layoutData" :canQtyTotal="canQtyTotal" ref="CustQuotaInfo" @searchOpen="searchOpen" :menuId="menuId" @infoMent="infoMent" :openInfo="openInfo" />
    <!-- //검색필터 영역 -->
    <QuoteDetailModal :ment="ment" :type="type" />
    <!-- 리얼그리드 -->
    <div :class="[searchOpenYn ? 'realgrid_container realgrid_container03' : 'realgrid_container realgrid_container03 padding-on']">
      <div class="real_head">
        <div class="real_head_left">
          <small
            >{{ $t('message.totalSelection1') }} <i>{{ totalRowCount }}</i> {{ $t('message.totalSelection2') }}</small
          >
        </div>
      </div>
      <div class="real_top_filter">
        <div class="real_top_left"></div>
        <div class="real_top_right">
          <p class="costcenter_input" v-if="page === 'sampleDtls' && this.authButton.schAuth == 'Y'" @click="setCostCenter">
            <label for="">{{ $t('message.costCenter') }}</label>
            <input type="text" id="" v-model="costfilter" />
            <!-- @keyup.enter="setCostCenter" -->
            <!-- <button @click="setCostCenter">{{ $t('message.btnCheck') }}</button> -->
            <button><img src="@/assets/img/icon_search.png" /></button>
          </p>
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
          <MultiSelect id="Material_Group" class="btn_select_layout" style="width: 100%" v-model="selectValueLayout" @input="layoutSave" :options="selectOptionsLayout" label="text" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Layout"></MultiSelect>
          <!-- <div class="dropdown_box">
            <button class="btn_default btn_filter" @click="layoutOpen = !layoutOpen">
              <span>{{ $t('message.btnLayout') }}</span>
            </button>
            <ul class="dropdown_layout" :class="{ on: layoutOpen }">
              <li>
                <button class="btn_dropdown btn_save" @click="layoutSave('save')">
                  {{ $t('message.btnSave') }}
                </button>
              </li>
              <li>
                <button class="btn_dropdown btn_reset" @click="layoutSave('reset')">
                  {{ $t('message.btnInit') }}
                </button>
              </li>
            </ul>
          </div> -->
        </div>
      </div>
      <div class="real_body real_body04">
        <QuoteDetailGrid v-if="this.page == 'orderDtls'" :gridLang="gridLang" :page="this.page" ref="DetailGrid" style="height: 100%" :userMenuGrpCd="userMenuGrpCd" :openInfo="openInfo" @clickedRow="clickedRow" @ment="gridMent" @modalType="modalType" @sendRowCount="sendRowCount" :authButton="authButton" :savePage="savePage" :menuId="menuId" :layoutData="layoutData" @sendCheckedData="sendCheckedData" @sendDetailData="sendDetailData" @sendOffrInfo="sendOffrInfo" @sendCheckedCount="sendCheckedCount" />
        <SampleDetailGrid v-if="this.page == 'sampleDtls'" :gridLang="gridLang" :page="this.page" ref="DetailGrid" style="height: 100%" :userMenuGrpCd="userMenuGrpCd" :openInfo="openInfo" @clickedRow="clickedRow" @ment="gridMent" @modalType="modalType" @sendRowCount="sendRowCount" :authButton="authButton" :savePage="savePage" :menuId="menuId" :layoutData="layoutData" @sendCheckedData="sendCheckedData" @sendDetailData="sendDetailData" @sendOffrInfo="sendOffrInfo" @sendCheckedCount="sendCheckedCount" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <!-- <button class="btn_default btn_white" @click="testLayM()">{{ $t('message.btnChangeUnit') }}</button> -->
          <MultiSelect id="Material_Group" class="btn_select" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" @input="changeUnit" label="text"></MultiSelect>
          <!-- <div class="dropdown_box">
            <button class="btn_default btn_white" @click="dropUnitOpen = !dropUnitOpen">
              {{ $t('message.btnChangeUnit') }}
            </button>
            <ul class="dropdown_chang_unit" :class="{ on: dropUnitOpen }">
              <li>
                <button :class="chgUnit.ord" @click="changeLayout('ord')">
                  {{ $t('message.unitRequest') }}
                </button>
              </li>
              <li>
                <button :class="chgUnit.base" @click="changeLayout('base')">
                  {{ $t('message.btnBaseUnit') }}
                </button>
              </li>
            </ul>
          </div> -->
          <button class="btn_default btn_function" v-if="this.authButton.exlAuth == 'Y'" @click="excelDownload">
            <!-- <button class="btn_default btn_ref" v-if="this.authButton.exlAuth == 'Y'" @click="excelDownload"> -->
            {{ $t('message.btnDownloadExcel') }}
          </button>
        </div>
        <div class="footer_right">
          <button class="btn_default btn_critical_process" v-if="this.authButton.fn2Auth == 'Y' && this.page == 'orderDtls'" @click="apprNumSave">
            {{ $t('message.btnApprDocNumAdd') }}
          </button>
          <button class="btn_default btn_critical_process" v-if="this.authButton.fn1Auth == 'Y' && this.page == 'sampleDtls'" @click="apprNumSave">
            {{ $t('message.btnApprDocNumAdd') }}
          </button>
          <button class="btn_default btn_critical_process" v-if="this.authButton.fn3Auth == 'Y' && this.page == 'orderDtls'" @click="leftCancel">{{ $t('message.btnLeftQtyCancel') }} {{ checkedCount }}</button>
          <button class="btn_default btn_critical_process" v-if="this.authButton.fn2Auth == 'Y' && this.page == 'sampleDtls'" @click="leftCancel">{{ $t('message.btnLeftQtyCancel') }} {{ checkedCount }}</button>
          <!-- <button class="btn_default btn_function" @click="offrChagSave" v-if="this.authButton.savAuth == 'Y'">
            {{ $t('message.btnSave') }}
          </button> -->
          <button class="btn_default btn_critical_process" @click="sampleConfrim" v-if="this.authButton.fn3Auth === 'Y' && this.page == 'sampleDtls'">{{ $t('message.btnConfirm') }}</button>
          <!-- <button class="btn_default btn_temp" v-if="this.authButton.fn2Auth === 'Y'" @click="approval">
            {{ $t('message.btnPayment') }}
          </button> -->
          <!-- <button class="btn_default btn_temp" v-if="this.authButton.fn2Auth === 'Y'" @click="apprCheck">
            {{ $t('message.btnApprCheck') }}
          </button> -->
          <button class="btn_default btn_process" v-if="this.authButton.fn4Auth === 'Y' && this.page == 'sampleDtls'" @click="bokngConfirm">
            {{ $t('message.btnSampleBookingConfirmation') }}
          </button>
          <button class="btn_default btn_process" v-if="this.authButton.fn5Auth === 'Y'" @click="sampleEnd">
            {{ $t('message.custCompletion') }}
          </button>
        </div>
      </div>
    </div>
    <!-- //리얼그리드 -->
    <CompleteModal :checkedData="checkedData" :openInfo="openInfo" :offrInfo="offrInfo" @compMent="compMent" />
    <DetailCommentModal :ment="ment" :modalType="modalTitle" />
    <DetailAlarmModal :ment="ment" :type="type" @modalReturn="modalReturn" />
    <CostCenterModal @costCenterInfo="costCenterInfo" :costfilter="costfilter" />
    <PriceDraftDocumentModal @saveApprDocNum="saveApprDocNum" />
  </div>
</template>

<script>
// import DatePickerModal from '@/modal/DateMonthPickerModal';
// import { EventBus } from '@/views/devPage/tabTest/EventBus';
import { loadLanguageAsync } from '@/plugins/i18n';

import QuoteDetailGrid from '@/components/gridView/order/QuoteDetailGrid.vue';
import SampleDetailGrid from '@/components/gridView/order/SampleDetailGrid.vue';
import orderApi from '@/api/order/order';
import detailApi from '@/api/order/detail';
// import fileApi from '@/api/file';
// import fileDownload from '@/mixins/fileDownload';
import { mapGetters } from 'vuex';

import QuoteDetailModal from '@/modal/detail/QuoteDetailModal.vue';
import DetailAlarmModal from '@/modal/detail/DetailAlarmModal';
import CompleteModal from '@/modal/detail/CompleteModal';
import PriceDraftDocumentModal from '@/modal/sales/DraftDocumentModal';
import DetailCommentModal from '@/modal/detail/DetailCommentModal';
import CostCenterModal from '@/modal/detail/CostCenterModal';
import QuotaDetailInfo from '@/components/order/QuotaDetailInfo.vue';
import SampleDetailInfo from '@/components/order/SampleDetailInfo.vue';
import languageApi from '@/api/language';
import defs from '@/consts/defs';

export default {
  components: {
    QuoteDetailGrid,
    SampleDetailGrid,
    // DatePickerModal,
    QuoteDetailModal,
    CostCenterModal,
    DetailAlarmModal,
    CompleteModal,
    QuotaDetailInfo,
    SampleDetailInfo,
    DetailCommentModal,
    PriceDraftDocumentModal,
    // SalesQuotaInfo,
  },
  props: {
    savePage: {
      type: Array,
    },
    menuId: {
      type: Number,
    },
    page: {
      type: String,
    },
    openInfo: {
      type: Object,
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
      filterOn: true,
      currentMonth: '',
      selectMonth: '',
      //
      selectValue: { value: false, text: this.$i18n.t('message.ordUnit') },
      selectValueLayout: { value: 'layout', text: this.$i18n.t('message.btnLayout') },
      selectOptions: [
        { value: false, text: this.$i18n.t('message.ordUnit') },
        { value: true, text: this.$i18n.t('message.btnBaseUnit') },
      ],
      selectOptionsLayout: [
        { value: 'save', text: this.$i18n.t('message.btnSave') },
        { value: 'reset', text: this.$i18n.t('message.btnInit') },
      ], //
      totalRowCount: 0,
      gridData: [],
      isFixColumn: false,
      isFixRow: false,
      checkedCount: 0,
      layoutData: false,
      dropUnitOpen: false,
      layoutOpen: false,
      layout: '',
      offrInfo: '',
      checkedData: [],
      // data: '',
      pageObj: '',
      chgUnit: {
        ord: 'btn_default btn_quta',
        base: 'btn_default btn_white',
      },
      ment: '',
      searchOpenYn: false,
      type: '',
      canQtyTotal: [],
      costfilter: '',
      gridLang: [],
      modalTitle: 'message.salesComment',
      apprParamList: [],
      offrClsCd: defs.offrClsCd,
    };
  },
  watch: {
    openInfo() {
      this.costfilter = '';
    },
  },
  methods: {
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
    sendRowCount(count) {
      this.totalRowCount = count;
      this.checkedCount = 0;
    },
    searchOpen(Yn) {
      this.searchOpenYn = Yn;
    },
    gridMent(ment) {
      this.ment = ment;
    },
    modalType(type) {
      this.type = type;
    },
    modalReturn(data) {
      if (data == 'save' || data == 'reset') {
        this.$refs.DetailGrid.saveLayout(data);
      }
    },
    changeUnit(data) {
      this.layoutData = data.value;
    },
    infoMent(ment) {
      this.ment = ment;
    },
    compMent(ment) {
      this.ment = ment;
      this.$modal.show('QuoteDetailModal');
    },
    saveApprDocNum(apprNum) {
      if (this.page == 'orderDtls') this.apprSave(apprNum);
      else this.$refs.DetailGrid.addApprNum(apprNum);
    },
    clickedRow(data) {
      this.$refs.DetailGrid.gridCommit();
      this.apprParamList = [];
      this.apprParamList.push(data);
      this.$modal.show('PriceDraftDocumentModal');
    },
    async setCostCenter() {
      if (this.offrInfo.offrStatCd == 'REQ') {
        this.showModal('CostCenterModal');
      } else {
        this.ment = 'message.errorsVaildRequest';
        this.$modal.show('QuoteDetailModal');
      }
    },
    async sampleConfrim() {
      let param = [];
      let statCheck = true;
      let totalData = this.$refs.DetailGrid.getTotalData();
      totalData.forEach(data => {
        if (data.sizeChgYn == 'N') {
          if (data.apprDocNum !== '' && data.trnExptDt !== null && data.costCntrNm !== '') {
            param.push({
              id: data.apprId,
              apprDocNum: data.apprDocNum,
              costCntrCd: data.costCntrCd,
              costCntrNm: data.costCntrNm,
              trnExpctDt: data.trnExptDt,
            });
          } else {
            statCheck = false;
          }
        }
      });
      if (statCheck) {
        try {
          await detailApi.putSampleSave(param);
          if (this.offrInfo.offrStatCd !== 'REQ') {
            this.ment = 'message.errorsVaildRequest';
            this.showModal('QuoteDetailModal');
          } else {
            param = {
              custId: this.openInfo.custId,
              id: this.openInfo.id,
              offrClsCd: this.offrClsCd.sample,
            };
            await detailApi.putSampleConfirm([param]);
            await this.$refs.DetailGrid.loadDetail();
            this.ment = 'message.msgQuoteConfirm';
            this.showModal('QuoteDetailModal');
          }
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      } else {
        this.ment = 'message.errorsVaildCostCenter';
        this.showModal('QuoteDetailModal');
      }
    },
    chgUnitBtn(type) {
      if (type) {
        this.chgUnit.base = 'btn_default btn_quta';
        this.chgUnit.ord = 'btn_default btn_white';
      } else {
        this.chgUnit.base = 'btn_default btn_white';
        this.chgUnit.ord = 'btn_default btn_quta';
      }
    },
    async sampleEnd() {
      this.$refs.DetailGrid.sendCheckedData();
      if (this.checkedData == '') {
        this.ment = 'message.msgNoItem';
        this.showModal('QuoteDetailModal');
      } else {
        let stateCheck = '';
        this.checkedData.forEach(data => {
          if (data.offrDtlsStatCd !== 'CFM') {
            stateCheck = 'state';
          } else if (data.sizeChgYn == 'N') {
            stateCheck = 'size';
          }
        });
        if (stateCheck == 'state') {
          this.ment = 'message.errorsVaildCfm';
          this.showModal('QuoteDetailModal');
        } else if (stateCheck == 'size') {
          this.ment = 'message.errorsSizeNRow';
          this.showModal('QuoteDetailModal');
        } else if (stateCheck == '') {
          this.$refs.DetailGrid.sendCheckedData();
          await this.showModal('CompleteModal');
          // await this.$refs.DetailGrid.loadDetail();
        }
      }
    },
    async apprNumSave() {
      //결재문서번호 저장
      if (this.page == 'orderDtls') this.$refs.DetailGrid.sendCheckedData();
      else this.$refs.DetailGrid.apprCheckedData();
      if (this.checkedData.length == 0) {
        this.ment = 'message.msgNoItem';
        this.showModal('QuoteDetailModal');
      } else if (this.checkedData.some(row => row.apprStatCd === null)) {
        this.ment = 'message.msgNoPaymentItem';
        this.showModal('QuoteDetailModal');
      } else {
        this.apprParamList = this.checkedData;
        this.$modal.show('PriceDraftDocumentModal');
      }
    },
    async apprSave(apprNum) {
      //결재문서번호 저장
      let offerDtlsList = [];
      this.apprParamList.forEach(row => {
        offerDtlsList.push({
          apprId: row.apprId,
          apprDocNum: apprNum,
        });
      });
      let Info = { custId: this.openInfo.custId, offrId: this.openInfo.id };
      let param = { ...Info, ...{ offerDtlsList: offerDtlsList } };
      try {
        await detailApi.putApprNumSave(param);
        await this.$refs.DetailGrid.loadDetail();
        this.ment = 'message.msgSave';
        this.showModal('QuoteDetailModal');
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async approval() {
      this.$refs.DetailGrid.sendCheckedData();
      try {
        if (this.checkedCount == 0) {
          this.ment = 'message.msgNoItem';
          this.showModal('QuoteDetailModal');
          return;
        } else {
          let apprIds = [];
          this.checkedData.forEach((data, index) => {
            if (data.apprStatCd == 'RTN' || data.apprStatCd == 'NED') {
              apprIds[index] = data.apprId;
            }
          });
          if (this.checkedData.length == apprIds.length) {
            let param = { ...{ custId: this.openInfo.custId }, ...{ apprIds: apprIds } };
            const resp = await detailApi.putApprReq(param);
            await this.$refs.DetailGrid.loadDetail();
            if (resp.data.message == '저장하였습니다.') {
              this.ment = 'message.msgOkPayment';
              this.showModal('QuoteDetailModal');
            } else {
              this.ment = 'message.msgNoPaymentItem';
              this.showModal('QuoteDetailModal');
            }
          } else {
            this.ment = 'message.msgNoPaymentItem';
            this.showModal('QuoteDetailModal');
          }
        }
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    loadOrderPage(type) {
      // let routerPP = '/order/general-list';
      const menuList = this.$store.state.menuList;
      const fourthResult = [];

      menuList.menuList.forEach(first => {
        first.children.forEach(second => {
          // 1 Depth
          second.children.forEach(third => {
            // 2 Depth
            // third.children.forEach(fourth => {
            // 3 Depth
            fourthResult.push(third);
            // });
          });
        });
      });

      fourthResult.find(element => {
        // if (element.routerPath == '/order/general') {
        //   this.pageObj = element;
        // }
        if (type == 'generalList') {
          if (element.routerPath == '/order/general-list') {
            this.pageObj = element;
            this.$emit('setNewObject', this.pageObj, this.offrInfo.id, this.openInfo.custId, this.offrInfo.offrStatusNm);
            return;
          }
        } else if (type == 'sampleList') {
          if (element.routerPath == '/order/sample-list') {
            this.pageObj = element;
            this.$emit('setNewObject', this.pageObj, this.offrInfo.id, this.openInfo.custId, this.offrInfo.offrStatusNm);
            return;
          }
        } else {
          if (type == 'trnPsbOrdQty') {
            if (element.routerPath == '/order/booking-list') {
              this.pageObj = element;
              this.$emit('setNewObject', this.pageObj, this.openInfo.id, this.openInfo.custId);
            }
          } else if (type == 'sampleOrder') {
            if (element.routerPath == '/order/sample') {
              this.pageObj = element;
              this.$emit('setNewObject', this.pageObj, this.openInfo.id, this.openInfo.custId);
            }
          } else if (type == 'generalOrder') {
            if (element.routerPath == '/order/general') {
              this.pageObj = element;
              this.$emit('setNewObject', this.pageObj, this.openInfo.id, this.openInfo.custId);
            }
          }
          // this.$emit('setNewObject', this.pageObj, this.openInfo.id, this.openInfo.custId);
        }
      });
    },
    costCenterInfo(data) {
      this.$refs.DetailGrid.costCenterEdit(data);
      this.costfilter = data.costInfo.centerNm;
    },
    async bokngConfirm() {
      this.$refs.DetailGrid.sendCheckedData();
      if (this.checkedCount == 0) {
        this.ment = 'message.msgNoItem';
        this.showModal('QuoteDetailModal');
      } else {
        const param = {
          id: this.openInfo.id,
          custId: this.openInfo.custId,
          offrNum: this.offrInfo.offrNum,
        };
        let itemData = [];
        let statCheck = '';
        this.checkedData.forEach((data, index) => {
          itemData[index] = { id: data.id, prdtId: data.prdtId };
          if (data.offrDtlsStatCd !== 'CFM') {
            statCheck = 'notCFM';
          } else if (data.sizeChgYn == 'Y') {
            statCheck = 'custom';
          } else if ((data.costCntrCd == null || data.costCntrNm == null || data.apprDocNum == null || data.trnExptDt == null) && statCheck == '') {
            statCheck = 'haveNull';
          }
        });
        if (statCheck == 'notCFM') {
          this.ment = 'message.errorsVaildCfm';
          this.showModal('QuoteDetailModal');
        } else if (statCheck == 'haveNull') {
          this.ment = 'message.errorsVaildCostCenter';
          this.showModal('QuoteDetailModal');
        } else if (statCheck == 'custom') {
          this.ment = 'message.errorsSizeYRow';
          this.showModal('QuoteDetailModal');
        } else {
          param['offerDtlsDtoList'] = itemData;
          try {
            await detailApi.putBokngConfirm(param);
            await this.$refs.DetailGrid.loadDetail();
            this.ment = 'message.msgBokngSuss';
            this.showModal('QuoteDetailModal');
          } catch (e) {
            if (e && e.err && e.err.data && e.err.data.message) {
              this.$EventBus.$emit('openYesModal', e.err.data.message);
            } else {
              this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
            }
          }
        }
      }
    },
    apprCheck() {
      this.$refs.DetailGrid.apprCheck();
    },
    async offrChagSave() {
      this.$refs.DetailGrid.sendCheckedData();
      if (this.checkedCount == 0) {
        this.ment = 'message.msgNoItem';
        this.showModal('QuoteDetailModal');
      } else if (this.offrInfo.offrStatCd !== 'REQ') {
        this.ment = 'message.errorsVaildRequest';
        this.$modal.show('QuoteDetailModal');
      } else {
        let dtlsList = [];
        let errorCheck = '';
        this.checkedData.forEach(data => {
          // if (data.apprStatCd !== '결재반려' && data.apprStatCd !== '결재필요') {
          //   this.ment = 'message.msgNoPaymentItem';
          //   this.openPopup('QuoteDetailModal');
          // } else
          if (data.prdtQtyAmt == 0) {
            errorCheck = 'null';
          } else if (data.offrDtlsStatCd !== 'REQ') {
            errorCheck = 'state';
          } else {
            dtlsList.push({
              id: parseInt(data.id),
              chgQtyAmt: data.chgQtyAmt,
              trnAddAmt: data.trnAddAmt,
            });
          }
        });
        if (errorCheck == 'null') {
          this.ment = 'message.errorsNullAmt';
          this.showModal('QuoteDetailModal');
        } else if (errorCheck == 'state') {
          this.ment = 'message.errorsVaildRequest';
          this.$modal.show('QuoteDetailModal');
        }
        if (this.checkedData.length == dtlsList.length) {
          let orderParam = {
            id: this.openInfo.id,
            custId: this.openInfo.custId,
            offrNum: this.offrInfo.offrNum,
            offrStatCd: this.offrInfo.offrStatCd,
            offerDtlsDtoList: dtlsList,
          };
          try {
            await orderApi.putOffrChgSave(orderParam);
            await this.$refs.DetailGrid.loadDetail();
            this.ment = 'message.msgSave';
            this.showModal('QuoteDetailModal');
          } catch (e) {
            if (e && e.err && e.err.data && e.err.data.message) {
              this.$EventBus.$emit('openYesModal', e.err.data.message);
            } else {
              this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
            }
          }
        }
      }
    },
    changeLayout(data) {
      this.dropUnitOpen = !this.dropUnitOpen;
      if (data == 'ord') {
        this.layoutData = true;
      } else if (data == 'base') {
        this.layoutData = false;
      }
      // this.$refs.DetailGrid.chgUnitStat(data);
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
      this.selectValueLayout = { value: 'layout', text: this.$i18n.t('message.btnLayout') };
    },
    fixGrid(type) {
      if (this.$refs.DetailGrid.focusCheck()) {
        const rows = this.$refs.DetailGrid.sendJsonRows();
        if (rows.length > 0) {
          this.$refs.DetailGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
          if (type === 'column') {
            this.isFixColumn = !this.isFixColumn;
          } else if (type === 'row') {
            this.isFixRow = !this.isFixRow;
          }
        } else {
          this.ment = 'message.msgNoProduct';
          this.$modal.show('QuoteDetailModal');
        }
      } else {
        this.ment = 'message.msgNoSelection';
        this.$modal.show('QuoteDetailModal');
      }
    },
    sendCheckedData(checkedData) {
      this.checkedData = checkedData;
    },
    sendCheckedCount(checkedCount) {
      this.checkedCount = checkedCount;
    },
    sendDetailData(data) {
      this.gridData = data;
      let canBaseTotal = 0;
      let canOrdTotal = 0;
      for (let key in data) {
        canBaseTotal += data[key].canBaseQty;
        canOrdTotal += data[key].canOrdQty;
      }
      this.canQtyTotal[0] = canBaseTotal;
      this.canQtyTotal[1] = canOrdTotal;
      // 샘플상세 진입 시, costCntrNm이 있다면 코스트센터 input 영역에 노출.
      if (this.page == 'sampleDtls') {
        data.forEach(rows => {
          if (rows.costCntrNm !== '' && rows.costCntrNm !== null && rows.costCntrNm !== undefined) {
            this.costfilter = rows.costCntrNm;
          }
        });
      }
    },
    sendOffrInfo(data) {
      if (data.offrStatCd == 'REQ' && this.authButton.fn5Auth == 'Y') {
        data.offrTotal = 0;
        data.reqTotal = 0;
      }
      this.offrInfo = data;
    },
    async offrMng(type) {
      if (type == 'cancel') {
        if (this.offrInfo.offrStatCd !== 'REQ' && this.offrInfo.offrStatCd !== 'CFM') {
          this.ment = 'message.errorsOverlapCancle';
          this.showModal('QuoteDetailModal');
        } else if (this.offrInfo.offrStatCd == 'CFM' && this.userMenuGrpCd == 'CUSTOMER') {
          this.$EventBus.$emit('openYesModal', 'message.errorsCancelOnlySales');
        } else {
          try {
            const response = await orderApi.putCancelCheck([this.openInfo]);
            if (response.data.rs.isVerified) {
              await orderApi.putQuoteCancel([this.openInfo]);
              this.ment = 'message.msgCancelQuotation';
              this.type = this.page;
              await this.$refs.DetailGrid.loadDetail();
              this.showModal('QuoteDetailModal');
            } else {
              this.ment = 'message.msgImpossibleCancel';
              this.showModal('QuoteDetailModal');
            }
          } catch (e) {
            if (e && e.err && e.err.data && e.err.data.message) {
              this.$EventBus.$emit('openYesModal', e.err.data.message);
            } else {
              this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
            }
          }
        }
      } else if (type == 'copy') {
        try {
          let param = {
            ...this.openInfo,
            prdtClsCd: this.gridData[0].prdtClsNm,
          };
          const resp = await orderApi.putOffrCopy(param);
          this.ment = resp.data.status == 200 ? 'message.msgQuoteCopy' : 'message.msgQuoteCopyFail';
          this.showModal('QuoteDetailModal');
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    async excelDownload() {
      const excelData = {
        fileNm: `Detail-Excel.xlsx`,
        showProgress: true,
        progressMessage: 'Exporting..',
        indicator: 'hidden',
        header: 'default',
        footer: 'hidden',
        compatibility: true,
      };
      this.$refs.DetailGrid.excelExport(excelData);
    },

    openSingleCalendar(currentMonth) {
      this.currentMonth = currentMonth;
      this.$modal.show('DateMonthPicker');
    },
    async openPopup(modalNm, type, data) {
      let url = '';
      if (modalNm === 'QuoteDetailModal' || modalNm === 'DetailAlarmModal' || modalNm == 'DetailCommentModal') {
        url = '/modal/Detail/Alert';
      } else if (modalNm === 'CompleteModal' || modalNm == 'CostCenterModal') {
        url = '/modal/sampleComplete';
      }
      if (url !== '') {
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
      }
      this.$modal.show(modalNm, type, data);
    },
    showModal(modal) {
      this.$modal.show(modal);
    },
    async leftCancel() {
      this.$refs.DetailGrid.sendCheckedData();
      if (this.checkedData == '') {
        this.ment = 'message.msgNoItem';
        this.showModal('QuoteDetailModal');
        return;
      } else if (this.offrInfo.offrStatCd == 'REQ' || this.offrInfo.offrStatCd == 'CAN') {
        this.ment = 'message.msgConfirmBokngStatCd';
        this.showModal('QuoteDetailModal');
      } else {
        try {
          const offerInfo = {
            custId: this.openInfo.custId,
            offrId: this.openInfo.id,
            offrNum: this.offrInfo.offrNum,
          };
          let param = [];
          // const qtys = this.checkedData.filter(item => item.rmnBaseQty > 0);
          // if (this.checkedData.length == qtys.length) {
          //   qtys.forEach(data => {
          //     param.push({ ...value, ...{ id: data.id } });
          //   });
          // }
          this.checkedData.forEach(data => {
            param.push({ ...offerInfo, ...{ id: data.id } });
          });
          // if (this.checkedData.length == qtys.length) {
          await orderApi.putRmdCancel(param);
          this.ment = 'message.msgLeftSuss';
          await this.$refs.DetailGrid.loadDetail();
          this.showModal('QuoteDetailModal');
          this.checkedCount = 0;
          // } else {
          //   this.ment = 'message.msgLeftEmpty';
          //   this.showModal('QuoteDetailModal');
          // }
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
      // this.$refs.DetailGrid.loadDetail();
    },
    async completeModal(type) {
      if (type == 'reload') {
        await this.$refs.DetailGrid.loadDetail();
      } else if (type == 'suss') {
        await this.$refs.DetailGrid.loadDetail();
        this.ment = 'message.msgCompleteSuss';
        this.$modal.show('QuoteDetailModal');
      } else {
        this.$modal.show('QuoteDetailModal');
      }
    },
    setFilter() {
      this.filterOn = !this.filterOn;
      this.$refs.DetailGrid.setFilter(this.filterOn);
    },
  },
  created() {
    this.getGridMutiLanguage();
  },
  mounted() {
    this.setFilter();
    this.selectValue = this.selectOptions[0];
    this.changeUnit(this.selectValue);
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      userLocale: 'userInfo/getUserLocale',
    }),
  },
};
</script>

<style></style>
