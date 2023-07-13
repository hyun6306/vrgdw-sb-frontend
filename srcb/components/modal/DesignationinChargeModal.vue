<template>
  <modal name="DesignationinChargeModal" width="1210" height="600" :adaptive="true" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('DesignationinChargeModal')"></button>
      </div>
      <p class="modal_title_t02">담당지정</p>
      <div class="modal_content dr_content">
        <div class="search_content">
          <div class="search_box">
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">사업부</span>
                  <div class="form_input">
                    <input type="text" class="w_100 disabled" placeholder="" disabled />
                  </div>
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">영업사원</span>
                  <div class="form_inputnbtn" style="width: 400px">
                    <input type="text" id="" style="" class="t-l" placeholder="" />
                    <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
                  </div>
                </label>
              </div>
            </div>
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">영업팀</span>
                  <div class="form_inputnbtn" style="width: 400px">
                    <input type="text" id="" style="" class="t-l" placeholder="" />
                    <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
                  </div>
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">제품레벨</span>
                  <MultiSelect id="" class="" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- 검색 버튼 클릭시 on 클래스 추가-->
        <!-- 리프레시 버튼 클릭시 on클래스 삭제-->
        <!-- 리얼그리드 -->
        <div class="realgrid_container modal_realgrid02">
          <div class="real_body">
            <CustomerOrderGrid style="height: 100%" :gridName="'ProductFavorite'" />
          </div>
          <div class="modal_btn_contents_t05">
            <button class="btn_default">확인</button>
            <button class="btn_primary">저장</button>
          </div>
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
