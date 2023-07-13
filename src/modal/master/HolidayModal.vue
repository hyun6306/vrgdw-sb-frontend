<template>
  <modal name="HolidayModal" width="500" height="auto" :adaptive="true" :clickToClose="false" @before-close="close" @before-open="open">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('HolidayModal')"></button>
      </div>
      <p class="modal_title_t02">
        <!-- {{ $t('label.deliveryRequest') }} -->
        {{ $t('message.holiday') }}
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
                  <div class="a-l-c">
                    <div class="form_calendar">
                      <input type="text" :placeholder="$t('message.selectPeriod')" v-model="startDt.show" @click="datePicker('start')" />
                      <button class="icon_calendar" @click="datePicker('start')"><img src="@/assets/img/icon_calendar.png" /></button>
                    </div>
                    <div class="form_calendar">
                      <input type="text" :placeholder="$t('message.selectPeriod')" v-model="endDt.show" @click="datePicker('end')" />
                      <button class="icon_calendar" @click="datePicker('end')"><img src="@/assets/img/icon_calendar.png" /></button>
                    </div>
                  </div>
                  <p class="t-l mt-05"></p>
                </td>
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
                <th>{{ $t('message.publicHoliday') }}</th>
                <td>
                  <div class="a-l-c">
                    <label class="radio_t ma-0">
                      <input type="radio" name="radio" v-model="holidayYn" value="Y" />
                      <span class="checkmark"></span>
                      Y
                    </label>
                    <label class="radio_t ml-10">
                      <input type="radio" name="radio" v-model="holidayYn" value="N" />
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
          <button class="btn_default" @click="holiRemove">{{ $t('message.btnDelete') }}</button>
          <button class="btn_default" @click="$modal.hide('HolidayModal')">{{ $t('message.btnCancel') }}</button>
          <button class="btn_primary" @click="holiSave">{{ $t('message.btnSave') }}</button>
        </div>
      </div>
    </div>
    <DatePicker @startDate="startDate" @endDate="endDate" :oldDate="oldDate" />
    <TranAlarmYesModal :ment="ment" />
  </modal>
</template>

<script>
import masterApi from '@/api/master/master';
import DatePicker from '@/modal/DatePickerModal';
import TranAlarmYesModal from '@/modal/tran/TranAlarmYesModal';

export default {
  data() {
    return {
      startDt: '',
      endDt: '',
      remark: '',
      id: 0,
      oldDate: '',
      ment: '',
      updateData: '',
      holidayYn: '',
    };
  },
  components: { DatePicker, TranAlarmYesModal },
  watch: {
    updateData(data) {
      this.id = data.id;
      this.remark = data.remark;
      this.startDt = {
        show: this.$vnDateFormatD(data.sttDt),
        time: data.sttDt,
      };
      this.endDt = {
        show: this.$vnDateFormatD(data.endDt),
        time: data.endDt,
      };
      this.holidayYn = data.holidayYn;
    },
  },
  methods: {
    datePicker(type) {
      //데이트피커 모달
      if (type == 'start') {
        this.oldDate = this.startDt.time;
        this.$modal.show('DatePicker', { page: 'holiday', type: 'startDt' });
      } else if (type == 'end') {
        this.oldDate = this.endDt.time;
        this.$modal.show('DatePicker', { page: 'holiday', type: 'endDt' });
      }
    },
    startDate(date) {
      this.startDt = date;
    },
    endDate(date) {
      this.endDt = date;
    },
    radioBtn(type) {
      //라디오버튼
      this.holidayYn = type;
    },
    valid() {
      let check = true;
      if (this.startDt == '') {
        this.ment = 'message.mgsRequireStartDt';
      } else if (this.endDt == '') {
        this.ment = 'message.mgsRequireEndDt';
      } else if (this.remark == '') {
        this.ment = 'message.mgsRequireBreakdown';
      } else if (this.holidayYn == '') {
        this.ment = 'message.mgsRequireHoliYn';
      } else if (this.endDt.time.slice(-2) - this.startDt.time.slice(-2) >= 15) {
        this.ment = 'message.msgMaxDate14';
      } else if (this.endDt.time.slice(-2) - this.startDt.time.slice(-2) < 0) {
        this.ment = 'message.msgSelectAfter';
      } else {
        check = false;
      }
      return check;
    },
    async holiSave() {
      //공휴일 저장
      if (this.valid() == true) {
        this.$emit('ment', this.ment);
        this.$modal.show('TranAlarmYesModal');
      } else {
        let param = {
          sttDt: this.startDt.time,
          endDt: this.endDt.time,
          remark: this.remark,
          holidayYn: this.holidayYn,
        };
        param = this.id !== 0 ? { ...param, ...{ id: this.id } } : param;
        try {
          const response = await masterApi.putHolidaySave(param);
          await this.$parent.holidayList();
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
    async holiRemove() {
      //공휴일 삭제
      if (this.id == 0) {
        this.ment = 'message.msgRequireHolidayAdd';
      } else {
        let param = {
          id: this.id,
        };
        try {
          const response = await masterApi.putHolidayRemove(param);
          await this.$parent.holidayList();
          if (response.data.status == 200) {
            this.ment = 'message.msgResultDelete';
          }
          this.$parent.showModal({ type: 'close', ment: this.ment });
        } catch (e) {
          console.log(e);
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    modalClose() {
      this.$modal.hide('HolidayModal');
    },
    open(event) {
      this.updateData = JSON.parse(JSON.stringify(event.params.data));
    },
    close() {
      this.startDt = '';
      this.endDt = '';
      this.remark = '';
      this.id = 0;
      this.ment = '';
      this.holidayYn = '';
    },
  },
  mounted() {},
  destroyed() {},
};
</script>

<style></style>
