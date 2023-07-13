<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.date') }}</span>
              <div class="form_calendar w_100">
                <input type="text" :placeholder="$t('message.selectPeriod')" v-model="currentMonth" />
                <button class="icon_calendar" @click="datePicker('DateMonthPicker')"><img src="@/assets/img/icon_calendar.png" /></button>
              </div>
            </label>
            <button class="btn_reset" @click="monthSearch('reset')">{{ $t('message.btnInit') }}</button>
            <button class="btn_search_text ml-0" @click="monthSearch('search')">{{ $t('message.btnSearch') }}</button>
          </div>
        </div>
      </div>
    </div>
    <!-- //검색필터 영역 -->

    <!-- 캘린더 -->
    <div class="demo-app calander_container">
      <div class="demo-app-main">
        <p class="calendar_guide"></p>
        <FullCalendar class="demo-app-calendar" :options="calendarOptions" ref="fullCalendar">
          <template v-slot:eventContent="arg">
            <b>{{ arg.timeText }}</b>
            <i>{{ arg.event.title }}</i>
          </template>
        </FullCalendar>
      </div>
    </div>
    <!-- //캘린더 -->

    <div class="real_footer">
      <div class="footer_left"></div>
      <div class="footer_right">
        <button class="btn_default btn_critical_process" @click="newHoliday">{{ $t('message.btnAddHoliday') }}</button>
      </div>
    </div>
    <HolidayModal ref="holidayModal" />
    <AlarmYesModal :ment="ment" />
    <DateMonthPickerModal @chooseMonth="chooseMonth" :currentMonth="currentMonth" />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import masterApi from '@/api/master/master';
import DateMonthPickerModal from '@/modal/DateMonthPickerModal';
import HolidayModal from '@/modal/master/HolidayModal';
import AlarmYesModal from '@/modal/AlarmYesModal';

export default {
  components: {
    DateMonthPickerModal,
    HolidayModal,
    AlarmYesModal,
    FullCalendar, // make the <FullCalendar> tag available
  },

  data: function () {
    return {
      //데이트피커
      currentMonth: '',
      //
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        customButtons: {
          prev: {
            click: () => {
              let calendarApi = this.$refs.fullCalendar.getApi();
              this.moveMonth('prev');
              calendarApi.prev();
            },
          },
          next: {
            click: () => {
              let calendarApi = this.$refs.fullCalendar.getApi();
              this.moveMonth('next');
              calendarApi.next();
            },
          },
        },
        initialView: 'dayGridMonth',
        todayStr: new Date().toISOString().replace(/T.*$/, ''),
        initialEvents: [
          {
            id: this.createEventId(),
            title: 'All-day event',
            start: this.todayStr,
          },
          {
            id: this.createEventId(),
            title: 'Timed event',
            start: this.todayStr + 'T12:00:00',
          },
        ],
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        showNonCurrentDates: false,
        fixedWeekCount: false,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
        dayCellClassNames: this.dayCellClassNames,
        events: [],
      },
      currentEvents: [],
      eventGuid: 0,
      //
      calendarMonth: '',
      holidays: [],
      ment: '',
      clickedEvent: '',
    };
  },
  watch: {},
  methods: {
    moveMonth(type) {
      //
      let calendarApi = this.$refs.fullCalendar.getApi();
      let getDate = calendarApi.getDate();
      let date = new Date(getDate);
      let year = date.getFullYear(date);
      let month = date.getMonth(date) + 1;
      if (type == 'prev') {
        if (month === 1) {
          this.currentMonth = 12 + '-' + (year - 1);
        } else {
          this.currentMonth = month - 1 + '-' + year;
        }
        this.holidayList();
      } else {
        if (month === 12) {
          this.currentMonth = 1 + '-' + (year + 1);
        } else {
          this.currentMonth = month + 1 + '-' + year;
        }
        this.holidayList();
      }
    },
    //데이트피커
    datePicker() {
      this.$modal.show('DateMonthPicker', { type: 'calendar' });
    },
    chooseMonth(month) {
      this.currentMonth = month;
    },
    //검색,초기화
    monthSearch(type) {
      if (type == 'reset') {
        //초기화
        this.currentMonth = this.calendarMonth;
      } else {
        //1. this.current에 해당하는 달로 이동
        let calendarApi = this.$refs.fullCalendar.getApi();
        let month = this.$revertDateFormatM(this.currentMonth);
        calendarApi.gotoDate(month);
        //2. 이동한 달의 공휴일 목록 api불러오기
        this.holidayList();
      }
    },
    //휴일 추가
    newHoliday() {
      this.$modal.show('HolidayModal', { data: '' });
    },
    //모달
    async showModal(data) {
      if (data.type == 'close') {
        await this.$refs.holidayModal.modalClose();
      }
      this.ment = data.ment;
      this.$modal.show('AlarmYesModal');
    },
    //
    createEventId() {
      return String(this.eventGuid++);
    },
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },
    handleDateSelect() {},
    handleEventClick(clickInfo) {
      //이벤트 클릭했을때
      let id = clickInfo.event.id;
      this.holidays.forEach(data => {
        if (data.id == id) {
          this.clickedEvent = data;
          this.$modal.show('HolidayModal', { data: data });
        }
      });
    },
    handleEvents(events) {
      this.currentEvents = events;
    },
    setColor(type, start, end) {
      let startDate = start.split('-');
      let endDate = end.split('-');
      for (let key = startDate[2]; key <= endDate[2]; key++) {
        key = ('0' + key).slice(-2);
        let elements = document.getElementsByClassName(`day${key}`);
        for (let i = 0; i < elements.length; i++) {
          // elements[i].style.color = type === 'red' ? '#ef1919' : '#666';
          if (type == 'red') {
            elements[i].style.color = '#ef1919';
          } else {
            elements[i].style.color = '#666';
          }
        }
      }
    },
    dayCellClassNames(args) {
      let dayText = args.dayNumberText;
      if (dayText.length == 1) {
        dayText = '0' + dayText;
      }
      return [`day${dayText}`, `defaultColor`];
    },
    addevent(data) {
      let endDt = data.endDt.split('-');
      endDt[2] = Number(endDt[2]) + 1;
      this.calendarOptions.events.push({
        id: data.id,
        title: data.remark,
        start: data.sttDt,
        end: endDt.join('-'),
        allDay: true,
        className: 'fc-event-offday',
      });
    },
    eventReset() {
      this.calendarOptions.events = [];
      this.holidays = [];
      let month = this.$revertDateFormatM(this.currentMonth);
      this.setColor('none', month + '-01', month + '-31');
    },
    //공휴일 목록 조회
    async holidayList() {
      await this.eventReset();
      let param = {
        stdYm: this.$revertDateFormatM(this.currentMonth),
      };
      try {
        const response = await masterApi.getHolidayList(param);
        this.holidays = response.data.ds;
        this.holidays.forEach(data => {
          this.addevent(data);
          this.setColor('red', data.sttDt, data.endDt);
        });
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
  mounted() {
    let dt = new Date();
    let year = dt.getFullYear();
    let month = ('0' + (1 + dt.getMonth())).slice(-2);
    this.calendarMonth = month + '-' + year;
    this.currentMonth = this.calendarMonth;
    this.holidayList();
  },
};
</script>

<style>
.defaultColor {
  color: #666;
}
</style>
