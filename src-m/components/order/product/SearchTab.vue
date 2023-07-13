<template>
  <div class="kind_search_contents">
    <!-- 검색 영역 -->
    <div class="ks_select_section">
      <div class="ks_select_box" :class="{ ksSelect_open: ksSelectOpen }">
        <div class="ks_search_form">
          <label class="list_title">{{ $t('message.searchWord') }}</label>
          <span class="list_form"><input type="text" placeholder="" class="d_input" v-model="filter" /></span>
        </div>
        <div class="ks_select_filter" :class="{ ksSelect_open: ksSelectOpen }">
          <ul class="ksf_list_box">
            <li class="ksf_list">
              <strong>{{ $t('message.categorySubject') }}</strong>
              <div class="ksf_list_form" v-if="prdtCdList.length > 0">
                <div class="choice_filter" v-for="(prdtClsCds, index) in productCdList.PRDT_CLS_CD" :key="index">
                  <label class="chechbox_product checkbox_size" v-if="prdtCdList.some(cd => cd === prdtClsCds.value)">
                    <input type="radio" name="prdtClsCd" :value="prdtClsCds.value" v-model="prdtClsCd" />
                    <span class="checktxt">{{ prdtClsCds.text }}</span>
                  </label>
                </div>
              </div>
              <div class="ksf_list_form" v-else>
                <div class="choice_filter">
                  <label class="chechbox_product checkbox_size">
                    <input type="radio" />
                    <span class="checktxt">None</span>
                  </label>
                </div>
              </div>
            </li>
            <li class="ksf_list">
              <strong>{{ $t('message.categoryBrand') }}</strong>
              <div class="ksf_list_form">
                <MultiSelect id="" style="width: 100%" class="" label="text" @input="selectCd($event, 'brandCd')" :options="productCdList.BRAND_CD ? productCdList.BRAND_CD : []" :searchable="false" :close-on-select="true" :show-labels="false" placeholder=""></MultiSelect>
              </div>
              <div class="choice_select_box">
                <p class="selected" v-for="(cd, index) in brandCds" :key="index">
                  <span>{{ cd.text }}</span>
                  <button class="in_img" @click="deleteChoose(brandCds, index)"><img src="@m/assets/img/icon_selected_delete.png" /></button>
                </p>
              </div>
            </li>
            <li class="ksf_list">
              <strong>{{ $t('message.ecoNm') }}</strong>
              <div class="ksf_list_form">
                <MultiSelect id="" style="width: 100%" class="" label="text" @input="selectCd($event, 'ecoCd')" :options="productCdList.ECO_CD ? productCdList.ECO_CD : []" :searchable="false" :close-on-select="true" :show-labels="false" placeholder=""></MultiSelect>
              </div>
              <div class="choice_select_box">
                <p class="selected" v-for="(cd, index) in ecoCds" :key="index">
                  <span>{{ cd.text }}</span>
                  <button class="in_img" @click="deleteChoose(ecoCds, index)"><img src="@m/assets/img/icon_selected_delete.png" /></button>
                </p>
              </div>
            </li>
            <li class="ksf_list">
              <strong>{{ $t('message.brdGrade') }}</strong>
              <div class="ksf_list_form">
                <div class="choice_filter" v-for="(grade, index) in productCdList.BRD_GRADE" :key="index">
                  <label class="chechbox_product checkbox_size" v-if="userMenuGrpCd && userMenuGrpCd === 'CUSTOMER' && grade.value === 'P'">
                    <input type="checkbox" :value="grade.value" v-model="gradeCds" :disabled="userMenuGrpCd === 'CUSTOMER'" />
                    <span class="checktxt">{{ grade.text }}</span>
                  </label>
                  <label class="chechbox_product checkbox_size" v-if="userMenuGrpCd && userMenuGrpCd !== 'CUSTOMER'">
                    <input type="checkbox" :value="grade.value" v-model="gradeCds" />
                    <span class="checktxt">{{ grade.text }}</span>
                  </label>
                </div>
              </div>
            </li>
            <li class="ksf_list">
              <strong>{{ $t('message.categorySize') }}</strong>
              <div class="ksf_list_form">
                <MultiSelect id="" style="width: 100%" class="" label="text" @input="selectCd($event, 'specCd')" :options="productCdList.PRDT_SPECS ? productCdList.PRDT_SPECS : []" :searchable="false" :close-on-select="true" :show-labels="false" placeholder=""></MultiSelect>

                <span class="form_row product_list_coulmn">
                  <input type="text" id="" class="d_input" @focus="specCds = []" v-model="inputHrsnSepc" @blur="searchProductSize(inputHrsnSepc, inputVtclSepc)" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                  <input type="text" id="" class="d_input" @focus="specCds = []" v-model="inputVtclSepc" @blur="searchProductSize(inputHrsnSepc, inputVtclSepc)" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                </span>
              </div>
              <span v-if="!isExists.size" class="warning">* {{ $t('message.msgProductNoSize') }}</span>
              <div class="choice_select_box">
                <p class="selected" v-for="(cd, index) in specCds" :key="index">
                  <span>{{ cd.text }}</span>
                  <button class="in_img" @click="deleteChoose(specCds, index)"><img src="@m/assets/img/icon_selected_delete.png" /></button>
                </p>
              </div>
            </li>
            <li class="ksf_list">
              <strong>{{ $t('message.categoryThick') }}</strong>
              <div class="ksf_list_form">
                <MultiSelect id="" style="width: 100%" class="" label="text" @input="selectCd($event, 'tskCd')" :options="productCdList.PRDT_TSK ? productCdList.PRDT_TSK : []" :searchable="false" :close-on-select="true" :show-labels="false" placeholder=""></MultiSelect>
                <span class="form_row product_list_coulmn">
                  <input type="text" id="" class="d_input" @focus="tskCds = []" v-model="inputTskSpec" @blur="searchProductTsk(inputTskSpec)" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                </span>
              </div>
              <span v-if="!isExists.tsk" class="warning">* {{ $t('message.msgProductNoTsk') }}</span>
              <div class="choice_select_box">
                <p class="selected" v-for="(cd, index) in tskCds" :key="index">
                  <span>{{ cd.text }}</span>
                  <button class="in_img" @click="deleteChoose(tskCds, index)"><img src="@m/assets/img/icon_selected_delete.png" /></button>
                </p>
              </div>
            </li>
            <li class="ksf_list">
              <strong>{{ $t('message.density') }}</strong>
              <div class="ksf_list_form">
                <div class="choice_filter" v-for="(dnstType, index) in productCdList.DNST_TYPE" :key="index">
                  <label class="chechbox_product checkbox_size">
                    <input type="checkbox" :value="dnstType.value" v-model="dnstTypeCds" />
                    <span class="checktxt">{{ dnstType.text }}</span>
                  </label>
                </div>
              </div>
            </li>
            <li class="ksf_list" v-if="prdtClsCd.includes('MFB')">
              <strong>{{ $t('message.pattern') }}</strong>
              <div class="ksf_list_form">
                <label class="chechbox_basic">
                  <input type="checkbox" v-model="lpmSame" @change="setSame($event.target.checked, 'lpm')" />
                  <span class="checkmark"></span>
                  {{ $t('message.sameFrontBack') }}
                </label>
              </div>
              <div class="sub_ksf_list">
                <strong>{{ $t('message.front') }}</strong>
                <MultiSelect id="" class="" label="text" @input="selectCd($event, 'lpm')" v-model="lpmFront" :options="productCdList.LPM_PTTN ? productCdList.LPM_PTTN : []" :searchable="false" :close-on-select="true" :show-labels="false" placeholder=""></MultiSelect>
              </div>
              <div class="sub_ksf_list">
                <strong>{{ $t('message.back') }}</strong>
                <MultiSelect id="" class="" label="text" @input="selectCd($event, 'lpm')" v-model="lpmBack" :options="productCdList.LPM_PTTN ? productCdList.LPM_PTTN : []" :searchable="false" :close-on-select="true" :show-labels="false" placeholder=""></MultiSelect>
              </div>
            </li>
            <li class="ksf_list" v-if="prdtClsCd.includes('MFB')">
              <strong>{{ $t('message.prs') }}</strong>
              <div class="ksf_list_form">
                <label class="chechbox_basic">
                  <input type="checkbox" v-model="prsSame" @change="setSame($event.target.checked, 'prs')" />
                  <span class="checkmark"></span>
                  {{ $t('message.sameFrontBack') }}
                </label>
              </div>
              <div class="sub_ksf_list">
                <strong>{{ $t('message.front') }}</strong>
                <MultiSelect id="" class="" label="text" @input="selectCd($event, 'prs')" v-model="prsFront" :options="productCdList.PRS_PTTN ? productCdList.PRS_PTTN : []" :searchable="false" :close-on-select="true" :show-labels="false" placeholder=""></MultiSelect>
              </div>
              <div class="sub_ksf_list">
                <strong>{{ $t('message.back') }}</strong>
                <MultiSelect id="" class="" label="text" @input="selectCd($event, 'prs')" v-model="prsBack" :options="productCdList.PRS_PTTN ? productCdList.PRS_PTTN : []" :searchable="false" :close-on-select="true" :show-labels="false" placeholder=""></MultiSelect>
              </div>
            </li>
          </ul>
        </div>
        <div class="ks_checkbox">
          <label class="chechbox_basic">
            <input type="checkbox" v-model="setCondition" true-value="Y" false-value="N" />
            <span class="checkmark"></span>
            {{ $t('message.msgKeepSelection') }}
          </label>
        </div>
        <div class="btn_box btns_ks_select">
          <button class="btn_reset" @click="resetCondition">{{ $t('message.btnInit') }}</button>
          <button class="btn_search" @click="searchProduct(true)">{{ $t('message.search') }}</button>
        </div>
        <p class="alert_txt"><i class="icon_warning"></i>{{ $t('message.uncheckedInit') }}</p>
      </div>
      <button class="btn_over" @click="ksSelectOpen = !ksSelectOpen" :class="{ ksSelect_open: ksSelectOpen }"><img src="@m/assets/img/btn_over_up.png" /></button>
    </div>

    <!-- //검색 영역 -->
    <!-- 검색결과 목록 영역 -->
    <ProductList :list="productList" ref="ProductList" :pageInfo="pageInfo" />
    <!-- //검색결과 목록 영역 -->
    <AlarmModal @okOrNo="okOrNo" :name="name" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import productApi from '@/api/order/product';
import ProductList from '@m/components/order/product/ProductList';
import AlarmModal from '@m/modal/AlarmModal';
import orderApi from '@/api/order/order';

export default {
  components: {
    ProductList,
    AlarmModal,
  },
  // props: {
  //   productCdList: {
  //     type: Object,
  //     default: () => {
  //       return {
  //         PRDT_CLS_CD: [],
  //         BRAND_CD: [],
  //         ECO_CD: [],
  //         BRD_GRADE: [],
  //         PRDT_SPECS: [],
  //         PRDT_TSK: [],
  //         DNST_TYPE: [],
  //         LPM_PTTN: [],
  //         PRS_PTTN: [],
  //       };
  //     },
  //   },
  // },
  props: ['productCdList', 'productList', 'pageNumber', 'prdtCdList', 'currentTab', 'pageInfo'],
  computed: {
    ...mapGetters({
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      savePage: 'userInfo/getSavePage',
    }),
  },
  watch: {
    pageNumber() {
      if (this.currentTab === 0 && this.pageNumber > 0) this.searchProduct(this.filter);
    },
  },
  data() {
    return {
      name: 'Product',
      ksSelectOpen: false,
      filter: '',
      prdtClsCd: this.productCdList.PRDT_CLS_CD[0].value,
      brandCds: [],
      ecoCds: [],
      gradeCds: [],
      specCds: [],
      tskCds: [],
      dnstTypeCds: [],
      lpmFront: {},
      lpmBack: {},
      prsFront: {},
      prsBack: {},
      lpmSame: false,
      prsSame: false,
      inputHrsnSepc: '',
      inputVtclSepc: '',
      inputTskSpec: '',
      isExists: { size: true, tsk: true },
      setCondition: 'N',
      saveProducts: {},
    };
  },
  methods: {
    pageMove(page) {
      this.$router.push(`${page}`);
    },
    selectCd(value, type) {
      if (type === 'brandCd') {
        for (let i = 0; i < this.brandCds.length; i++) {
          if (this.brandCds[i].value === value.value) {
            return;
          }
        }
        this.brandCds.push(value);
      } else if (type === 'ecoCd') {
        for (let i = 0; i < this.ecoCds.length; i++) {
          if (this.ecoCds[i].value === value.value) {
            return;
          }
        }
        this.ecoCds.push(value);
      } else if (type === 'specCd') {
        for (let i = 0; i < this.specCds.length; i++) {
          if (this.specCds[i].value === value.value) {
            return;
          }
        }
        this.specCds.push(value);
      } else if (type === 'tskCd') {
        for (let i = 0; i < this.tskCds.length; i++) {
          if (this.tskCds[i].value === value.value) {
            return;
          }
        }
        this.tskCds.push(value);
      } else if (type === 'lpm' && this.lpmSame) {
        this.lpmFront = value;
        this.lpmBack = value;
      } else if (type === 'prs' && this.prsSame) {
        this.prsFront = value;
        this.prsBack = value;
      }
    },
    setSame(value, type) {
      if (type === 'lpm' && value) {
        if (this.lpmFront && Object.keys(this.lpmFront).length > 0) {
          this.lpmBack = JSON.parse(JSON.stringify(this.lpmFront));
        } else if (this.lpmBack && Object.keys(this.lpmBack).length > 0) {
          this.lpmFront = JSON.parse(JSON.stringify(this.lpmBack));
        }
      } else if (type === 'prs' && value) {
        if (this.prsFront && Object.keys(this.prsFront).length > 0) {
          this.prsBack = JSON.parse(JSON.stringify(this.prsFront));
        } else if (this.prsBack && Object.keys(this.prsBack).length > 0) {
          this.prsFront = JSON.parse(JSON.stringify(this.prsBack));
        }
      }
    },
    async searchProductSize(hrsnSpec, vtclSpec) {
      if (hrsnSpec && hrsnSpec !== '' && vtclSpec && vtclSpec !== '') {
        try {
          const param = {
            hrsnSpec,
            vtclSpec,
          };
          const resp = await productApi.searchProductSize(param);
          this.isExists.size = resp.data.rs.isExists;
        } catch (e) {
          console.log(e);
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    async searchProductTsk(tskSpec) {
      try {
        const param = {
          tskSpec,
        };
        const resp = await productApi.searchProductTsk(param);
        this.isExists.tsk = resp.data.rs.isExists;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    searchProduct(click = false) {
      if (this.prdtClsCd !== '') {
        let size = '';
        let tsk = '';
        if (this.inputHrsnSepc !== '' && this.inputVtclSepc !== '' && this.isExists.size) {
          size = this.inputHrsnSepc + '_' + this.inputVtclSepc;
        } else {
          size = this.specCds.map(cd => cd.value).join(',');
        }
        if (this.inputTskSpec !== '' && this.isExists.tsk) {
          tsk = this.inputTskSpec;
        } else {
          tsk = this.tskCds.map(cd => cd.value).join(',');
        }
        if (click && this.pageNumber !== 0) {
          this.$emit('resetPageNum');
        }
        const param = {
          prdtClsCd: this.prdtClsCd, // MDF or MFB
          prdtSpecs: size, //가로세로, 콤마연결
          filter: this.filter,
          tskSpecs: tsk, //두께
          brandCds: this.brandCds.map(cd => cd.value).join(','),
          ecoCds: this.ecoCds.map(cd => cd.value).join(','),
          brdGrades: this.gradeCds.join(','),
          // custId: 21,
          dnstTypes: this.dnstTypeCds.join(','),
          pageNumber: this.pageNumber,
          pageSize: 10,
        };
        this.$emit('getProductList', { type: 'search', param, click });
        // this.setUiProductSet();
        this.ksSelectOpen = false;
        this.setUiProductSet();
      } else {
        this.$EventBus.$emit('openYesModal', 'message.msgNoPrdtClsCd');
      }
    },
    resetCondition() {
      if (this.setCondition === 'Y') {
        this.$EventBus.$emit('openYesModal', 'mesesage.msgRequireUnchecked');
      } else {
        this.$modal.show('AlarmModalProduct', { message: 'message.msgAllInit' });
      }
    },
    okOrNo(result) {
      if (result) {
        this.reset();
      }
    },
    reset() {
      this.filter = '';
      this.prdtClsCd = '';
      this.brandCds = [];
      this.ecoCds = [];
      this.gradeCds = [];
      this.specCds = [];
      this.tskCds = [];
      this.dnstTypeCds = [];
      this.lpmFront = {};
      this.lpmBack = {};
      this.prsFront = {};
      this.prsBack = {};
      this.lpmSame = false;
      this.prsSame = false;
      this.inputHrsnSepc = '';
      this.inputVtclSepc = '';
      this.inputTskSpec = '';
      this.isExists = { size: true, tsk: true };
      this.setCondition = 'N';
    },
    checkedProduct() {
      return this.$refs.ProductList.checkedProduct();
    },
    async setUiProductSet() {
      try {
        const param = {
          menuId: this.$route.query.menuId * 1,
          storeCls: 'searchProductSetM',
          uiJson: [
            {
              prdtClsCd: this.prdtClsCd, // MDF or MFB
              specCds: this.specCds, //가로세로, 콤마연결
              tskCds: this.tskCds, //두께
              brandCds: this.brandCds,
              ecoCds: this.ecoCds,
              gradeCds: this.gradeCds,
              dnstTypeCds: this.dnstTypeCds,
              setCondition: this.setCondition,
            },
          ],
        };
        this.saveProducts = {
          prdtClsCd: this.prdtClsCd, // MDF or MFB
          specCds: this.specCds, //가로세로, 콤마연결
          tskCds: this.tskCds, //두께
          brandCds: this.brandCds,
          ecoCds: this.ecoCds,
          gradeCds: this.gradeCds,
          dnstTypeCds: this.dnstTypeCds,
          setCondition: this.setCondition,
        };
        await orderApi.putSaveUi(param);
        sessionStorage.setItem('saveProducts', JSON.stringify(this.saveProducts));
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    setSavePage() {
      if (this.savePage.length > 0 && Object.keys(this.saveProducts).length === 0) {
        this.savePage.forEach(list => {
          if (list.storeCls === 'searchProductSetM') {
            this.setCondition = list.uiJson[0].setCondition;
            if (list.uiJson[0].saveProductSet === 'Y') {
              this.prdtClsCd = list.uiJson[0].prdtClsCd; // MDF or MFB
              this.specCds = list.uiJson[0].specCds; //가로세로, 콤마연결
              this.tskCds = list.uiJson[0].tskCds; //두께
              this.brandCds = list.uiJson[0].brandCds;
              this.ecoCds = list.uiJson[0].ecoCds;
              this.gradeCds = list.uiJson[0].gradeCds;
              this.dnstTypeCds = list.uiJson[0].dnstTypeCds;
              this.setCondition = list.uiJson[0].setCondition;
            }
          }
        });
      }

      if (Object.keys(this.saveProducts).length !== 0 && this.saveProducts.setCondition === 'Y') {
        this.prdtClsCd = this.saveProducts.prdtClsCd; // MDF or MFB
        this.specCds = this.saveProducts.specCds; //가로세로, 콤마연결
        this.tskCds = this.saveProducts.tskCds; //두께
        this.brandCds = this.saveProducts.brandCds;
        this.ecoCds = this.saveProducts.ecoCds;
        this.gradeCds = this.saveProducts.gradeCds;
        this.dnstTypeCds = this.saveProducts.dnstTypeCds;
        this.setCondition = this.saveProducts.setCondition;
      }
    },
    deleteChoose(cds, index) {
      cds.splice(index, 1);
    },
  },
  mounted() {
    this.gradeCds = this.userMenuGrpCd === 'CUSTOMER' ? ['P'] : [];
    this.saveProducts = sessionStorage.getItem('saveProducts');
    if (this.saveProducts) {
      this.saveProducts = JSON.parse(this.saveProducts);
    } else {
      this.saveProducts = {};
    }
    this.setSavePage();
  },
};
</script>

<style></style>
