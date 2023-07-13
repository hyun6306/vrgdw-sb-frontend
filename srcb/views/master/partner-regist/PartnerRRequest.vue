<template>
  <div>
    <div class="master_form">
      <h2 class="mypage_title">기본정보</h2>
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
            <th><label class="list_title" for="">사업부</label></th>
            <td colspan="3">
              <div class="form_input" style="width: 70%">
                <input type="text" id="" style="width: 300px" class="t-l solo_input disabled" disabled placeholder="베트남 운용사" />
                <input type="text" id="" class="t-l solo_input" placeholder="" />
                <button class="btn_intable">불러오기</button>
              </div>
            </td>
            <th><label class="list_title" for="">대리점코드</label></th>
            <td>
              <div class="form_input">
                <input type="text" id="" style="width: 100%" class="t-l solo_input disabled" disabled placeholder="" />
              </div>
            </td>
          </tr>
          <tr>
            <th><label class="list_title" for="">고객사명</label></th>
            <td>
              <div class="form_input"><input type="text" id="" class="t-l solo_input" placeholder="" /></div>
            </td>
            <th><label class="list_title" for="">파트너구분</label></th>
            <td>
              <div class="form_input">
                <MultiSelect id="" style="width: 100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder=""></MultiSelect>
              </div>
            </td>
            <th><label class="list_title" for="">구분2</label></th>
            <td>
              <div class="form_input">
                <MultiSelect id="" style="width: 100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder=""></MultiSelect>
              </div>
            </td>
          </tr>
          <tr>
            <th><label class="list_title" for="address">사업장 주소</label></th>
            <td colspan="5">
              <div class="form_input_multy">
                <div class="form_input form_row">
                  <label class="title-post" for="postal-code">우편번호</label>
                  <input type="text" id="postal-code" style="width: 60px" class="t-r solo_input disabled" disabled placeholder="00000" />
                  <input type="text" id="" style="width: 200px" class="t-l" placeholder="" />
                  <input type="text" id="" style="width: 200px" class="t-l" placeholder=" " />
                  <input type="text" id="" style="width: 400px" class="t-l" placeholder=" " />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th><label class="list_title" for="">이메일</label></th>
            <td>
              <div class="form_input"><input type="text" id="" class="t-l solo_input" placeholder="abc@mail.com" /></div>
            </td>
            <th><label class="list_title" for="">휴대폰번호</label></th>
            <td>
              <div class="form_input">
                <input type="text" id="phone-number01" class="t-c three_input" placeholder="0651" />
                <i>-</i>
                <input type="text" id="phone-number02" class="t-c three_input" placeholder="0651" />
                <i>-</i>
                <input type="text" id="phone-number03" class="t-c three_input" placeholder="0651" />
              </div>
            </td>
            <th><label class="list_title" for="">전화</label></th>
            <td>
              <div class="form_input">
                <MultiSelect id="" style="width: 100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="국가선택"></MultiSelect>
                <input type="text" id="phone-number01" class="t-c three_input" placeholder="0651" />
                <i>-</i>
                <input type="text" id="phone-number02" class="t-c three_input" placeholder="0651" />
                <i>-</i>
                <input type="text" id="phone-number03" class="t-c three_input" placeholder="0651" />
              </div>
            </td>
          </tr>
          <tr>
            <th><label class="list_title" for="">팩스번호</label></th>
            <td>
              <div class="form_input">
                <MultiSelect id="" style="width: 100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="국가선택"></MultiSelect>
                <input type="text" id="phone-number01" class="t-c three_input" placeholder="0651" />
                <i>-</i>
                <input type="text" id="phone-number02" class="t-c three_input" placeholder="0651" />
                <i>-</i>
                <input type="text" id="phone-number03" class="t-c three_input" placeholder="0651" />
              </div>
            </td>
            <th><label class="list_title" for="">폐점여부</label></th>
            <td>
              <div class="form_input">
                <MultiSelect id="" style="width: 100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder=""></MultiSelect>
              </div>
            </td>
            <th><label class="list_title" for="">분석유형</label></th>
            <td>
              <div class="form_input">
                <MultiSelect id="" style="width: 100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder=""></MultiSelect>
              </div>
            </td>
          </tr>

          <tr>
            <th><label class="list_title" for="">대표대리점</label></th>
            <td>
              <div class="form_input"><input type="text" id="" class="t-l solo_input" placeholder="대표대리점" /></div>
            </td>
            <td colspan="4" class="t-r"><button class="btn_intable">초기화</button></td>
          </tr>
        </table>
      </div>
    </div>

    <h2 class="mypage_title">ERP 정보</h2>
    <!-- 리얼그리드 -->
    <div class="realgrid_container" style="height: calc(100% - 495px)">
      <!-- <div class="real_head">
            <div class="real_head_left">
              <small>Result <i>4</i> item</small>
            </div>
            <div class="real_head_right">
              <button class="btn_default btn_deep_green">버튼 1</button>
            </div>
          </div> -->
      <div class="real_top_filter"></div>
      <div class="real_body" style="height: calc(100% - 30px)">
        <CustomerOrderGrid style="height: 100%" :gridName="'customerOrder'" @openSingleCalendar="openSingleCalendar" :selectMonth="selectMonth" />
      </div>
      <div class="real_total"></div>
    </div>
    <!-- //리얼그리드 -->
    <DatePickerModal @chooseMonth="chooseMonth" :currentMonth="currentMonth" />
    <div class="master_form">
      <h2 class="mypage_title">특이사항</h2>
      <div class="form_textarea" style="height: 120px"><textarea placeholder="100자 이하"></textarea></div>
      <div class="board_footer">
        <div class="footer_left">
          <button class="btn_default btn_white">목록</button>
        </div>
        <div class="footer_right">
          <button class="btn_default btn_temp">초기화</button>
          <button class="btn_default btn_temp">저장</button>
        </div>
      </div>
    </div>
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
