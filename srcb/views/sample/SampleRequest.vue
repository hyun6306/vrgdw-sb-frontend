<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <!-- <p class="search_title">{{ $t('label.customerInfo') }}</p> -->
      <div class="search_box" ref="search_box_height" :class="{ search_close: searchOpen }" :style="`height:${search_box_height}`">
        <div class="search_box_title always_exposure">
          <span>{{ $t('label.customerInfo') }}</span>
        </div>
        <div class="search_box_filter always_exposure">
          <div class="filter_list">
            <label for="customers_p/o_no" class="filter_type">
              <span class="filter_type_title">P/O no.</span>
              <input type="text" id="customers_p/o_no" style="" class="t-r" placeholder="" />
            </label>
            <label for="quotation_date" class="filter_type">
              <span class="filter_type_title">{{ $t('label.orderDt') }}</span>
              <input type="text" style="" class="t-l disabled" disabled placeholder="2022.05.30" />
            </label>
            <label for="custoer_name" class="filter_type">
              <span class="filter_type_title">{{ $t('label.customerNm') }}</span>
              <!-- 로그인한 사람에 따라 인풋기능 변경 -->
              <!-- <input type="text" id="custoer_name" style="width: 183px" class="t-l disabled" disabled placeholder="Customer A" /> -->

              <div class="form_inputnbtn">
                <input type="text" style="" id="custoer_name" placeholder="Customer A" />
                <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
              </div>
            </label>
          </div>
        </div>
        <div class="search_box_filter f_action f_action01">
          <div class="filter_list">
            <!-- <label for="payment_terms" class="filter_type">
              <span class="filter_type_title">{{ $t('label.payType') }}</span>
              <input type="text" id="payment_terms" style="" class="t-l disabled" disabled placeholder="Red-bill" />
            </label>
            <label for="credit_balance" class="filter_type">
              <span class="filter_type_title">{{ $t('label.pay') }}</span>
              <input type="text" id="credit_balance" style="" class="t-r disabled" disabled placeholder="0" />
            </label> -->
          </div>
        </div>
        <div class="search_box_filter f_action f_action02">
          <div class="filter_list">
            <label for="special_request" class="filter_type w_100">
              <span class="filter_type_title">{{ $t('label.requestText') }}</span>
              <input type="text" id="special_request" style="width: 100%" class="t-l" placeholder="" />
            </label>
          </div>
        </div>
        <div class="search_box_title f_action f_action03">
          <span class="filter_type_title">{{ $t('label.deliveryInfo') }}</span>
          <button class="btn_deep_gray m-l-a">{{ $t('button.shippingChooseModal') }}</button>
        </div>
        <div class="search_box_filter f_action f_action04">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('label.carType') }}</span>
              <MultiSelect id="" style="100%" class="essential" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
            </label>
            <label for="postal_code" class="filter_type">
              <span class="filter_type_title">{{ $t('label.carNum') }}</span>
              <span class="essential w_100"> <input type="text" id="postal_code" style="" class="t-r" placeholder="111" /></span>
            </label>
            <label for="drivers_mobile_phone_number" class="filter_type">
              <span class="filter_type_title" style="">{{ $t('label.driverPhone') }}</span>
              <div class="form_input">
                <span class="essential" style="width: 30%">
                  <input type="text" id="drivers_mobile_phone_number01" style="width: 100%" class="t-c three_input" placeholder="0651" />
                </span>
                <i>-</i>
                <input type="text" id="drivers_mobile_phone_number02" style="width: 30%" class="t-c three_input" placeholder="0651" />
                <i>-</i>
                <input type="text" id="drivers_mobile_phone_number03" style="width: 30%" class="t-c three_input" placeholder="0651" />
              </div>
            </label>
          </div>
        </div>
        <div class="search_box_filter f_action f_action05">
          <div class="filter_list">
            <label for="destination_name" class="filter_type">
              <span class="filter_type_title">{{ $t('label.deliveryNm') }}</span>
              <span class="essential w_100">
                <input type="text" id="destination_name" style="" class="t-r" placeholder="000000" />
              </span>
            </label>
            <label for="postal_code" class="filter_type">
              <span class="filter_type_title">{{ $t('label.postCd') }}</span>
              <input type="text" id="postal_code" style="" class="t-r" placeholder="000000" />
            </label>
            <div class="filter_type">
              <label class="chechbox_basic">
                <input type="checkbox" />
                <span class="checkmark"></span> {{ $t('label.chooseDefaultDelivery') }}
              </label>
            </div>
            <label for="special_note" class="special_note filter_type m-l-a">
              <span class="filter_type_title" style="">{{ $t('label.speciText') }}</span>
              <button class="btn_download"><img src="@/assets/img/icon_note.png" alt="note" /></button>
            </label>
          </div>
        </div>
        <div class="search_box_filter f_action f_action06">
          <div class="filter_list">
            <label for="adderss01" class="filter_type w_100">
              <span class="filter_type_title">{{ $t('label.address') }}</span>
              <div class="form_input">
                <MultiSelect id="adderss01" style="width: 220px; flex-shrink: 0" class="essential" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                <i></i>
                <MultiSelect id="adderss02" style="width: 371px; flex-shrink: 0" class="essential" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                <i></i>
                <span class="w_100">
                  <input type="text" id="adderss03" style="width: 100%" class="t-l" placeholder="" />
                </span>
              </div>
              <!-- <div class="form_input_address">
                <div class="form_input">
                  <MultiSelect id="adderss01" style="width: 160px; flex-shrink: 0" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                  <i></i>
                  <MultiSelect id="adderss02" style="width: 200px; flex-shrink: 0" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                  <i></i>
                  <input type="text" id="adderss03" style="width: 100%" class="t-l" placeholder="" />
                </div>
                <div class="form_input">
                  <input type="text" id="adderss_detail" style="width: 100%" class="t-l" placeholder="" />
                </div>
              </div> -->
            </label>
          </div>
        </div>
        <div class="search_box_filter f_action f_action07">
          <div class="filter_list">
            <label for="destinations_phone_number_1" class="filter_type">
              <span class="filter_type_title">{{ $t('label.chargePersonNm') }}</span>
              <input type="text" id="담당자명" style="" class="t-l" placeholder="" />
            </label>
            <label for="destinations_phone_number_1_01" class="filter_type">
              <span class="filter_type_title" style="">{{ $t('label.deliAddressPhone') }} (1)</span>
              <div class="form_input">
                <span class="essential" style="width: 30%">
                  <input type="text" id="destinations_phone_number_1_01" class="t-c three_input" placeholder="0651" />
                </span>
                <i>-</i>
                <input type="text" id="destinations_phone_number_1_02" style="width: 30%" class="t-c three_input" placeholder="0651" />
                <i>-</i>
                <input type="text" id="destinations_phone_number_1_03" style="width: 30%" class="t-c three_input" placeholder="0651" />
              </div>
            </label>
            <label for="destinations_phone_number_1_01" class="filter_type">
              <span class="filter_type_title" style="">{{ $t('label.deliAddressPhone') }} (1)</span>
              <div class="form_input">
                <input type="text" id="destinations_phone_number_1_01" style="width: 30%" class="t-c three_input" placeholder="0651" />
                <i>-</i>
                <input type="text" id="destinations_phone_number_1_02" style="width: 30%" class="t-c three_input" placeholder="0651" />
                <i>-</i>
                <input type="text" id="destinations_phone_number_1_03" style="width: 30%" class="t-c three_input" placeholder="0651" />
              </div>
            </label>
          </div>
        </div>
      </div>
      <button class="btn_search_content" @click="searchOpen = !searchOpen"><i :class="{ close: searchOpen }"></i></button>
    </div>
    <!-- //검색필터 영역 -->

    <!-- 리얼그리드 -->
    <div class="realgrid_container">
      <div class="real_head">
        <div class="real_head_left">
          <span class="real_title">Material Information</span>
          <small>Result <i>4</i> item</small>
        </div>
        <div class="real_head_right">
          <button class="btn_default btn_deep_green">Material Search</button>
          <button class="btn_default btn_deep_green">Bookmark</button>
        </div>
      </div>
      <div class="real_top_filter">
        <div class="real_top_left">
          <span class="real_top_filter_title">Bbatch Application (Required Delivery Month) <i>(2)</i></span>
          <!-- 데이터피커 -->
          <div class="form_calendar">
            <input type="text" placeholder="날짜 선택" />
            <button class="icon_calendar" @click="datePicker('DatePicker')"><img src="@/assets/img/icon_calendar.png" /></button>
          </div>
        </div>
        <div class="real_top_right">
          <button class="btn_default btn_filter">
            <img src="@/assets/img/icon_vertical.png" />
            <span>Vertical Fixation</span>
          </button>
          <button class="btn_default btn_filter">
            <img src="@/assets/img/icon_hori.png" />
            <span>Horizontal Fixation</span>
          </button>
          <button class="btn_default btn_filter">
            <img src="@/assets/img/icon_filter.png" />
            <span>Filter</span>
          </button>
          <button class="btn_default btn_filter">
            <img src="@/assets/img/icon_trace.png" />
            <span>Delete Selection<i>(2)</i></span>
          </button>
        </div>
      </div>
      <div class="real_body real_body03">
        <CustomerOrderGrid style="height: 100%" :gridName="'SampleOrder'" @openSingleCalendar="openSingleCalendar" :selectMonth="selectMonth" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <button class="btn_default btn_white">Refresh</button>
          <button class="btn_default btn_white">Excel Up-load(Template)</button>
          <button class="btn_default btn_white">Excel Up-load</button>
        </div>
        <div class="footer_right">
          <button class="btn_default btn_temp">Temporary Save</button>
          <button class="btn_default btn_temp">Quatation Request</button>
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
      searchOpen: true,
      search_box_height: '',
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
      let val = this.$refs.search_box_height.scrollHeight + 17;
      // search_box_height 의 높이값 받아온다
      this.search_box_height = `${val}px`;
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

<style></style>
