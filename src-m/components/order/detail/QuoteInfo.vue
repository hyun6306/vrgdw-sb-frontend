<template>
  <div class="quote_detail_contents">
    <button class="btn_folding" @click="quoteOpen = !quoteOpen" :class="{ quote_open: quoteOpen }">
      <p class="quote_title">
        <strong v-if="page === 'order'">{{ $t('message.basicQuote') }}</strong>
        <strong v-else>{{ $t('message.sampleQuote') }}</strong>
        <span
          >{{ $t('message.poNo') }}: <i>{{ quoteInfo.custPoNum }} </i></span
        >
      </p>
      <button :class="quoteInfo.offrStatCd === offrStatCd.cancel ? 'btn_request btn_request_cancel' : 'btn_request'">{{ quoteInfo.offrStatusNm }}</button>
      <i class="in_img"><img src="@m/assets/img/icon_up.png" /></i>
    </button>
    <!-- 폴딩영역 기본정보 배송지 정보 -->
    <section class="quote_detail_section" :class="{ quote_open: quoteOpen }">
      <div class="quote_detail_box">
        <div class="qd_box_head">
          <div class="qd_box_head_line">
            <!--            <p class="">-->
            <!--              <span>{{ $t('message.quoteRequestQty') }}</span>-->
            <!--              <strong v-if="isBase"> {{ quoteInfo.reqBaseTotQty | priceFormat }}</strong>-->
            <!--              <strong v-else> {{ quoteInfo.reqOrdTotQty | priceFormat }}</strong>-->
            <!--            </p>-->
            <!-- 고객메모 YN에 따라 노출 처리 시, 적용할 조건 :disabled="quoteInfo.custReqRemarkYn === 'N'",  v-if="quoteInfo.custReqRemarkYn === 'Y'"  -->
            <button @click="getOffrMemo('CUSTOMER')">
              <span>{{ $t('message.trnReqRemark') }}</span>
              <img src="@m/assets/img/icon_customer.png" />
            </button>
            <button :disabled="userMenuGrp === 'CUSTOMER' && quoteInfo.salesMngRemarkYn === 'N'" @click="getOffrMemo('SALES')">
              <span>{{ $t('message.salesOpinion') }}</span>
              <img src="@m/assets/img/icon_customer.png" v-if="quoteInfo.salesMngRemarkYn === 'Y'" />
              <img src="@m/assets/img/icon_pencil.png" v-if="userMenuGrp !== 'CUSTOMER' && quoteInfo.salesMngRemarkYn === 'N'" />
            </button>
            <button @click="getAddrInfo">
              <span>{{ $t('message.addrNm') }}</span>
              <img src="@m/assets/img/icon_customer.png" />
            </button>
          </div>
          <div class="qd_box_head_line" v-if="authButton.savAuth === 'N' && page === 'order'">
            <p class="">
              <span>{{ $t('message.paymentMethod') }}</span>
              <strong>{{ quoteInfo.paymentCondNm }}</strong>
            </p>
            <p class="">
              <span>{{ $t('message.curreny') }}</span>
              <strong>{{ quoteInfo.crdtBlnce | priceFormat }}</strong>
            </p>
          </div>
        </div>
        <div class="table">
          <table>
            <colgroup>
              <col style="width: calc(25%)" />
              <col style="width: calc(25%)" />
              <col style="width: calc(25%)" />
              <col style="width: calc(25%)" />
            </colgroup>
            <tbody>
              <tr>
                <th colspan="2" class="t-l">
                  {{ $t('message.quoteRequestQty') }} <i class="ml-5" v-if="isBase"> {{ quoteInfo.reqBaseTotQty | priceFormat }}</i> <i class="ml-5" v-else> {{ quoteInfo.reqOrdTotQty | priceFormat }}</i>
                </th>
                <th colspan="2" class="t-r">
                  {{ $t('message.quoteReqDt') }} <i class="ml-5">{{ quoteInfo.offrDt | vnDateFormatD }}</i>
                </th>
              </tr>
              <tr v-if="authButton.savAuth === 'N' && page === 'order'">
                <td colspan="4" class="t-r">
                  <span class="intable_title mr-30">{{ $t('message.totalQuotePrice') }}</span>
                  <i>{{ quoteInfo.offrTotal | priceFormat }}</i>
                  <small class="ml-5"> {{ $t('message.includeVat') }}</small>
                </td>
              </tr>
              <!-- 영업담당자 로그인 노출 -->
              <tr v-if="((userMenuGrp === 'CUSTOMER' && quoteInfo.offrStatCd !== offrStatCd.request) || userMenuGrp !== 'CUSTOMER') && page === 'order'">
                <th colspan="2">{{ $t('message.salesAmount') }}</th>
                <th colspan="2">{{ $t('message.totalQuotePrice') }}</th>
              </tr>
              <tr v-if="((userMenuGrp === 'CUSTOMER' && quoteInfo.offrStatCd !== offrStatCd.request) || userMenuGrp !== 'CUSTOMER') && page === 'order'">
                <td colspan="2">
                  <small>{{ $t('message.separateVat') }}</small
                  ><span> {{ quoteInfo.offrTotPrice | priceFormat }}</span>
                </td>
                <td colspan="2">
                  <small>{{ $t('message.includeVat') }}</small
                  ><span> {{ quoteInfo.offrTotal | priceFormat }}</span>
                </td>
              </tr>

              <tr>
                <th>{{ $t('message.bookingQty') }}</th>
                <th>{{ $t('message.completeDeliverQty') }}</th>
                <th>{{ $t('message.onDeliverQty') }}</th>
                <th>{{ $t('message.sumCancel') }}</th>
              </tr>
              <tr v-if="isBase">
                <td class="t-r fblue">{{ quoteInfo.bokngBaseTotQty | priceFormat }}</td>
                <td class="t-r fg">{{ quoteInfo.trnEndBaseTotQty | priceFormat }}</td>
                <td class="t-r fg">{{ quoteInfo.trnIngBaseTotQty | priceFormat }}</td>
                <td class="t-r fr">{{ quoteInfo.trnPsbBaseTotQty | priceFormat }}</td>
              </tr>
              <tr v-if="!isBase">
                <td class="t-r fblue">{{ quoteInfo.bokngOrdTotQty | priceFormat }}</td>
                <td class="t-r fg">{{ quoteInfo.trnEndOrdTotQty | priceFormat }}</td>
                <td class="t-r fg">{{ quoteInfo.trnIngOrdTotQty | priceFormat }}</td>
                <td class="t-r fr">{{ quoteInfo.trnPsbOrdTotQty | priceFormat }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <DeliveryAddressModal />
    <SalesOpinionModal />
    <AlarmYesModal />
  </div>
</template>

<script>
import detailApi from '@/api/order/detail';
import commonApi from '@/api/common';
import orderApi from '@/api/order/order';
import { mapGetters } from 'vuex';
import DeliveryAddressModal from '@m/modal/order/DeliveryAddressModal';
import SalesOpinionModal from '@m/modal/order/SalesOpinionModal';
import AlarmYesModal from '@m/modal/AlarmYesModal';
import defs from '@/consts/defs';

export default {
  props: ['isBase'],
  components: {
    DeliveryAddressModal,
    SalesOpinionModal,
    AlarmYesModal,
  },
  data() {
    return {
      quoteOpen: false,
      quoteInfo: {},
      id: 0,
      custId: 0,
      offrStatCd: defs.offrStatCd,
    };
  },
  computed: {
    ...mapGetters({
      authButton: 'userInfo/getAuthButton',
      userMenuGrp: 'userInfo/getUserMenuGrpCd',
    }),
  },
  methods: {
    async getOffrMng() {
      try {
        const param = {
          id: this.id,
          custId: this.custId,
        };
        const resp = await detailApi.getOffrMng(param);
        this.quoteInfo = resp.data.rs;
        this.$emit('senndOffrNum', { offrNum: this.quoteInfo.offrNum, offrPubDt: this.quoteInfo.offrPubDt, offrStatCd: this.quoteInfo.offrStatCd });
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getAddrInfo() {
      try {
        const param = {
          offrId: this.id,
        };
        const resp = await commonApi.getAddrInfo(param);
        this.$modal.show('DeliveryAddressModal', { deliveryInfo: resp.data.rs });
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getOffrMemo(memoType) {
      try {
        const param = {
          id: this.id,
          memoType,
          custId: this.custId,
        };

        const resp = await orderApi.getOffrMemo(param);
        if (memoType === 'SALES') {
          this.$modal.show('SalesOpinionModal', { id: this.id, memo: resp.data.rs });
        } else if (memoType === 'CUSTOMER') {
          this.$modal.show('AlarmYesModal', { message: resp.data.rs.remark, title: 'message.trnReqRemark' });
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
  },
  created() {
    if (this.$route.query) {
      this.id = this.$route.query.id;
      this.custId = this.$route.query.custId;
    }
    this.page = this.$route.path.includes('sample') ? 'sample' : 'order';
  },
  mounted() {
    this.getOffrMng();
  },
};
</script>

<style></style>
