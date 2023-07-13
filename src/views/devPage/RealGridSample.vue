<template>
  <div>
    <div class="realgrid_container">
      <div class="real_head">
        <div class="real_head_left"></div>
        <div class="real_head_right">
          <button class="btn_default btn_process">
            {{ $t('message.btnInit') }}
          </button>
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
        </div>
      </div>
      <div class="real_body real_body15">
        <DevSampleGrid ref="sampleGrid" :gridLang="gridLang" v-if="page === 'DevSampleGrid'" />
        <DevSampleTreeGrid ref="sampleTreeGrid" :gridLang="gridLang" v-if="page === 'DevSampleTreeGrid'" />
      </div>
      <div class="real_footer">
        <div class="footer_left">
          <button class="btn_default btn_function" v-if="authButton.exlAuth === 'Y'">
            {{ $t('message.btnExcelUpload') }}
          </button>
        </div>
        <div class="footer_right">
          <button class="btn_default btn_critical_process">
            {{ $t('message.msgPlaceOrganize') }}
          </button>
          <button class="btn_default btn_print_fuction">
            {{ $t('message.btnTemporarySave') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DevSampleGrid from '@/components/gridView/devSample/DevSampleGrid';
import DevSampleTreeGrid from '@/components/gridView/devSample/DevSampleTreeGrid.vue';
import languageApi from '@/api/language';

export default {
  props: ['page', 'authButton', 'menuId', 'routerPath'],
  components: { DevSampleTreeGrid, DevSampleGrid },
  name: 'RealGridSample',
  data() {
    return {
      filterOn: true,
      gridLang: [],
    };
  },
  computed: {
    ...mapGetters({
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      userCustId: 'userInfo/getUserCustId',
      userLocale: 'userInfo/getUserLocale',
    }),
  },
  methods: {
    setFilter() {
      this.filterOn = !this.filterOn;
      if (this.page === 'DevSampleGrid') this.$refs.sampleGrid.setFilter(this.filterOn);
      else this.$refs.sampleTreeGrid.setFilter(this.filterOn);
    },
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
  },
  mounted() {
    this.setFilter();
    this.getGridMutiLanguage();
  },
};
</script>

<style scoped></style>
