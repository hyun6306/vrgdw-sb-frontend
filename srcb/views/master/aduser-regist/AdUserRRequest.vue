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
            <th><label class="list_title" for="">회사코드</label></th>
            <td>
              <div class="form_input">
                <MultiSelect id="" style="width: 100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder=""></MultiSelect>
              </div>
            </td>
            <th><label class="list_title" for="">메뉴그룹</label></th>
            <td>
              <div class="form_input">
                <MultiSelect id="" style="width: 100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder=""></MultiSelect>
              </div>
            </td>
            <th><label class="list_title" for="">이름</label></th>
            <td>
              <div class="form_input">
                <input type="text" id="" style="width: 100%" class="t-l solo_input" placeholder="" />
              </div>
            </td>
          </tr>
          <tr>
            <th><label class="list_title" for="">사번</label></th>
            <td>
              <div class="form_input">
                <input type="text" id="" style="width: 100%" class="t-l solo_input" placeholder="D빼고 입력해주세요" />
              </div>
            </td>
            <th><label class="list_title" for="">부서</label></th>
            <td>
              <div class="form_input">
                <div class="form_inputnbtn">
                  <input type="text" id="" class="w_100 t-l" placeholder="" />
                  <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
                </div>
              </div>
            </td>
            <th><label class="list_title" for="">직급명</label></th>
            <td>
              <div class="form_input">
                <input type="text" id="" style="width: 100%" class="t-l solo_input" placeholder="" />
              </div>
            </td>
          </tr>
          <tr>
            <th><label class="list_title" for="">직종</label></th>
            <td>
              <div class="form_input">
                <MultiSelect id="" style="width: 100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder=""></MultiSelect>
              </div>
            </td>
            <th><label class="list_title" for="">전화번호</label></th>
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
            <th><label class="list_title" for="">휴대폰번호</label></th>
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
            <th><label class="list_title" for="">내선번호</label></th>
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
            <th><label class="list_title" for="">이메일</label></th>
            <td>
              <div class="form_input"><input type="text" id="" class="t-l solo_input" placeholder="abc@mail.com" /></div>
            </td>
            <th><label class="list_title" for="">사용언어</label></th>
            <td>
              <div class="form_input">
                <MultiSelect id="" style="width: 100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder=""></MultiSelect>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="master_form">
      <div class="board_footer">
        <div class="footer_left">
          <button class="btn_default btn_white">목록</button>
        </div>
        <div class="footer_right">
          <button class="btn_default btn_temp">초기화</button>
          <button class="btn_default btn_temp">삭제</button>
          <button class="btn_default btn_temp">등록</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import DatePickerModal from '@/modal/DateMonthPickerModal';
// import { EventBus } from '@/views/devPage/tabTest/EventBus';

export default {
  components: {},
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
