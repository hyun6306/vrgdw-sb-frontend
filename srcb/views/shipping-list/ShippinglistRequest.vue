<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type filter_type03">
              <span class="filter_type_title">배송권역</span>
              <MultiSelect id="Material_Group" style="width: 137px" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
              <MultiSelect id="Material_Group" style="width: 137px" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
              <div class="form_inputnbtn" style="width: 300px">
                <input type="text" id="" style="" class="t-l" placeholder="검색어를 입력하세요" />
                <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- //검색필터 영역 -->

    <!-- 배송지 리스트 -->
    <div class="notice_section">
      <div class="board_head">
        <small>총 <i>4</i> 건</small> /
        <small>검색 <i>4</i> 건</small>
      </div>
      <div class="shippinglist_box default_address">
        <div>
          <label class="chechbox_address">
            <input type="checkbox" />
            <span class="checkmark"></span>
            기본 배송지
          </label>
        </div>
        <div class="btn_address_box">
          <button>수정</button>
          <button>삭제</button>
        </div>
        <ul>
          <li class="address_list">
            <p class="address_list_title">우편번호</p>
            <span class="address_list_info">00000</span>
          </li>
          <li class="address_list three">
            <p class="address_list_title">배송권역</p>
            <span class="address_list_info">서울특별시 영등포구</span>
          </li>
          <li class="address_list double">
            <p class="address_list_title">상세주소</p>
            <span class="address_list_info">여의나루 1234 1203동 456호</span>
          </li>
          <li class="address_list three">
            <p class="address_list_title">담당자명</p>
            <span class="address_list_info">담당자</span>
          </li>
          <li class="address_list three">
            <p class="address_list_title">연락처 1</p>
            <span class="address_list_info">000-0000-0000</span>
          </li>
          <li class="address_list three">
            <p class="address_list_title">연락처 2</p>
            <span class="address_list_info">000-0000-0000</span>
          </li>
          <li class="address_list">
            <p class="address_list_title">특이사항</p>
            <div class="form_textarea">
              <textarea type="text" placeholder="문앞배송" rows="5" style="width: 100%" />
            </div>
          </li>
        </ul>
      </div>
      <div class="shippinglist_box">
        <div>
          <label class="chechbox_address">
            <input type="checkbox" />
            <span class="checkmark"></span>
            기본 배송지
          </label>
        </div>
        <div class="btn_address_box">
          <button>수정</button>
          <button>삭제</button>
        </div>
        <ul>
          <li class="address_list">
            <p class="address_list_title">우편번호</p>
            <span class="address_list_info">00000</span>
          </li>
          <li class="address_list three">
            <p class="address_list_title">배송권역</p>
            <span class="address_list_info">서울특별시 영등포구</span>
          </li>
          <li class="address_list double">
            <p class="address_list_title">상세주소</p>
            <span class="address_list_info">여의나루 1234 1203동 456호</span>
          </li>
          <li class="address_list three">
            <p class="address_list_title">담당자명</p>
            <span class="address_list_info">담당자</span>
          </li>
          <li class="address_list three">
            <p class="address_list_title">연락처 1</p>
            <span class="address_list_info">000-0000-0000</span>
          </li>
          <li class="address_list three">
            <p class="address_list_title">연락처 2</p>
            <span class="address_list_info">000-0000-0000</span>
          </li>
          <li class="address_list">
            <p class="address_list_title">특이사항</p>
            <div class="form_textarea">
              <textarea type="text" placeholder="문앞배송" rows="5" style="width: 100%" />
            </div>
          </li>
        </ul>
      </div>
      <div class="board_footer">
        <div class="footer_left"></div>
        <div class="footer_right">
          <button class="btn_default btn_temp">배송지 추가하기</button>
          <button class="btn_default btn_temp">저장</button>
        </div>
      </div>
    </div>

    <!-- //배송지 리스트 -->
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
