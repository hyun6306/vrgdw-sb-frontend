<template>
  <div>
    <!-- 검색필터 영역 -->
    <!-- <div class="search_content"></div> -->
    <!-- //검색필터 영역 -->
    <div class="car_section">
      <div id="TabS">
        <ul class="tab-menu">
          <li v-for="(tab, index) in tabs" v-bind:class="{ active: currentTab === index }" :key="index">
            <a v-on:click="currentTab = index">{{ tab }}</a>
          </li>
        </ul>
        <div class="tab-content pt-20" v-show="currentTab == 0">
          <!-- board 리스트 -->
          <div class="notice_section">
            <div class="mypage_form">
              <div class="table">
                <table>
                  <colgroup>
                    <col style="width: 10%" />
                    <col style="width: 15%" />
                    <col style="width: 10%" />
                    <col style="width: 15%" />
                    <col style="width: 10%" />
                    <col style="width: 15%" />
                    <col style="width: 10%" />
                    <col style="width: 15%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>주문유형</th>
                      <td class="t-l">반품주문</td>
                      <th>대리점</th>
                      <td class="t-l">하노이대리점</td>
                      <th>반품접수일</th>
                      <td class="t-l">2022-09-22</td>
                      <th>반품주문번호</th>
                      <td class="t-l"></td>
                    </tr>
                    <tr>
                      <th>원주문유형</th>
                      <td class="t-l"></td>
                      <th>미입력사유</th>
                      <td class="t-l">사유</td>
                      <th>주문품목</th>
                      <td class="t-l">MDF</td>
                      <th>반품진행상태</th>
                      <td class="t-l">주문요청</td>
                    </tr>
                    <tr>
                      <th rowspan="2">특이사항</th>
                      <td rowspan="2" colspan="2" class="t-l">의견</td>
                      <th rowspan="2">영업담당자 의견</th>
                      <td rowspan="2" colspan="2" class="t-l">의견</td>
                      <th>반품사유</th>
                      <td class="t-l">오주문</td>
                    </tr>
                    <tr>
                      <th>플랜트</th>
                      <td class="t-l">베트남1공장</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- //board 리스트 -->
        </div>
        <div class="tab-content pt-20" v-show="currentTab == 1">
          <!-- board 리스트 -->
          <div class="notice_section">
            <div class="mypage_form">
              <div class="table">
                <table>
                  <colgroup>
                    <col style="width: 10%" />
                    <col style="width: 15%" />
                    <col style="width: 10%" />
                    <col style="width: 15%" />
                    <col style="width: 10%" />
                    <col style="width: 15%" />
                    <col style="width: 10%" />
                    <col style="width: 15%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>배송유형</th>
                      <td class="t-l">동화차량</td>
                      <th>배송수단</th>
                      <td class="t-l">트럭(일반)</td>
                      <th>결재번호</th>
                      <td class="t-l">2022</td>
                      <th>반품희망일</th>
                      <td class="t-l">2022-09-22</td>
                    </tr>
                    <tr>
                      <th>배송지 명</th>
                      <td class="t-l"></td>
                      <th>담당자명</th>
                      <td class="t-l">사유</td>
                      <th>연락처1</th>
                      <td class="t-l"></td>
                      <th>희망도착시간</th>
                      <td class="t-l">종일</td>
                    </tr>
                    <tr>
                      <th>주소</th>
                      <td colspan="7" class="t-l">
                        <div class="form_input">
                          <input type="text" id="adderss01" placeholder="주소1" class="t-l" style="width: 20%" readonly />
                          <i></i>
                          <input type="text" id="adderss02" placeholder="주소2" class="t-l" style="width: 30%" readonly />
                          <i></i>
                          <input type="text" id="adderss03" placeholder="상세주소" class="t-l" style="width: 50%" readonly />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>고객요청사항</th>
                      <td colspan="7" class="t-l">의견</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- //board 리스트 -->
          <!-- 리얼그리드 -->
          <div class="realgrid_container realgrid_container12">
            <div class="real_head">
              <div class="real_head_left">
                <small>제품 목록</small>
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
                <button class="btn_default btn_temp">목록</button>
                <!-- 반품진행상태가 회수 완료가 안된 경우 disabled 클래스 추가 -->
                <button class="btn_default btn_temp disabled">입고확정</button>
              </div>
            </div>
          </div>
          <!-- //리얼그리드 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { EventBus } from '@/views/devPage/tabTest/EventBus';
import CustomerOrderGrid from '@wb/components/gridComponent/CustomerOrderGrid.vue';
//import DatePickerModal from '@/modal/DateMonthPickerModal';

export default {
  components: {
    CustomerOrderGrid,
    //DatePickerModal,
  },
  data() {
    return {
      currentTab: 0,
      tabs: ['기본정보', '배송정보'],
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
      //let val = this.$refs.search_box_height.scrollHeight;
      let val = this.$refs.search_box_height.scrollHeight;
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

<style></style>
