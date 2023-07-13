<template>
  <modal :adaptive="true" :clickToClose="false" height="800" name="ForwardingEtcRegistModal" width="1372" @before-open="beforeOpen">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('ForwardingEtcRegistModal')"></button>
      </div>
      <p class="modal_title_t02">
        <!-- {{ $t('label.deliveryRequest') }} -->
        {{ $t('message.etcRegist') }}
      </p>
      <div class="modal_content dr_content">
        <div class="search_content">
          <div ref="search_box_height" :class="{ search_close_02: searchOpen }" :style="`height:${search_box_height}`" class="search_box">
            <div class="search_box_title always_exposure">
              <span>{{ $t('message.etcDefaultInfo') }}</span>
            </div>

            <div class="search_box_filter">
              <div class="filter_list">
                <label class="filter_type" for="">
                  <span class="filter_type_title">{{ $t('message.plant') }}</span>
                  <MultiSelect id="plant" v-model="plntCd" :allow-empty="false" :close-on-select="true" :options="plntOptions" :searchable="false" :show-labels="false" class="essential" label="text" placeholder="Pick a value" style="width: 100%" @input="changePlant()"></MultiSelect>
                </label>
                <label class="filter_type" for="">
                  <span class="filter_type_title">{{ $t('message.upSiteNm') }}</span>
                  <MultiSelect id="plant" v-model="upSiteCd" :allow-empty="false" :close-on-select="true" :options="upSiteOptions" :searchable="false" :show-labels="false" class="essential" label="text" placeholder="Pick a value" style="width: 100%"></MultiSelect>
                </label>
                <button class="btn_search_text_row btn_function" @click="init">{{ $t('message.btnInit') }}</button>
              </div>
            </div>
            <div class="search_box_filter">
              <div class="filter_list">
                <label class="filter_type" for="">
                  <span class="filter_type_title">{{ $t('message.addrNm') }}</span>
                  <input id="destination_name" v-model="logitsAlias" class="t-l" maxlength="100" placeholder="" style="" type="text" />
                </label>
                <label class="filter_type" for="">
                  <span class="filter_type_title">{{ $t('message.cust') }}</span>
                  <div class="form_inputnbtn">
                    <!-- <span class="" style="width: 100%"> -->
                    <input id="" v-model="custNm" class="t-l" placeholder="" style="" type="text" @keyup.enter="clientSearch" />
                    <!-- </span> -->
                    <button class="btn_search_basic_info" @click="clientSearch"><img src="@/assets/img/icon_search.png" /></button>
                  </div>
                </label>
              </div>
            </div>
            <div class="search_box_filter">
              <div class="filter_list">
                <label class="filter_type" for="destinations_phone_number_1_01">
                  <span class="filter_type_title">{{ $t('message.logitsPhoneNum1') }}</span>
                  <div class="form_input">
                    <span class="essential" style="width: 30%">
                      <input id="destinations_phone_number_1_01" v-model="phoneNumList[0]" class="essential t-c three_input" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" style="width: 100%" type="text" />
                    </span>
                    <i>-</i>
                    <input id="destinations_phone_number_1_02" v-model="phoneNumList[1]" class="t-c three_input" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" style="width: 30%" type="text" />
                    <i>-</i>
                    <input id="destinations_phone_number_1_03" v-model="phoneNumList[2]" class="t-c three_input" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" style="width: 30%" type="text" />
                  </div>
                </label>
              </div>
            </div>
            <div class="search_box_filter">
              <div class="filter_list">
                <label class="filter_type" for="postal_code">
                  <span class="filter_type_title">{{ $t('message.postNum') }}</span>
                  <input id="postal_code" v-model="postNum" class="t-l" maxlength="20" oninput="this.value = this.value.replace(/[^0-9]/g, '');" placeholder="" style="" type="text" />
                </label>
                <label class="filter_type" for="">
                  <span class="filter_type_title">{{ $t('message.trnCarNm') }}</span>
                  <!-- 로그인한 사람에 따라 인풋기능 변경 -->
                  <MultiSelect id="" v-model="trnCarTypeCd" :allow-empty="false" :close-on-select="true" :options="trnCarTypeOptions" :searchable="false" :show-labels="false" class="essential" label="text" placeholder="Pick a value" style="width: 100%"></MultiSelect>
                </label>
                <label class="filter_type" for="">
                  <span class="filter_type_title">{{ $t('message.deliType') }}</span>
                  <!-- 로그인한 사람에 따라 인풋기능 변경 -->
                  <MultiSelect id="" v-model="deliCarTypeCd" :allow-empty="false" :close-on-select="true" :options="deliCarTypeOptions" :searchable="false" :show-labels="false" class="essential" label="text" placeholder="Pick a value" style="width: 100%"></MultiSelect>
                </label>
              </div>
              <div class="filter_list">
                <label class="filter_type w_100" for="address01">
                  <span class="filter_type_title">{{ $t('message.addr') }}</span>
                  <div class="form_input">
                    <MultiSelect id="" v-model="cityCd" :allow-empty="false" :close-on-select="true" :options="cityOptions" :searchable="false" :show-labels="false" class="essential" label="text" style="width: 164px; flex-shrink: 0" @input="changeCityCd"></MultiSelect>
                    <MultiSelect id="" v-model="distrCd" :allow-empty="false" :close-on-select="true" :options="distrOptions" :searchable="false" :show-labels="false" class="essential" label="text" style="width: 200px; flex-shrink: 0"></MultiSelect>

                    <span class="essential" style="width: 100%">
                      <input id="address03" v-model="addr" class="t-l w_100" placeholder="" type="text" />
                    </span>
                  </div>
                </label>
              </div>
              <!--              <div class="filter_list">-->
              <!--                <div class="form_textarea delivery">-->
              <!--                  <textarea id="" v-model="remark" class="t-l" style="width: 100%" type="text" />-->
              <!--                </div>-->
              <!--              </div>-->

              <div class="filter_list">
                <label class="filter_type" for="">
                  <span class="filter_type_title">{{ $t('message.hopeDt') }}</span>
                  <div class="form_calendar w_100 essential" @click="openDateModal">
                    <input v-model="timeInfo.show" placeholder="" type="text" />
                    <button class="icon_calendar"><img src="@/assets/img/icon_calendar.png" /></button>
                  </div>
                </label>
                <label class="filter_type" for="">
                  <span class="filter_type_title">{{ $t('message.trnHopeTiCd') }}</span>
                  <MultiSelect id="plant" v-model="timeCd" :allow-empty="false" :close-on-select="true" :options="timeOptions" :searchable="false" :show-labels="false" class="essential" label="text" placeholder="Pick a value" style="width: 100%"></MultiSelect>
                </label>
              </div>

              <div class="filter_list">
                <label class="filter_type" for="">
                  <span class="filter_type_title">{{ $t('message.costDept') }}</span>
                  <div class="form_inputnbtn essential" @click="$modal.show('CostCenterModal')">
                    <input id="" v-model="costfilter" class="t-l" placeholder="" style="" type="text" />
                    <!-- @keyup.enter="$modal.show('CostCenterModal')" -->
                    <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
                  </div>
                </label>
                <label class="filter_type" for="">
                  <span class="filter_type_title">{{ $t('message.apprDocNum') }}</span>
                  <span class="" style="width: 100%">
                    <!-- essential -->
                    <input id="" v-model="apprDocNum" class="t-l" maxlength="22" placeholder="" style="" type="text" @input="inputApprDocNum" />
                  </span>
                </label>
              </div>
              <!-- <p class="guide_txt mt-10 t-c">!필수항목 입력 또는 선택된 내용이 없습니다.</p> -->
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
              <!--              <small>{{ $t('message.etcList') }}</small>-->
              <small class=""
                >{{ $t('message.totalSelection1') }}<i>{{ count }}</i
                >{{ $t('message.totalSelection2') }}</small
              >
            </div>
            <div class="real_head_right">
              <button class="btn_default btn_function" @click="addRow">{{ $t('message.btnAdd') }}</button>
              <button class="btn_default btn_function" @click="deleteRow">{{ $t('message.btnDelete') }}</button>
            </div>
          </div>
          <div class="real_body">
            <ForwardingEtcGrid ref="ForwardingEtcGrid" :gridLang="gridLang" style="height: 100%" @rowCount="rowCount => (count = rowCount)" />
          </div>
          <div class="modal_btn_contents_t05">
            <button class="btn_default" @click="$modal.hide('ForwardingEtcRegistModal')">{{ $t('message.btnCancel') }}</button>
            <button class="btn_primary" @click="validation('etcReq')">{{ $t('message.btnRegistEtc') }}</button>
          </div>
        </div>
      </div>
    </div>
    <ClientSearchModal ref="PriceClientSearchModal" :name="name" @sendCustInfo="getCustInfo" @sendInfoInput="sendInfoInput" />
    <DatePickerModal :isDefault="false" @selectDate="selectDate" />
    <CostCenterModal :costfilter="costfilter" :page="`etcRegist`" @costCenterInfo="costCenterInfo" />
  </modal>
</template>

<script>
import commonApi from '@/api/common';
import tranApi from '@/api/tran/tran';
import languageApi from '@/api/language';
import ClientSearchModal from '@/modal/sales/ClientSearchModal';
import DatePickerModal from '@/modal/DatePickerModal';
import CostCenterModal from '@/modal/detail/CostCenterModal';
import ForwardingEtcGrid from '@/components/gridView/tran/ForwardingEtcGrid';
import defs from '@/consts/defs';
import orderApi from '@/api/order/order';

export default {
  name: 'ForwardingEtc',
  components: { ClientSearchModal, DatePickerModal, CostCenterModal, ForwardingEtcGrid },
  props: ['commonCodes', 'menuId'],
  data() {
    return {
      name: 'Etc',
      selectValue: '',
      selectOptions: ['Select option', 'options', 'selected'],

      searchOpen: false,
      search_box_height: '',
      custNm: '',
      custInfo: {},
      plntOptions: [],
      plntCd: {},
      timeOptions: [],
      timeCd: {},
      trnCarTypeOptions: [],
      trnCarTypeCd: {},
      deliCarTypeOptions: [],
      deliCarTypeCd: {},
      timeInfo: {},
      phoneNumList: ['', '', ''],
      phoneNum: '',
      gridLang: [],
      distrOptionsList: {},
      cityOptions: [],
      cityCd: {},
      distrOptions: [],
      distrCd: {},
      apprDocNum: '',
      costfilter: '',
      postNum: '',
      addr: '',
      remark: '',
      logitsAlias: '',
      costInfo: {},
      unitOptions: [],
      compOptions: [],
      defUnitCd: defs.unitCd,
      count: 0,
      upSiteOptions: [],
      upSiteCd: {},
      intervalId: '',
      defCarType: defs.carTypeCd,
    };
  },
  watch: {
    commonCodes() {
      this.setCommonCode(this.commonCodes);
    },
  },
  methods: {
    getInfoHeight() {
      if (this.openCount === 0) {
        let val = this.$refs.filter_content_height.scrollHeight;
        // filter_content_height 의 높이값 받아온다
        this.filter_content_height = `calc(${val}px + 1px);`;
        //this.search_box_height = `${val}px`;
      }
    },
    inputApprDocNum(event) {
      this.apprDocNum = event.target.value.replace(/^0+|\D+/g, '').replace(/^(\d{8})(\d{8})(\d{4})$/, `$1-$2-$3`);
    },
    costCenterInfo(data) {
      this.costInfo = data.costInfo;
      this.costfilter = data.costInfo.centerNm;
    },
    async getGridMutiLanguage() {
      try {
        const resp = await languageApi.getRouterLanguage('/modal/forwarding-etc', this.menuId, this.userLocale, 'Y');
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
    clientSearch() {
      this.$refs.PriceClientSearchModal.customerList(true, this.custNm);
      if (!this.custNm || this.custNm === '') {
        this.$modal.show('PriceClientSearchModalEtc');
      }
    },
    getCustInfo(custInfo) {
      if (custInfo === '') {
        this.custNm = this.custInfo.custNm;
      } else {
        this.custInfo = custInfo;
        this.custNm = this.custInfo.custNm;
        this.getUserOfferInfo();
      }
    },
    sendInfoInput(result) {
      if (result.length === 1) {
        this.custInfo = result[0];
        this.custNm = this.custInfo.custNm;
        this.getUserOfferInfo();
      } else {
        this.$modal.show('PriceClientSearchModalEtc', { custNm: this.custNm });
      }
    },
    async getUserOfferInfo() {
      try {
        const param = {
          custId: this.custInfo.custId,
        };
        const resp = await orderApi.getUserOfferInfo(param);

        if (Object.keys(resp.data.rs?.logits).length > 0) {
          const logits = resp.data.rs.logits;
          this.cityCd = this.cityOptions.find(option => option.value === logits.cityCd);
          this.addr = logits.addr;
          this.postNum = logits.postNum;

          if (logits.phoneNum1?.replace(/[^0-9]/g, '').length === 11) {
            this.phoneNum = logits.phoneNum1
              .replace(/[^0-9]/g, '') // 숫자를 제외한 모든 문자 제거
              .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
          } else if (logits.phoneNum1?.replace(/[^0-9]/g, '').length === 12) {
            this.phoneNum = logits.phoneNum1
              .replace(/[^0-9]/g, '') // 숫자를 제외한 모든 문자 제거
              .replace(/^(\d{3,4})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
          }
          this.phoneNumList = this.phoneNum.split('-');
          this.changeCityCd();
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getCommonCodeCombo(groupCd, prntCd) {
      try {
        const param = {
          groupCd,
          useYn: 'Y',
          prntCd,
        };
        const resp = await commonApi.getCommonCodeCombo(param);
        if (groupCd === 'DELI_CAR_TYPE') {
          this.deliCarTypeOptions = resp.data.ds;
          this.init();
        } else if (groupCd === 'UP_SITE_CD') {
          this.upSiteOptions = resp.data.ds;
          this.init();
        } else if (groupCd === 'UNIT_CD') {
          this.unitOptions = resp.data.ds;
        } else if (groupCd === 'COMP_CD') {
          this.compOptions = resp.data.ds;
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
    openDateModal() {
      this.$modal.show('DatePicker', { page: 'etcRegist', timeInfo: this.timeInfo });
    },
    selectDate(timeInfo) {
      this.timeInfo = timeInfo;
    },
    setCommonCode(codes) {
      if (Object.keys(codes).length > 0) {
        this.plntOptions = JSON.parse(JSON.stringify(codes.plntOptions));
        this.timeOptions = JSON.parse(JSON.stringify(codes.timeOptions));
        this.trnCarTypeOptions = JSON.parse(JSON.stringify(codes.carTypeOptions));
        this.trnCarTypeOptions = this.trnCarTypeOptions.filter(option => option.value === this.defCarType.VRGDW);
        this.cityOptions = JSON.parse(JSON.stringify(codes.cityOptions));
        let distrOptions = JSON.parse(JSON.stringify(codes.distrOptions));
        this.cityOptions.forEach(list => {
          let data = {};
          data[list.value] = distrOptions.filter(option => option.prntCd === list.value);
          this.distrOptionsList = { ...this.distrOptionsList, ...data };
        });

        this.init();
      }
    },
    init() {
      this.plntCd = {};
      this.timeCd = {};
      this.trnCarTypeCd = {};
      this.deliCarTypeCd = {};
      this.upSiteCd = {};
      this.cityCd = {};
      this.distrCd = {};
      this.distrOptions = [];
      // if (this.plntOptions.length > 0) this.plntCd = this.plntOptions[0];
      // if (this.timeOptions.length > 0) this.timeCd = this.timeOptions[0];
      // if (this.trnCarTypeOptions.length > 0) this.trnCarTypeCd = this.trnCarTypeOptions[0];
      // if (this.deliCarTypeOptions.length > 0) this.deliCarTypeCd = this.deliCarTypeOptions[0];
      // if (this.upSiteOptions.length > 0) this.upSiteCd = this.upSiteOptions[0];
      // if (this.cityOptions.length > 0) this.cityCd = this.cityOptions[0];
      // if (this.cityCd.value) this.distrOptions = this.distrOptionsList[this.cityCd.value];
      // if (this.distrOptions.length > 0) this.distrCd = this.distrOptions[0];

      this.custNm = '';
      this.phoneNumList = [];
      this.phoneNum = '';
      this.custInfo = {};
      this.timeInfo = {};
      this.apprDocNum = '';
      this.postNum = '';
      this.addr = '';
      this.remark = '';
      this.logitsAlias = '';
      this.costfilter = '';
      this.costInfo = {};
      if (this.plntCd?.value) this.changePlant();
    },
    beforeOpen() {
      this.init();
    },
    async changePlant() {
      try {
        const param = { plntCd: this.plntCd.value };
        const response = await tranApi.getPlantInquiry(param);
        this.intervalId = setInterval(this.setAddr, 100, response.data.rs);
        // this.setAddr(response.data.rs);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    setAddr(data) {
      if (Object.keys(this.commonCodes).length > 0) {
        clearInterval(this.intervalId);
        this.cityCd = this.cityOptions.find(option => option.value === data.cityCd);
        this.distrOptions = this.distrOptionsList[this.cityCd.value];
        this.distrCd = this.distrOptions.find(option => option.value === data.distrCd);
        this.postNum = data.postNum;
        this.addr = data.addr;
      }
    },
    changeCityCd() {
      this.distrOptions = this.distrOptionsList[this.cityCd.value];
      this.distrCd = this.distrOptions[0];
    },
    addRow() {
      this.$refs.ForwardingEtcGrid.gridCommit();
      let data = {
        prdtCd: '',
        etcOutItemNm: '',
        trnReqQty: 0,
        baseUnitNm: this.unitOptions.find(option => option.value === this.defUnitCd.pc)?.value,
        trnReqVol: 0,
        volUnitNm: this.unitOptions.find(option => option.value === this.defUnitCd.m3)?.value,
        trnReqWght: 0,
        wghtUnitNm: this.unitOptions.find(option => option.value === this.defUnitCd.kg)?.value,
        ordAmt: 0,
        compCd: this.compOptions[0].value,
      };

      this.$refs.ForwardingEtcGrid.addRow(data);
    },
    deleteRow() {
      if (this.count > 0) {
        this.$refs.ForwardingEtcGrid.deleteRows();
      } else {
        this.$EventBus.$emit('openYesModal', 'message.msgNoProduct');
      }
    },
    validation(is) {
      this.$refs.ForwardingEtcGrid.gridCommit();
      let rows = this.$refs.ForwardingEtcGrid.sendJsonRows();
      if (is === 'etcReq') {
        if (this.addr === '') {
          this.$EventBus.$emit('openYesModal', 'message.msgValidEssential');
          return false;
        } else if (this.phoneNumList.join('-').length < 1) {
          this.$EventBus.$emit('openYesModal', 'message.msgValidEssential');
          return false;
        } else if (Object.keys(this.costInfo).length === 0) {
          this.$EventBus.$emit('openYesModal', 'message.msgValidEssential');
          return false;
        } else if (Object.keys(this.timeInfo).length === 0) {
          this.$EventBus.$emit('openYesModal', 'message.msgValidEssential');
          return false;
        } else if (!this.timeCd.value || this.timeCd.value == undefined || this.timeCd.value == null) {
          this.$EventBus.$emit('openYesModal', 'message.msgValidEssential');
          return false;
        } else if (rows.length === 0) {
          this.$EventBus.$emit('openYesModal', 'message.msgValidEtcList');
          return false;
        } else if (Object.keys(this.trnCarTypeCd).length === 0) {
          this.$EventBus.$emit('openYesModal', 'message.msgValidEssential');
          return false;
        } else if (Object.keys(this.deliCarTypeCd).length === 0) {
          this.$EventBus.$emit('openYesModal', 'message.msgValidEssential');
          return false;
        }
        // else if (this.apprDocNum === '' || this.apprDocNum.length < 22) {
        //   this.$EventBus.$emit('openYesModal', 'message.msgValidEssential');
        //   return false;
        // }
        let notExistEtcOutItemNm = false;
        let noQty = false;
        rows.forEach(row => {
          if (row.etcOutItemNm === '') {
            notExistEtcOutItemNm = true;
          } else if (row.trnReqQty < 1 || !row.trnReqQty) {
            noQty = true;
          }
        });
        if (notExistEtcOutItemNm) {
          this.$EventBus.$emit('openYesModal', 'message.msgValidEtcItemNm');
          return false;
        } else if (noQty) {
          this.$EventBus.$emit('openYesModal', 'message.msgValidEtcQty');
          return false;
        }

        this.saveEtcForwardingReq(rows);
      }
    },
    async saveEtcForwardingReq(rows) {
      try {
        const param = [];
        rows.forEach(row => {
          let paramDefault = {
            logitsAlias: this.logitsAlias,
            trnCarType: this.trnCarTypeCd.value,
            cityCd: this.cityCd.value,
            distrCd: this.distrCd.value,
            carType: this.deliCarTypeCd.value,
            postNum: this.postNum,
            addr: this.addr,
            logitsPhoneNum1: this.phoneNumList.join('-'),
            upPlntCd: this.plntCd.value,
            upSiteCd: this.upSiteCd.value,
            trnHopeDt: this.timeInfo.time,
            trnHopeTi: this.timeCd.value,
            trnReqRemark: row.trnReqRemark,
            etcOutItemNm: row.etcOutItemNm,
            costCntrCd: this.costInfo.centerCd,
            costCntrNm: this.costInfo.centerNm,
            trnReqQty: row.trnReqQty,
            apprDocNum: this.apprDocNum,
          };
          param.push(paramDefault);
        });
        await tranApi.saveEtcForwardingReq(param);
        this.$parent.reloadSearch('saveEtc');
        this.$modal.hide('ForwardingEtcRegistModal');
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else if (e && e.errMsg) {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
  },
  mounted() {
    this.getInfoHeight();
    this.getCommonCodeCombo('DELI_CAR_TYPE');
    this.getCommonCodeCombo('UNIT_CD');
    this.getCommonCodeCombo('COMP_CD');
    this.getCommonCodeCombo('UP_SITE_CD');
    if (this.commonCodes) this.setCommonCode(this.commonCodes);
    this.getGridMutiLanguage();
  },
  destroyed() {},
};
</script>

<style></style>
