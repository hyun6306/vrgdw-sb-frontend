<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box" ref="search_box_height" :class="{ search_close_01: searchOpen }" :style="`height:${search_box_height}`">
        <div class="search_box_filter always_exposure">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">출고상태</span>
              <MultiSelect id="" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">플랜트</span>
              <!-- 체크박스 멀티 셀렉트 -->
              <div class="checkbox_multiselect essential">
                <button class="select_default" @click="checkboxMultiselect = !checkboxMultiselect">
                  <div class="select_title">
                    <span>다중선택</span>
                    <span>다중선택</span>
                    <span>다중선택</span>
                    <span>다중선택</span>
                    <span>다중선택</span>
                    <span>다중선택</span>
                    <span>다중선택</span>
                    <span>다중선택</span>
                    <span>다중선택</span>
                    <span>다중선택</span>
                    <span>다중선택</span>
                    <span>다중선택</span>
                  </div>
                  <i :class="{ on: checkboxMultiselect }"></i>
                </button>
                <ul class="dropdown" :class="{ on: checkboxMultiselect }">
                  <li>
                    <label class="chechbox_basic">
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                      선택 1선택 1선택 1선택 1선택 1선택 1
                    </label>
                  </li>
                  <li>
                    <label class="chechbox_basic">
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                      선택 2
                    </label>
                  </li>
                </ul>
              </div>
              <!-- //체크박스 멀티 셀렉트 -->
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">검색어</span>
              <input type="text" id="" style="width: 100%" class="t-l" placeholder="" />
            </label>

            <button class="btn_search_text">검색</button>
          </div>
        </div>
        <div class="search_box_filter f_action c_action03">
          <div class="filter_list">
            <label for="" class="filter_type filter_type_double">
              <span class="filter_type_title filter_type_title_multiselect">
                <MultiSelect id="" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="배송희망일"></MultiSelect>
              </span>
              <!-- 데이터피커 -->
              <div class="form_calendar w_100 essential">
                <input type="text" placeholder="기간 선택" />
                <button class="icon_calendar" @click="datePicker('DatePicker')"><img src="@/assets/img/icon_calendar.png" /></button>
              </div>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">배송형태</span>
              <MultiSelect id="Material_Group" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
            </label>

            <button class="btn_reset">초기화</button>
          </div>
        </div>
        <div class="search_box_filter f_action c_action02">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">출고구분</span>
              <MultiSelect id="Material_Group" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">고객사</span>
              <MultiSelect id="Material_Group" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
              <div class="form_calendar w_100" style="margin-left: 5px">
                <input type="text" />
              </div>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">차량유형</span>
              <MultiSelect id="Material_Group" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
            </label>
          </div>
        </div>
        <div class="search_box_filter f_action c_action01">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">주문유형</span>
              <MultiSelect id="Material_Group" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
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
          <small>출고요청목록</small>
          <small class="ml-30">총<i>4</i>건</small>
          <small class="ml-30">출고량 <i>4</i></small>
          <small class="ml-30">중량<i>4</i>T</small>
          <small class="ml-30">부피<i>4</i>M3</small>
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
          <button class="btn_default btn_white">기타주문등록</button>
          <button class="btn_default btn_white">기타주문 업로드</button>
          <button class="btn_default btn_white">Excel Down-load</button>
        </div>
        <div class="footer_right">
          <button class="btn_default btn_temp">출고요청취소</button>
          <button class="btn_default btn_temp">저장</button>
          <button class="btn_default btn_temp">출고수량분할</button>
          <button class="btn_default btn_temp">수량분할취소</button>
          <button class="btn_default btn_temp">운송사 선택</button>
          <button class="btn_default btn_temp">배차요청</button>
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
      checkboxMultiselect: false,
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
