<template>
  <modal :name="`SalesGridModal${modalNm}`" width="1210" height="600" :adaptive="true" @before-open="open">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="close()"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.salesSearch') }}</p>
      <div class="modal_content dr_content">
        <div class="search_content">
          <div class="search_box">
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.compNm') }}</span>
                  <div class="form_input">
                    <input type="text" class="w_100 t-l disabled" placeholder="" disabled v-model="compCd.text" />
                  </div>
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.searchWord') }}</span>
                  <input type="text" id="postal_code" style="" class="" v-model="filter" :placeholder="$t('message.msgInputCustom')" @keyup.enter="salesListSearch(filter)" ref="filter" />
                </label>
                <button class="btn_search_text_row btn_reset" @click="reset()">{{ $t('message.btnInit') }}</button>
                <button class="btn_search_text_row ml-5" @click="salesListSearch(filter)">{{ $t('message.btnSearch') }}</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 리얼그리드 -->
        <div class="realgrid_container modal_realgrid02">
          <div class="real_body">
            <SalesGrid style="height: 100%" :gridName="'SalesGrid'" ref="SalesGrid" :salesSearchList="salesSearchList" :gridLang="gridLang" :page="page" @sendRowDbClick="sendRowDbClick" :type="type" />
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
import commonApi from '@/api/common';
import languageApi from '@/api/language';
import masterApi from '@/api/master/master';
import SalesGrid from '@/components/gridView/master/SalesGrid';

export default {
  components: { SalesGrid },
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
      filter: '',
      salesList: [],
      type: 'sales',
      selectRow: [],
      compCdOptions: [],
      compCd: '',
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
      this.$emit('sendSalesRow', this.selectRow);
      this.closePopUp();
    },
    async open(event) {
      await this.getRouterLanguage();
      if (event.params && event.params.saleNm) {
        this.filter = event.params.saleNm;
      }
      await this.salesListSearch();
    },
    async salesListSearch(filter = '', type = '') {
      // this.$refs.SalesGrid.gridCommit();
      try {
        if (type != 'info') this.$refs.filter.blur();
        const param = {
          compCd: this.compCd.value,
          filter: filter,
        };
        const response = await masterApi.salesSearch(param);
        if (type === 'info') {
          this.$emit('sendSalesRow', response.data.ds);
          if (response.data.ds.length > 1) {
            this.salesList = response.data.ds;
          }
        } else {
          this.salesList = response.data.ds;
        }
        this.salesSearchList = this.salesList;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    closePopUp() {
      this.salesList = [];
      this.salesSearchList = [];
      this.reset();
      this.$modal.hide(`SalesGridModal${this.modalNm}`);
    },
    reset() {
      this.filter = '';
    },
    confirm() {
      this.selectRow = [];
      this.selectRow = this.$refs.SalesGrid.sendCheckedData();
      this.$emit('sendSalesRow', this.selectRow);
      this.closePopUp();
    },
    close() {
      this.$emit('sendSalesRow', '');
      this.closePopUp();
    },
    async getCommonCodeCombo() {
      const param = {
        groupCd: 'COMP_CD',
        useYn: 'Y',
        prntCd: '',
      };
      try {
        const response = await commonApi.getCommonCodeCombo(param);
        this.compCdOptions = response.data.ds;
        this.compCd = this.compCdOptions[0];
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
    this.getCommonCodeCombo();
  },
};
</script>

<style></style>
