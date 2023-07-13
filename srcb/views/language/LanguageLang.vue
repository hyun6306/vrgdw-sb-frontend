<template>
  <div>
    <!-- 검색필터 영역 -->
    <!-- <div class="search_content"></div> -->
    <!-- //검색필터 영역 -->

    <div class="setting_section">
      <div class="language_box language_box02">
        <p class="language_box_title">라우터 단어 사전</p>
        <div class="language_box_search">
          <label class="radio_t">
            <input type="radio" name="radio" />
            <span class="checkmark"></span>
            전체
          </label>
          <label class="radio_t">
            <input type="radio" name="radio" />
            <span class="checkmark"></span>
            Label
          </label>
          <label class="radio_t">
            <input type="radio" name="radio" />
            <span class="checkmark"></span>
            Button
          </label>
          <label class="radio_t">
            <input type="radio" name="radio" />
            <span class="checkmark"></span>
            Grid
          </label>
          <label class="radio_t">
            <input type="radio" name="radio" />
            <span class="checkmark"></span>
            Message
          </label>

          <input type="text" />
          <button class="btn_default btn_black">검색</button>
          <button class="btn_default btn_white">검색 초기화</button>
          <button class="btn_default btn_white">삭제</button>
        </div>
        <div class="table bottom_line">
          <table>
            <colgroup>
              <col style="width: 20px" />
              <col style="width: 20px" />
              <col style="width: 65px" />
              <col style="width: 65px" />
              <col style="width: 65px" />
              <col style="width: 65px" />
            </colgroup>
            <thead>
              <tr>
                <th>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </th>
                <th>No</th>
                <th>폼 키</th>
                <th>한국어</th>
                <th>영어</th>
                <th>베트남어</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>1</td>
                <td class="t-l">prdtCd</td>
                <td class="t-l">제품 코드</td>
                <td class="t-l">제품 코드</td>
                <td class="t-l">제품 코드</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="language_box language_box03">
        <!-- <p class="language_box_title">단어사전</p> -->
        <div class="table bottom_line">
          <table>
            <colgroup>
              <col style="width: 100px" />
              <col style="width: " />
              <col style="width: 100px" />
              <col style="width: " />
            </colgroup>
            <tbody>
              <tr>
                <th class="essential" style="display: table-cell">분류</th>
                <td class="t-l">
                  <div class="form_input">
                    <MultiSelect style="width: 100%" :options="langClsOptions" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                  </div>
                </td>
                <th class="essential" style="display: table-cell">폼 키</th>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
              </tr>
              <tr>
                <th class="essential" style="display: table-cell">한국어</th>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
                <th class="essential" style="display: table-cell">영어</th>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
              </tr>
              <tr>
                <th class="essential" style="display: table-cell">베트남어</th>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
                <th class="essential" style="display: table-cell"></th>
                <td class="t-l">
                  <div class="form_input"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="language_box_search_02">
          <button class="btn_default btn_black">저장</button>
          <button class="btn_default btn_white">초기화</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      //template: ItemTemplate,
      langClsOptions: ['LABEL', 'BUTTON', 'GRID', 'MESSAGE'],
    };
  },
  methods: {},
  created() {},
  mounted() {
    // this.getInfoHeight();
  },
  destroyed() {},
};
</script>

<style></style>
