<template>
  <div class="wrap">
    <h1 class="modal_h1">{{ $t('label.modalZip') }}</h1>
    <div class="modal_list_container">
      <h2>공통사용 모달</h2>
      <div class="modal_list_content">
        <div class="modal_list_section">
          <button type="primary" @click="alarm">알림모달(yes&no)</button>
          <AlarmModal />
        </div>
        <div class="modal_list_section">
          <button type="primary" @click="alarmYes">알림모달(yes)</button>
          <AlarmYesModal />
        </div>
        <div class="modal_list_section">
          <div class="form_calendar">
            <input type="text" placeholder="날짜 선택" readonly />
            <button class="icon_calendar" @click="datePicker('DatePicker')"><img src="@/assets/img/icon_calendar.png" /></button>
          </div>
          <DatePickerModal />
        </div>
        <div class="modal_list_section">
          <div class="form_calendar">
            <input type="text" placeholder="달 선택" readonly />
            <button class="icon_calendar" @click="datePicker('DateMonthPicker')"><img src="@/assets/img/icon_calendar.png" /></button>
          </div>
          <DateMonthPickerModal />
        </div>
        <div class="modal_list_section">
          <div class="form_calendar">
            <input type="text" placeholder="기간 선택" readonly />
            <button class="icon_calendar" @click="datePicker('DateRangePicker')"><img src="@/assets/img/icon_calendar.png" /></button>
          </div>
          <DateRangePickerModal />
        </div>
      </div>
    </div>
    <div class="modal_list_container">
      <h2>견적요청</h2>
      <div class="modal_list_content">
        <div class="modal_list_section">
          <button type="primary" @click="productDetailOpen = !productDetailOpen">제품상세</button>
          <ProductDetailModal :productDetailOpen="productDetailOpen" @closeProductDetail="productDetailOpen = !productDetailOpen" />
        </div>
      </div>
    </div>
    <div class="modal_list_container">
      <h2>견적상세</h2>
      <div class="modal_list_content">
        <div class="modal_list_section">
          <button type="primary" @click="productInfoOpen = !productInfoOpen">아이템 정보</button>
          <ProductInfoModal :productInfoOpen="productInfoOpen" @closeproductInfo="productInfoOpen = !productInfoOpen" />
        </div>
      </div>
    </div>
    <div class="modal_list_container">
      <h2>부킹관리</h2>
      <div class="modal_list_content">
        <div class="modal_list_section">
          <button type="primary" @click="bookingManageOpen = !bookingManageOpen">부킹관리 상세 모달</button>
          <BookingManageModal :bookingManageOpen="bookingManageOpen" @closebookingManage="bookingManageOpen = !bookingManageOpen" />
        </div>
      </div>
    </div>
    <div class="modal_list_container">
      <h2>로그인</h2>
      <div class="modal_list_content">
        <div class="modal_list_section">
          <button type="primary" @click="IdPw">임시비번로그인</button>
          <IdPwModal />
        </div>
        <div class="modal_list_section">
          <button type="primary" @click="PwChange">비밀번호변경</button>
          <PwChangeModal />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IdPwModal from '@mb/components/modal/IdPwModal'; //아이디/패스워드 찾기
import PwChangeModal from '@mb/components/modal/PwChangeModal'; // 비번변경
import AlarmModal from '@mb/components/modal/AlarmModal'; //기본알림모달 yes&no
import AlarmYesModal from '@mb/components/modal/AlarmYesModal'; //기본알림모달 yes
import DatePickerModal from '@mb/components/modal/DatePickerModal.vue';
import DateRangePickerModal from '@mb/components/modal/DateRangePickerModal.vue';
import DateMonthPickerModal from '@mb/components/modal/DateMonthPickerModal.vue';
import ProductDetailModal from '@mb/components/modal/quote/ProductDetailModal'; //견적요청 제품상세
import ProductInfoModal from '@mb/components/modal/quote/ProductInfoModal'; //견적상세 아이템 정보 제품상세
import BookingManageModal from '@mb/components/modal/quote/BookingManageModal'; //부킹관리 하단모달

export default {
  components: {
    IdPwModal,
    PwChangeModal,
    AlarmModal,
    AlarmYesModal,
    DatePickerModal,
    DateRangePickerModal,
    DateMonthPickerModal,
    ProductDetailModal,
    ProductInfoModal,
    BookingManageModal,
  },
  data() {
    return {
      visible: false,
      loading: false,
      productDetailOpen: false,
      productInfoOpen: false,
      bookingManageOpen: false,
      dateRange: {
        startDate: '2022-07-07',
        endDate: '2022-07-15',
      },
      datepicker: {
        startDate: '2022-07-07',
      },
      localeData: {
        direction: 'ltr',
        format: 'yyyy/mm/dd',
        separator: ' - ',
        applyLabel: ' 확인',
        cancelLabel: 'Cancel',
        weekLabel: 'W',

        customRangeLabel: 'Custom Range',
        daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        // monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        firstDay: 0,
      },
    };
  },
  methods: {
    datePicker(value) {
      this.$modal.show(value);
    },
    pageMove(path) {
      this.$router.push(path);
    },
    IdPw() {
      this.$modal.show('IdPwModal');
    },
    PwChange() {
      this.$modal.show('PwChangeModal');
    },
    alarm() {
      this.$modal.show('AlarmModal');
    },
    alarmYes() {
      this.$modal.show('AlarmYesModal');
    },
  },
};
</script>
