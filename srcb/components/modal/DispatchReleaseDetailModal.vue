<template>
  <modal name="DispatchReleaseDetailModal" width="1210" height="800" :adaptive="true" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('DispatchReleaseDetailModal')"></button>
      </div>
      <p class="modal_title_t02">
        <!-- {{ $t('label.deliveryRequest') }} -->
        출고상세
      </p>
      <div class="modal_content dr_content">
        <h2 class="table_title">
          <span>운송사 선택 및 운임비용</span>
          <!-- <div class="a-l">
                <button class="btn_default btn_deep_green">선택삭제</button>
          </div> -->
        </h2>
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 15%" />
              <col style="width: 15%" />
              <col style="width: 25%" />
              <col style="width: 15%" />
              <col style="width: 15%" />
              <col style="width: 15%" />
            </colgroup>
            <thead>
              <tr>
                <th>운송사 선택</th>
                <th>운임표 명</th>
                <th>도착지</th>
                <th>운임계산 단위코드</th>
                <th>기본 운송비</th>
                <th>운송비 수기입력</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><MultiSelect id="Material_Group" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect></td>
                <td>베트남 운임표1</td>
                <td>cities and provinces county districts</td>
                <td>BD</td>
                <td>100,000</td>
                <td>
                  <input type="text" id="" placeholder="" style="width: 100%" />
                </td>
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
            </div>
            <div class="real_head_right">
              <button class="btn_default btn_deep_green">버튼 1</button>
            </div>
          </div>
          <div class="real_body">
            <CustomerOrderGrid style="height: 100%" :gridName="'ProductFavorite'" />
          </div>
          <div class="modal_btn_contents_t05">
            <button class="btn_default">취소</button>
            <button class="btn_primary">저장</button>
            <button class="btn_primary">운송사 취소</button>
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
