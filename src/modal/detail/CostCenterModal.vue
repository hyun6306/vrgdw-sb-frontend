<template>
  <modal name="CostCenterModal" width="600" height="auto" :adaptive="true" :clickToClose="false" @before-open="beforeOpen">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('CostCenterModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.costInquire') }}</p>
      <div class="modal_content a-c">
        <!-- <div class="search_box">
          <input type="text" class="form_txt" placeholder="" v-model="filter" @keyup.enter="costDataFilter(filter)" />
          <button class="" @click="costDataFilter(filter)">
            <img src="@/assets/img/icon_search_w.png" alt="" />
          </button>
        </div>
        <div class="form_production_date m-l-a" v-if="page !== 'etcRegist'">
          <span class="">{{ $t('message.forecastMonth') }}</span>
          <div class="form_calendar">
            <input type="text" placeholder="" v-model="this.selectDate" />
            <button class="icon_calendar" @click="datePicker('DateRangePicker')">
              <img src="@/assets/img/icon_calendar.png" />
            </button>
            <DatePickerModal @selectDate="showSelectDate" />
          </div>
        </div> -->
        <div class="costcenter_table">
          <div class="table">
            <table>
              <colgroup>
                <col style="width: 75px" />
                <col style="width: 60px" />
                <col style="width: 130px" />
                <col style="width: " />
              </colgroup>
              <thead>
                <tr>
                  <th>{{ $t('message.num') }}</th>
                  <th></th>
                  <th>{{ $t('message.costCntrCd') }}</th>
                  <th>{{ $t('message.costCntrNm') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in costCenterData" :key="index" @click="radioChange(index)" @dblclick="confrim">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <label class="radio_b">
                      <input type="radio" name="radio" @change="radioChange(index)" v-model="picked" :value="index" />
                      <span class="checkmark"></span>
                    </label>
                  </td>
                  <td>{{ data.centerCd }}</td>
                  <td>{{ data.centerShotNm }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_default btn_primary" @click="confrim">{{ $t('message.btnCheck') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import detailApi from '@/api/order/detail';
// import DatePickerModal from '@/modal/DatePickerModal';

export default {
  name: 'CostCenterModal',
  props: ['costfilter', 'page'],
  data() {
    return {
      filter: '',
      costCenter: [],
      costCenterData: [],
      selectDate: '',
      costCenterRadio: '',
      picked: '',
    };
  },
  components: {
    // DatePickerModal
  },
  watch: {
    costfilter(data) {
      this.filter = data;
    },
  },
  methods: {
    closePopup() {
      this.filter = '';
      this.picked = '';
      this.$modal.hide('CostCenterModal');
    },
    radioChange(index) {
      this.picked = index;
      this.costCenterRadio = this.costCenterData[index];
    },
    confrim() {
      this.$emit('costCenterInfo', { costInfo: this.costCenterRadio, costDate: this.selectDate });
      this.closePopup();
    },
    costDataFilter(data = '') {
      if (data == '' || data == ' ') {
        this.costCenterData = this.costCenter;
        if (this.filter !== '') {
          const index = this.costCenterData.findIndex(data => {
            return data.centerNm === this.filter;
          });
          this.radioChange(index);
        }
      } else {
        this.costCenterData = [];
        this.costCenter.forEach(row => {
          if (row.centerCd.includes(data) || row.centerNm.includes(data)) {
            this.costCenterData.push(row);
          }
        });
      }
    },
    async loadCostCenter() {
      let param = {
        ordErpCls: 'ZFD6',
      };
      try {
        const response = await detailApi.getCostcenter(param);
        this.costCenter = response.data.ds;
        // this.costDataFilter(this.filter);
        this.costDataFilter();
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    showSelectDate(selectDate) {
      this.selectDate = selectDate;
    },
    datePicker() {
      this.$modal.show('DatePicker', { page: 'costCenter' });
    },
    beforeOpen() {
      this.loadCostCenter();
      this.selectDate = '';
      this.costCenterRadio = '';
    },
  },
  created() {},
};
</script>

<style></style>
