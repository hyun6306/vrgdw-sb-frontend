<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt" v-if="page === 'order'">{{ $t('message.quoteRequest') }}</h1>
        <h1 class="logo in_txt" v-else>{{ $t('message.btnRequestSample') }}</h1>
      </div>
      <div class="header_left">
        <button class="btn_header in_img" @click="backButton()"><img src="@m/assets/img/icon_back.png" /></button>
      </div>
      <!-- <div class="header_right">
        <button class="btn_header in_img" @click="openModal('ProductSearch')"><img src="@m/assets/img/icon_search.png" /></button>
      </div> -->
    </div>
    <!-- //상단 헤더 -->

    <!-- 컨텐츠 바디 -->
    <div class="container" @scroll="handleScroll">
      <div class="product_s_contents" style="overflow: unset">
        <div id="TabS">
          <ul class="tab-menu">
            <li v-for="(tab, index) in tabs" v-bind:class="{ active: currentTab === index }" :key="index">
              <a v-on:click="currentTab = index">{{ tab }}</a>
            </li>
          </ul>
          <div class="tab-content">
            <div v-show="currentTab == 0">
              <CustomerInfo ref="CustomerInfo" @sendCustInfo="getCustInfo" :custId="custId" :modifyLogits="modifyLogits" @sendPrdtCdListAndCredit="sendPrdtCdListAndCredit" @offtDt="dt => (offrDt = dt)" />
            </div>
            <!-- 리스트영역 -->
            <div v-show="currentTab == 1">
              <div class="quote_list_contents">
                <div class="item_add_bar">
                  <span>{{ offrDt | vnDateFormatD }}</span>
                  <button class="btn_item_add" @click="openModal('ProductSearch')">{{ $t('message.btnAddPrdt') }}</button>
                </div>
                <!-- 납품희망월 선택 -->
                <div class="delivery_month_select">
                  <label class="chechbox_solo">
                    <input type="checkbox" v-model="allChecked" @change="allCheckedChange" ref="allCheck" />
                    <span class="checkmark"></span>
                  </label>
                  <span class="dms_title">{{ $t('message.applyHopeMonth') }}</span>
                  <div class="form_calendar form_month" @click="openModal('allHopeMonth')">
                    <input type="text" placeholder="" readonly v-model="allDate.show" />
                    <button class="icon_calendar"><img src="@m/assets/img/icon_calendar.png" /></button>
                  </div>
                </div>
                <!-- 리스트 -->
                <section :class="[page === 'order' ? 'quote_list_section' : 'sample_list_section']">
                  <div class="quote_list_box" v-for="(prdt, index) in productList.slice(0, limit)" :key="index">
                    <div class="a-r">
                      <button class="btn_list_bookmark" @click="changeFavorite(prdt)" :class="{ bookmark_on: prdt.favoritYn === 'Y' }" v-if="authButton.schAuth === 'N'"></button>
                      <button :class="[!prdt.priceStat ? 'btn_detail' : prdt.priceStat.disbleYn !== 'Y' ? 'btn_detail' : 'btn_detail btn_no_sell']" @click="productDetail(prdt)">{{ prdt.prdtCd }}</button>
                      <span class="delivery_month">
                        <i class="in_img"><img src="@m/assets/img/icon_truck.png" /></i>
                        {{ prdt.trnExptDt | vnDateFormatD }}
                      </span>
                      <div class="form_calendar form_month ml-a" @click="openModal('chooseHopeMonth', index)" v-if="!prdt.priceStat ? true : prdt.priceStat.disbleYn !== 'Y' ? true : false">
                        <input type="text" placeholder="" readonly v-model="prdt.date.show" />
                        <button class="icon_calendar"><img src="@m/assets/img/icon_calendar.png" /></button>
                      </div>
                    </div>
                    <div class="check_product">
                      <label class="chechbox_basic">
                        <input type="checkbox" v-model="prdt.checked" ref="prdtCheck" @change="checkedChange" />
                        <span class="checkmark"></span>
                      </label>
                      <span class="product_txt">{{ prdt.prdtNm }}</span>
                    </div>
                    <div class="order_count_box">
                      <span v-if="!prdt.priceStat ? true : prdt.priceStat.disbleYn !== 'Y' ? true : false">{{ $t('message.reqQty') }}</span>
                      <div class="order_count" v-if="!prdt.priceStat ? true : prdt.priceStat.disbleYn !== 'Y' ? true : false">
                        <button @click="upDwQty('down', index, prdt)" @touchstart.stop.prevent="touchStart('down', index, prdt)" @touchend="touchEnd('down')" class="btn_minus"></button>
                        <input type="text" v-if="prdt.isBase" v-model="prdt.reqBaseQty" id="" class="t-r" @click="keyPadUp(index, prdt)" readonly />
                        <input type="text" v-else v-model="prdt.reqOrdQty" id="" class="t-r" @click="keyPadUp(index, prdt)" readonly />
                        <button @click="upDwQty('up', index, prdt)" @touchstart.stop.prevent="touchStart('up', index, prdt)" @touchend="touchEnd('up')" class="btn_plus"></button>
                      </div>
                      <div class="btns_unit" v-if="!prdt.priceStat ? true : prdt.priceStat.disbleYn !== 'Y' ? true : false">
                        <button :class="[prdt.isBase ? 'on' : '']" @click="(prdt.isBase = true), (update = Math.random())">{{ $t('message.sheetQty') }}</button>
                        <button v-if="page === 'order'" :class="[!prdt.isBase ? 'on' : '']" @click="(prdt.isBase = false), (update = Math.random())">{{ $t('message.bundleQty') }}</button>
                      </div>
                      <button class="btn_delete_quote in_img" v-if="page === 'order' && authButton.delAuth == 'Y'" @click="openModal('deleteProductOne', index)"><img src="@m/assets/img/icon_close.png" /></button>
                    </div>
                    <!-- <div class="price_box">
              <span class="price_box_title">단가</span>
              <div class="list_form unit_price">
                <span class="arrow in_img">
                 
                  <img src="@m/assets/img/arrow_down.png" />
                </span>
                
                <input type="number" id="" class="t-r price_down" placeholder="1,000,000" readonly />
              </div>
              <span class="price_box_title">금액</span>
              <div class="list_form total_price">
                <input type="number" id="" class="t-r" placeholder="10,000,000,000" readonly />
              </div>
              <span class="sub_txt">VAT 별도</span>
              <button class="btn_delete_quote in_img"><img src="@m/assets/img/icon_close.png" /></button>
            </div> -->
                    <div class="price_box" v-if="page === 'sample'">
                      <MultiSelect id="" style="width: 40%" class="essential" label="text" v-model="prdt.sizeChgYn" :options="sampleOption" @input="changeSize(index, prdt)" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="" :allow-empty="false"></MultiSelect>
                      <span class="essential" style="width: 20%">
                        <input type="text" class="d_input t-r" v-model="prdt.smplVtclSize" :disabled="prdt.sizeChgYn.value === 'N'" @blur="checkSize(prdt, 'vtcl')" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                      </span>
                      <input type="text" class="d_input t-r" style="width: 20%" v-model="prdt.smplHrsnSize" :disabled="prdt.sizeChgYn.value === 'N'" @blur="checkSize(prdt, 'hrsn')" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                      <input type="text" id="" style="width: 20%" class="t-r" placeholder="" v-model="prdt.smplTsk" :disabled="prdt.sizeChgYn.value === 'N'" @blur="checkSize(prdt, 'tsk')" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                      <button class="btn_delete_quote in_img" @click="openModal('deleteProductOne', index)"><img src="@m/assets/img/icon_close.png" /></button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <!-- 하단 버튼 -->
            <div class="bottom_select_result_contents" v-if="currentTab === 1">
              <button class="btn_over" @click="priceSellOpen = !priceSellOpen" :class="{ priceSell_open: priceSellOpen }"><img src="@m/assets/img/btn_over_up.png" /></button>
              <div class="price_sell_section" :class="{ priceSell_open: priceSellOpen }">
                <div class="price_sell_box">
                  <!-- <p class="guide_txt">
                    <span>{{ $t('message.salesAmount') }}</span>
                    <small>(VND)</small>
                  </p> -->
                  <ul class="price_result">
                    <!-- <li class="price_txt">
                      <small>{{ $t('message.separateVat') }}</small>
                      <strong>{{ totalOffrPrice | priceFormat }}</strong>
                    </li> -->
                    <li class="quote_request_box" v-if="page === 'order' && authButton.savAuth == 'Y'" @click="saveBefore('req')">
                      <button class="btn_quote_request">
                        {{ $t('message.quoteRequest') }}
                      </button>
                      <span class="quote_item"
                        >{{ $t('message.item') }}:<i>{{ productList.length }}</i></span
                      >
                    </li>
                    <li class="quote_request_box" v-if="page === 'sample' && authButton.savAuth == 'Y'" @click="saveBefore('req')">
                      <button class="btn_quote_request">
                        {{ $t('message.btnRequestSample') }}
                      </button>
                      <span class="quote_item"
                        >{{ $t('message.item') }}:<i>{{ productList.length }}</i></span
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="btn_box">
                <button class="btn_reset" @click="openModal('resetProduct')">{{ $t('message.btnInit') }}</button>
                <button class="btn_tempsave" @click="saveBefore('temp')" v-if="!isReqQuotation && authButton.savAuth == 'Y'">{{ $t('message.btnTemporarySave') }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="false"><input type="text" placeholder="" readonly v-model="update" /></div>
    <!-- //컨텐츠 바디 -->
    <ProductSearch @addProductList="addProductList" :custId="custId" :prdtCdList="prdtCdList" @close="showMain = true" :page="page" />
    <ProductDetail :productDetailOpen="productDetailOpen" :prdt="productInfo" @closeProductDetail="closeProductDetail" />
    <AlarmModal @okOrNo="okOrNo" :name="name" />
    <DatePickerModal @chooseAllMonth="chooseAllMonth" @chooseMonth="chooseMonth" :before="true" :isDefault="false" :afterDate="afterDate" />
    <KeyPad :sendKeyPad="sendKeyPad" @sendQty="getQty" />
    <HomeTap @goToTop="goToTop" :showMain="showMain" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductDetail from '@m/components/order/general/ProductDetail'; //제품상세
import CustomerInfo from '@m/components/order/general/CustomerInfo';
import ProductSearch from '@m/modal/order/ProductSearch';
import AlarmModal from '@m/modal/AlarmModal';
import DatePickerModal from '@m/modal/DatePickerModal';
import KeyPad from '@m/components/KeyPad';
import defs from '@/consts/defs';
import orderApi from '@/api/order/order';
import productApi from '@/api/order/product';
import { loadLanguageAsync } from '@/plugins/i18n';
import HomeTap from '@m/components/HomeTap';

export default {
  components: {
    ProductDetail,
    CustomerInfo,
    ProductSearch,
    AlarmModal,
    DatePickerModal,
    KeyPad,
    HomeTap,
  },
  data() {
    return {
      currentTab: 0,
      tabs: [this.$t('message.orderInfo'), this.$t('message.prdtsList')],
      name: 'Order',
      priceSellOpen: false,
      bookmark: false,
      productInfo: {},
      productDetailOpen: false,
      productList: [],
      allChecked: false,
      checkedCount: 0,
      allDate: {},
      update: '',
      sendKeyPad: {},
      deleteProductIds: [],
      selectCustId: '',
      totalOffrPrice: 0,
      userInfo: {},
      limit: 10,
      prdtCdList: [],
      credit: {},
      isReqQuotation: false,
      modifyLogits: {},
      page: '',
      sampleOption: [
        { value: 'N', text: this.$t('message.standard') },
        { value: 'Y', text: this.$t('message.custom') },
      ],
      intervalId: null,
      menuId: 0,
      offrDt: '',
      el: '',
      showMain: true,
      afterDate: '',
    };
  },
  computed: {
    ...mapGetters({
      userCustId: 'userInfo/getUserCustId',
      authButton: 'userInfo/getAuthButton',
    }),
    custId() {
      if (this.userCustId) {
        return this.userCustId;
      } else if (this.selectCustId) {
        return this.selectCustId;
      } else {
        return -1;
      }
    },
  },
  methods: {
    goToTop() {
      if (Object.keys(this.el).length > 0) this.el.target.scrollTop = 0;
    },
    changeFavorite(prdt) {
      if (prdt.favoritYn === 'Y') {
        prdt.favoritYn = 'N';
      } else {
        prdt.favoritYn = 'Y';
      }
      this.saveProductFavorite(prdt);
    },
    async saveProductFavorite(prdt) {
      try {
        const param = {
          prdtCd: prdt.prdtCd,
          useYn: prdt.favoritYn,
        };
        await productApi.saveProductFavorite(param);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
        if (prdt.favoritYn === 'Y') {
          prdt.favoritYn = 'N';
        } else {
          prdt.favoritYn = 'Y';
        }
      }
    },
    handleScroll(el) {
      this.el = el;
      if (Math.ceil(el.target.offsetHeight + el.target.scrollTop) >= el.target.scrollHeight) {
        this.limit += 10;
      }
    },
    productDetail(prdt) {
      this.productDetailOpen = true;
      this.productInfo = prdt;
    },
    closeProductDetail() {
      this.productDetailOpen = false;
      this.productInfo = {};
    },
    currentProductList() {
      return this.productList;
    },
    addProductList(productList) {
      productList.forEach((prdt, index) => {
        if (index === 0) {
          this.afterDate = prdt.trnExptDt;
        }
        prdt.checked = false;
        prdt.date = {};
        prdt.isBase = true;
        if (this.page === 'sample') {
          prdt.sizeChgYn = this.sampleOption.find(option => option.value === prdt.sizeChgYn);
          if (prdt.sizeChgYn.value === 'N') {
            prdt.smplHrsnSize = prdt.hrsnSpec;
            prdt.smplVtclSize = prdt.vtclSpec;
            prdt.smplTsk = prdt.tskSpec;
          }
        }
      });

      this.productList = [...this.productList, ...productList];
    },
    allCheckedChange(event) {
      this.productList.forEach((prdt, index) => {
        prdt.checked = event.target.checked;
        this.$refs.prdtCheck[index].checked = event.target.checked;
      });
      if (event.target.checked) {
        this.checkedCount = this.productList.length;
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

      if (this.checkedCount === this.productList.length) {
        this.allChecked = true;
        this.$refs.allCheck.checked = true;
      } else {
        this.allChecked = false;
        this.$refs.allCheck.checked = false;
      }
    },
    openModal(type, index = -1) {
      if (type === 'resetProduct') {
        if (this.validation()) {
          this.$modal.show('AlarmModalOrder', { message: 'message.msgWarnInit', type });
        }
      } else if (type === 'allHopeMonth') {
        let result = this.validation(type);

        if (!result.noProduct && result.validation) {
          this.$modal.show('DatePicker', { type, currentDate: this.allDate, page: 'order' });
        }
      } else if (type === 'chooseHopeMonth') {
        this.$modal.show('DatePicker', { type, currentDate: this.productList[index].date, index, page: 'order' });
      } else if (type === 'ProductSearch') {
        if (this.custId === -1) {
          this.$EventBus.$emit('openYesModal', 'message.msgNoCustId');
        } else {
          this.openPopup('ProductSearch');
          // this.$modal.show('ProductSearch');
        }
      } else if (type === 'deleteProductOne') {
        this.$modal.show('AlarmModalOrder', { message: 'message.msgWarnDelete', type, index });
      } else if (type === 'backPage') {
        this.$modal.show('AlarmModalOrder', { message: 'message.msgWarnMove', type });
      }
    },
    okOrNo(data) {
      if (data.type === 'resetProduct' && data.result) {
        this.resetProduct();
      } else if (data.type.includes('allMonth') && data.result) {
        let date = data.type.split('/');
        date = JSON.parse(date[1]);
        this.allDate = date;
        this.productList.forEach(prdt => {
          if (prdt.checked) {
            prdt.date = date;
            prdt.trnHopeDt = date.date;
          }
        });
      } else if ((data.type === 'req' || data.type === 'temp') && data.result) {
        this.saveAfter(data.type);
      } else if (data.type === 'deleteProductOne' && data.result) {
        this.deleteProduct(data.index);
      } else if (data.type === 'backPage' && data.result) {
        this.$router.go(-1);
      }
    },
    resetProduct() {
      this.allChecked = false;
      this.$refs.allCheck.checked = false;
      this.productList = [];
    },
    chooseAllMonth(data) {
      let existHopeMonth = false;
      this.productList.forEach(prdt => {
        if (prdt.trnHopeDt) existHopeMonth = true;
      });
      if (existHopeMonth) {
        let date = JSON.stringify(data);
        this.$modal.show('AlarmModalOrder', { message: 'message.msgWarnChange', type: `allMonth/${date}` });
      } else {
        this.allDate = data;
        this.productList.forEach(prdt => {
          if (prdt.checked) {
            prdt.date = data;
            prdt.trnHopeDt = data.date;
          }
        });
      }
    },
    chooseMonth(data) {
      this.update = data;
      let index = data.index;
      delete data['index'];
      this.productList[index].trnHopeDt = data.date;
      this.productList[index].date = data;
    },
    qtyCheck(prdt, inputQty) {
      if (prdt.prdtClsCd === 'MDF' && inputQty > 300000) {
        this.$EventBus.$emit('openYesModal', 'message.msgMdfOverQty');
        return false;
      } else if (prdt.prdtClsCd === 'MFB' && inputQty > 100000) {
        this.$EventBus.$emit('openYesModal', 'message.msgMfbOverQty');
        return false;
      } else {
        return true;
      }
    },
    keyPadUp(index = -1, prdt) {
      this.sendKeyPad = {
        open: true,
        index,
        currentQty: prdt.isBase ? prdt.reqBaseQty : prdt.reqOrdQty,
      };
      this.sendKeyPad = JSON.parse(JSON.stringify(this.sendKeyPad));
    },
    getQty(data) {
      let index = data.index;

      if (data.confirm) {
        this.sendKeyPad = {
          open: false,
          index: -1,
        };
        this.calculQty(this.productList[index], data.inputQty, data.currentQty);
      } else if (data.cancel) {
        this.sendKeyPad = {
          open: false,
          index: -1,
        };
        if (this.productList[index].isBase) {
          this.productList[index].reqBaseQty = data.currentQty;
        } else {
          this.productList[index].reqOrdQty = data.currentQty;
        }
      } else {
        if (this.productList[index].isBase) {
          this.productList[index].reqBaseQty = data.inputQty;
        } else {
          this.productList[index].reqOrdQty = data.inputQty;
        }
      }
      this.update = data;
    },
    upDwQty(type, index, prdt) {
      let inputQty = '';
      if (!prdt.reqBaseQty) prdt.reqBaseQty = 0;
      if (!prdt.reqOrdQty) prdt.reqOrdQty = 0;

      if (type === 'down') {
        if (prdt.isBase) {
          if (prdt.reqBaseQty === 0) return;
          inputQty = prdt.reqBaseQty * 1 - 1;
        } else {
          if (Math.floor(prdt.reqOrdQty) === 0) return;
          inputQty = Math.floor(prdt.reqOrdQty) * 1 - 1;
        }
      } else if (type === 'up') {
        if (prdt.isBase) {
          inputQty = prdt.reqBaseQty * 1 + 1;
        } else {
          let ordQty = Math.floor(prdt.reqOrdQty) * 1;
          if (this.qtyCheck(prdt, ordQty + 1)) inputQty = ordQty + 1;
          else inputQty = ordQty;
        }
      }
      this.calculQty(prdt, inputQty, inputQty - 1);
      this.update = inputQty;
    },
    calculQty(prdt, inputQty, currentQty = '') {
      let ordUnitNmrtr = prdt.ordUnitNmrtr;
      let ordUnitDenom = prdt.ordUnitDenom;
      let updateQty = 0;
      if (prdt.isBase) {
        if (this.qtyCheck(prdt, Math.round((ordUnitNmrtr / ordUnitDenom) * inputQty * 1000) / 1000)) updateQty = inputQty;
        else updateQty = currentQty;
        prdt.reqBaseQty = updateQty;
        prdt.reqOrdQty = Math.round((ordUnitNmrtr / ordUnitDenom) * updateQty * 1000) / 1000;
      } else {
        if (this.qtyCheck(prdt, inputQty)) updateQty = inputQty;
        else updateQty = currentQty;
        prdt.reqOrdQty = updateQty;
        if (updateQty % 1 === 0) {
          prdt.reqBaseQty = (updateQty * ordUnitDenom) / ordUnitNmrtr;
        }
      }
      prdt.reqOffrPrice = prdt.aplyPrice * prdt.reqBaseQty;
      this.calculTotalPrice();
    },
    deleteProduct(index) {
      if (this.productList[index].id) {
        this.deleteProductIds.push(this.productList[index].id);
      }
      this.productList.splice(index, 1);
      this.calculTotalPrice();
    },
    getCustInfo(selectCust) {
      this.selectCustId = selectCust.custId;
    },
    calculTotalPrice() {
      this.totalOffrPrice = 0;
      this.productList.forEach(list => {
        if (list.reqOffrPrice) this.totalOffrPrice += list.reqOffrPrice;
      });
    },
    saveBefore(type) {
      if (this.custId * 1 > 0) {
        this.userInfo = this.$refs.CustomerInfo.sendOrderInfo();
        delete this.userInfo.logits['updatedAt'];

        let result = '';
        if (this.page === 'order') {
          result = this.validation(type, this.userInfo);
        } else if (this.page === 'sample') {
          result = this.validationSample(type, this.userInfo);
        }

        if (!result.validation && !result.noProduct) {
          this.$EventBus.$emit('openYesModal', result.message);
          // } else if (result.updwn) {
          //   this.$modal.show('AlarmModalOrder', { message: result.message, type });
        } else if (result.mfb) {
          this.$modal.show('AlarmModalOrder', { message: result.message, type });
        } else if (!result.noProduct) {
          this.saveAfter(type);
        }
      } else {
        this.$EventBus.$emit('openYesModal', 'message.msgNoCustId');
      }
    },
    async saveAfter(type) {
      try {
        if (!this.userInfo.logits.custId) this.userInfo.logits.custId = this.custId;
        if (this.userInfo.logits.carType.value === 'VRGDW' && this.userInfo.logits.mainLogitsYn === 'Y' && this.authButton.schAuth === 'N') {
          this.userInfo.logits.cityCd = this.userInfo.cityCd;
          this.userInfo.logits.distrCd = this.userInfo.distrCd;
          await orderApi.saveUserLogitsBaseAddr(this.userInfo.logits);
        }
        if (this.userInfo.logits.carType.value === 'MAIL' || this.userInfo.logits.carType.value === 'SALES') this.userInfo.custId = this.custId;
        this.userInfo.trnCarType = this.userInfo.logits.carType.value;
        let logits = {};

        if (this.userInfo.trnCarType === 'CUSTOMER') {
          logits.trnCarNum = this.userInfo.logits.trnCarNum;
          logits.driverPhoneNum = this.userInfo.logits.driverPhoneNum;
          logits.custId = this.userInfo.logits.custId;
        } else {
          logits = this.userInfo.logits;
        }
        delete this.userInfo['logits'];
        delete logits['id'];

        if (this.page == 'order') {
          this.userInfo.offrClsCd = defs.offrClsCd.order;
        } else if (this.page == 'sample') {
          this.userInfo.offrClsCd = defs.offrClsCd.sample;
        }

        let offrStatCd = '';

        if (type === 'temp') {
          offrStatCd = defs.offrStatCd.temp;
        } else if (type === 'req') {
          offrStatCd = defs.offrStatCd.request;
        }

        this.productList.forEach(list => {
          list.offrDtlsStatCd = offrStatCd;
          list.trnPropDt = list.trnExptDt;
          if (!list.trnHopeDt) {
            if (list.trnPropDt) list.trnHopeDt = list.trnPropDt;
          }
          if (list.prdtClsCd === 'MDF') {
            this.userInfo.prdtClsCd = 'ADM0_MDF';
          } else if (list.prdtClsCd === 'MFB') {
            this.userInfo.prdtClsCd = 'AMN0_MFB';
          }
          if (this.page === 'sample') {
            list.sizeChgYn = list.sizeChgYn.value;
          }
        });

        this.userInfo.offrStatCd = offrStatCd;
        if (this.page === 'order') {
          this.userInfo.paymentCond = this.credit.apprCond;
        }
        const param = {
          ...logits,
          ...this.userInfo,
        };

        param['offerDtlsDtoList'] = this.productList;
        param['removeOffrDtlsIds'] = this.deleteProductIds;
        if (Object.keys(this.modifyLogits).length > 0) {
          param['id'] = this.modifyLogits.id;
        }

        const resp = await orderApi.saveOffer(param);

        if (type === 'req') {
          this.productList = [];
          this.$EventBus.$emit('openYesModal', 'message.msgPassRequest');
          this.allChecked = false;
          this.totalOffrPrice = 0;
          this.limit = 10;
          this.priceSellOpen = false;
        } else if (type === 'temp') {
          this.getOfferDetail(resp.data.rs.id);
          this.$EventBus.$emit('openYesModal', 'message.msgPassTempRequest');
        }
        this.isReqQuotation = false;
        this.deleteProductIds = [];
        this.userInfo = {};
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
    validation(type, userInfo = {}) {
      const logits = userInfo.logits;
      const result = { validation: true, message: '', updwn: false, mfb: false, noProduct: false };

      let checkedCount = 0;
      this.productList.forEach(list => {
        if (list.checked) checkedCount++;
      });

      if (this.productList.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoProduct');
        result.noProduct = true;
        return result;
      } else if (type === 'allHopeMonth' && checkedCount === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoProduct');
        result.validation = false;
        return result;
      } else if (type === 'allHopeMonth') {
        return result;
      } else if (type === 'req' || type === 'temp') {
        for (let i = 0; i < this.productList.length; i++) {
          if (this.productList[i].priceStat && this.productList[i].priceStat.aplyPrice === 0) {
            result.validation = false;
            result.message = 'message.msgProductNoPrice';
            return result;
          } else if (this.productList[i].priceStat && this.productList[i].priceStat.disbleYn === 'Y') {
            result.validation = false;
            result.message = 'message.msgUnsellableProduct';
            return result;
          } else if (this.productList[i].reqBaseQty === 0 || !this.productList[i].reqBaseQty) {
            result.validation = false;
            result.message = 'message.msgRequireRowPrice';
            return result;
          } else if (this.productList[i].prdtClsCd === 'MFB') {
            result.mfb = true;
            result.message = 'message.msgCheckPattern';
          }
          // else if (this.productList[i].priceStat && this.productList[i].priceStat.updwn !== 'N/A') {
          //   result.updwn = true;
          //   result.message = 'message.msgChangeStandard';
          // }
        }

        if (!logits.carType.value) {
          result.validation = false;
          result.message = 'message.msgNoCarType';
          return result;
        } else if (logits.carType.value === 'CUSTOMER') {
          if (!logits.driverPhoneNum || logits.driverPhoneNum === '' || !logits.trnCarNum || logits.trnCarNum === '') {
            result.validation = false;
            result.message = 'message.msgNoCarVrgdwInfo';
            return result;
          }
        } else if (logits.carType.value === 'VRGDW') {
          if (!logits.logitsAlias || logits.logitsAlias === '' || !logits.cityCd || logits.cityCd === '' || !logits.distrCd || logits.distrCd === '' || !logits.addr || logits.addr === '' || !logits.phoneNum1 || logits.phoneNum1 === '--') {
            result.validation = false;
            result.message = 'message.msgNoCarCustomerInfo';
            return result;
          }
        }

        if (!userInfo.custPoNum || userInfo.custPoNum === '') {
          result.validation = false;
          result.message = 'message.msgNoPoNum';
          return result;
        }

        return result;
      }
      return true;
    },
    validationSample(type, userInfo = {}) {
      const logits = userInfo.logits;
      const result = { validation: true, message: '', noProduct: false };

      if (this.productList.length === 0) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoProduct');
        result.noProduct = true;
        return result;
      }
      for (let i = 0; i < this.productList.length; i++) {
        if (this.productList[i].reqBaseQty === 0 || !this.productList[i].reqBaseQty) {
          result.validation = false;
          result.message = 'message.msgRequireRowPrice';
          return result;
        } else if (this.productList[i].smplHrsnSize === 0 || this.productList[i].smplVtclSize === 0 || this.productList[i].smplTsk === 0) {
          result.validation = false;
          result.message = 'message.msgRequireSize';
          return result;
        }
      }

      if (!logits.carType.value) {
        result.validation = false;
        result.message = 'message.msgNoCarType';
        return result;
      } else if (logits.carType.value === 'CUSTOMER') {
        if (!logits.driverPhoneNum || logits.driverPhoneNum === '' || !logits.trnCarNum || logits.trnCarNum === '') {
          result.validation = false;
          result.message = 'message.msgNoCarVrgdwInfo';
          return result;
        }
      } else if (logits.carType.value === 'VRGDW') {
        if (!logits.logitsAlias || logits.logitsAlias === '' || !logits.cityCd || logits.cityCd === '' || !logits.distrCd || logits.distrCd === '' || !logits.addr || logits.addr === '' || !logits.phoneNum1 || logits.phoneNum1 === '--') {
          result.validation = false;
          result.message = 'message.msgNoCarCustomerInfo';
          return result;
        }
      }
      if (!userInfo.custPoNum || userInfo.custPoNum === '') {
        result.validation = false;
        result.message = 'message.msgNoPoNum';
        return result;
      }

      if (!result.validation) {
        return result;
      }
      return result;
    },
    async getOfferDetail(id) {
      try {
        const param = {
          custId: this.custId,
          id,
          pageNumber: '',
          pageSize: '',
        };
        const resp = await orderApi.getOfferDetail(param);
        resp.data.ds.forEach(list => {
          list.date = {};
          list.date['show'] = this.$vnDateFormatD(list.trnHopeDt);
          list.trnExptDt = list.trnPropDt;
          list.isBase = true;
          if (this.page === 'sample') {
            list.sizeChgYn = this.sampleOption.find(option => option.value === list.sizeChgYn);
          }
        });
        this.productList = resp.data.ds;
        this.modifyLogits = resp.data.rs;
        this.modifyLogits.id = id;
        if (this.productList.length > 0) {
          this.modifyLogits['custReqRemark'] = this.productList[0].custReqRemark;
          this.modifyLogits['custPoNum'] = this.productList[0].custPoNum;
        }
        this.isReqQuotation = this.productList.some(row => row.offrStatCd === defs.offrStatCd.request);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    sendPrdtCdListAndCredit(data) {
      this.prdtCdList = data.prdtCdList;
      this.credit = data.credit;
    },
    resetModifyLogits() {
      this.modifyLogits = {};
    },
    changeSize(index, prdt) {
      if (prdt.sizeChgYn.value === 'Y') {
        prdt.smplHrsnSize = '';
        prdt.smplVtclSize = '';
        prdt.smplTsk = '';
      } else {
        prdt.smplHrsnSize = prdt.hrsnSpec;
        prdt.smplVtclSize = prdt.vtclSpec;
        prdt.smplTsk = prdt.tskSpec;
      }
    },
    checkSize(prdt, type) {
      if (type === 'vtcl') {
        if (prdt.smplVtclSize > prdt.vtclSpec) {
          this.$EventBus.$emit('openYesModal', 'message.msgOverSize');
          prdt.smplVtclSize = '';
        }
      } else if (type === 'hrsn') {
        if (prdt.smplHrsnSize > prdt.hrsnSpec) {
          this.$EventBus.$emit('openYesModal', 'message.msgOverSize');
          prdt.smplHrsnSize = '';
        }
      } else if (type === 'tsk') {
        if (prdt.smplTsk > prdt.tskSpec) {
          this.$EventBus.$emit('openYesModal', 'message.msgOverThick');
          prdt.smplTsk = '';
        }
      }
      this.update = Math.random();
    },
    backButton() {
      if (this.productList.length === 0) {
        this.$router.go(-1);
      } else {
        this.openModal('backPage');
      }
    },
    touchStart(type, index, prdt) {
      this.intervalId = setInterval(this.upDwQty, 50, type, index, prdt);
    },
    touchEnd() {
      clearInterval(this.intervalId);
    },
    async openPopup(modalNm) {
      let url = '';
      if (modalNm === 'ProductSearch') {
        url = '/modal/product/add';
        this.showMain = false;
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
      this.$modal.show(modalNm);
    },
  },
  created() {
    if (this.$route.query.id) {
      this.selectCustId = this.$route.query.custId;

      this.getOfferDetail(this.$route.query.id);
    }
    this.menuId = this.$route.query.menuId;
    this.page = this.$route.path.includes('sample') ? 'sample' : 'order';
  },
};
</script>

<style></style>
