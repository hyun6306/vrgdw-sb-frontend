<template>
  <div class="driver_contents">
    <div class="nodata" v-if="this.signatureCount <= 0">
      <span class="in_img"><img src="@m/assets/img/img_nodata.png" /></span>
      <p>{{ $t('message.gridMessageNoSearch') }}</p>
    </div>
    <div v-if="this.signatureCount >= 1">
      <div v-for="(box, index) in signatureList.length" :key="box + 'head'" class="driver_box">
        <!-- 11 -->
        <div class="driver_box_head">
          <!-- 송장번호를 바인딩함. -->
          <span class="car_number_txt">
            <i>{{ signatureList[index].trnInvoiceNum }}</i>
          </span>
          <!-- 서명 -->
          <button class="btn_call_driver" @click="openModal({ type: 'SignModal', ment: '', trnInvoiceNum: signatureList[index].trnInvoiceNum })">
            <img src="@m/assets/img/icon_tab_sign_w.png" />
            {{ $t('message.sign') }}
          </button>
        </div>
        <div class="driver_box_body">
          <ul class="driver_bb_list">
            <li>
              <!-- 배송지명 -->
              <span class="driver_bb_title">{{ $t('message.addrNm') }}</span>
              <p class="driver_bb_info">
                {{ signatureList[index].logitsAlias }}
                <!-- 국가번호 사용 시, 해당 주석 라인 사용, 미 사용 시, 아래 라인 유지
                (signatureList[index].mobileNumCt != undefined ? signatureList[index].mobileNumCt : signatureList[index].phoneNumCt != undefined ? signatureList[index].phoneNumCt : '') + (signatureList[index].mobileNum ? signatureList[index].mobileNum : signatureList[index].phoneNum)  -->
                <a :href="`tel:${signatureList[index].phoneNum ? signatureList[index].phoneNum : signatureList[index].mobileNum}`" class="btn_call"><img src="@m/assets/img/icon_call_w.png" /></a>
                <!-- <button class="btn_call"><img src="@m/assets/img/icon_call_w.png" /></button> -->
                <!-- <a class="btn_quick btn_call in_img" :href="`tel:${signatureList[index].mobileNum}`"><img src="@m/assets/img/icon_tab_sign_w.png" /></a> -->
              </p>
            </li>
            <!-- 주소 -->
            <li>
              <span class="driver_bb_title">{{ $t('message.addr') }}</span>
              <p class="driver_bb_info">{{ signatureList[index].addr }}</p>
            </li>
            <!-- 배송특이사항 -->
            <li>
              <span class="driver_bb_title">{{ $t('message.trnReqRemark') }}</span>
              <p class="driver_bb_info">{{ signatureList[index].trnReqRemark }}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 22 -->
      <div v-for="(box2, index) in signatureList.length" :key="box2 + 'foot'">
        <div class="driver_box" v-if="signatureList[index].trnStatCd == 'TRN02'">
          <!-- 출차 처리 -->
          <div class="exit_car">
            <strong>{{ $t('message.msgRequireOutProcess') }}</strong>
            <i> ({{ signatureList[index].trnPlnNum }}) </i>
            <!-- 출차처리하러가기 -->
            <button @click="moveExitProcess">{{ $t('message.btnOutProcess') }}</button>
          </div>
          <!-- //출차 처리 -->
          <div class="driver_box_head">
            <span class="car_number_txt">
              <i>{{ signatureList[index].trnPlnNum }}</i>
            </span>
            <button class="btn_call_driver">
              <img src="@m/assets/img/icon_tab_sign_w.png" />
              {{ $t('message.sign') }}
            </button>
          </div>
          <div class="driver_box_body">
            <ul class="driver_bb_list">
              <!-- 배송지명 -->
              <li>
                <span class="driver_bb_title">{{ $t('message.addrNm') }}</span>
                <p class="driver_bb_info">
                  {{ signatureList[index].logitsAlias }}
                  <button class="btn_call"><img src="@m/assets/img/icon_call_w.png" /></button>
                </p>
              </li>
              <!-- 주소 -->
              <li>
                <span class="driver_bb_title">{{ $t('message.addr') }}</span>
                <p class="driver_bb_info">{{ signatureList[index].addr }}</p>
              </li>
              <!-- 배송특이사항 -->
              <li>
                <span class="driver_bb_title">{{ $t('message.trnReqRemark') }}</span>
                <p class="driver_bb_info">{{ signatureList[index].trnReqRemark }}</p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 묶 -->
      </div>
    </div>
    <SignModal @successTakeOver="successTakeOver" :ment="ment" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import orderApi from '@/api/order/order.js';
import SignModal from '@m/modal/driver/SignModal.vue';

export default {
  props: ['userCd'],
  components: {
    SignModal,
  },
  data() {
    return {
      ment: '',
      signatureCount: 0,
      signatureList: [],
      current: [],
      ksSelectOpen: false,
      bookmark: false,
      selectValue: '',
      selectOptions: ['KOREA', 'ENGLISH', 'VIETNAM'],
      sendDataUrl: '',
    };
  },
  computed: {
    ...mapGetters({
      notLogin: 'userInfo/getNotLogin',
      menuList: 'userInfo/getMenuList',
    }),
  },
  watch: {
    signatureCount(count) {
      this.$emit('setSignatureCount', count);
    },
  },
  methods: {
    async successTakeOver() {
      this.$modal.hide('SignModal');
      // this.$emit('reloadCount');
      await this.getList();
      await this.$EventBus.$emit('openYesModal', 'message.msgTakeOverSuccess');
    },
    async openModal(event) {
      this.ment = event.ment;
      this.$modal.show(event.type, { trnInvoiceNum: event.trnInvoiceNum });
    },
    // 출차처리하러 가기
    async moveExitProcess() {
      const tabNumber = 0;
      this.$emit('changeTab', tabNumber);
    },
    async getList() {
      const param = {
        searchCls: 'sign', // out, sign, all
        trnCarNum: this.userCd,
        pageSize: '',
        pageNumber: '',
      };
      try {
        const response = await orderApi.getDriverDeliveryStatusList(param);
        this.signatureList = response.data.ds;
        this.signatureCount = this.signatureList.length;
        this.$emit('reloadCount');
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    pageMove(page) {
      this.$router.push(`${page}`);
    },
  },
  async mounted() {
    await this.getList();
  },
};
</script>

<style></style>
