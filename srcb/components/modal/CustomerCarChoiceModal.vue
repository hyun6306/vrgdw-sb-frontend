<template>
  <modal name="CustomerCarChoiceModal" width="1210" height="800" :adaptive="true" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('CustomerCarChoiceModal')"></button>
      </div>
      <p class="modal_title_t02">
        <!-- {{ $t('label.deliveryRequest') }} -->
        고객차량 선택
      </p>
      <div class="modal_content dr_content">
        <h2 class="table_title">
          <span>고객차량 기본정보</span>
          <!-- <div class="a-l">
                <button class="btn_default btn_deep_green">선택삭제</button>
          </div> -->
        </h2>
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 50%" />
              <col style="width: 25%" />
              <col style="width: 25%" />
            </colgroup>
            <thead>
              <tr>
                <th>고객사명</th>
                <th>차량번호</th>
                <th>운전기사 연락처</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>하노이대리점</td>
                <td>30F-111.11</td>
                <td>010-0000-0000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 리얼그리드 -->
        <div class="realgrid_container modal_realgrid04 mt-20">
          <div class="real_head">
            <div class="real_head_left">
              <small>출고정보목록</small>
              <small class="ml-30">총<i>4</i>건</small>
              <small class="ml-30">출고량<i>4</i></small>
              <small class="ml-30">중량<i>4</i>T</small>
              <small class="ml-30">부피<i>4</i>M3</small>
            </div>
            <div class="real_head_right">
              <button class="btn_default btn_deep_green">삭제</button>
            </div>
          </div>
          <div class="real_body">
            <CustomerOrderGrid style="height: 100%" :gridName="'ProductFavorite'" />
          </div>
          <div class="modal_btn_contents_t05">
            <button class="btn_default">취소</button>
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
        //this.search_box_height = `${val}px`;
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
