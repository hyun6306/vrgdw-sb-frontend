<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">
        <h1 v-if="page === 'order'" class="logo in_txt">{{ $t('message.quoteDetail') }}</h1>
        <h1 v-else class="logo in_txt">{{ $t('message.sampleDetail') }}</h1>
      </div>
      <div class="header_left">
        <button class="btn_header in_img" @click="$router.go(-1)"><img src="@m/assets/img/icon_back.png" /></button>
      </div>
      <div class="header_right"></div>
    </div>
    <!-- //상단 헤더 -->

    <!-- 컨텐츠 바디 -->
    <div class="container" @scroll="handleScroll">
      <QuoteInfo @senndOffrNum="data => ((offrNum = data.offrNum), (offrPubDt = data.offrPubDt), (quoteOffrStatCd = data.offrStatCd))" :isBase="isBase" ref="QuoteInfo" />
      <!-- 리스트영역 -->
      <div class="quote_detail_list_contents">
        <!-- 리스트 총 개수 및 요청일 -->
        <div class="qdl_head">
          <label class="chechbox_basic">
            <input ref="allCheck" v-model="allChecked" type="checkbox" @change="allCheckedChange" />
            <span class="checkmark"></span>
            <strong>{{ pageInfo.totalCount }}</strong> {{ $t('message.totalSelection2') }}
          </label>
          <div class="btns_unit ml-a">
            <button :class="[isBase ? 'on' : '']" @click="(isBase = true), (update = Math.random())">
              {{ $t('message.sheetQty') }}
            </button>
            <button :class="[!isBase ? 'on' : '']" @click="(isBase = false), (update = Math.random())">
              {{ $t('message.bundleQty') }}
            </button>
          </div>
          <!--          <span class="quote_request_date">{{ $t('message.quoteReqDt') }}</span>-->
          <!--          <strong>{{ offrPubDt | vnDateFormatD }}</strong>-->
        </div>
        <!-- //리스트 총 개수 및 요청일 -->
        <!-- 리스트 반복 -->
        <!-- 
          결재필요
          완료 quote_list_box quote_complete / btn_request btn_quote_complete
          취소 btn_quote_cancle
        -->
        <swiper v-for="(list, index) in quoteItemList" :key="index" ref="swiper" :options="swiperOption" class="qdl_section swiper">
          <swiper-slide v-if="list.apprStatCd === apprStatCd.need" class="quick_btns">
            <a :href="`tel:${salesMngPhoneNum}`" class="btn_quick btn_call in_img" v-if="userMenuGrp === 'CUSTOMER'"><img src="@m/assets/img/icon_call_w.png" /></a>
            <a :href="`tel:${custPhoneNum}`" class="btn_quick btn_call in_img" v-else><img src="@m/assets/img/icon_call_w.png" /></a>
            <button class="btn_quick btn_payment in_img" @click="openApprNumModal(list)"><img src="@m/assets/img/icon_payment.png" /></button>
          </swiper-slide>
          <swiper-slide :class="[list.offrStatCd === offrStatCd.end ? 'quote_list_box quote_complete' : 'quote_list_box']">
            <div :id="`quoteItem${index}`" ref="quoteItem" :name="`quoteItem${index}`" class="check_product">
              <label class="chechbox_solo">
                <input ref="prdtCheck" v-model="list.checked" type="checkbox" @change="checkedChange" />
                <span class="checkmark"></span>
              </label>
              <button class="product_txt underline" @click="openProductInfo(list, index)">{{ list.productInfo.prdtNm }}</button>
              <button v-if="(list.sizeChgYn === 'Y' && list.offrDtlsStatCd === offrDtlsStatCd.end) || list.trnEndBaseQty > 0 || list.trnIngBaseQty > 0" class="btn_paper in_img" @click="getSalesMemo(list)">
                <img src="@m/assets/img/icon_paper.png" />
              </button>
              <button v-if="list.apprStatCd === apprStatCd.end || !list.apprStatCd" :class="[list.offrDtlsStatCd === offrDtlsStatCd.end ? 'btn_request ml-a' : list.offrDtlsStatCd === offrDtlsStatCd.cancel ? 'btn_quote_cancle ml-a' : 'btn_request ml-a']">
                {{ list.offrDtlsStatNm }}
              </button>
              <button v-else class="btn_request ml-a">
                {{ list.apprStatNm }}
              </button>
            </div>
            <div class="table_s02">
              <table>
                <colgroup>
                  <col style="width: calc(35%)" />
                  <col style="width: calc(24%)" />
                  <col style="width: calc(21%)" />
                  <col style="width: calc(20%)" />
                </colgroup>
                <tbody>
                  <tr>
                    <th class="t-l">{{ $t('message.hopeMonth') }}</th>
                    <td class="t-l" colspan="3">{{ list.trnHopeDt | vnDateFormatD }}</td>
                    <!-- <th class="t-l">{{ $t('message.forecastMonth') }}</th>
                    <td class="t-r">{{ list.trnPropDt | vnDateFormatD }}</td> -->
                  </tr>
                  <tr>
                    <th class="t-l">{{ $t('message.item') }}</th>
                    <td class="t-r">{{ list.itemNum | itemNumFormat }}</td>
                    <th class="t-l">{{ $t('message.quoteRequestQty') }}</th>
                    <td class="t-r" v-if="isBase">
                      {{ list.reqBaseQty | priceFormat }}
                    </td>
                    <td class="t-r" v-else>{{ list.reqOrdQty | priceFormat }}</td>
                  </tr>
                  <!-- 영업담당자 로그인 노출-->
                  <tr v-if="userMenuGrp !== 'CUSTOMER' && page === 'order'">
                    <th class="t-l">{{ $t('message.reqQtyAmt') }}</th>
                    <td class="t-r">{{ list.cfmOffrPrice | priceFormat }}</td>
                    <th :colspan="userMenuGrp !== 'CUSTOMER' ? 1 : 2" class="t-l">{{ $t('message.unitPrice') }}</th>
                    <td :colspan="userMenuGrp !== 'CUSTOMER' ? 1 : 2" class="t-r">{{ list.prdtQtyAmt | priceFormat }}</td>
                  </tr>

                  <tr v-if="userMenuGrp !== 'CUSTOMER' && page === 'order'">
                    <th class="t-l">{{ $t('message.orderPrice') }}</th>
                    <td colspan="3">
                      <input v-model="list.chgQtyAmt" :disabled="list.offrDtlsStatCd !== offrDtlsStatCd.request || list.apprStatCd === apprStatCd.report || list.apprStatCd === apprStatCd.end" class="d_input t-r" oninput="this.value = this.value.replace(/^0+|\D+/g, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');" type="text" @blur="setReqQtyAmt(list)" />
                    </td>
                  </tr>
                  <tr v-if="userMenuGrp !== 'CUSTOMER' && page === 'order'">
                    <th class="t-l">{{ $t('message.trnAddAmt2') }}</th>
                    <td colspan="3">
                      <input v-model="list.trnAddAmt" :disabled="list.offrDtlsStatCd !== offrDtlsStatCd.request || list.apprStatCd === apprStatCd.report || list.apprStatCd === apprStatCd.end" class="d_input t-r" oninput="this.value = this.value.replace(/^0+|\D+/g, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');" type="text" @blur="setReqQtyAmt(list)" />
                    </td>
                  </tr>

                  <tr v-if="page === 'order' && quoteOffrStatCd !== offrStatCd.request">
                    <td class="price_txt t-r" colspan="4">
                      <strong>{{ $t('message.quotePrice2') }}</strong>
                      <i>{{ list.cfmOffrPrice | priceFormat }}</i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="page === 'sample'" class="table table_row">
              <table>
                <colgroup>
                  <col style="width: calc(100% / 3)" />
                  <col style="width: calc(100% / 3)" />
                  <col style="width: calc(100% / 3)" />
                </colgroup>
                <tbody>
                  <tr>
                    <th v-if="list.sizeChgYn === 'N'" colspan="3">{{ $t('message.standard') }}</th>
                    <th v-if="list.sizeChgYn === 'Y'" colspan="3">{{ $t('message.custom') }}</th>
                  </tr>

                  <tr>
                    <th>{{ $t('message.width') }}</th>
                    <th>{{ $t('message.smplVtclSize') }}</th>
                    <th>{{ $t('message.categoryThick') }}</th>
                  </tr>
                  <tr>
                    <td class="t-r">{{ list.smplHrsnSize }}</td>
                    <td class="t-r">{{ list.smplVtclSize }}</td>
                    <td class="t-r">{{ list.smplTsk }}</td>
                  </tr>
                </tbody>
              </table>
              <button v-if="page === 'sample' && list.sizeChgYn === 'Y' && quoteOffrStatCd !== offrStatCd.request" class="btn_tabel_end" @click="isCheckedList('end', list)">
                {{ $t('message.btnComplete') }}
              </button>
            </div>
            <div v-if="page === 'sample' && userMenuGrp !== 'CUSTOMER' && list.sizeChgYn === 'N'" class="table_s02">
              <table>
                <colgroup>
                  <col style="width: calc(30%)" />
                  <col style="width: calc(20%)" />
                  <col style="width: calc(30%)" />
                  <col style="width: calc(20%)" />
                </colgroup>
                <tbody>
                  <tr>
                    <th class="t-l">{{ $t('message.costCntrNm') }}</th>
                    <td colspan="3">
                      <span class="form_input" @click="costCenter(list.costCntrNm)">
                        <input v-model="list.costCntrNm" class="d_input" disabled type="text" />
                        <button v-if="quoteOffrStatCd === offrStatCd.request && authButton.schAuth == 'Y'" class="in_img"><img src="@m/assets/img/icon_search.png" /></button>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th class="t-l">{{ $t('message.apprDocNum') }}</th>
                    <td colspan="3">
                      <span class=""><input v-model="list.apprDocNum" :disabled="quoteOffrStatCd !== offrStatCd.request" class="d_input" maxlength="22" oninput="this.value = this.value.replace(/^0+|\D+/g, '').replace(/^(\d{0,8})(\d{0,8})(\d{0,4})$/g, '$1-$2-$3');" type="text" /></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </swiper-slide>
          <!-- <swiper-slide class="quick_btns">
            <button class="btn_quick btn_trash in_img" @click="touch"><img src="@m/assets/img/icon_trash.png" /></button>
            <button class="btn_quick btn_delete in_img" @click="touch"><img src="@m/assets/img/icon_delete.png" /></button>
          </swiper-slide> -->
        </swiper>
        <!-- <div class="quick_btns">
            <button class="btn_quick btn_call in_img" @click="touch"><img src="@m/assets/img/icon_call_w.png" /></button>
            <button class="btn_quick btn_payment in_img" @click="touch"><img src="@m/assets/img/icon_payment.png" /></button>
            <button class="btn_quick btn_trash in_img" @click="touch"><img src="@m/assets/img/icon_trash.png" /></button>
            <button class="btn_quick btn_delete in_img" @click="touch"><img src="@m/assets/img/icon_delete.png" /></button>
          </div> -->
        <!-- //리스트 반복 -->
      </div>
      <!-- //리스트영역 -->

      <!-- 하단 버튼 -->
      <div class="bottom_select_result_contents">
        <div class="btn_box">
          <button class="btn_cancle" v-if="(page == 'order' && authButton.fn3Auth == 'Y') || (page == 'sample' && authButton.fn2Auth == 'Y')" @click="cancelAndSave('cancel')">{{ $t('message.btnLeftQtyCancel') }}</button>
          <button v-if="page === 'order' && authButton.fn4Auth === 'Y'" class="btn_tempsave" @click="cancelAndSave('save')">{{ $t('message.btnSave') }}</button>
          <button v-if="page === 'sample' && authButton.fn3Auth === 'Y' && quoteOffrStatCd === offrStatCd.request" class="btn_tempsave" @click="sampleConfirm()">{{ $t('message.btnSampleComfirmation') }}</button>
          <button v-if="page === 'sample' && authButton.fn4Auth === 'Y' && quoteOffrStatCd !== offrStatCd.request" class="btn_tempsave" @click="isCheckedList('booking')">{{ $t('message.btnSampleBookingConfirmation') }}</button>
        </div>
      </div>
    </div>
    <div v-show="false"><input v-model="update" placeholder="" readonly type="text" /></div>
    <!-- //컨텐츠 바디 -->
    <ProductInfo :productInfoOpen="productInfoOpen" :quoteItem="quoteItem" @closeProductInfo="productInfoOpen = false" :isBase="isBase" />
    <CostCenterSearchModal @onSelectCost="handleSelectCost" />
    <EndCompleteModal />
    <SalesOpinionModal :name="`Detail`" />
    <DraftDocumentModal @saveApprDocNum="saveApprNum" />
    <HomeTap @goToTop="goToTop" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import orderApi from '@/api/order/order';
import detailApi from '@/api/order/detail';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import ProductInfo from '@m/components/order/detail/ProductInfo'; //제품상세
import QuoteInfo from '@m/components/order/detail/QuoteInfo';
import defs from '@/consts/defs';
import CostCenterSearchModal from '@m/modal/order/CostCenterSearchModal';
import EndCompleteModal from '@m/modal/order/EndCompleteModal';
import SalesOpinionModal from '@m/modal/order/SalesOpinionModal';
import DraftDocumentModal from '@m/modal/order/DraftDocumentModal.vue';
import HomeTap from '@m/components/HomeTap';

export default {
  components: {
    Swiper,
    SwiperSlide,
    ProductInfo,
    QuoteInfo,
    CostCenterSearchModal,
    EndCompleteModal,
    SalesOpinionModal,
    DraftDocumentModal,
    HomeTap,
  },
  data() {
    return {
      isBase: false,
      page: '',
      allChecked: false,
      checkedCount: 0,
      productInfoOpen: false,
      quote_box_height: '',
      swiperOption: {
        initialSlide: 1,
        resistanceRatio: 0,
        slidesPerView: 'auto',
      },
      id: 0,
      custId: 0,
      quoteItemList: [],
      offrStatCd: defs.offrStatCd,
      apprStatCd: defs.apprStatCd,
      offrDtlsStatCd: defs.offrDtlsStatCd,
      pageNumber: 0,
      offrNum: '',
      offrPubDt: '',
      quoteOffrStatCd: '',
      quoteItem: {},
      update: '',
      pageInfo: {},
      el: '',
      salesMngPhoneNum: '',
      custPhoneNum: '',
    };
  },
  computed: {
    getQuoteBoxWidth: () => {
      const quoteWidth = document.querySelector('.quote_list_box').offsetWidth;
      return {
        quoteWidth,
      };
    },
    ...mapGetters({
      authButton: 'userInfo/getAuthButton',
      userMenuGrp: 'userInfo/getUserMenuGrpCd',
    }),
  },
  methods: {
    goToTop() {
      if (Object.keys(this.el).length > 0) this.el.target.scrollTop = 0;
    },
    // getInfoHeight() {
    //   let val = this.$refs.quote_box_height.scrollHeight;
    //   // search_box_height 의 높이값 받아온다
    //   this.quote_box_height = `${val}px`;
    //   this.quoteSection = `${val}px`;
    // },
    handleScroll(el) {
      this.el = el;
      if (Math.ceil(el.target.offsetHeight + el.target.scrollTop) >= el.target.scrollHeight) {
        if (this.pageInfo.finalPageNo - 1 > this.pageNumber) {
          this.pageNumber++;
          this.getQuoteDetail();
        }
      }
    },
    async getQuoteDetail(click = false, reload = false) {
      try {
        const param = {
          id: this.id,
          custId: this.custId,
          pageNumber: this.pageNumber,
          pageSize: 10,
        };
        const resp = await detailApi.getQuoteDetail(param);
        resp.data.ds.forEach(list => {
          if (!list.chgQtyAmt) list.chgQtyAmt = this.$priceFormat(list.prdtQtyAmt);
          else list.chgQtyAmt = this.$priceFormat(list.chgQtyAmt);
          if (!list.trnAddAmt) list.trnAddAmt = '0';
          else list.trnAddAmt = this.$priceFormat(list.trnAddAmt);
        });
        if (click) this.quoteItemList = resp.data.ds;
        else if (reload) this.quoteItemList = resp.data.ds;
        else this.quoteItemList.push(...resp.data.ds);
        this.pageInfo = resp.data.page;
        this.allChecked = false;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    cancelAndSave(type) {
      let checkedList = this.quoteItemList.filter(list => list.checked);
      if (checkedList.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgEmptyQuotation');
      } else if (type === 'save') {
        let notReq = false;
        let priceCheck = false;
        checkedList.forEach(list => {
          if (list.offrStatCd !== defs.offrStatCd.req) {
            notReq = true;
          }
          if (list.chgQtyAmt == 0 && list.trnAddAmt == 0) {
            priceCheck = true;
          }
        });
        if (notReq) {
          this.$EventBus.$emit('openYesModal', 'message.msgOnlyReq');
        } else if (priceCheck) {
          this.$EventBus.$emit('openYesModal', 'message.errorsNullAmt');
        } else {
          this.putOffrChgSave(checkedList);
        }
      } else if (type === 'cancel') {
        let existCancel = false;
        let notBaseQty = false;
        if (this.quoteOffrStatCd !== this.offrStatCd.request) {
          checkedList.forEach(list => {
            if (list.offrDtlsStatCd === defs.offrDtlsStatCd.cancel) {
              existCancel = true;
            }
            // if (list.rmnBaseQty === 0) {
            //   notBaseQty = true;
            // }
          });
          if (!existCancel && !notBaseQty) {
            this.putRmdCancel(checkedList);
          } else if (notBaseQty) {
            this.$EventBus.$emit('openYesModal', 'message.msgLeftEmpty');
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgStateCancel');
          }
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgCannotRemain');
        }
      }
    },
    async putRmdCancel(checkedList) {
      // 남은량 취소
      try {
        const param = [];
        checkedList.forEach(quoteItem => {
          let data = {
            custId: this.custId,
            offrId: quoteItem.offrId,
            offrNum: this.offrNum,
            id: quoteItem.id,
          };
          param.push(data);
        });
        const resp = await orderApi.putRmdCancel(param);
        this.$EventBus.$emit('openYesModal', resp.data.message);
        this.getQuoteDetail(false, true);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async putOffrChgSave(checkedList) {
      // 단가 저장
      try {
        let id = 0;
        let offerDtlsDtoList = [];
        checkedList.forEach(list => {
          id = list.offrId;
          let data = {
            id: list.id,
            chgQtyAmt: list.chgQtyAmt.replaceAll(',', '') * 1,
            trnAddAmt: list.trnAddAmt.replaceAll(',', '') * 1,
          };
          offerDtlsDtoList.push(data);
        });
        const param = {
          id,
          offrNum: this.offrNum,
          custId: this.custId,
          offrStatCd: this.quoteOffrStatCd,
          offerDtlsDtoList,
        };
        const resp = await orderApi.putOffrChgSave(param);
        this.$EventBus.$emit('openYesModal', resp.data.message);
        this.getQuoteDetail(false, true);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async openApprNumModal(quoteItem) {
      this.$modal.show('DraftDocumentModal', { type: 'quote', quote: quoteItem, custId: this.custId, offrId: this.id });
    },
    async saveApprNum(newParam) {
      const param = newParam;
      try {
        const response = await detailApi.putApprNumSave(param);
        if (response.data.status == 200) {
          this.$EventBus.$emit('openYesModal', 'message.msgSuccessApproval');
          await this.getQuoteDetail(false, true);
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
    allCheckedChange(event) {
      this.quoteItemList.forEach((prdt, index) => {
        index;
        prdt.checked = event.target.checked;
        // this.$refs.prdtCheck[index].checked = event.target.checked;
      });
      if (event.target.checked) {
        this.checkedCount = this.quoteItemList.length;
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

      if (this.checkedCount === this.quoteItemList.length) {
        this.allChecked = true;
        this.$refs.allCheck.checked = true;
      } else {
        this.allChecked = false;
        this.$refs.allCheck.checked = false;
      }
    },
    openProductInfo(quoteItem, index) {
      let element = document.querySelector(`#quoteItem${index}`);
      element.scrollIntoView({ behavior: 'smooth' });

      this.productInfoOpen = true;

      quoteItem = JSON.parse(JSON.stringify(quoteItem));
      let productInfo = quoteItem['productInfo'];

      delete quoteItem['productInfo'];
      quoteItem = {
        ...quoteItem,
        ...productInfo,
      };

      this.quoteItem = quoteItem;
    },
    setReqQtyAmt(list) {
      list.prdtQtyAmt = list.chgQtyAmt.replaceAll(',', '') * 1 + list.trnAddAmt.replaceAll(',', '') * 1;
      this.update = Math.random();
    },
    costCenter(costCntrNm) {
      if (this.quoteOffrStatCd === this.offrStatCd.request) this.$modal.show('CostCenterSearchModal', { costCntrNm: costCntrNm });
    },
    async sampleConfirm() {
      if (this.validation()) {
        try {
          let param = [];
          this.quoteItemList.forEach(list => {
            if (list.sizeChgYn === 'N') {
              let data = {
                id: list.apprId,
                custId: list.custId,
                apprDocNum: list.sizeChgYn === 'N' ? list.apprDocNum : '',
                costCntrCd: list.sizeChgYn === 'N' ? list.costCntrCd : '',
                costCntrNm: list.sizeChgYn === 'N' ? list.costCntrNm : '',
                trnExpctDt: list.trnExptDt,
              };
              param.push(data);
            }
          });
          const saveResp = await detailApi.putSampleSave(param);

          if (saveResp.data.status === 200) {
            param = [
              {
                id: this.id,
                custId: this.custId,
              },
            ];

            await detailApi.putSampleConfirm(param);
            await this.getQuoteDetail(false, true);
            this.$EventBus.$emit('openYesModal', 'message.msgQuoteConfirm');
            this.$refs.QuoteInfo.getOffrMng();
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
    validation() {
      for (let list in this.quoteItemList) {
        if (!list.apprDocNum && list.apprDocNum === '' && list.apprDocNum.length < 22) {
          this.$EventBus.$emit('openYesModal', 'message.msgCheckPayment');
          return false;
        } else if (list.sizeChgYn === 'N' && !list.costCntrCd && list.costCntrCd !== '') {
          this.$EventBus.$emit('openYesModal', 'message.msgNoCenter');
          return false;
        }
      }
      return true;
    },
    handleSelectCost(data) {
      this.quoteItemList.forEach(list => {
        if (list.sizeChgYn === 'N') {
          list.costCntrNm = data.costCntrNm;
          list.costCntrCd = data.costCntrCd;
        }
      });
      this.update = Math.random();
    },
    isCheckedList(type, list = {}) {
      let checkedList = this.quoteItemList.filter(list => list.checked);
      if (checkedList.length === 0 && type === 'booking') {
        this.$EventBus.$emit('openYesModal', 'message.msgEmptyQuotation');
      } else if (type === 'booking') {
        let notConfirm = false;
        checkedList.forEach(check => {
          if (check.offrDtlsStatCd !== this.offrDtlsStatCd.confirm) {
            notConfirm = true;
          }
        });
        if (notConfirm) {
          this.$EventBus.$emit('openYesModal', 'message.msgRequireProcess');
        } else if (this.validation()) {
          this.sampleBooking(checkedList);
        }
      } else if (type === 'end') {
        let standardList = checkedList.filter(list => list.sizeChgYn == 'N');
        if (list.offrDtlsStatCd !== this.offrDtlsStatCd.confirm) {
          this.$EventBus.$emit('openYesModal', 'message.msgRequireProcess2');
        } else if (standardList.length > 0) {
          this.$EventBus.$emit('openYesModal', 'message.errorsSizeNRow');
        } else {
          this.$modal.show('EndCompletehModal', { offrId: this.id, offrDtlsId: list.id, custId: this.custId, offrNum: this.offrNum });
        }
      }
    },
    async sampleBooking(checkedList) {
      try {
        const param = {
          id: this.id,
          offrNum: this.offrNum,
          offerDtlsDtoList: [],
        };

        checkedList.forEach(list => {
          let data = {
            id: list.id,
            prdtId: list.prdtId,
          };
          param.offerDtlsDtoList.push(data);
        });

        const resp = await detailApi.putBokngConfirm(param);
        await this.getQuoteDetail(false, true);
        this.$EventBus.$emit('openYesModal', resp.data.message);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getSalesMemo(list) {
      try {
        const param = {
          id: list.id,
          offrId: this.id,
          custId: this.custId,
        };
        const resp = await detailApi.getSalesMemo(param);
        this.$modal.show('SalesOpinionModalDetail', { type: 'item', memo: resp.data.rs.remark });
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
      this.salesMngPhoneNum = this.$route.query.salesMngPhoneNum;
      this.custPhoneNum = this.$route.query.custPhoneNum;
    }
    this.page = this.$route.path.includes('sample') ? 'sample' : 'order';
  },
  mounted() {
    // this.getInfoHeight();
    this.getQuoteDetail();
  },
};
</script>

<style></style>
