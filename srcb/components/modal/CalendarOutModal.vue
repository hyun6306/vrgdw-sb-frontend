<template>
  <modal name="CalendarOutModal" width="500" height="auto" :adaptive="true" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('CalendarOutModal')"></button>
      </div>
      <p class="modal_title_t02">
        <!-- {{ $t('label.deliveryRequest') }} -->
        출고
      </p>
      <div class="modal_content dr_content">
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 20%" />
              <col style="width: 80%" />
            </colgroup>
            <tbody>
              <tr>
                <th>일자</th>
                <td>
                  <div class="form_calendar">
                    <input type="text" placeholder="기간 선택" />
                    <button class="icon_calendar" @click="datePicker('DateRangePicker')"><img src="@/assets/img/icon_calendar.png" /></button>
                  </div>
                </td>
              </tr>
              <tr>
                <th>구분</th>
                <td class="t-l">주말</td>
              </tr>
              <tr>
                <th>내역</th>
                <td>
                  <span class="">
                    <input type="text" placeholder="" style="width: 100%" />
                  </span>
                </td>
              </tr>
              <tr>
                <th>출고가능</th>
                <td>
                  <div class="a-l-c">
                    <label class="radio_t ma-0">
                      <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                      Y
                    </label>
                    <label class="radio_t ml-10">
                      <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                      N
                    </label>
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
