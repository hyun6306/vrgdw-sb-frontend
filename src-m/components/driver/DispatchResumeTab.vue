<template>
  <div class="driver_contents">
    <!-- 데이터가 없습니다. -->
    <div class="nodata" v-if="this.dispatchCount <= 0">
      <span class="in_img"><img src="@m/assets/img/img_nodata.png" /></span>
      <p>{{ $t('message.gridMessageNoSearch') }}</p>
    </div>
    <!-- //데이터가 없습니다. -->
    <div v-if="this.dispatchCount >= 1">
      <div v-if="this.dispatchCount >= 1">
        <div v-for="(box, index) in dispatchList.length" :key="box" class="driver_box">
          <div class="driver_box_head">
            <span class="car_number_txt">
              {{ dispatchList[index].trnStatNm }}
            </span>
            <!-- 배차계획번호 -->
            <p class="car_number_txt">
              <i>{{ dispatchList[index].trnPlnNum }}</i>
            </p>
            <!-- <button class="btn_call_driver"> -->
            <!-- 국가번호 사용할 경우, 해당 주석 라인 사용, 아닐 경우 아래 라인 유지 
            (dispatchList[index].mobileNumCt != undefined ? dispatchList[index].mobileNumCt : dispatchList[index].phoneNumCt != undefined ? dispatchList[index].phoneNumCt : '') + (dispatchList[index].mobileNum ? dispatchList[index].mobileNum : dispatchList[index].phoneNum) -->
            <a :href="`tel:${dispatchList[index].phoneNum ? dispatchList[index].phoneNum : dispatchList[index].mobileNum}`" class="btn_call_driver">{{ $t('message.makeCall') }}<img src="@m/assets/img/icon_call_w.png" /></a>
            <!-- 전화 -->
            <!-- </button> -->
          </div>
          <div class="driver_box_body">
            <ul class="driver_bb_list">
              <li>
                <span class="driver_bb_title">{{ $t('message.invoice') }}</span>
                <!-- 전자송장보기 -->
                <p class="driver_bb_info">
                  <a class="btn_invoice_number" @click="printReport(dispatchList[index].trnPlnNum)">{{ dispatchList[index].trnInvoiceNum }}</a>
                  <button class="btn_invoice" @click="printReport(dispatchList[index].trnPlnNum)">
                    {{ $t('message.viewInvoice') }}
                  </button>
                </p>
              </li>
              <!-- 배송지명 -->
              <li>
                <span class="driver_bb_title">{{ $t('message.addrNm') }}</span>
                <p class="driver_bb_info">{{ dispatchList[index].logitsAlias }}</p>
              </li>
              <!-- 배송희망일시 -->
              <li>
                <span class="driver_bb_title">{{ $t('message.trnHopeDt') }}</span>
                <p class="driver_bb_info">{{ dispatchList[index].trnHopeDt | vnDateFormatD }}</p>
              </li>
              <!-- 주소 -->
              <li>
                <span class="driver_bb_title">{{ $t('message.addr') }}</span>
                <p class="driver_bb_info">
                  <span>{{ dispatchList[index].addr }}</span>
                </p>
              </li>
              <!-- 특이사항 -->
              <li>
                <span class="driver_bb_title">{{ $t('message.cusRequest') }}</span>
                <p class="driver_bb_info">
                  <span>{{ dispatchList[index].trnReqRemark }}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import orderApi from '@/api/order/order.js';
import reportPrintJs from '@/mixins/reportPrint';
import tranApi from '@/api/tran/tran.js';

export default {
  props: ['userCd'],
  mixins: [reportPrintJs],
  data() {
    return {
      ment: '',
      dispatchCount: 0,
      dispatchList: [],
      current: [],
      ksSelectOpen: false,
      bookmark: false,
      selectValue: '',
      selectOptions: ['KOREA', 'ENGLISH', 'VIETNAM'],
    };
  },
  computed: {
    ...mapGetters({
      notLogin: 'userInfo/getNotLogin',
      menuList: 'userInfo/getMenuList',
    }),
  },
  watch: {
    dispatchCount(count) {
      this.$emit('setDispatchCount', count);
    },
  },
  methods: {
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
    async openModal(event) {
      if (event.type == 'dispatch') {
        this.ment = event.ment;
        this.$modal.show(event.modal, { type: 'dispatch' });
      }
    },
    async getList() {
      const param = {
        searchCls: 'all', // out, sign, all
        trnCarNum: this.userCd,
        pageSize: '',
        pageNumber: '',
      };
      try {
        const response = await orderApi.getDriverDeliveryStatusList(param);
        this.dispatchList = response.data.ds;
        this.dispatchCount = this.dispatchList.length;
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
  created() {},
};
</script>

<style></style>
