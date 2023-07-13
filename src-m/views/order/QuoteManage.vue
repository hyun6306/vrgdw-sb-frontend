<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">
        <h1 v-if="page === 'order'" class="logo in_txt">{{ $t('message.quoteManagement') }}</h1>
        <h1 v-else class="logo in_txt">{{ $t('message.sampleManage') }}</h1>
      </div>
      <div class="header_left">
        <button class="btn_header in_img" @click="$router.go(-1)"><img src="@m/assets/img/icon_back.png" /></button>
      </div>
      <div class="header_right">
        <button class="btn_header in_img" v-if="authButton.schAuth == 'Y'" @click="$modal.show('QuoteSearchModal')"><img src="@m/assets/img/icon_search.png" /></button>
      </div>
    </div>
    <!-- //상단 헤더 -->
    <!-- 
      임시저장 btn_quote btn_quote_tempsave
      확정 요청
      진행중
      취소 btn_quote btn_quote_cancle
      완료 quote_box quote_complete / btn_quote btn_quote_complete
    -->
    <!-- 컨텐츠 바디 -->
    <div class="container" @scroll="handleScroll">
      <div class="quote_list_contents">
        <!-- 전체선택 -->
        <div class="bl_head">
          <div style="width: 30%" class="head_count">
            <strong>{{ pageInfo.totalCount }}</strong> {{ $t('message.totalSelection2') }}
          </div>
          <div style="width: 70%" class="btns_unit">
            <button :class="[isBase ? 'on' : '']" @click="(isBase = true), (update = Math.random())">
              {{ $t('message.sheetQty') }}
            </button>
            <button :class="[!isBase ? 'on' : '']" @click="(isBase = false), (update = Math.random())">
              {{ $t('message.bundleQty') }}
            </button>
          </div>
        </div>
        <!-- //전체선택 -->
        <swiper v-for="(list, index) in quoteList" :key="index" ref="swiper" :options="swiperOption" class="quote_section swiper">
          <swiper-slide class="quick_btns">
            <a :href="`tel:${list.salesMngPhoneNum}`" class="btn_quick btn_call in_img" @click="slideNext(index)" v-if="userMenuGrpCd === 'CUSTOMER'"><img src="@m/assets/img/icon_call_w.png" /></a>
            <a :href="`tel:${list.customerInfo.custPhoneNum}`" class="btn_quick btn_call in_img" @click="slideNext(index)" v-else><img src="@m/assets/img/icon_call_w.png" /></a>
            <button class="btn_quick btn_delivery in_img" @click="getAddrInfo(list.id, index)"><img src="@m/assets/img/icon_truck_w.png" /></button>
          </swiper-slide>
          <swiper-slide :class="[list.offrStatCd === offrStatCd.request ? 'quote_box quote_complete' : 'quote_box']">
            <div class="qb_head">
              <label class="chechbox_solo">
                <input v-model="list.checked" type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <!--              <button v-if="list.offrStatCd === offrStatCd.temp" class="btn_po" @click="pageMove(list)">-->
              <!--                 <span>{{ $t('message.poNo') }}</span> -->
              <!--                <i> {{ list.custPoNum }}</i>-->
              <!--              </button>-->
              <button class="btn_po underline" @click="pageMove(list)">
                <!-- <span>{{ $t('message.no') }}</span> -->
                <i> {{ list.offrNum }}</i>
              </button>
              <button class="btn_paper in_img" @click="getOffrMemo(list)"><img src="@m/assets/img/icon_paper.png" /></button>
              <a :class="[list.offrStatCd === offrStatCd.end ? 'btn_quote btn_quote_tempsave' : list.offrStatCd === offrStatCd.temp ? 'btn_quote btn_quote_tempsave' : list.offrStatCd === offrStatCd.cancel ? 'btn_quote btn_quote_cancle' : 'btn_quote btn_quote_tempsave']">{{ list.offrStatNm }}</a>
            </div>
            <div class="quote_info">
              <span class="quote_item_num"
                >{{ $t('message.itemQty') }}<i>{{ list.prdtItemQty }}</i></span
              >
              <p class="quote_ing">
                <span
                  >{{ $t('message.quoteReqDt') }}<i>{{ list.offrDt | vnDateFormatD }}</i></span
                >
                <span
                  >{{ $t('message.progressPercent') }}<i>{{ list.progRate }}%</i></span
                >
              </p>
            </div>
            <div class="table">
              <table>
                <colgroup>
                  <col style="width: calc(100% / 4)" />
                  <col style="width: calc(100% / 4)" />
                  <col style="width: calc(100% / 4)" />
                  <col style="width: calc(100% / 4)" />
                </colgroup>
                <tbody>
                  <tr v-if="userMenuGrpCd === 'CUSTOMER' && page === 'order'">
                    <th colspan="4">{{ $t('message.offrTotPrice') }}</th>
                  </tr>
                  <tr v-if="userMenuGrpCd === 'CUSTOMER' && page === 'order'">
                    <td v-if="list.offrStatCd === offrStatCd.temp || list.offrStatCd === offrStatCd.request" colspan="4">
                      <small>{{ $t('message.separateVat') }}</small>
                      <span>{{ 0 | priceFormat }}</span>
                    </td>
                    <td v-else colspan="4">
                      <small>{{ $t('message.separateVat') }}</small>
                      <span>{{ list.reqTotal | priceFormat }}</span>
                    </td>
                  </tr>
                  <tr v-if="userMenuGrpCd !== 'CUSTOMER' && page === 'order'">
                    <th colspan="2">{{ $t('message.salesAmount') }}</th>
                    <th colspan="2">Quotation Total Amount</th>
                  </tr>
                  <tr v-if="userMenuGrpCd !== 'CUSTOMER' && page === 'order'">
                    <td colspan="2">
                      <small>{{ $t('message.separateVat') }}</small>
                      <span>{{ list.reqTotal | priceFormat }}</span>
                    </td>
                    <td colspan="2">
                      <small>{{ $t('message.includeVat') }}</small>
                      <span>{{ list.offrTotal | priceFormat }}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>{{ $t('message.quoteRequestQty') }}</th>
                    <th>{{ $t('message.completeDeliverQty') }}</th>
                    <th>{{ $t('message.onDeliverQty') }}</th>
                    <th>{{ $t('message.trnPsbBaseQty') }}</th>
                  </tr>
                  <tr v-show="!isBase">
                    <td class="t-r fblue">{{ list.reqOrdTotQty | priceFormat }}</td>
                    <td class="t-r fg">{{ list.trnEndOrdTotQty | priceFormat }}</td>
                    <td class="t-r fg">{{ list.trnIngOrdTotQty | priceFormat }}</td>
                    <td class="t-r fr">{{ list.trnPsbOrdTotQty | priceFormat }}</td>
                  </tr>
                  <tr v-show="isBase">
                    <td class="t-r fblue">{{ list.reqBaseTotQty | priceFormat }}</td>
                    <td class="t-r fg">{{ list.trnEndBaseTotQty | priceFormat }}</td>
                    <td class="t-r fg">{{ list.trnIngBaseTotQty | priceFormat }}</td>
                    <td class="t-r fr">{{ list.trnPsbBaseTotQty | priceFormat }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </swiper-slide>
          <!--  && list.offrStatCd !== offrStatCd.confirm -->
          <swiper-slide v-if="list.offrStatCd !== offrStatCd.proceed" class="quick_btns">
            <button class="btn_quick btn_trash in_img" @click="[cancelDeleteOffr('delete', list), slidePrev(index)]">
              <img src="@m/assets/img/icon_trash.png" />
            </button>
            <button class="btn_quick btn_delete in_img" @click="[cancelDeleteOffr('cancel', list), slidePrev(index)]">
              <img src="@m/assets/img/icon_delete.png" />
            </button>
          </swiper-slide>
        </swiper>
      </div>

      <!-- 하단 버튼 -->
      <div class="bottom_select_result_contents">
        <div class="btn_box">
          <button v-if="authButton.savAuth == 'Y'" class="btn_stock_request" @click="copyOrConfirm('copy')">{{ $t('message.btnRegistCopy') }}</button>
          <button v-if="authButton.fn3Auth == 'Y' && page === 'order'" class="btn_tempsave" @click="copyOrConfirm('confirm')">{{ $t('message.btnConfirm') }}</button>
        </div>
      </div>
    </div>
    <!-- //컨텐츠 바디 -->
    <QuoteSearchModal ref="QuoteSearch" :dashFilter="dashFilter" :page="page" :offrClsCd="offrClsCd" :pageNumber="pageNumber" @resetPageNum="pageNumber = 0" @sendQuoteList="getQuoteList" />
    <DeliveryAddressModal />
    <AlarmModal :name="name" @okOrNo="okOrNo" />
    <AlarmYesModal />
    <HomeTap @goToTop="goToTop" />
  </div>
</template>

<script>
import commonApi from '@/api/common';
import orderApi from '@/api/order/order';
import { mapGetters } from 'vuex';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import QuoteSearchModal from '@m/modal/order/QuoteSearchModal';
import defs from '@/consts/defs';
import DeliveryAddressModal from '@m/modal/order/DeliveryAddressModal';
import AlarmModal from '@m/modal/AlarmModal';
import AlarmYesModal from '@m/modal/AlarmYesModal';
import HomeTap from '@m/components/HomeTap';

export default {
  components: {
    Swiper,
    SwiperSlide,
    QuoteSearchModal,
    DeliveryAddressModal,
    AlarmModal,
    AlarmYesModal,
    HomeTap,
  },
  data() {
    return {
      isBase: false,
      name: 'Order',
      page: '',
      quote_box_height: '',
      swiperOption: {
        initialSlide: 1,
        resistanceRatio: 0,
        slidesPerView: 'auto',
        // allowSlidePrev: true,
      },
      quoteList: [],
      // offrClsCd: defs.offrClsCd.order,
      pageNumber: 0,
      routerPath: '',
      offrStatCd: defs.offrStatCd,
      pageInfo: {},
      el: '',
      dashFilter: '',
    };
  },
  computed: {
    ...mapGetters({
      authButton: 'userInfo/getAuthButton',
      menuList: 'menuList/getMenuListAll',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
    }),
    getQuoteBoxWidth: () => {
      const quoteWidth = document.querySelector('.quote_box').offsetWidth;
      return {
        quoteWidth,
      };
    },
    offrClsCd() {
      return this.page === 'order' ? defs.offrClsCd.order : defs.offrClsCd.sample;
    },
  },
  mounted: function () {},
  methods: {
    goToTop() {
      if (Object.keys(this.el).length > 0) this.el.target.scrollTop = 0;
    },
    handleScroll(el) {
      this.el = el;
      if (Math.ceil(el.target.offsetHeight + el.target.scrollTop) >= el.target.scrollHeight) {
        if (this.pageInfo.finalPageNo - 1 > this.pageNumber) this.pageNumber++;
      }
    },
    getInfoHeight() {
      let val = this.$refs.quote_box_height.scrollHeight;
      // search_box_height 의 높이값 받아온다
      this.quote_box_height = `${val}px`;
      this.quoteSection = `${val}px`;
    },
    getQuoteList(data) {
      if (data.click) {
        window.scrollTo(0, 0);
        this.quoteList = data.list;
      } else if (data.reload) {
        this.quoteList = data.list;
      } else this.quoteList.push(...data.list);
      this.pageInfo = data.page;
    },
    async getAddrInfo(offrId, index) {
      this.$refs.swiper[index].swiperInstance.slideNext(100, () => {});
      try {
        const param = {
          offrId,
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
    cancelDeleteOffr(type, quote) {
      const param = JSON.stringify({
        id: quote.id,
        custId: quote.customerInfo.custId,
      });

      if (type === 'delete') {
        if (quote.offrStatCd === defs.offrStatCd.cancel || quote.offrStatCd === defs.offrStatCd.temp) {
          this.$modal.show('AlarmModalOrder', { message: 'message.msgCheckDelete2', type: `${type}/${param}` });
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgCannotDelete2');
        }
      } else if (type === 'cancel') {
        if (this.userMenuGrpCd !== 'CUSTOMER') {
          if (quote.offrStatCd === defs.offrStatCd.request || quote.offrStatCd === defs.offrStatCd.confirm) {
            this.$modal.show('AlarmModalOrder', { message: 'message.msgCheckCancel', type: `${type}/${param}` });
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgExceptQuote2');
          }
        } else {
          if (quote.offrStatCd === defs.offrStatCd.request) {
            this.$modal.show('AlarmModalOrder', { message: 'message.msgCheckCancel', type: `${type}/${param}` });
          } else if (quote.offrStatCd === defs.offrStatCd.confirm) {
            this.$EventBus.$emit('openYesModal', 'message.errorsCancelOnlySales');
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgExceptQuote2');
          }
        }
      }
    },
    okOrNo(data) {
      if (data.type.includes('delete') && data.result) {
        let param = data.type.split('/');
        param = JSON.parse(param[1]);
        this.quoteDelete(param);
      } else if (data.type.includes('cancel') && data.result) {
        let param = data.type.split('/');
        param = JSON.parse(param[1]);
        this.cancelQuoteCheck(param);
      }
    },
    async quoteDelete(data) {
      try {
        const param = [data];
        const resp = await orderApi.quoteDelete(param);
        this.$EventBus.$emit('openYesModal', resp.data.message);
        this.$refs.QuoteSearch.getQuoteManageList(false, true);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async cancelQuoteCheck(data) {
      try {
        const param = [data];
        const resp = await orderApi.putCancelCheck(param);
        if (resp.data.rs.isVerified) {
          this.cancelQuote(data);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgImpossibleCancel');
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
    async cancelQuote(data) {
      try {
        const param = [data];
        const resp = await orderApi.putQuoteCancel(param);
        this.$EventBus.$emit('openYesModal', resp.data.message);
        this.$refs.QuoteSearch.getQuoteManageList(false, true);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    copyOrConfirm(type) {
      let checkedList = this.quoteList.filter(list => list.checked);
      if (checkedList.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgEmptyQuotation');
      } else if (type === 'copy' && checkedList.length > 1) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoticeCopy');
      } else if (type === 'copy' && checkedList[0].offrStatCd == defs.offrStatCd.temp) {
        this.$EventBus.$emit('openYesModal', 'message.msgCannotCopy');
      } else if (type === 'copy') {
        this.copyRegist(checkedList[0]);
      } else if (type === 'confirm') {
        let notReq = false;
        checkedList.forEach(list => {
          if (list.offrStatCd !== defs.offrStatCd.request) {
            notReq = true;
          }
        });
        if (!notReq) {
          this.quoteConfirm(checkedList);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgUnableConfirm');
        }
      }
    },
    async copyRegist(quote) {
      try {
        const param = {
          id: quote.id,
          custId: quote.customerInfo.custId,
        };
        const resp = await orderApi.putOffrCopy(param);
        this.$EventBus.$emit('openYesModal', resp.data.message);
        this.$refs.QuoteSearch.getQuoteManageList(false, true);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async quoteConfirm(quoteList) {
      try {
        const param = [];
        quoteList.forEach(list => {
          const data = {
            custId: list.customerInfo.custId,
            id: list.id,
            offrNum: list.offrNum,
            offrClsCd: this.page === 'order' ? 'GENR' : 'SMPL',
          };
          param.push(data);
        });

        const resp = await orderApi.confirmQuote(param);
        this.$EventBus.$emit('openYesModal', resp.data.message);
        this.$refs.QuoteSearch.getQuoteManageList(false, true);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    pageMove(quote) {
      let routerPath = '';
      let menuId = 0;
      if (this.page === 'order') {
        if (quote.offrStatCd === defs.offrStatCd.temp) {
          routerPath = '/order/general';
          menuId = this.searchMenuId(routerPath);
          this.$router.push(`${routerPath}?menuId=${menuId}&id=${quote.id}&custId=${quote.customerInfo.custId}`);
        } else {
          routerPath = '/order/general-dtls-list';
          menuId = this.searchMenuId(routerPath);
          this.$router.push(`${routerPath}?menuId=${menuId}&id=${quote.id}&custId=${quote.customerInfo.custId}&salesMngPhoneNum=${quote.salesMngPhoneNum}&custPhoneNum=${quote.customerInfo.custPhoneNum}`);
        }
      } else if (this.page === 'sample') {
        if (quote.offrStatCd === defs.offrStatCd.temp) {
          routerPath = '/order/sample';
          menuId = this.searchMenuId(routerPath);
          this.$router.push(`${routerPath}?menuId=${menuId}&id=${quote.id}&custId=${quote.customerInfo.custId}`);
        } else {
          routerPath = '/order/sample-dtls-list';
          menuId = this.searchMenuId(routerPath);
          this.$router.push(`${routerPath}?menuId=${menuId}&id=${quote.id}&custId=${quote.customerInfo.custId}&salesMngPhoneNum=${quote.salesMngPhoneNum}&custPhoneNum=${quote.customerInfo.custPhoneNum}`);
        }
      }
    },
    searchMenuId(routerPath) {
      let menuId;
      this.menuList.forEach(dept1 => {
        if (dept1.routerPath === routerPath) {
          menuId = dept1.menuId;
        }
        dept1.children.forEach(dept2 => {
          if (dept2.routerPath === routerPath) {
            menuId = dept2.menuId;
          }
          dept2.children.forEach(dept3 => {
            if (dept3.routerPath === routerPath) {
              menuId = dept3.menuId;
            }
          });
        });
      });
      return menuId;
    },
    async getOffrMemo(quote, memoType = 'CUSTOMER') {
      try {
        const param = {
          id: quote.id,
          memoType,
          custId: quote.customerInfo.custId,
        };

        const resp = await orderApi.getOffrMemo(param);
        if (memoType === 'CUSTOMER') {
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
    this.page = this.$route.path.includes('sample') ? 'sample' : 'order';
  },
};
</script>

<style lang="scss" scoped></style>
