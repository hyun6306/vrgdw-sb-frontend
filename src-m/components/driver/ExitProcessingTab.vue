<template>
  <div class="driver_contents">
    <div class="nodata" v-if="this.exitCount <= 0">
      <span class="in_img"><img src="@m/assets/img/img_nodata.png" /></span>
      <p>{{ $t('message.gridMessageNoSearch') }}</p>
    </div>
    <div v-if="this.exitCount >= 1">
      <div v-for="(box, index) in exitProcessList.length" :key="box" class="driver_box">
        <div class="driver_box_head_exit">
          <!-- 배차계획번호 -->
          <p class="car_number_txt">
            <small><img src="@m/assets/img/bulit_01.png" />{{ $t('message.trnPlnNum') }}</small>
            <i>{{ exitProcessList[index].trnPlnNum }}</i>
          </p>
          <!-- 상차지 -->
          <p class="car_number_txt">
            <span>{{ $t('message.upSiteNm') }}</span>
            <strong>{{ exitProcessList[index].plntNm }}</strong>
          </p>
        </div>
        <div class="driver_box_body">
          <ul class="driver_bb_list">
            <!-- 송장번호 -->
            <li>
              <span class="driver_bb_title">{{ $t('message.invoice') }}</span>
              <p class="driver_bb_info">
                <a class="btn_invoice_number" @click="printReport(exitProcessList[index].trnPlnNum)">{{ exitProcessList[index].trnInvoiceNum }}</a>
                <!-- href="" -->
              </p>
            </li>
            <!-- 고객사명 -->
            <li>
              <span class="driver_bb_title">{{ $t('message.clientNm') }}</span>
              <p class="driver_bb_info">
                <span>{{ exitProcessList[index].custNm }}</span>
                <!-- 국가번호 사용할 경우, (exitProcessList[index].mobileNumCt != undefined ? exitProcessList[index].mobileNumCt : exitProcessList[index].phoneNumCt != undefined ? exitProcessList[index].phoneNumCt : '') + (exitProcessList[index].mobileNum ? exitProcessList[index].mobileNum : exitProcessList[index].phoneNum) -->
                <a :href="`tel:${exitProcessList[index].phoneNum ? exitProcessList[index].phoneNum : exitProcessList[index].mobileNum}`" class="btn_call"><img src="@m/assets/img/icon_call_w.png" /></a>
              </p>
            </li>
            <!-- 배송지명 -->
            <li>
              <span class="driver_bb_title">{{ $t('message.addrNm') }}</span>
              <p class="driver_bb_info">
                <span>{{ exitProcessList[index].addr }}</span>
              </p>
            </li>
            <!-- 특이사항 -->
            <li>
              <span class="driver_bb_title">{{ $t('message.cusRequest') }}</span>
              <p class="driver_bb_info">
                <span>{{ exitProcessList[index].trnReqRemark }}</span>
              </p>
            </li>
          </ul>
          <div class="dirver_bb_btns">
            <!-- 출차처리 -->
            <button class="btn_exit" style="width: 100%" v-bind:value="exitProcessList[index].trnPlnNum" @click="askDeparture">
              {{ $t('message.outProcess') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <AlarmModal :name="name" @okOrNo="saveDeparture" />
    <ExitItemDetail />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import orderApi from '@/api/order/order.js';
import tranApi from '@/api/tran/tran.js';
import ExitItemDetail from '@m/modal/driver/ExitItemDetail.vue';
import AlarmModal from '@m/modal/AlarmModal.vue';
import reportPrintJs from '@/mixins/reportPrint';

export default {
  props: ['userCd'],
  data() {
    return {
      name: 'exit',
      exitPlnNum: '',
      exitCount: 0,
      exitProcessList: [],
      current: [],
      ksSelectOpen: false,
      bookmark: false,
      selectValue: '',
      selectOptions: ['KOREA', 'ENGLISH', 'VIETNAM'],
    };
  },
  mixins: [reportPrintJs],
  components: {
    ExitItemDetail,
    AlarmModal,
  },
  computed: {
    ...mapGetters({
      notLogin: 'userInfo/getNotLogin',
      menuList: 'userInfo/getMenuList',
    }),
  },
  watch: {
    exitCount(count) {
      this.$emit('setExitCount', count);
    },
  },
  methods: {
    // 출차처리
    async saveDeparture(event) {
      if (event.result == false) {
        return;
      } else {
        const param = [
          {
            trnPlnNum: this.exitPlnNum,
            outCls: 'DRIVE',
          },
        ];
        try {
          const response = await tranApi.putCarOutSave(param);
          if (response.data.status == 200) {
            this.$EventBus.$emit('openYesModal', 'message.msgResultDeparture');
          }
          await this.getList();
          // this.$emit('reloadCount');
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    async askDeparture(event) {
      this.$modal.show('AlarmModalexit', { message: 'message.msgAskDeparture', type: 'exit', index: '' });
      this.exitPlnNum = event.target.value;
    },
    async getList() {
      const param = {
        searchCls: 'out', // out, sign, all
        trnCarNum: this.userCd,
        pageSize: '',
        pageNumber: '',
      };
      try {
        const response = await orderApi.getDriverDeliveryStatusList(param);
        this.exitProcessList = response.data.ds;
        this.exitCount = this.exitProcessList.length;
        this.$emit('reloadCount');
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async printReport(trnPlnNum) {
      let data = { result: true, langList: 'en,vn', type: 'deliveryNote' };
      if (data.result) {
        try {
          const param = {
            trnPlnNum,
            langList: data.langList,
          };
          const resp = await tranApi.getDeliveryNote(param);

          this.reportPrint(resp.data.ds, data.type);
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
