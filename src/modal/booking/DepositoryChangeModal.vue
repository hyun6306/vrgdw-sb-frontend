<template>
  <modal name="DepositoryChangeModal" width="1000" height="auto" :adaptive="true" :clickToClose="false" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('DepositoryChangeModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.depositoryChange') }}</p>
      <div class="modal_content a-c">
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 90px" />
              <col style="width: 314px" />
              <col style="width: 90px" />
              <col style="width: 90px" />
              <col style="width: 90px" />
              <col style="width: 110px" />
              <col style="width: 90px" />
            </colgroup>
            <thead>
              <tr>
                <th>{{ $t('message.materialCode') }}</th>
                <th>{{ $t('message.prdtNm') }}</th>
                <th>{{ $t('message.baseQty') }}</th>
                <th>{{ $t('message.unit') }}</th>
                <th>{{ $t('message.savePlntCd') }}</th>
                <th>{{ $t('message.trnPsbBaseQty') }}</th>
                <th>{{ $t('message.transformQty') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ checkList.prdtCd }}</td>
                <td>{{ checkList.prdtNm }}</td>
                <td>{{ checkList.trnPsbBaseQty }}</td>
                <td>{{ checkList.baseUnitNm }}</td>
                <td>{{ checkList.plntCd }}</td>
                <td>{{ checkList.trnPsbBaseQty }}</td>
                <td>
                  <div class="form_input">
                    <input type="text" id="num" style="width: 100%; text-align: right" @blur="checkedNum" @focus="checked" v-model="bokngQty" @keyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9,]/g, '');" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <span class="sub_txt">{{ tosMent }}</span>
        </div>

        <div class="modal_btn_contents_t05">
          <button class="btn_default" @click="$modal.hide('DepositoryChangeModal')">{{ $t('message.btnCancel') }}</button>
          <button class="btn_default btn_ref" @click="change()">{{ $t('message.btnFwdQtySplit') }}</button>
          <!-- <button class="btn_default btn_primary" @click="changeRequest()">{{ $t('message.btnTransformRequest') }}</button> -->
        </div>
      </div>
      <BookingAlarmModal :ment="ment" @okOrNo="okOrNo" />
    </div>
  </modal>
</template>

<script>
import bookingApi from '@/api/order/booking';
import BookingAlarmModal from '@/modal/booking/BookingAlarmModal';

export default {
  components: { BookingAlarmModal },
  name: 'DepositoryChangeModal',
  props: ['checkList', 'menuId', 'page'],
  data() {
    return {
      ment: '',
      bokngQty: 0,
      tosMent: '',
      isChecked: false,
      isReSearch: false,
    };
  },
  methods: {
    inputNumberFormat() {
      this.bokngQty = this.comma(this.uncomma(this.bokngQty));
    },
    comma(str) {
      str = String(str);
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },
    uncomma(str) {
      str = String(str);
      return str.replace(/[^\d]+/g, '').replace(/(^0+)/, '');
    },
    checked() {
      if (this.bokngQty) {
        this.bokngQty = this.bokngQty.replace(/,/g, '');
      }
      if (this.bokngQty === 0 || this.bokngQty === '0' || this.bokngQty === '' || !this.bokngQty) {
        this.bokngQty = '';
        this.tosMent = '';
      }
    },
    checkedNum() {
      let formatBokngQty = this.bokngQty.replace(/,/g, '');
      if (this.bokngQty === '') {
        this.tosMent = '';
        this.bokngQty = 0;
      } else if (this.checkList.trnPsbBaseQty >= formatBokngQty) {
        this.tosMent = '';
        this.isChecked = true;
      } else if (this.checkList.trnPsbBaseQty < formatBokngQty) {
        this.bokngQty = '';
        this.isChecked = false;
        this.tosMent = this.$t('message.msgManyTransformQuantity');
      }
    },
    change(move) {
      if (this.bokngQty === 0 || this.bokngQty === '0' || !this.isChecked) {
        this.tosMent = '';
        this.$EventBus.$emit('openYesModal', 'message.msgConfirmReqBaseQty');
      } else {
        this.tosMent = '';
        this.ment = 'message.msgDoDepository';
        if (!move) {
          this.$modal.show(`BookingAlarmModal`, { type: '' });
        } else {
          this.$modal.show(`BookingAlarmModal`, { type: 'forwRequest' });
        }
      }
    },
    changeRequest() {
      this.change('move');
      //예탁 요청 페이지 이동
    },
    okOrNo(result, type) {
      if (result) {
        this.saveBookingChange(result);
        if (type === 'forwRequest') {
          this.$emit('pageMove', this.checkList);
        }
      }
    },
    async saveBookingChange(result) {
      if (result) {
        try {
          const param = {
            id: this.checkList.id,
            bokngBaseQty: this.bokngQty.replaceAll(',', '') * 1,
          };
          const response = await bookingApi.saveBookingChange(param);
          this.ment = '';
          if (response.data.status === 500) {
            this.ment = response.data.message;
            this.$EventBus.$emit('openYesModal', this.ment);
          } else if (response.data.rs) {
            this.$EventBus.$emit('openYesModal', 'message.msgSelectDepository');
            this.$modal.hide('DepositoryChangeModal');
            this.isReSearch = true;
            this.$emit('isReSearch', this.isReSearch);
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
    close() {
      this.ment = '';
      this.tosMent = '';
      this.bokngQty = 0;
    },
  },
};
</script>

<style></style>
