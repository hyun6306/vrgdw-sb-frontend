<template>
  <modal name="ShippingAddressModal" width="750" height="800px" @opened="getUserLogits()" :clickToClose="false">
    <div class="modal" id="ShippingAddress">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="closeSelectLogits()"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.addrList') }}</p>
      <div class="modal_content">
        <div class="search_box">
          <input type="text" class="form_txt" :placeholder="$t('message.msgPlaceholderAddr')" v-model="searchFilter" @keyup.enter="getUserLogits(searchFilter)" ref="filter" />
          <button @click="getUserLogits(searchFilter)">{{ $t('message.btnSearch') }}</button>
        </div>

        <div class="result_box">
          <div class="address_info" v-if="logits.length === 0 && isSelect">
            <p class="not_search_result">{{ $t('message.msgNoDeliver') }}</p>
          </div>
          <div v-for="(logit, index) in logits" :key="index">
            <div :class="[logit.mainLogitsYn === 'N' ? 'address_info' : 'address_info choice_address']">
              <div class="address_check">
                <label class="chechbox_basic">
                  <input type="checkbox" :name="'logit' + index" :true-value="logit" v-model="selectLogit" @change="check()" />
                  <span class="checkmark"></span>
                </label>
              </div>
              <p class="company_title">{{ logit.logitsAlias }}</p>
              <ul>
                <li class="address_list">
                  <p class="address_list_title">{{ $t('message.postNum') }}</p>
                  <span class="address_list_info">{{ logit.postNum }}</span>
                </li>
                <li class="address_list">
                  <p class="address_list_title">{{ $t('message.addr') }}</p>
                  <span class="address_list_info">{{ logit.addr }}, {{ logit.distrNm }}, {{ logit.cityNm }}</span>
                </li>
                <li class="address_list">
                  <div class="align_row">
                    <p class="address_list_title">
                      {{ $t('message.callNum1') }}
                    </p>
                    <span class="address_list_info">{{ logit.phoneNum1 }}</span>
                  </div>
                  <div class="align_row">
                    <p class="address_list_title">
                      {{ $t('message.callNum2') }}
                    </p>
                    <span class="address_list_info">{{ logit.phoneNum2 }}</span>
                  </div>
                </li>
                <li class="address_list">
                  <p class="address_list_title">{{ $t('message.picNm') }}</p>
                  <input type="text" v-model="logit.trnMngNm" />
                </li>
                <li class="address_list">
                  <p class="address_list_title">
                    {{ $t('message.noteRemark') }}
                  </p>
                  <input type="text" v-model="logit.logitsRemark" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="modal_btn_contents_t02">
        <button class="btn_primary" @click="sendSelectLogit()">
          {{ $t('message.btnCheck') }}
        </button>
      </div>
    </div>
  </modal>
</template>

<script>
import orderApi from '@/api/order/order';

export default {
  name: 'ShippingAddressModal',
  props: ['userCustId', 'id'],
  data() {
    return {
      logits: [],
      searchFilter: '',
      selectLogit: {},
      isSelect: false,
    };
  },
  methods: {
    async getUserLogits(filter = '') {
      this.$refs.filter.blur();
      const param = {
        custId: this.userCustId,
        filter: filter,
        cityCd: '',
        distrCd: '',
      };
      try {
        const response = await orderApi.getUserLogits(param);
        this.logits = response.data.ds;
        this.isSelect = true;
        if (this.id) {
          this.selectLogit = this.logits.find(logit => logit.id === this.id);
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
    check() {},
    closeSelectLogits() {
      this.logits = [];
      this.searchFilter = '';
      this.selectLogit = {};
      this.isSelect = false;
      this.$modal.hide('ShippingAddressModal');
    },
    sendSelectLogit() {
      this.$emit('sendSelectLogit', this.selectLogit);
      this.closeSelectLogits();
      this.$modal.hide('ShippingAddressModal');
    },
  },
};
</script>

<style></style>
