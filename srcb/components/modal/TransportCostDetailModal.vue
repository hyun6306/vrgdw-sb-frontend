<template>
  <modal name="TransportCostDetailModal" width="800" height="auto" :adaptive="true" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('TransportCostDetailModal')"></button>
      </div>
      <p class="modal_title_t02">
        <!-- {{ $t('label.deliveryRequest') }} -->
        운송비 상세
      </p>
      <div class="modal_content dr_content">
        <h2 class="table_title">
          <span>차량정보</span>
        </h2>
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 25%" />
              <col style="width: 25%" />
              <col style="width: 25%" />
              <col style="width: 25%" />
            </colgroup>
            <thead>
              <th>운송비 유형</th>
              <th>운송비</th>
              <th>조정사유</th>
              <th>기타조정사유</th>
            </thead>
            <tbody>
              <tr>
                <td class="t-l">기본운송비</td>
                <td class="t-r">150,000</td>
                <td class="t-l"></td>
                <td class="t-l"></td>
              </tr>
              <tr>
                <td class="t-l">기본운송비</td>
                <td class="t-r">150,000</td>
                <td class="t-l"></td>
                <td class="t-l"></td>
              </tr>
              <tr>
                <td class="t-l">기본운송비</td>
                <td class="t-r">150,000</td>
                <td class="t-l"></td>
                <td class="t-l"></td>
              </tr>
            </tbody>
          </table>
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
