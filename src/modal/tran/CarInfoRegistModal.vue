<template>
  <modal :adaptive="true" :clickToClose="false" height="348" name="CarInfoRegistModal" width="1000" @before-close="close" @before-open="open">
    <div class="modal">
      <!-- <TranAlarmYesModal :ment="ment" /> -->
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('CarInfoRegistModal')"></button>
      </div>
      <p class="modal_title_t02">
        <!-- {{ $t('label.deliveryRequest') }} -->
        {{ $t('message.carInfoInput') }}
      </p>
      <div class="modal_content dr_content">
        <h2 class="table_title">
          <span>{{ $t('message.carInfo') }}</span>
        </h2>
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 15%" />
              <col style="width: 35%" />
              <col style="width: 15%" />
              <col style="width: 35%" />
            </colgroup>
            <tbody>
              <tr>
                <th>{{ $t('message.trnNm') }}</th>
                <td>
                  <span class="">
                    <!-- <input type="text" id="" placeholder="" style="width: 100%" v-model="trnCust.text" disabled /> -->
                    <MultiSelect id="Material_Group" v-model="trnCust" :allow-empty="false" :class="[userMenuGrpCd === 'TRANSCUS' ? 'essential disabled' : 'essential']" :close-on-select="true" :disabled="userMenuGrpCd == 'TRANSCUS'" :options="trnCustList" :searchable="false" :show-labels="false" label="text" placeholder="" style="width: 100%" track-by="text"></MultiSelect>
                  </span>
                </td>
                <th>{{ $t('message.tranCarNum') }}</th>
                <td>
                  <span class="essential">
                    <input id="" v-model="tranCarNum" :disabled="id !== null" placeholder="" style="width: 100%" type="text" @input="$event => (tranCarNum = $event.target.value.trim())" />
                  </span>
                </td>
              </tr>
              <tr>
                <th>{{ $t('message.carType') }}</th>
                <td>
                  <span class="">
                    <MultiSelect id="Material_Group" v-model="carType" :allow-empty="false" :close-on-select="true" :options="carTypeOptions" :searchable="false" :show-labels="false" class="" label="text" placeholder="" style="width: 100%" track-by="text"></MultiSelect>
                  </span>
                </td>
                <th>{{ $t('message.driverNm') }}</th>
                <td>
                  <span class="essential">
                    <input id="" v-model="driverNm" placeholder="" style="width: 100%" type="text" />
                  </span>
                </td>
              </tr>
              <tr>
                <th>{{ $t('message.mobileNum') }}</th>
                <td>
                  <div class="form_input p0">
                    <span class="essential" style="width: 30%">
                      <input id="drivers_mobile_phone_number01" v-model="driverMobileNum[0]" class="t-c three_input" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" placeholder="" style="width: 100%" type="text" />
                    </span>
                    <i>-</i>
                    <input id="drivers_mobile_phone_number02" v-model="driverMobileNum[1]" class="t-c three_input" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" placeholder="" style="width: 30%" type="text" />
                    <i>-</i>
                    <input id="drivers_mobile_phone_number03" v-model="driverMobileNum[2]" class="t-c three_input" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" placeholder="" style="width: 30%" type="text" />
                  </div>
                </td>
                <th>{{ $t('message.phoneNum') }}</th>
                <td>
                  <div class="form_input p0">
                    <span class="" style="width: 30%">
                      <input id="drivers_mobile_phone_number01" v-model="driverPhoneNum[0]" class="t-c three_input" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" placeholder="" style="width: 100%" type="text" />
                    </span>
                    <i>-</i>
                    <input id="drivers_mobile_phone_number02" v-model="driverPhoneNum[1]" class="t-c three_input" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" placeholder="" style="width: 30%" type="text" />
                    <i>-</i>
                    <input id="drivers_mobile_phone_number03" v-model="driverPhoneNum[2]" class="t-c three_input" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '');" placeholder="" style="width: 30%" type="text" />
                  </div>
                </td>
              </tr>
              <tr>
                <th>{{ $t('message.useYn') }}</th>
                <td colspan="3">
                  <div class="a-l gap-5">
                    <MultiSelect id="Material_Group" v-model="useYn" :close-on-select="true" :options="useYnOptions" :searchable="false" :show-labels="false" class="essential" label="text" placeholder="" style="width: 150px; flex-shrink: 0" track-by="text"></MultiSelect>
                    <span v-show="useYn.value == 'N'" class="essential">
                      <input id="" v-model="driverRemark" placeholder="" style="width: 100%" type="text" />
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="modal_btn_contents_t05">
          <button class="btn_default" @click="$modal.hide('CarInfoRegistModal')">{{ $t('message.btnCancel') }}</button>
          <button class="btn_primary" @click="carSave">{{ $t('message.btnSave') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapGetters } from 'vuex';
import tranApi from '@/api/tran/tran';
// import TranAlarmYesModal from '@/modal/tran/TranAlarmYesModal';

export default {
  data() {
    return {
      id: null,
      ment: '',
      //운송사
      trnCust: '',
      trnCustList: [],
      //
      tranCarNum: '',
      driverNm: '',
      driverMobileNum: [],
      driverPhoneNum: [],
      //사용여부
      useYn: { text: 'Y', value: 'Y' },
      useYnOptions: [
        { text: 'Y', value: 'Y' },
        { text: 'N', value: 'N' },
      ],
      driverRemark: '',
      // 차량유형
      carType: '',
      carTypeOptions: [],
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
    }),
  },
  components: {
    // TranAlarmYesModal,
  },
  props: ['rowData', 'trnCustOptions', 'carTypeList', 'page'],
  watch: {
    rowData(data) {
      if (data) {
        this.carInfo = data;
        this.trnCustList;
        this.setData();
      }
    },
    useYn(type) {
      if (type.value == 'Y') {
        this.driverRemark = '';
      }
    },
    ment(ment) {
      if (this.page !== 'dispatchReqManage' || this.page === 'carInOutManage') {
        this.$emit('infoMent', ment);
      }
    },
    carTypeList(list) {
      list.forEach(row => {
        this.carTypeOptions.push({ text: row.carTypeNm, value: row.id });
      });
      this.carType = this.carTypeOptions[0];
    },
    trnCustOptions(data) {
      if (this.page === 'dispatchReqManage' || this.page === 'carInOutManage') {
        this.trnCustList = data;
        this.trnCust = this.trnCustList[0];
      } else {
        this.trnCustList = data.slice(1);
        if (this.userMenuGrpCd !== 'TRANSCUS') {
          this.trnCust = this.trnCustList[0];
        } else {
          data.forEach(data => {
            if (data.value == this.userInfo.trncusId) {
              this.trnCust = data;
            }
          });
        }
      }
    },
  },
  methods: {
    setData() {
      if (this.carInfo.id) {
        this.id = this.carInfo.id;
        this.trnCust = { text: this.carInfo.trncusNm, value: this.carInfo.trncusId };
        this.tranCarNum = this.carInfo.tranCarNum;
        this.carType = { text: this.carInfo.carTypeNm, value: this.carInfo.carTypeId };
        this.driverNm = this.carInfo.driverNm;
        this.driverMobileNum = this.carInfo.driverMobileNum ? this.carInfo.driverMobileNum.split('-') : '';
        if (this.carInfo.driverPhoneNum) {
          this.driverPhoneNum = this.carInfo.driverPhoneNum ? this.carInfo.driverPhoneNum.split('-') : '';
        }
        this.driverRemark = this.carInfo.driverRemark;
        this.useYn = { text: this.carInfo.useYn, value: this.carInfo.useYn };
      }
    },
    async carSave() {
      const validatiopn = this.valid();
      if (validatiopn) {
        try {
          let param = {
            id: this.id,
            trncusId: this.trnCust.value,
            tranCarNum: this.tranCarNum,
            carTypeId: this.carType.value,
            driverNm: this.driverNm,
            driverMobileNum: this.driverMobileNum.join('-'),
            driverPhoneNum: this.driverPhoneNum.join('-'),
            driverRemark: this.driverRemark,
            useYn: this.useYn.value,
          };
          const response = await tranApi.putCarManageSave(param);
          if (response.data.status == 200) {
            this.ment = 'message.msgNewCar';
            this.$modal.hide('CarInfoRegistModal');
            if (this.page === 'dispatchReqManage' || this.page === 'carInOutManage') {
              await this.isReSearch();
            } else {
              await this.$parent.carSearch();
            }
            // this.$modal.show('TranAlarmYesModal');
          } else if (response.data.status == 400) {
            this.ment = response.data.message;
            this.$modal.hide('CarInfoRegistModal');
            if (this.page === 'dispatchReqManage' || this.page === 'carInOutManage') {
              // await this.isReSearch();
            } else {
              await this.$parent.carSearch();
            }
          } else {
            this.ment = 'message.errorsDbSave';
            // this.$modal.show('TranAlarmYesModal');
          }
          this.$EventBus.$emit('openYesModal', this.ment);
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
    valid() {
      let validCheck = true;
      if (!this.trnCust.text) {
        //운송사 선택 필수
        this.ment = 'message.msgEmptyTrncust';
        validCheck = false;
      } else if (this.tranCarNum == '') {
        //차량번호 필수 입력
        this.ment = 'message.msgNoTrnCarNum';
        validCheck = false;
      } else if (this.driverNm == '') {
        //기사명 필수 입력
        this.ment = 'message.msgRequireDriverNm';
        validCheck = false;
      } else if (this.driverMobileNum.length !== 3) {
        this.ment = 'message.msgRequireMobileNum';
        validCheck = false;
      } else if (this.driverMobileNum.length == 3) {
        if (this.driverMobileNum[0] == undefined) {
          this.ment = 'message.msgRequireMobileNum';
          validCheck = false;
        } else if (this.driverMobileNum[1] == undefined) {
          this.ment = 'message.msgRequireMobileNum';
          validCheck = false;
        }
      } else if (this.useYn.value == 'N' && this.driverRemark == '') {
        //사유불가 사유 필수 입력
        this.ment = 'message.msgRequireDriverRemark';
        validCheck = false;
      }
      if (!validCheck) {
        // if (this.page === 'dispatchReqManage' || this.page === 'carInOutManage') {
        this.$EventBus.$emit('openYesModal', this.ment);
        // } else {
        // this.$parent.showModal();
        // }
      }

      return validCheck;
    },
    open(event) {
      if (this.page === 'dispatchReqManage' || this.page == 'carInOutManage') {
        const type = event.params.type;
        const trncusId = event.params.trncusId;
        if (this.carInfo) {
          if (type !== 'regist') {
            this.setData();
          } else {
            this.trnCustList.forEach((cd, index) => {
              if (trncusId.value === cd.value) {
                this.trnCust = this.trnCustList[index];
              }
            });
          }
        } else {
          this.trnCustList.forEach((cd, index) => {
            if (trncusId.value === cd.value) {
              this.trnCust = this.trnCustList[index];
            }
          });
        }
      } else {
        // 차량번호 셀 클릭 시, 모달 오픈
        if (this.rowData.trncusId) {
          this.trnCustList.forEach((cd, index) => {
            if (this.rowData.trncusId === cd.value) {
              this.trnCust = this.trnCustList[index];
            }
          });
          // 신규등록 시
        } else {
          if (this.userInfo.menuGrpCd == 'TRANSCUS') {
            this.trnCustList.forEach((cd, index) => {
              if (this.userInfo.trncusId == cd.value) {
                this.trnCust = this.trnCustList[index];
              }
            });
          } else {
            let trncusId = event.params.searchTrnCusId;
            if (trncusId.value === '') {
              this.trnCust = '';
            }
            this.trnCustList.forEach((cd, index) => {
              if (trncusId.value == cd.value) {
                this.trnCust = this.trnCustList[index];
              }
            });
          }
        }
      }
    },
    close() {
      this.id = null;
      this.tranCarNum = '';
      this.driverNm = '';
      this.driverMobileNum = [];
      this.driverPhoneNum = [];
      this.useYn = { text: 'Y', value: 'Y' };
      this.driverRemark = '';
      if (this.page == 'carManage') {
        if (this.userMenuGrpCd == 'VRGDW_TRAN') {
          this.trnCust = this.trnCustList[0];
        } else {
          this.trnCustList.forEach(data => {
            if (data.value == this.userInfo.trncusId) {
              this.trnCust = data;
            }
          });
        }
      } else {
        this.trnCust = this.trnCustList[0];
      }

      this.carType = this.carTypeOptions[0];
    },
    isReSearch() {
      this.isSearch = true;
      this.$emit('isReSearch', this.isSearch);
    },
  },
  mounted() {},
};
</script>

<style></style>
