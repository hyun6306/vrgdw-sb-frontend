<template>
  <modal name="DeliveryAllRegistModal" width="1372" height="800" :adaptive="true" @before-open="beforeOpen" @before-close="close" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('DeliveryAllRegistModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.deliveryApplication') }}</p>
      <div class="modal_content dr_content">
        <div class="search_content">
          <div class="search_box" ref="search_box_height" :class="{ search_close_00: searchOpen }" :style="`height:${search_box_height}`">
            <div class="search_box_title always_exposure">
              <span>{{ $t('message.addrInfo') }}</span>
            </div>
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.plant') }}</span>
                  <!-- 로그인한 사람에 따라 인풋기능 변경 -->
                  <MultiSelect id="plant" class="essential" style="width: 100%" v-model="plntCd" :options="plntOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" @input="changePlant()"></MultiSelect>
                </label>
                <label for="destinations_phone_number_1_01" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.callNum1') }}</span>
                  <div class="form_input">
                    <span class="essential" style="width: 30%">
                      <input type="text" id="destinations_phone_number_1_01" style="width: 100%" v-model="logitsPhoneNum1[0]" class="essential t-c three_input" maxlength="4" placeholder="" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                    </span>
                    <i>-</i>
                    <input type="text" id="destinations_phone_number_1_02" style="width: 30%" v-model="logitsPhoneNum1[1]" maxlength="4" placeholder="" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                    <i>-</i>
                    <input type="text" id="destinations_phone_number_1_03" style="width: 30%" v-model="logitsPhoneNum1[2]" class="t-c three_input" maxlength="4" placeholder="" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                  </div>
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.deliveryType') }}</span>
                  <MultiSelect id="" class="essential" style="width: 100%" v-model="trnCarType" :options="carTypeOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
                </label>
              </div>
            </div>
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="destination_name" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.addrNm') }}</span>
                  <input type="text" id="destination_name" style="" class="essential t-l" v-model="logitsAlias" placeholder="" />
                </label>
                <label for="postal_code" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.postNum') }}</span>
                  <input type="text" id="postal_code" style="" class="t-c" v-model="postNum" maxlength="20" placeholder="" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                </label>
              </div>
              <div class="filter_list">
                <label for="address01" class="filter_type w_100">
                  <span class="filter_type_title">{{ $t('message.addr') }}</span>
                  <div class="form_input">
                    <MultiSelect id="address01" class="essential" style="width: 305px; flex-shrink: 0" v-model="cityCd" :options="cityOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" @input="changeCityCd()"></MultiSelect>
                    <i></i>
                    <MultiSelect id="address02" class="essential" style="width: 419px; flex-shrink: 0" v-model="distrCd" :options="distrOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
                    <i></i>
                    <span class="essential w_100">
                      <input type="text" id="address03" style="width: 100%" class="t-l" v-model="addr" placeholder="" />
                    </span>
                  </div>
                </label>
              </div>
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.trnHopeDt') }}</span>
                  <div class="form_calendar w_100 essential" @click="datePicker('DatePicker')">
                    <input type="text" v-model="selectDateShow" :placeholder="$t('message.selectPeriod')" />
                    <button class="icon_calendar"><img src="@/assets/img/icon_calendar.png" /></button>
                  </div>
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.trnHopeTi') }}</span>
                  <MultiSelect id="plant" class="essential" style="width: 100%" v-model="trnHopeTi" :options="timeOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
                </label>
              </div>
              <div class="filter_list">
                <div class="form_textarea delivery">
                  <textarea type="text" id="" style="width: 100%" class="t-l" v-model="trnReqRemark" :placeholder="$t('message.msgRequestingComment')" />
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
            <DeliveryAllRegistGrid style="height: 100%" :gridName="'DeliveryAllRegistGrid'" ref="DeliveryAllRegistGrid" :forwardingRows="forwardingRows" :gridLang="gridLang" :menuId="menuId" />
          </div>
          <div class="modal_btn_contents_t05">
            <button class="btn_default" @click="[$modal.hide('DeliveryAllRegistModal')]">{{ $t('message.btnCancel') }}</button>
            <button class="btn_primary" @click="forwardRequest()">{{ $t('message.btnBulkApplication') }}</button>
          </div>
        </div>
      </div>
    </div>
    <DatePickerModal @selectDate="showSelectDate" :page="page" :currentDate="currentDate" :name="name" />
  </modal>
</template>

<script>
import find from '@/mixins/style.js'; // js 추가
import { mapGetters } from 'vuex';
import DeliveryAllRegistGrid from '@/components/gridView/tran/DeliveryAllRegistGrid';
import tranApi from '@/api/tran/tran';
import commonApi from '@/api/common';
import languageApi from '@/api/language';
import DatePickerModal from '@/modal/tran/DatePickerModal';
import days from 'dayjs';

export default {
  components: { DeliveryAllRegistGrid, DatePickerModal },
  props: {
    forwardingRows: {
      type: Array,
    },
    page: {
      type: String,
    },
    menuId: {
      type: Number,
    },
  },
  data() {
    return {
      name: 'Regist',
      searchOpen: false,
      search_box_height: '',
      plntCd: {},
      plntOptions: [],
      carTypeOptions: [],
      cityOptions: [],
      distrOptions: [],
      timeOptions: [],
      trnCarType: {},
      cityCd: {},
      distrCd: {},
      logitsPhoneNum1: [],
      logitsAlias: '',
      postNum: '',
      addr: '',
      trnHopeTi: {},
      trnReqRemark: '',
      gridLang: [],
      addrList: [],
      selectDate: days().format('YYYY-MM-DD'),
      currentDate: '',
      selectDateShow: days().format('DD-MM-YYYY'),
      ment: '',
      result: '',
      isReSearch: false,
      isSelected: false,
      setAddrList: [],
    };
  },
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  methods: {
    validation() {
      const result = { validation: true };
      this.logitsPhoneNum1Fm = this.logitsPhoneNum1 ? this.logitsPhoneNum1.join('') : this.logitsPhoneNum1;

      if (!this.plntCd.value) {
        result.validation = false;
        this.$EventBus.$emit('openYesModal', 'message.msgNoPlntCd');
      } else if (!this.logitsPhoneNum1Fm || this.logitsPhoneNum1Fm === '' || this.logitsPhoneNum1Fm.length < 8) {
        result.validation = false;
        this.$EventBus.$emit('openYesModal', 'message.msgNoLogitsPhoneNum1');
      } else if (!this.trnCarType.value) {
        result.validation = false;
        this.$EventBus.$emit('openYesModal', 'message.msgNoDeliveryType');
      } else if (!this.cityCd || this.cityCd === '' || !this.distrCd || this.distrCd === '' || !this.addr || this.addr === '') {
        result.validation = false;
        this.$EventBus.$emit('openYesModal', 'message.msgNoAddr');
      }
      // else if (!this.selectDateShow || this.selectDateShow === '') {
      //   result.validation = false;
      //   this.$EventBus.$emit('openYesModal', 'message.msgNoTrnHopeDt');
      // } else if (!this.trnHopeTi.value) {
      //   result.validation = false;
      //   this.$EventBus.$emit('openYesModal', 'message.msgNoTrnHopeTi');
      // }
      return result;
    },
    async getGridMutiLanguage() {
      try {
        const resp = await languageApi.getRouterLanguage('/modal/deliveryApplication', this.menuId, this.userLocale, 'Y');
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
    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: 'Y',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);
        if (groupCd === 'VNM_CITY') {
          if (prntCd !== '') {
            this.distrOptions = response.data.ds;
            if (this.distrCd) {
              this.distrOptions.forEach((option, index) => {
                if (option.value === this.addrList.distrCd) {
                  this.distrCd = this.distrOptions[index];
                }
              });
            }
            // this.distrCd = this.distrCd = this.distrCd ? this.distrCd : this.distrOptions.find(option => (option.value = this.addrList.distrCd));
          } else {
            this.cityOptions = response.data.ds;
          }
        } else if (groupCd === 'CAR_TYPE') {
          this.carTypeOptions = response.data.ds;
        } else if (groupCd === 'TIME_CD') {
          this.timeOptions = response.data.ds;
          this.trnHopeTi = this.timeOptions[0];
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
    async getPlantCombo() {
      try {
        const param = {};
        const response = await commonApi.getPlantCombo(param);
        this.plntOptions = response.data.ds;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    setAddr() {
      if (this.addrList.length !== 0) {
        this.cityCd = {};
        this.distrCd = {};
        this.postNum = this.addrList.postNum;
        if (this.addrList.cityCd) {
          this.cityOptions.forEach((option, index) => {
            if (option.value === this.addrList.cityCd) {
              this.cityCd = this.cityOptions[index];
            }
          });
        }
        if (this.addrList.distrCd) {
          this.distrOptions.forEach((option, index) => {
            if (option.value === this.addrList.distrCd) {
              this.distrCd = this.distrOptions[index];
            }
          });
        }
        // this.cityCd = this.cityCd ? this.cityOptions.find(option => (option.value = this.addrList.cityCd)) : {};
        // this.distrCd = this.distrCd ? this.distrOptions.find(option => (option.value = this.addrList.distrCd)) : {};
        this.addr = this.addrList.addr;
        if (this.addrList.cityCd) {
          this.getCommonCodeCombo('VNM_CITY', this.cityCd.value);
        }
      }
    },
    async forwardRequest() {
      this.result = this.validation();
      if (this.result.validation) {
        try {
          const paramData = [];
          this.forwardingRows.forEach(list => {
            paramData.push({
              compCd: list.compCd,
              sapPoNum: list.sapPoNum,
              itemNum: list.itemNum.toString().padStart(6, '0'),
              trnCarType: this.trnCarType.value,
              cityCd: this.cityCd.value,
              distrCd: this.distrCd.value,
              postNum: this.postNum,
              addr: this.addr,
              logitsPhoneNum1: this.logitsPhoneNum1.join('-'),
              logitsPhoneNum2: list.logitsPhoneNum2,
              trnHopeDt: this.selectDate,
              trnHopeTi: this.trnHopeTi.value,
              logitsAlias: this.logitsAlias,
              trnReqRemark: this.trnReqRemark,
              plntCd: this.plntCd,
            });
          });
          const param = JSON.parse(JSON.stringify(paramData));
          this.$emit('setAllRegist', param);
          this.$modal.hide('DeliveryAllRegistModal');
          // const response = await tranApi.saveExptConfirm(param);
          // this.ment = '';
          // if (response.data.status === 500) {
          //   this.ment = response.data.message;
          //   this.$EventBus.$emit('openYesModal', this.ment);
          // } else if (response.data.rs) {
          //   this.$modal.hide('DeliveryAllRegistModal');
          //   await this.reSearch();
          //   this.$EventBus.$emit('openYesModal', 'message.msgApplyDelivery');
          // }
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
    reSearch() {
      this.isReSearch = true;
      this.$emit('isReSearch', this.isReSearch);
    },
    async changePlant() {
      try {
        const param = { plntCd: this.plntCd.value };
        const response = await tranApi.getPlantInquiry(param);
        this.addrList = response.data.rs;
        this.setAddr();
        this.isSelected = true;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    changeCityCd() {
      this.getCommonCodeCombo('VNM_CITY', this.cityCd.value);
      this.distrCd = {};
    },
    datePicker() {
      this.currentDate = this.selectDate;
      this.$modal.show(`DatePicker${this.name}`, { page: 'poForwardingRequestModal' });
    },
    showSelectDate(selectDate) {
      this.selectDate = selectDate;
      this.selectDateShow = this.$vnDateFormatD(this.selectDate);
    },
    close() {
      this.openFirst = 0;
      this.plntCd = {};
      this.trnCarType = {};
      this.cityCd = {};
      this.distrCd = {};
      this.trnHopeTi = this.timeOptions[0];
      this.trnCarNum = '';
      this.logitsAlias = '';
      this.postNum = '';
      this.addr = '';
      this.selectDate = days().format('YYYY-MM-DD');
      this.selectDateShow = days().format('DD-MM-YYYY');
      this.currentDate = '';
      this.logitsPhoneNum1 = [];
      this.trnReqRemark = '';
    },
    searchProduct() {
      find.searchProduct();
    },
    writeInput() {
      find.writeInput();
    },
    beforeOpen() {
      this.getPlantCombo();
      this.getCommonCodeCombo('CAR_TYPE');
      this.getCommonCodeCombo('VNM_CITY');
      this.getCommonCodeCombo('TIME_CD');
      this.getGridMutiLanguage();
    },
  },
  mounted() {},
  created() {},
};
</script>

<style></style>
