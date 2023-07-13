<template>
  <modal name="DeliveryRequestModal" width="1372" height="800" :adaptive="true" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('DeliveryRequestModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('label.deliveryRequest') }}</p>
      <div class="modal_content dr_content">
        <div class="search_content">
          <p class="search_title">{{ $t('label.deliveryInfo') }}</p>
          <button class="btn_select_destination">Select Destination</button>
          <div class="search_box" ref="search_box_height" :class="{ search_close_00: searchOpen }" :style="`height:${search_box_height}`">
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('label.carType') }}</span>
                  <!-- 로그인한 사람에 따라 인풋기능 변경 -->
                  <MultiSelect id="차량유형" class="essential" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('label.carNum') }}</span>
                  <span class="essential w_100">
                    <input type="text" id="payment_terms" style="" class="t-l" placeholder="Red-bill" />
                  </span>
                </label>
                <label for="destinations_phone_number_1_01" class="filter_type">
                  <span class="filter_type_title">{{ $t('label.driverPhone') }}</span>
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
              </div>
            </div>
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="destination_name" class="filter_type">
                  <span class="filter_type_title">{{ $t('label.deliveryNm') }}</span>
                  <span class="essential w_100">
                    <input type="text" id="destination_name" style="" class="t-r" placeholder="000000" />
                  </span>
                </label>
                <label for="postal_code" class="filter_type">
                  <span class="filter_type_title">{{ $t('label.postCd') }}</span>
                  <input type="text" id="postal_code" style="" class="t-r" placeholder="000000" />
                </label>
                <div class="filter_type">
                  <label class="chechbox_basic">
                    <input type="checkbox" />
                    <span class="checkmark"></span> {{ $t('label.chooseDefaultDelivery') }}
                  </label>
                </div>
              </div>
              <div class="filter_list">
                <label for="adderss01" class="filter_type w_100">
                  <span class="filter_type_title">{{ $t('label.address') }}</span>
                  <div class="form_input">
                    <MultiSelect id="adderss01" class="essential" style="width: 305px; flex-shrink: 0" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                    <i></i>
                    <MultiSelect id="adderss02" class="essential" style="width: 419px; flex-shrink: 0" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                    <i></i>
                    <span class="essential w_100">
                      <input type="text" id="adderss03" style="width: 100%" class="t-l" placeholder="" />
                    </span>
                  </div>
                </label>
              </div>
              <div class="filter_list">
                <label for="destinations_phone_number_1" class="filter_type">
                  <span class="filter_type_title">{{ $t('label.chargePersonNm') }}</span>
                  <input type="text" id="담당자명" style="width: " class="t-l" placeholder="" />
                </label>

                <label for="destinations_phone_number_1_01" class="filter_type">
                  <span class="filter_type_title" style="">{{ $t('label.deliAddressPhone') }} (1)</span>
                  <div class="form_input">
                    <span class="essential" style="width: 30%">
                      <input type="text" id="destinations_phone_number_1_01" style="width: 100%" class="t-c three_input" placeholder="0651" />
                    </span>
                    <i>-</i>
                    <input type="text" id="destinations_phone_number_1_02" style="width: 30%" class="t-c three_input" placeholder="0651" />
                    <i>-</i>
                    <input type="text" id="destinations_phone_number_1_03" style="width: 30%" class="t-c three_input" placeholder="0651" />
                  </div>
                </label>
                <label for="destinations_phone_number_1_01" class="filter_type">
                  <span class="filter_type_title" style="">{{ $t('label.deliAddressPhone') }} (1)</span>
                  <div class="form_input" style="">
                    <input type="text" id="destinations_phone_number_1_01" style="width: 30%" class="t-c three_input" placeholder="0651" />
                    <i>-</i>
                    <input type="text" id="destinations_phone_number_1_02" style="width: 30%" class="t-c three_input" placeholder="0651" />
                    <i>-</i>
                    <input type="text" id="destinations_phone_number_1_03" style="width: 30%" class="t-c three_input" placeholder="0651" />
                  </div>
                </label>
              </div>
              <div class="filter_list">
                <div class="form_textarea delivery">
                  <textarea type="text" id="" style="width: 100%" class="t-l" placeholder="배송요청 시 메모" />
                </div>
              </div>
            </div>
          </div>

          <button class="btn_search_content" @click="searchOpen = !searchOpen"><i :class="{ close: searchOpen }"></i></button>
        </div>

        <!-- 검색 버튼 클릭시 on 클래스 추가-->
        <!-- 리프레시 버튼 클릭시 on클래스 삭제-->
        <!-- 리얼그리드 -->
        <div class="realgrid_container modal_realgrid01">
          <div class="real_head">
            <div class="real_head_left">
              <small>{{ $t('label.total') }} <i>4</i> {{ $t('label.count') }}</small>
            </div>
          </div>
          <div class="real_top_filter">
            <div class="real_top_left">
              <span class="real_top_filter_title">{{ $t('label.deliverySchedule') }} : 2022-07-22</span>
              <button class="btn_date_search"><img src="@/assets/img/icon_search_b.png" /></button>
              <!-- 데이터피커 -->
              <div class="form_calendar">
                <input type="text" placeholder="희망배송 월/일" />
                <button class="icon_calendar" @click="datePicker('DatePicker')"><img src="@/assets/img/icon_calendar.png" /></button>
              </div>
            </div>
            <div class="real_top_right">
              <div class="form_input">
                <span>여신잔액</span>
                <input id="" type="text" style="width: 100px" class="disabled" disabled />
              </div>
              <button class="btn_default btn_filter">
                <span>DEBIT NOTE</span>
              </button>
              <button class="btn_default btn_filter">
                <span>선택삭제</span>
              </button>
            </div>
          </div>
          <div class="real_body">
            <CustomerOrderGrid style="height: 100%" :gridName="'ProductFavorite'" />
          </div>
          <div class="real_total">
            <p>
              <span>합계금액 :</span>
              <i>44,977,504,000</i>
            </p>
          </div>
          <div class="real_total">
            <p>
              <span>VAT :</span>
              <i>44,977,504,000</i>
            </p>
          </div>
          <div class="real_total">
            <p>
              <span>Total :</span>
              <i>44,977,504,000</i>
            </p>
          </div>
          <p class="guide_txt mt-10">!{{ $t('label.deRequestComment1') }} !{{ $t('label.deRequestComment2') }}</p>
          <div class="modal_btn_contents_t05">
            <button class="btn_primary">{{ $t('button.deliveryRequest') }}</button>
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
