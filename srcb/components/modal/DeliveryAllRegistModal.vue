<template>
  <modal name="DeliveryAllRegistModal" width="1372" height="800" :adaptive="true" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('DeliveryAllRegistModal')"></button>
      </div>
      <p class="modal_title_t02">
        <!-- {{ $t('label.deliveryRequest') }} -->
        배송지 일괄적용
      </p>
      <div class="modal_content dr_content">
        <div class="search_content">
          <div class="search_box" ref="search_box_height" :class="{ search_close_00: searchOpen }" :style="`height:${search_box_height}`">
            <div class="search_box_title always_exposure"><span>배송지 정보</span></div>
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">플랜트</span>
                  <!-- 로그인한 사람에 따라 인풋기능 변경 -->
                  <MultiSelect id="plant" class="essential" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                </label>
                <label for="destinations_phone_number_1_01" class="filter_type">
                  <span class="filter_type_title">연락처 1</span>
                  <div class="form_input">
                    <span class="essential" style="width: 30%">
                      <input type="text" id="destinations_phone_number_1_01" style="width: 100%" class="essential t-c three_input" placeholder="0651" />
                    </span>
                    <i>-</i>
                    <input type="text" id="destinations_phone_number_1_02" style="width: 30%" class="t-c three_input" placeholder="0651" />
                    <i>-</i>
                    <input type="text" id="destinations_phone_number_1_03" style="width: 30%" class="t-c three_input" placeholder="0651" />
                  </div>
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">배송형태</span>
                  <MultiSelect id="" class="essential" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                </label>
              </div>
            </div>
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="destination_name" class="filter_type">
                  <span class="filter_type_title">{{ $t('label.deliveryNm') }}</span>
                  <input type="text" id="destination_name" style="q" class="essential t-r" placeholder="000000" />
                </label>
                <label for="postal_code" class="filter_type">
                  <span class="filter_type_title">{{ $t('label.postCd') }}</span>
                  <input type="text" id="postal_code" style="" class="t-r" placeholder="000000" />
                </label>
              </div>
              <div class="filter_list">
                <label for="adderss01" class="filter_type w_100">
                  <span class="filter_type_title">{{ $t('label.address') }}</span>
                  <div class="form_input">
                    <MultiSelect id="adderss01" class="essential" style="width: 305px; flex-shrink: 0" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                    <i></i>
                    <MultiSelect id="adderss02" class="essential" style="width: 419px; flex-shrink: 0" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                    <i></i>
                    <input type="text" id="adderss03" style="width: 100%" class="t-l" placeholder="" />
                  </div>
                </label>
              </div>
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">배송희망일</span>
                  <div class="form_calendar w_100 essential">
                    <input type="text" placeholder="기간 선택" />
                    <button class="icon_calendar" @click="datePicker('DatePicker')"><img src="@/assets/img/icon_calendar.png" /></button>
                  </div>
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">배송희망시간</span>
                  <MultiSelect id="plant" class="essential" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                </label>
              </div>
              <div class="filter_list">
                <div class="form_textarea delivery">
                  <textarea type="text" id="" style="width: 100%" class="t-l" placeholder="배송요청 시 메모" />
                </div>
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
            <button class="btn_default">취소</button>
            <button class="btn_primary">일괄적용</button>
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
