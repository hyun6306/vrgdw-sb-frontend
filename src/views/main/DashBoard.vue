<template>
  <div style="height: ">
    <div class="dashboard_top">
      <div class="header_btn_box">
        <button @click="pageMove('/util/manual')">{{ $t('message.btnManual') }}</button>
        <button @click="refresh()">{{ $t('message.btnRefresh') }}</button>
      </div>
      <!-- notice -->
      <div class="dashboard_notice">
        <p class="sub_title">
          <strong>{{ $t('message.notice') }}</strong>
          <a class="btn_more" @click="pageMove('/util/notice')">+</a>
        </p>
        <ul class="dashboard_notice_list">
          <li v-for="(list, index) in utilListRows" :key="index">
            <a @click="sendPostId(list.id)">
              <span>{{ list.title }}</span>
              <i>[{{ list.updatedAt | vnDateFormatD }}]</i>
            </a>
          </li>
        </ul>
      </div>
      <!-- //notice -->
      <!-- 진행상황 -->
      <div class="dashboard_status" v-if="userMenuGrp !== 'CUSTOMER' && userMenuGrp !== 'VRGDW_TRAN' && userMenuGrp !== 'TRANSCUS'">
        <!--        <div class="dashboard_status_column">-->
        <div class="status_box sales01" @click="pageMove('/order/general-list', { offrStatCd: defs.offrStatCd.request })">
          <span>{{ $t('message.offrConfNeed') }} </span>
          <strong
            ><i>{{ cntInfo.offerCnt | priceFormat }}</i
            >{{ $t('message.totalSelection2') }}</strong
          >
          <i class="i_deco"><img src="@/assets/img/icon_dashboard01.png" /></i>
        </div>
        <div class="status_box sales02" @click="pageMove('/order/booking-list', { bokngStatCd: defs.bokngStatCd.confirmNeed })">
          <span> {{ $t('message.bokngApprNeed') }} </span>
          <strong
            ><i>{{ cntInfo.bookingCnt | priceFormat }}</i
            >{{ $t('message.totalSelection2') }}</strong
          >
          <i class="i_deco"><img src="@/assets/img/icon_dashboard01.png" /></i>
        </div>
        <!--        </div>-->
        <div class="status_box quote" @click="pageMove('/order/booking-list', { bokngStatCd: defs.bokngStatCd.request })">
          <span> {{ $t('message.asgnReq') }} </span>
          <strong
            ><i>{{ cntInfo.asgnReqCnt | priceFormat }}</i
            >{{ $t('message.totalSelection2') }}</strong
          >
          <i class="i_deco"><img src="@/assets/img/icon_dashboard01.png" /></i>
        </div>
        <!--        <div class="status_box booking" @click="pageMove('/order/booking-list', { bokngStatCd: defs.bokngStatCd.request })">-->
        <!--          <span> {{ $t('message.asgnPass') }} </span>-->
        <!--          <strong-->
        <!--            ><i>{{ cntInfo.asgnPassCnt | priceFormat }}</i-->
        <!--            >{{ $t('message.totalSelection2') }}</strong-->
        <!--          >-->
        <!--          <i class="i_deco"><img src="@/assets/img/icon_dashboard02.png" /></i>-->
        <!--        </div>-->
        <div class="status_box delivery" @click="pageMove('/order/booking-list', { bokngStatCd: [defs.bokngStatCd.assiEnd, defs.bokngStatCd.assiIng] })">
          <span> {{ $t('message.deliveryReqAvali') }} </span>
          <strong
            ><i>{{ cntInfo.asgnPassCnt | priceFormat }}</i
            >{{ $t('message.totalSelection2') }}</strong
          >
          <i class="i_deco"><img src="@/assets/img/icon_dashboard03.png" /></i>
        </div>
      </div>

      <div class="dashboard_status" v-if="userMenuGrp === 'CUSTOMER'">
        <div class="status_box quote" @click="pageMove('/order/general-list', { offrStatCd: defs.offrStatCd.confirm })">
          <span>
            {{ $t('message.quoteManagement') }}
          </span>
          <strong
            ><i>{{ cntInfo.offerCnt | priceFormat }}</i
            >{{ $t('message.totalSelection2') }}</strong
          >
          <i class="i_deco"><img src="@/assets/img/icon_dashboard01.png" /></i>
        </div>
        <div class="status_box booking" @click="pageMove('/order/booking-list', { bokngStatCd: '진행중' })">
          <span>
            {{ $t('message.managementBooking') }}
          </span>
          <strong
            ><i>{{ cntInfo.bookingCnt | priceFormat }}</i
            >{{ $t('message.totalSelection2') }}</strong
          >
          <i class="i_deco"><img src="@/assets/img/icon_dashboard02.png" /></i>
        </div>
        <!--        <div class="status_box delivery" @click="pageMove('/order/booking-list', { bokngStatCd: '진행중' })">-->
        <!--          <span> {{ $t('message.deliveryReqAvali') }} </span>-->
        <!--          <strong-->
        <!--            ><i>{{ cntInfo.trnPsbCnt | priceFormat }}</i-->
        <!--            >{{ $t('message.totalSelection2') }}</strong-->
        <!--          >-->
        <!--          <i class="i_deco"><img src="@/assets/img/icon_dashboard03.png" /></i>-->
        <!--        </div>-->
        <div class="status_box delivery_start" @click="pageMove('/tran/delivery-list', { trnStatus: 'TRN03' })">
          <span> {{ $t('message.deliveryStart') }} </span>
          <strong
            ><i>{{ cntInfo.trnOutCnt | priceFormat }}</i
            >{{ $t('message.totalSelection2') }}</strong
          >
          <i class="i_deco"><img src="@/assets/img/icon_dashboard04.png" /></i>
        </div>
      </div>

      <div class="dashboard_status" v-if="userMenuGrp === 'VRGDW_TRAN'">
        <div class="status_box quote" @click="pageMove('/tran/forwarding-req-manage', { outStat: defs.outStatCd.trnReq })">
          <span> {{ $t('message.trnReq') }} </span>
          <strong
            ><i>{{ cntInfo.trnCarCnt | priceFormat }}</i
            >{{ $t('message.totalSelection2') }}</strong
          >
          <i class="i_deco"><img src="@/assets/img/icon_dashboard01.png" /></i>
        </div>
        <div class="status_box booking" @click="pageMove('/tran/dispatch-confirm-manage', { outStat: defs.outStatCd.disEnd })">
          <span> {{ $t('message.dispatchConfirm') }} </span>
          <strong
            ><i>{{ cntInfo.trnCfmCnt | priceFormat }}</i
            >{{ $t('message.totalSelection2') }}</strong
          >
          <i class="i_deco"><img src="@/assets/img/icon_dashboard02.png" /></i>
        </div>
        <div class="status_box delivery" @click="pageMove('/tran/car-in-out-manage', { inType: 'N' })">
          <span> {{ $t('message.trnIn') }} </span>
          <strong
            ><i>{{ cntInfo.trnInCnt | priceFormat }}</i
            >{{ $t('message.totalSelection2') }}</strong
          >
          <i class="i_deco"><img src="@/assets/img/icon_dashboard03.png" /></i>
        </div>
        <div class="status_box delivery_start" @click="pageMove('/tran/take-over-manage', { outStat: defs.outStatCd.delIng })">
          <span> {{ $t('message.trnIng') }} </span>
          <strong
            ><i>{{ cntInfo.trnIngCnt | priceFormat }}</i
            >{{ $t('message.totalSelection2') }}</strong
          >
          <i class="i_deco"><img src="@/assets/img/icon_dashboard04.png" /></i>
        </div>
      </div>
      <div class="dashboard_status" v-if="userMenuGrp === 'TRANSCUS'">
        <div class="status_box quote" @click="pageMove('/tran/dispatch-req-manage', { outStat: defs.outStatCd.disReq })">
          <span> {{ $t('message.dispatchReq') }} </span>
          <strong
            ><i>{{ cntInfo.trnCarCnt | priceFormat }}</i
            >{{ $t('message.totalSelection2') }}</strong
          >
          <i class="i_deco"><img src="@/assets/img/icon_dashboard01.png" /></i>
        </div>
        <div class="status_box booking" @click="pageMove('/tran/take-over-manage', { outStat: defs.outStatCd.disCon })">
          <span> {{ $t('message.dispatchConfirm') }} </span>
          <strong
            ><i>{{ cntInfo.trnCfmCnt | priceFormat }}</i
            >{{ $t('message.totalSelection2') }}</strong
          >
          <i class="i_deco"><img src="@/assets/img/icon_dashboard02.png" /></i>
        </div>
        <div class="status_box delivery" @click="pageMove('/tran/car-in-out-manage', { inType: 'N' })">
          <span> {{ $t('message.trnIn') }} </span>
          <strong
            ><i>{{ cntInfo.trnInCnt | priceFormat }}</i
            >{{ $t('message.totalSelection2') }}</strong
          >
          <i class="i_deco"><img src="@/assets/img/icon_dashboard03.png" /></i>
        </div>
        <div class="status_box delivery_start" @click="pageMove('/tran/forwarding-status-list', { outStat: defs.outStatCd.delIng })">
          <span> {{ $t('message.trnIng') }} </span>
          <strong
            ><i>{{ cntInfo.trnIngCnt | priceFormat }}</i
            >{{ $t('message.totalSelection2') }}</strong
          >
          <i class="i_deco"><img src="@/assets/img/icon_dashboard04.png" /></i>
        </div>
      </div>
      <!-- //진행상황 -->
    </div>

    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container15" v-if="userMenuGrp !== 'VRGDW_TRAN' && userMenuGrp !== 'TRANSCUS'">
      <div class="real_head">
        <div class="real_head_left">
          <span class="real_title">{{ $t('message.bokngStatus') }}</span>
          <div class="btn_box">
            <!-- 클릭 시 btn_deep_green 클래스 add -->
            <button :class="[isOffrClsCd === '' ? 'btn_default btn_print_fuction ' : 'btn_default btn_function']" v-if="userMenuGrp === 'CUSTOMER'" @click="getBookingList()">{{ $t('message.all') }}</button>
            <button :class="[isOffrClsCd === defs.offrClsCd.order ? 'btn_default btn_print_fuction ' : 'btn_default btn_function']" v-if="userMenuGrp === 'CUSTOMER'" @click="getBookingList(defs.offrClsCd.order)">{{ $t('message.general') }}</button>
            <button :class="[isOffrClsCd === defs.offrClsCd.sample ? 'btn_default btn_print_fuction ' : 'btn_default btn_function']" v-if="userMenuGrp === 'CUSTOMER'" @click="getBookingList(defs.offrClsCd.sample)">{{ $t('message.sample') }}</button>
          </div>
        </div>
        <div class="real_head_right">
          <a class="btn_more" @click="pageMove('/order/booking-list')">+</a>
        </div>
      </div>
      <div class="real_body real_body15">
        <BookingMain style="height: 100%" :listRows="bookingList" :gridLang="gridLang" />
      </div>
    </div>
    <div class="realgrid_container realgrid_container15 mt-40" v-if="userMenuGrp !== 'VRGDW_TRAN' && userMenuGrp !== 'TRANSCUS'">
      <div class="real_head">
        <div class="real_head_left">
          <span class="real_title">{{ $t('message.deliveryStatus') }}</span>
        </div>
        <div class="real_head_right">
          <a class="btn_more" @click="pageMove('/tran/delivery-list')">+</a>
        </div>
      </div>
      <div class="real_body real_body15">
        <DeliveryMain style="height: 100%" :listRows="deliveryList" :gridLang="gridLang" />
      </div>
    </div>
    <!-- //리얼그리드 -->
    <NoticeModal :page="page" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BookingMain from '@/components/gridView/main/BookingMain';
import DeliveryMain from '@/components/gridView/main/DeliveryMain';
import utilApi from '@/api/util/utility';
import NoticeModal from '@/modal/util/NoticeModal';
import mainApi from '@/api/main';
import languageApi from '@/api/language';
import defs from '@/consts/defs';

export default {
  props: ['page', 'routerPath', 'menuId', 'authButton'],
  computed: {
    ...mapGetters({
      userMenuGrp: 'userInfo/getUserMenuGrpCd',
      menuList: 'menuList/getMenuListAll',
      userLocale: 'userInfo/getUserLocale',
      userInfo: 'userInfo/getUserInfo',
    }),
  },
  components: {
    BookingMain,
    DeliveryMain,
    NoticeModal,
  },
  data() {
    return {
      pageNumber: 0,
      pageSize: 4,
      utilListRows: [],
      cntInfo: {},
      bookingList: [],
      deliveryList: [],
      gridLang: [],
      defs: defs,
      isOffrClsCd: '',
    };
  },
  methods: {
    async sendPostId(id) {
      try {
        let param = {
          id,
        };
        let resp = await utilApi.getNotice(param);

        this.$modal.show('NoticeModal', { data: resp.data.rs });
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getList() {
      try {
        const param = {
          filter: this.filter,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          showYn: 'Y',
        };
        let resp = await utilApi.getNoticeList(param);

        this.utilListRows = resp.data.ds;
        console.log('공지T', this.utilListRows);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    pageMove(routerPath, filter) {
      let page = {};
      page = this.searchPageObj(routerPath);
      if (Object.keys(page)) {
        this.$emit('loadPage', page, '', '', filter);
      }
    },
    searchPageObj(routerPath) {
      let pageObj;
      this.menuList.forEach(dept1 => {
        if (dept1.routerPath === routerPath) {
          pageObj = dept1;
        }
        dept1.children.forEach(dept2 => {
          if (dept2.routerPath === routerPath) {
            pageObj = dept2;
          }
          dept2.children.forEach(dept3 => {
            if (dept3.routerPath === routerPath) {
              pageObj = dept3;
            }
          });
        });
      });
      return pageObj;
    },
    async getCnt() {
      try {
        let resp = '';
        if (this.userMenuGrp === 'CUSTOMER') {
          resp = await mainApi.getCustomerCnt();
        } else if (this.userMenuGrp === 'VRGDW_TRAN') {
          resp = await mainApi.getTranCnt();
        } else if (this.userMenuGrp === 'TRANSCUS') {
          const param = {
            trncusId: this.userInfo.trncusId,
          };
          resp = await mainApi.getTranscusCnt(param);
        } else {
          resp = await mainApi.getVrgdwCnt();
        }
        if (resp.data?.ds.length > 0) {
          this.cntInfo = resp.data.ds[0];
        }
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getBookingList(offrClsCd = '') {
      try {
        this.isOffrClsCd = offrClsCd;
        let resp = '';
        const param = {
          offrClsCd,
        };
        if (this.userMenuGrp === 'CUSTOMER') {
          resp = await mainApi.getCustomerBooking(param);
        } else {
          resp = await mainApi.getVrgdwBooking();
        }
        this.bookingList = resp.data.ds;
        console.log('부킹현황', this.bookingList);
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getDeliveryList() {
      try {
        let resp = '';
        if (this.userMenuGrp === 'CUSTOMER') {
          resp = await mainApi.getCustomerDelivery();
        } else {
          resp = await mainApi.getVrgdwDelivery();
        }
        this.deliveryList = resp.data.ds;
        console.log('배송현황', this.deliveryList);
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getRouterLanguage() {
      try {
        const resp = await languageApi.getRouterLanguage('/main', this.menuId, this.userLocale, 'Y');
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
    refresh() {
      this.getList();
      this.getCnt();
      if (this.userMenuGrp !== 'VRGDW_TRAN' && this.userMenuGrp !== 'TRANSCUS') {
        this.getRouterLanguage();
        this.getBookingList();
        this.getDeliveryList();
      }
    },
  },
  created() {},
  mounted() {
    this.getList();
    this.getCnt();
    if (this.userMenuGrp !== 'VRGDW_TRAN' && this.userMenuGrp !== 'TRANSCUS') {
      this.getRouterLanguage();
      this.getBookingList();
      this.getDeliveryList();
    }
  },
  destroyed() {},
};
</script>

<style>
.checkbox-label {
  display: block;
}
</style>
