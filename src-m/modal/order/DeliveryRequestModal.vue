<template>
  <modal :adaptive="true" height="100%" name="DeliveryRequestModal" width="100%" @opened="opened" @before-open="open">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">{{ $t('message.btnRequestDeliver') }}</h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="$modal.hide('DeliveryRequestModal')"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <DeliveryInfo ref="DeliveryInfo" :custId="custId" @cityCdAndDistrCd="cityCdAndDistrCd" @onCredit="handelCredit" @onTimeOptions="handleTimeOptions" />
        <!-- 리스트영역 -->
        <div class="dr_list_contents">
          <!-- 배송예정일 -->
          <div class="delivery_select">
            <label class="chechbox_basic">
              <input type="checkbox" />
              <span class="checkmark"></span>
              <strong>{{ deliveryList.length }}</strong
              >{{ $t('message.totalSelection2') }}
            </label>
            <span class="ds_title ml-a">{{ $t('message.minDate') }}</span>
            <strong>{{ deliveryDate | vnDateFormatD }}</strong>
          </div>
          <div class="delivery_select">
            <!--<span class="ds_title">{{ $t('message.hopeDt') }}</span>-->
            <div class="form_calendar">
              <input :placeholder="date.show" readonly type="text" />
              <button class="icon_calendar" @click="openDatePicker"><img src="@m/assets/img/icon_calendar.png" /></button>
            </div>
            <MultiSelect id="" v-model="trnHopeTi" :close-on-select="true" :options="timeOptions" :searchable="false" :show-labels="false" class="ml-5" label="text" placeholder="" style="width: 30%" track-by="text"></MultiSelect>
          </div>
          <!-- //배송예정일 -->
          <!-- 리스트 -->
          <section class="quote_list_section">
            <div v-for="(list, index) in deliveryList" :key="index" class="quote_list_box">
              <div class="check_product">
                <!-- <label class="chechbox_basic">
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label> -->
                <span class="product_txt"
                  ><i>{{ list.bokngNum }}</i></span
                >
                <!-- <span class="product_txt">PO No : <i>QT0000005</i></span> -->
                <!-- <p class="product_txt ml-a"><small>BK No.</small>BK00000001</p> -->
                <!-- 삭제버튼추가  -->
                <button class="btn_delete_delivery in_img" style="margin-left: auto" @click="deleteDeliver(list)"><img src="@m/assets/img/icon_close.png" /></button>
              </div>
              <p class="product_info">
                <span class="product_txt">{{ list.prdtNm }}</span>
                <span class="product_num">{{ list.prdtCd }}</span>
              </p>
              <div class="table">
                <table>
                  <tr>
                    <th colspan="2">{{ $t('message.deliveryOrdQty') }}</th>
                    <th colspan="2">{{ $t('message.standardPossibleDeliverQty') }}</th>
                  </tr>
                  <tr>
                    <td>{{ list.trnPsbOrdQty }}</td>
                    <td>{{ list.ordUnitNm }}</td>
                    <td>{{ list.trnPsbBaseQty }}</td>
                    <td>{{ list.baseUnitNm }}</td>
                  </tr>
                  <tr>
                    <th colspan="2">{{ $t('message.releaseDeliverQty') }}</th>
                    <th>{{ $t('message.price') }}</th>
                    <th>{{ $t('message.releaseDeliverQty') }}</th>
                  </tr>
                  <tr>
                    <td><input v-model="list.outBaseQty" :style="{ color: list.isOver }" class="t-r" oninput="this.value = this.value.replace(/[^0-9]/g, '');" type="text" @blur="checkQty(list)" /></td>
                    <td>{{ list.baseUnitNm }}</td>
                    <td class="t-r">{{ list.bokngPrdtQtyAmt | priceFormat }}</td>
                    <td class="t-r">{{ list.bokngOffrPrice | priceFormat }}</td>
                  </tr>
                  <tr>
                    <th colspan="2">{{ $t('message.totalAmount') }}{{ $t('message.includeVat') }}(VND)</th>
                    <td class="t-r" colspan="2">{{ list.bokngOffrTotal | priceFormat }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </section>
        </div>
        <!-- 하단 버튼 -->
        <div class="bottom_select_result_contents02">
          <button :class="{ priceSell_open: priceSellOpen }" class="btn_over" @click="priceSellOpen = !priceSellOpen">
            <img src="@m/assets/img/btn_over_up.png" />
          </button>
          <div :class="{ priceSell_open: priceSellOpen }" class="price_sell_section">
            <div class="price_sell_box">
              <p class="guide_txt a-r">
                <span>{{ $t('message.requestAmount') }}</span>
                <small>(VND)</small>
                <span class="ml-a">{{ $t('message.creditBalance') }}</span>
                <input :placeholder="[credit.block == '' ? credit.credit.toLocaleString() : 'block']" class="ml-5 t-r" readonly style="width: 100px" type="text" />
              </p>
              <ul class="price_result">
                <li class="price_txt">
                  <small>{{ $t('message.separateVat') }}</small>
                  <strong>{{ totalDeliveryAmt | priceFormat }}</strong>
                </li>
                <li>
                  <button class="btn_quote_request" @click="validation">
                    {{ $t('message.btnRequestDeliver') }}
                    <span
                      >{{ $t('message.item') }}<i>{{ deliveryList.length }}</i></span
                    >
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <!-- <div class="btn_box">
            <button class="btn_tempsave" @click="validation">배송요청</button>
          </div> -->
        </div>
      </div>
      <!-- //컨텐츠 바디 -->
      <div v-show="false"><input v-model="update" placeholder="" readonly type="text" /></div>
      <DatePicker :after="true" :before="true" :isDefault="false" @onSelectDate="handleSelectDate" />
    </div>
  </modal>
</template>

<script>
import defs from '@/consts/defs';
import DeliveryInfo from '@m/components/order/booking/DeliveryInfo';
import bookingApi from '@/api/order/booking';
import DatePicker from '@m/modal/DatePickerModal';
import days from 'dayjs';
import orderApi from '@/api/order/order';

export default {
  components: { DeliveryInfo, DatePicker },
  data() {
    return {
      priceSellOpen: false,
      deliveryList: [],
      custId: 0,
      prdtClsCd: defs.prdtClsCd,
      deliveryDate: '',
      credit: {},
      date: {},
      sendPrdtClsCd: '',
      update: '',
      totalDeliveryAmt: 0,
      timeOptions: [],
      trnHopeTi: {},
    };
  },
  watch: {
    deliveryList() {
      this.totalDeliveryAmt = 0;
      this.deliveryList.forEach(list => {
        list.outOrdQty = list.trnPsbOrdQty;
        list.outBaseQty = list.trnPsbBaseQty;
        this.totalDeliveryAmt += list.bokngOffrPrice;
      });
    },
  },
  methods: {
    deleteDeliver(index) {
      this.deliveryList.forEach(list => {
        if (list === index) {
          const delIndex = this.deliveryList.indexOf(index);
          this.deliveryList.splice(delIndex, 1);
        }
      });
    },
    open(event) {
      this.deliveryList = event.params.list;
      this.deliveryList.forEach(list => {
        list.outOrdQty = list.trnPsbOrdQty;
        list.outBaseQty = list.trnPsbBaseQty;
        this.totalDeliveryAmt += list.bokngOffrPrice;
      });
      this.custId = this.deliveryList[0].custId;
      this.date.show = this.$vnDateFormatD(this.deliveryList[0].trnHopeDt);
      this.date.date = this.deliveryList[0].trnHopeDt;
    },
    opened() {
      this.$refs.DeliveryInfo.getUserOfferInfo();
      this.$refs.DeliveryInfo.getCredit();
    },
    cityCdAndDistrCd(data) {
      const isMdf = this.deliveryList.some(list => list.prdtClsCd === this.prdtClsCd.MDF);
      const isMfb = this.deliveryList.some(list => list.prdtClsCd === this.prdtClsCd.MFB);
      if (isMdf && isMfb) {
        this.sendPrdtClsCd = defs.prdtClsCd.MDF + ', ' + defs.prdtClsCd.MFB;
        this.putBookingInquiry(data);
      } else if (isMdf && !isMfb) {
        this.sendPrdtClsCd = defs.prdtClsCd.MDF;
        this.putBookingInquiry(data);
      } else if (!isMdf && isMfb) {
        this.sendPrdtClsCd = defs.prdtClsCd.MFB;
        this.putBookingInquiry(data);
      }
    },
    async putBookingInquiry(data) {
      try {
        const param = {
          prdtClsCd: this.sendPrdtClsCd,
          cityCd: data.cityCd.value,
          distrCd: data.distrCd.value,
        };
        const response = await bookingApi.putBookingInquiry(param);
        this.deliveryDate = response.data.rs.date;
        // this.date = {};
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    handelCredit(data) {
      this.credit = data.credit;
    },
    openDatePicker() {
      this.$modal.show('DatePicker', { afterDay: 90, currentDate: this.date });
    },
    handleSelectDate(date) {
      this.date = date;
    },
    checkQty(list) {
      if (list.trnPsbBaseQty < list.outBaseQty * 1) {
        list.isOver = 'red';
      } else {
        list.isOver = '';
      }
      this.totalDeliveryAmt -= list.bokngOffrPrice;
      list.bokngOffrPrice = list.bokngPrdtQtyAmt * list.outBaseQty;
      this.totalDeliveryAmt += list.bokngOffrPrice;
      let vatRate = Math.round(list.bokngOffrPrice * list.vatRate);
      list.bokngOffrTotal = list.bokngOffrPrice + vatRate;
      this.update = Math.random();
    },
    validation() {
      let isNotCheckCredit = false;
      let isDepositRows = this.deliveryList.filter(row => row.bokngClsCd === defs.bokngClsCd.deposit);
      if (isDepositRows.length === this.deliveryList.length) {
        isNotCheckCredit = true;
      }
      if (this.credit.block !== '' && !isNotCheckCredit) {
        this.$EventBus.$emit('openYesModal', 'message.msgCreditBlock');
      } else if (this.credit.credit < this.totalDeliveryAmt && !isNotCheckCredit) {
        this.$EventBus.$emit('openYesModal', 'message.msgLackBalance');
      } else {
        for (let i = 0; i < this.deliveryList.length; i++) {
          if (this.deliveryList[i].outBaseQty * 1 === 0 || this.deliveryList[i].trnPsbBaseQty < this.deliveryList[i].outBaseQty * 1) {
            this.$EventBus.$emit('openYesModal', 'message.msgRequestExceeded');
            return;
          }
          let qtyAll = this.deliveryList[i].trnEndBaseQty + this.deliveryList[i].trnIngBaseQty + this.deliveryList[i].trnReqBaseQty;
          if (this.deliveryList[i].bokngBaseQty <= qtyAll) {
            this.$EventBus.$emit('openYesModal', 'message.msgValidAllQty');
            return;
          }
        }
        this.setData();
      }
    },
    setData() {
      let infoLogits = this.$refs.DeliveryInfo.getLogits();
      if (!infoLogits) return;
      let deliveryRequstList = [];
      this.deliveryList.forEach(list => {
        deliveryRequstList.push({
          trnClsCd: list.bokngClsCd === defs.bokngClsCd.deposit ? defs.trnClsCd.deposit : list.offrClsCd === defs.offrClsCd.sample ? defs.trnClsCd.sample : defs.trnClsCd.general,
          custId: list.custId,
          prdtCd: list.prdtCd,
          offrId: list.offrId,
          offrNum: list.offrNum,
          offrDtlsId: list.offrDtlsId,
          bokngId: list.id,
          bokngSoNum: list.bokngSoNum,
          bokngSoItemNum: list.bokngSoItemNum.toString().padStart(6, '0'),
          apprId: list.apprId,
          plntCd: list.plntCd,
          savPosCd: list.savPosCd,
          trnReqBaseQty: list.outBaseQty, //출고 기본 수량
          // trnReqOrdQty: list.trnReqOrdQty,
        });
      });
      let logits = {
        reqDt: days().format('YYYY-MM-DD'),
        postNum: infoLogits.postNum,
        addr: infoLogits.addr,
        logitsPhoneNum1: infoLogits.phoneNum1,
        logitsPhoneNum2: infoLogits.phoneNum2,
        logitsMngNm: infoLogits.trnMngNm,
        cityCd: infoLogits.cityCd.value,
        distrCd: infoLogits.distrCd.value,
        trnReqRemark: infoLogits.logitsRemark,
        trnCarType: infoLogits.trnCarType.value,
        trnCarNum: infoLogits.trnCarNum,
        driverPhoneNum: infoLogits.driverPhoneNum,
        logitsAlias: infoLogits.logitsAlias,
        mainLogitsYn: infoLogits.mainLogitsYn,

        trnHopeDt: this.date.date ? this.date.date : '',
        trnHopeTi: this.trnHopeTi.value,
      };
      let param = {
        ...logits,
        deliveryRequstList,
      };
      this.reqDelivery(param, logits);
    },
    async reqDelivery(param, logits) {
      try {
        const resp = await bookingApi.saveBookingDelivery(param);
        if (resp.data.status === 200) {
          this.$modal.hide('DeliveryRequestModal');
          this.$emit('successRequest');
        }
        if (this.userMenuGrpCd === 'CUSTOMER' && logits.mainLogitsYn) {
          logits.phoneNum1 = logits.logitsPhoneNum1;
          logits.phoneNum2 = logits.logitsPhoneNum2;
          logits.trnMngNm = logits.logitsMngNm;
          logits.logitsRemark = logits.trnReqRemark;
          await orderApi.saveUserLogitsBaseAddr(logits);
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
    handleTimeOptions(data) {
      this.timeOptions = data;
      this.trnHopeTi = this.timeOptions[0];
    },
  },
};
</script>

<style></style>
