<template>
  <modal name="CalendarOutModal" width="500" height="auto" :adaptive="true" :clickToClose="false" @before-close="close" @before-open="open">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('CalendarOutModal')"></button>
      </div>
      <p class="modal_title_t02">
        <!-- {{ $t('label.deliveryRequest') }} -->
        {{ $t('message.trnPsb') }}
      </p>
      <div class="modal_content dr_content">
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 20%" />
              <col style="width: 80%" />
            </colgroup>
            <tbody>
              <tr>
                <th>{{ $t('message.date') }}</th>
                <td>
                  <div class="form_calendar">
                    <input type="text" :placeholder="$t('message.chooseDate')" v-model="trnDt.show" @click="datePicker('DateRangePicker')" />
                    <button class="icon_calendar" @click="datePicker('DateRangePicker')"><img src="@/assets/img/icon_calendar.png" /></button>
                  </div>
                </td>
              </tr>
              <tr>
                <th>{{ $t('message.separation') }}</th>
                <td class="t-l">{{ $t(dayType) }}</td>
              </tr>
              <tr>
                <th>{{ $t('message.breakdown') }}</th>
                <td>
                  <span class="">
                    <input type="text" placeholder="" style="width: 100%" v-model="remark" />
                  </span>
                </td>
              </tr>
              <tr>
                <th>{{ $t('message.trnPsbY') }}</th>
                <td>
                  <div class="a-l-c">
                    <label class="radio_t ma-0">
                      <input type="radio" name="radio" v-model="trnPsbYn" value="Y" />
                      <span class="checkmark"></span>
                      Y
                    </label>
                    <label class="radio_t ml-10">
                      <input type="radio" name="radio" v-model="trnPsbYn" value="N" />
                      <span class="checkmark"></span>
                      N
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="modal_btn_contents_t05">
          <button class="btn_default" @click="blockRemove">{{ $t('message.btnDelete') }}</button>
          <button class="btn_default" @click="$modal.hide('CalendarOutModal')">{{ $t('message.btnCancel') }}</button>
          <button class="btn_primary" @click="chgTrnYn">{{ $t('message.btnSave') }}</button>
        </div>
      </div>
    </div>
    <TranAlarmYesModal :ment="ment" />
    <DatePicker @selectDate="selectDate" :oldDate="oldDate" />
  </modal>
</template>

<script>
import masterApi from '@/api/master/master';
import DatePicker from '@/modal/DatePickerModal';
import TranAlarmYesModal from '@/modal/tran/TranAlarmYesModal';

export default {
  data() {
    return {
      updateData: '',
      oldDate: '',
      id: 0,
      trnDt: '',
      remark: '',
      trnPsbYn: '',
      dayType: '',
      ment: '',
    };
  },
  components: { DatePicker, TranAlarmYesModal },
  watch: {
    updateData(data) {
      this.id = data.id;
      this.remark = data.remark;
      this.trnDt = {
        show: this.$vnDateFormatD(data.trnDt),
        time: data.trnDt,
      };
      this.trnPsbYn = data.trnPsbYn;
    },
    trnDt(date) {
      let week = ['sun', 'mon', 'the', 'wed', 'thu', 'fri', 'sat'];
      let day = new Date(date.time).getDay();
      let dayLabel = week[day];
      if (dayLabel == 'sun' || dayLabel == 'sat') {
        this.dayType = 'message.weekend';
      } else {
        this.dayType = 'message.weekday';
      }
    },
  },
  methods: {
    selectDate(date) {
      this.trnDt = date;
    },
    modalClose() {
      this.$modal.hide('CalendarOutModal');
    },
    valid() {
      let check = true;
      if (this.trnDt == '') {
        this.ment = 'message.msgRequireDate';
      } else if (this.remark == '') {
        this.ment = 'message.mgsRequireBreakdown';
      } else if (this.trnPsbYn == '') {
        this.ment = 'message.msgRequireTrnPsbYn';
      } else {
        check = false;
      }
      return check;
    },
    async chgTrnYn() {
      if (this.valid() == true) {
        this.$emit('ment', this.ment);
        this.$modal.show('TranAlarmYesModal');
      } else {
        let param = {
          sttDt: this.trnDt.time,
          endDt: this.trnDt.time,
          trnPsbYn: this.trnPsbYn,
          remark: this.remark,
        };
        param = this.id !== 0 ? { ...param, ...{ id: this.id } } : param;
        try {
          const response = await masterApi.putTtrnBlockSave(param);
          await this.$parent.trnBlockList();
          if (response.data.status == 200) {
            this.ment = 'message.msgSave';
          }
          this.$parent.showModal({ type: 'close', ment: this.ment });
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    async blockRemove() {
      //출고일 삭제
      if (this.id == 0) {
        this.ment = 'message.msgRequireHolidayAdd';
      } else {
        let param = {
          sttDt: this.trnDt.time,
          endDt: this.trnDt.time,
        };
        try {
          const response = await masterApi.putTtrnBlockRemove(param);
          if (response.data.status == 200) {
            this.ment = 'message.msgResultDelete';
          }
          await this.$parent.trnBlockList();
          this.$parent.showModal({ type: 'close', ment: this.ment });
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    datePicker() {
      //데이트피커 모달
      this.oldDate = this.trnDt.time;
      this.$modal.show('DatePicker', { page: 'trnBlock', type: 'trnDt' });
    },
    open(event) {
      this.updateData = JSON.parse(JSON.stringify(event.params.data));
    },
    close() {
      this.trnDt = '';
      this.remark = '';
      this.id = 0;
      this.ment = '';
      this.trnPsbYn = '';
    },
  },
  mounted() {},
  destroyed() {},
};
</script>

<style></style>
