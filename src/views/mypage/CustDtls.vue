<template>
  <div>
    <div class="client_section">
      <!-- board 리스트 -->
      <div class="notice_section">
        <div class="mypage_form">
          <h2 class="mypage_title">{{ $t('message.info') }}</h2>
          <div class="mypage_form_table">
            <table>
              <colgroup>
                <col style="width: 13.3%" />
                <col style="width: 20%" />
                <col style="width: 13.3%" />
                <col style="width: 20%" />
                <col style="width: 13.3%" />
                <col style="width: 20%" />
              </colgroup>
              <tr>
                <th>
                  <label class="list_title" for="">{{ $t('message.partnerCd') }}</label>
                </th>
                <td>
                  <div class="form_input"><input type="text" id="" class="t-l solo_input disabled" disabled placeholder="" v-model="detailData.compCd" /></div>
                </td>
                <th>
                  <label class="list_title" for="">{{ $t('message.partnerNm') }}</label>
                </th>
                <td>
                  <div class="form_input"><input type="text" id="" class="solo_input disabled" disabled placeholder="" v-model="detailData.custNm" /></div>
                </td>
                <th>
                  <label class="list_title" for="">{{ $t('message.bizNum') }}</label>
                </th>
                <td>
                  <div class="form_input"><input type="text" id="" class="t-l solo_input disabled" disabled placeholder="" v-model="detailData.bizNum" /></div>
                </td>
              </tr>
              <tr>
                <!-- <th>
                  <label class="list_title" for="">{{ $t('message.establishDt') }}</label>
                </th>
                <td>
                  <div class="form_input"><input type="text" id="" class="t-l solo_input disabled" disabled placeholder="!!!!" /></div>
                </td> -->
                <th>
                  <label class="list_title" for="">{{ $t('message.cellNum') }}</label>
                </th>
                <td>
                  <div class="form_input">
                    <input type="text" id="phone-number-ct" class="t-c disabled" disabled placeholder="" v-model="detailData.mobileNumCt" />
                    <input type="text" id="phone-number01" class="t-c three_input disabled" disabled placeholder="" v-model="mobileNum[0]" />
                    <i>-</i>
                    <input type="text" id="phone-number02" class="t-c three_input disabled" disabled placeholder="" v-model="mobileNum[1]" />
                    <i>-</i>
                    <input type="text" id="phone-number03" class="t-c three_input disabled" disabled placeholder="" v-model="mobileNum[2]" />
                  </div>
                </td>
                <th>
                  <label class="list_title" for="">{{ $t('message.phoneNum') }}</label>
                </th>
                <td>
                  <div class="form_input">
                    <input type="text" id="phone-number-ct" class="t-c disabled" disabled placeholder="" v-model="detailData.phoneNumCt" />
                    <input type="text" id="phone-number01" class="t-c three_input disabled" disabled placeholder="" v-model="phoneNum[0]" />
                    <i>-</i>
                    <input type="text" id="phone-number02" class="t-c three_input disabled" disabled placeholder="" v-model="phoneNum[1]" />
                    <i>-</i>
                    <input type="text" id="phone-number03" class="t-c three_input disabled" disabled placeholder="" v-model="phoneNum[2]" />
                  </div>
                </td>
                <th>
                  <label class="list_title" for="">{{ $t('message.faxNumber') }}</label>
                </th>
                <td>
                  <div class="form_input">
                    <input type="text" id="fax-number-ct" class="t-c disabled" disabled placeholder="" v-model="detailData.faxNumCt" />
                    <input type="text" id="fax-number01" class="t-c three_input disabled" disabled placeholder="" v-model="faxNum[0]" />
                    <i>-</i>
                    <input type="text" id="fax-number02" class="t-c three_input disabled" disabled placeholder="" v-model="faxNum[1]" />
                    <i>-</i>
                    <input type="text" id="fax-number03" class="t-c three_input disabled" disabled placeholder="" v-model="faxNum[2]" />
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <label class="list_title" for="">{{ $t('message.email') }}</label>
                </th>
                <td>
                  <div class="form_input"><input type="text" id="" class="t-l solo_input disabled" disabled placeholder="" v-model="detailData.email" /></div>
                </td>
                <th>
                  <label class="list_title" for="">{{ $t('message.handleItem') }}</label>
                </th>
                <td>
                  <div class="form_input"><input type="text" id="" class="solo_input disabled" disabled placeholder="" v-model="detailData.prdtClsNm" /></div>
                </td>
                <th>
                  <label class="list_title" for="">{{ $t('message.custCls') }}</label>
                </th>
                <td>
                  <div class="form_input"><input type="text" id="" class="t-l solo_input disabled" disabled placeholder="" v-model="detailData.custTypeNm" /></div>
                </td>
              </tr>
              <tr>
                <th>
                  <label class="list_title" for="address">{{ $t('message.addr') }}</label>
                </th>
                <td colspan="5">
                  <div class="form_input" style="width: 100%">
                    <input type="text" style="width: 20%" id="" class="t-l disabled" disabled placeholder="" v-model="detailData.cityNm" />
                    <input type="text" style="width: 20%" id="" class="t-l disabled" disabled placeholder="" v-model="detailData.distrNm" />
                    <input type="text" style="width: 60%" id="" class="t-l disabled" disabled placeholder="" v-model="detailData.addr" />
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <label class="list_title" for="">{{ $t('message.postNum') }}</label>
                </th>
                <td>
                  <div class="form_input"><input type="text" id="" class="t-l solo_input disabled" disabled placeholder="" v-model="detailData.postNum" /></div>
                </td>
                <th>
                  <label class="list_title" for="">{{ $t('message.manageCls') }}</label>
                </th>
                <td>
                  <div class="form_input"><input type="text" id="" class="solo_input disabled" disabled placeholder="" v-model="detailData.operClsNm" /></div>
                </td>
              </tr>
            </table>
          </div>
          <h2 class="mypage_title">{{ $t('message.erpInfo') }}</h2>
          <div class="table">
            <table>
              <colgroup>
                <col style="width: 15%" />
                <col style="width: " />
                <col style="width: " />
                <col style="width: " />
              </colgroup>
              <thead>
                <tr>
                  <th></th>
                  <th>{{ $t('message.kor') }}</th>
                  <th>{{ $t('message.eng') }}</th>
                  <th>{{ $t('message.vnm') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ $t('message.clientNm') }}</td>
                  <td>
                    <div class="form_input">
                      <input type="text" id="" class="t-l solo_input" placeholder="" v-model="detailData.custKorNm" />
                    </div>
                  </td>
                  <td>
                    <div class="form_input">
                      <input type="text" id="" class="t-l solo_input" placeholder="" v-model="detailData.custEngNm" />
                    </div>
                  </td>
                  <td>
                    <div class="form_input">
                      <input type="text" id="" class="t-l solo_input" placeholder="" v-model="detailData.custVnmNm" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>{{ $t('message.ceoNm') }}</td>
                  <td>
                    <div class="form_input">
                      <input type="text" id="" class="t-l solo_input" placeholder="" v-model="detailData.ceoKorNm" />
                    </div>
                  </td>
                  <td>
                    <div class="form_input">
                      <input type="text" id="" class="t-l solo_input" placeholder="" v-model="detailData.ceoEngNm" />
                    </div>
                  </td>
                  <td>
                    <div class="form_input">
                      <input type="text" id="" class="t-l solo_input" placeholder="" v-model="detailData.ceoVnmNm" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>{{ $t('message.addrDtlsInfo') }}</td>
                  <td>
                    <div class="form_input">
                      <input type="text" id="" class="t-l solo_input" placeholder="" v-model="detailData.addrKor" />
                    </div>
                  </td>
                  <td>
                    <div class="form_input">
                      <input type="text" id="" class="t-l solo_input" placeholder="" v-model="detailData.addrEng" />
                    </div>
                  </td>
                  <td>
                    <div class="form_input">
                      <input type="text" id="" class="t-l solo_input" placeholder="" v-model="detailData.addrVnm" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 class="mypage_title">
            {{ $t('message.mainAddr') }}
            <button class="btn_default btn_process" @click="addLogits">{{ $t('message.btnAddDelivery') }}</button>
          </h2>
          <div class="table">
            <table>
              <colgroup>
                <col style="width: 15%" />
                <col style="width: 15%" />
                <col style="width: 15%" />
                <col style="width: 15%" />
                <col style="width: 15%" />
                <col style="width: " />
              </colgroup>
              <thead>
                <tr>
                  <th>{{ $t('message.addrNm') }}</th>
                  <th>{{ $t('message.postNum') }}</th>
                  <th>{{ $t('message.chargNm') }}</th>
                  <th>{{ $t('message.callNum') }}1</th>
                  <th>{{ $t('message.callNum') }}2</th>
                  <th>{{ $t('message.noteRemark') }}</th>
                </tr>
                <tr>
                  <th>{{ $t('message.cityNm') }}</th>
                  <th>{{ $t('message.distrNm') }}</th>
                  <th colspan="4">{{ $t('message.addrDtls') }}</th>
                </tr>
              </thead>
              <tbody v-for="(list, index) in logitsList" v-bind:key="index">
                <tr>
                  <td>{{ list.logitsAlias }}</td>
                  <td>{{ list.postNum }}</td>
                  <td>{{ list.trnMngNm }}</td>
                  <td>{{ list.phoneNum1 }}</td>
                  <td>{{ list.phoneNum2 }}</td>
                  <td><img src="@/assets/img/icon_note.png" @click="remarkOpen(list.logitsRemark)" /></td>
                </tr>
                <tr>
                  <td>{{ list.cityNm }}</td>
                  <td>{{ list.distrNm }}</td>
                  <td class="t-l" colspan="3">{{ list.addr }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- //board 리스트 -->
    </div>
    <DeliverRegistModal @updateDeliver="setUpdate" :registCardId="null" :addInfo="addinfo" />
  </div>
</template>

<script>
import masterApi from '@/api/master/master';
import orderApi from '@/api/order/order';
import DeliverRegistModal from '@/modal/mypage/DeliverRegistModal.vue';

export default {
  components: { DeliverRegistModal },
  data() {
    return {
      detailData: '',
      logitsList: [],
      addinfo: '',
      //
      phoneNum: [],
      mobileNum: [],
      faxNum: [],
    };
  },
  props: {
    openInfo: {
      type: Object,
    },
  },
  watch: {
    openInfo() {
      this.loadCustList();
      this.loadLogitsList();
    },
  },
  methods: {
    //
    async loadCustList() {
      try {
        let param = {
          id: this.openInfo.id,
        };
        const response = await masterApi.getCustMngDtls(param);
        this.detailData = response.data.rs.detail;
        if (this.detailData.phoneNum) this.phoneNum = this.detailData.phoneNum.split('-');
        if (this.detailData.mobileNum) this.mobileNum = this.detailData.mobileNum.split('-');
        if (this.detailData.faxNum) this.faxNum = this.detailData.faxNum.split('-');
        console.log('얍얍 > ', this.detailData);
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async loadLogitsList() {
      let param = {
        custId: this.openInfo.id,
        filter: '',
        cityCd: '',
        distrCd: '',
      };
      try {
        const response = await orderApi.getUserLogits(param);
        this.logitsList = response.data.ds;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    addLogits() {
      //배송지 추가
      this.addinfo = this.openInfo.id;
      this.$modal.show('DeliverRegistModal', { custId: this.addinfo, isNew: true });
    },
    async setUpdate(checkFlag, flag, ment) {
      this.$modal.hide('DeliverRegistModal');
      await this.loadLogitsList();
      this.$EventBus.$emit('openYesModal', ment);
    },
    remarkOpen(param) {
      this.$EventBus.$emit('openYesModal', param);
    },
  },
  created() {},
  async mounted() {
    await this.loadCustList();
    await this.loadLogitsList();
  },
  destroyed() {},
};
</script>

<style></style>
