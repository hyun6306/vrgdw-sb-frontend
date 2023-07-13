<template>
  <modal :name="`SalesTeamGridModal${modalNm}`" width="800" height="500" :adaptive="true" @before-open="open">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="close()"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.salesTeamSearch') }}</p>
      <div class="modal_content dr_content">
        <div class="search_content">
          <div class="search_box">
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="" class="filter_type">
                  <input type="text" id="postal_code" style="" class="" v-model="filter" :placeholder="$t('message.msgInputCustom')" @keyup.enter="teamListSearch(filter)" ref="filter" />
                </label>
                <button class="btn_search_text_row btn_reset" @click="reset()">{{ $t('message.btnInit') }}</button>
                <button class="btn_search_text_row ml-5" @click="teamListSearch(filter)">{{ $t('message.btnSearch') }}</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 리얼그리드 -->
        <div class="realgrid_container modal_realgrid02">
          <div class="real_body">
            <SalesTeamGrid style="height: 100%" :gridName="'SalesTeamGrid'" ref="SalesTeamGrid" :salesSearchList="salesSearchList" :gridLang="gridLang" :type="type" @sendRowDbClick="sendRowDbClick" />
          </div>
          <div class="modal_btn_contents_t05">
            <button class="btn_default" @click="close()">{{ $t('message.btnCancel') }}</button>
            <button class="btn_primary" @click="confirm()">{{ $t('message.btnCheck') }}</button>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapGetters } from 'vuex';
import languageApi from '@/api/language';
import masterApi from '@/api/master/master';
import SalesTeamGrid from '@/components/gridView/master/SalesTeamGrid';

export default {
  components: { SalesTeamGrid },
  props: {
    modalNm: {
      type: String,
    },
    page: {
      type: String,
    },
    routerPath: {
      type: String,
    },
    menuId: {
      type: Number,
    },
  },
  data() {
    return {
      salesSearchList: [],
      gridLang: [],
      type: 'team',
      filter: '',
      salesTeamList: [],
      selectRow: [],
    };
  },
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  methods: {
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
    sendRowDbClick(selectRow) {
      this.selectRow = [];
      this.selectRow = selectRow;
      this.$emit('sendTeamRow', this.selectRow);
      this.closePopUp();
    },
    async open(event) {
      await this.getRouterLanguage();
      if (event.params && event.params.saleTeamNm) {
        this.filter = event.params.saleTeamNm;
      }
      await this.teamListSearch();
    },
    async teamListSearch(filter = '', type = '') {
      // this.$refs.SalesTeamGrid.gridCommit();
      try {
        if (type != 'info') this.$refs.filter.blur();
        const param = { filter: filter };
        const response = await masterApi.salesTeamSearch(param);
        if (type === 'info') {
          this.$emit('sendTeamRow', response.data.ds);
          if (response.data.ds.length > 1) {
            this.salesTeamList = response.data.ds;
          }
        } else {
          this.salesTeamList = response.data.ds;
        }
        this.salesSearchList = this.salesTeamList;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    closePopUp() {
      this.salesTeamList = [];
      this.salesSearchList = [];
      this.filter = '';
      this.$modal.hide(`SalesTeamGridModal${this.modalNm}`);
    },
    reset() {
      this.filter = '';
    },
    confirm() {
      this.selectRow = [];
      this.selectRow = this.$refs.SalesTeamGrid.sendCheckedData();
      this.$emit('sendTeamRow', this.selectRow);
      this.closePopUp();
    },
    close() {
      this.$emit('sendTeamRow', '');
      this.closePopUp();
    },
  },
  mounted() {},
  destroyed() {},
};
</script>

<style></style>
