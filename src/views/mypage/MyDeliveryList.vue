<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <!-- 고객사 검색 모달 -->
            <!-- fn1 으로 제어되겠지? -->
            <label class="filter_type" for="custoer_name">
              <span class="filter_type_title">{{ $t('message.custNm') }}</span>
              <div v-if="userMenuGrpCd !== 'CUSTOMER'" class="form_inputnbtn">
                <input id="custoer_name" v-model="custNm" style="width: 224px" type="text" @keyup.enter="clientSearch" />
                <button class="btn_search_basic_info" @click="clientSearch">
                  <img src="@/assets/img/icon_search.png" />
                </button>
              </div>
              <input v-if="userMenuGrpCd === 'CUSTOMER'" id="담당자명" v-model="custNm" class="disabled t-l" style="width: 250px" disabled placeholder="" type="text" />
            </label>
            <div style="display: flex; margin-left: auto">
              <button class="btn_reset" style="margin-right: 10px" @click="reset()">{{ $t('message.btnInit') }}</button>
              <button class="btn_search_text" @click="searchLogtis">{{ $t('message.btnSearch') }}</button>
            </div>
          </div>
          <div class="filter_list">
            <label for="" class="filter_type filter_type03">
              <!-- 배송권역 -->
              <span class="filter_type_title">{{ $t('message.deliverArea') }}</span>
              <MultiSelect track-by="text" label="text" id="Material_Group" style="width: 250px" v-model="cityCd" :options="cityOptions" :allow-empty="false" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="" @input="changeCityCd()"></MultiSelect>
              <MultiSelect track-by="text" label="text" id="Material_Group" style="width: 250px" v-model="distrCd" :options="distrOptions" :allow-empty="false" :searchable="false" :close-on-select="true" :show-labels="false" placeholder=""></MultiSelect>
              <div class="form_input" style="width: 300px">
                <input ref="filter" @keyup.enter="searchLogtis" type="text" id="postal_code" v-model="filter" style="width: 300px" class="t-l" :placeholder="$t('message.msgInfoSearch')" />
                <!-- <button class="btn_search_basic_info" @click="searchLogtis"><img src="@/assets/img/icon_search.png" /></button> -->
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- //검색필터 영역 -->

    <!-- 배송지 리스트 -->
    <div class="notice_section">
      <div class="board_head">
        <!-- 총건 -->
        <small>
          {{ $t('message.totalSelection1') }}
          <i> {{ allLogits.length }} </i>
          {{ $t('message.totalSelection2') }}
        </small>
      </div>
      <!-- default_address => 배경색 녹색처리됨 -->
      <!-- 배송지정보 조회 시 response.data.ds의 길이만큼 카드 생성 -->
      <div :key="index" v-for="(card, index) in allLogits">
        <div :class="[card.mainLogitsYn == 'Y' ? 'shippinglist_box default_address' : 'shippinglist_box']">
          <div>
            <label class="chechbox_address">
              <input id="checkBox" ref="checkBox" type="checkbox" :name="'logit' + index" :true-value="index" v-model="mainLogitsYn" />
              <span class="checkmark"></span>
              <!-- 기본배송지 -->
              {{ card.logitsAlias }}
            </label>
          </div>
          <div class="btn_address_box">
            <!-- 수정삭제버튼 -->
            <button class="btn_default btn_function" v-bind:value="card.id" @click="updateDeliver(card)">{{ $t('message.btnUpdate') }}</button>
            <button class="btn_default btn_function" v-bind:value="card.id" @click="deleteDeliver(card)">{{ $t('message.btnDelete') }}</button>
          </div>
          <ul>
            <li class="address_list">
              <!-- 우편번호 -->
              <p class="address_list_title">{{ $t('message.postNum') }}</p>
              <span class="address_list_info">{{ card.postNum }}</span>
            </li>
            <!-- 배송권역 -->
            <!-- <li class="address_list three">
              <p class="address_list_title">{{ $t('message.deliverArea') }}</p>
              <span class="address_list_info">{{ card.cityNm }} {{ card.distrNm }}</span>
            </li> -->
            <li class="address_list">
              <!-- 상세주소 -->
              <p class="address_list_title">{{ $t('message.addrDtls') }}</p>
              <span class="address_list_info">{{ card.addr }}, {{ card.distrNm }}, {{ card.cityNm }}</span>
            </li>
            <li class="address_list three">
              <!-- 담당자명 -->
              <p class="address_list_title">{{ $t('message.picNm') }}</p>
              <span class="address_list_info">{{ card.trnMngNm }}</span>
            </li>
            <li class="address_list three">
              <!-- 연락처1 -->
              <p class="address_list_title">{{ $t('message.callNum1') }}</p>
              <span class="address_list_info">{{ card.phoneNum1 }}</span>
            </li>
            <li class="address_list three">
              <!-- 연락처2 -->
              <p class="address_list_title">{{ $t('message.callNum2') }}</p>
              <span class="address_list_info">{{ card.phoneNum2 }}</span>
            </li>
            <li class="address_list">
              <!-- 특이사항 -->
              <p class="address_list_title">{{ $t('message.noteRemark') }}</p>
              <div class="form_textarea">
                <textarea disabled v-model="card.logitsRemark" type="text" rows="5" style="width: 100%" />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="not_search_result_address" v-if="allLogits.length === 0 && !noData">{{ $t('message.msgResultNotfound') }}</div>
      <div class="not_search_result_address" v-if="allLogits.length === 0 && noData">{{ $t('message.msgNoNewAddress') }}</div>
      <div class="board_footer">
        <div class="footer_left"></div>
        <div class="footer_right">
          <!-- 배송지추가하기 -->
          <button class="btn_default btn_critical_process" @click="addDelivery">{{ $t('message.btnAddDelivery') }}</button>
          <!-- 저장 -->
          <button class="btn_default btn_critical_process" @click="changeMain">{{ $t('message.btnSave') }}</button>
        </div>
      </div>
    </div>

    <!-- //배송지 리스트 -->
    <ClientSearchModal ref="ClientSearchModal" @sendCustId="sendCustId" @sendInfoInput="sendInfoInput" />
    <DeliverNoticeModal @updateDeliver="setUpdate" :ment="ment" />
    <DeliverRegistModal @updateDeliver="setUpdate" :registCardId="registCardId" :addInfo="null" />
    <NoticeModal :ment="ment" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NoticeModal from '@/modal/order/NoticeModal';
import DeliverRegistModal from '@/modal/mypage/DeliverRegistModal';
import orderApi from '@/api/order/order';
// import joinApi from '@/api/signIn';
import commonApi from '@/api/common';
import DeliverNoticeModal from '@/modal/mypage/DeliverNoticeModal';
import ClientSearchModal from '@/modal/order/ClientSearchModal';

export default {
  components: {
    DeliverNoticeModal,
    DeliverRegistModal,
    NoticeModal,
    ClientSearchModal,
  },
  data() {
    return {
      custNm: '',
      custId: '',
      mainLogitsYn: '',
      registCardId: '',
      cardId: '',
      filter: '',
      postNum: '',
      eachLogits: {},
      allLogits: [],
      cityOptions: [],
      distrOptions: [{ text: this.$t('message.all'), value: '' }],
      cityCd: { text: this.$t('message.all'), value: '' },
      distrCd: { text: this.$t('message.all'), value: '' },
      noMain: '',
      ment: '',
      noData: false,
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/getUserInfo',
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      userCustId: 'userInfo/getUserCustId',
    }),
  },
  watch: {},
  methods: {
    clientSearch() {
      this.custId = this.userMenuGrpCd === 'CUSTOMER' ? this.userInfo.custId : this.custId;
      this.$refs.ClientSearchModal.customerList(this.custNm, 'info');
      if (this.custNm === '') {
        this.$modal.show('ClientSearchModal');
      }
    },
    sendInfoInput(result) {
      if (result.length === 1) {
        this.sendCustId(result[0].custId);
      } else {
        this.$modal.show('ClientSearchModal', { custNm: this.custNm });
      }
    },
    sendCustId(id) {
      if (typeof id === 'object') {
        if (id.length > 1 || id.length === 0) {
          this.$modal.show('ClientSearchModal', { custNm: this.custNm });
        } else {
          this.custId = id[0].custId;
          this.getUserOfferInfo();
        }
      } else if (id !== '') {
        this.custId = id;
        this.getUserOfferInfo();
      }
    },
    async getUserOfferInfo() {
      try {
        const param = this.userMenuGrpCd === 'CUSTOMER' ? { custId: this.userCustId } : { custId: this.custId };
        const response = await orderApi.getUserOfferInfo(param);
        const userOfferInfo = response.data.rs;
        this.custNm = userOfferInfo.custNm;
      } catch (e) {
        console.log(e);
        this.$EventBus.$emit('openYesModal', e.err.data.message);
      }
    },
    reset() {
      if (this.userMenuGrpCd !== 'CUSTOMER') {
        this.custNm = '';
        this.custId = '';
      }
      this.cityCd = { text: this.$t('message.all'), value: '' };
      this.distrCd = { text: this.$t('message.all'), value: '' };
      this.distrOptions = [{ text: this.$t('message.all'), value: '' }];
      this.filter = '';
    },
    // 저장 버튼 클릭 시, 배송지 목록 화면에서는 기본배송지 여부와 특이사항만 수정 가능하다. 자세한 수정은 수정 버튼을 클릭해야한다.
    async changeMain(deleteType) {
      if (this.userMenuGrpCd !== 'CUSTOMER' && this.custId === '') {
        this.$EventBus.$emit('openYesModal', 'message.msgNoCustId');
      } else {
        try {
          if (deleteType == 'new') {
            const param = {
              id: this.allLogits[1].id,
              custId: this.userMenuGrpCd == 'CUSTOMER' ? this.userCustId : this.custId,
              logitsAlias: this.allLogits[1].logitsAlias,
              cityCd: this.allLogits[1].cityCd,
              distrCd: this.allLogits[1].distrCd,
              postNum: this.allLogits[1].postNum,
              addr: this.allLogits[1].addr,
              phoneNum1: this.allLogits[1].phoneNum1,
              phoneNum2: this.allLogits[1].phoneNum2,
              trnMngNm: this.allLogits[1].trnMngNm,
              logitsRemark: this.allLogits[1].logitsRemark,
              mainLogitsYn: 'Y',
            };
            const response = await orderApi.saveUserLogitsBaseAddr(param);
            if (response.data.status == 200) {
              this.$EventBus.$emit('openYesModal', 'message.msgResultSave');
              this.getLogits();
            }
            return;
          } else if (deleteType == 'delete') {
            if (this.allLogits.length <= 1) {
              // await this.getCustArea();
              await this.getLogits();
            } else if (this.allLogits.length >= 2) {
              const param = {
                id: this.allLogits[1].id,
                custId: this.userMenuGrpCd == 'CUSTOMER' ? this.userCustId : this.custId,
                logitsAlias: this.allLogits[1].logitsAlias,
                cityCd: this.allLogits[1].cityCd,
                distrCd: this.allLogits[1].distrCd,
                postNum: this.allLogits[1].postNum,
                addr: this.allLogits[1].addr,
                phoneNum1: this.allLogits[1].phoneNum1,
                phoneNum2: this.allLogits[1].phoneNum2,
                trnMngNm: this.allLogits[1].trnMngNm,
                logitsRemark: this.allLogits[1].logitsRemark,
                mainLogitsYn: 'Y',
              };
              const response = await orderApi.saveUserLogitsBaseAddr(param);
              if (response.data.status == 200) {
                this.$EventBus.$emit('openYesModal', 'message.msgResultSave');
                this.getLogits();
              }
              return;
            }
          } else if (deleteType !== 'delete' || !deleteType || deleteType !== 'new') {
            // this.registCardId;
            // if (this.mainLogitsYn == 0) {}
            if (this.mainLogitsYn !== 0 && (this.mainLogitsYn == '' || this.mainLogitsYn == false)) {
              this.$EventBus.$emit('openYesModal', 'message.msgDefaultAddr');
              return;
            }
            const change = this.allLogits[this.mainLogitsYn];
            const param = {
              id: change.id,
              custId: this.userMenuGrpCd == 'CUSTOMER' ? this.userCustId : this.custId,
              logitsAlias: change.logitsAlias,
              cityCd: change.cityCd,
              distrCd: change.distrCd,
              postNum: change.postNum,
              addr: change.addr,
              phoneNum1: change.phoneNum1,
              phoneNum2: change.phoneNum2,
              trnMngNm: change.trnMngNm,
              logitsRemark: change.logitsRemark,
              mainLogitsYn: 'Y',
            };
            const response = await orderApi.saveUserLogitsBaseAddr(param);
            if (response.data.status == 200) {
              this.$EventBus.$emit('openYesModal', 'message.msgResultSave');
              this.getLogits();
            }
          }
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
    // 배송지추가하기 클릭(신규배송지 등록)
    async addDelivery() {
      if (this.userMenuGrpCd !== 'CUSTOMER' && this.custId === '') {
        this.$EventBus.$emit('openYesModal', 'message.msgNoCustId');
      } else {
        this.$modal.show('DeliverRegistModal', { custId: this.custId, isNew: true });
      }
    },
    setUpdate(checkFlag, flag, ment) {
      this.ment = ment;
      // 3번
      // 1. 배송지 삭제
      if (flag == 'delete' && ment == 'message.msgResultSave') {
        const deleteType = 'delete';
        // 1. 기본배송지 삭제 시
        if (checkFlag == true && flag == 'delete') {
          this.changeMain(deleteType);
          // 2. 일반배송지 삭제 시
        } else if (flag == 'delete' && (checkFlag == false || checkFlag == '')) {
          this.getLogits();
        }
        // this.getLogits();
        // this.$modal.show('NoticeModal');
        // 삭제하였을 떄, 기본배송지가 삭제 되었다면 확인 후 [0]번 인덱스에 기본배송지 저장하기.
        return;
        // 2. 배송지 수정 후 저장
      } else if (flag == 'update' && ment == 'message.msgResultSave') {
        // 신규배송지 response 이후 타는 곳.
        this.$modal.hide('DeliverRegistModal');
        // 신규배송지 저장 후 배송지조회하는 곳.
        this.getLogits();
        this.$modal.show('NoticeModal');
        return;
        // 3. 배송지 수정 후 저장 실패(필수값 미 입력)
      } else if (flag == 'require' && ment == 'message.msgValidEssential') {
        this.$modal.show('NoticeModal');
        return;
      }
    },
    // 배송지삭제
    deleteDeliver(list) {
      this.deliverDelFlag = true;
      this.ment = 'message.msgCheckDelete';
      this.$modal.show('DeliverNoticeModal', { delivery: list });
    },
    // 배송지수정
    async updateDeliver(list) {
      this.$modal.show('DeliverRegistModal', { isNew: false, delivery: list });
    },
    // 배송지검색
    async searchLogtis() {
      this.$refs.filter.blur();
      if (this.custNm === '') this.custId = '';
      if (this.userMenuGrpCd !== 'CUSTOMER' && this.custId === '') {
        this.$EventBus.$emit('openYesModal', 'message.msgNoCustId');
      } else {
        const param = {
          custId: this.userMenuGrpCd === 'CUSTOMER' ? this.userCustId : this.custId,
          cityCd: this.cityCd.value,
          distrCd: this.distrCd.value,
          filter: this.filter,
        };
        try {
          const response = await orderApi.getUserLogits(param);
          this.allLogits = response.data.ds;
          // 전체배송지인 allLogits에서 기본배송지를 가지고 있는 index를 반환한다.
          const mainIndex = this.allLogits.findIndex(i => i.mainLogitsYn == 'Y');
          this.mainLogitsYn = mainIndex; // 인덱스로 체크 지정
          this.noData = false;
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
    // 배송지정보조회
    async getLogits() {
      this.searchLogtis();
      this.allLogits.find(list => {
        // 기본배송지가 존재한다면, mainLogitsYn을 index로 치환
        // 기본배송지가 있는 상태에서 신규배송지가 추가될 경우 추가된 신규배송지가 [0]인덱스를 먹는다.
        // 기본배송지와 신규배송지의 인덱스를 변경 후 mainLogitsYn을 index로 치환한다.
        if (list.mainLogitsYn === 'N') {
          this.noMain = true;
          this.searchLogtis();
        }
      });
      // }
    },
    changeCityCd() {
      this.getCommonCodeCombo(this.cityCd.value);
      this.distrCd = { text: this.$t('message.all'), value: '' };
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
  created() {},
  mounted() {
    this.getCommonCodeCombo();
    if (this.userMenuGrpCd === 'CUSTOMER') {
      this.getUserOfferInfo();
      this.searchLogtis();
    } else {
      this.noData = true;
    }
  },
  destroyed() {},
};
</script>

<style></style>
