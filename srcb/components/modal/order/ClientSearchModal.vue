<template>
  <modal name="ClientSearchModal" width="1210" height="auto" :adaptive="true" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('ClientSearchModal')"></button>
      </div>
      <p class="modal_title_t02">고객사 검색</p>
      <div class="modal_content customer_content">
        <div class="search_content">
          <div class="search_box" ref="search_box_height" :class="{ search_close_00: searchOpen }" :style="`height:${search_box_height}`">
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="custoer_name" class="filter_type">
                  <span class="filter_type_title">고객사 그룹</span>
                  <MultiSelect id="차량유형" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                </label>
                <label for="payment_terms" class="filter_type">
                  <span class="filter_type_title">폐점여부</span>
                  <MultiSelect id="차량유형" class="" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                </label>
                <button class="btn_search_text_row btn_reset">초기화</button>
              </div>
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">Keyword</span>
                  <input type="text" id="postal_code" style="" class="t-r" placeholder="고객명 또는 고객 코드를 입력해주세요" />
                </label>
                <button class="btn_search_text_row">검색</button>
              </div>
            </div>
          </div>
        </div>

        <div class="customer_table">
          <div class="table">
            <table>
              <colgroup>
                <col style="width: 50px" />
                <col style="width: 42px" />
                <col style="width: 155px" />
                <col style="width: 172px" />
                <col style="width: 170px" />
                <col style="width: 299px" />
              </colgroup>
              <thead>
                <tr>
                  <th>번호</th>
                  <th></th>
                  <th>고객사명</th>
                  <th>고객사코드</th>
                  <th>사업자등록번호</th>
                  <th>사업장 주소</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(list, index) in custList" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <label class="radio_b">
                      <input type="radio" />
                      <span class="checkmark"></span>
                    </label>
                  </td>
                  <!-- 고객사 명 -->
                  <td>{{ list.custKorNm }}</td>
                  <!-- 고객사 코드 -->
                  <td>{{ list.custCd }}</td>
                  <!-- 사업자등록번호 -->
                  <td>{{ list.bizNum }}</td>
                  <!-- 사업장주소 -->
                  <td class="t-l">{{ list.addrDtlsVnm }}</td>
                </tr>
              </tbody>
            </table>
            <div class="not_search_result" v-if="custList && custList.length === 0">검색된 고객사가 없습니다.</div>
          </div>
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_primary">확인</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import find from '@/mixins/style.js'; // js 추가

export default {
  name: 'TabS',

  data() {
    return {
      currentTab: 0,
      tabs: ['분류검색', 'Bookmark', 'Previous Orders'],
      selectValue: '',
      selectOptions: ['Select option', 'options', 'selected'],
      openCount: 0,
      searchOpen: false,
      search_box_height: '',
      custList: [],
      // custList: [
      //   { custCd: 'VP100012', custKorNm: 'ESTEC', bizNum: '3700330866', addrDtlsVnm: 'SỐ 6, ĐƯỜNG SỐ 6,KCN VIỆT NAM - SINGAPORE (VSIP), PHƯỜNG BÌNH HÒA THÀNH PHỐ THUẬN AN, TỈNH BÌNH DƯƠNG' },
      //   { custCd: 'VP100013', custKorNm: 'ESTEC1', bizNum: '3700330866', addrDtlsVnm: 'SỐ 6, ĐƯỜNG SỐ 6,KCN VIỆT NAM -' },
      //   { custCd: 'VP100014', custKorNm: 'ESTEC2', bizNum: '3700330866', addrDtlsVnm: 'SINGAPORE (VSIP), PHƯỜNG BÌNH HÒA THÀNH PHỐ THUẬN AN, TỈNH BÌNH DƯƠNG' },
      // ],
    };
  },
  methods: {
    close() {
      this.openFirst = 0;
    },
    searchProduct() {
      find.searchProduct();
    },
    resetBtn() {
      find.resetBtn();
    },

    writeInput() {
      find.writeInput();
    },
  },

  destroyed() {},
};
</script>

<style></style>
