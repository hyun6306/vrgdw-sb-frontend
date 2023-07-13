<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type filter_type03">
              <span class="filter_type_title none-display">검색</span>
              <MultiSelect id="Material_Group" style="width: 137px" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
              <div class="form_inputnbtn" style="width: 400px">
                <input type="text" id="" style="" class="t-l" placeholder="검색어를 입력하세요" />
                <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- //검색필터 영역 -->

    <!-- 공지사항 리스트 -->
    <div class="notice_section">
      <div class="board_head">
        <small>총 <i>4</i> 건</small> /
        <small>검색 <i>4</i> 건</small>
      </div>
      <div class="board_table table">
        <table>
          <colgroup>
            <col style="width: 70px" />
            <col style="width: 70px" />
            <col style="width: 150px" />
            <col style="width: 150px" />
            <col style="width: 250px" />
            <col style="width: 250px" />
            <col style="width: 150px" />
            <col style="width: 150px" />
            <col style="width: 100px" />
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>
                <label class="chechbox_solo"> <input type="checkbox" /><span class="checkmark"></span> </label>
              </th>
              <th>사원번호</th>
              <th>직원명</th>
              <th>휴대폰 번호</th>
              <th>이메일 주소</th>
              <th>사원유형</th>
              <th>직급</th>
              <th>재직상태</th>
              <th>성별</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>105</td>
              <td>
                <label class="chechbox_solo"> <input type="checkbox" /><span class="checkmark"></span> </label>
              </td>
              <td><a class="btn_borard_link" href="">E0001</a></td>
              <td>홍길동</td>
              <td>000-0000-0000</td>
              <td>abc@dongwha.com</td>
              <td>관리과장</td>
              <td>과장</td>
              <td>재직</td>
              <td>남</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="board_footer">
        <div class="footer_left"></div>
        <div class="footer_right">
          <button class="btn_default btn_temp">삭제</button>
          <button class="btn_default btn_temp">등록</button>
        </div>
      </div>
    </div>
    <!-- //직원관리 리스트 -->
  </div>
</template>

<script>
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
