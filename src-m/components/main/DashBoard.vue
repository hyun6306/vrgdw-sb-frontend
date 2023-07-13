<template>
  <!-- 대시보드     -->
  <section class="dashboard_contents">
    <!--        공지사항-->
    <div class="dashboard_notice">
      <p class="dashboard_title">
        <strong>{{ $t('message.notice') }}</strong>
        <a @click="pageMove('/util/notice')">+</a>
      </p>
      <ul class="dashboard_notice_list">
        <li v-for="(list, index) in noticeList" :key="index">
          <a @click="noticeDetail(list)">
            <span>{{ list.title }}</span>
            <i>[{{ list.updatedAt | vnDateFormatD }}]</i>
          </a>
        </li>
      </ul>
    </div>
    <!--진행 상태-->
    <div class="dashboard_status">
      <div class="status_box quote" v-if="userMenuGrp === 'CUSTOMER'" @click="pageMove('/order/general-list', 'CFM')">
        <span>{{ $t('message.quoteManagement') }}</span>
        <strong
          ><i>{{ cntInfo.offerCnt | priceFormat }}</i
          >{{ $t('message.totalSelection2') }}</strong
        >
        <i class="i_deco"><img src="@m/assets/img/icon_dash_check.png" /></i>
      </div>
      <div class="status_box quote" v-else @click="pageMove('/order/general-list', 'REQ')">
        <span>{{ $t('message.quoteRequest') }}</span>
        <strong
          ><i>{{ cntInfo.offerCnt | priceFormat }}</i
          >{{ $t('message.totalSelection2') }}</strong
        >
        <i class="i_deco"><img src="@m/assets/img/icon_dash_check.png" /></i>
      </div>
      <div class="status_box booking" v-if="userMenuGrp === 'CUSTOMER'" @click="pageMove('/order/booking-list', '진행중')">
        <span>{{ $t('message.bokngStatus') }}</span>
        <strong
          ><i>{{ cntInfo.bookingCnt | priceFormat }}</i
          >{{ $t('message.totalSelection2') }}</strong
        >
        <i class="i_deco"><img src="@m/assets/img/icon_dash_check.png" /></i>
      </div>
      <div class="status_box booking" v-else @click="pageMove('/order/booking-list', 'BK02')">
        <span>{{ $t('message.bokngApprNeed') }}</span>
        <strong
          ><i>{{ cntInfo.bookingCnt | priceFormat }}</i
          >{{ $t('message.totalSelection2') }}</strong
        >
        <i class="i_deco"><img src="@m/assets/img/icon_dash_check.png" /></i>
      </div>
      <!--      <div class="status_box delivery" v-if="userMenuGrp === 'CUSTOMER'" @click="pageMove('/order/booking-list', '진행중')">-->
      <!--        <span>{{ $t('message.trnAvali') }}</span>-->
      <!--        <strong-->
      <!--          ><i>{{ cntInfo.trnPsbCnt | priceFormat }}</i-->
      <!--          >{{ $t('message.totalSelection2') }}</strong-->
      <!--        >-->
      <!--        <i class="i_deco"><img src="@m/assets/img/icon_dash_check.png" /></i>-->
      <!--      </div>-->
      <div class="status_box delivery" v-if="userMenuGrp !== 'CUSTOMER'" @click="pageMove('/order/booking-list', 'BK04')">
        <span>{{ $t('message.asgnReq') }}</span>
        <strong
          ><i>{{ cntInfo.asgnReqCnt | priceFormat }}</i
          >{{ $t('message.totalSelection2') }}</strong
        >
        <i class="i_deco"><img src="@m/assets/img/icon_dash_check.png" /></i>
      </div>
      <div class="status_box delivery_start" v-if="userMenuGrp === 'CUSTOMER'" @click="pageMove('/tran/delivery-list', 'TRN03')">
        <span>{{ $t('message.deliveryStart') }}</span>
        <strong
          ><i>{{ cntInfo.trnOutCnt | priceFormat }}</i
          >{{ $t('message.totalSelection2') }}</strong
        >
        <i class="i_deco"><img src="@m/assets/img/icon_dash_check.png" /></i>
      </div>
      <div class="status_box delivery_start" v-else @click="pageMove('/order/booking-list', 'BK05,BK06')">
        <span>{{ $t('message.asgnPass') }}</span>
        <strong
          ><i>{{ cntInfo.asgnPassCnt | priceFormat | priceFormat }}</i
          >{{ $t('message.totalSelection2') }}</strong
        >
        <i class="i_deco"><img src="@m/assets/img/icon_dash_check.png" /></i>
      </div>
    </div>
    <div class="dashboard_delivery">
      <p class="dashboard_title">
        <strong>{{ $t('message.deliveryStatus') }}</strong>
      </p>
      <div class="delivery_box" v-for="(list, index) in deliveryList" :key="index" @click="pageMove('/tran/delivery-list')">
        <div class="delivery_box_head">
          <strong>{{ list.logitsAlias }}</strong>
          <span :class="[list.trnStatCd === 'TRN04' ? 'delivery_icon delivery_end' : 'delivery_icon delivery_ing']">{{ list.trnStatNm }}</span>
        </div>

        <div class="delivery_box_info">
          <table>
            <colgroup>
              <col style="width: 40%" />
              <col style="width: 27%" />
              <col style="width: 15%" />
              <col style="width: 18%" />
            </colgroup>
            <tbody>
              <tr>
                <th>{{ $t('message.dispaPlanNum') }}</th>
                <td colspan="3">{{ list.trnPlnNum }}</td>
              </tr>
              <tr>
                <th>{{ $t('message.trnCarNm') }}</th>
                <td colspan="3">{{ list.trnCarType }}</td>
              </tr>
              <tr>
                <th>{{ $t('message.trnStartDt') }}</th>
                <td>{{ list.outDt | vnDateFormatD }}</td>
                <th style="text-align: right">{{ $t('message.trnOrgVol') }}</th>
                <td style="text-align: right">{{ list.trnReqVol | priceFormat }}</td>
              </tr>
              <tr>
                <th>{{ $t('message.trnEndDt') }}</th>
                <td colspan="3">{{ list.takeOverDt | vnDateFormatD }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <NoticeDetailModal :article="article" @closeNoticeDetail="closeNoticeDetail" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import NoticeDetailModal from '@m/modal/help/NoticeDetailModal';
import utilApi from '@/api/util/utility';
import mainApi from '@/api/main';

export default {
  components: { NoticeDetailModal },
  computed: {
    ...mapGetters({
      userMenuGrp: 'userInfo/getUserMenuGrpCd',
      menuList: 'menuList/getMenuListAll',
    }),
  },
  data() {
    return {
      article: {},
      noticeList: [],
      cntInfo: {},
      deliveryList: [],
    };
  },
  methods: {
    async getNoticeList() {
      try {
        const param = {
          filter: this.filter,
          pageNumber: 0,
          pageSize: 4,
          showYn: 'Y',
        };
        const resp = await utilApi.getNoticeList(param);
        this.noticeList.push(...resp.data.ds);
        this.pageInfo = resp.data.page;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    closeNoticeDetail() {
      this.article = {};
      this.$modal.hide('NoticeDetailModal');
    },
    noticeDetail(article) {
      this.article = article;
      this.$modal.show('NoticeDetailModal');
    },
    pageMove(routerPath, filter) {
      let menuId = this.searchMenuId(routerPath);
      if (menuId) {
        if (filter) this.$router.push(`${routerPath}?menuId=${menuId}&filter=${filter}`);
        else this.$router.push(`${routerPath}?menuId=${menuId}`);
      }
    },
    searchMenuId(routerPath) {
      let menuId;
      this.menuList.forEach(dept1 => {
        if (dept1.routerPath === routerPath && dept1.mobileIncYn === 'Y') {
          menuId = dept1.menuId;
        }
        dept1.children.forEach(dept2 => {
          if (dept2.routerPath === routerPath && dept2.mobileIncYn === 'Y') {
            menuId = dept2.menuId;
          }
          dept2.children.forEach(dept3 => {
            if (dept3.routerPath === routerPath && dept3.mobileIncYn === 'Y') {
              menuId = dept3.menuId;
            }
          });
        });
      });
      return menuId;
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
            trncusId: '',
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
    async getDeliveryList() {
      try {
        let resp = '';
        if (this.userMenuGrp === 'CUSTOMER') {
          resp = await mainApi.getCustomerDelivery();
        } else {
          resp = await mainApi.getVrgdwDelivery();
        }
        this.deliveryList = resp.data.ds;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
  },
  mounted() {
    this.getNoticeList();
    this.getCnt();
    if (this.userMenuGrp !== 'VRGDW_TRAN' && this.userMenuGrp !== 'TRANSCUS') {
      this.getDeliveryList();
    }
  },
};
</script>

<style></style>
