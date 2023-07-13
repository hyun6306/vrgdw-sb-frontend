<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.plntCd') }}</span>
              <div class="form_input">
                <input type="text" class="w_100" placeholder="" ref="filter" v-model="plantFilter" @keyup.enter="plantSearch('search')" />
              </div>
            </label>
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.useCls') }}</span>
              <MultiSelect id="Material_Group" style="width: 100%" v-model="useYnValue" :options="useYnOptions" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
            </label>
            <button class="btn_reset" @click="plantSearch('reset')">{{ $t('message.btnInit') }}</button>
            <button class="btn_search_text ml-0" @click="plantSearch('search')">{{ $t('message.btnSearch') }}</button>
          </div>
        </div>
      </div>
    </div>
    <!-- //검색필터 영역 -->

    <!-- 리얼그리드 -->
    <div class="realgrid_container realgrid_container02">
      <div class="real_head">
        <div class="real_head_left">
          <small>
            {{ $t('message.totalSelection1') }} <i>{{ totalRowCount }}</i
            >{{ $t('message.totalSelection2') }}</small
          >
        </div>
        <div class="real_head_right">
          <button class="btn_default btn_function" @click="addRows">{{ $t('message.btnAdd') }}</button>
          <button class="btn_default btn_function" @click="deleteRows">{{ $t('message.btnDelete') }}</button>
          <button class="btn_default btn_critical_process" @click="saveRows">{{ $t('message.btnSave') }}</button>
        </div>
      </div>
      <div class="real_top_filter">
        <div class="real_top_left"></div>
        <div class="real_top_right">
          <button class="btn_default btn_filter" @click="setFilter">
            <!-- <img src="@/assets/img/icon_vertical.png" /> -->
            <span v-if="!filterOn">{{ $t('message.btnFilterOn') }}</span>
            <span v-else>{{ $t('message.btnFilterOff') }}</span>
          </button>
          <button class="btn_default btn_filter" @click="fixGrid('column')">
            <img src="@/assets/img/icon_vertical.png" />
            <span v-if="isFixColumn">{{ $t('message.btnUnfixColumn') }}</span>
            <span v-else>{{ $t('message.btnFixColumn') }}</span>
          </button>
          <button class="btn_default btn_filter" @click="fixGrid('row')">
            <img src="@/assets/img/icon_hori.png" />
            <span v-if="isFixRow">{{ $t('message.btnUnfixRow') }}</span>
            <span v-else>{{ $t('message.btnFixRow') }}</span>
          </button>
          <MultiSelect id="Material_Group" class="btn_select_layout" style="width: 100%" v-model="layoutValue" :options="layoutOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" @input="layoutBtn" label="text"></MultiSelect>
        </div>
      </div>
      <div class="real_body real_body12">
        <PlantListGrid style="height: 100%" ref="PlantListGrid" :gridLang="gridLang" :menuId="menuId" :savePage="savePage" @sendCheckedData="sendCheckedData" @sendRowCount="sendRowCount" />
      </div>
      <div class="real_footer">
        <div class="footer_left"></div>
        <div class="footer_right">
          <!-- <button class="btn_default btn_temp" @click="plantSave">{{ $t('message.btnSave') }}</button> -->
        </div>
      </div>
    </div>
    <!-- //리얼그리드 -->
    <AlarmModal :ment="ment" @okOrNo="okOrNo" />
  </div>
</template>

<script>
import PlantListGrid from '@/components/gridView/master/PlantListGrid';
import { mapGetters } from 'vuex';
import languageApi from '@/api/language';
import masterApi from '@/api/master/master';
import AlarmModal from '@/modal/AlarmModal';

export default {
  components: {
    PlantListGrid,
    AlarmModal,
  },
  data() {
    return {
      filterOn: true,
      //행고정,열고정
      isFixColumn: false,
      isFixRow: false,
      //레이아웃 저장
      layoutValue: { value: 'layout', text: this.$i18n.t('message.btnLayout') },
      layoutOptions: [
        { value: 'save', text: this.$i18n.t('message.btnSave') },
        { value: 'reset', text: this.$i18n.t('message.btnInit') },
      ],
      type: '',
      //
      ment: '',
      gridLang: [],
      checkedData: [],
      totalRowCount: 0,
      //검색,초기화
      useYnValue: { text: this.$i18n.t('message.all'), value: '' },
      useYnOptions: [
        { text: this.$i18n.t('message.all'), value: '' },
        { text: 'Y', value: 'Y' },
        { text: 'N', value: 'N' },
      ],
      plantFilter: '',
      //
    };
  },
  props: {
    savePage: {
      type: Array,
    },
    menuId: {
      type: Number,
    },
    authButton: {
      type: Object,
    },
    routerPath: {
      type: String,
    },
  },
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  watch: {},
  methods: {
    sendCheckedData(data) {
      this.checkedData = data;
    },
    sendRowCount(count) {
      this.totalRowCount = count;
    },
    addRows() {
      this.$refs.PlantListGrid.gridCommit();
      //추가
      this.$refs.PlantListGrid.addRows();
    },
    vaild(param) {
      let vaildCheck = true;
      if (param.plntCd == '') {
        this.$EventBus.$emit('openYesModal', 'message.errorsVaildPlantCd');
        vaildCheck = false;
      } else if (param.plntKorNm == '' || param.plntEngNm == '' || param.plntVnmNm == '') {
        this.$EventBus.$emit('openYesModal', 'message.errorsVaildPlantNm');
        vaildCheck = false;
      } else if (param.savPosCd == '') {
        this.$EventBus.$emit('openYesModal', 'message.errorsVaildSavePosCd');
        vaildCheck = false;
      } else if (param.cityCd == '' || param.distrCd == '') {
        this.$EventBus.$emit('openYesModal', 'message.errorsVaildCity');
        vaildCheck = false;
      } else if (param.addrKor == '' || param.addrEng == '' || param.addrVnm == '') {
        this.$EventBus.$emit('openYesModal', 'message.msgNoAddr');
        vaildCheck = false;
      }
      return vaildCheck;
    },
    async saveRows() {
      this.$refs.PlantListGrid.gridCommit();
      //저장
      let checkedRow = this.$refs.PlantListGrid.sendCheckedData();
      if (checkedRow.length < 1) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoProduct');
      } else if (checkedRow.length > 1) {
        this.$EventBus.$emit('openYesModal', 'message.msgSelectOnlyPlant');
      } else {
        let param = checkedRow[0];
        if (this.vaild(param) == true) {
          try {
            await masterApi.putPlantSave(param);
            await this.plantSearch('search');
            this.$EventBus.$emit('openYesModal', 'message.msgSave');
          } catch (e) {
            if (e && e.err && e.err.data && e.err.data.message) {
              this.$EventBus.$emit('openYesModal', e.err.data.message);
            } else {
              this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
            }
          }
        }
      }
    },
    async deleteRows() {
      this.$refs.PlantListGrid.gridCommit();
      //삭제
      let checkedRow = this.$refs.PlantListGrid.sendCheckedData();
      if (checkedRow.length < 1) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoProduct');
      } else {
        try {
          let param = [];
          checkedRow.forEach(row => {
            if (row.id !== undefined && row.id) {
              param.push({ id: row.id });
            }
          });
          await masterApi.putPlantRemove(param);
          await this.plantSearch('search');
          this.$EventBus.$emit('openYesModal', 'message.msgResultDelete');
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    plantSearch(type) {
      this.$refs.filter.blur();
      this.$refs.PlantListGrid.gridCommit();
      //검색,초기화
      if (type == 'reset') {
        // this.$refs.PlantListGrid.getList();
        this.plantFilter = '';
        this.useYnValue = { text: this.$i18n.t('message.all'), value: '' };
      } else {
        let param = {
          filter: this.plantFilter,
          useYn: this.useYnValue.value,
        };
        this.$refs.PlantListGrid.getList(param);
      }
    },
    async getGridMutiLanguage() {
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
    fixGrid(type) {
      this.$refs.PlantListGrid.gridCommit();
      //행고정, 열고정
      if (this.$refs.PlantListGrid.focusCheck()) {
        const rows = this.$refs.PlantListGrid.sendJsonRows();
        if (rows.length > 0) {
          this.$refs.PlantListGrid.fixGrid(type, this.isFixColumn, this.isFixRow);
          if (type === 'column') {
            this.isFixColumn = !this.isFixColumn;
          } else if (type === 'row') {
            this.isFixRow = !this.isFixRow;
          }
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgNoProduct');
        }
      } else {
        this.$EventBus.$emit('openYesModal', 'message.msgNoSelection');
      }
    },
    layoutBtn(status) {
      this.$refs.PlantListGrid.gridCommit();
      this.ment = '';
      this.type = status.value;
      if (status.value === 'save') {
        this.ment = 'message.msgAskSave';
        this.$modal.show('AlarmModal');
      } else {
        this.ment = 'message.msgAskRefresh';
        this.$modal.show('AlarmModal');
      }
      this.layoutValue = { text: this.$t('message.btnLayout'), value: '' };
    },
    okOrNo(result) {
      if (result) {
        this.$refs.PlantListGrid.saveLayout(this.type);
      }
    },
    setFilter() {
      this.filterOn = !this.filterOn;
      this.$refs.PlantListGrid.setFilter(this.filterOn);
    },
  },
  created() {
    this.getGridMutiLanguage();
  },
  mounted() {
    this.setFilter();
  },
  destroyed() {},
};
</script>

<style>
.checkbox-label {
  display: block;
}
</style>
