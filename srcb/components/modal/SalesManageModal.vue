<template>
  <modal name="SalesManageModal" width="1440" height="auto" :adaptive="true" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('SalesManageModal')"></button>
      </div>
      <p class="modal_title_t02">영업사원관리</p>
      <div class="modal_content dr_content">
        <div class="search_content">
          <div class="search_box" ref="search_box_height" :class="{ search_close_00: searchOpen }" :style="`height:${search_box_height}`">
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">사업부</span>
                  <input type="text" id="" style="" class="disabled t-r" placeholder="" disabled />
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">영업사원</span>
                  <div class="form_inputnbtn">
                    <input type="text" id="" style="" class="t-r" placeholder="" />
                    <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
                  </div>
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">영업팀</span>
                  <div class="form_inputnbtn">
                    <input type="text" id="" style="" class="t-r" placeholder="" />
                    <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
                  </div>
                </label>
              </div>
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">영업지원</span>
                  <div class="form_inputnbtn">
                    <input type="text" id="" style="" class="t-r" placeholder="" />
                    <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
                  </div>
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">제품레벨</span>
                  <div class="checkbox_multiselect">
                    <button class="select_default" @click="checkboxMultiselect = !checkboxMultiselect">
                      <div class="select_title">
                        <span>다중선택</span>
                        <span>다중선택</span>
                        <span>다중선택</span>
                        <span>다중선택</span>
                        <span>다중선택</span>
                        <span>다중선택</span>
                        <span>다중선택</span>
                        <span>다중선택</span>
                        <span>다중선택</span>
                        <span>다중선택</span>
                        <span>다중선택</span>
                        <span>다중선택</span>
                      </div>
                      <i :class="{ on: checkboxMultiselect }"></i>
                    </button>
                    <ul class="dropdown" :class="{ on: checkboxMultiselect }">
                      <li>
                        <label class="chechbox_basic">
                          <input type="checkbox" />
                          <span class="checkmark"></span>
                          선택 1선택 1선택 1선택 1선택 1선택 1
                        </label>
                      </li>
                      <li>
                        <label class="chechbox_basic">
                          <input type="checkbox" />
                          <span class="checkmark"></span>
                          선택 2
                        </label>
                      </li>
                    </ul>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- 리얼그리드 -->
        <div class="sales_manage_realgrid">
          <div class="realgrid_container realgrid_container17">
            <div class="real_body real_body16">
              <CustomerOrderGrid style="height: 100%" :gridName="'ProductFavorite'" />
            </div>
          </div>
          <div class="exchange_box">
            <button class="btn_right">
              <!-- <img src="@/assets/img/icon_back_old.png" /> -->
            </button>
            <button class="btn_left">
              <!-- <img src="@/assets/img/icon_back_old.png" /> -->
            </button>
          </div>
          <div class="realgrid_container realgrid_container17">
            <div class="real_body real_body16">
              <CustomerOrderGrid style="height: 100%" :gridName="'ProductFavorite'" />
            </div>
          </div>
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_default">초기화</button>
          <button class="btn_default">닫기</button>
          <button class="btn_primary">저장</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import find from '@/mixins/style.js'; // js 추가
import CustomerOrderGrid from '@wb/components/gridComponent/CustomerOrderGrid.vue';

export default {
  name: 'TabS',
  components: { CustomerOrderGrid },

  data() {
    return {
      selectValue: '',
      selectOptions: ['Select option', 'options', 'selected'],
      openCount: 0,
      searchOpen: false,
      search_box_height: '',
      checkboxMultiselect: false,
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
    getInfoHeight() {
      if (this.openCount === 0) {
        let val = this.$refs.filter_content_height.scrollHeight;
        // filter_content_height 의 높이값 받아온다
        this.filter_content_height = `calc(${val}px + 1px);`;
        //this.search_box_height = `${val}px`;
        console.log('getInfoHeight', val);
        this.openCount++;
      }
    },
    writeInput() {
      find.writeInput();
    },
  },

  destroyed() {},
};
</script>

<style></style>
