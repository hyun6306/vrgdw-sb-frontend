<template>
  <div>
    <!-- 검색필터 영역 -->
    <!-- <div class="search_content"></div> -->
    <!-- //검색필터 영역 -->

    <div class="setting_section">
      <div class="language_box">
        <p class="language_box_title">{{ $t('message.routerAddrAdd') }}</p>
        <div class="language_box_search">
          <input type="text" style="width: 75%" :placeholder="$t('message.msgPlaceLanguage')" v-model="filter" ref="filter" @keyup.enter="getRouterUrlLanguageList" />
          <button class="btn_default btn_function" @click="[(filter = ''), getRouterUrlLanguageList()]">{{ $t('message.btnInit') }}</button>
          <button class="btn_default btn_print_fuction" @click="getRouterUrlLanguageList">{{ $t('message.btnSearch') }}</button>
          <!--          <button class="btn_default btn_function">{{ $t('message.btnDelete') }}</button>-->
        </div>
        <div class="table bottom_line">
          <table>
            <colgroup>
              <col style="width: 50px" />
              <col style="width: 50px" />
              <col style="width: 150px" />
              <col style="width: " />
            </colgroup>
            <thead>
              <tr>
                <th>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </th>
                <th>{{ $t('message.no') }}</th>
                <th>{{ $t('message.routerNm') }}</th>
                <th>{{ $t('message.routerPath') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(url, index) in urlList" :key="index">
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>{{ index + 1 }}</td>
                <td class="t-l" @click="getUrlLangList(url)">{{ url.routerNm }}</td>
                <td class="t-l" @click="getUrlLangList(url)">{{ url.routerPath }}</td>
              </tr>
            </tbody>
          </table>
          <div class="not_search_result t-c" style="width: 100%; height: auto; font-size: 18px; font-weight: 700; padding: 50px 0; color: #333" v-if="urlList && urlList.length === 0">{{ $t('message.errorsCustCdNotFound') }}</div>
        </div>
      </div>
      <div class="language_box language_box04">
        <!-- <p class="language_box_title">단어사전</p> -->
        <div class="table bottom_line pa-01">
          <table>
            <colgroup>
              <col style="width: 100px" />
              <col style="width: " />
              <col style="width: 100px" />
              <col style="width: " />
            </colgroup>
            <tbody>
              <tr>
                <th class="essential" style="display: table-cell">{{ $t('message.routerNm') }}</th>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" v-model="chooseRouterInfo.routerNm" /></div>
                </td>
                <th class="essential" style="display: table-cell">{{ $t('message.routerPath') }}</th>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" v-model="chooseRouterInfo.routerPath" /></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="language_box_search_02 pa-02">
          <button class="btn_default btn_function" v-if="!isShowFormKey" @click="showFormKey">{{ $t('message.btnShowFormkey') }}</button>
          <button class="btn_default btn_function" v-else @click="showFormKey">{{ $t('message.btnDisableFormkey') }}</button>
          <button class="btn_default btn_function" @click="getLangFind()">{{ $t('message.btnReloadLanguage') }}</button>
          <button class="btn_default btn_process" @click="addLang">{{ $t('message.btnAdd') }}</button>
          <button class="btn_default btn_function" @click="deleteLang">{{ $t('message.btnDelete') }}</button>
        </div>
        <div class="table tabel_650 bottom_line pa-03">
          <table>
            <colgroup>
              <col style="width: 30px" />
              <!-- <col style="width: 120px" /> -->
              <col style="width: 150px" />
              <col style="width: " />
            </colgroup>
            <tbody>
              <tr v-for="(lang, index) in urlLangList" :key="index">
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" v-model="lang.checked" true-value="Y" false-value="N" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <!-- <td>
                  <div class="form_input"><input type="text" style="width: 100%" v-model="lang.langCls" disabled /></div>
                </td> -->
                <td>
                  <div class="form_input" @click="copyToClipboard(`${lang.formKey}`)"><input type="text" style="width: 100%" v-model="lang.formKey" disabled /></div>
                </td>
                <td class="t-l">
                  <div class="form_input" style="width: 100%" @click="clicked(lang, true)" v-if="!lang.clicked">
                    <p v-if="lang.langCls">[{{ lang.langCls }}] {{ lang.text }} / {{ lang.formKey }}</p>
                    <p v-else>Click</p>
                    <!--                    <MultiSelect v-else style="100%;" track-by="text" label="text" id="ajax" v-model="urlLangList[index]" :options="langList" :close-on-select="true" :show-labels="false" placeholder="" :allow-empty="false" :searchable="true" :loading="isLoading" :internal-search="false" :show-no-results="false" @search-change="callGetLangFind"> </MultiSelect>-->
                  </div>
                  <div class="form_input" v-else>
                    <!--                    <MultiSelect v-else style="100%;" track-by="text" label="text" id="ajax" v-model="urlLangList[index]" :options="langList" :close-on-select="true" :show-labels="false" placeholder="" :allow-empty="false" :searchable="true" :loading="isLoading" :internal-search="false" :show-no-results="false" @search-change="callGetLangFind"> </MultiSelect>-->
                    <MultiSelect style="100%;" label="text" v-model="urlLangList[index]" :options="langList" :custom-label="nameWithLang" :close-on-select="true" :show-labels="false" placeholder="" :allow-empty="false" :searchable="true" @close="clicked(lang, false)"> </MultiSelect>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="language_box_search_02 pa-04">
          <button class="btn_default btn_function" @click="reset">{{ $t('message.btnInit') }}</button>
          <button class="btn_default btn_critical_process" @click="saveRouterLang">{{ $t('message.btnSave') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import systemApi from '@/api/system/system';
import _ from 'lodash';
import { writeTextClipboard } from '@/mixins/clipBoard';

export default {
  components: {},
  data() {
    return {
      filter: '',
      urlList: [],
      chooseRouterInfo: {},
      urlLangList: [],
      langList: [],
      isLoading: false,
      this_: this,
      isShowFormKey: false,
    };
  },

  methods: {
    async getRouterUrlLanguageList() {
      this.$refs.filter.blur();
      try {
        const param = {
          filter: this.filter,
        };

        const resp = await systemApi.getRouterUrlLanguageList(param);

        if (resp.data.status === 200) {
          this.urlList = resp.data.ds;
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
    async getUrlLangList(url) {
      try {
        const param = {
          routerPath: url.routerPath,
          langCls: '',
        };

        const resp = await systemApi.getListOfRouterUrlSetLang(param);
        if (resp.data.status === 200) {
          this.chooseRouterInfo = {
            routerPath: url.routerPath,
            routerNm: url.routerNm,
          };
          this.urlLangList = resp.data.rs.language;
          this.urlLangList.forEach(list => {
            list.clicked = false;
          });
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
    async getLangFind(filter = '') {
      this.isLoading = true;
      try {
        const param = {
          filter,
        };

        const resp = await systemApi.getLangFind(param);
        if (resp.data.result) {
          this.langList = resp.data.ds;
        }
        this.isLoading = false;
      } catch (e) {
        console.log(e);
        this.isLoading = false;
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    callGetLangFind: _.debounce(function (filter) {
      this.getLangFind(filter);
    }, 300),
    addLang() {
      this.urlLangList.push({});
    },
    deleteLang() {
      let deleteIndex = [];
      this.urlLangList.forEach((list, index) => {
        if (list.checked && list.checked === 'Y') {
          deleteIndex.push(index);
        }
      });
      deleteIndex.sort((num1, num2) => {
        return num2 - num1;
      });

      deleteIndex.forEach(num => {
        this.urlLangList.splice(num, 1);
      });
    },
    reset() {
      this.chooseRouterInfo = {};
      this.urlLangList = [];
    },
    async saveRouterLang() {
      try {
        let languageList = [];
        this.urlLangList.forEach(list => {
          let language = { formKey: list.formKey };
          if (list.languageId) {
            language['id'] = list.languageId;
          } else if (list.id) {
            language['id'] = list.id;
          }
          languageList.push(language);
        });
        const param = {
          ...this.chooseRouterInfo,
          languageList,
        };

        const resp = await systemApi.setRouterUrlLanguage(param);
        this.$EventBus.$emit('openYesModal', resp.data.message);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    nameWithLang({ formKey, langCls, text }) {
      if (this.isShowFormKey) {
        if (langCls) {
          return `[${langCls}] ${text} / ${formKey}`;
        } else {
          return;
        }
      } else if (langCls) {
        return `[${langCls}] ${text}`;
      } else {
        return;
      }
    },
    showFormKey() {
      this.isShowFormKey = !this.isShowFormKey;
      this.urlLangList.push({});
      this.urlLangList.pop();
    },
    async copyToClipboard(text) {
      if (!text) return;
      let formKey = _.camelCase(text);
      try {
        await writeTextClipboard(`$t('message.${formKey}')`);
        // message.info('Copied successfully');
      } catch (err) {
        // await errorDialog(err);
      }
    },
    clicked(list, clicked) {
      list.clicked = clicked;
      this.urlLangList.push({});
      this.urlLangList.splice(this.urlLangList.length - 1, 1);
    },
  },
  created() {},
  mounted() {
    this.getRouterUrlLanguageList();
    this.getLangFind();
  },
  destroyed() {},
};
</script>

<style></style>
