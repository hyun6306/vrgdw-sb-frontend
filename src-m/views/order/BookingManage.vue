<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">{{ $t('message.managementBooking') }}</h1>
      </div>
      <div class="header_left">
        <button class="btn_header in_img" @click="$router.go(-1)"><img src="@m/assets/img/icon_back.png" /></button>
      </div>
      <div class="header_right">
        <button v-if="authButton.schAuth == 'Y'" class="btn_header in_img" @click="$modal.show('BookingSearchModal')"><img src="@m/assets/img/icon_search.png" /></button>
      </div>
    </div>
    <!-- //상단 헤더 -->

    <!-- 컨텐츠 바디 -->
    <div class="container" @scroll="handleScroll">
      <div class="booking_list_contents">
        <!-- 전체선택 -->
        <div class="bl_head">
          <label class="chechbox_basic">
            <input ref="allCheck" v-model="allChecked" type="checkbox" @change="allCheckedChange" />
            <span class="checkmark"></span>
            <strong>{{ pageInfo.totalCount }}</strong> {{ $t('message.totalSelection2') }}
          </label>
          <div class="btns_unit">
            <button :class="[isBase ? 'on' : '']" @click="(isBase = true), (update = Math.random())">
              {{ $t('message.sheetQty') }}
            </button>
            <button :class="[!isBase ? 'on' : '']" @click="(isBase = false), (update = Math.random())">
              {{ $t('message.bundleQty') }}
            </button>
          </div>
        </div>
        <!-- //전체선택 -->
        <!-- 
          완료 booking_box quote_complete / ml-a btn_booking btn_complete
          취소 ml-a btn_booking btn_quote_cancle
        -->
        <!-- 확정 -->
        <swiper v-for="(list, index) in bookingList" :key="index" ref="swiper" :options="swiperOption" class="booking_section swiper">
          <swiper-slide v-if="authButton.fn3Auth === 'Y'" class="quick_btns02">
            <a :href="`tel:${(list.custMobileNumCt != undefined ? list.custMobileNumCt : list.custPhoneNumCt != undefined ? list.custPhoneNumCt : '') + (list.custMobileNum ? list.custMobileNum : list.custPhoneNum)}`" class="btn_quick btn_call in_img" @click="slideNext(index)"><img src="@m/assets/img/icon_call_w.png" /></a>
            <!--            <button class="btn_quick btn_payment in_img" @click="[validation('appr', list), slideNext(index)]"><img src="@m/assets/img/icon_payment.png" /></button>-->
          </swiper-slide>
          <swiper-slide :class="[list.bokngStatCd === bokngStatCd.end ? 'booking_box quote_complete' : 'booking_box']">
            <div class="bb_head">
              <label class="chechbox_solo">
                <input ref="prdtCheck" v-model="list.checked" type="checkbox" @change="checkedChange" />
                <span class="checkmark"></span>
              </label>
              <button :id="`bokngItem${index}`" ref="bokngItem" :name="`bokngItem${index}`" class="btn_po" @click="openBookingInfo(list, index)">
                <!-- <span>{{ $t('message.bkNo') }}</span> -->
                <i> {{ list.bokngNum }}</i>
                <i> / {{ $t('message.item') }} : {{ list.itemNum | itemNumFormat }}</i>
              </button>
              <a v-if="list.apprStatCd === apprStatCd.end || !list.apprStatCd" :class="[list.bokngStatCd === bokngStatCd.end ? 'ml-a btn_booking btn_complete' : list.bokngStatCd === bokngStatCd.cancel ? 'ml-a btn_booking btn_quote_cancle' : 'ml-a btn_booking btn_complete']" href="">{{ list.bokngStatNm }}</a>
              <a v-else :class="[list.bokngStatCd === bokngStatCd.end ? 'ml-a btn_booking btn_complete' : list.bokngStatCd === bokngStatCd.cancel ? 'ml-a btn_booking btn_quote_cancle' : 'ml-a btn_booking btn_complete']" href="">{{ list.apprStatNm }}</a>
            </div>
            <div class="booking_info">
              <span class="quote_item_num">{{ list.prdtCd }}</span>
              <span>{{ list.prdtNm }} </span>
            </div>
            <div class="table_s02">
              <table>
                <colgroup>
                  <col style="width: calc(30%)" />
                  <col style="width: calc(19%)" />
                  <col style="width: calc(30%)" />
                  <col style="width: calc(20%)" />
                </colgroup>
                <tbody>
                  <tr>
                    <th class="t-l">{{ $t('message.bkDt') }}</th>
                    <td class="t-l" colspan="3">{{ list.bokngDt | vnDateFormatD }}</td>
                    <!-- <th class="t-l">{{ $t('message.lstTrnReqDt') }}</th>
                    <td class="t-r">{{ list.lstTrnReqDt | vnDateFormatD }}</td> -->
                  </tr>
                  <tr v-if="authButton.fn5Auth === 'N'">
                    <th class="t-l">{{ $t('message.quotePriceLay') }}</th>
                    <td class="t-r">{{ list.prdtQtyAmt | priceFormat }}</td>
                    <th class="t-l">{{ $t('message.bokngTotalQty') }}</th>
                    <td v-show="isBase" class="t-r" @click="deliveryRequest(list)">
                      {{ list.bokngBaseQty | priceFormat }}
                    </td>
                    <td v-show="!isBase" class="t-r" @click="deliveryRequest(list)">
                      {{ list.bokngOrdQty | priceFormat }}
                    </td>
                  </tr>
                  <tr>
                    <th class="t-l">{{ $t('message.bkUnitPrice') }}</th>
                    <td v-if="authButton.fn5Auth === 'N' || list.offrClsCd === offrClsCd.sample" class="t-r">
                      {{ list.bokngPrdtQtyAmt | priceFormat }}
                    </td>
                    <!--                    <td v-else><input v-model="list.bokngQtyAmt" :disabled="list.bokngStatCd !== bokngStatCd.payNeed && list.bokngStatCd !== bokngStatCd.confirmNeed && list.apprStatCd !== apprStatCd.need" class="d_input" oninput="this.value = this.value.replace(/^0+|\D+/g, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');" type="text" /></td>-->
                    <td v-else class="t-r">{{ list.bokngQtyAmt | priceFormat }}</td>
                    <th v-if="authButton.fn5Auth === 'Y'" class="t-l">{{ $t('message.bokngTotalQty') }}</th>
                    <td v-if="authButton.fn5Auth === 'Y'" v-show="isBase" class="t-r">
                      {{ list.bokngBaseQty | priceFormat }}
                    </td>
                    <td v-if="authButton.fn5Auth === 'Y'" v-show="!isBase" class="t-r">
                      {{ list.bokngOrdQty | priceFormat }}
                    </td>
                    <th v-if="authButton.fn5Auth === 'N'" class="t-l">{{ $t('message.trnPsbBaseQty') }}</th>
                    <td v-if="authButton.fn5Auth === 'N'" v-show="isBase" class="t-r">
                      {{ list.trnPsbBaseQty | priceFormat }}
                    </td>
                    <td v-if="authButton.fn5Auth === 'N'" v-show="!isBase" class="t-r">
                      {{ list.trnPsbOrdQty | priceFormat }}
                    </td>
                  </tr>
                  <tr v-if="authButton.fn5Auth === 'Y'">
                    <th class="t-l">{{ $t('message.trnAddAmt2') }}</th>
                    <td v-if="list.offrClsCd === offrClsCd.sample" class="t-r">{{ list.bokngTrnAddAmt | priceFormat }}</td>
                    <!--                    <td v-else><input v-model="list.bokngTrnAddAmt" :disabled="list.bokngStatCd !== bokngStatCd.payNeed && list.bokngStatCd !== bokngStatCd.confirmNeed && list.apprStatCd !== apprStatCd.need" class="d_input" oninput="this.value = this.value.replace(/^0+|\D+/g, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');" type="text" /></td>-->
                    <td v-else class="t-r">{{ list.bokngTrnAddAmt | priceFormat }}</td>
                    <th class="t-l">{{ $t('message.availableDeliver') }}</th>
                    <td v-show="isBase" class="t-r" @click="deliveryRequest(list)">
                      {{ list.trnPsbBaseQty | priceFormat }}
                    </td>
                    <td v-show="!isBase" class="t-r" @click="deliveryRequest(list)">
                      {{ list.trnPsbOrdQty | priceFormat }}
                    </td>
                  </tr>
                  <tr>
                    <!--                    <th class="t-l">-->
                    <!--                      {{ $t('message.exptStatNm') }}-->
                    <!--                    </th>-->
                    <td class="t-l" colspan="2">
                      {{ list.exptStatNm }}
                    </td>
                    <td class="price_txt t-r" colspan="2">
                      <strong>{{ $t('message.bokngOffrTotal') }}</strong
                      ><i>{{ list.bokngOffrTotal | priceFormat }}</i> <small>{{ $t('message.includeVat') }}</small>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </swiper-slide>
          <swiper-slide v-if="authButton.delAuth === 'Y'" class="quick_btns">
            <button class="btn_quick btn_trash in_img" @click="[validation('delete', list), slidePrev(index)]">
              <img src="@m/assets/img/icon_trash.png" />
              <span>{{ $t('message.btnDelete') }}</span>
            </button>
            <button class="btn_quick btn_delete in_img" @click="[validation('cancel', list), slidePrev(index)]">
              <img src="@m/assets/img/icon_delete.png" />
              <span>{{ $t('message.btnCancel') }}</span>
            </button>
          </swiper-slide>
        </swiper>
      </div>
      <!-- 하단 버튼 -->
      <div class="bottom_select_result_contents">
        <div class="btn_box">
          <!--          <button v-if="authButton.savAuth === 'Y'" class="btn_end" @click="validation('save')">{{ $t('message.btnSave') }}</button>-->
          <button v-if="authButton.fn3Auth === 'Y'" class="btn_green" @click="validation('confirm')">
            {{ $t('message.btnBookingConfirmation') }}
          </button>
          <button v-if="authButton.fn3Auth === 'Y'" class="btn_save" @click="validation('asgnReq')">
            {{ $t('message.btnAskInventAllocation') }}
          </button>
          <!--          <button v-if="authButton.fn4Auth === 'Y'" class="btn_end" @click="validation('dfcEnd')">-->
          <!--            {{ $t('message.btnCloseRemain') }}-->
          <!--          </button>-->
          <button v-if="authButton.fn2Auth === 'Y'" class="btn_green" @click="deliveryRequest()">
            {{ $t('message.btnRequestDeliver') }}
          </button>
        </div>
      </div>
    </div>
    <BookingDetail :bokngItem="bokngItem" :bookingManageOpen="bookingManageOpen" @closebookingManage="bookingManageOpen = false" :isBase="isBase" />
    <!-- //컨텐츠 바디 -->
    <BookingSearchModal ref="BookingSearch" :dashFilter="dashFilter" :pageNumber="pageNumber" @resetPageNum="pageNumber = 0" @searchBookingList="getBookingList" />
    <DeliveryRequestModal @successRequest="completeRequest" />
    <RemainEndModal />
    <DraftDocumentModal @saveApprDocNum="saveApprNum" />
    <HomeTap @goToTop="goToTop" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import defs from '@/consts/defs';
import BookingDetail from '@m/components/order/booking/BookingDetail'; //부킹관리 하단모달
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import BookingSearchModal from '@m/modal/order/BookingSearchModal';
import DeliveryRequestModal from '@m/modal/order/DeliveryRequestModal';
import bookingApi from '@/api/order/booking';
import RemainEndModal from '@m/modal/order/RemainEndModal';
import DraftDocumentModal from '@m/modal/order/DraftDocumentModal.vue';
import HomeTap from '@m/components/HomeTap';

export default {
  components: {
    BookingDetail,
    Swiper,
    SwiperSlide,
    BookingSearchModal,
    DeliveryRequestModal,
    RemainEndModal,
    DraftDocumentModal,
    HomeTap,
  },
  computed: {
    ...mapGetters({
      authButton: 'userInfo/getAuthButton',
    }),
  },
  data() {
    return {
      isBase: false,
      allChecked: false,
      checkedCount: 0,
      pageNumber: 0,
      bookingManageOpen: false,
      swiperOption: {
        initialSlide: 1,
        resistanceRatio: 0,
        slidesPerView: 'auto',
      },
      bookingList: [],
      bokngStatCd: defs.bokngStatCd,
      exptStatCd: defs.exptStatCd,
      apprStatCd: defs.apprStatCd,
      offrClsCd: defs.offrClsCd,
      bokngItem: {},
      pageInfo: {},
      el: '',
      dashFilter: '',
    };
  },
  mounted() {},
  methods: {
    async completeRequest() {
      await this.$refs.BookingSearch.getBookingList(false, true);
      this.$EventBus.$emit('openYesModal', 'message.msgEndDeliveryRequest');
    },
    goToTop() {
      if (Object.keys(this.el).length > 0) this.el.target.scrollTop = 0;
    },
    allCheckedChange(event) {
      this.bookingList.forEach((prdt, index) => {
        index;
        prdt.checked = event.target.checked;
        // this.$refs.prdtCheck[index].checked = event.target.checked;
      });
      if (event.target.checked) {
        this.checkedCount = this.bookingList.length;
      } else {
        this.checkedCount = 0;
      }
    },
    checkedChange(event) {
      if (event.target.checked) {
        this.checkedCount++;
      } else {
        this.checkedCount--;
      }

      if (this.checkedCount === this.bookingList.length) {
        this.allChecked = true;
        this.$refs.allCheck.checked = true;
      } else {
        this.allChecked = false;
        this.$refs.allCheck.checked = false;
      }
    },
    handleScroll(el) {
      this.el = el;
      if (Math.ceil(el.target.offsetHeight + el.target.scrollTop) >= el.target.scrollHeight) {
        if (this.pageInfo.finalPageNo - 1 > this.pageNumber) this.pageNumber++;
      }
    },
    openBookingInfo(bokngItem, index) {
      let element = document.querySelector(`#bokngItem${index}`);
      element.scrollIntoView({ behavior: 'smooth' });

      this.bookingManageOpen = true;
      this.bokngItem = bokngItem;
    },
    getBookingList(data) {
      if (data.click) {
        window.scrollTo(0, 0);
        this.bookingList = data.list;
      } else if (data.reload) {
        this.bookingList = data.list;
      } else {
        this.bookingList.push(...data.list);
      }
      this.pageInfo = data.page;
    },
    deliveryRequest(list = {}) {
      if (Object.keys(list).length > 0) {
        let isNotTrnPsbBaseQty = list.trnPsbBaseQty < 1;
        if (isNotTrnPsbBaseQty) {
          this.$EventBus.$emit('openYesModal', 'message.msgConfirmPossibleDelivery');
        } else if (list.exptStatCd !== null && list.exptStatCd !== '' && list.exptStatCd !== this.exptStatCd.confirm) {
          this.$EventBus.$emit('openYesModal', 'message.msgConfirmExptStatCd');
        } else {
          let copyList = JSON.parse(JSON.stringify(list));
          this.$modal.show('DeliveryRequestModal', { list: [copyList] });
        }
      } else {
        let checkedList = this.bookingList.filter(list => list.checked);
        if (checkedList.length === 0) {
          this.$EventBus.$emit('openYesModal', 'message.msgNoSelect');
        } else {
          const custId = checkedList[0].custId;
          let isOrder = checkedList.some(list => list.offrClsCd === this.offrClsCd.order);
          let isSample = checkedList.some(list => list.offrClsCd === this.offrClsCd.sample);
          let notSameCust = checkedList.some(list => list.custId !== custId);
          // let isExpt = false;
          let isExpt = checkedList.some(list => list.exptStatCd !== null && list.exptStatCd !== '' && list.exptStatCd !== this.exptStatCd.confirm);
          let isNotTrnPsbBaseQty = checkedList.some(list => list.trnPsbBaseQty < 1);
          if (isOrder && isSample) {
            this.$EventBus.$emit('openYesModal', 'message.msgConfirmSameCategory');
          } else if (notSameCust) {
            this.$EventBus.$emit('openYesModal', 'message.msgSameCustId');
          } else if (isNotTrnPsbBaseQty) {
            this.$EventBus.$emit('openYesModal', 'message.msgConfirmPossibleDelivery');
          } else if (isExpt) {
            this.$EventBus.$emit('openYesModal', 'message.msgConfirmExptStatCd');
          } else {
            this.$modal.show('DeliveryRequestModal', { list: JSON.parse(JSON.stringify(checkedList)) });
          }
        }
      }
    },
    validation(type, list) {
      let checkedList = this.bookingList.filter(list => list.checked);
      if (checkedList.length === 0 && type !== 'delete' && type !== 'cancel' && type !== 'appr') {
        this.$EventBus.$emit('openYesModal', 'message.msgNoSelect');
        return;
      }
      if (type === 'save') {
        if (checkedList.some(list => list.offrClsCd === this.offrClsCd.sample)) this.$EventBus.$emit('openYesModal', 'message.msgIncludeSample');
        for (let i = 0; i < checkedList.length; i++) {
          if (checkedList[i].bokngStatCd !== this.bokngStatCd.confirmNeed && checkedList[i].bokngStatCd !== this.bokngStatCd.payNeed) {
            this.$EventBus.$emit('openYesModal', 'message.msgNoConfirmNeed');
            return;
          } else if (checkedList[i].apprStatCd === this.apprStatCd.report || checkedList[i].apprStatCd === this.apprStatCd.end) {
            this.$EventBus.$emit('openYesModal', 'message.msgNoConfirmNeed');
            return;
          }
        }
        this.saveBookingPrice(checkedList);
      } else if (type === 'confirm') {
        // let offrId = '';
        for (let i = 0; i < checkedList.length; i++) {
          // if (i === 0) offrId = checkedList[0].offrId;
          // else if (offrId !== checkedList[0].offrId) {
          //   this.$EventBus.$emit('openYesModal', '동일한 견적서가 아닙니다.');
          //   return;
          // }
          if (checkedList[i].apprStatCd !== this.apprStatCd.end && checkedList[i].apprStatCd !== null) {
            this.$EventBus.$emit('openYesModal', 'message.msgConfirmApprStatus');
            return;
          } else if (checkedList[i].bokngStatCd !== this.bokngStatCd.confirmNeed) {
            this.$EventBus.$emit('openYesModal', 'message.msgNotComfirmed');
            return;
          }
        }
        this.saveBookingConfirm(checkedList);
        //
      } else if (type == 'asgnReq') {
        for (let i = 0; i < checkedList.length; i++) {
          if (checkedList[i].bokngStatCd !== this.bokngStatCd.bokngConfirm) {
            this.$EventBus.$emit('openYesModal', 'message.msgNoBookingConfirm');
            return;
          }
        }
        this.saveBookingAssign(checkedList);
        //
      } else if (type === 'dfcEnd') {
        //
        for (let i = 0; i < checkedList.length; i++) {
          if (checkedList[i].bokngStatCd !== this.bokngStatCd.remainEnd || checkedList[i].bokngRmnBaseQty !== 0 || checkedList[i].trnIngBaseQty > 0 || checkedList[i].trnPsbBaseQty > 0) {
            this.$EventBus.$emit('openYesModal', 'message.msgCheckQty');
            return;
          }
        }
        this.$modal.show('RemainEndModal', { dfcList: checkedList });
      } else if (type === 'delete') {
        if (list.bokngStatCd === this.bokngStatCd.confirmNeed || list.bokngStatCd === this.bokngStatCd.payNeed) {
          this.saveBookingRemove(list);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgCheckStatus');
          return;
        }
      } else if (type === 'cancel') {
        if (list.bokngStatCd === this.bokngStatCd.bokngConfirm || list.bokngStatCd === this.bokngStatCd.request) {
          this.saveBookingCancel(list);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgCannotCancel2');
          return;
        }
      } else if (type === 'appr') {
        if (list.bokngStatCd === this.bokngStatCd.payNeed && list.apprStatCd === this.apprStatCd.need) {
          this.openApprNumModal(list);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgNecessaryPayment');
          return;
        }
      }
    },
    async openApprNumModal(bookItem) {
      this.$modal.show('DraftDocumentModal', { type: 'booking', bookItem: bookItem });
    },
    async saveApprNum(newParam) {
      const param = newParam;
      try {
        const response = await bookingApi.saveBookingAppr(param);
        if (response.data.status == 200) {
          this.$EventBus.$emit('openYesModal', 'message.msgSelectApproval');
          await this.$refs.BookingSearch.getBookingList(false, true);
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
    async saveBookingPrice(checkedList) {
      try {
        const param = [];
        checkedList.forEach(saveRow => {
          param.push({
            id: saveRow.id,
            offrDtlsId: saveRow.offrDtlsId,
            offrNum: saveRow.offrNum,
            bokngStatCd: saveRow.bokngStatCd,
            bokngBaseQty: saveRow.bokngBaseQty,
            bokngOrdQty: saveRow.bokngOrdQty,
            bokngQtyAmt: saveRow.bokngQtyAmt.replaceAll(',', ''),
            bokngTrnAddAmt: saveRow.bokngTrnAddAmt.replaceAll(',', ''),
          });
        });
        const response = await bookingApi.saveBookingPrice(param);
        if (response.data.rs) {
          await this.$refs.BookingSearch.getBookingList(false, true);
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
    },
    async saveBookingAssign(checkedList) {
      try {
        const param = [];
        checkedList.forEach(list => {
          param.push({
            id: list.id,
            offrId: list.offrId,
            offrNum: list.offrNum,
          });
        });
        const response = await bookingApi.saveBookingAssign(param);
        if (response.data.rs) {
          await this.$refs.BookingSearch.getBookingList(false, true);
          this.$EventBus.$emit('openYesModal', 'message.msgSelectAllocationRequest');
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
    async saveBookingConfirm(checkedList) {
      try {
        const param = [];
        checkedList.forEach(list => {
          param.push({
            id: list.id,
            offrId: list.offrId,
            offrNum: list.offrNum,
            offrDtlsId: list.offrDtlsId,
            apprId: list.apprId,
            bokngNum: list.bokngNum,
            custId: list.custId,
          });
        });
        const response = await bookingApi.saveBookingConfirm(param);
        if (response.data.rs) {
          await this.$refs.BookingSearch.getBookingList(false, true);
          this.$EventBus.$emit('openYesModal', 'message.msgSelectBookingConfirm');
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
    async saveBookingRemove(list) {
      try {
        const param = [
          {
            id: list.id,
            offrId: list.offrId,
            offrNum: list.offrNum,
            offrDtlsId: list.offrDtlsId,
          },
        ];
        const response = await bookingApi.saveBookingRemove(param);
        if (response.data.message) {
          await this.$refs.BookingSearch.getBookingList(false, true);
          this.$EventBus.$emit('openYesModal', response.data.message);
        } else {
          await this.$refs.BookingSearch.getBookingList(false, true);
          this.$EventBus.$emit('openYesModal', 'message.msgSelectDelete');
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
    async saveBookingCancel(list) {
      try {
        const param = [
          {
            id: list.id,
            offrId: list.offrId,
            offrNum: list.offrNum,
            bokngStatCd: list.bokngStatCd,
            offrDtlsId: list.offrDtlsId,
          },
        ];
        const response = await bookingApi.saveBookingCancel(param);
        if (response.data.rs) {
          await this.$refs.BookingSearch.getBookingList(false, true);
          this.$EventBus.$emit('openYesModal', 'message.msgChangeBookingUpload');
        }
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else if (e && e.errMsg) {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async reLoad() {
      await this.$refs.BookingSearch.getBookingList();
    },
    slideNext(index) {
      this.$refs.swiper[index].swiperInstance.slideNext(100, () => {});
    },
    slidePrev(index) {
      this.$refs.swiper[index].swiperInstance.slidePrev(100, () => {});
    },
  },
  created() {
    if (this.$route.query) {
      this.dashFilter = this.$route.query.filter;
    }
  },
};
</script>

<style></style>
