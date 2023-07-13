<template>
  <modal name="TransportCostEditModal" width="1210" height="auto" :adaptive="true" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('TransportCostEditModal')"></button>
      </div>
      <p class="modal_title_t02">
        <!-- {{ $t('label.deliveryRequest') }} -->
        운송비 조정
      </p>
      <div class="modal_content dr_content">
        <h2 class="table_title">
          <span>운송비</span>
        </h2>
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 14%" />
              <col style="width: 12%" />
              <col style="width: 12%" />
              <col style="width: 12%" />
              <col style="width: 20%" />
              <col style="width: 30%" />
            </colgroup>
            <thead>
              <th>운송비 유형</th>
              <th>조정 후</th>
              <th>조정 전</th>
              <th>차액</th>
              <th>조정사유</th>
              <th>기타조정사유</th>
            </thead>
            <tbody>
              <tr>
                <td class="t-l">기본운송비</td>
                <td class="t-l">
                  <span class="essential"><input type="text" id="" placeholder="" style="width: 100%" /></span>
                </td>
                <td class="t-r">150,000</td>
                <td class="t-l"></td>
                <td class="t-l">
                  <MultiSelect id="" class="essential" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                </td>
                <td class="t-l"><input type="text" id="" placeholder="" style="width: 100%" /></td>
              </tr>
              <tr>
                <td class="t-l">기타운송비</td>
                <td class="t-l">
                  <span class="essential"><input type="text" id="" placeholder="" style="width: 100%" /></span>
                </td>
                <td class="t-r">150,000</td>
                <td class="t-l"></td>
                <td class="t-l">
                  <MultiSelect id="" class="essential" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                </td>
                <td class="t-l"><input type="text" id="" placeholder="" style="width: 100%" /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_default">취소</button>
          <button class="btn_primary">저장</button>
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
