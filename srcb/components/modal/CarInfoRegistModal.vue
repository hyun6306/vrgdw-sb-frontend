<template>
  <modal name="CarInfoRegistModal" width="800" height="348" :adaptive="true" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('CarInfoRegistModal')"></button>
      </div>
      <p class="modal_title_t02">
        <!-- {{ $t('label.deliveryRequest') }} -->
        차량정보입력
      </p>
      <div class="modal_content dr_content">
        <h2 class="table_title">
          <span>차량정보</span>
        </h2>
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 15%" />
              <col style="width: 35%" />
              <col style="width: 15%" />
              <col style="width: 35%" />
            </colgroup>
            <tbody>
              <tr>
                <th>운송사</th>
                <td>
                  <span class="">
                    <input type="text" id="" placeholder="" style="width: 100%" />
                  </span>
                </td>
                <th>차량번호</th>
                <td>
                  <span class="essential">
                    <input type="text" id="" placeholder="" style="width: 100%" />
                  </span>
                </td>
              </tr>
              <tr>
                <th>차량유형</th>
                <td>
                  <span class="">
                    <MultiSelect id="Material_Group" class="disabled" disabled style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                  </span>
                </td>
                <th>기사명</th>
                <td>
                  <span class="essential">
                    <input type="text" id="" placeholder="" style="width: 100%" />
                  </span>
                </td>
              </tr>
              <tr>
                <th>휴대폰번호</th>
                <td>
                  <div class="form_input p0">
                    <span class="essential" style="width: 30%">
                      <input type="text" id="drivers_mobile_phone_number01" placeholder="0651" class="t-c three_input" style="width: 100%" />
                    </span>
                    <i>-</i>
                    <input type="text" id="drivers_mobile_phone_number02" placeholder="0651" class="t-c three_input" style="width: 30%" />
                    <i>-</i>
                    <input type="text" id="drivers_mobile_phone_number03" placeholder="0651" class="t-c three_input" style="width: 30%" />
                  </div>
                </td>
                <th>전화번호</th>
                <td>
                  <div class="form_input p0">
                    <span class="" style="width: 30%">
                      <input type="text" id="drivers_mobile_phone_number01" placeholder="0651" class="t-c three_input" style="width: 100%" />
                    </span>
                    <i>-</i>
                    <input type="text" id="drivers_mobile_phone_number02" placeholder="0651" class="t-c three_input" style="width: 30%" />
                    <i>-</i>
                    <input type="text" id="drivers_mobile_phone_number03" placeholder="0651" class="t-c three_input" style="width: 30%" />
                  </div>
                </td>
              </tr>
              <tr>
                <th>사용여부</th>
                <td colspan="3">
                  <div class="a-l gap-5">
                    <MultiSelect id="Material_Group" style="width: 150px; flex-shrink: 0" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                    <MultiSelect id="Material_Group" style="width: 150px; flex-shrink: 0" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                    <span class="essential">
                      <input type="text" id="" placeholder="사용불가 사유 입력" style="width: 100%" />
                    </span>
                  </div>
                </td>
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
