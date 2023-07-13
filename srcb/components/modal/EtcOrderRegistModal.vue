<template>
  <modal name="EtcOrderRegistModal" width="1372" height="800" :adaptive="true" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('EtcOrderRegistModal')"></button>
      </div>
      <p class="modal_title_t02">
        <!-- {{ $t('label.deliveryRequest') }} -->
        기타주문등록
      </p>
      <div class="modal_content dr_content">
        <div class="search_content">
          <div class="search_box" ref="search_box_height" :class="{ search_close_02: searchOpen }" :style="`height:${search_box_height}`">
            <div class="search_box_title always_exposure">
              <span>기타출고 기본 정보</span>
            </div>
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">플랜트</span>
                  <MultiSelect id="plant" class="essential" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">상차지</span>
                  <MultiSelect id="plant" class="essential" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                </label>
                <button class="btn_search_text_row btn_function">초기화</button>
              </div>
            </div>
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">배송지명</span>
                  <input type="text" id="destination_name" style="" class="t-r" placeholder="" />
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">고객사</span>
                  <div class="form_inputnbtn">
                    <input type="text" id="" style="" class="t-r" placeholder="" />
                    <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
                  </div>
                </label>
              </div>
            </div>
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="destinations_phone_number_1_01" class="filter_type">
                  <span class="filter_type_title">배송 연락처</span>
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
                <label for="postal_code" class="filter_type">
                  <span class="filter_type_title">{{ $t('label.postCd') }}</span>
                  <input type="text" id="postal_code" style="" class="t-r" placeholder="" />
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">배송형태</span>
                  <!-- 로그인한 사람에 따라 인풋기능 변경 -->
                  <MultiSelect id="" class="essential" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">배송수단</span>
                  <!-- 로그인한 사람에 따라 인풋기능 변경 -->
                  <MultiSelect id="" class="essential" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                </label>
              </div>
              <div class="filter_list">
                <label for="adderss01" class="filter_type w_100">
                  <span class="filter_type_title">{{ $t('label.address') }}</span>
                  <div class="form_input">
                    <MultiSelect id="" class="essential" style="width: 164px; flex-shrink: 0" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="cities and provinces"></MultiSelect>
                    <MultiSelect id="" class="essential" style="width: 200px; flex-shrink: 0" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="county districts"></MultiSelect>

                    <span class="essential" style="width: 100%">
                      <input type="text" id="adderss03" class="t-l w_100" placeholder="" />
                    </span>
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
                <label for="" class="filter_type">
                  <span class="filter_type_title">운송비 배분부서</span>
                  <div class="form_inputnbtn">
                    <input type="text" id="" style="" class="t-r" placeholder="" />
                    <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
                  </div>
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">결재번호</span>
                  <span class="essential" style="width: 100%">
                    <input type="text" id="" style="" class="t-r" placeholder="" />
                  </span>
                </label>
              </div>
              <!-- <div class="bottom_btn_box">
                <button class="btn_reset">초기화</button>
              </div> -->
            </div>
          </div>
          <button class="btn_search_content" @click="searchOpen = !searchOpen"><i :class="{ close: searchOpen }"></i></button>
        </div>

        <!-- 검색 버튼 클릭시 on 클래스 추가-->
        <!-- 리프레시 버튼 클릭시 on클래스 삭제-->
        <!-- 리얼그리드 -->
        <div class="realgrid_container modal_realgrid03_open mt-20" :class="{ modal_realgrid03_folding: searchOpen }">
          <div class="real_head">
            <div class="real_head_left">
              <small>기타출고 목록</small>
              <small class="ml-30">총<i>4</i>건</small>
            </div>
            <div class="real_head_right">
              <button class="btn_default btn_deep_green">행추가</button>
              <button class="btn_default btn_deep_green">삭제</button>
              <button class="btn_default btn_function">기능</button>
              <button class="btn_default btn_process">일반프로세스</button>
              <button class="btn_default btn_critical_process">중요프로세스</button>
              <button class="btn_default btn_print_fuction">출력물프로세스</button>
            </div>
          </div>
          <div class="real_body">
            <CustomerOrderGrid style="height: 100%" :gridName="'ProductFavorite'" />
          </div>
          <div class="modal_btn_contents_t05">
            <button class="btn_default">취소</button>
            <button class="btn_primary">기타출고 요청</button>
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
      searchOpen: true,
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
