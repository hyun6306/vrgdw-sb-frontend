<template>
  <modal name="PropertyCodeModal" width="1210" height="800" :adaptive="true" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('PropertyCodeModal')"></button>
      </div>
      <p class="modal_title_t02">속성코드 등록</p>
      <div class="modal_content dr_content">
        <div class="search_content">
          <!-- <p class="search_title">메인코드 정보</p> -->
          <div class="search_box">
            <div class="search_box_title always_exposure">
              <span>메인코드 정보</span>
            </div>
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">코드명</span>
                  <div class="form_input">
                    <input type="text" id="" style="width: 30%" class="t-l" placeholder="" />
                    <i></i>
                    <input type="text" id="" style="width: 70%" class="t-l" placeholder="" />
                  </div>
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">분류코드</span>
                  <div class="form_input">
                    <input type="text" id="" style="width: 100%" class="t-l" placeholder="" />
                  </div>
                </label>
              </div>
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">분류명</span>
                  <div class="form_input">
                    <input type="text" id="" style="width: 100%" class="t-l" placeholder="" />
                  </div>
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">코드</span>
                  <div class="form_input">
                    <input type="text" id="" style="width: 100%" class="t-l" placeholder="" />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- 검색 버튼 클릭시 on 클래스 추가-->
        <!-- 리프레시 버튼 클릭시 on클래스 삭제-->
        <!-- 리얼그리드 -->
        <div class="realgrid_container">
          <div class="program_box">
            <div class="content_head">
              <span class="content_title">공통코드 목록</span>
              <div class="btn_box">
                <button class="btn_add">추가</button>
                <button class="btn_add">삭제</button>
                <button class="btn_save">저장</button>
              </div>
            </div>
            <div class="table table_scroll">
              <table>
                <colgroup>
                  <col style="width: 40px" />
                  <col style="width: 40px" />
                  <col style="width: 110px" />
                  <col style="width: 110px" />
                  <col style="width: 110px" />
                  <col style="width: 110px" />
                  <col style="width: 110px" />
                  <col style="width: 110px" />
                  <col style="width: 70px" />
                  <col style="width: 90px" />
                  <col style="width: 200px" />
                  <col style="width: 80px" />
                  <col style="width: 80px" />
                  <col style="width: 80px" />
                  <col style="width: 80px" />
                  <col style="width: 80px" />
                  <col style="width: 80px" />
                </colgroup>
                <thead>
                  <tr>
                    <th>NO</th>
                    <th>
                      <label class="chechbox_solo">
                        <input type="checkbox" />
                        <span class="checkmark"></span>
                      </label>
                    </th>
                    <th>분류코드</th>
                    <th>분류명</th>
                    <th>코드</th>
                    <th>베트남</th>
                    <th>영어</th>
                    <th>한국</th>
                    <th>정렬</th>
                    <th>사용여부</th>
                    <th>비고</th>
                    <th>데이터1</th>
                    <th>데이터2</th>
                    <th>데이터3</th>
                    <th>데이터4</th>
                    <th>부모ID</th>
                    <th>레벨</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td>
                      <label class="chechbox_solo">
                        <input type="checkbox" />
                        <span class="checkmark"></span>
                      </label>
                    </td>
                    <td>
                      <div class="form_input">
                        <input type="text" class="" style="width: 100%" />
                      </div>
                    </td>
                    <td>대권역</td>
                    <td>BINH PHUOC</td>
                    <td>BINH PHUOC</td>
                    <td></td>
                    <td></td>
                    <td>2</td>
                    <td>
                      <label class="chechbox_solo">
                        <input type="checkbox" />
                        <span class="checkmark"></span>
                      </label>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import find from '@/mixins/style.js'; // js 추가
//import CustomerOrderGrid from '@wb/components/gridComponent/CustomerOrderGrid.vue';

export default {
  name: 'TabS',
  //components: { CustomerOrderGrid },

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
