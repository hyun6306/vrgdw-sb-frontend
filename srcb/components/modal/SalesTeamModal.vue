<template>
  <modal name="SalesTeamModal" width="800" height="auto" :adaptive="true" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('SalesTeamModal')"></button>
      </div>
      <p class="modal_title_t02">영업팀 검색</p>
      <div class="modal_content dr_content">
        <div class="search_content">
          <div class="search_box">
            <div class="search_box_filter">
              <div class="filter_list">
                <span class="filter_type_title not_see">검색어</span>
                <label for="" class="filter_type">
                  <input type="text" id="postal_code" style="" class="" placeholder="검색어를 입력해주세요" />
                </label>
                <button class="btn_search_text_row btn_reset">초기화</button>
                <button class="btn_search_text_row ml-5">검색</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 검색 버튼 클릭시 on 클래스 추가-->
        <!-- 리프레시 버튼 클릭시 on클래스 삭제-->
        <!-- 리얼그리드 -->
        <div class="table_salesteam">
          <div class="table">
            <table>
              <colgroup>
                <col style="width: 10%" />
                <col style="width: 10%" />
                <col style="width: 20%" />
                <col style="width: 30%" />
                <col style="width: 30%" />
              </colgroup>
              <thead>
                <tr>
                  <th></th>
                  <th>번호</th>
                  <th>회사코드</th>
                  <th>영업팀 코드</th>
                  <th>영업팀 명</th>
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
                  <td>V100</td>
                  <td>DWSW</td>
                  <td>보드영업3팀</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <label class="radio_b">
                      <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                    </label>
                  </td>
                  <td>V100</td>
                  <td>DWSW</td>
                  <td>보드영업3팀</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    <label class="radio_b">
                      <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                    </label>
                  </td>
                  <td>V100</td>
                  <td>DWSW</td>
                  <td>보드영업3팀</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>
                    <label class="radio_b">
                      <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                    </label>
                  </td>
                  <td>V100</td>
                  <td>DWSW</td>
                  <td>보드영업3팀</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>
                    <label class="radio_b">
                      <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                    </label>
                  </td>
                  <td>V100</td>
                  <td>DWSW</td>
                  <td>보드영업3팀</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>
                    <label class="radio_b">
                      <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                    </label>
                  </td>
                  <td>V100</td>
                  <td>DWSW</td>
                  <td>보드영업3팀</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>
                    <label class="radio_b">
                      <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                    </label>
                  </td>
                  <td>V100</td>
                  <td>DWSW</td>
                  <td>보드영업3팀</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>
                    <label class="radio_b">
                      <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                    </label>
                  </td>
                  <td>V100</td>
                  <td>DWSW</td>
                  <td>보드영업3팀</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>
                    <label class="radio_b">
                      <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                    </label>
                  </td>
                  <td>V100</td>
                  <td>DWSW</td>
                  <td>보드영업3팀</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>
                    <label class="radio_b">
                      <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                    </label>
                  </td>
                  <td>V100</td>
                  <td>DWSW</td>
                  <td>보드영업3팀</td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>
                    <label class="radio_b">
                      <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                    </label>
                  </td>
                  <td>V100</td>
                  <td>DWSW</td>
                  <td>보드영업3팀</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_default">취소</button>
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
    getInfoHeight() {
      if (this.openCount === 0) {
        let val = this.$refs.filter_content_height.scrollHeight;
        // filter_content_height 의 높이값 받아온다
        this.filter_content_height = `calc(${val}px + 1px);`;
        console.log('getInfoHeight', val);
        this.openCount++;
      }
    },
    writeInput() {
      find.writeInput();
    },
  },
  mounted() {
    this.getInfoHeight();
  },
  destroyed() {},
};
</script>

<style></style>
