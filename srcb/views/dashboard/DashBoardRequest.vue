<template>
  <div>
    <div class="dashboard_top">
      <!-- 
        추가 버튼
        대시보드에서만 보여짐
        -->
      <div class="header_btn_box">
        <button>MANUAL</button>
        <button>REFRESH</button>
      </div>
      <!-- notice -->
      <div class="dashboard_notice">
        <p class="sub_title">
          <strong>Notice</strong>
          <a class="btn_more" href="">+</a>
        </p>
        <ul class="dashboard_notice_list">
          <li>
            <a href="">
              <span>VRGDW 공지사항입니다.</span>
              <i>2022/10/30</i>
            </a>
          </li>
          <li>
            <a href="">
              <span>VRGDW 공지사항입니다.</span>
              <i>2022/10/30</i>
            </a>
          </li>
          <li>
            <a href="">
              <span>VRGDW 공지사항입니다.</span>
              <i>2022/10/30</i>
            </a>
          </li>
          <li>
            <a href="">
              <span>VRGDW 공지사항입니다.</span>
              <i>2022/10/30</i>
            </a>
          </li>
        </ul>
      </div>
      <!-- //notice -->
      <!-- 진행상황 -->
      <div class="dashboard_status">
        <!-- 영업직원 -->
        <!-- <div class="dashboard_status_column">
          <div class="status_box sales01">
            <span>견적확정필요 </span>
            <strong><i>7</i>items</strong>
            <i class="i_deco"><img src="@/assets/img/icon_dashboard01.png" /></i>
          </div>
          <div class="status_box sales02">
            <span>부킹결재필요 </span>
            <strong><i>7</i>items</strong>
            <i class="i_deco"><img src="@/assets/img/icon_dashboard01.png" /></i>
          </div>
        </div> -->
        <!-- //영업직원 -->
        <div class="status_box quote">
          <span>
            <!-- 사용자 -->견적확정
            <!-- 운송사 배차요청 -->
            <!-- 물류 출고요청 -->
          </span>

          <strong><i>7</i>items</strong>
          <i class="i_deco"><img src="@/assets/img/icon_dashboard01.png" /></i>
        </div>
        <div class="status_box booking">
          <span>
            <!-- 사용자 -->부킹확정
            <!-- 운송사 배차확정 -->
            <!-- 물류 배차확정 -->
            <!-- 영업직원 할당요청 -->
          </span>
          <strong><i>7</i>items</strong>
          <i class="i_deco"><img src="@/assets/img/icon_dashboard02.png" /></i>
        </div>
        <div class="status_box delivery">
          <span>
            <!-- 사용자 -->배송요청가능
            <!-- 운송사 입차 -->
            <!-- 물류 입차 -->
            <!-- 영업직원 할당요청 경과건수 -->
          </span>
          <strong><i>7</i>items</strong>
          <i class="i_deco"><img src="@/assets/img/icon_dashboard03.png" /></i>
        </div>
        <div class="status_box delivery_start">
          <span>
            <!-- 사용자 -->배송출발
            <!-- 운송사 배송중 -->
            <!-- 물류 배송중 -->
            <!-- 영업직원 배송요청가능 -->
          </span>
          <strong><i>7</i>items</strong>
          <i class="i_deco"><img src="@/assets/img/icon_dashboard04.png" /></i>
        </div>
      </div>
      <!-- //진행상황 -->
    </div>

    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container15">
      <div class="real_head">
        <div class="real_head_left">
          <span class="real_title">최근부킹현황</span>
          <div class="btn_box">
            <!-- 클릭 시 btn_deep_green 클래스 add -->
            <button class="btn_default btn_deep_green">전체</button>
            <button class="btn_default">일반</button>
            <button class="btn_default">샘플</button>
          </div>
        </div>
        <div class="real_head_right">
          <a class="btn_more" href="">+</a>
        </div>
      </div>
      <div class="real_body real_body15">
        <CustomerOrderGrid style="height: 100%" :gridName="'customerOrder'" @openSingleCalendar="openSingleCalendar" :selectMonth="selectMonth" />
      </div>
    </div>
    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container15 mt-40">
      <div class="real_head">
        <div class="real_head_left">
          <span class="real_title">최근배송현황</span>
        </div>
        <div class="real_head_right">
          <a class="btn_more" href="">+</a>
        </div>
      </div>
      <div class="real_body real_body15">
        <CustomerOrderGrid style="height: 100%" :gridName="'customerOrder'" @openSingleCalendar="openSingleCalendar" :selectMonth="selectMonth" />
      </div>
    </div>
    <!-- report Bi -->
    <div class="report_bi_container">
      <div class="report_bi_contents">REPORT BI</div>
      <div class="report_bi_contents">REPORT BI</div>
      <div class="report_bi_contents">REPORT BI</div>
    </div>
    <!-- //리얼그리드 -->
    <DatePickerModal @chooseMonth="chooseMonth" :currentMonth="currentMonth" />
  </div>
</template>

<script>
import CustomerOrderGrid from '@wb/components/gridComponent/CustomerOrderGrid.vue';
import DatePickerModal from '@/modal/DateMonthPickerModal';
// import { EventBus } from '@/views/devPage/tabTest/EventBus';

export default {
  components: {
    CustomerOrderGrid,
    DatePickerModal,
  },
  data() {
    return {
      currentMonth: '',
      selectMonth: '',
      selectValue: '',
      selectOptions: ['Select option', 'options', 'selected'],
      test: 0,
      dropUnitOpen: false,
      layoutOpen: false,
      searchOpen: false,
      search_box_height: '',
      options: [
        {
          language: 'JavaScript',
          library: 'Vue.js',
        },
        {
          language: 'JavaScript',
          library: 'Vue-Multiselect',
        },
        {
          language: 'JavaScript',
          library: 'Vuelidate',
        },
      ],
      value: [],
    };
  },
  methods: {
    chooseMonth(day) {
      this.selectMonth = day;
    },
    openSingleCalendar(currentMonth) {
      this.currentMonth = currentMonth;
      console.log('tetettetet: ', currentMonth);
      this.$modal.show('DateMonthPicker');
    },
    changeData() {
      this.test++;
    },
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    // getInfoHeight() {
    //   let val = this.$refs.search_box_height.scrollHeight;
    //   // search_box_height 의 높이값 받아온다
    //   this.search_box_height = `${val}px`;
    // },
    customLabel(option) {
      return `${option.library} - ${option.language}`;
    },
    isSelected(option) {
      /* unfortunatelly following line does not work as VueMultiselect for some (strange) reason 
        fills the v-model array with copies instead of original objects contained in options
      */
      // return this.value.includes(option)
      return this.value.some(op => op.library === option.library);
    },
  },
  created() {
    console.log('SampleOneCreated');
    // EventBus.$on('changeData', this.changeData);
  },
  mounted() {
    // this.getInfoHeight();
  },
  destroyed() {},
};
</script>

<style>
.checkbox-label {
  display: block;
}
</style>
