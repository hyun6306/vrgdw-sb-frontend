<template>
  <div>
    <!-- 검색필터 영역 -->
    <!-- <div class="search_content"></div> -->
    <!-- //검색필터 영역 -->

    <!-- 비번입력 -->
    <div class="member_info_container">
      <div class="join_regsit">
        <h2>회원정보를 수정하시려면 <br />비밀번호를 다시 입력해주세요.</h2>
        <div class="join_regsit_content">
          <div class="join_id">
            <span class="title_id">ID</span>
            <span class="id_txt">VRGDW@gmail.com</span>
          </div>
          <div class="form_box">
            <input id="temporary_password" type="password" class="on" placeholder="" />
            <label for="temporary_password" class="label_pw">Temporary Password</label>
            <span class="form_border"></span>
            <!-- 체크 확인상태 
            패스워드 입력시 on 클래스 추가
            -->
            <span class="pw_check_active on"><img src="@/assets/img/icon_check.png" /></span>
            <!-- 패스워드 보기 버튼
            패스워드 입력시 on 클래스 추가
            버튼 클릭시 see 클래스 추가
            -->
            <button class="btn_view_password on see"></button>
          </div>

          <p class="login_alert">*The password must be registered as (English uppercase/lowercase letters & at least 8 characters)</p>
          <div class="btn_box">
            <button class="btn_cancle">취소</button>
            <button class="btn_join">확인</button>
          </div>
        </div>
      </div>
    </div>
    <!-- //비번입력 -->

    <!-- 기본정보수정 -->
    <div class="client_section">
      <!-- board 리스트 -->
      <div class="notice_section">
        <div class="mypage_form">
          <h2 class="mypage_title">기본정보 수정</h2>

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
                <th><label class="list_title" for="">운송사명</label></th>
                <td>
                  <div class="form_input"><input type="text" id="" class="t-l solo_input disabled" disabled placeholder="베트남 운용사" /></div>
                </td>
                <th><label class="list_title" for="">운송사 코드</label></th>
                <td>
                  <div class="form_input"><input type="text" id="" class="solo_input disabled" disabled placeholder="C001" /></div>
                </td>
                <th><label class="list_title" for="">사업자명</label></th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="t-l solo_input disabled" disabled placeholder="동화베트남" />
                  </div>
                </td>
              </tr>
              <tr>
                <th><label class="list_title" for="">사업자번호</label></th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="t-l solo_input disabled" disabled placeholder="00-000-0000" />
                  </div>
                </td>
                <th><label class="list_title" for="">담당자명</label></th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="t-l solo_input disabled" disabled placeholder="동화베트남" />
                  </div>
                </td>
                <th><label class="list_title" for="">재직구분</label></th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="t-l solo_input disabled" disabled placeholder="재직" />
                  </div>
                </td>
              </tr>
              <tr>
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
                <th><label class="list_title" for="">E-mail</label></th>
                <td colspan="3">
                  <div class="form_input">
                    <input type="text" id="" class="solo_input disabled" disabled style="width: 150px" placeholder="" />
                    <span class="board_intxt">@</span>
                    <input type="text" id="" class="solo_input disabled" disabled style="width: 250px" placeholder="" />
                  </div>
                </td>
              </tr>
              <tr>
                <th><label class="list_title" for="">입사일</label></th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="t-l solo_input disabled" disabled placeholder="2022-08-08" />
                  </div>
                </td>
                <th><label class="list_title" for="">퇴직일</label></th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="t-l solo_input disabled" disabled placeholder="2022-08-08" />
                  </div>
                </td>
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
              <tr>
                <th><label class="list_title" for="">휴대폰번호</label></th>
                <td>
                  <div class="form_input">
                    <span class="">
                      <input type="text" id="phone_number_1_01" style="width: 60px" class="t-c three_input disabled" disabled placeholder="0651" />
                    </span>
                    <i>-</i>
                    <input type="text" id="phone_number_1_02" style="width: 60px" class="t-c three_input disabled" disabled placeholder="0651" />
                    <i>-</i>
                    <input type="text" id="phone_number_1_03" style="width: 60px" class="t-c three_input disabled" disabled placeholder="0651" />
                  </div>
                </td>
                <th><label class="list_title" for="">전화번호</label></th>
                <td>
                  <div class="form_input">
                    <span class="">
                      <input type="text" id="phone_number_2_01" style="width: 60px" class="t-c three_input disabled" disabled placeholder="0651" />
                    </span>
                    <i>-</i>
                    <input type="text" id="phone_number_2_02" style="width: 60px" class="t-c three_input disabled" disabled placeholder="0651" />
                    <i>-</i>
                    <input type="text" id="phone_number_2_03" style="width: 60px" class="t-c three_input disabled" disabled placeholder="0651" />
                  </div>
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
            </table>
          </div>
          <div class="board_footer">
            <div class="footer_left"></div>
            <div class="footer_right">
              <button class="btn_default btn_temp">삭제</button>
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
