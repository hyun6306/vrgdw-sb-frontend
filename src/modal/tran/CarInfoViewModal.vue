<template>
  <modal name="CarInfoViewModal" width="1000" height="auto" :adaptive="true" @before-close="close" @before-open="setCarInfo" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('CarInfoViewModal')"></button>
      </div>
      <p class="modal_title_t02">
        {{ $t('message.carInfo') }}
      </p>
      <div class="modal_content dr_content">
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 15%" />
              <col style="width: 35%" />
              <col style="width: 15%" />
              <col style="width: 35%" />
            </colgroup>
            <tbody v-if="custCarInfo == ''">
              <tr>
                <!-- 운송사명 -->
                <th>{{ $t('message.trnNm') }}</th>
                <td>
                  <span class="">{{ this.carInfoList.trncusNm }}</span>
                </td>
                <!-- 차량번호 -->
                <th>{{ $t('message.tranCarNum') }}</th>
                <td>
                  <span>{{ this.carInfoList.tranCarNum }}</span>
                </td>
              </tr>
              <tr>
                <!-- 차량유형 -->
                <th>{{ $t('message.carType') }}</th>
                <td>
                  <span class="">{{ this.carInfoList.carTypeNm }}</span>
                </td>
                <!-- 운전기사 -->
                <th>{{ $t('message.driverNm') }}</th>
                <td>
                  <span class="">{{ this.carInfoList.driverNm }}</span>
                </td>
              </tr>
              <tr>
                <!-- 연락처1 -->
                <th>{{ $t('message.mobileNum') }}</th>
                <td>
                  <span>{{ this.carInfoList.driverMobileNum }}</span>
                </td>
                <!-- 연락처2 -->
                <th>{{ $t('message.phoneNum') }}</th>
                <td>
                  <span>{{ this.carInfoList.driverPhoneNum }}</span>
                </td>
              </tr>
              <tr>
                <!-- 사용여부 -->
                <th>{{ $t('message.useYn') }}</th>
                <td>
                  <span>{{ this.carInfoList.useYn }}</span>
                </td>
              </tr>
            </tbody>
            <tbody v-if="carInfoList == ''">
              <tr>
                <!-- 고객사명 -->
                <th>{{ $t('message.clientNm') }}</th>
                <td>
                  <!-- <span class="">{{ this.custCarInfo.custNm }}</span> -->
                  <span class="">{{ this.custNm }}</span>
                </td>
                <!-- 차량번호 -->
                <th>{{ $t('message.tranCarNum') }}</th>
                <td>
                  <span>{{ this.custCarInfo.trnCarNum }}</span>
                </td>
              </tr>
              <tr>
                <!-- 운송기사 연락처 -->
                <th>{{ $t('message.mobileNum') }}</th>
                <td>
                  <span>{{ this.custCarInfo.driverPhoneNum }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="modal_btn_contents_t05">
          <button class="btn_default" @click="$modal.hide('CarInfoViewModal')">{{ $t('message.btnClose') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  data() {
    return {
      carInfoList: [],
      custCarInfo: {},
      custNm: '',
    };
  },
  components: {},
  props: ['page'],
  watch: {},
  methods: {
    async setCarInfo(event) {
      if (event.params.custCarInfo) {
        this.carInfoList = '';
        this.custCarInfo = event.params.custCarInfo;
        this.custNm = event.params.custNm;
      } else if (event.params.carInfoList) {
        this.custCarInfo = '';
        this.carInfoList = event.params.carInfoList[0];
      }
    },
    close() {
      this.carInfoList = '';
      this.custCarInfo = '';
    },
  },
  mounted() {},
};
</script>

<style></style>
