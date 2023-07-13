<template>
  <modal name="CustomerSearchModal" width="100%" height="100%" :adaptive="true" @before-open="open">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">{{ $t('message.custSearch') }}</h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="close"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <!-- 고객사 검색 -->
        <div class="delivery_search_contents">
          <MultiSelect id="" style="width: 100%" class="" label="text" v-model="custType" :options="custTypeOptions" :searchable="false" :close-on-select="true" :show-labels="false" placeholder=""></MultiSelect>
        </div>
        <div class="delivery_search_contents">
          <input type="text" id="" class="" v-model="filter" />
          <button class="btn_search" @click="custSearch(filter)">{{ $t('message.search') }}</button>
        </div>
        <!-- //고객사 검색 -->
        <!-- 고객사 검색결과 목록 -->
        <div class="customer_search_list_contents">
          <div class="table">
            <table>
              <colgroup>
                <col style="width: 100%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>{{ $t('message.cust') }}</th>
                </tr>
                <tr>
                  <td class="pa-0 ba-0">
                    <div class="in_table" v-for="(cust, index) in custList" :key="index">
                      <table>
                        <colgroup>
                          <col style="width: 10%" />
                          <col style="width: 45%" />
                          <col style="width: 45%" />
                        </colgroup>
                        <tbody>
                          <tr>
                            <td rowspan="2">
                              <label class="chechbox_solo">
                                <input type="radio" name="cust" :value="cust" v-model="selectCust" />
                                <span class="checkmark"></span>
                              </label>
                            </td>
                            <td colspan="2" class="t-l">{{ cust.custNm }}</td>
                          </tr>
                          <tr>
                            <td>{{ cust.custCd }}</td>
                            <td>{{ cust.bizNum }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- //고객사 검색결과 목록 -->
        <!-- 하단 버튼 -->
        <div class="bottom_select_result_contents">
          <div class="btn_box">
            <button class="btn_tempsave" @click="sendCustInfo">{{ $t('message.btnYes') }}</button>
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
import commonApi from '@/api/common';

export default {
  data() {
    return {
      custTypeOptions: [],
      custType: {
        value: '',
        text: 'ALL',
      },
      filter: '',
      custList: [],
      selectCust: {},
    };
  },
  methods: {
    async getCommonCodeCombo() {
      try {
        const param = {
          groupCd: 'CUST_TYPE',
          useYn: 'Y',
          prntCd: '',
        };
        const resp = await commonApi.getCommonCodeCombo(param);
        const all = {
          value: '',
          text: 'ALL',
        };
        this.custTypeOptions = resp.data.ds;
        this.custTypeOptions.splice(0, 0, all);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async custSearch(filter, call = '') {
      try {
        const param = {
          custType: this.custType.value ? this.custType.value : '',
          useYn: 'Y',
          filter,
        };

        const resp = await orderApi.custSearch(param);
        this.custList = resp.data.ds;
        if (call === 'info') {
          this.$emit('sendCustInfo', this.custList);
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
    sendCustInfo() {
      // if (Object.keys(this.selectCust).length > 0) {
      this.$emit('sendCustInfo', this.selectCust);
      // }
      this.close();
    },
    close() {
      this.filter = '';
      this.custList = [];
      this.selectCust = {};
      this.$modal.hide('CustomerSearchModal');
    },
    open(event) {
      if (event.params) this.filter = event.params.filter;
      // if (this.filter !== '') this.custSearch(this.filter);
    },
  },
  created() {
    this.getCommonCodeCombo();
  },
};
</script>

<style></style>
