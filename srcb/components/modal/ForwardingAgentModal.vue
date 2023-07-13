<template>
  <modal name="ForwardingAgentModal" width="1210" height="800" :adaptive="true" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('ForwardingAgentModal')"></button>
      </div>
      <p class="modal_title_t02">
        <!-- {{ $t('label.deliveryRequest') }} -->
        운송사 선택
      </p>
      <div class="modal_content dr_content">
        <h2 class="table_title">
          <span>운송사 금월 누적정보</span>
          <!-- <div class="a-l">
                <button class="btn_default btn_deep_green">선택삭제</button>
          </div> -->
        </h2>
        <div class="table">
          <table>
            <colgroup>
              <col style="width: calc(100% / 6)" />
              <col style="width: calc(100% / 6)" />
              <col style="width: calc(100% / 6)" />
              <col style="width: calc(100% / 6)" />
              <col style="width: calc(100% / 6)" />
              <col style="width: calc(100% / 6)" />
            </colgroup>
            <thead>
              <tr>
                <th colspan="2">베트남 운송사 1</th>
                <th colspan="2">베트남 운송사 2</th>
                <th colspan="2">베트남 운송사 3</th>
              </tr>
              <tr>
                <th>누적건수</th>
                <th>운송비 누적금액</th>
                <th>누적건수</th>
                <th>운송비 누적금액</th>
                <th>누적건수</th>
                <th>운송비 누적금액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>100</td>
                <td>10,000,000</td>
                <td>100</td>
                <td>10,000,000</td>
                <td class="f-red">100</td>
                <td class="f-red">10,000,000</td>
                <!-- <td>
                  <div class="essential"><input type="text" id="" placeholder="" style="width: 100%" /></div>
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
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
                <th>운임비 유형</th>
                <th>도착지</th>
                <th>운임계산 단위코드</th>
                <th>기본 운송비</th>
                <th>운송비 수기입력</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><MultiSelect id="Material_Group" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect></td>
                <td><MultiSelect id="Material_Group" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect></td>
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
        <div class="realgrid_container modal_realgrid02 mt-20">
          <div class="real_head">
            <div class="real_head_left">
              <small>출고정보</small>
              <small class="ml-30">총<i>4</i>건</small>
              <small class="ml-30">출고량 <i>4</i></small>
              <small class="ml-30">중량<i>4</i>T</small>
              <small class="ml-30">부피<i>4</i>M3</small>
            </div>
            <div class="real_head_right">
              <button class="btn_default btn_deep_green">버튼 1</button>
            </div>
          </div>
          <div class="real_body" style="height: 350px">
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
