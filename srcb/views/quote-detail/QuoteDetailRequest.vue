<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <!-- <p class="search_title">Quotation Basic Information</p> -->
      <div class="search_box" ref="search_box_height" :class="{ search_close_00: searchOpen }" :style="`height:${search_box_height}`">
        <div class="search_box_filter">
          <div class="table_section">
            <!-- 사용자 -->
            <!-- <div class="table_box" style="width: 60%; min-width: 470px">
              <table>
                <colgroup>
                  <col style="width: 290px" />
                  <col style="width: 30%" />
                  <col style="width: 20%" />
                  <col style="width: 30%" />
                </colgroup>
                <tbody>
                  <tr>
                    <td class="tb_head" colspan="4"><span class="head_situat situat_default">완료</span></td>
                  </tr>
                  <tr>
                    <th class="t-l">Requested Date</th>
                    <td class="t-r">2022.10.31</td>
                    <th class="t-l">Requested Quantity</th>
                    <td class="t-r">500</td>
                  </tr>
                  <tr>
                    <th class="t-l">Quotation Number</th>
                    <td class="t-r">4930420824</td>
                    <th class="t-l">Quotation Total Amount</th>
                    <td class="t-r">45,000,000,000</td>
                  </tr>
                  <tr>
                    <th class="t-l">PO Number</th>
                    <td class="t-r">494809kd</td>
                    <th class="t-l">Payment Terms</th>
                    <td class="t-r">은행신용</td>
                  </tr>
                </tbody>
              </table>
            </div> -->
            <!--  //사용자-->
            <!-- 영업담당자 -->
            <div class="table_box" style="width: 40%">
              <table>
                <colgroup>
                  <col style="width: 290px" />
                  <col style="width: 60%" />
                </colgroup>
                <tbody>
                  <tr>
                    <td class="tb_head" colspan="2"><span class="head_situat situat_default">완료</span></td>
                  </tr>
                  <tr>
                    <th class="t-l">Requested Date</th>
                    <td class="t-r">2022.10.31</td>
                  </tr>
                  <tr>
                    <th class="t-l">Quotation Number</th>
                    <td class="t-r">4930420824</td>
                  </tr>
                  <tr>
                    <th class="t-l">PO Number</th>
                    <td class="t-r">494809kd</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- //영업담당자 -->
            <div class="table_box" style="width: 20%">
              <table>
                <colgroup>
                  <col style="width: 55%" />
                  <col style="width: 45%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th class="t-l">Requested Quantity</th>
                    <td class="t-r">500</td>
                  </tr>
                  <tr>
                    <th class="t-l">Sales Total Amount</th>
                    <td class="t-r">60,000,000,000</td>
                  </tr>
                  <tr>
                    <th class="t-l">Quotation Total Amount</th>
                    <td class="t-r">45,000,000,000</td>
                  </tr>
                  <tr>
                    <th class="t-l">Payment Terms</th>
                    <td class="t-r">은행신용</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="table_box" style="width: 40%">
              <table>
                <colgroup>
                  <col style="width: 40%" />
                  <col style="width: 20%" />
                  <col style="width: 20%" />
                  <col style="width: 20%" />
                </colgroup>
                <tbody>
                  <tr>
                    <td class="tb_head" colspan="4">
                      <div class="head_progress">
                        <i class="bar" style="width: 90%"></i>
                        <span class="progress_txt">100%</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th class="t-l">Total Booked Quantity</th>
                    <td class="t-r" colspan="3">450</td>
                  </tr>
                  <tr>
                    <th class="t-l">Delivery Completed</th>
                    <td class="t-r" colspan="3">450</td>
                  </tr>
                  <tr>
                    <th class="t-l">Ongoing SUM</th>
                    <td class="t-r">20</td>
                    <th class="t-l">Closed Vol.</th>
                    <td class="t-r">30</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="table_section">
            <div class="table_box" style="width: 100%">
              <table>
                <colgroup>
                  <col style="width: 290px" />
                  <col style="width: 35%" />
                  <col style="width: 20%" />
                  <col style="width: 35%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th class="t-l">Address</th>
                    <td class="t-l" colspan="3">SQ4 Diplomatic Complex., Do Nhuan St., Xuan Dao, Bac Tu Liem, Hanoi, Vietnam</td>
                  </tr>
                  <tr>
                    <th class="t-l">Receiver</th>
                    <td class="t-l" colspan="3">동화기업</td>
                  </tr>
                  <tr>
                    <th class="t-l">contact 1</th>
                    <td class="t-l">000-000-0000</td>
                    <th class="t-l">Contact 2</th>
                    <td class="t-l">000-000-0000</td>
                  </tr>
                  <tr>
                    <th class="t-l">Customer Comments</th>
                    <td class="t-l" colspan="3">
                      <button class="btn"><img src="@/assets/img/icon_note.png" alt="note" /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- 영업담당자 -->
            <!-- <div class="table_box" style="width: 340px">
              <table>
                <colgroup>
                  <col style="width: 45%" />
                  <col style="width: 55%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th class="t-l">Salesman</th>
                    <td class="t-l">
                      <div class="w_100 align_row">
                        <span>김영업</span>
                        <button class="btn m-l-a"><img src="@/assets/img/icon_note.png" alt="note" /></button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th class="t-l"></th>
                    <td class="t-l">000-000-000</td>
                  </tr>
                  <tr>
                    <th class="t-l">Salesman</th>
                    <td class="t-l">
                      <div>
                        <span>최직원</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th class="t-l"></th>
                    <td class="t-l">000-000-000</td>
                  </tr>
                </tbody>
              </table>
            </div> -->
            <!-- //영업담당자 -->
          </div>
        </div>
        <div class="search_box_filter btn_box">
          <button class="btn_default btn_white">Print Quotation</button>
          <button class="btn_default btn_white">Print Contract</button>
          <button class="btn_default btn_white">Cancel Quotation</button>
          <button class="btn_default btn_white">Copy Registration</button>
        </div>
      </div>
      <button class="btn_search_content" @click="searchOpen = !searchOpen"><i :class="{ close: searchOpen }"></i></button>
    </div>
    <!-- //검색필터 영역 -->

    <!-- 리얼그리드 -->
    <div :class="[searchOpen ? 'realgrid_container realgrid_container03' : 'realgrid_container realgrid_container03 padding-on']">
      <div class="real_head">
        <div class="real_head_left">
          <small>Result <i>4</i> item</small>
        </div>
        <div class="real_head_right">
          <button class="btn_default btn_deep_green">{{ $t('button.addProduct') }}</button>
          <button class="btn_default btn_deep_green">{{ $t('button.favorite') }}</button>
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
          <MultiSelect id="Material_Group" class="btn_select_layout" style="width: 100%" v-model="selectLayout" :options="selectLayoutOptions" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Layout" @input="selectLayoutOne"></MultiSelect>
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
          <MultiSelect id="Material_Group" class="btn_select" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Change Unit"></MultiSelect>
          <!-- drop down -->
          <div class="dropdown_box">
            <button class="btn_default btn_white" @click="dropUnitOpen = !dropUnitOpen">Change Unit</button>
            <ul class="dropdown_chang_unit" :class="{ on: dropUnitOpen }">
              <li><button class="btn_dropdown">기본단위</button></li>
              <li><button class="btn_dropdown">분석단위</button></li>
            </ul>
          </div>
          <!-- //drop down -->
          <button class="btn_default btn_white">Excel Down-load</button>
          <button class="btn_default btn_white">Cancel Remining</button>
        </div>
        <div class="footer_right">
          <button class="btn_default btn_temp">남은량 취소</button>
          <button class="btn_default btn_temp">저장</button>
          <button class="btn_default btn_temp">결재상신</button>
          <button class="btn_default btn_temp">결재확인</button>
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
      selectOptions: ['기본단위', '분석단위'],
      test: 0,
      searchOpen: true,
      search_box_height: '',
      dropUnitOpen: false,
      layoutOpen: false,
      selectLayout: 'Layout',
      selectLayoutOptions: ['SAVE', 'RESET'],
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
      let val = this.$refs.search_box_height.scrollHeight + 7;
      // search_box_height 의 높이값 받아온다
      this.search_box_height = `${val}px`;
    },
    selectLayoutOne(value) {
      console.log(value);
      this.selectLayout = 'Layout';
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
