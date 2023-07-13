<template>
  <div class="wrap">
    <!-- <DriverView v-if="userMenuGrpCd == 'VRGDW_SALES'" /> -->
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt">{{ $t('message.deliveryStatus') }}</h1>
      </div>
      <div class="header_left">
        <button class="btn_header in_img" @click="$router.go(-1)"><img src="@m/assets/img/icon_back.png" /></button>
      </div>
      <div class="header_right">
        <button class="btn_header in_img" v-if="authButton.schAuth == 'Y'"><img src="@m/assets/img/icon_search.png" @click="$modal.show('DeliverySearchModal')" /></button>
      </div>
    </div>
    <!-- //상단 헤더 -->

    <!-- 컨텐츠 바디 -->
    <div class="container" @scroll="handleScroll">
      <!-- 리스트영역 -->
      <div class="driver_contents">
        <!-- 납품희망월 선택 -->
        <div class="delivery_status">
          <label class="head_count">
            <!-- <input type="checkbox" />
              <span class="checkmark"></span> -->
            <strong>{{ pageInfo.totalCount }}</strong> {{ $t('message.totalSelection2') }}
          </label>
        </div>
        <!-- BOX시작 -->
        <div v-for="(card, index) in statusList.length" :key="card" class="driver_box02">
          <div>
            <div class="driver_box_head">
              <!-- 배차계획번호 -->
              <span class="car_number_txt underline" @click="printReport(statusList[index].trnPlnNum, statusList[index].trnStatCd)">
                {{ $t('message.trnPlnNum') }}
                <i>{{ statusList[index].trnPlnNum }}</i>
              </span>
              <!-- 배송상태 -->
              <button
                :class="{
                  'btn_call_driver btn_driver_request': statusList[index].trnStatCd === 'TRN01',
                  'btn_call_driver btn_driver_expected': statusList[index].trnStatCd === 'TRN02',
                  btn_call_driver: statusList[index].trnStatCd === 'TRN03',
                  'btn_call_driver btn_driver_complete': statusList[index].trnStatCd === 'TRN04' || statusList[index].trnStatCd === 'TRN05',
                }"
                :value="statusList[index].trnStatCd"
              >
                {{ statusList[index].trnStatNm }}
              </button>
            </div>
            <div class="driver_box_body">
              <ul class="driver_bb_list">
                <li>
                  <!-- 배송희망일 -->
                  <span class="driver_bb_title">{{ $t('message.hopeDt') }}</span>
                  <p class="driver_bb_info">{{ statusList[index].trnHopeDt | revertDate }}</p>
                </li>
                <li>
                  <!-- 출차일, 배차요청일, 배송요청일, 인수일 -->
                  <span v-if="statusList[index].trnStatCd === 'TRN01'" class="driver_bb_title">{{ $t('message.reqDeliverDt') }}</span>
                  <span v-if="statusList[index].trnStatCd === 'TRN02'" class="driver_bb_title">{{ $t('message.reqDt') }}</span>
                  <span v-if="statusList[index].trnStatCd === 'TRN03'" class="driver_bb_title">{{ $t('message.outDt') }}</span>
                  <span v-if="statusList[index].trnStatCd === 'TRN04'" class="driver_bb_title">{{ $t('message.takeOverDt') }}</span>
                  <p v-if="statusList[index].trnStatCd === 'TRN01'" class="driver_bb_info">{{ statusList[index].reqDt | revertDate }}</p>
                  <!-- trnReqDt, 배차요청일 => 모바일 배송현황 API에서만 내려오는 key값이며, data는 null로 내려오고 있음.
                  PC 배송현황 API에서 해당 값 받을 수 있게 요청 필요?. -->
                  <p v-if="statusList[index].trnStatCd === 'TRN02'" class="driver_bb_info">{{ statusList[index].trnReqDt }}</p>
                  <p v-if="statusList[index].trnStatCd === 'TRN03'" class="driver_bb_info">{{ statusList[index].outAt | dateFilter }}</p>
                  <p v-if="statusList[index].trnStatCd === 'TRN04'" class="driver_bb_info">
                    {{ statusList[index].takeOverAt | dateFilter }}
                  </p>
                </li>
                <li>
                  <!-- 차량번호 -->
                  <span class="driver_bb_title">{{ $t('message.tranCarNum') }}</span>
                  <p class="driver_bb_info">
                    <span>{{ statusList[index].trnCarNum }}</span>
                  </p>
                </li>
                <li>
                  <!-- 운전기사연락처 -->
                  <span class="driver_bb_title">{{ $t('message.driverPhoneNum') }}</span>
                  <p class="driver_bb_info">
                    <span>{{ statusList[index].driverPhoneNum }}</span>
                    <a v-if="statusList[index].driverPhoneNum" :href="`tel:${statusList[index].driverPhoneNum}`" class="btn_call"><img src="@m/assets/img/icon_call_w.png" /></a>
                    <!-- <button class="btn_call"><img src="@m/assets/img/icon_call_w.png" /></button> -->
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- BOX끝 -->
      </div>
      <DeliverySearchModal :page="page" :dashFilter="dashFilter" @setSearchResult="setSearchResult" />
      <DeliverAlarmModal :ment="ment" />
    </div>
    <HomeTap @goToTop="goToTop" />
  </div>

  <!-- //컨텐츠 바디 -->
  <!-- </div> -->
</template>

<script>
import DeliverAlarmModal from '@m/modal/driver/DeliverAlarmModal.vue';
import DeliverySearchModal from '@m/modal/order/DeliverySearchModal.vue';
import tranApi from '@/api/tran/tran.js';
import reportPrintJs from '@/mixins/reportPrint';
import { mapGetters } from 'vuex';
import orderApi from '@/api/order/order.js';
import HomeTap from '@m/components/HomeTap';
import dayjs from 'dayjs';

export default {
  components: {
    DeliverySearchModal,
    DeliverAlarmModal,
    HomeTap,
  },
  mixins: [reportPrintJs],
  data() {
    return {
      paramFlag: false,
      newParam: {},
      pageInfo: {},
      pageNumber: 0,
      driver_contents_height: '',
      itemCount: 0,
      ment: '',
      page: 'deliveryStatus',
      statusList: [],
      priceSellOpen: false,
      quoteOpen: false,
      bookmark: false,
      productDetailOpen: false,
      selectOptions: ['Bắt đầu vận chuyển', 'Giao hàng theo lịch trình', 'Giao hàng đã hoàn thành'],
      el: '',
      dashFilter: '',
    };
  },
  filters: {
    dateFilter(value) {
      const date = value.split(' ')[0].split('-').reverse().join('-');
      return value.toString().replaceAll(value, date);
    },
    revertDate(value) {
      const setD = value.split('-').reverse().join('-');
      return value.toString().replaceAll(value, setD);
    },
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      userCustId: 'userInfo/getUserCustId',
      authButton: 'userInfo/getAuthButton',
    }),
  },
  watch: {
    pageNumber() {
      const setNewList = this.statusList;
      if (this.pageNumber > 0) this.getDeliveryStatusList(setNewList);
    },
  },
  methods: {
    async printReport(trnPlnNum, statusCd) {
      let data = { result: true, langList: 'en,vn', type: 'deliveryNote' };
      if (data.result && trnPlnNum !== null && statusCd !== 'TRN01' && statusCd !== 'TRN02') {
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
      } else {
        this.$EventBus.$emit('openYesModal', 'message.msgDnNotice');
      }
    },
    goToTop() {
      if (Object.keys(this.el).length > 0) this.el.target.scrollTop = 0;
    },
    handleScroll(el) {
      this.el = el;
      if (Math.ceil(el.target.offsetHeight + el.target.scrollTop) >= el.target.scrollHeight) {
        if (this.pageInfo.finalPageNo - 1 > this.pageNumber) {
          this.pageNumber++;
        }
      }
    },
    async openModal(event) {
      if (event.type == 'exit') {
        this.ment = event.ment;
        this.$modal.show(event.modal, { type: 'exit' });
      } else if (event.type == 'deliver') {
        this.ment = event.ment;
        this.$modal.show(event.modal, { type: 'deliver' });
      }
    },
    // 검색결과 조회
    async setSearchResult(newParam) {
      this.newParam = newParam;
      this.paramFlag = true;
      await this.getDeliveryStatusList();
    },
    async getDeliveryStatusList(setNewList, click = false) {
      let param = {
        custId: this.userCustId,
        offrCls: '',
        prdtClsCd: '',
        trnCarType: '',
        prdtCd: '',
        dateCls: 'reqDt',
        sttDt: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
        endDt: dayjs().add(1, 'month').format('YYYY-MM-DD'),
        salesUsers: this.userMenuGrpCd !== 'VRGDW_SALES' ? '' : this.userInfo.userCd,
        filter: '',
        pageSize: 10,
        pageNumber: click ? 0 : this.pageNumber,
        outStatCd: '',
        trnStatCd: '',
      };
      if (this.paramFlag === false) {
        param;
      } else {
        param = this.newParam;
      }

      try {
        const response = await orderApi.getDeliveryStatusList(param);
        if (setNewList) {
          setNewList = response.data.ds;
          this.statusList.push(...setNewList);
        } else {
          this.statusList = response.data.ds;
        }
        if (response.data.ds.length == 0) {
          this.pageInfo.totalCount = 0;
        }
        this.pageInfo = response.data.page;
        if (this.statusList.length == 0 || response.data.ds.length == 0) {
          await this.openModal({ type: 'deliver', modal: 'DeliverAlarmModal', ment: 'message.msgInconsistentCriteria' });
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
  },
  async mounted() {
    // 최초 조회
    this.paramFlag = false;
    if (!this.dashFilter) await this.getDeliveryStatusList();
  },
  created() {
    if (this.$route.query) {
      this.dashFilter = this.$route.query.filter;
    }
  },
};
</script>

<style></style>
