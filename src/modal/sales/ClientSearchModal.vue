<template>
  <modal :name="`PriceClientSearchModal${name}`" width="1400" height="800" :adaptive="true" :clickToClose="false" @before-open="open">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="close()"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.custSearch') }}</p>
      <div class="modal_content customer_content">
        <div class="search_content">
          <div class="search_box" ref="search_box_height" :class="{ search_close_00: searchOpen }" :style="`height:${search_box_height}`">
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.custGroup') }}</span>
                  <MultiSelect id="차량유형" style="" track-by="text" label="text" v-model="custGroup" :options="custClSelect" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
                </label>
                <label for="payment_terms" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.closeYn') }}</span>
                  <MultiSelect id="차량유형" class="" style="" v-model="useYn" :options="useYnSelect" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
                </label>
                <div style="display: flex; margin-left: auto">
                  <button class="btn_search_text_row btn_reset" style="margin-right: 10px" @click="reset()">{{ $t('message.btnInit') }}</button>
                  <button class="btn_search_text_row" @click="customerList()">{{ $t('message.btnSearch') }}</button>
                </div>
              </div>
            </div>
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">Keyword</span>
                  <div class="form_input">
                    <input type="text" v-model="filter" id="postal_code" style="" class="t-l" :placeholder="$i18n.t('message.msgInputCustom')" @keyup.enter="customerList()" ref="filter" />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="customer_table">
          <div class="table">
            <table>
              <colgroup>
                <col style="width: 50px" />
                <col style="width: 50px" />
                <col style="width: 210px" />
                <col style="width: 180px" />
                <col style="width: 170px" />
                <col style="width: 299px" />
              </colgroup>
              <thead>
                <tr>
                  <th>{{ $t('message.num') }}</th>
                  <th></th>
                  <th>{{ $t('message.custNm') }}</th>
                  <th>{{ $t('message.custCd') }}</th>
                  <th>{{ $t('message.comRegistrNum') }}</th>
                  <th>{{ $t('message.workplaceAddr') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(list, index) in custList" :key="index" @click="radioChange(index)" @dblclick="confirm">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <label class="radio_b">
                      <input type="radio" @change="radioChange(index)" name="radio" v-model="picked" :value="index" />
                      <span class="checkmark"></span>
                    </label>
                  </td>
                  <!-- 고객사 명 -->
                  <td>{{ list.custKorNm }}</td>
                  <!-- 고객사 코드 -->
                  <td>{{ list.custCd }}</td>
                  <!-- 사업자등록번호 -->
                  <td>{{ list.bizNum }}</td>
                  <!-- 사업장주소 -->
                  <td class="t-l">{{ list.addrKor }}</td>
                </tr>
              </tbody>
            </table>
            <div class="not_search_result t-c" v-if="custList && custList.length === 0">{{ $t('message.errorsCustCdNotFound') }}</div>
          </div>
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_primary" @click="confirm()">
            {{ $t('message.btnCheck') }}
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import orderApi from '@/api/order/order.js';
import commonApi from '@/api/common';

export default {
  name: 'PriceClientSearchModal',
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  created() {},
  data() {
    return {
      picked: '',
      custGroup: {
        value: '',
        text: 'ALL',
      },
      useYn: 'ALL',
      custClSelect: [],
      useYnSelect: ['ALL', 'Y', 'N'],
      radio: '',
      searchOpen: false,
      search_box_height: '',
      custList: [],
      filter: '',
    };
  },
  methods: {
    closePopUp() {
      this.custGroup = {
        value: '',
        text: 'ALL',
      };
      this.useYn = 'ALL';
      this.custList = [];
      this.filter = '';
      this.radio = '';
      this.picked = '';
      this.$modal.hide(`PriceClientSearchModal${this.name}`);
    },
    radioChange(index) {
      this.picked = index;
      this.radio = this.custList[index];
    },
    async comboList() {
      const param = {
        groupCd: 'CUST_TYPE',
        useYn: 'Y',
        prntCd: '',
      };
      try {
        const resp = await commonApi.getCommonCodeCombo(param);
        const all = {
          value: '',
          text: 'ALL',
        };
        this.custClSelect = resp.data.ds;
        this.custClSelect.splice(0, 0, all);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    reset() {
      this.custGroup = this.custClSelect[0];
      this.useYn = this.useYnSelect[0];
      this.filter = '';
    },
    async customerList(searchInfoInput = false, filter = '') {
      try {
        if (!searchInfoInput) {
          this.$refs.filter.blur();
          const custType = Object.values(this.custGroup);
          const param = {
            custType: custType[0],
            useYn: this.useYn === 'ALL' ? '' : this.useYn,
            filter: this.filter,
          };
          const resp = await orderApi.custSearch(param);
          this.custList = resp.data.ds;
        } else {
          const param = {
            custType: '',
            useYn: 'Y',
            filter,
          };
          const resp = await orderApi.custSearch(param);
          if (resp.data.status === 200) {
            this.$emit('sendInfoInput', resp.data.ds);
            this.custList = resp.data.ds;
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
    confirm() {
      this.$emit('sendCustInfo', this.radio);
      this.closePopUp();
    },
    close() {
      this.$emit('sendCustInfo', '');
      this.closePopUp();
    },
    open(event) {
      if (event.params && event.params.custNm) {
        this.filter = event.params.custNm;
      }
      this.customerList('info');
    },
  },

  destroyed() {},
};
</script>

<style></style>
