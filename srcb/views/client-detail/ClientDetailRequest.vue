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
            <!-- board 리스트 -->
            <div class="notice_section">
              <div class="mypage_form">
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
                      <th><label class="list_title" for="">파트너 코드</label></th>
                      <td>
                        <div class="form_input"><input type="text" id="" class="t-l solo_input disabled" disabled placeholder="베트남 운용사" /></div>
                      </td>
                      <th><label class="list_title" for="">파트너명</label></th>
                      <td>
                        <div class="form_input"><input type="text" id="" class="solo_input disabled" disabled placeholder="C001" /></div>
                      </td>
                      <th><label class="list_title" for="">사업자번호</label></th>
                      <td>
                        <div class="form_input"><input type="text" id="" class="t-l solo_input disabled" disabled placeholder="00-0000" /></div>
                      </td>
                    </tr>
                    <tr>
                      <th><label class="list_title" for="">설립일자</label></th>
                      <td>
                        <div class="form_input"><input type="text" id="" class="t-l solo_input disabled" disabled placeholder="2022.08.09" /></div>
                      </td>
                      <th><label class="list_title" for="">전화번호</label></th>
                      <td>
                        <div class="form_input">
                          <input type="text" id="phone-number01" class="t-c three_input disabled" disabled placeholder="0651" />
                          <i>-</i>
                          <input type="text" id="phone-number02" class="t-c three_input disabled" disabled placeholder="0651" />
                          <i>-</i>
                          <input type="text" id="phone-number03" class="t-c three_input disabled" disabled placeholder="0651" />
                        </div>
                      </td>
                      <th><label class="list_title" for="">팩스번호</label></th>
                      <td>
                        <div class="form_input">
                          <input type="text" id="fax-number01" class="t-c three_input disabled" disabled placeholder="0651" />
                          <i>-</i>
                          <input type="text" id="fax-number02" class="t-c three_input disabled" disabled placeholder="0651" />
                          <i>-</i>
                          <input type="text" id="fax-number03" class="t-c three_input disabled" disabled placeholder="0651" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th><label class="list_title" for="">메일</label></th>
                      <td>
                        <div class="form_input"><input type="text" id="" class="t-l solo_input disabled" disabled placeholder="abc@mail.com" /></div>
                      </td>
                      <th><label class="list_title" for="">취급품목</label></th>
                      <td>
                        <div class="form_input"><input type="text" id="" class="solo_input disabled" disabled placeholder="MFB" /></div>
                      </td>
                      <th><label class="list_title" for="">고객구분</label></th>
                      <td>
                        <div class="form_input"><input type="text" id="" class="t-l solo_input disabled" disabled placeholder="고객" /></div>
                      </td>
                    </tr>
                    <tr>
                      <th><label class="list_title" for="">우편번호</label></th>
                      <td>
                        <div class="form_input"><input type="text" id="" class="t-l solo_input disabled" disabled placeholder="00000" /></div>
                      </td>
                      <th><label class="list_title" for="">폐점여부</label></th>
                      <td>
                        <div class="form_input"><input type="text" id="" class="solo_input disabled" disabled placeholder="운영" /></div>
                      </td>
                    </tr>
                    <tr>
                      <th><label class="list_title" for="address">주소</label></th>
                      <td colspan="5">
                        <div class="form_input_multy">
                          <div class="form_input form_row">
                            <label class="title-post" for="postal-code">우편번호</label>
                            <input type="text" id="postal-code" style="width: 60px" class="t-r solo_input disabled" disabled placeholder="00000" />
                            <input type="text" id="" style="width: 200px" class="t-l disabled" disabled placeholder="cities and provinces" />
                            <input type="text" id="" style="width: 200px" class="t-l disabled" disabled placeholder="county districts" />
                            <input type="text" id="" style="width: 400px" class="t-l disabled" disabled placeholder="Hïu Bang, Huyen Th¡ch Thât,Thành phô Hà Noi, Viet Nam" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th><label class="list_title" for="">대표자명</label></th>
                      <td>
                        <div class="form_input"><input type="text" id="" class="t-l solo_input disabled" disabled placeholder="대표자" /></div>
                      </td>
                      <th><label class="list_title" for="">취임일</label></th>
                      <td>
                        <div class="form_input"><input type="text" id="" class="solo_input disabled" disabled placeholder="2022.08.09" /></div>
                      </td>
                      <th><label class="list_title" for="">휴대폰번호</label></th>
                      <td>
                        <div class="form_input">
                          <input type="text" id="phone-number01" class="t-c three_input disabled" disabled placeholder="0651" />
                          <i>-</i>
                          <input type="text" id="phone-number02" class="t-c three_input disabled" disabled placeholder="0651" />
                          <i>-</i>
                          <input type="text" id="phone-number03" class="t-c three_input disabled" disabled placeholder="0651" />
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
                <h2 class="mypage_title">ERP 정보</h2>
                <div class="table">
                  <table>
                    <colgroup>
                      <col style="width: 10%" />
                      <col style="width: 15%" />
                      <col style="width: 10%" />
                      <col style="width: 10%" />
                      <col style="width: " />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>ERP 영업영역</th>
                        <th>ERP 대리점 코드</th>
                        <th>사번</th>
                        <th>이름</th>
                        <th>비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>보드</td>
                        <td>
                          <div class="form_inputnbtn">
                            <input type="text" style="width: 100%" id="custoer_name" placeholder="Customer A" />
                            <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
                          </div>
                        </td>
                        <td>123021</td>
                        <td>김대표</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h2 class="mypage_title">
                  주 배송지
                  <button class="btn_default">배송지 추가</button>
                </h2>
                <div class="table">
                  <table>
                    <colgroup>
                      <col style="width: 15%" />
                      <col style="width: 15%" />
                      <col style="width: 15%" />
                      <col style="width: 15%" />
                      <col style="width: 15%" />
                      <col style="width: " />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>배송지명</th>
                        <th>우편번호</th>
                        <th>담당자명</th>
                        <th>연락처1</th>
                        <th>연락처2</th>
                        <th>특이사항</th>
                      </tr>
                      <tr>
                        <th>대권역</th>
                        <th>중권역</th>
                        <th colspan="4">상세주소</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Destination A</td>
                        <td>0000</td>
                        <td>Destination A</td>
                        <td>0000-000-0000</td>
                        <td>0000-000-0000</td>
                        <td><img src="@/assets/img/icon_note.png" /></td>
                      </tr>
                      <tr>
                        <td>cities and provinces</td>
                        <td>county districts</td>
                        <td>Destination A</td>
                        <td class="t-l" colspan="3">Hïu Bang, Huyen Th¡ch Thât,Thành phô Hà Noi, Viet Nam</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- //board 리스트 -->
          </div>
        </div>
        <div class="tab-content">
          <div v-show="currentTab == 1"></div>
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
