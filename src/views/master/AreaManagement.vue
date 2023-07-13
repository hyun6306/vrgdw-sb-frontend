<template>
  <div>
    <!-- 리얼그리드 -->
    <div class="realgrid_container_row" style="height: calc(100% - 0px)">
      <div class="realgrid_container realgrid_container14">
        <div class="real_head">
          <div class="real_head_left">
            <span class="subTitle">{{ $t('message.cityNm') }}</span>
            <small class="ml-10">
              {{ $t('message.totalSelection1') }}
              <i>{{ listRowsLv1.length }}</i>
              {{ $t('message.totalSelection2') }}
            </small>
          </div>
          <div class="real_head_right">
            <button class="btn_default btn_function" @click="addRow('areaCodeLv1', 1)">{{ $t('message.btnAdd') }}</button>
            <button class="btn_default btn_function" @click="getCheckedData('areaCodeLv1')">{{ $t('message.btnDelete') }}</button>
            <button class="btn_default btn_critical_process" @click="getNewAndChangeData('areaCodeLv1')">{{ $t('message.btnSave') }}</button>
          </div>
        </div>
        <div class="real_body real_body13">
          <AreaManagementGirdLv1 style="height: 100%" ref="areaCodeLv1" :listRows="listRowsLv1" :gridLang="gridLang" @prntCd="setPrntCd" />
        </div>
      </div>
      <div class="realgrid_container realgrid_container14">
        <div class="real_head">
          <div class="real_head_left">
            <span class="subTitle">{{ $t('message.distrNm') }}</span>
            <small class="ml-10">
              {{ $t('message.totalSelection1') }}
              <i>{{ listRowsLv2.length }}</i>
              {{ $t('message.totalSelection2') }}
            </small>
          </div>
          <div class="real_head_right">
            <button class="btn_default btn_function" @click="addRow('areaCodeLv2', 1)" :disabled="prntCd == ''">{{ $t('message.btnAdd') }}</button>
            <button class="btn_default btn_function" @click="getCheckedData('areaCodeLv2')" :disabled="prntCd == ''">{{ $t('message.btnDelete') }}</button>
            <button class="btn_default btn_critical_process" :class="prntCd == '' ? '' : 'btn_deep_green'" @click="getNewAndChangeData('areaCodeLv2')" :disabled="prntCd == ''">{{ $t('message.btnSave') }}</button>
          </div>
        </div>
        <div class="real_body real_body13">
          <AreaManagementGirdLv2 style="height: 100%" ref="areaCodeLv2" :listRows="listRowsLv2" :gridLang="gridLang" />
        </div>
      </div>
    </div>
    <!-- //리얼그리드 -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import languageApi from '@/api/language';
import masterApi from '@/api/master/master';
import AreaManagementGirdLv1 from '@/components/gridView/master/AreaManagementGirdLv1';
import AreaManagementGirdLv2 from '@/components/gridView/master/AreaManagementGirdLv2';

export default {
  components: {
    AreaManagementGirdLv1,
    AreaManagementGirdLv2,
  },
  props: ['authButton', 'savePage', 'menuId', 'page', 'openInfo', 'routerPath'],
  data() {
    return {
      listRowsLv1: [],
      listRowsLv2: [],
      gridLang: [],
      prntCd: '',
    };
  },
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  methods: {
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
    async getCommonCodeListAreaLv1() {
      try {
        const param = {
          prntCd: '',
        };
        const resp = await masterApi.getCommonCodeListAreaLv1(param);
        this.listRowsLv1 = resp.data.ds;
        this.$refs.areaCodeLv1.initDisptRow();
        if (this.listRowsLv1.length !== 0) this.setPrntCd(this.listRowsLv1[0].code);
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getCommonCodeListAreaLv2(prntCd) {
      try {
        const param = {
          prntCd,
        };
        const resp = await masterApi.getCommonCodeListAreaLv2(param);
        this.listRowsLv2 = resp.data.ds;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    setPrntCd(prntCd) {
      this.prntCd = prntCd;
    },
    addRow(grid, num) {
      if (grid == 'areaCodeLv2' && this.prntCd == '') {
        this.$EventBus.$emit('openYesModal', 'message.msgValidSelectArea');
      } else {
        this.$refs[grid].addRow(num);
      }
    },
    getCheckedData(grid) {
      const rows = this.$refs[grid].getCheckedData();
      const removeRow = rows.filter(r => r.groupCd !== undefined);

      if (removeRow.length > 0) {
        this.removeCommonCodeList(grid, removeRow);
      } else {
        // 코드가 빈값이면 그냥 삭제, 남은 로우만 삭제 처리
        this.$refs[grid].deleteRows();
      }
    },
    getNewAndChangeData(grid) {
      const rows = this.$refs[grid].getNewAndChangeData();

      rows.forEach(element => {
        element.groupCd = 'VNM_CITY';
        element.groupNm = '베트남 구군';
        if (element.useYn == undefined) element.useYn = 'N';
        if (element.sort == undefined) element.sort = 99;

        if (grid == 'areaCodeLv2') {
          element.prntCd = this.prntCd;
          element.cdLvl = 2;
        }
      });

      this.setCommonCodeList(grid, rows);
    },
    async setCommonCodeList(grid, rows) {
      try {
        const param = rows;
        const resp = await masterApi.putCommonCodeListAreaSave(param);
        this.$EventBus.$emit('openYesModal', resp.data.message);

        this.gridReload(grid);
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async removeCommonCodeList(grid, rows) {
      try {
        const param = rows;
        const resp = await masterApi.putCommonCodeListAreaRemove(param);
        this.$EventBus.$emit('openYesModal', resp.data.message);

        this.gridReload(grid);
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    gridReload(grid) {
      if (grid == 'areaCodeLv1') {
        this.getCommonCodeListAreaLv1();
      } else {
        this.getCommonCodeListAreaLv2(this.prntCd);
      }
    },
    /*
    onItemAllChecked(grid, checked) {

      this.sendCheckedData();
      checked;
      const checkedRows = this.realGrid.gridView.getCheckedRows(false);
      this.checkedCount = checkedRows.length;
    },
    */
  },
  watch: {
    prntCd() {
      this.getCommonCodeListAreaLv2(this.prntCd);
    },
  },

  created() {},
  mounted() {
    this.getRouterLanguage();
    this.getCommonCodeListAreaLv1();
  },
  destroyed() {},
};
</script>

<style scoped>
.subTitle {
  font-size: 1em;
  font-weight: bold;
}
.checkbox-label {
  display: block;
}
</style>
