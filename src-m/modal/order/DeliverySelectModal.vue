<template>
  <modal name="DeliverySelectModal" width="100%" height="100%" :adaptive="true" @before-open="getUserLogits">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">{{ $t('message.selectShipping') }}</h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="close"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <!-- 배송지 검색 -->
        <div class="delivery_search_contents">
          <span class="ds_title">{{ $t('message.searchWord') }}</span>
          <input type="text" id="" class="" v-model="filter" />
          <button class="btn_search" @click="getUserLogits()">{{ $t('message.btnSearch') }}</button>
        </div>
        <!-- //배송지 검색 -->
        <!-- 배송지 검색결과 목록 -->
        <div class="delivery_search_list_contents">
          <p class="deafult_address">{{ $t('message.defaultShipptingInfo') }}</p>
          <section class="address_section address_default_section" v-if="Object.keys(mainLogit).length > 0">
            <div class="check_title">
              <label class="chechbox_basic">
                <input type="checkbox" :name="'logit' + -1" :true-value="mainLogit" v-model="selectLogit" />
                <span class="checkmark"></span>
                {{ mainLogit.logitsAlias }}
              </label>
            </div>
            <ul class="address_info_box">
              <li>
                <strong>{{ $t('message.postNum') }}</strong>
                <span>{{ mainLogit.postNum }}</span>
              </li>
              <li>
                <strong>{{ $t('message.addr') }}</strong>
                <span>{{ mainLogit.addr }}, {{ mainLogit.cityNm }}, {{ mainLogit.distrNm }} </span>
              </li>
              <li>
                <strong>{{ $t('message.picNm2') }}</strong>
                <span>{{ mainLogit.trnMngNm }}</span>
              </li>
              <li>
                <strong>{{ $t('message.addrNum1') }}</strong>
                <span>{{ mainLogit.phoneNum1 }}</span>
              </li>
              <li>
                <strong>{{ $t('message.addrNum2') }}</strong>
                <span>{{ mainLogit.phoneNum2 }}</span>
              </li>
              <li>
                <span class="note_box">{{ mainLogit.logitsRemark }}</span>
              </li>
            </ul>
          </section>
          <p class="etc_address">{{ $t('message.extraShipptingInfo') }}</p>
          <section class="address_section" v-for="(list, index) in logitsEtc" :key="index">
            <div class="check_title">
              <label class="chechbox_basic">
                <input type="checkbox" :name="'logit' + index" :true-value="list" v-model="selectLogit" />
                <span class="checkmark"></span>
                {{ list.logitsAlias }}
              </label>
            </div>
            <ul class="address_info_box">
              <li>
                <strong>{{ $t('message.postNum') }}</strong>
                <span>{{ list.postNum }}</span>
              </li>
              <li>
                <strong>{{ $t('message.addr') }}</strong>
                <span>{{ list.addr }}, {{ list.cityNm }}, {{ list.distrNm }} </span>
              </li>
              <li>
                <strong>{{ $t('message.picNm2') }}</strong>
                <span>{{ list.trnMngNm }}</span>
              </li>
              <li>
                <strong>{{ $t('message.addrNum1') }}</strong>
                <span>{{ list.phoneNum1 }}</span>
              </li>
              <li>
                <strong>{{ $t('message.addrNum2') }}</strong>
                <span>{{ list.phoneNum2 }}</span>
              </li>
              <li>
                <span class="note_box">{{ list.logitsRemark }}</span>
              </li>
            </ul>
          </section>
        </div>
        <!-- //배송지 검색결과 목록 -->
        <!-- 하단 버튼 -->
        <div class="bottom_select_result_contents">
          <div class="btn_box">
            <button class="btn_reset" @click="close">{{ $t('message.btnCancel') }}</button>
            <button class="btn_tempsave" @click="confirm">{{ $t('message.btnYes') }}</button>
          </div>
        </div>
        <!-- //하단 버튼 -->
      </div>
      <!-- //컨텐츠 바디 -->
    </div>
  </modal>
</template>

<script>
import orderApi from '@/api/order/order';

export default {
  props: ['custId', 'id'],
  data() {
    return {
      filter: '',
      logitsEtc: [],
      mainLogit: {},
      selectLogit: {},
    };
  },
  methods: {
    async getUserLogits() {
      this.logitsEtc = [];
      this.mainLogit = {};
      try {
        const param = {
          custId: this.custId,
          filter: this.filter,
          cityCd: '',
          distrCd: '',
        };
        const resp = await orderApi.getUserLogits(param);
        resp.data.ds.forEach(list => {
          if (list.mainLogitsYn === 'N') {
            this.logitsEtc.push(list);
          } else {
            this.mainLogit = list;
          }
        });
        if (this.id) {
          this.selectLogit = resp.data.ds.find(logit => logit.id === this.id);
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
    close() {
      this.filter = '';
      this.logitsEtc = [];
      this.mainLogit = {};
      this.selectLogit = {};
      this.$modal.hide('DeliverySelectModal');
    },
    confirm() {
      this.$emit('selectLogits', this.selectLogit);
      this.close();
    },
  },
  mounted() {},
};
</script>

<style></style>
