<template>
  <modal name="CostCenterModal" width="600" height="auto" :adaptive="true">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('CostCenterModal')"></button>
      </div>
      <p class="modal_title_t02">코스트센터조회</p>
      <div class="modal_content a-c">
        <div class="search_box">
          <input type="text" class="form_txt" placeholder="고객명 또는 고객코드를 입력해주세요" />
          <button class="">
            <img src="@/assets/img/icon_search_w.png" alt="검색" />
          </button>
        </div>
        <div class="form_production_date m-l-a">
          <span class="">MFB 생산시작일</span>
          <div class="form_calendar">
            <input type="text" placeholder="기간 선택" />
            <button class="icon_calendar" @click="datePicker('DateRangePicker')"><img src="@/assets/img/icon_calendar.png" /></button>
          </div>
        </div>
        <div class="costcenter_table">
          <div class="table">
            <table>
              <colgroup>
                <col style="width: 75px" />
                <col style="width: 60px" />
                <col style="width: 130px" />
                <col style="width: " />
              </colgroup>
              <thead>
                <tr>
                  <th>번호</th>
                  <th></th>
                  <th>코스트센터코드</th>
                  <th>코스트센터명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <label class="radio_b">
                      <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                    </label>
                  </td>
                  <td>FDM001141</td>
                  <td>DWSW추진팀</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>
                    <label class="radio_b">
                      <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                    </label>
                  </td>
                  <td>FDM001141</td>
                  <td>DWSW추진팀</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>
                    <label class="radio_b">
                      <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                    </label>
                  </td>
                  <td>FDM001141</td>
                  <td>DWSW추진팀</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>
                    <label class="radio_b">
                      <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                    </label>
                  </td>
                  <td>FDM001141</td>
                  <td>DWSW추진팀</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_default btn_primary">확인</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'CostCenterModal',
};
</script>

<style></style>
