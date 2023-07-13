<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter always_exposure">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">사업부</span>
              <div class="form_input">
                <input type="text" class="w_100 disabled" placeholder="" disabled />
              </div>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">고객사</span>
              <div class="form_inputnbtn">
                <input type="text" style="" id="custoer_name" placeholder="" />
                <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
              </div>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">영업사원</span>
              <div class="form_inputnbtn">
                <input type="text" style="" id="custoer_name" placeholder="" />
                <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
              </div>
            </label>
            <button class="btn_search_text">검색</button>
          </div>
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">영업팀</span>
              <div class="form_inputnbtn">
                <input type="text" style="" id="custoer_name" placeholder="" />
                <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
              </div>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">제품레벨</span>
              <MultiSelect id="" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="선택"></MultiSelect>
            </label>
            <button class="btn_reset">초기화</button>
          </div>
        </div>
      </div>
    </div>
    <!-- //검색필터 영역 -->

    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container16">
      <div class="real_head">
        <div class="real_head_left">
          <small class="">총<i>4</i>건</small>
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
      <div class="real_body real_body14">
        <CustomerOrderGrid style="height: 100%" :gridName="'customerOrder'" @openSingleCalendar="openSingleCalendar" :selectMonth="selectMonth" />
      </div>
    </div>
    <!-- //리얼그리드 -->
    <!-- 검색필터 영역 -->
    <p class="sub_title">일괄수정 영업사원</p>
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter always_exposure">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">영업사원</span>
              <div class="form_inputnbtn">
                <input type="text" style="" id="custoer_name" placeholder="" />
                <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
              </div>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">영업팀</span>
              <div class="form_inputnbtn">
                <input type="text" style="" id="custoer_name" placeholder="" />
                <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
              </div>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">영업지원</span>
              <div class="form_inputnbtn">
                <input type="text" style="" id="custoer_name" placeholder="" />
                <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="board_footer board_footer02">
      <div class="footer_left">
        <button class="btn_default btn_white">엑셀 다운로드</button>
      </div>
      <div class="footer_right">
        <button class="btn_default btn_temp">저장</button>
      </div>
    </div>
    <!-- //검색필터 영역 -->
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
      let val = this.$refs.search_box_height.scrollHeight + 6;
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
