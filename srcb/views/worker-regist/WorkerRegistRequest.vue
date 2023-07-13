<template>
  <div>
    <!-- 검색필터 영역 -->
    <!-- <div class="search_content"></div> -->
    <!-- //검색필터 영역 -->

    <!-- 기본정보수정 -->
    <div class="client_section">
      <!-- board 리스트 -->
      <div class="notice_section">
        <div class="mypage_form">
          <h2 class="mypage_title">직원등록</h2>

          <div class="mypage_form_table">
            <table>
              <colgroup>
                <col style="width: 13.3%" />
                <col style="width: 20%" />
                <col style="width: 13.3%" />
                <col style="width: 20%" />
                <col style="width: 13.3%" />
                <col style="width: 20%" />
              </colgroup>
              <tr>
                <th><label class="list_title" for="">파트너명</label></th>
                <td>
                  <div class="form_input"><input type="text" id="" class="t-l solo_input disabled" disabled placeholder="베트남 운용사" /></div>
                </td>
                <th><label class="list_title" for="">파트너 코드</label></th>
                <td>
                  <div class="form_input"><input type="text" id="" class="solo_input disabled" disabled placeholder="C001" /></div>
                </td>
                <th><label class="list_title" for="">이름</label></th>
                <td>
                  <div class="form_input">
                    <span class="essential" style="width: 100%"><input type="text" id="" class="t-l solo_input" placeholder="동화베트남" /></span>
                  </div>
                </td>
              </tr>
              <tr>
                <th><label class="list_title" for="">사원번호</label></th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="t-l solo_input" placeholder="00-000-0000" />
                  </div>
                </td>
                <th><label class="list_title" for="">사원유형</label></th>
                <td>
                  <div class="form_input">
                    <MultiSelect id="" class="essential" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                  </div>
                </td>
                <th><label class="list_title" for="">직급</label></th>
                <td>
                  <div class="form_input">
                    <MultiSelect id="" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                  </div>
                </td>
              </tr>
              <tr>
                <th><label class="list_title" for="">재직구분</label></th>
                <td>
                  <div class="form_input">
                    <MultiSelect id="" class="essential" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                  </div>
                </td>

                <th><label class="list_title" for="">E-mail</label></th>
                <td colspan="3">
                  <div class="form_input">
                    <input type="text" id="" class="solo_input" style="width: 150px" placeholder="" />
                    <span class="board_intxt">@</span>
                    <input type="text" id="" class="solo_input" style="width: 250px" placeholder="" />
                  </div>
                </td>
              </tr>
              <tr>
                <th><label class="list_title" for="">입사일</label></th>
                <td>
                  <div class="form_input">
                    <div class="form_calendar w_100">
                      <input type="text" placeholder="기간 선택" />
                      <button class="icon_calendar" @click="datePicker('DatePicker')"><img src="@/assets/img/icon_calendar.png" /></button>
                    </div>
                  </div>
                </td>
                <th><label class="list_title" for="">퇴직일</label></th>
                <td>
                  <div class="form_input">
                    <div class="form_calendar w_100">
                      <input type="text" placeholder="기간 선택" />
                      <button class="icon_calendar" @click="datePicker('DatePicker')"><img src="@/assets/img/icon_calendar.png" /></button>
                    </div>
                  </div>
                </td>
                <th><label class="list_title" for="">성별</label></th>
                <td>
                  <div class="form_input">
                    <label class="radio_t">
                      <input type="radio" name="radio01" />
                      <span class="checkmark"></span>
                      <span class="board_intxt">남</span>
                    </label>
                    <label class="radio_t">
                      <input type="radio" name="radio01" />
                      <span class="checkmark"></span>
                      <span class="board_intxt">여</span>
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <th><label class="list_title" for="">휴대폰번호</label></th>
                <td>
                  <div class="form_input">
                    <span class="essential">
                      <input type="text" id="phone_number_1_01" style="width: 60px" class="essential t-c three_input" placeholder="0651" />
                    </span>
                    <i>-</i>
                    <input type="text" id="phone_number_1_02" style="width: 60px" class="t-c three_input" placeholder="0651" />
                    <i>-</i>
                    <input type="text" id="phone_number_1_03" style="width: 60px" class="t-c three_input" placeholder="0651" />
                  </div>
                </td>
                <th><label class="list_title" for="">전화번호</label></th>
                <td>
                  <div class="form_input">
                    <span class="essential">
                      <input type="text" id="phone_number_2_01" style="width: 60px" class="essential t-c three_input" placeholder="0651" />
                    </span>
                    <i>-</i>
                    <input type="text" id="phone_number_2_02" style="width: 60px" class="t-c three_input" placeholder="0651" />
                    <i>-</i>
                    <input type="text" id="phone_number_2_03" style="width: 60px" class="t-c three_input" placeholder="0651" />
                  </div>
                </td>
              </tr>
              <tr>
                <th><label class="list_title" for="">D-Sales 사용여부</label></th>
                <td>
                  <div class="form_input">
                    <label class="radio_t">
                      <input type="radio" name="radio02" />
                      <span class="checkmark"></span>
                      <span class="board_intxt">허용</span>
                    </label>
                    <label class="radio_t">
                      <input type="radio" name="radio02" />
                      <span class="checkmark"></span>
                      <span class="board_intxt">거부</span>
                    </label>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div class="board_footer">
            <div class="footer_left"></div>
            <div class="footer_right">
              <button class="btn_default btn_temp">취소</button>
              <button class="btn_default btn_temp">저장</button>
            </div>
          </div>
        </div>
      </div>
      <!-- //board 리스트 -->
    </div>
    <!-- //기본정보수정 -->
  </div>
</template>

<script>
// import { EventBus } from '@/views/devPage/tabTest/EventBus';

export default {
  components: {},
  data() {
    return {
      currentTab: 0,
      tabs: ['고객사', '운송사'],
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
      let val = this.$refs.search_box_height.scrollHeight;
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
