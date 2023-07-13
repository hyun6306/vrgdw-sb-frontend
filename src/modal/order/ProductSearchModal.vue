<template>
  <modal name="ProductSearchModal" width="1210" height="800" :adaptive="true" @before-close="close" @opened="[getInfoHeight(), getGridMutiLanguage(), setSavePage()]" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="closePopUp()"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.searchPrdt') }}</p>
      <div class="modal_content ProductSearch_content a-c">
        <!-- <a-tabs type="card" v-model="tabIndex" @change="callback"> -->
        <div id="TabS">
          <ul class="tab-menu">
            <li v-for="(tab, index) in tabs" v-bind:class="{ active: currentTab === index }" :key="index">
              <a v-on:click="currentTab = index">{{ $t(tab) }}</a>
            </li>
          </ul>
          <!-- 탭1 -->
          <div class="tab-content">
            <div v-show="currentTab == 0">
              <div class="">
                <!-- 검색 버튼 클릭시 on 클래스 추가-->
                <div class="filter_content" :ref="'filter_content_height_' + page" :class="{ filter_close: filterOpen }" :style="`height:${filter_content_height}`">
                  <!-- <div class="filter_box"> -->
                  <!-- <div class="filter_inbox"> -->
                  <!-- 검색 버튼 클릭시 off 클래스 추가-->
                  <!-- <h4 class="filter_title">{{ $t('message.search') }}</h4>
                      <div class="choice_filters">
                        <div class="search_box filter_search">
                          <input type="text" v-model="searchFilter" class="form_txt" :placeholder="$t('message.msgRequireCode')" @keyup.enter="searchProduct()" />
                          <button class="" @click="searchProduct()">
                            <img src="@/assets/img/icon_search_w.png" alt="검색" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> -->
                  <!-- 검색 버튼 클릭시 on 클래스 추가-->
                  <div class="filter_box" v-for="(productCd, index) in productCdList" :key="index">
                    <div class="filter_inbox" v-if="productCd.groupCd === 'PRDT_CLS_CD'">
                      <h4 class="filter_title">
                        {{ $t('message.categorySubject') }}
                      </h4>
                      <div class="choice_filters" v-if="prdtCdList.length > 0">
                        <div
                          :class="[prdtCdList.some(cd => cd === code.value) ? 'choice_filter' : 'choice_filter choice_filter_no_margin']"
                          v-for="(code, index2) in productCdList.filter(product => {
                            return product.groupCd === 'PRDT_CLS_CD';
                          })[0].codeList"
                          :key="index2"
                        >
                          <label class="chechbox_product" v-if="prdtCdList.some(cd => cd === code.value)">
                            <input type="radio" name="prdt_cls_cd" v-model="prdtClsCd" :value="code.value" />
                            <span class="checktxt">{{ code.text }}</span>
                          </label>
                        </div>
                      </div>
                      <div class="choice_filters" v-else>
                        <div class="choice_filter">
                          <label class="chechbox_product">
                            <span class="checktxt">None</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="filter_inbox" v-if="index === 1">
                      <h4 class="filter_title">{{ $t('message.search') }}</h4>
                      <div class="choice_filters">
                        <div class="search_box filter_search filter_search_padding_left">
                          <input type="text" v-model="searchFilter" class="form_txt" :placeholder="$t('message.msgRequireCode')" @keyup.enter="searchProduct()" ref="searchFilter" />
                          <!-- <button class="btn_search_basic_info" @click="searchProduct()">
                              <img src="@/assets/img/icon_search.png" alt="검색" />
                            </button> -->
                        </div>
                      </div>
                    </div>

                    <div class="filter_inbox" v-if="productCd.groupCd === 'BRAND_CD'">
                      <h4 class="filter_title">
                        {{ $t('message.categoryBrand') }}
                      </h4>
                      <div class="choice_filters">
                        <div
                          class="choice_filter"
                          v-for="(code, index2) in productCdList.filter(product => {
                            return product.groupCd === 'BRAND_CD';
                          })[0].codeList"
                          :key="index2"
                        >
                          <label class="chechbox_product">
                            <input type="checkbox" v-model="brandCd" :value="code.value" />
                            <span class="checktxt">{{ code.text }}</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="filter_inbox" v-if="productCd.groupCd === 'ECO_CD'">
                      <h4 class="filter_title">
                        {{ $t('message.categoryEco') }}
                      </h4>
                      <div class="choice_filters">
                        <div
                          class="choice_filter"
                          v-for="(code, index2) in productCdList.filter(product => {
                            return product.groupCd === 'ECO_CD';
                          })[0].codeList"
                          :key="index2"
                        >
                          <label class="chechbox_product">
                            <input type="checkbox" v-model="ecoCd" :value="code.value" />
                            <span class="checktxt">{{ code.text }}</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="filter_inbox" v-if="productCd.groupCd === 'BRD_GRADE'">
                      <h4 class="filter_title">
                        {{ $t('message.categoryLevel') }}
                      </h4>
                      <div class="choice_filters">
                        <div
                          class="choice_filter"
                          v-for="(code, index2) in productCdList.filter(product => {
                            return product.groupCd === 'BRD_GRADE';
                          })[0].codeList"
                          :key="index2"
                        >
                          <label class="chechbox_product brand_check" v-if="userMenuGrpCd === 'CUSTOMER' && code.value === 'P'">
                            <input type="checkbox" v-model="brdGrade" :value="code.value" :disabled="true" />
                            <span class="checktxt">{{ code.text }}</span>
                          </label>
                          <label class="chechbox_product brand_check" v-else-if="userMenuGrpCd !== 'CUSTOMER'">
                            <input type="checkbox" v-model="brdGrade" :value="code.value" />
                            <span class="checktxt">{{ code.text }}</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="filter_inbox" v-if="productCd.groupCd === 'PRDT_SPECS'">
                      <h4 class="filter_title">
                        {{ $t('message.categorySize') }}
                      </h4>
                      <div class="choice_filters">
                        <div
                          class="choice_filter"
                          v-for="(code, index2) in productCdList.filter(product => {
                            return product.groupCd === 'PRDT_SPECS';
                          })[0].codeList"
                          :key="index2"
                        >
                          <label class="chechbox_product checkbox_size">
                            <input type="checkbox" v-model="prdtSpecs" :value="code.value" @click="clearSize()" />
                            <span class="checktxt">{{ code.text }}</span>
                          </label>
                        </div>
                        <div class="choice_write">
                          <button>{{ $t('message.directly') }}</button>
                          <input type="text" class="write" placeholder="" v-model="hrsnSpec" @focus="resetBtn('size')" @blur="searchProductSize()" oninput="this.value = this.value.replace(/^0+|\D+/g, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');" />
                          <input type="text" class="write" placeholder="" v-model="vtclSpec" @focus="resetBtn('size')" @blur="searchProductSize()" oninput="this.value = this.value.replace(/^0+|\D+/g, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');" />
                          <span v-if="!isExists.size" class="warning">* {{ $t('message.msgProductNoSize') }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="filter_inbox" v-if="productCd.groupCd === 'PRDT_TSK'">
                      <h4 class="filter_title">
                        {{ $t('message.categoryThick') }}
                      </h4>
                      <div class="choice_filters">
                        <div
                          :class="[code.data2 === 'Y' ? 'choice_filter' : 'choice_filter choice_filter_no_margin']"
                          v-for="(code, index2) in productCdList.filter(product => {
                            return product.groupCd === 'PRDT_TSK';
                          })[0].codeList"
                          :key="index2"
                        >
                          <label class="chechbox_product checkbox_tsk" v-if="code.data2 === 'Y'">
                            <input type="checkbox" v-model="tskSpecs" :value="code.value" @click="clearTsk()" />
                            <span class="checktxt">{{ code.text }}</span>
                          </label>
                        </div>
                        <div class="choice_write">
                          <button>{{ $t('message.directly') }}</button>
                          <input type="text" class="write" placeholder="" v-model="tskSpec" @focus="resetBtn('tsk')" @blur="searchProductTsk()" oninput="this.value = this.value.replace(/^0+|\D+/g, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');" />
                          <span v-if="!isExists.tsk" class="warning">* {{ $t('message.msgProductNoTsk') }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="filter_inbox" v-if="productCd.groupCd === 'DNST_TYPE'">
                      <h4 class="filter_title">{{ $t('message.density') }}</h4>
                      <div class="choice_filters">
                        <div
                          class="choice_filter"
                          v-for="(code, index2) in productCdList.filter(product => {
                            return product.groupCd === 'DNST_TYPE';
                          })[0].codeList"
                          :key="index2"
                        >
                          <label class="chechbox_product">
                            <input type="checkbox" v-model="dnstTypes" :value="code.value" />
                            <span class="checktxt">{{ code.text }}</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="filter_inbox" v-if="productCd.groupCd === 'LPM_PTTN' && prdtClsCd === 'AMN0_MFB'">
                      <h4 class="filter_title">{{ $t('message.pattern') }}</h4>
                      <div class="choice_filters">
                        <div class="choice_write">
                          <small>{{ $t('message.front') }}</small>
                          <MultiSelect
                            id="address01"
                            style="width: 30%; flex-shrink: 0"
                            track-by="text"
                            label="text"
                            v-model="lpmPttnFront"
                            :options="
                              productCdList.filter(product => {
                                return product.groupCd === 'LPM_PTTN';
                              })[0].codeList
                            "
                            :close-on-select="true"
                            :show-labels="false"
                            placeholder=""
                            @input="lpmSame()"
                          ></MultiSelect>
                          <small>{{ $t('message.back') }}</small>
                          <MultiSelect
                            id="address01"
                            style="width: 30%; flex-shrink: 0"
                            track-by="text"
                            label="text"
                            v-model="lpmPttnBack"
                            :options="
                              productCdList.filter(product => {
                                return product.groupCd === 'LPM_PTTN';
                              })[0].codeList
                            "
                            :close-on-select="true"
                            :show-labels="false"
                            placeholder=""
                          >
                          </MultiSelect>
                          <label class="chechbox_basic">
                            <input type="checkbox" @change="lpmSame()" v-model="lpmSameChecked" />
                            <span class="checkmark"></span>
                            {{ $t('message.sameFront') }}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="filter_inbox" v-if="productCd.groupCd === 'PRS_PTTN' && prdtClsCd === 'AMN0_MFB'">
                      <h4 class="filter_title">{{ $t('message.prs') }}</h4>
                      <div class="choice_filters">
                        <div class="choice_write">
                          <small>{{ $t('message.front') }}</small>
                          <MultiSelect
                            id="address01"
                            style="width: 30%; flex-shrink: 0"
                            track-by="text"
                            label="text"
                            v-model="prsFront"
                            :options="
                              productCdList.filter(product => {
                                return product.groupCd === 'PRS_PTTN';
                              })[0].codeList
                            "
                            :close-on-select="true"
                            :show-labels="false"
                            placeholder=""
                            @input="prsSame()"
                          ></MultiSelect>
                          <small>{{ $t('message.back') }}</small>
                          <MultiSelect
                            id="address01"
                            style="width: 30%; flex-shrink: 0"
                            track-by="text"
                            label="text"
                            v-model="prsBack"
                            :options="
                              productCdList.filter(product => {
                                return product.groupCd === 'PRS_PTTN';
                              })[0].codeList
                            "
                            :close-on-select="true"
                            :show-labels="false"
                            placeholder=""
                          >
                          </MultiSelect>
                          <label class="chechbox_basic">
                            <input type="checkbox" @change="prsSame()" v-model="prsSameChecked" />
                            <span class="checkmark"></span>
                            {{ $t('message.sameFront') }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Filter Box -->
                  <button :class="{ close: filterOpen }" class="btn_close_filter" @click="filterOpen = !filterOpen">
                    <img src="@/assets/img/product_arrow.png" />
                  </button>
                  <div class="modal_btn_contents_t03">
                    <label class="chechbox_basic">
                      <input type="checkbox" v-model="saveProductSet" true-value="Y" false-value="N" />
                      <span class="checkmark"></span>
                      {{ $t('message.msgKeepSelection') }}
                    </label>
                    <div class="btn_box m-l-a a-l">
                      <button class="btn_ref" @click="resetBtn()">
                        {{ $t('message.btnInit') }}
                      </button>
                      <button class="btn_search" @click="searchProduct()">
                        {{ $t('message.btnSearch') }}
                      </button>
                    </div>
                  </div>
                </div>

                <!-- 검색 버튼 클릭시 on 클래스 추가-->
                <!-- 리프레시 버튼 클릭시 on클래스 삭제-->
                <div :class="[showGrid ? 'table_content on' : 'table_content']">
                  <div class="realgrid_container">
                    <div class="real_head">
                      <div class="real_head_left">
                        <small
                          >{{ $t('message.totalSelection1') }}
                          <i>{{ productSearchList.length }}</i>
                          {{ $t('message.totalSelection2') }}</small
                        >
                      </div>
                    </div>
                    <div class="real_body">
                      <ProductSearchGrid ref="ProductSearchGrid" style="height: 500px" :productSearchList="productSearchList" :gridName="'productSearchGrid' + page" @sendCheckedCount="sendCheckedCount" :gridLang="gridLang" @gridSendModal="gridSendModal" @sendSelectProductsDbClick="sendSelectProductsDbClick" />
                    </div>
                    <!-- <div class="table_content"> -->
                    <!-- <CustomerOrderGrid style="height: 250px" /> -->
                    <div class="modal_btn_contents_t02">
                      <button class="btn_confirm" @click="sendSelectProductsCheck">
                        {{ $t('message.btnAdd') }}<i>({{ checkedCountSearch }})</i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- //탭1 -->
          <!-- 탭2 -->
          <!-- <a-tab-pane key="2" :tab="$t('message.favorite')"> -->
          <div v-show="currentTab == 1">
            <div class="search_box bookmark">
              <span class="search_title">{{ $t('message.searchWord') }}</span>
              <input type="text" class="form_txt" v-model="favoriteFilter" :placeholder="$t('message.msgRequireCode')" @keyup.enter="getProductFavorite(favoriteFilter)" ref="favoriteFilter" />
              <button class="btn_search_text" @click="getProductFavorite(favoriteFilter)">
                {{ $t('message.btnSearch') }}
              </button>
            </div>

            <!-- 리얼그리드 -->
            <div class="realgrid_container">
              <div class="real_head">
                <div class="real_head_left">
                  <small
                    >{{ $t('message.totalSelection1') }}
                    <i>{{ productFavoriteList.length }}</i>
                    {{ $t('message.totalSelection2') }}</small
                  >
                </div>
              </div>
              <div class="real_body">
                <ProductFavoriteGrid ref="ProductFavoriteGrid" style="height: 500px" :productFavoriteList="productFavoriteList" :gridName="'productFavoriteGrid' + page" @sendCheckedCount="sendCheckedCount" :gridLang="gridLang" @gridSendModal="gridSendModal" @sendSelectProductsDbClick="sendSelectProductsDbClick" />
              </div>

              <div class="real_footer"></div>
              <div class="modal_btn_contents_t05">
                <button class="" @click="closePopUp()">
                  {{ $t('message.btnCancel') }}
                </button>
                <button class="btn_black" @click="sendSelectProductsCheck">
                  {{ $t('message.btnAdd') }}<i>({{ checkedCountFa }})</i>
                </button>
              </div>
            </div>
            <!-- //리얼그리드 -->
            <!-- </a-tab-pane> -->
          </div>
          <!-- //탭2 -->
          <!-- 탭3 -->
          <!-- <a-tab-pane key="3" :tab="$t('message.previousOrder')"> -->
          <div v-show="currentTab === 2">
            <div class="search_box bookmark">
              <span class="search_title">{{ $t('message.searchWord') }}</span>
              <input type="text" class="form_txt" v-model="preFilter" :placeholder="$t('message.msgRequireCode')" @keyup.enter="getProductPrevious(preFilter)" ref="preFilter" />
              <button class="btn_search_text" @click="getProductPrevious(preFilter)">
                {{ $t('message.btnSearch') }}
              </button>
            </div>

            <!-- 리얼그리드 -->
            <div class="realgrid_container">
              <div class="real_head">
                <div class="real_head_left">
                  <small
                    >{{ $t('message.totalSelection1') }}
                    <i>{{ productPreviousOrderList.length }}</i>
                    {{ $t('message.totalSelection2') }}</small
                  >
                </div>
              </div>
              <div class="real_body">
                <ProductPreviousOrder ref="ProductPreviousOrder" style="height: 500px" :productPreviousOrderList="productPreviousOrderList" :gridName="'productPreviouseGrid' + page" @sendCheckedCount="sendCheckedCount" :gridLang="gridLang" @gridSendModal="gridSendModal" @sendSelectProductsDbClick="sendSelectProductsDbClick" />
                <!-- <CustomerOrderGrid style="height: 300px" /> -->
              </div>

              <div class="real_footer"></div>
              <div class="modal_btn_contents_t05">
                <button class="" @click="closePopUp()">
                  {{ $t('message.btnCancel') }}
                </button>
                <button class="btn_black" @click="sendSelectProductsCheck">
                  {{ $t('message.btnAdd') }}<i>({{ checkedCountPre }})</i>
                </button>
              </div>
            </div>
          </div>
          <!-- </a-tab-pane> -->
          <!-- //탭3 -->
          <!-- </a-tabs> -->
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapGetters } from 'vuex';
import find from '@/mixins/style.js'; // js 추가
import productApi from '@/api/order/product';
import ProductFavoriteGrid from '@/components/gridView/order/ProductFavoriteGrid';
import ProductPreviousOrder from '@/components/gridView/order/ProductPreviousOrderGrid';
import ProductSearchGrid from '@/components/gridView/order/ProductSearchGrid';
// import CustomerOrderGrid from '@wb/components/gridComponent/CustomerOrderGrid.vue';
import languageApi from '@/api/language';
import orderApi from '@/api/order/order';

export default {
  components: {
    ProductFavoriteGrid,
    ProductPreviousOrder,
    ProductSearchGrid,
  },
  name: 'ProductSearchModal',
  // components: { CustomerOrderGrid },
  props: ['addPrdtType', 'userMenuGrpCd', 'userCustId', 'page', 'menuId', 'searchData', 'savePage', 'prdtCdList', 'gridYn'],

  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  watch: {
    addPrdtType() {
      if (this.addPrdtType === 'addPrdt') {
        this.getProductCode();
        this.currentTab = 0;
      } else if (this.addPrdtType === 'addFavorite') {
        // this.getProductFavorite();
        this.currentTab = 1;
      }
    },
    currentTab() {
      this.favoriteFilter = '';
      this.preFilter = '';
      this.searchFilter = '';
      if (this.currentTab === 0) {
        if (this.productCdList === undefined || this.productCdList.length === 0) {
          this.getProductCode();
        }
        // this.moveTab();
      } else if (this.currentTab === 1) {
        this.getProductFavorite();
        // this.moveTab();
      } else if (this.currentTab === 2) {
        this.getProductPrevious();
        // this.moveTab();
      }
    },
  },
  data() {
    return {
      showGrid: false,
      currentTab: 0,
      tabs: ['message.searchCategory', 'message.favorite', 'message.previousOrder'],
      productCdList: [],
      prdtClsCd: '',
      brandCd: [],
      ecoCd: [],
      brdGrade: this.userMenuGrpCd === 'CUSTOMER' ? ['P'] : [],
      prdtSpecs: [],
      dnstTypes: [],
      tskSpecs: [],
      productFavoriteList: [],
      productPreviousOrderList: [],
      productSearchList: [],
      prsFront: {},
      prsBack: {},
      prsSameChecked: false,
      lpmPttnFront: {},
      lpmPttnBack: {},
      lpmSameChecked: false,
      tskSpec: '',
      hrsnSpec: '',
      vtclSpec: '',
      isExists: { size: true, tsk: true },
      inputSize: false,
      inputTsk: false,
      filterOpen: false,
      filter_content_height: '',
      openCount: 0,
      checkedCountFa: 0,
      checkedCountPre: 0,
      checkedCountSearch: 0,
      favoriteFilter: '',
      preFilter: '',
      searchFilter: '',
      gridLang: [],
      ment: '',
      saveProductSet: '',
      saveProducts: {},
    };
  },
  methods: {
    moveTab() {
      // this.$refs.ProductSearchGrid.clearCheckCount();
      this.$refs.ProductFavoriteGrid.clearCheckCount();
      this.$refs.ProductPreviousOrder.clearCheckCount();
      this.productFavoriteList = [];
      this.productPreviousOrderList = [];
      // this.productSearchList = [];
    },
    close() {
      this.checkedCountFa = 0;
      this.checkedCountPre = 0;
      this.checkedCountSearch = 0;
      this.openCount = 0;
      this.prdtClsCd = '';
      this.brandCd = [];
      this.ecoCd = [];
      this.brdGrade = this.userMenuGrpCd === 'CUSTOMER' ? ['P'] : [];
      this.prdtSpecs = [];
      this.dnstTypes = [];
      this.tskSpecs = [];
      this.vtclSpec = '';
      this.hrsnSpec = '';
      this.tskSpec = '';
      this.filterOpen = false;
      this.favoriteFilter = '';
      this.preFilter = '';
      this.searchFilter = '';
      this.prsFront = {};
      this.prsBack = {};
      this.lpmPttnFront = {};
      this.lpmPttnBack = {};
      this.productCdList = [];
      this.productFavoriteList = [];
      this.productPreviousOrderList = [];
      this.currentTab = -1;
      this.isExists = { size: true, tsk: true };
    },
    getInfoHeight() {
      if (this.openCount === 0) {
        // let val = '';
        // if (this.page === 'order') {
        //   val = this.$refs.filter_content_height_order.scrollHeight;
        // } else if (this.page === 'sample') {
        //   val = this.$refs.filter_content_height_sample.scrollHeight;
        // }
        this.openCount++;
      }
    },
    lpmSame() {
      if (this.lpmSameChecked) {
        this.lpmPttnBack = this.lpmPttnFront;
      }
    },
    prsSame() {
      if (this.prsSameChecked) {
        this.prsBack = this.prsFront;
      }
    },
    async searchProduct() {
      if (this.gridYn == 'N') {
        this.$refs.searchFilter[0].blur();
      }
      try {
        if (this.prdtClsCd !== '') {
          this.showGrid = true;
          this.filterOpen = true;
          let size = '';
          let tsk = '';
          if (this.hrsnSpec !== '' && this.vtclSpec !== '' && this.isExists.size) {
            size = this.hrsnSpec + '_' + this.vtclSpec;
          } else {
            size = this.prdtSpecs.join(',');
          }
          if (this.tskSpec !== '' && this.isExists.tsk) {
            tsk = this.tskSpec;
          } else {
            tsk = this.tskSpecs.join(',');
          }
          const param = {
            prdtClsCd: this.prdtClsCd, // MDF or MFB
            prdtSpecs: size, //가로세로, 콤마연결
            filter: this.searchFilter,
            tskSpecs: tsk, //두께
            brandCds: this.brandCd.join(','),
            ecoCds: this.ecoCd.join(','),
            brdGrades: this.brdGrade.join(','),
            custId: this.userCustId,
            dnstTypes: this.dnstTypes.join(','),
            pageNumber: '',
            pageSize: '',
          };
          const response = await productApi.searchProductCode(param);
          this.productSearchList = response.data.ds;
          this.$refs.ProductSearchGrid.clearCheckCount();
          this.setUiProductSet();
        } else {
          this.$emit('openYesModal', 'message.msgNoPrdtClsCd');
        }
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    resetBtn(type = '') {
      this.showGrid = false;
      if (type !== '') {
        find.resetBtn(type);
        if (type === 'size') {
          this.prdtSpecs = [];
        } else if (type === 'tsk') {
          this.tskSpecs = [];
        }
      } else {
        find.resetBtn(this.userMenuGrpCd);
        this.reset();
      }
    },
    reset() {
      this.searchFilter = '';
      this.prdtClsCd = '';
      this.brandCd = [];
      this.ecoCd = [];
      this.brdGrade = this.userMenuGrpCd === 'CUSTOMER' ? ['P'] : [];
      this.prdtSpecs = [];
      this.dnstTypes = [];
      this.tskSpecs = [];
      this.vtclSpec = '';
      this.hrsnSpec = '';
      this.tskSpec = '';
      this.prsFront = {};
      this.prsBack = {};
      this.lpmPttnFront = {};
      this.lpmPttnBack = {};
      this.isExists = { size: true, tsk: true };
    },
    async getProductCode() {
      try {
        const response = await productApi.getProductCode();
        this.productCdList = response.data.ds;
        if (this.searchData.prdtClsCd) {
          this.searchFilter = this.searchData.prdtCd;
          this.prdtClsCd = this.searchData.prdtClsCd;
          await this.searchProduct();
          await this.moveTab();
        }
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getProductFavorite(filter = '') {
      this.$refs.favoriteFilter.blur();
      try {
        const param = {
          custId: this.userCustId,
          filter,
          pageNumber: '',
          pageSize: '',
        };
        const response = await productApi.getProductFavorite(param);
        // const prdt = JSON.parse(JSON.stringify(response.data.ds));
        // prdt[0].orderYn = "N";
        this.moveTab();
        this.productFavoriteList = JSON.parse(JSON.stringify(response.data.ds));
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getProductPrevious(filter = '') {
      this.$refs.preFilter.blur();
      try {
        const param = {
          custId: this.userCustId,
          filter,
          pageNumber: '',
          pageSize: '',
        };
        const response = await productApi.getProductPrevious(param);
        this.moveTab();
        this.productPreviousOrderList = JSON.parse(JSON.stringify(response.data.ds));
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    closePopUp() {
      // this.productCdList = [];
      if (this.addPrdtType === 'addPrdt') {
        this.resetBtn();
      }
      this.$emit('resetAddrPrdt');
      this.$modal.hide('ProductSearchModal');
    },
    callback(key) {
      if (key === '1') {
        if (this.productCdList === undefined || this.productCdList.length == 0) {
          this.getProductCode();
        }
      } else if (key === '2') {
        this.getProductFavorite();
      }
    },
    clearSize() {
      this.hrsnSpec = '';
      this.vtclSpec = '';
      this.isExists.size = true;
    },
    clearTsk() {
      this.tskSpec = '';
      this.isExists.tsk = true;
    },
    async searchProductSize() {
      try {
        if (this.hrsnSpec !== '' && this.vtclSpec !== '') {
          const param = {
            hrsnSpec: this.hrsnSpec.replaceAll(',', ''),
            vtclSpec: this.vtclSpec.replaceAll(',', ''),
          };
          const resp = await productApi.searchProductSize(param);
          this.isExists['size'] = resp.data.rs.isExists;
        } else {
          this.isExists['size'] = true;
        }
      } catch (e) {
        console.log(e);
        this.isExists['size'] = false;
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async searchProductTsk() {
      try {
        if (this.tskSpec !== '') {
          const param = {
            tskSpec: this.tskSpec.replaceAll(',', ''),
          };
          const resp = await productApi.searchProductTsk(param);
          this.isExists['tsk'] = resp.data.rs.isExists;
        } else {
          this.isExists['tsk'] = true;
        }
      } catch (e) {
        console.log(e);
        this.isExists['tsk'] = false;
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    sendSelectProductsCheck() {
      let selectProductRows = '';
      if (this.currentTab === 0) {
        selectProductRows = this.$refs.ProductSearchGrid.sendSelectProducts();
      } else if (this.currentTab === 1) {
        selectProductRows = this.$refs.ProductFavoriteGrid.sendSelectProducts();
      } else if (this.currentTab === 2) {
        selectProductRows = this.$refs.ProductPreviousOrder.sendSelectProducts();
      }

      this.sendSelectProducts(selectProductRows);
    },
    sendSelectProductsDbClick(row) {
      this.sendSelectProducts(row);
    },
    sendSelectProducts(selectProductRows) {
      let prdtClsCd = '';
      let addPossible = true;
      selectProductRows.forEach((row, index) => {
        if (index === 0) {
          prdtClsCd = row.prdtClsCd;
        } else if (prdtClsCd !== row.prdtClsCd) {
          addPossible = false;
        }
      });
      if (addPossible) {
        if (selectProductRows.length !== 0) {
          this.$emit('sendSelectProducts', {
            selectProductRows,
            ...this.searchData,
          });
          this.closePopUp();
        } else {
          this.$emit('openYesModal', 'message.msgNoItem');
        }
      } else {
        this.$emit('openYesModal', 'message.msgSamePrdtClsCd');
      }
    },
    sendCheckedCount(type, count) {
      if (type === 'favorite') {
        this.checkedCountFa = count;
      } else if (type === 'previous') {
        this.checkedCountPre = count;
      } else if (type === 'search') {
        this.checkedCountSearch = count;
      }
    },
    async getGridMutiLanguage() {
      try {
        const resp = await languageApi.getRouterLanguage('/modal/product/add', this.menuId, this.userLocale, 'Y');
        this.gridLang = resp.data.rs.language;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async setUiProductSet() {
      try {
        const param = {
          menuId: this.menuId,
          storeCls: 'searchProductSet',
          uiJson: [
            {
              prdtClsCd: this.prdtClsCd, // MDF or MFB
              prdtSpecs: this.prdtSpecs, //가로세로, 콤마연결
              tskSpecs: this.tskSpecs, //두께
              brandCds: this.brandCd,
              ecoCds: this.ecoCd,
              brdGrades: this.brdGrade,
              dnstTypes: this.dnstTypes,
              saveProductSet: this.saveProductSet,
            },
          ],
        };
        this.saveProducts = {
          prdtClsCd: this.prdtClsCd, // MDF or MFB
          prdtSpecs: this.prdtSpecs, //가로세로, 콤마연결
          tskSpecs: this.tskSpecs, //두께
          brandCds: this.brandCd,
          ecoCds: this.ecoCd,
          brdGrades: this.brdGrade,
          dnstTypes: this.dnstTypes,
          saveProductSet: this.saveProductSet,
        };
        await orderApi.putSaveUi(param);
      } catch (e) {
        console.log(e);
      }
    },
    gridSendModal(ment) {
      this.$emit('gridSendModal', ment);
    },
    setSavePage() {
      if (this.savePage.length > 0 && Object.keys(this.saveProducts).length === 0) {
        this.savePage.forEach(list => {
          if (list.storeCls === 'searchProductSet') {
            this.saveProductSet = list.uiJson[0].saveProductSet;
            if (list.uiJson[0].saveProductSet === 'Y') {
              this.prdtClsCd = list.uiJson[0].prdtClsCd; // MDF or MFB
              this.prdtSpecs = list.uiJson[0].prdtSpecs; //가로세로, 콤마연결
              this.tskSpecs = list.uiJson[0].tskSpecs; //두께
              this.brandCd = list.uiJson[0].brandCds;
              this.ecoCd = list.uiJson[0].ecoCds;
              this.brdGrade = this.userMenuGrpCd === 'CUSTOMER' ? ['P'] : list.uiJson[0].brdGrades;
              this.dnstTypes = list.uiJson[0].dnstTypes;
              this.saveProductSet = list.uiJson[0].saveProductSet;
            }
          }
        });
      }

      if (Object.keys(this.saveProducts).length !== 0 && this.saveProducts.saveProductSet === 'Y') {
        this.prdtClsCd = this.saveProducts.prdtClsCd; // MDF or MFB
        this.prdtSpecs = this.saveProducts.prdtSpecs; //가로세로, 콤마연결
        this.tskSpecs = this.saveProducts.tskSpecs; //두께
        this.brandCd = this.saveProducts.brandCds;
        this.ecoCd = this.saveProducts.ecoCds;
        this.brdGrade = this.userMenuGrpCd === 'CUSTOMER' ? ['P'] : this.saveProducts.brdGrades;
        this.dnstTypes = this.saveProducts.dnstTypes;
        this.saveProductSet = this.saveProducts.saveProductSet;
      }
    },
  },
  mounted() {
    // this.getInfoHeight();
  },
  created() {
    if (this.userMenuGrpCd !== 'CUSTOMER') {
      this.tabs = ['message.searchCategory'];
    }
  },
};
</script>

<style></style>
