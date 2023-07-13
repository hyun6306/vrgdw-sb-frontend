<template>
  <modal name="CarNumberModal" width="1210" height="800" :adaptive="true" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('CarNumberModal')"></button>
      </div>
      <p class="modal_title_t02">
        <!-- {{ $t('label.deliveryRequest') }} -->
        차량번호 선택
      </p>
      <div class="modal_content dr_content">
        <div class="search_content">
          <div class="search_box">
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="destination_name" class="filter_type">
                  <span class="filter_type_title">운송사</span>
                  <input type="text" id="destination_name" style="" class="disabled" disabled placeholder="000000" />
                </label>
                <label for="destination_name" class="filter_type">
                  <span class="filter_type_title">차량번호</span>
                  <input type="text" id="destination_name" style="" class="" placeholder="000000" />
                </label>
                <button class="btn_search_text_row">검색</button>
              </div>
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">사용여부</span>
                  <MultiSelect id="" class="disabled" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- 검색 버튼 클릭시 on 클래스 추가-->
        <!-- 리프레시 버튼 클릭시 on클래스 삭제-->
        <!-- 리얼그리드 -->
        <div class="realgrid_container modal_realgrid05">
          <div class="real_head">
            <div class="real_head_left">
              <small>차량정보</small>
            </div>
            <div class="real_head_right">
              <button class="btn_default btn_deep_green">차량등록</button>
            </div>
          </div>
          <div class="real_body">
            <CustomerOrderGrid style="height: 100%" :gridName="'ProductFavorite'" />
          </div>
          <div class="modal_btn_contents_t05">
            <button class="btn_default">취소</button>
            <button class="btn_primary">선택</button>
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
