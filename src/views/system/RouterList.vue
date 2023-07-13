<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.searchWord') }}</span>
              <input type="text" id="postal_code" style="width: 100%" class="t-l" :placeholder="$t('message.msgPlaceProgram')" v-model="filter" ref="filter" @keyup.enter="getRouterPathList(filter)" />
            </label>
            <div style="display: flex; margin-left: auto">
              <button class="btn_reset" style="margin-right: 10px" @click="reset()">{{ $t('message.btnInit') }}</button>
              <button class="btn_search_text" @click="getRouterPathList(filter)">{{ $t('message.btnSearch') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- //검색필터 영역 -->

    <div class="setting_section" style="height: calc(100% - 56px)">
      <div class="program_box">
        <div class="content_head">
          <span class="subTitle">{{ $t('message.programList') }}</span>
          <div class="btn_box">
            <button class="btn_default btn_function" @click="addRow()">{{ $t('message.btnAdd') }}</button>
            <button class="btn_default btn_function" @click="getCheckedData()">{{ $t('message.btnDelete') }}</button>
            <button class="btn_default btn_critical_process" @click="getNewAndChangeData()">{{ $t('message.btnSave') }}</button>
          </div>
        </div>
        <div style="width: 100%; height: calc(100% - 50px)">
          <RouterListGrid ref="routerListGrid" :routerList="routerPathList" :gridLang="gridLang" />
        </div>

        <!-- <div class="table">
          
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import systemApi from '@/api/system/system';
import RouterListGrid from '@/components/gridView/system/RouterListGrid';
import languageApi from '@/api/language';
import { mapGetters } from 'vuex';
export default {
  props: ['authButton', 'savePage', 'menuId', 'page', 'openInfo', 'routerPath'],
  components: {
    RouterListGrid,
  },
  data() {
    return {
      selectRouterPathList: [],
      routerPathList: [],
      filter: '',
      gridLang: [],
    };
  },
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  methods: {
    async getGridMutiLanguage() {
      try {
        const resp = await languageApi.getRouterLanguage(this.routerPath, this.menuId, this.userLocale, 'Y');
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
    reset() {
      this.filter = '';
    },
    async getRouterPathList(filter = '') {
      this.$refs.filter.blur();
      try {
        const param = {
          filter,
        };
        const resp = await systemApi.getRouterPathList(param);
        this.routerPathList = resp.data.ds;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    getNewAndChangeData() {
      const rows = this.$refs.routerListGrid.getNewAndChangeData();
      let validation = false;
      for (let index = 0; index < rows.length; index++) {
        if (rows[index].progNm === '' || !rows[index].progNm) {
          validation = true;
          this.$EventBus.$emit('openYesModal', 'message.msgValidProgNm');
          break;
        } else if (rows[index].progPh === '' || !rows[index].progPh) {
          validation = true;
          this.$EventBus.$emit('openYesModal', 'message.msgValidPath');
          break;
        }
      }
      if (!validation) {
        this.setRouterPath(rows);
      }
    },
    getCheckedData() {
      const rows = this.$refs.routerListGrid.getCheckedData();
      const notExsitProgInfoIndex = [];
      rows.forEach((row, index) => {
        if (!row.progCd || !row.progNm || !row.progPh || row.progCd === '' || row.progNm === '' || row.progPh === '') {
          notExsitProgInfoIndex.push(index);
        }
      });
      notExsitProgInfoIndex.sort((num1, num2) => {
        return num2 - num1;
      });

      notExsitProgInfoIndex.forEach(num => {
        rows.splice(num, 1);
      });
      if (rows.length > 0) {
        this.setRouterPath(rows);
      }
      this.$refs.routerListGrid.deleteRows();
    },
    async setRouterPath(rows) {
      try {
        // const param = [];
        // rows.forEach(list => {
        //   param.push({
        //     progCd: list.progCd,
        //     progNm: list.progNm,
        //     progPh: list.progPh,
        //     remark: list.remark,
        //     __created__: list.__created__,
        //     __deleted__: list.__deleted__,
        //     __modified__: list.__modified__,
        //   });
        // });
        const resp = await systemApi.setRouterPath(rows);
        this.$EventBus.$emit('openYesModal', resp.data.message);
        this.getRouterPathList(this.filter);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    addRow() {
      this.$refs.routerListGrid.addRow();
    },
  },
  created() {},
  mounted() {
    this.getRouterPathList();
    this.getGridMutiLanguage();
  },
  destroyed() {},
};
</script>

<style></style>
