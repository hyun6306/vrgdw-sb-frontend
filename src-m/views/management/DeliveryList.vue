<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">{{ $t('message.deliveryList') }}</h1>
      </div>
      <div class="header_left">
        <button class="btn_header in_img" @click="$router.go(-1)"><img src="@m/assets/img/icon_back.png" /></button>
      </div>
      <div class="header_right"></div>
    </div>
    <!-- //상단 헤더 -->

    <!-- 컨텐츠 바디 -->
    <div class="container">
      <!-- 배송지 검색 -->
      <div class="quote_detail_contents">
        <button class="btn_folding" @click="searchOpen = !searchOpen" :class="{ quote_open: searchOpen }">
          <p class="quote_title">
            <strong>{{ $t('message.search') }}</strong>
          </p>
          <i class="in_img" style="margin-left: auto"><img src="@m/assets/img/icon_up.png" /></i>
        </button>

        <section class="quote_detail_section" :class="{ quote_open: searchOpen }">
          <div class="deliverylist_search_contents pa-0">
            <div class="list_form_section">
              <ul class="list_ul">
                <li class="list_li" v-if="userMenuGrpCd !== 'CUSTOMER'">
                  <label class="list_title">{{ $t('message.custNm') }}</label>
                  <span class="nbtn_form">
                    <input type="text" placeholder="" v-model="custNm" />
                    <button class="btn_search_icon in_img" @click="searchCustomer"><img src="@m/assets/img/icon_search_w.png" /></button>
                  </span>
                </li>
                <li class="list_li">
                  <label class="list_title">{{ $t('message.cityNm') }}</label>
                  <span class="list_form">
                    <MultiSelect id="Material_Group" v-model="cityValue" :options="cityOption" @input="changeCityCd()" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
                  </span>
                </li>
                <li class="list_li">
                  <label class="list_title">{{ $t('message.distrNm') }}</label>
                  <span class="list_form">
                    <MultiSelect id="Material_Group" v-model="distrValue" :options="distrOption" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
                  </span>
                </li>
                <li class="list_li">
                  <label class="list_title">{{ $t('message.search') }}</label>
                  <span class="nbtn_form">
                    <input type="text" id="" class="" :placeholder="$t('message.msgInfoSearch')" v-model="filter" @keyup.enter="getDeliveryList('search')" />
                    <button class="btn_search" v-if="authButton.schAuth == 'Y'" @click="getDeliveryList('search')">{{ $t('message.btnSearch') }}</button>
                  </span>
                </li>
              </ul>
            </div>

            <!-- <div class="delivery_area" v-if="userMenuGrpCd !== 'CUSTOMER'">
              <span>{{ $t('message.custNm') }}</span>
              <div class="form_searchm">
                <input type="text" placeholder="" v-model="custNm" />
                <button class="icon_search in_img" @click="searchCustomer"><img src="@m/assets/img/icon_search_w.png" /></button>
              </div>
            </div>
            <div class="delivery_area">
              <span>{{ $t('message.cityNm') }}</span>
              <MultiSelect id="Material_Group" v-model="cityValue" :options="cityOption" @input="changeCityCd()" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
            </div>
            <div class="delivery_area">
              <span>{{ $t('message.distrNm') }}</span>
              <MultiSelect id="Material_Group" v-model="distrValue" :options="distrOption" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
            </div>
            <div class="search_form">
              <input type="text" id="" class="" :placeholder="$t('message.msgInfoSearch')" v-model="filter" @keyup.enter="getDeliveryList('search')" />
              <button class="btn_search" v-if="authButton.schAuth == 'Y'" @click="getDeliveryList('search')">{{ $t('message.btnSearch') }}</button>
            </div> -->

            <!-- 검색결과 -->

            <!-- //검색결과 -->
          </div>
        </section>
      </div>
      <div class="quote_detail_list_contents" style="padding-bottom: 0">
        <div class="qdl_head">
          <label class="chechbox_basic">
            <strong
              ><i>{{ this.deliveryList.length }}</i></strong
            >
            {{ $t('message.totalSelection2') }}
          </label>

          <div class="btns_unit ml-a" v-if="authButton.fn1Auth == 'Y'">
            <button class="on" style="width: auto" @click="chgLogits(null)">
              {{ $t('message.addLogits') }}
            </button>
          </div>
        </div>
      </div>
      <!-- 검색결과가 없습니다. -->
      <div class="no_result" v-if="listNull">
        <span>{{ $t('message.gridMessageNoSearch') }}</span>
      </div>
      <!-- //검색결과가 없습니다. -->
      <!-- 배송지 목록 -->
      <div class="quote_list_contents deliverylist_contents">
        <swiper class="deliverylist_section swiper" :options="swiperOption" ref="swiper" v-for="(list, index) in deliveryList" :key="index">
          <swiper-slide class="quick_btns02">
            <button class="btn_quick btn_call in_img" @click="slideNext(index)">
              <a v-if="list.phoneNum1" :href="`tel:${list.phoneNum1}`" class="btn_call">
                <img src="@m/assets/img/icon_call_w.png" />
              </a>
              <span>{{ $t('message.call') }}</span>
            </button>
          </swiper-slide>
          <swiper-slide class="deliverylist_box" :class="[list.mainLogitsYn === 'Y' ? 'quote_list_box quote_complete' : '']">
            <div @click="chgLogits(list)">
              <div class="deliverylist_head">
                <p class="deliverylist_head_info">
                  <!-- <span class="address_default" v-if="list.mainLogitsYn == 'Y'">{{ $t('message.mainLogits') }}</span> -->
                  <span class="point">{{ list.logitsAlias }}</span>
                </p>
              </div>
              <div class="deliverylist_head">
                <p class="deliverylist_head_info">
                  <span class="manager">{{ $t('message.chargNm') }}</span>
                  <span class="manager_name">{{ list.trnMngNm }}</span>
                </p>
              </div>
              <div class="deliverylist_info">
                <p class="detail_info">
                  <span>{{ list.cityNm }}</span>
                  <i> / </i>
                  <span>{{ list.distrNm }}</span>
                </p>
                <span>{{ list.addr }}</span>
                <span>
                  <i>{{ list.phoneNum1 }}</i>
                  <i> / </i>
                  <i>{{ list.phoneNum2 }}</i>
                </span>
                <div class="special_note">
                  <span>[{{ $t('message.noteRemark') }}]</span>
                  <strong>{{ list.logitsRemark }}</strong>
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide class="quick_btns02">
            <button class="btn_quick btn_trash in_img" @click="[openModal('remove', index), slidePrev(index)]">
              <img src="@m/assets/img/icon_trash.png" />
              <span>{{ $t('message.btnDelete') }}</span>
            </button>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- //컨텐츠 바디 -->
    <AlarmModal :name="name" @okOrNo="okOrNo" />
    <DeliveryRegistModal ref="deliveryRegistModal" :mainYn="mainYn" />
    <CustomerSearchModal ref="CustomerSearch" @sendCustInfo="getCustInfo" />
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { mapGetters } from 'vuex';
import orderApi from '@/api/order/order.js';
import AlarmModal from '@m/modal/AlarmModal';
import DeliveryRegistModal from '@m/modal/management/DeliveryRegistModal';
import commonApi from '@/api/common';
import CustomerSearchModal from '@m/modal/order/CustomerSearchModal';

export default {
  components: {
    Swiper,
    SwiperSlide,
    AlarmModal,
    DeliveryRegistModal,
    CustomerSearchModal,
  },
  computed: {
    ...mapGetters({
      userCustId: 'userInfo/getUserCustId',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      authButton: 'userInfo/getAuthButton',
    }),
  },
  data() {
    return {
      searchOpen: true,
      custNm: '',
      custId: -1,
      mainYn: false,
      deliveryList: [],
      listNull: false,
      filter: '',
      cityValue: { value: '', text: this.$t('message.all') },
      cityOption: [],
      distrValue: { value: '', text: this.$t('message.all') },
      distrOption: [],
      searchList: false,
      //
      name: 'Delivery',
      //
      swiperOption: {
        initialSlide: 1,
        resistanceRatio: 0,
        slidesPerView: 'auto',
      },
    };
  },
  watch: {},
  methods: {
    searchCustomer() {
      if (this.custNm === '') {
        this.$modal.show('CustomerSearchModal');
      } else {
        this.$refs.CustomerSearch.custSearch(this.custNm, 'info');
      }
    },
    getCustInfo(selectCust) {
      if (selectCust.length && selectCust.length === 1) {
        this.custNm = selectCust[0].custNm;
        this.custId = selectCust[0].custId;
      } else if (selectCust.length && (selectCust.length > 1 || selectCust.length === 0)) {
        this.$modal.show('CustomerSearchModal', { filter: this.custNm });
      } else {
        this.custNm = selectCust.custNm;
        this.custId = selectCust.custId;
      }
    },
    async okOrNo(modal) {
      //모달 리턴
      if (modal.result == true) {
        if (modal.type == 'remove') {
          this.deliveryRemove(modal.index);
        } else if (modal.type == 'save') {
          this.$modal.hide('DeliveryRegistModal');
          await this.getDeliveryList(null);
          this.$EventBus.$emit('openYesModal', 'message.msgSave');
        }
      }
    },
    chgLogits(list) {
      //배송지변경
      if (this.custId == -1) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoCustId');
      } else {
        if (list !== null) {
          this.$refs.deliveryRegistModal.dataSetting(list);
        }
        this.$modal.show('DeliveryRegistModal', { custId: this.custId });
      }
    },
    openModal(type, index) {
      //배송지 삭제
      this.$modal.show('AlarmModalDelivery', { message: 'message.msgCheckDelete', type: type, index: index });
    },
    async deliveryRemove(index) {
      //배송지삭제
      index;
      if (this.custId == -1) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoCustId');
      } else {
        try {
          const param = {
            custId: this.custId,
            ids: [this.deliveryList[index].id],
          };
          await orderApi.deleteUserLogitsAddr(param);
          await this.getDeliveryList(null);
          this.$EventBus.$emit('openYesModal', 'message.msgResultDelete');
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    async getDeliveryList(type) {
      //배송지목록
      await this.slideAllReset();
      if (type == 'search') {
        this.searchList = true;
      } else {
        this.searchList = false;
      }
      if (this.custId == -1) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoCustId');
      } else {
        try {
          let param = {
            custId: this.custId,
            filter: this.filter,
            cityCd: this.cityValue.value,
            distrCd: this.distrValue.value,
          };
          const response = await orderApi.getUserLogits(param);
          this.deliveryList = response.data.ds;
          if (this.deliveryList.length > 0) {
            this.listNull = false;
            this.deliveryList.forEach(row => {
              if (row.mainLogitsYn == 'Y') this.mainYn = true;
            });
          } else {
            this.listNull = true;
          }
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    slideAllReset() {
      for (let i = 0; this.deliveryList.length > i; i++) {
        this.$refs.swiper[i].swiperInstance.slideNext(100, () => {});
        this.$refs.swiper[i].swiperInstance.slidePrev(100, () => {});
      }
    },
    slideNext(index) {
      this.$refs.swiper[index].swiperInstance.slideNext(100, () => {});
    },
    slidePrev(index) {
      this.$refs.swiper[index].swiperInstance.slidePrev(100, () => {});
    },
    async changeCityCd() {
      await this.getCommonCodeCombo('VNM_CITY', this.cityValue.value);
      this.distrValue = { value: '', text: this.$t('message.all') };
    },
    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: '',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);
        if (groupCd === 'VNM_CITY') {
          if (prntCd !== '') {
            this.distrOption = response.data.ds;
            this.distrOption.unshift({ text: this.$t('message.all'), value: '' });
          } else {
            this.cityOption = response.data.ds;
            this.cityOption.unshift({ text: this.$t('message.all'), value: '' });
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
  },
  async mounted() {
    await this.getCommonCodeCombo('VNM_CITY');
    if (this.userMenuGrpCd == 'CUSTOMER') {
      this.custId = this.userCustId;
      await this.getDeliveryList(null);
    }
  },
};
</script>

<style lang="scss" scoped></style>
