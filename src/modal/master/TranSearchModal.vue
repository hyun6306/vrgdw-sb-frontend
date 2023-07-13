<template>
  <modal name="TranSearchModal" width="1210" height="auto" :adaptive="true" @before-close="close" @before-open="open">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('TranSearchModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.trnSearch') }}</p>
      <div class="modal_content customer_content">
        <div class="search_content">
          <div class="search_box">
            <div class="search_box_filter">
              <div class="filter_list">
                <!-- <label for="custoer_name" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.trncusCd') }}</span>
                  <input type="text" id="postal_code" style="" class="t-l" placeholder="" ref="trncusId" v-model="trncusId" @keyup.enter="tranSearch" />
                </label> -->
                <label for="payment_terms" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.manageCls') }}</span>
                  <MultiSelect id="Material_Group" style="width: 100%" v-model="operClsValue" :options="operClsOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.searchTerm') }}</span>
                  <input type="text" id="postal_code" style="" class="t-l" placeholder="" ref="filter" v-model="filter" @keyup.enter="tranSearch" />
                </label>
                <div style="display: flex; margin-left: auto">
                  <button class="btn_search_text_row btn_reset" style="margin-right: 10px" @click="close">{{ $t('message.btnInit') }}</button>
                  <button class="btn_search_text_row" @click="tranSearch">{{ $t('message.btnSearch') }}</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="customer_table">
          <div class="table">
            <table>
              <colgroup>
                <col style="width: 50px" />
                <col style="width: 42px" />
                <col style="width: 10%" />
                <col style="width: 10%" />
                <col style="width: 15%" />
                <col style="width: 10%" />
                <col style="width: 15%" />
                <col style="width: " />
              </colgroup>
              <thead>
                <tr>
                  <th>No</th>
                  <th></th>
                  <th>{{ $t('message.companyCode') }}</th>
                  <th>{{ $t('message.trncusCd') }}</th>
                  <th>{{ $t('message.ceoName') }}</th>
                  <th>{{ $t('message.bizNum') }}</th>
                  <th>{{ $t('message.postNum') }}</th>
                  <th>{{ $t('message.addrDtls') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(list, index) in tranList" :key="index" @click="radioChange(index)" @dblclick="confrim">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <label class="radio_b">
                      <input type="radio" @change="radioChange(index)" :value="index" v-model="selectRadio" />
                      <span class="checkmark"></span>
                    </label>
                  </td>
                  <!-- ERP회사코드 -->
                  <td>{{ list.compCd }}</td>
                  <!-- 운송사코드 -->
                  <td>{{ list.trncusCd }}</td>
                  <!-- 대표자명 -->
                  <td>{{ list.ceoNm }}</td>
                  <!-- 사업자등록번호 -->
                  <td>{{ list.bizNum }}</td>
                  <!-- 사업자우편번호 -->
                  <td>{{ list.postNum }}</td>
                  <!-- 사업장주소 -->
                  <td class="t-l">{{ list.addr }}</td>
                </tr>
              </tbody>
            </table>
            <div class="not_search_result t-c" v-if="tranList && tranList.length === 0">{{ $t('message.gridTranListNull') }}</div>
          </div>
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_deep_gray" @click="$modal.hide('TranSearchModal')">{{ $t('message.btnCancel') }}</button>
          <button class="btn_primary" @click="confrim">{{ $t('message.btnCheck') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import commonApi from '@/api/common';
import masterApi from '@/api/master/master';

export default {
  name: 'TranSearchModal',

  data() {
    return {
      tranList: [],
      //운송사코드
      // trncusId: '',
      //운영구분
      operClsValue: { text: this.$t('message.all'), value: '' },
      operClsOptions: [],
      //
      filter: '',
      tranRadio: '',
      selectRadio: '',
    };
  },
  watch: {},
  methods: {
    confrim() {
      this.$emit('sendTrnCustInfo', this.tranRadio);
      this.$modal.hide('TranSearchModal');
    },
    radioChange(index) {
      this.selectRadio = index;
      // this.tranRadio = this.tranList[index].id;
      this.tranRadio = this.tranList[index];
    },
    async tranSearch(is) {
      if (is !== 'open') this.$refs.filter.blur();
      try {
        let param = {
          trncusId: '',
          operClsCd: this.operClsValue.value,
          filter: this.filter,
        };
        const response = await masterApi.getTranMngList(param);
        this.tranList = response.data.ds;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    open(event) {
      this.filter = event.params.trncusCd;
      this.tranSearch('open');
    },
    close() {
      this.filter = '';
      this.operClsValue = { text: this.$t('message.all'), value: '' };
      this.selectRadio = '';
    },
    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: 'Y',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);
        if (groupCd === 'OPER_CLS_CD') {
          //운영구분
          this.operClsOptions = response.data.ds;
          this.operClsOptions.unshift({ text: this.$t('message.all'), value: '' });
        }
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
  },
  created() {
    this.getCommonCodeCombo('OPER_CLS_CD');
  },
  mounted() {},
  destroyed() {},
};
</script>

<style></style>
