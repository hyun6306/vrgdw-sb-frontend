<template>
  <modal name="ProductSearchModal" class="ProductSearchModal" width="1210" height="800" :adaptive="true" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('ProductSearchModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('label.productSearch') }}</p>
      <div class="modal_content ProductSearch_content a-c">
        <div id="TabS">
          <ul class="tab-menu">
            <li v-for="(tab, index) in tabs" v-bind:class="{ active: currentTab === index }" :key="index">
              <a v-on:click="currentTab = index">{{ $t(tab) }}</a>
            </li>
          </ul>
          <div class="tab-content">
            <!-- 분류검색 -->
            <div v-show="currentTab == 0">
              <div class="">
                <!-- 검색 버튼 클릭시 on 클래스 추가-->
                <div class="filter_content" :class="{ filter_close: filterOpen }">
                  <!-- 검색 버튼 클릭시 on 클래스 추가-->
                  <div class="filter_box">
                    <div class="filter_inbox">
                      <!-- 검색 버튼 클릭시 off 클래스 추가-->
                      <h4 class="filter_title">{{ $t('label.search') }}</h4>
                      <div class="choice_filters">
                        <div class="search_box filter_search">
                          <input type="text" class="form_txt" :placeholder="$t('label.codeAndPrdtNm')" />
                          <!-- <button class="">
                            <img src="@/assets/img/icon_search_w.png" alt="검색" />
                          </button> -->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="filter_box">
                    <div class="filter_inbox">
                      <!-- 검색 버튼 클릭시 off 클래스 추가-->
                      <h4 class="filter_title">{{ $t('label.prdtCd') }}</h4>
                      <!-- 검색 버튼 클릭시 on 클래스 추가-->
                      <div class="choice_filters">
                        <div class="choice_filter">
                          <label class="chechbox_product">
                            <input type="checkbox" />
                            <span class="checktxt">MDF</span>
                          </label>
                        </div>

                        <div class="choice_filter">
                          <label class="chechbox_product">
                            <input type="checkbox" />
                            <span class="checktxt">MDF</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="filter_box">
                    <div class="filter_inbox">
                      <h4 class="filter_title">{{ $t('label.brand') }}</h4>
                      <div class="choice_filters">
                        <div class="choice_filter">
                          <label class="chechbox_product">
                            <input type="checkbox" />
                            <span class="checktxt">HBR</span>
                          </label>
                        </div>
                        <div class="choice_filter">
                          <label class="chechbox_product">
                            <input type="checkbox" />
                            <span class="checktxt">HDHMR</span>
                          </label>
                        </div>
                        <div class="choice_filter">
                          <label class="chechbox_product">
                            <input type="checkbox" />
                            <span class="checktxt">HFL</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="filter_box">
                    <div class="filter_inbox">
                      <h4 class="filter_title">{{ $t('label.size') }}</h4>
                      <div class="choice_filters">
                        <div class="choice_filter">
                          <label class="chechbox_product checkbox_size">
                            <input type="checkbox" />
                            <span class="checktxt">1220*2440</span>
                          </label>
                        </div>
                        <div class="choice_filter">
                          <label class="chechbox_product checkbox_size">
                            <input type="checkbox" />
                            <span class="checktxt">1220*2440</span>
                          </label>
                        </div>
                        <div class="choice_write">
                          <button>{{ $t('label.selfInput') }}</button>
                          <input class="write" placeholder="" />
                          <input class="write" placeholder="" />
                          <span class="warning">*{{ $t('label.noCriteriaSize') }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="filter_box">
                    <div class="filter_inbox">
                      <h4 class="filter_title">{{ $t('label.prs') }}</h4>
                      <div class="choice_filters">
                        <div class="choice_write">
                          <small>{{ $t('label.front') }}</small>
                          <MultiSelect id="adderss01" style="width: 150px; flex-shrink: 0" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder=""></MultiSelect>
                          <small>{{ $t('label.back') }}</small>
                          <MultiSelect id="adderss01" style="width: 150px; flex-shrink: 0" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder=""></MultiSelect>
                          <label class="chechbox_basic">
                            <input type="checkbox" />
                            <span class="checkmark"></span> {{ $t('label.sameFront') }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button :class="{ close: filterOpen }" class="btn_close_filter" @click="filterOpen = !filterOpen"><img src="@/assets/img/product_arrow.png" /></button>
                  <div class="modal_btn_contents_t03">
                    <label class="chechbox_basic">
                      <input type="checkbox" />
                      <span class="checkmark"></span> {{ $t('label.keepSearchCondition') }}
                    </label>
                    <div class="btn_box m-l-a a-l">
                      <button class="btn_ref" @click="resetBtn()">{{ $t('button.refresh') }}</button>
                      <button class="btn_search" @click="searchProduct()">{{ $t('button.search') }}</button>
                    </div>
                  </div>
                </div>

                <!-- 검색 버튼 클릭시 on 클래스 추가-->
                <!-- 리프레시 버튼 클릭시 on클래스 삭제-->
                <!-- 리얼그리드 -->
                <div class="realgrid_container table_content">
                  <div class="real_head">
                    <div class="real_head_left">
                      <small>{{ $t('label.total') }} <i>4</i> {{ $t('label.count') }}</small>
                    </div>
                  </div>
                  <div class="real_body">
                    <CustomerOrderGrid style="height: 300px" :gridName="'ProductFavorite'" />
                  </div>

                  <div class="real_footer"></div>
                  <div class="modal_btn_contents_t05">
                    <button class="btn_black">{{ $t('button.ok') }}</button>
                  </div>
                </div>
                <!-- //리얼그리드 -->
              </div>
            </div>
            <!-- //탭1 -->
            <!-- 탭2 -->
            <div v-show="currentTab == 1">
              <div class="search_box bookmark">
                <span class="search_title">{{ $t('label.search') }}</span>
                <input type="text" class="form_txt" :placeholder="$t('label.codeAndPrdtNm')" />
                <!-- <button class="">
                  <img src="@/assets/img/icon_search_w.png" alt="검색" />
                </button> -->
              </div>
              <!-- 리얼그리드 -->
              <div class="realgrid_container">
                <div class="real_head">
                  <div class="real_head_left">
                    <small>{{ $t('label.total') }} <i>4</i> {{ $t('label.count') }}</small>
                  </div>
                </div>
                <div class="real_body">
                  <CustomerOrderGrid style="height: 300px" :gridName="'ProductFavorite'" />
                </div>

                <div class="real_footer"></div>
                <div class="modal_btn_contents_t05">
                  <button class="">{{ $t('button.cancel') }}</button>
                  <button class="btn_black">{{ $t('button.add') }}<i>(3)</i></button>
                </div>
              </div>
              <!-- //리얼그리드 -->
            </div>
            <!-- //탭2 -->
            <!-- 탭3 -->
            <div v-show="currentTab == 2">
              <div class="search_box bookmark">
                <span class="search_title">{{ $t('label.search') }}</span>
                <input type="text" class="form_txt" :placeholder="$t('label.codeAndPrdtNm')" />
                <!-- <button class="">
                  <img src="@/assets/img/icon_search_w.png" alt="검색" />
                </button> -->
              </div>

              <!-- 리얼그리드 -->
              <div class="realgrid_container">
                <div class="real_head">
                  <div class="real_head_left">
                    <small>{{ $t('label.total') }} <i>4</i> {{ $t('label.count') }}</small>
                  </div>
                </div>
                <div class="real_body">
                  <CustomerOrderGrid style="height: 300px" :gridName="'ProductPrevios'" />
                </div>

                <div class="real_footer"></div>
                <div class="modal_btn_contents_t05">
                  <button class="">{{ $t('button.cancel') }}</button>
                  <button class="btn_black">{{ $t('button.add') }}<i>(3)</i></button>
                </div>
              </div>
            </div>
            <!-- //탭2 -->
          </div>
        </div>

        <button class="btn_question"><img src="@/assets/img/icon_q.png" alt="질문" /></button>
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
      tabs: ['label.categorySearch', 'label.favorite', 'label.previousOrder'],
      selectValue: '',
      selectOptions: ['Select option', 'options', 'selected'],
      filterOpen: false,
      filter_content_height: '',
      openCount: 0,
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
