<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">일자</span>
              <div class="form_calendar w_100">
                <input type="text" placeholder="기간 선택" />
                <button class="icon_calendar" @click="datePicker('DatePicker')"><img src="@/assets/img/icon_calendar.png" /></button>
              </div>
            </label>
            <button class="btn_reset">초기화</button>
            <button class="btn_search_text ml-0">검색</button>
          </div>
        </div>
      </div>
    </div>
    <!-- //검색필터 영역 -->

    <!-- 캘린더 -->
    <div class="demo-app calander_container">
      <div class="demo-app-main">
        <p class="calendar_guide">* 달력등록안내 : 평일의 출고가능상태는 Y 이며, 주말의 출고상태는 N 입니다 / 평일과 주말의 출고가능 상태를 변경하려면 상태값을 변경해주세요</p>
        <FullCalendar class="demo-app-calendar" :options="calendarOptions">
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
        <button class="btn_default btn_temp">휴일등록</button>
      </div>
    </div>

    <DatePickerModal @chooseMonth="chooseMonth" :currentMonth="currentMonth" />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },

  data: function () {
    return {
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
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
      eventGuid: 0,
    };
  },

  methods: {
    createEventId() {
      return String(this.eventGuid++);
    },
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },

    handleDateSelect(selectInfo) {
      let title = prompt('Please enter a new title for your event');
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect(); // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: this.createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      }
    },

    handleEventClick(clickInfo) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove();
      }
    },

    handleEvents(events) {
      this.currentEvents = events;
    },
  },
};
</script>

<style></style>
