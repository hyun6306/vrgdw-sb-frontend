<template>
  <div class="search_content">
    <!-- <QuoteDetailModal :ment="ment" /> -->
    <div class="search_box" ref="search_box_height" :class="{ search_close_00: searchOpen }" :style="`height:${search_box_height}`">
      <div class="search_box_filter">
        <div class="table_section">
          <div class="table_box" style="width: 100%">
            <table>
              <colgroup>
                <col style="width: 25%" />
                <col style="width: 35%" />
                <col style="width: 25%" />
                <col style="width: 35%" />
              </colgroup>
              <tbody>
                <tr>
                  <td class="tb_head" colspan="4">
                    <span class="head_situat situat_default">{{ offrInfo.offrStatusNm }}</span>
                  </td>
                </tr>
                <tr>
                  <th class="t-l">{{ $t('message.requestDate') }}</th>
                  <td class="t-r">{{ offrInfo.offrDt | vnDateFormatD }}</td>
                  <th class="t-l">{{ $t('message.quoteRequestQty') }}</th>
                  <td class="t-r" v-if="layoutData">
                    {{ offrInfo.reqBaseTotQty | numberFormat(0) }}
                  </td>
                  <td class="t-r" v-else>{{ offrInfo.reqOrdTotQty | numberFormat(2) }}</td>
                </tr>
                <tr>
                  <th class="t-l">{{ $t('message.offrNum') }}</th>
                  <td class="t-r">
                    <!-- @click="loadOrderPage"-->
                    {{ offrInfo.offrNum }}
                  </td>
                  <th class="t-l">{{ $t('message.totalQuotePrice') }}</th>
                  <td class="t-r">{{ offrInfo.offrTotal | numberFormat(0) }}</td>
                </tr>
                <tr>
                  <th class="t-l">{{ $t('message.poNum') }}</th>
                  <td class="t-r">{{ offrInfo.custPoNum }}</td>
                  <th class="t-l">{{ $t('message.paymentMethod') }}</th>
                  <td class="t-r">{{ offrInfo.paymentCondNm }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- <div class="table_box" style="width: 40%; min-width: 470px" v-if="this.authButton.fn5Auth !== 'Y'">
            <table>
              <colgroup>
                <col style="width: 185px" />
                <col style="width: 60%" />
              </colgroup>
              <tbody>
                <tr>
                  <td class="tb_head" colspan="2">
                    <span class="head_situat situat_default">{{ offrInfo.offrStatusNm }}</span>
                  </td>
                </tr>
                <tr>
                  <th class="t-l">
                    {{ $t('message.requestDate') }}
                  </th>
                  <td class="t-r">{{ offrInfo.offrDt | vnDateFormatD }}</td>
                </tr>
                <tr>
                  <th class="t-l">
                    {{ $t('message.offrNum') }}
                  </th>
                  <td class="t-r" @click="loadOrderPage">
                    {{ offrInfo.offrNum }}
                  </td>
                </tr>
                <tr>
                  <th class="t-l">{{ $t('message.poNum') }}</th>
                  <td class="t-r">{{ offrInfo.custPoNum }}</td>
                </tr>
              </tbody>
            </table>
          </div> -->
          <!-- <div class="table_box" style="width: 20%" v-if="this.authButton.fn5Auth !== 'Y'">
            <table>
              <colgroup>
                <col style="width: 55%" />
                <col style="width: 45%" />
              </colgroup>
              <tbody>
                <tr>
                  <th class="t-l">{{ $t('message.quoteRequestQty') }}</th>
                  <td class="t-r" v-if="layoutData">
                    {{ offrInfo.reqBaseTotQty | numberFormat(0) }}
                  </td>
                  <td class="t-r" v-else>{{ offrInfo.reqOrdTotQty | numberFormat(2) }}</td>
                </tr>
                <tr>
                  <th class="t-l">{{ $t('message.reqTotal') }}</th>
                  <td class="t-r">{{ offrInfo.reqTotal | numberFormat(0) }}</td>
                </tr>
                <tr>
                  <th class="t-l">{{ $t('message.totalQuotePrice') }}</th>
                  <td class="t-r">{{ offrInfo.offrTotal | numberFormat(0) }}</td>
                </tr>
                <tr>
                  <th class="t-l">{{ $t('message.paymentMethod') }}</th>
                  <td class="t-r">{{ offrInfo.paymentCond }}</td>
                </tr>
              </tbody>
            </table>
          </div> -->
          <div class="table_box" style="width: 800px">
            <table>
              <colgroup>
                <col style="width: 25%" />
                <col style="width: 25%" />
                <col style="width: 25%" />
                <col style="width: 25%" />
              </colgroup>
              <tbody>
                <tr>
                  <td class="tb_head" colspan="4">
                    <div class="head_progress">
                      <i class="bar" :style="`width: ${offrInfo.progRate}`"></i>
                      <span class="progress_txt">{{ offrInfo.progRate }}%</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th class="t-l">{{ $t('message.bookingQty') }}</th>
                  <td class="t-r" v-if="layoutData">
                    {{ offrInfo.bokngBaseTotQty | numberFormat(0) }}
                  </td>
                  <td class="t-r" v-else>
                    {{ offrInfo.bokngOrdTotQty | numberFormat(2) }}
                  </td>
                  <th class="t-l">{{ $t('message.completeDeliverQty') }}</th>
                  <td class="t-r" v-if="layoutData">
                    {{ offrInfo.trnEndBaseTotQty | numberFormat(0) }}
                  </td>
                  <td class="t-r" v-else>
                    {{ offrInfo.trnEndOrdTotQty | numberFormat(2) }}
                  </td>
                </tr>
                <tr>
                  <th class="t-l">{{ $t('message.onDeliverQty') }}</th>
                  <td class="t-r" v-if="layoutData">
                    {{ offrInfo.trnIngBaseTotQty | numberFormat(0) }}
                  </td>
                  <td class="t-r" v-else>{{ offrInfo.trnIngOrdTotQty | numberFormat(2) }}</td>
                  <th class="t-l">{{ $t('message.trnReqOrdQty') }}</th>
                  <td class="t-r" v-if="layoutData">
                    {{ offrInfo.trnReqBaseQty | numberFormat(0) }}
                  </td>
                  <td class="t-r" v-else>{{ offrInfo.trnReqOrdQty | numberFormat(2) }}</td>
                </tr>
                <tr>
                  <th class="t-l">{{ $t('message.trnPsbBaseQty') }}</th>
                  <td class="t-r" v-if="layoutData">
                    {{ offrInfo.trnPsbBaseTotQty | numberFormat(0) }}
                  </td>
                  <td class="t-r" v-else>{{ offrInfo.trnPsbOrdTotQty | numberFormat(2) }}</td>
                  <th class="t-l">{{ $t('message.sumCancel') }}</th>
                  <td class="t-r" v-if="layoutData">{{ canQtyTotal[0] | numberFormat(0) }}</td>
                  <td class="t-r" v-else>{{ canQtyTotal[1] | numberFormat(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="table_section">
          <div class="table_box" style="width: 100%">
            <table>
              <colgroup>
                <col style="width: 20%" />
                <col style="width: 40%" />
                <col style="width: 20%" />
                <col style="width: 40%" />
              </colgroup>
              <tbody>
                <tr>
                  <th class="t-l">{{ $t('message.addr') }}</th>
                  <td class="t-l" colspan="3">({{ offrInfo.logitsAlias }}) {{ offrInfo.addr }}, {{ offrInfo.distrNm }}, {{ offrInfo.cityNm }}, {{ offrInfo.postNum }}</td>
                </tr>
                <tr>
                  <th class="t-l">{{ $t('message.custName') }}</th>
                  <td class="t-l">{{ offrInfo.custNm }}</td>
                  <th class="t-l">{{ $t('message.deliveryType') }}</th>
                  <td class="t-l" v-if="offrInfo.trnCarType === carTypeCd.VRGDW">{{ offrInfo.trnCarTypeNm }}</td>
                  <td class="t-l" v-else>{{ offrInfo.trnCarTypeNm }} / {{ offrInfo.trnCarNum }} / {{ offrInfo.driverPhoneNum }}</td>
                </tr>
                <tr>
                  <th class="t-l">{{ $t('message.callNum1') }}</th>
                  <td class="t-l">{{ offrInfo.phoneNum1 }}</td>
                  <th class="t-l">{{ $t('message.callNum2') }}</th>
                  <td class="t-l">{{ offrInfo.phoneNum2 }}</td>
                </tr>
                <tr>
                  <th class="t-l">{{ $t('message.custOpinion') }}</th>
                  <td class="t-l" colspan="3">
                    {{ custComment }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table_box" style="width: 800px" v-if="this.authButton.fn4Auth == 'Y'">
            <table>
              <colgroup>
                <col style="width: 40%" />
                <col style="width: 60%" />
              </colgroup>
              <tbody>
                <tr>
                  <th class="t-l">{{ $t('message.salesMngNm') }}</th>
                  <td class="t-l">
                    <div class="w_100 align_row">
                      <span>{{ offrInfo.salesMngNm }}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th class="t-l">{{ $t('message.phoneNum') }}</th>
                  <td class="t-l">{{ offrInfo.salesMngPhoneNum }}</td>
                </tr>
                <tr>
                  <th class="t-l">{{ $t('message.salesMemo') }}</th>
                  <td class="t-l" rowspan="2">
                    <div>
                      <span>
                        {{ salesComment }}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th class="t-l"></th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="search_box_filter btn_box">
        <!-- <div class="search_box_filter btn_box" v-if="this.userMenuGrpCd == 'CUSTOMER'"> -->
        <button class="btn_default btn_print_fuction" @click="getDownloadBank" v-if="this.authButton.fn1Auth == 'Y'">
          {{ $t('message.btnBankAccount') }}
        </button>
        <button class="btn_default btn_print_fuction" :disabled="this.offrInfo.offrStatCd == ('CAN' || 'REQ')" @click="print('quote')" v-if="this.authButton.fn1Auth == 'Y'">
          {{ $t('message.btnPrintQuotation') }}
        </button>
        <button class="btn_default btn_print_fuction" :disabled="this.offrInfo.offrStatCd == ('CAN' || 'REQ')" @click="print('contract')" v-if="this.authButton.fn1Auth == 'Y'">
          {{ $t('message.btnPrintContract') }}
        </button>
        <button class="btn_default btn_function" @click="$parent.offrChagSave()" v-if="this.authButton.savAuth == 'Y'">
          {{ $t('message.btnSave') }}
        </button>
        <button class="btn_default btn_function" @click="$parent.offrMng('copy')" v-if="this.authButton.savAuth == 'Y'">
          {{ $t('message.btnRegistCopy') }}
        </button>
        <button class="btn_default btn_function" @click="$parent.offrMng('cancel')" v-if="this.authButton.delAuth == 'Y'">
          {{ $t('message.btnCancelQuotation') }}
        </button>
      </div>
    </div>
    <button class="btn_search_content" @click="searchOpen = !searchOpen">
      <i :class="{ close: searchOpen }"></i>
    </button>
    <ReportLangSelectModal @printReport="printReport" />
  </div>
</template>

<script>
import orderApi from '@/api/order/order';
import productApi from '@/api/order/product';
// import QuoteDetailModal from '@/modal/detail/QuoteDetailModal.vue';
import { loadLanguageAsync } from '@/plugins/i18n';
import reportPrintJs from '@/mixins/reportPrint';
import ReportLangSelectModal from '@/modal/ReportLangSelect';
import defs from '@/consts/defs';
import fileApi from '@/api/file';
import fileDownload from '@/mixins/fileDownload';

export default {
  props: ['offrInfo', 'userInfo', 'page', 'openInfo', 'menuId', 'canQtyTotal', 'layoutData', 'authButton'],
  components: {
    // QuoteDetailModal,
    ReportLangSelectModal,
  },
  data() {
    return {
      search_box_height: '',
      searchOpen: false,
      custComment: '',
      salesComment: '',
      carTypeCd: defs.carTypeCd,
    };
  },
  mixins: [reportPrintJs],
  filters: {
    numberFormat: (value, numFix) => {
      value = parseFloat(value);
      if (!value) return '0';
      return value.toFixed(numFix).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  watch: {
    searchOpen() {
      this.$emit('searchOpen', this.searchOpen);
    },
    offrInfo() {
      // if (data.salesMngRemarkYn) {
      this.offrMemo();
      // }
    },
  },
  methods: {
    async print(type) {
      if (this.offrInfo.offrStatCd == 'REQ') {
        this.$EventBus.$emit('openYesModal', 'message.msgRequireConfirm');
        return;
      }
      if (type == 'quote') {
        await loadLanguageAsync('/modal/reportLangSelect', this.menuId);
        this.$modal.show('ReportLangSelectModal', { signShow: false, type });
      } else if (type == 'contract') {
        await loadLanguageAsync('/modal/reportLangSelect', this.menuId);
        this.$modal.show('ReportLangSelectModal', { signShow: false, type });
      }
    },
    loadOrderPage() {
      if (this.authButton.fn3Auth == 'Y') {
        if (this.offrInfo.offrStatCd !== 'REQ') {
          // this.ment = 'message.errorsVaildRequest';
          // this.openPopup('QuoteDetailModal');
          this.$emit('infoMent', 'message.errorsVaildRequest');
          this.$parent.openPopup('QuoteDetailModal');

          return;
        }
      }
    },
    async offrMemo() {
      let param = '';
      let response = '';
      // if (this.offrInfo.salesMngRemarkYn == 'Y') {
      param = {
        id: this.openInfo.id,
        custId: this.openInfo.custId,
        memoType: 'SALES',
      };
      response = await orderApi.getOffrMemo(param);
      this.salesComment = response.data.rs.remark;
      // }
      // if (this.offrInfo.custReqRemarkYn == 'Y') {
      param = {
        id: this.openInfo.id,
        custId: this.openInfo.custId,
        memoType: 'CUSTOMER',
      };
      response = await orderApi.getOffrMemo(param);
      this.custComment = response.data.rs.remark;
      // }
    },
    getInfoHeight() {
      let val = this.$refs.search_box_height.scrollHeight + 7;
      // search_box_height 의 높이값 받아온다
      this.search_box_height = `${val}px`;
    },
    async openPopup(modalNm) {
      let url = '/modal/Detail/Alert';

      if (url !== '') {
        try {
          await loadLanguageAsync(url, this.menuId);
        } catch (e) {
          console.log('error', e);
        }
      }
      this.$modal.show(modalNm);
    },
    async printReport(data) {
      if (data.result) {
        try {
          const paramData = {
            id: this.offrInfo.id,
            langList: data.langList,
            // signYn: data.signYn,
          };
          let response = '';
          if (data.type === 'quote') {
            response = await productApi.getPrintQuotation(paramData);
          } else if (data.type === 'contract') {
            paramData['signYn'] = data.signYn;
            response = await productApi.getPrintContratct(paramData);
          }
          this.reportPrint(response.data.ds, data.type);
        } catch (e) {
          console.log(e);
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        }
      }
    },
    async getDownloadBank() {
      try {
        const fileNm = 'VRGDW_Bank Account List_EN_20221216.pdf';
        const savePath = '/upload/202212/lnGzZQRRR.pdf';
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
  },
  created() {},
  mounted() {
    this.getInfoHeight();
  },
};
</script>

<style></style>
