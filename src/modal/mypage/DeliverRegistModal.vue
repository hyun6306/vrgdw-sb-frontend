<template>
  <modal ref="RegistModal" @before-open="open" @before-close="clear" name="DeliverRegistModal" width="800" height="auto" :clickToClose="false">
    <div class="modal" id="NoticeRegist">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="cancel"></button>
      </div>
      <!-- 고객사등록 -->
      <p class="modal_title_t02">{{ $t('message.registDelivery') }}</p>
      <div class="modal_content">
        <div class="result_box result_box02">
          <div class="address_info">
            <p class="company_title">
              <!-- 기본배송지 -->
              <label class="chechbox_basic">
                <input type="checkbox" v-model="defaultCheck" @click="checkChange" />
                <span class="checkmark"></span>
                {{ $t('message.defaultDelivery') }}
              </label>
            </p>
            <ul>
              <!-- 배송지명 -->
              <li class="address_list">
                <p class="address_list_title">{{ $t('message.addrNm') }}</p>
                <div class="form_input essential">
                  <input type="text" style="width: 100%" v-model="logitsAlias" />
                </div>
              </li>
              <!-- 우편번호 -->
              <li class="address_list">
                <p class="address_list_title">{{ $t('message.postNum') }}</p>
                <div class="form_input essential">
                  <input type="text" style="width: 50%" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" id="postal-code" v-model="postNum" />
                </div>
              </li>
              <!-- 배송권역 -->
              <li class="address_list">
                <p class="address_list_title">{{ $t('message.deliverArea') }}</p>
                <MultiSelect id="Material_Group" class="essential" style="width: 310px" track-by="text" label="text" v-model="cityCd" :options="cityOptions" :allow-empty="false" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="" @input="changeCityCd()"></MultiSelect>
                <MultiSelect id="Material_Group" class="essential" style="width: 310px" track-by="text" label="text" v-model="distrCd" :options="distrOptions" :allow-empty="false" :searchable="false" :close-on-select="true" :show-labels="false" placeholder=""></MultiSelect>
              </li>
              <!-- 상세주소 -->
              <li class="address_list">
                <p class="address_list_title">{{ $t('message.addrDtls') }}</p>
                <div class="form_input essential">
                  <!-- addr -->
                  <input v-model="addr" type="text" style="width: 100%" />
                </div>
              </li>
              <!-- 담당자명 -->
              <li class="address_list">
                <p class="address_list_title">{{ $t('message.picNm') }}</p>
                <div class="form_input essential">
                  <input v-model="trnMngNm" type="text" style="width: 100%" />
                </div>
              </li>
              <!-- 연락처1 -->
              <li class="address_list">
                <div class="multi_line">
                  <p class="address_list_title">{{ $t('message.callNum1') }}</p>
                  <div class="form_input essential">
                    <input type="text" v-model="phoneNum1[0]" maxlength="4" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" id="phone-number01" class="t-c three_input" />
                    <i>-</i>
                    <input type="text" v-model="phoneNum1[1]" maxlength="4" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" id="phone-number02" class="t-c three_input" />
                    <i>-</i>
                    <input type="text" v-model="phoneNum1[2]" maxlength="4" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" id="phone-number03" class="t-c three_input" />
                  </div>
                </div>
                <!-- 연락처2 -->
                <div class="multi_line">
                  <p class="address_list_title">{{ $t('message.callNum2') }}</p>
                  <div class="form_input">
                    <input type="text" v-model="phoneNum2[0]" maxlength="4" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" id="phone-number01" class="t-c three_input" />
                    <i>-</i>
                    <input type="text" v-model="phoneNum2[1]" maxlength="4" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" id="phone-number02" class="t-c three_input" />
                    <i>-</i>
                    <input type="text" v-model="phoneNum2[2]" maxlength="4" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" id="phone-number03" class="t-c three_input" />
                  </div>
                </div>
              </li>
              <!-- 특이사항 -->
              <li class="address_list">
                <p class="address_list_title">{{ $t('message.noteRemark') }}</p>
                <div class="form_textarea">
                  <textarea v-model="logitsRemark" type="text" style="width: 100%" />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 취소저장버튼 -->
        <div class="modal_btn_contents_t05">
          <button class="btn_default" @click="cancel">{{ $t('message.btnCancel') }}</button>
          <button class="btn_primary" @click="save">{{ $t('message.btnSave') }}</button>
        </div>
      </div>
      <DeliverAlarmModal :mainLogitsYn="mainLogitsYn" @noneEmit="allModalDown" :clearDefault="clearDefault" @allClose="closeAll" @saveEmit="setDefaultCheck" @cancelEmit="setDefaultCheck" :clickFlag="clickFlag" :boardText="boardText" :boardText2="boardText2" :ment="ment" :defaultCheck="defaultCheck" />
      <NoticeModal :ment="ment" />
    </div>
  </modal>
</template>

<script>
import NoticeModal from '@/modal/order/NoticeModal';
import orderApi from '@/api/order/order';
import commonApi from '@/api/common';
import DeliverAlarmModal from '@/modal/mypage/DeliverAlarmModal';
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  components: {
    DeliverAlarmModal,
    NoticeModal,
  },
  name: 'DeliverRegistModal',
  props: ['registCardId', 'addInfo'],
  data() {
    return {
      addFlag: false,
      splitAddr: '',
      phoneFlag: true,
      flag: '',
      clearDefault: '',
      updateFlag: null,
      cityOptions: [],
      distrOptions: [],
      cityCd: {},
      distrCd: {},
      registInfo: [],
      addrDtls: '',
      clickFlag: null,
      boardText: '',
      boardText2: '',
      ment: '',
      defaultCheck: null,
      logitsAlias: '',
      postNum: '',
      addr: '',
      phoneNum: [],
      phoneNum1: [],
      phoneNum2: [],
      trnMngNm: '',
      logitsRemark: '',
      mainLogitsYn: '',
      custId: '',
      isNew: false,
      delivery: {},
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      userCustId: 'userInfo/getUserCustId',
    }),
  },
  watch: {
    addrDtls(ad) {
      const watchSplit = ad.split(')');
      if (watchSplit == false) {
        this.addr = ad;
      } else {
        watchSplit[1] = this.addr;
      }
    },
    // 기본 배송지 여부, Y/N
    mainLogitsYn(main) {
      main == 'Y' ? (this.defaultCheck = true) : (this.defaultCheck = false);
    },
  },
  methods: {
    debounceHide: _.debounce((vm, modalName) => {
      vm.$modal.hide(modalName);
    }, 250),
    async allModalDown(allClose, saveFlag, checkFlag) {
      // 기본배송지 체크되어있지 않은 경우에서 저장 클릭 시
      if (checkFlag == false && saveFlag == true && allClose == true) {
        this.mainLogitsYn = 'N';
        const modalName = 'DeliverRegistModal';
        const vm = this;
        this.debounceHide(vm, modalName);
      }
    },
    clear() {
      this.defaultCheck = '';
      this.logitsAlias = '';
      this.postNum = '';
      this.cityCd = {};
      this.distrCd = {};
      this.addrDtls = '';
      this.addr = '';
      this.trnMngNm = '';
      this.phoneNum1 = [];
      this.phoneNum2 = [];
      this.logitsRemark = '';
      this.addFlag = true;
    },
    // 기본배송지 체크박스 클릭 시 이벤트, defaultCheck == false > this.clickFlag = true : this.clickFlag = false
    checkChange() {
      // 기본배송지 체크되어 있지 않을 때 클릭 시 => 기본배송지 변경 확인
      if (this.defaultCheck == false) {
        this.clickFlag = true;
        this.mainLogitsYn = 'Y';
        this.boardText = 'message.msgChangeShipping';
        this.boardText2 = 'message.msgChangeShipping2';
        this.$modal.show('DeliverAlarmModal');
      } else if (this.defaultCheck == true) {
        this.clearDefault = true;
        this.clickFlag = false;
        this.mainLogitsYn = 'N';
      }
    },
    // 기본배송지 체크 false, 취소 > 확인 클릭 시
    closeAll() {
      this.$modal.hide('DeliverRegistModal');
    },
    // 기본배송지 checkbox를 클릭하여 변경 후, 취소/확인 클릭 시 실행되는 emit event
    // allClose는 확인 클릭 시, 넘어오는 값이다.
    // checkFlag는 기본배송지 변경 여부이다, checkFlag == false ? this.defaultCheck = false : this.defaultCheck = true
    setDefaultCheck(main, checkFlag, allClose, clearD, saveFlag) {
      // 기본배송지 체크되어있지 않은 경우에서 저장 클릭 시
      if (checkFlag == false && saveFlag == true && allClose == true && main == true && !clearD) {
        this.mainLogitsYn = 'Y';
        const vm = this;
        const modalName = 'DeliverRegistModal';
        this.debounceHide(vm, modalName);
      }

      // 기본배송지 체크되어있지 않은 경우에서 저장 클릭 시 ????
      if (checkFlag == false && saveFlag == true && !allClose && !clearD && !main) {
        this.mainLogitsYn = 'N';
        const vm = this;
        const modalName = 'DeliverRegistModal';
        this.debounceHide(vm, modalName);
      }

      // 기본배송지 체크되어있지 않은 경우에서 취소 클릭 시
      if (checkFlag == false && !saveFlag && !allClose && !clearD && !main) {
        this.mainLogitsYn = 'N';
      }

      // 기본배송지 새로 저장 시
      if (saveFlag == true && checkFlag == true && allClose == false && !main && !clearD) {
        this.mainLogitsYn = 'Y';
      }
      // 기본배송지 체크되어 있을 때, 취소 클릭 시 ok
      if (checkFlag == false && allClose == false && main == true && !clearD && !saveFlag) {
        this.mainLogitsYn = 'Y';
      }
      // 기본배송지 체크되어 있을 때, 저장 클릭 시 ok
      if (checkFlag == false && allClose == true && main == true && !clearD && !saveFlag) {
        this.mainLogitsYn = 'Y';
        const vm = this;
        const modalName = 'DeliverRegistModal';
        this.debounceHide(vm, modalName);
      }
      // 기본배송지 체크 단계에서 취소 클릭 시 ok
      if (checkFlag == false && allClose == false && !main && !clearD && !saveFlag) {
        this.mainLogitsYn = 'N';
      }
      // 기본배송지 체크 true > 확인 클릭 시
      if (checkFlag == true && allClose == false && !main && !saveFlag && !clearD) {
        this.defaultCheck = true;
      }
      // 기본배송지 체크 true > 확인 > 취소 > 확인 클릭 시
      if (checkFlag == false && allClose == true && !main && !saveFlag && !clearD) {
        this.defaultCheck = false;
        const vm = this;
        const modalName = 'DeliverRegistModal';
        this.debounceHide(vm, modalName);
      }
      // 체크되어 있던 기본배송지 해제 후, 취소 클릭 시
      if (clearD == true && checkFlag == true && !main && !saveFlag && !allClose) {
        this.mainLogitsYn = 'Y';
      }
    },
    // 배송지정보 조회 => vue에서 받아온 cardId와 일치하는 id를 가진 배송지만 조회함
    open(event) {
      if (this.userMenuGrpCd !== 'CUSTOMER' && event.params) {
        this.custId = event.params.custId;
      }
      this.delivery = event.params?.delivery;
      this.isNew = event.params.isNew;
      if (!this.isNew) this.setLogits();
    },
    async setLogits() {
      // 일치하는 배송지 정보 data 바인딩
      this.logitsAlias = this.delivery.logitsAlias;
      this.postNum = this.delivery.postNum;
      this.addrDtls = this.delivery.addrDtls;
      this.trnMngNm = this.delivery.trnMngNm;
      this.logitsRemark = this.delivery.logitsRemark;
      this.cityCd = this.delivery.cityCd;
      this.distrCd = this.delivery.distrCd;
      this.addr = this.delivery.addr;
      this.mainLogitsYn = this.delivery.mainLogitsYn;
      // 전화번호 String, 배열로 분할, 연락처1은 필수값으로 무조건 내려오나, 2는 필수가 아님.
      if (this.delivery.phoneNum1) this.phoneNum1 = this.delivery.phoneNum1.split('-');
      if (this.delivery.phoneNum2) this.phoneNum2 = this.delivery.phoneNum2.split('-');
      // 일치하는 배송정보의 cityCd의 값으로 cityCd 초기화
      this.changeCityCd(this.delivery.cityCd);
      this.cityCd = { value: this.delivery.cityCd, text: this.delivery.cityNm };
      this.distrCd = { value: this.delivery.distrCd, text: this.delivery.distrNm };
      const split = this.addrDtls.split(')');
      this.splitAddr = split[1];
      if (this.delivery.mainLogitsYn == 'Y') this.defaultCheck = true;
    },
    // 배송지 저장(업데이트)
    async updateDeliver() {
      // registCardId !== null 배송지수정 후 저장 시
      if (this.delivery?.id) {
        const param = {
          id: this.delivery?.id,
          custId: this.delivery?.custId,
          logitsAlias: this.logitsAlias,
          cityCd: this.cityCd.value,
          distrCd: this.distrCd.value,
          postNum: this.postNum,
          addr: this.addr, // 상세주소를 수정하지 않은 상태에서 배송지 저장 시, 배송지조회 API를 통해 받은 addrDtls가 INPUT 태그에 바인딩 되어 있고, 파라미터로 넘기게 된다.
          phoneNum1: this.phoneNum1.join('-'),
          phoneNum2: this.phoneNum2.join('-'),
          trnMngNm: this.trnMngNm,
          logitsRemark: this.logitsRemark,
          mainLogitsYn: this.mainLogitsYn,
        };
        if (this.mainLogitsYn == '' || this.defaultCheck == false) {
          this.mainLogitsYn = 'N';
        }
        if (param) {
          if (param.phoneNum1.length <= 10) {
            this.phoneFlag = false;
          } else {
            this.phoneFlag = true;
          }

          if (this.phoneFlag == false || !param.logitsAlias || !param.postNum || !param.cityCd || !param.distrCd || !param.trnMngNm || !param.addr) {
            this.updateFlag = false;

            this.ment = 'message.msgValidEssential';
            this.flag = 'require';
            const checkFlag = '';
            this.$emit('updateDeliver', checkFlag, this.flag, this.ment);
          }
          if (this.phoneFlag == true && param.logitsAlias && param.postNum && param.cityCd && param.distrCd && param.trnMngNm && param.addr) {
            this.updateFlag = true;
            try {
              const response = await orderApi.saveUserLogitsBaseAddr(param);
              if (response.data.status == 200) {
                this.ment = 'message.msgResultSave';
                this.flag = 'update';
                const checkFlag = '';
                this.$emit('updateDeliver', checkFlag, this.flag, this.ment);
              }
            } catch (e) {
              if (e && e.err && e.err.data && e.err.data.message) {
                this.$EventBus.$emit('openYesModal', e.err.data.message);
              } else {
                this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
              }
            }
          }
        }
        // registCardId == null 배송지추가하기 클릭 후 저장 시
      } else {
        this.mainLogitsYn = '';
        this.defaultCheck == true ? (this.mainLogitsYn = 'Y') : (this.mainLogitsYn = 'N');
        // this.clear();
        const param = {
          id: null,
          custId: this.userMenuGrpCd === 'CUSTOMER' ? this.userCustId : this.custId,
          logitsAlias: this.logitsAlias,
          cityCd: this.cityCd.value,
          distrCd: this.distrCd.value,
          postNum: this.postNum,
          addr: this.addr, // 상세주소를 수정하지 않은 상태에서 배송지 저장 시, 배송지조회 API를 통해 받은 addrDtls가 INPUT 태그에 바인딩 되어 있고, 파라미터로 넘기게 된다.
          phoneNum1: this.phoneNum1.join('-'),
          phoneNum2: this.phoneNum2.join('-'),
          trnMngNm: this.trnMngNm,
          logitsRemark: this.logitsRemark,
          mainLogitsYn: this.mainLogitsYn,
        };
        // 연락처 1 빈 값일 경우, phoneFlag = false;
        if (param) {
          if (param.phoneNum1.length <= 10) {
            this.phoneFlag = false;
          } else {
            this.phoneFlag = true;
          }

          if (this.phoneFlag == false || !param.logitsAlias || !param.postNum || !param.cityCd || !param.distrCd || !param.trnMngNm || !param.addr) {
            this.updateFlag = false;

            this.ment = 'message.msgValidEssential';
            this.flag = 'require';
            const checkFlag = '';
            if (this.addInfo == null) {
              this.$emit('updateDeliver', checkFlag, this.flag, this.ment);
            } else {
              this.$EventBus.$emit('openYesModal', this.ment);
            }
          }
          if (this.phoneFlag == true && param.logitsAlias && param.postNum && param.cityCd && param.distrCd && param.trnMngNm && param.addr) {
            this.updateFlag = true;
            try {
              const response = await orderApi.saveUserLogitsBaseAddr(param);
              if (response.data.status == 200) {
                this.ment = 'message.msgResultSave';
                this.flag = 'update';
                const checkFlag = '';
                this.$emit('updateDeliver', checkFlag, this.flag, this.ment);
              }
              // 여기서 배송지 저장 완료됨.
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
    save() {
      this.updateDeliver();
    },
    cancel() {
      if (this.isNew) {
        this.$modal.hide('DeliverRegistModal');
      } else {
        // 기본배송지 체크되어 있는 상태에서 취소 클릭 시
        if (this.defaultCheck == true) {
          this.boardText = 'message.msgNoReflect';
          this.boardText2 = 'message.msgNoReflect2';
          this.clickFlag = true;
          this.$modal.show('DeliverAlarmModal');
          // 처음부터 체크되어있지 않은 경우
        } else if (this.defaultCheck == false && this.clearDefault !== true) {
          this.clickFlag = false;
          this.boardText = 'message.msgNoReflect';
          this.boardText2 = 'message.msgNoReflect2';
          this.$modal.show('DeliverAlarmModal');
          // 체크되어 있는 기본배송지를 다시 체크하여 해제한 경우
        } else if (this.defaultCheck == false && this.clearDefault == true) {
          this.boardText = 'message.msgNoReflect';
          this.boardText2 = 'message.msgNoReflect2';
          this.$modal.show('DeliverAlarmModal');
          // 배송지 추가 버튼 클릭으로 새 모달 열린 후 바로 닫을 경우
        } else if (this.defaultCheck == null && this.clearDefault == '') {
          this.clickFlag = false;
          this.boardText = 'message.msgNoReflect';
          this.boardText2 = 'message.msgNoReflect2';
          this.$modal.show('DeliverAlarmModal');
        }
      }
    },
    changeCityCd(cityCd) {
      if (cityCd) {
        this.getCommonCodeCombo(cityCd);
      } else {
        this.getCommonCodeCombo(this.cityCd.value);
        this.distrCd = {};
      }
    },
    async getCommonCodeCombo(prntCd = '') {
      try {
        const param = {
          groupCd: 'VNM_CITY',
          useYn: 'Y',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);
        if (prntCd !== '') {
          this.distrOptions = response.data.ds;
        } else {
          this.cityOptions = response.data.ds;
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
  },
  mounted() {
    this.getCommonCodeCombo();
  },
};
</script>

<style></style>
