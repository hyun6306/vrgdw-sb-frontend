<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type filter_type02">
              <span class="filter_type_title none-display">검색</span>
              <MultiSelect id="Material_Group" style="width: 137px" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
              <input type="text" id="postal_code" style="width: 550px" class="t-l" placeholder="검색어를 입력하세요" />
              <button class="btn_search"><img src="@/assets/img/icon_search_w.png" /></button>
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- //검색필터 영역 -->

    <!-- 공지사항 리스트 -->
    <div class="realgrid_container realgrid_container10">
      <div class="real_head">
        <div class="real_head_left">
          <small class="">총<i>4</i>건</small>
          <small class="ml-30">검색<i>4</i>건</small>
        </div>
        <div class="real_head_right">
          <button class="btn_default btn_deep_green">버튼 1</button>
        </div>
      </div>
      <div class="real_body real_body07 notice_section">
        <div class="board_table table">
          <table>
            <colgroup>
              <col style="width: 70px" />
              <col style="width: 150px" />
              <col style="width: 769px" />
              <col style="width: 100px" />
              <col style="width: 100px" />
              <col style="width: 150px" />
              <col style="width: 100px" />
            </colgroup>
            <thead>
              <tr>
                <th>
                  <label class="chechbox_solo"> <input type="checkbox" /><span class="checkmark"></span> </label>
                </th>
                <th>번호</th>
                <th>제목</th>
                <th>첨부파일</th>
                <th>등록자</th>
                <th>작성일</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label class="chechbox_solo"> <input type="checkbox" /><span class="checkmark"></span> </label>
                </td>
                <td>105</td>
                <td class="t-l"><a class="borard_title" href="">공지사항 제목</a></td>
                <td><img src="@/assets/img/icon_file.png" alt="첨부파일" /></td>
                <td>홍길동</td>
                <td>2022.04.12</td>
                <td>123455</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="real_footer">
        <div class="footer_left"></div>
        <div class="footer_right">
          <button class="btn_default btn_temp">삭제</button>
          <button class="btn_default btn_temp">등록</button>
        </div>
      </div>
    </div>
    <div class="page_num_box">
      <div class="btn_page_nums">
        <a href="" class="first_p"><img src="@/assets/img/arrow_first.png" alt="처음" /></a>
        <a href="" class="prev_p"><img src="@/assets/img/arrow_prev.png" alt="이전" /></a>
        <a href="" class="on">1</a>
        <a href="">2</a>
        <a href="">3</a>
        <a href="">4</a>
        <a href="">5</a>
        <a href="">6</a>
        <a href="">7</a>
        <a href="">8</a>
        <a href="">9</a>
        <a href="">10</a>
        <a href=""><img src="@/assets/img/arrow_next.png" alt="다음" /></a>
        <a href=""><img src="@/assets/img/arrow_end.png" alt="끝" /></a>
      </div>
    </div>
    <!-- //공지사항 리스트 -->
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
