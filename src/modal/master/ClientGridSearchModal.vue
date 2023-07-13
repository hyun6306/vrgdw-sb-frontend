<template>
  <modal :name="`ClientGridSearchModal${page}`" width="1450" height="800" :adaptive="true" @before-open="open">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="close()"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.custSearch') }}</p>
      <div class="modal_content dr_content">
        <div class="search_content">
          <div class="search_box">
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.custGroup') }}</span>
                  <MultiSelect id="" style="width: 100%" v-model="custGroup" :options="custClSelect" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.closeYn') }}</span>
                  <MultiSelect id="" class="" style="width: 100%" v-model="useYn" :options="useYnSelect" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
                </label>
                <div style="display: flex; margin-left: auto">
                  <button class="btn_search_text_row btn_reset" style="margin-right: 10px" @click="reset()">{{ $t('message.btnInit') }}</button>
                  <button class="btn_search_text_row" @click="clientListSearch(filter)">{{ $t('message.btnSearch') }}</button>
                </div>
              </div>
            </div>
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.searchWord') }}</span>
                  <input type="text" id="postal_code" style="" class="" v-model="filter" :placeholder="$t('message.msgInputCustom')" @keyup.enter="clientListSearch(filter)" ref="filter" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- 리얼그리드 -->
        <div class="realgrid_container modal_realgrid02">
          <div class="real_body">
            <SalesCustomGrid style="height: 100%" :gridName="'SalesCustomGrid'" ref="SalesCustomGrid" :salesSearchList="salesSearchList" :gridLang="gridLang" :type="type" @sendRowDbClick="sendRowDbClick" />
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
import SalesCustomGrid from '@/components/gridView/master/SalesCustomGrid';
import commonApi from '@/api/common';

export default {
  components: { SalesCustomGrid },
  props: {
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
      clientList: [],
      type: 'client',
      selectRow: [],
      custGroup: '',
      useYn: '',
      custClSelect: [],
      useYnSelect: [
        { text: this.$t('message.all'), value: '' },
        { text: 'Y', value: 'Y' },
        { text: 'N', value: 'N' },
      ],
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
      this.$emit('sendClientRow', this.selectRow);
      this.closePopUp();
    },
    async open(event) {
      await this.getRouterLanguage();
      this.custGroup = this.custClSelect[0];
      this.useYn = this.useYnSelect[0];
      if (event.params && event.params.saleNm) {
        this.filter = event.params.saleNm;
      }
      await this.clientListSearch();
    },
    async clientListSearch(filter = '', type = '') {
      // this.$refs.SalesCustomGrid.gridCommit();
      try {
        if (type != 'info') this.$refs.filter.blur();
        const param = {
          custType: this.custGroup.value,
          useYn: this.useYn.value,
          custId: '',
          filter: filter,
        };
        const response = await masterApi.salesCustomerSearch(param);
        if (type === 'info') {
          this.$emit('sendClientRow', response.data.ds);
          if (response.data.ds.length > 1) {
            this.clientList = response.data.ds;
          }
        } else {
          this.clientList = response.data.ds;
        }
        this.salesSearchList = this.clientList;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    closePopUp() {
      this.clientList = [];
      this.salesSearchList = [];
      this.custGroup = this.custClSelect[0];
      this.useYn = this.useYnSelect[0];
      this.filter = '';
      this.$modal.hide(`ClientGridSearchModal${this.page}`);
    },
    reset() {
      this.custGroup = this.custClSelect[0];
      this.useYn = this.useYnSelect[0];
      this.filter = '';
    },
    confirm() {
      this.selectRow = [];
      this.selectRow = this.$refs.SalesCustomGrid.sendCheckedData();
      this.$emit('sendClientRow', this.selectRow);
      this.closePopUp();
    },
    close() {
      this.$emit('sendClientRow', '');
      this.closePopUp();
    },
    async comboList() {
      const param = {
        groupCd: 'CUST_TYPE',
        useYn: 'Y',
        prntCd: '',
      };
      try {
        const resp = await commonApi.getCommonCodeCombo(param);
        const all = { text: this.$t('message.all'), value: '' };
        this.custClSelect = resp.data.ds;
        this.custClSelect.unshift(all);
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
    this.comboList();
    // this.clientListSearch();
  },
};
</script>

<style></style>
