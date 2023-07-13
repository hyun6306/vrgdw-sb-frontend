<template>
  <modal name="ProductSearch02Modal" width="1210" height="800" :adaptive="true" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('ProductSearch02Modal')"></button>
      </div>
      <p class="modal_title_t02">검색</p>
      <div class="modal_content dr_content">
        <div class="search_content">
          <div class="search_box" ref="search_box_height" :class="{ search_close_00: searchOpen }" :style="`height:${search_box_height}`">
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="custoer_name" class="filter_type">
                  <span class="filter_type_title">품목</span>
                  <MultiSelect id="" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">Keyword</span>
                  <div class="form_inputnbtn" style="width: 400px">
                    <input type="text" id="" style="" class="t-l" placeholder="고객명 또는 고객 코드를 입력해주세요" />
                    <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- 리얼그리드 -->
        <div class="realgrid_container modal_realgrid06">
          <div class="real_head">
            <div class="real_head_left">
              <small class="-30">총<i>4</i>건</small>
            </div>
            <div class="real_head_right"></div>
          </div>
          <div class="real_body">
            <CustomerOrderGrid style="height: 100%" :gridName="'ProductFavorite'" />
          </div>
          <div class="modal_btn_contents_t05">
            <button class="btn_primary">확인</button>
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
