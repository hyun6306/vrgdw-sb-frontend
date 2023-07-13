<template>
  <modal :name="`PropertyCodeModal${page}`" width="1210" height="800" :adaptive="true" @before-open="getGridMutiLanguage" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide(`PropertyCodeModal${page}`)"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.registCodeProperty') }}</p>
      <div class="modal_content dr_content">
        <div class="search_content">
          <!-- <p class="search_title">메인코드 정보</p> -->

          <div class="search_box">
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.cdNm') }}</span>
                  <div class="form_input">
                    <input type="text" id="" style="width: 50%" class="t-l" disabled :placeholder="row.groupNm" />
                    <i></i>
                    <input type="text" id="" style="width: 50%" class="t-l" disabled :placeholder="row.groupNm" />
                  </div>
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.clsCd') }}</span>
                  <div class="form_input">
                    <input type="text" id="" style="width: 100%" class="t-l" disabled :placeholder="row.groupCd" />
                  </div>
                </label>
              </div>
              <div class="filter_list">
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.clsNm') }}</span>
                  <div class="form_input">
                    <input type="text" id="" style="100%" class="t-l" disabled :placeholder="row.groupNm" />
                  </div>
                </label>
                <label for="" class="filter_type">
                  <span class="filter_type_title">{{ $t('message.code') }}</span>
                  <div class="form_input">
                    <input type="text" id="" style="100%" class="t-l" disabled :placeholder="row.code" />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- 검색 버튼 클릭시 on 클래스 추가-->
        <!-- 리프레시 버튼 클릭시 on클래스 삭제-->
        <!-- 리얼그리드 -->
        <div class="realgrid_container">
          <div class="program_box">
            <div class="content_head">
              <span v-if="page == 'productChartList'" class="content_title">{{ $t('message.itemManageList') }}</span>
              <span v-else class="content_title">{{ $t('message.cmmCdList') }}</span>
              <div class="btn_box">
                <button class="btn_default btn_function" @click="addRow(2, row)">{{ $t('message.btnAdd') }}</button>
                <button class="btn_default btn_function" @click="deleteRow()">{{ $t('message.btnDelete') }}</button>
                <button class="btn_default btn_function" @click="getNewAndChangeData()">{{ $t('message.btnSave') }}</button>
              </div>
            </div>
          </div>

          <div class="" style="width: 100%; height: calc(100% - 52px)">
            <CommonCodeGridSlave ref="commonCodeGrid" :commonCodeList="commonCodeList" :gridLang="gridLang" :validation="commonCodeListValidation" />
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapGetters } from 'vuex';
import CommonCodeGridSlave from '@/components/gridView/system/CommonCodeGridSlave';
import systemApi from '@/api/system/system';
import commonJs from '@/mixins/system/common';
import languageApi from '@/api/language';
import masterApi from '@/api/master/master';

export default {
  components: { CommonCodeGridSlave },
  name: 'PropertyCodeModal',
  props: ['row', 'authButton', 'menuId', 'page'],
  mixins: [commonJs],
  watch: {
    row() {
      this.getCommonCodeList(this.row.groupCd, this.row.groupNm, '', '', this.row.code, this.row.cdLvl + 1);
    },
  },
  data() {
    return {
      commonCodeList: [],
      gridLang: [],
      type: 'Modal',
      commonCodeListValidation: ['code', 'korCdNm', 'engCdNm', 'vnmCdNm', 'sort'],
      backUpCommonCodeList: [],
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
        const resp = await languageApi.getRouterLanguage('/modal/propertyCode', this.menuId, this.userLocale, 'Y');
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
    async getCommonCodeList(groupCd = '', groupNm = '', filter = '', useYn = '', prntCd = '', cdLvl = '') {
      try {
        const param = {
          groupCd,
          groupNm,
          filter,
          useYn,
          prntCd,
          cdLvl,
        };
        let resp = '';
        if (this.page == 'productChartList') {
          resp = await masterApi.getProductChartList(param);
        } else {
          resp = await systemApi.getCommonCodeList(param);
        }
        this.commonCodeList = resp.data.ds;
        this.backUpCommonCodeList = JSON.parse(JSON.stringify(this.commonCodeList));
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    deleteRow() {
      this.$refs.commonCodeGrid.deleteRows();
    },
  },
  mounted() {},
  destroyed() {},
};
</script>

<style></style>
