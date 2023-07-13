<template>
  <div class="wrap">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">고객사 검색</h1>
      </div>
      <div class="header_left"></div>
      <div class="header_right">
        <button class="btn_header btn_close"></button>
      </div>
    </div>
    <!-- //상단 헤더 -->

    <!-- 컨텐츠 바디 -->
    <div class="container">
      <!-- 고객사 검색 -->
      <div class="delivery_search_contents">
        <MultiSelect id="" style="100%" class="essential" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="고객차량"></MultiSelect>
        <input type="text" id="" class="" />
        <button class="btn_search">sự tìm kiếm</button>
      </div>
      <!-- //고객사 검색 -->
      <!-- 고객사 검색결과 목록 -->
      <div class="customer_search_list_contents">
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 100%" />
            </colgroup>
            <tbody>
              <tr>
                <th>고객사</th>
              </tr>
              <tr>
                <td class="pa-0 ba-0">
                  <div class="in_table">
                    <table>
                      <colgroup>
                        <col style="width: 10%" />
                        <col style="width: 45%" />
                        <col style="width: 45%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <td rowspan="2">
                            <label class="chechbox_solo">
                              <input type="checkbox" />
                              <span class="checkmark"></span>
                            </label>
                          </td>
                          <td colspan="2" class="t-l">베트남 남부대리점</td>
                        </tr>
                        <tr>
                          <td>VP0000001</td>
                          <td>00000000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- //고객사 검색결과 목록 -->
      <!-- 하단 버튼 -->
      <div class="bottom_select_result_contents">
        <div class="btn_box">
          <button class="btn_tempsave">확인</button>
        </div>
      </div>
      <!-- //하단 버튼 -->
    </div>
    <!-- //컨텐츠 바디 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      priceSellOpen: false,
      quoteOpen: false,
      bookmark: false,
      selectOptions: ['KOR', 'ENG', 'VET'],
    };
  },
};
</script>

<style></style>
