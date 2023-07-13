<template>
  <div>
    <div class="master_form">
      <h2 class="mypage_title">{{ $t('message.info') }}</h2>
      <CustDtlsReg v-if="page == 'custManageDtls'" ref="custDtlsReg" :listData="custListData" :erpInfo="erpInfo" :authButton="authButton" />
      <TranDtlsReg v-if="page == 'tranManageDtls'" ref="tranDtlsReg" :listData="tranListData" />
    </div>
    <h2 class="mypage_title">{{ $t('message.langInfo') }}</h2>
    <CustLangInfo v-if="page == 'custManageDtls'" ref="custLangInfo" :listData="custListData" :erpInfo="erpInfo" />
    <TranLangInfo v-if="page == 'tranManageDtls'" ref="tranLangInfo" :listData="tranListData" />
    <div class="master_form">
      <CustRemark ref="custRemark" v-if="page == 'custManageDtls'" :listData="custListData" :authButton="authButton" />
      <TranRemark ref="tranRemark" v-if="page == 'tranManageDtls'" :listData="tranListData" :authButton="authButton" />
    </div>
    <div class="board_footer">
      <div class="footer_left">
        <button class="btn_default btn_function" @click="moveListPage" v-if="authButton.fn1Auth == 'Y'">{{ $t('message.btnList') }}</button>
      </div>
      <div class="footer_right">
        <!-- 초기화 버튼 -->
        <!-- <button class="btn_default btn_function" @click="partnerSave('reset')">{{ $t('message.btnInit') }}</button> -->
        <!-- 저장 버튼 -->
        <button class="btn_default btn_critical_process" @click="partnerSave('save')" v-if="authButton.savAuth == 'Y'">{{ $t('message.btnSave') }}</button>
      </div>
    </div>
    <AlarmModal :ment="ment" @okOrNo="okOrNo" :page="page" />
  </div>
</template>

<script>
import CustDtlsReg from '@/components/master/CustDtlsReg';
import TranDtlsReg from '@/components/master/TranDtlsReg';
import CustLangInfo from '@/components/master/CustLangInfo';
import TranLangInfo from '@/components/master/TranLangInfo';
import CustRemark from '@/components/master/CustRemark';
import TranRemark from '@/components/master/TranRemark';
import AlarmModal from '@/modal/AlarmModal';
//
import { mapGetters } from 'vuex';
import masterApi from '@/api/master/master';
// import fileApi from '@/api/file';

export default {
  components: {
    CustDtlsReg,
    TranDtlsReg,
    CustLangInfo,
    TranLangInfo,
    CustRemark,
    TranRemark,
    AlarmModal,
  },
  computed: {
    ...mapGetters({
      menuList: 'menuList/getMenuListAll',
    }),
  },

  props: {
    // routerPath: {
    //   type: String,
    // },
    // menuId: {
    //   type: Number,
    // },
    page: {
      type: String,
    },
    authButton: {
      type: Object,
    },
    openInfo: {
      type: Object,
    },
  },
  data() {
    return {
      custListData: {},
      tranListData: {},
      erpInfo: [],
      // custRemark: '',
      // file: '',
      // fileNm: [],
      // fileUploadList: [],
      // attchFileUuid: '',
      ment: '',
    };
  },
  watch: {
    openInfo() {
      this.loadInfo();
    },
    // custListData(data) {
    //   this.$refs.custDtlsReg.dataSetting(data);
    //   this.$refs.custRemark.infoUpdata(data);
    // },
    // tranListData(data) {
    //   this.$refs.tranDtlsReg.dataSetting(data);
    //   this.$refs.tranRemark.infoUpdata(data);
    // },
  },
  methods: {
    async loadErpInfo(cd) {
      //erp정보 불러오기
      if (cd == '') {
        this.$EventBus.$emit('openYesModal', 'message.errorsVaildErpCd');
      } else {
        try {
          const response = await masterApi.getErpInfo({ erpCd: cd });
          this.erpInfo = response.data.rs;
          this.$EventBus.$emit('openYesModal', 'message.msgLoadErpInfo');
        } catch (e) {
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    dataSetting() {
      this.partnerSave('reset');
      if (this.page == 'custManageDtls') {
        this.$refs.custDtlsReg.dataSetting(this.custListData);
        this.$refs.custLangInfo.dataSetting(this.custListData);
        this.$refs.custRemark.infoUpdata(this.custListData);
      } else {
        this.$refs.tranDtlsReg.dataSetting(this.tranListData);
        this.$refs.tranLangInfo.dataSetting(this.tranListData);
        this.$refs.tranRemark.infoUpdata(this.tranListData);
      }
    },
    async partnerSave(type) {
      if (type == 'reset') {
        //초기화
        if (this.page == 'custManageDtls') {
          this.$refs.custDtlsReg.reset(null);
          this.$refs.custLangInfo.reset();
          this.$refs.custRemark.reset();
        } else {
          this.$refs.tranDtlsReg.reset();
          this.$refs.tranLangInfo.reset();
          this.$refs.tranRemark.reset();
        }
      } else {
        //저장
        let dtlsData = {};
        let langInfo = {};
        let remarkInfo = {};
        let param = {};
        if (this.page == 'custManageDtls') {
          dtlsData = this.$refs.custDtlsReg.dataSave();
          langInfo = this.$refs.custLangInfo.dataSave();
          remarkInfo = this.$refs.custRemark.dataSave();
          if (dtlsData !== false && langInfo !== false) {
            param = { ...dtlsData, ...langInfo, ...remarkInfo };
            // if (this.attchFileUuid !== null) param = { ...param, ...{ attchFileUuid: this.attchFileUuid } };
            try {
              await masterApi.putCustMngSave(param);
              this.$EventBus.$emit('openYesModal', 'message.msgSave');
            } catch (e) {
              if (e && e.err && e.err.data && e.err.data.message) {
                this.$EventBus.$emit('openYesModal', e.err.data.message);
              } else {
                this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
              }
            }
          }
        } else {
          dtlsData = this.$refs.tranDtlsReg.dataSave();
          langInfo = this.$refs.tranLangInfo.dataSave();
          remarkInfo = this.$refs.tranRemark.dataSave();
          if (dtlsData !== false && langInfo !== false) {
            param = { ...dtlsData, ...langInfo, ...remarkInfo };
            // if (this.attchFileUuid !== null) param = { ...param, ...{ attchFileUuid: this.attchFileUuid } };
            try {
              await masterApi.putTranMngSave(param);
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
      }
    },
    async loadInfo() {
      await this.partnerSave('reset');
      if (this.openInfo.id) {
        let param = {};
        if (this.page == 'custManageDtls') {
          try {
            param = {
              id: this.openInfo.id,
            };
            const response = await masterApi.getCustMngDtls(param);
            this.custListData = response.data.rs.detail;
            this.dataSetting();
          } catch (e) {
            if (e && e.err && e.err.data && e.err.data.message) {
              this.$EventBus.$emit('openYesModal', e.err.data.message);
            } else {
              this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
            }
          }
        } else {
          try {
            param = {
              id: this.openInfo.id,
            };
            const response = await masterApi.getTranMngDtls(param);
            this.tranListData = response.data.rs.detail;
            this.dataSetting();
          } catch (e) {
            if (e && e.err && e.err.data && e.err.data.message) {
              this.$EventBus.$emit('openYesModal', e.err.data.message);
            } else {
              this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
            }
          }
        }
      } else {
        if (this.page == 'custManageDtls') {
          this.custListData = null;
        } else {
          this.tranListData = null;
        }
      }
    },
    okOrNo(result) {
      if (result) {
        this.movePage();
      }
    },
    moveListPage() {
      if (this.page == 'custManageDtls') {
        this.ment = 'message.msgMoveCustList';
        this.$modal.show('AlarmModalcustManageDtls');
      } else {
        this.ment = 'message.msgMoveTranList';
        this.$modal.show('AlarmModaltranManageDtls');
      }
    },
    movePage() {
      //목록으로 이동
      const thridResult = [];
      this.menuList.forEach(first => {
        first.children.forEach(second => {
          // 1 Depth
          // 2 Depth
          second.children.forEach(thrid => {
            // 3 Depth
            thridResult.push(thrid);
          });
        });
      });
      thridResult.find(element => {
        if (element.routerPath == '/master/cust-manage' && this.page == 'custManageDtls') {
          this.pageObj = element;
        } else if (element.routerPath == '/master/tran-manage' && this.page == 'tranManageDtls') {
          this.pageObj = element;
        }
      });
      this.$emit('setNewObject', this.pageObj, '', '', 'Update');
    },
  },
  created() {},
  async mounted() {
    if (this.page == 'custManageDtls') {
      await this.$refs.custDtlsReg.loadCommonCode();
    } else {
      await this.$refs.tranDtlsReg.loadCommonCode();
    }
    await this.loadInfo();
  },
  destroyed() {},
};
</script>

<style>
.checkbox-label {
  display: block;
}
</style>
