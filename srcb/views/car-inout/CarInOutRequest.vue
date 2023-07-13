<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box" ref="search_box_height" :class="{ search_close_01: searchOpen }" :style="`height:${search_box_height}`">
        <div class="search_box_filter always_exposure">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">운송사</span>
              <!-- 운송사 로그인시 선택 불가 -->
              <input type="text" id="담당자명" style="" class="disabled t-l" disabled placeholder="" />
              <!-- 물류담당자 로그인시 선택 가능 -->
              <!-- <MultiSelect id="Material_Group" class="essential" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="선택"></MultiSelect> -->
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">입차구분</span>
              <MultiSelect id="" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="전체"></MultiSelect>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">출차구분</span>
              <MultiSelect id="" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="전체"></MultiSelect>
            </label>

            <button class="btn_search_text">검색</button>
          </div>
        </div>
        <div class="search_box_filter f_action c_action02">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">차량번호</span>
              <div class="form_inputnbtn">
                <input type="text" style="" id="custoer_name" placeholder="" />
                <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
              </div>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">배차계획번호</span>
              <input type="text" id="" style="width: 100%" class="t-l" placeholder="" />
            </label>
            <button class="btn_reset">초기화</button>
          </div>
        </div>
        <div class="search_box_filter f_action c_action01">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">
                <MultiSelect id="" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="배차 완료일"></MultiSelect>
              </span>
              <!-- 데이터피커 -->
              <div class="form_calendar w_100 essential">
                <input type="text" placeholder="기간 선택" />
                <button class="icon_calendar" @click="datePicker('DatePicker')"><img src="@/assets/img/icon_calendar.png" /></button>
              </div>
            </label>
          </div>
        </div>
      </div>
      <button class="btn_search_content" @click="searchOpen = !searchOpen"><i :class="{ close: searchOpen }"></i></button>
    </div>
    <!-- //검색필터 영역 -->

    <!-- 리얼그리드 -->
    <div :class="[searchOpen ? 'realgrid_container realgrid_container09' : 'realgrid_container realgrid_container09 padding-on']">
      <div class="real_head">
        <div class="real_head_left">
          <small>입/출차내역</small>
          <small class="ml-30">총<i>4</i>건</small>
        </div>
        <div class="real_head_right">
          <button class="btn_default btn_deep_green">버튼 1</button>
        </div>
      </div>
      <div class="real_top_filter">
        <div class="real_top_left"></div>
        <div class="real_top_right">
          <button class="btn_default btn_filter">
            <img src="@/assets/img/icon_vertical.png" />
            <span>{{ $t('button.fixColumn') }}</span>
          </button>
          <button class="btn_default btn_filter">
            <img src="@/assets/img/icon_hori.png" />
            <span>{{ $t('button.fixRow') }}</span>
          </button>
          <!-- <button class="btn_default btn_filter">
            <img src="@/assets/img/icon_filter.png" />
            <span>Filter</span>
          </button> -->
          <button class="btn_default btn_filter">
            <img src="@/assets/img/icon_trace.png" />
            <span>{{ $t('button.deleteChoose') }}<i>(2)</i></span>
          </button>
          <!-- drop down -->
          <div class="dropdown_box">
            <button class="btn_default btn_filter" @click="layoutOpen = !layoutOpen">
              <span>Layout</span>
            </button>
            <ul class="dropdown_layout" :class="{ on: layoutOpen }">
              <li><button class="btn_dropdown btn_save">save</button></li>
              <li><button class="btn_dropdown btn_reset">reset</button></li>
            </ul>
          </div>
          <!-- //drop down -->
        </div>
      </div>
      <div class="real_body real_body04">
        <CustomerOrderGrid style="height: 100%" :gridName="'customerOrder'" @openSingleCalendar="openSingleCalendar" :selectMonth="selectMonth" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <button class="btn_default btn_white">Excel Down-load</button>
        </div>
        <div class="footer_right">
          <button class="btn_default btn_temp">입차확정</button>
          <button class="btn_default btn_temp">출차확정</button>
        </div>
      </div>
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
      searchOpen: true,
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
    getInfoHeight() {
      //let val = this.$refs.search_box_height.scrollHeight;
      let val = this.$refs.search_box_height.scrollHeight + 9;
      // search_box_height 의 높이값 받아온다
      this.search_box_height = `${val}px`;
    },
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
    this.getInfoHeight();
  },
  destroyed() {},
};
</script>

<style>
.checkbox-label {
  display: block;
}
</style>
