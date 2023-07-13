<template>
  <div>
    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container14">
      <div class="real_head">
        <div class="real_head_left">
          <small>
            {{ $t('message.totalSelection1') }}
            <i>{{ listRows.length }}</i>
            {{ $t('message.totalSelection2') }}
          </small>
        </div>
        <div class="real_head_right">
          <button class="btn_default btn_function" @click="gridReload">{{ $t('message.btnInit') }}</button>
          <button class="btn_default btn_critical_process" @click="getNewAndChangeData">{{ $t('message.btnSave') }}</button>
        </div>
      </div>
      <div class="real_body real_body12">
        <OrderMonthManagementGird style="height: 100%" ref="orderMonthGrid" :page="page" :selectDate="selectDate" @openSingleCalendar="openSingleCalendar" :listRows="listRows" :gridLang="gridLang" />
      </div>
    </div>
    <!-- //리얼그리드 -->
    <DatePickerModal :currentMonth="currentMonth" :isDefault="false" @chooseDate="chooseDate" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import languageApi from '@/api/language';
import masterApi from '@/api/master/master';
import OrderMonthManagementGird from '@/components/gridView/master/OrderMonthManagementGird';
import DatePickerModal from '@/modal/DatePickerModal';

export default {
  components: {
    OrderMonthManagementGird,
    DatePickerModal,
  },
  props: ['authButton', 'savePage', 'menuId', 'page', 'openInfo', 'routerPath'],
  data() {
    return {
      listRows: [],
      gridLang: [],
      currentMonth: '',
      selectDate: '',
    };
  },
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  methods: {
    openSingleCalendar(data) {
      this.currentMonth = new String(data.month);
      this.$modal.show('DatePicker', { type: data.field, currentDate: data.month, page: 'orderMonth' });
    },
    chooseDate(date, type) {
      this.selectDate = { date: date, type: type };
    },
    getSearchList(list) {
      this.listRows = list;
    },
    async getRouterLanguage() {
      try {
        const resp = await languageApi.getRouterLanguage(this.routerPath, this.menuId, this.userLocale, 'Y');
        this.gridLang = resp.data.rs.language;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getOrderMonthMngList() {
      try {
        const resp = await masterApi.getOrderMonthMngList();
        this.listRows = resp.data.ds;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },

    getNewAndChangeData() {
      this.$refs.orderMonthGrid.gridCommit();
      const rows = this.$refs.orderMonthGrid.getNewAndChangeData();
      // let checkTimeFlag = true;
      // rows.forEach(element => {
      //   if (element.aplySttHh > 23) {
      //     checkTimeFlag = false;
      //   } else if (element.aplySttMi > 59) {
      //     checkTimeFlag = false;
      //   } else {
      //     element.aplySttTi = `${element.aplySttHh.length == 1 ? '0' + element.aplySttHh : element.aplySttHh}:${element.aplySttMi.length == 1 ? '0' + element.aplySttMi : element.aplySttMi}:00`;
      //   }
      //   return checkTimeFlag;
      // });

      // if (checkTimeFlag == false) {
      //   this.$EventBus.$emit('openYesModal', 'message.timeValidation');
      // } else {
      if (rows.length == 0) {
        this.$EventBus.$emit('openYesModal', 'message.noDataValidation');
      } else {
        this.putOrderMonthMngList(rows);
      }
      // }
    },
    async putOrderMonthMngList(rows) {
      try {
        const paramData = [];
        rows.forEach(row => {
          paramData.push({
            prdtClsCd: row.prdtClsCd,
            aplySttDt: this.$revertDateFormatD(row.aplySttDt),
            aplySttTi: row.aplySttHh + ':' + row.aplySttMi + ':00',
            aplyPropDt: this.$revertDateFormatD(row.aplyPropDt),
          });
        });
        const param = JSON.parse(JSON.stringify(paramData));
        const resp = await masterApi.putOrderMonthMngList(param);
        if (resp.data.rs) {
          await this.getOrderMonthMngList();
          this.$EventBus.$emit('openYesModal', resp.data.message);
          // this.$EventBus.$emit('openYesModal', 'message.msgSaveChange');
        }
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    gridReload() {
      this.$refs.orderMonthGrid.realGrid.gridView.cancel();
      this.getOrderMonthMngList();
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.getRouterLanguage();
    this.getOrderMonthMngList();
  },
  destroyed() {},
};
</script>

<style>
input.rg-editor.rg-number-editor {
  padding-right: 20px !important;
}
</style>
