<template>
  <div>
    <!-- 검색필터 영역 -->
    <!-- <div class="search_content"></div> -->
    <!-- //검색필터 영역 -->
    <div class="client_section">
      <div id="TabS">
        <ul class="tab-menu">
          <li v-for="(tab, index) in tabs" v-bind:class="{ active: currentTab === index }" :key="index">
            <a v-on:click="currentTab = index">{{ tab }}</a>
          </li>
        </ul>
        <div class="tab-content tab-idpw-content">
          <div v-show="currentTab == 0">
            <!-- 검색필터 영역 -->
            <div class="search_content">
              <div class="search_box">
                <div class="search_box_filter">
                  <div class="filter_list">
                    <label for="" class="filter_type">
                      <span class="filter_type_title">대리점</span>
                      <div class="form_inputnbtn">
                        <input type="text" style="" id="custoer_name" placeholder="Customer A" />
                        <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
                      </div>
                    </label>
                    <label for="" class="filter_type">
                      <span class="filter_type_title">폐점여부</span>
                      <MultiSelect id="Material_Group" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                    </label>
                    <label for="" class="filter_type">
                      <span class="filter_type_title">검색</span>
                      <div class="form_inputnbtn">
                        <input type="text" id="" style="" class="t-l" placeholder="" />
                        <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <!-- //검색필터 영역 -->
            <!-- board 리스트 -->
            <div class="notice_section">
              <div class="board_head">
                <small>총 <i>4</i> 건</small> /
                <small>검색 <i>4</i> 건</small>
              </div>
              <div class="board_table table">
                <table>
                  <colgroup>
                    <col style="width: 60px" />
                    <col style="width: 100px" />
                    <col style="width: 100px" />
                    <col style="width: 300px" />
                    <col style="width: 100px" />
                    <col style="width: 100px" />
                    <col style="width: 150px" />
                    <col style="width: 150px" />
                    <col style="width: 150px" />
                    <col style="width: 150px" />
                    <col style="width: 100px" />
                    <col style="width: 150px" />
                    <col style="width: 120px" />
                    <col style="width: 400px" />
                    <col style="width: 150px" />
                    <col style="width: 150px" />
                    <col style="width: 120px" />
                    <col style="width: 80px" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>파트너코드</th>
                      <th>ERP코드</th>
                      <th>파트너명</th>
                      <th>취급품목</th>
                      <th>사업자번호</th>
                      <th>대표자</th>
                      <th>전화번호</th>
                      <th>FAX번호</th>
                      <th>핸드폰번호</th>
                      <th>우편번호</th>
                      <th colspan="3" class="">주소</th>
                      <th>대리점 담당자</th>
                      <th>연락처</th>
                      <th>E-mail</th>
                      <th>폐점여부</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td><a href="" class="btn_borard_link">VP000001</a></td>
                      <td>110437</td>
                      <td>VRG Dongwha MDF Joint Stock Company</td>
                      <td>MDF</td>
                      <td>000-00-00000</td>
                      <td>Destination A</td>
                      <td>0000-0000-0000</td>
                      <td>0000-0000-0000</td>
                      <td>0000-0000-0000</td>
                      <td>00000</td>
                      <td>cities and provinces</td>
                      <td>county districts</td>
                      <td class="t-l">hïu Bang, Huyen Th¡ch Thât,Thành phô Hà Noi, Viet Nam</td>
                      <td>Destination A</td>
                      <td>0000-0000-0000</td>
                      <td>업체이메일</td>
                      <td>운영</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="page_num_box">
                <div class="btn_page_nums">
                  <a href=""><img src="@/assets/img/arrow_first.png" alt="처음" /></a>
                  <a href=""><img src="@/assets/img/arrow_prev.png" alt="이전" /></a>
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
                <div class="btn_right_box">
                  <button class="btn_default btn_deep_gray">삭제</button>
                  <button class="btn_default btn_primary">등록</button>
                </div>
              </div>
            </div>
            <!-- //board 리스트 -->
          </div>
        </div>
        <div class="tab-content">
          <div v-show="currentTab == 1">
            <!-- 검색필터 영역 -->
            <div class="search_content">
              <div class="search_box">
                <div class="search_box_filter">
                  <div class="filter_list">
                    <label for="" class="filter_type">
                      <span class="filter_type_title">운송사 코드</span>
                      <input type="text" id="postal_code" style="width: 200px" class="t-l" placeholder="" />
                    </label>
                    <label for="" class="filter_type">
                      <span class="filter_type_title">운송사 명</span>
                      <input type="text" id="postal_code" style="width: 250px" class="t-l" placeholder="" />
                      <button class="btn_search"><img src="@/assets/img/icon_search_w.png" /></button>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <!-- //검색필터 영역 -->
            <!-- board 리스트 -->
            <div class="notice_section">
              <div class="board_head">
                <small>총 <i>4</i> 건</small> /
                <small>검색 <i>4</i> 건</small>
              </div>
              <div class="board_table table">
                <table>
                  <colgroup>
                    <col style="width: 60px" />
                    <col style="width: 100px" />
                    <col style="width: 300px" />
                    <col style="width: 100px" />
                    <col style="width: 100px" />
                    <col style="width: 150px" />
                    <col style="width: 100px" />
                    <col style="width: 150px" />
                    <col style="width: 120px" />
                    <col style="width: 400px" />
                    <col style="width: 80px" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>운송사코드</th>
                      <th>운송사명</th>
                      <th>사업자번호</th>
                      <th>담당자</th>
                      <th>전화번호</th>
                      <th>우편번호</th>
                      <th colspan="3" class="">주소</th>
                      <th>사용여부</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>C001</td>
                      <td>VRG Dongwha MDF Joint Stock Company</td>
                      <td>000-00-00000</td>
                      <td>Destination A</td>
                      <td>0000-0000-0000</td>
                      <td>00000</td>
                      <td>cities and provinces</td>
                      <td>county districts</td>
                      <td class="t-l">hïu Bang, Huyen Th¡ch Thât,Thành phô Hà Noi, Viet Nam</td>
                      <td>Y</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="page_num_box">
                <div class="btn_page_nums">
                  <a href=""><img src="@/assets/img/arrow_first.png" alt="처음" /></a>
                  <a href=""><img src="@/assets/img/arrow_prev.png" alt="이전" /></a>
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
                <div class="btn_right_box">
                  <button class="btn_default btn_deep_gray">삭제</button>
                  <button class="btn_default btn_primary">등록</button>
                </div>
              </div>
            </div>
            <!-- //board 리스트 -->
          </div>
        </div>
      </div>
    </div>
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
