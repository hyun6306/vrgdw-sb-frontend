<template>
  <modal name="CarNumSearchModal" width="1210" height="800" :adaptive="true" @before-open="open" @before-close="close" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="cancel()"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.selVehiNum') }}</p>
      <div class="modal_content customer_content">
        <div class="search_content">
          <div class="search_box" ref="search_box_height" :class="{ search_close_00: searchOpen }" :style="`height:${search_box_height}`">
            <div class="search_box_filter">
              <div class="filter_list">
                <label for="" class="filter_type" style="width: 400px">
                  <span class="filter_type_title" style="width: 80px">{{ $t('message.tranNm') }}</span>
                  <!-- 운송사 로그인시 선택 불가 -->
                  <input type="text" id="담당자명" v-model="trncusId.text" v-if="this.userMenuGrpCd == 'TRANSCUS'" style="" class="disabled t-l" disabled placeholder="" />
                  <!-- 물류담당자 로그인시 선택 가능 -->
                  <MultiSelect id="Material_Group" v-else style="width: 300px" v-model="trncusId" :options="tranList" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder=""></MultiSelect>
                </label>
                <label for="destination_name" class="filter_type">
                  <span class="filter_type_title" style="width: 80px">{{ $t('message.tranCarNum') }}</span>
                  <input type="text" id="destination_name" style="" class="" v-model="trnCarNum" placeholder="" @keyup.enter="carNumSelect()" ref="trnCarNum" />
                </label>
                <!-- <label for="" class="filter_type">
                  <span class="filter_type_title" style="width: 80px">{{ $t('message.useYn') }}</span>
                  <MultiSelect id="" class="disabled" style="width: 164px" v-model="useYn" :options="useYnSelect" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" disabled placeholder=""></MultiSelect>
                </label> -->
                <div style="display: flex; margin-left: auto">
                  <button class="btn_search_text_row btn_reset" style="margin-right: 10px" @click="reset">{{ $t('message.btnInit') }}</button>
                  <button class="btn_search_text_row" @click="carNumSelect()">{{ $t('message.btnSearch') }}</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 검색 버튼 클릭시 on 클래스 추가-->
        <!-- 리프레시 버튼 클릭시 on클래스 삭제-->
        <!-- 리얼그리드 -->
        <div class="realgrid_container modal_realgrid05">
          <div class="real_head">
            <div class="real_head_left">
              <small>{{ $t('message.carInfo') }}</small>
            </div>
            <div class="real_head_right">
              <button class="btn_default btn_critical_process" v-if="!noRegit" @click="carRegist('regist')">{{ $t('message.btnVehiRegist') }}</button>
            </div>
          </div>

          <div class="customer_table" style="min-height: 550px">
            <div class="table">
              <table>
                <colgroup>
                  <col style="width: 50px" />
                  <col style="width: 50px" />
                  <col style="width: 200px" />
                  <col style="width: 150px" />
                  <col style="width: 150px" />
                  <col style="width: 150px" />
                  <col style="width: 150px" />
                  <col style="width: 150px" />
                </colgroup>
                <thead>
                  <tr>
                    <th style="padding: 21px 5px">{{ $t('message.num') }}</th>
                    <th></th>
                    <th>{{ $t('message.tranNm') }}</th>
                    <th>{{ $t('message.tranCarNum') }}</th>
                    <th>{{ $t('message.driverNm') }}</th>
                    <th>{{ $t('message.phoneNumber') }}</th>
                    <th>{{ $t('message.phoneNum') }}</th>
                    <th>{{ $t('message.vehiSpecifi') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(list, index) in carList" :key="index" @click="radioChange(index)" @dblclick="confirm">
                    <td>{{ index + 1 }}</td>
                    <td>
                      <label class="radio_b">
                        <input type="radio" @change="radioChange(index)" name="radio" v-model="picked" :value="index" />
                        <span class="checkmark"></span>
                      </label>
                    </td>
                    <!-- 운송사 -->
                    <td class="t-l">{{ list.trncusNm }}</td>
                    <!-- 차량번호 -->
                    <td @click="carRegist()" v-if="!noRegit">
                      <p class="underline">{{ list.tranCarNum }}</p>
                    </td>
                    <td v-else>
                      {{ list.tranCarNum }}
                    </td>
                    <!-- 기사명 -->
                    <td class="t-l">{{ list.driverNm }}</td>
                    <!-- 핸드폰번호 -->
                    <td>{{ list.driverMobileNum }}</td>
                    <!-- 전화번호 -->
                    <td>{{ list.driverPhoneNum }}</td>
                    <!-- 차량규격 -->
                    <td>{{ list.carTypeNm }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="not_search_result t-c" v-if="carList && carList.length === 0">{{ $t('message.msgNoCarNum') }}</div>
            </div>
          </div>

          <div class="modal_btn_contents_t05">
            <button class="btn_default" @click="cancel()">{{ $t('message.btnCancel') }}</button>
            <button class="btn_primary" @click="confirm()">{{ $t('message.btnSelect') }}</button>
          </div>
        </div>
      </div>
    </div>
    <CarInfoRegistModal :rowData="radio" :page="page" :trnCustOptions="tranList" :carTypeList="carTypeList" @isReSearch="isReSearch" />
  </modal>
</template>

<script>
// import commonApi from '@/api/common';
import { mapGetters } from 'vuex';
import tranApi from '@/api/tran/tran';
import CarInfoRegistModal from '@/modal/tran/CarInfoRegistModal';

export default {
  name: 'CarNumSearchModal',
  components: {
    CarInfoRegistModal,
  },
  props: {
    page: {
      type: String,
    },
    tranSelect: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters({
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
      getTrncusId: 'userInfo/getTrncusId',
    }),
  },
  data() {
    return {
      tranList: [],
      trncusId: {},
      trnCarNum: '',
      carTypeList: [],
      useYn: { text: 'Y', value: 'Y' },
      useYnSelect: [
        { text: 'ALL', value: '' },
        { text: 'Y', value: 'Y' },
        { text: 'N', value: 'N' },
      ],
      search_box_height: '',
      searchOpen: false,
      carList: [],
      radio: '',
      picked: '',
      ment: '',
      carInfo: [],
      noRegit: false,
    };
  },
  methods: {
    isReSearch() {
      if (this.carList.length !== 0) this.carNumSelect();
    },
    reset() {
      if (this.userMenuGrpCd !== 'TRANSCUS') this.trncusId = this.tranList[0];
      this.trnCarNum = '';
    },
    clear() {
      this.carList = [];
      // this.useYn = 'Y';
      this.trnCarNum = '';
      this.radio = '';
      this.picked = '';
    },
    carRegist(data) {
      if (data === 'regist') {
        this.radio = '';
        this.$modal.show('CarInfoRegistModal', { type: 'regist', trncusId: this.trncusId });
      } else {
        this.$modal.show('CarInfoRegistModal', { type: '', trncusId: this.trncusId });
      }
    },
    closePopUp() {
      this.$modal.hide('CarNumSearchModal');
    },
    radioChange(index) {
      this.radio = '';
      this.picked = index;
      this.radio = this.carList[index];
    },
    async carNumSelect(isCurrent) {
      if (!isCurrent) this.$refs.trnCarNum.blur();
      try {
        const param = {
          trncusId: this.trncusId.value,
          tranCarNum: this.trnCarNum ? this.trnCarNum : '',
          useYn: 'Y',
        };
        const response = await tranApi.getCarManageList(param);
        this.carList = response.data.ds;
        if (this.carList) this.radioChange();
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    infoMent(data) {
      this.ment = data;
    },
    async getTranList() {
      try {
        const resp = await tranApi.getTranList();
        this.tranList = resp.data.ds;
        if (this.tranList.length > 0) {
          this.tranList.unshift({ text: this.$t('message.all'), value: '' });
          if (this.tranSelect.length !== 0) {
            this.trncusId = this.tranSelect;
          } else {
            this.trncusId = this.tranList[0];
          }
        }
        if (this.userMenuGrpCd === 'TRANSCUS') {
          this.tranList.forEach(list => {
            if (this.getTrncusId == list.value) {
              this.trncusId = list;
            }
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
    async loadCarTypeList() {
      try {
        const response = await tranApi.getCarTypeList();
        this.carTypeList = response.data.ds;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    confirm() {
      if (this.radio) {
        this.$emit('sendCarInfo', this.radio);
        this.closePopUp();
      } else {
        this.$EventBus.$emit('openYesModal', 'message.msgNoSelectCar');
      }
    },
    cancel() {
      this.$emit('sendCarInfo', '');
      this.closePopUp();
    },
    async open(event) {
      this.noRegit = event.params.noRegit;
      if (this.page == 'carInOutManage') {
        this.carInfo = '';
        this.trnCarNum = event.params.trnCarNum;
      } else {
        this.carInfo = event.params.carInfo;
      }
      await this.getTranList();
      await this.loadCarTypeList();
      this.carNumSelect();
    },
    close() {
      this.clear();
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
};
</script>

<style></style>
