<template>
  <div>
    <div class="setting_section">
      <div class="language_box language_box02">
        <p class="language_box_title">{{ $t('message.routerLangDictionary') }}</p>
        <div class="language_box_search">
          <label class="radio_t">
            <input type="radio" name="radio" v-model="searchLangCls" value="" />
            <span class="checkmark"></span>
            {{ $t('message.all') }}
          </label>
          <label class="radio_t">
            <input type="radio" name="radio" v-model="searchLangCls" value="LABEL" />
            <span class="checkmark"></span>
            {{ $t('message.label') }}
          </label>
          <label class="radio_t">
            <input type="radio" name="radio" v-model="searchLangCls" value="BUTTON" />
            <span class="checkmark"></span>
            {{ $t('message.button') }}
          </label>
          <label class="radio_t">
            <input type="radio" name="radio" v-model="searchLangCls" value="GRID" />
            <span class="checkmark"></span>
            {{ $t('message.grid') }}
          </label>
          <label class="radio_t">
            <input type="radio" name="radio" v-model="searchLangCls" value="MESSAGE" />
            <span class="checkmark"></span>
            {{ $t('message.message') }}
          </label>

          <input type="text" :placeholder="$t('message.msgPlaceDictionary')" v-model="filter" ref="filter" @keyup.enter="getLanguageLangList()" />
          <button class="btn_default btn_function" @click="resetSearch()">{{ $t('message.btnInit') }}</button>
          <button class="btn_default btn_print_fuction" @click="getLanguageLangList()">{{ $t('message.btnSearch') }}</button>
          <button class="btn_default btn_function" @click="removeRow()">{{ $t('message.btnDelete') }}</button>
        </div>
        <div class="" style="height: 100%">
          <LanguageLangGrid ref="languageLangGrid" :languageLangList="languageLangList" @sendLangOne="getLangOne" :gridLang="gridLang" />
        </div>
      </div>
      <div class="language_box language_box03">
        <!-- <p class="language_box_title">단어사전</p> -->
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 100px" />
              <col style="width: " />
              <col style="width: 100px" />
              <col style="width: " />
            </colgroup>
            <tbody>
              <tr>
                <th class="essential" style="display: table-cell">{{ $t('message.category') }}</th>
                <td class="t-l">
                  <div class="form_input">
                    <MultiSelect style="width: 100%" v-model="langCls" :options="langClsOptions" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="" :allow-empty="false"></MultiSelect>
                  </div>
                </td>
                <th class="essential" style="display: table-cell">{{ $t('message.formKey') }}</th>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" v-model="langOne.formKey" /></div>
                </td>
              </tr>
              <tr>
                <th class="essential" style="display: table-cell">{{ $t('message.kor') }}</th>
                <td class="t-l" colspan="3">
                  <div class="form_input"><input type="text" style="width: 100%" v-model="langOne.kor" /></div>
                </td>
              </tr>
              <tr>
                <th class="essential" style="display: table-cell">{{ $t('message.eng') }}</th>
                <td class="t-l" colspan="3">
                  <div class="form_input"><input type="text" style="width: 100%" v-model="langOne.eng" /></div>
                </td>
              </tr>
              <tr>
                <th class="essential" style="display: table-cell">{{ $t('message.vnm') }}</th>
                <td class="t-l" colspan="3">
                  <div class="form_input"><input type="text" style="width: 100%" v-model="langOne.vnm" /></div>
                </td>
              </tr>
              <tr>
                <th class="" style="display: table-cell">{{ $t('message.remark') }}</th>
                <td class="t-l" colspan="3">
                  <div class="form_input"><input type="text" style="width: 100%" v-model="langOne.remark" /></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="language_box_search_02">
          <button class="btn_default btn_function" @click="resetSetLangOne()">{{ $t('message.btnInit') }}</button>
          <button class="btn_default btn_function" @click="setLanguageLang('add')">{{ $t('message.btnAdd') }}</button>
          <button class="btn_default btn_critical_process" @click="setLanguageLang('save')">{{ $t('message.btnSave') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import languageApi from '@/api/language';
import LanguageLangGrid from '@/components/gridView/system/LanguageLangGrid';
import systemApi from '@/api/system/system';

export default {
  props: ['authButton', 'savePage', 'menuId', 'page', 'openInfo', 'routerPath'],
  components: { LanguageLangGrid },
  data() {
    return {
      //template: ItemTemplate,
      langCls: '',
      langClsOptions: ['LABEL', 'BUTTON', 'GRID', 'MESSAGE'],
      filter: '',
      languageLangList: [],
      langOne: {},
      removeLangList: [],
      searchLangCls: '',
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
    resetSearch() {
      this.langCls = '';
      this.filter = '';
      this.languageLangList = [];
      this.langOne = {};
      this.searchLangCls = '';
      this.getLanguageLangList();
    },
    async getLanguageLangList() {
      this.$refs.filter.blur();
      try {
        const param = {
          filter: this.filter,
          searchLangCls: this.searchLangCls,
          formKey: '',
        };
        const resp = await systemApi.getLanguageLangList(param);
        this.languageLangList = resp.data.ds;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    resetSetLangOne() {
      this.langOne = {};
      this.langCls = '';
    },
    getLangOne(row) {
      this.langOne = row;
      this.langCls = this.langOne.langCls;
    },
    validation() {
      if (!this.langCls || this.langCls === '') {
        this.$EventBus.$emit('openYesModal', 'message.errorsValidLangCls');
        return false;
      } else if (!this.langOne.formKey || this.langOne.formKey === '') {
        this.$EventBus.$emit('openYesModal', 'message.errorsValidFormKey');
        return false;
      } else if (!this.langOne.kor || this.langOne.kor === '') {
        this.$EventBus.$emit('openYesModal', 'message.errorsValidKor');
        return false;
      } else if (!this.langOne.eng || this.langOne.eng === '') {
        this.$EventBus.$emit('openYesModal', 'message.errorsValidEng');
        return false;
      } else if (!this.langOne.vnm || this.langOne.vnm === '') {
        this.$EventBus.$emit('openYesModal', 'message.errorsValidVnm');
        return false;
      } else {
        return true;
      }
    },
    async setLanguageLang(type) {
      if (this.validation()) {
        try {
          const param = [];
          this.langOne.langCls = this.langCls;
          if (type === 'add') {
            delete this.langOne['id'];
          }
          param.push(this.langOne);

          const resp = await systemApi.setLanguageLang(param);
          this.$EventBus.$emit('openYesModal', resp.data.message);
          this.getLanguageLangList();
          this.resetSetLangOne();
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
    removeRow() {
      this.removeLangList = this.$refs.languageLangGrid.getCheckedData();
      if (this.removeLangList.length > 0) {
        this.removeLanguageLang();
      }
    },
    async removeLanguageLang() {
      try {
        const resp = await systemApi.removeLanguageLang(this.removeLangList);
        this.$EventBus.$emit('openYesModal', resp.data.message);
        this.getLanguageLangList();
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
  created() {},
  mounted() {
    this.getLanguageLangList();
    this.getGridMutiLanguage();
  },
  destroyed() {},
};
</script>

<style></style>
