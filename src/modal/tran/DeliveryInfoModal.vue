<template>
  <modal :name="`DeliveryInfoModal${page}`" width="1372" height="800" :adaptive="true" :clickToClose="false" @before-open="beforeOpen" @before-close="close">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide(`DeliveryInfoModal${page}`)"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.deliveryInfo') }}</p>
      <div class="modal_content dr_content">
        <div class="search_content">
          <p class="search_title">{{ $t('message.addrInfo') }}</p>
          <button class="btn_select_destination" v-show="deliveryReqList.length < 0"></button>
          <div class="search_box" ref="search_box_height" :class="{ search_close_00: searchOpen }">
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.deliveryType') }}</span>
                  <!-- 로그인한 사람에 따라 인풋기능 변경 -->
                  <input type="text" id="payment_terms" style="width: 100%" v-model="trnCarType" disabled placeholder="" />
                  <!-- <MultiSelect id="배송유형" class="essential" style="width: 100%" v-model="trnCarType" :options="carTypeOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect> -->
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.tranCarNum') }}</span>
                  <input type="text" id="payment_terms" style="" disabled placeholder="" v-model="carNum" />
                </label>
                <label for="destinations_phone_number_1_01" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.driverNum') }}</span>
                  <div class="form_input">
                    <input type="text" id="destinations_phone_number_1_01" style="width: 30%" class="t-c three_input" v-model="driverPhoneNum[0]" maxlength="4" placeholder="" disabled />
                    <i>-</i>
                    <input type="text" id="destinations_phone_number_1_02" style="width: 30%" v-model="driverPhoneNum[1]" maxlength="4" class="t-c three_input" placeholder="" disabled />
                    <i>-</i>
                    <input type="text" id="destinations_phone_number_1_03" style="width: 30%" v-model="driverPhoneNum[2]" maxlength="4" class="t-c three_input" placeholder="" disabled />
                  </div>
                </label>
              </div>
            </div>
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="destination_name" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.addrNm') }}</span>
                  <input type="text" id="destination_name" style="width: 100%" v-model="logitsAlias" disabled maxlength="100" placeholder="" />
                </label>
                <label for="postal_code" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.postNum') }}</span>
                  <input type="text" id="postal_code" style="" v-model="postNum" class="t-c" maxlength="20" placeholder="" disabled />
                </label>
              </div>
              <div class="filter_list">
                <label for="address01" class="filter_type w_100">
                  <span class="filter_type_title">{{ $t('message.addr') }}</span>
                  <div class="form_input" style="width: 100%">
                    <input type="text" id="postal_code" style="width: auto" v-model="cityNm" class="t-c" maxlength="20" placeholder="" disabled />
                    <!-- <MultiSelect id="address01" style="width: 305px; flex-shrink: 0" v-model="cityCd" :options="cityOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" @input="changeCityCd()"></MultiSelect> -->
                    <i></i>
                    <input type="text" id="postal_code" style="width: auto" v-model="distrNm" class="t-c" maxlength="20" placeholder="" disabled />
                    <!-- <MultiSelect id="address02" style="width: 419px; flex-shrink: 0" v-model="distrCd" :options="distrOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" @input="changeDistrCd()"></MultiSelect> -->
                    <i></i>
                    <input type="text" id="address03" style="width: 100%" class="t-l" v-model="addr" placeholder="" disabled />
                  </div>
                </label>
              </div>
              <div class="filter_list">
                <label for="destinations_phone_number_1" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.picNm') }}</span>
                  <input type="text" id="담당자명" style="width: " class="t-l" v-model="logitsMngNm" placeholder="" disabled />
                </label>

                <label for="destinations_phone_number_1_01" class="filter_type">
                  <span class="filter_type_title" style="">{{ $t('message.addrNum1') }}</span>
                  <div class="form_input">
                    <input type="text" id="destinations_phone_number_1_01" style="width: 30%" class="t-c three_input" v-model="logitsPhoneNum1[0]" maxlength="4" placeholder="" disabled />
                    <i>-</i>
                    <input type="text" id="destinations_phone_number_1_02" style="width: 30%" v-model="logitsPhoneNum1[1]" class="t-c three_input" maxlength="4" placeholder="" disabled />
                    <i>-</i>
                    <input type="text" id="destinations_phone_number_1_03" style="width: 30%" v-model="logitsPhoneNum1[2]" class="t-c three_input" maxlength="4" placeholder="" disabled />
                  </div>
                </label>
                <label for="destinations_phone_number_1_01" class="filter_type">
                  <span class="filter_type_title" style="">{{ $t('message.addrNum2') }}</span>
                  <div class="form_input" style="">
                    <input type="text" id="destinations_phone_number_1_01" style="width: 30%" v-model="logitsPhoneNum2[0]" class="t-c three_input" maxlength="4" placeholder="" disabled />
                    <i>-</i>
                    <input type="text" id="destinations_phone_number_1_02" style="width: 30%" v-model="logitsPhoneNum2[1]" class="t-c three_input" maxlength="4" placeholder="" disabled />
                    <i>-</i>
                    <input type="text" id="destinations_phone_number_1_03" style="width: 30%" v-model="logitsPhoneNum2[2]" class="t-c three_input" maxlength="4" placeholder="" disabled />
                  </div>
                </label>
              </div>
              <div class="filter_list">
                <div class="form_textarea delivery">
                  <textarea type="text" id="" style="width: 100%" v-model="trnReqRemark" disabled class="t-l" />
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
              <small>
                {{ $t('message.totalSelection1') }} <i>{{ rowCount }}</i> {{ $t('message.totalSelection2') }}
              </small>
            </div>
          </div>
          <div class="real_top_filter">
            <div class="real_top_left">
              <span class="real_top_filter_title">{{ $t('message.hopeMonth') }} : {{ trnHopeDt | vnDateFormatD }}</span>
              <span class="real_top_filter_title">{{ $t('message.trnHopeTiCd') }} : {{ trnHopeTiNm }}</span>
            </div>
            <div class="real_top_right">
              <!-- <div class="form_input">
                <span>{{ $t('message.creditBalance') }}</span>
                <input type="text" style="width: 150px" class="disabled t-r" disabled v-model="credit" />
              </div> -->
            </div>
          </div>
          <div class="real_body real_body02">
            <DeliveryInfoGrid style="height: 100%" ref="DeliveryGrid" :gridLang="gridLang" />
          </div>
          <div class="real_total">
            <p>
              <span>{{ $t('message.totalQty') }} :</span>
              <i>{{ totalAmount | numberFormat(0) }}</i>
            </p>
            <!-- <p>
              <span>VAT :</span>
              <i>{{ totalVatPrice }}</i>
            </p> -->
            <p>
              <span>{{ $t('message.totalAmount') }} :</span>
              <i>{{ totalPrice | numberFormat(0) }}</i>
            </p>
          </div>
          <!-- <div class="real_total">
            <p>
              <span>VAT :</span>
              <i>{{ totalVatPrice }}</i>
            </p>
          </div>
          <div class="real_total">
            <p>
              <span>Total :</span>
              <i>{{  totalPrice }}</i>
            </p> -->
          <!-- </div> -->
          <div class="modal_btn_contents_t05">
            <button @click="$modal.hide(`DeliveryInfoModal${page}`)" class="btn_primary">{{ $t('message.btnClose') }}</button>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapGetters } from 'vuex';
import tranApi from '@/api/tran/tran';
import DeliveryInfoGrid from '@/components/gridView/tran/DeliveryInfoGrid';
import languageApi from '@/api/language';

export default {
  components: { DeliveryInfoGrid },
  props: {
    deliveryRows: {
      type: Array,
    },
    menuId: {
      type: Number,
    },
    page: {
      type: String,
    },
    custId: {
      type: Number,
    },
    authButton: {
      type: Object,
    },
  },
  data() {
    return {
      searchOpen: false,
      deliveryReqList: [],
      gridLang: [],
      //
      trnCarType: '', //배송방법
      carNum: '', //차량번호
      driverPhoneNum: [], //기사전화번호
      logitsAlias: '', //배송지명
      postNum: '', //우편번호
      cityNm: '', //대권역
      distrNm: '', //중권역
      addr: '', //주소
      logitsMngNm: '', //인수자명
      logitsPhoneNum1: [], //인수자번호1
      logitsPhoneNum2: [], //인수자번호2
      trnReqRemark: '',
      //
      rowCount: 0, //건수
      trnHopeDt: '',
      trnHopeTiNm: '',
      //
      totalAmount: 0,
      totalPrice: 0,
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userLocale: 'userInfo/getUserLocale',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
    }),
  },
  watch: {
    gridLang() {},
  },
  filters: {
    numberFormat: (value, numFix) => {
      value = parseFloat(value);
      if (!value) return '0';
      return value.toFixed(numFix).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  methods: {
    async getGridMutiLanguage() {
      try {
        const resp = await languageApi.getRouterLanguage('/modal/deliveryInfo', this.menuId, this.userLocale, 'Y');
        this.gridLang = resp.data.rs.language;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    addrInfoSetting(info) {
      //배송지 정보 세팅
      this.trnCarType = info.trnCarTypeNm;
      this.carNum = info.trnCarNum;
      if (info.driverPhoneNum) this.driverPhoneNum = info.driverPhoneNum.split('-');
      this.logitsAlias = info.logitsAlias;
      this.postNum = info.postNum;
      this.cityNm = info.cityNm;
      this.distrNm = info.distrNm;
      this.addr = info.addr;
      this.logitsMngNm = info.logitsMngNm;
      if (info.logitsPhoneNum1) this.logitsPhoneNum1 = info.logitsPhoneNum1.split('-');
      if (info.logitsPhoneNum2) this.logitsPhoneNum2 = info.logitsPhoneNum2.split('-');
      this.trnReqRemark = info.trnReqRemark;
    },
    async getDeliveryList(trnNum) {
      //배송요청 목록 조회
      const response = await tranApi.getDeliveryReqList({ trnNum: trnNum });
      this.deliveryReqList = response.data.ds;
      //그리드 값 세팅
      this.$refs.DeliveryGrid.setRows(this.deliveryReqList);
      //총건수
      this.rowCount = this.deliveryReqList.length;
      //합계 수량, 합계 가격
      this.deliveryReqList.forEach(row => {
        this.totalPrice += row.bokngPrdtTotAmt;
        this.totalAmount += row.trnReqBaseQty;
      });
      //배송지 정보 세팅
      this.addrInfoSetting(this.deliveryReqList[0]);
      //배송희망일,시간
      this.trnHopeDt = this.deliveryReqList[0].trnHopeDt;
      this.trnHopeTiNm = this.deliveryReqList[0].trnHopeTiNm;
    },
    beforeOpen(event) {
      this.getDeliveryList(event.params.trnNum);
      this.getGridMutiLanguage();
    },
    close() {
      this.totalAmount = 0;
      this.totalPrice = 0;
      this.rowCount = 0;
      this.trnHopeDt = '';
      this.trnHopeTiNm = '';
      this.deliveryReqList = [];
      //배송지정보
      this.trnCarType = '';
      this.carNum = '';
      this.driverPhoneNum = [];
      this.logitsAlias = '';
      this.postNum = '';
      this.cityNm = '';
      this.addr = '';
      this.logitsMngNm = '';
      this.logitsPhoneNum1 = [];
      this.logitsPhoneNum2 = [];
      this.trnReqRemark = '';
    },
  },
  mounted() {},
};
</script>

<style></style>
