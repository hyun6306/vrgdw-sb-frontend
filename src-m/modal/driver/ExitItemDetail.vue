<template>
  <modal name="ExitItemDetail" width="1000" height="auto" :adaptive="true" @before-close="close" @before-open="setItemInfo" :clickToClose="false">
    <div class="modal">
      <!-- <TranAlarmYesModal :ment="ment" /> -->
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('ExitItemDetail')"></button>
      </div>
      <p class="modal_title_t02">
        <!-- {{ $t('label.deliveryRequest') }} -->
        {{ $t('message.detailInfo') }}
      </p>
      <div class="modal_content dr_content">
        <h2 class="table_title">
          <span>{{ $t('message.detailInfo') }}</span>
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
                <!-- 고객사명 -->
                <th>{{ $t('message.custNm') }}</th>
                <td>
                  <!-- <span class="">{{ this.exitItem[0].custNm }}</span> -->
                </td>
                <!-- 요청일 -->
                <th>{{ $t('message.reqDeliverDt') }}</th>
                <td>
                  <!-- <span>{{ this.exitItem[0].reqDt }}</span> -->
                </td>
              </tr>
              <tr>
                <!-- 배송지명 -->
                <th>{{ $t('message.addrNm') }}</th>
                <td>
                  <!-- <span class="">{{ this.exitItem[0].logitsAlias }}</span> -->
                </td>
                <!-- 주소 -->
                <th>{{ $t('message.addr') }}</th>
                <td>
                  <!-- <span class="">{{ this.exitItem[0].addr }}</span> -->
                </td>
              </tr>
              <tr>
                <!-- 배차요청일 -->
                <th>{{ $t('message.reqDt') }}</th>
                <td>
                  <!-- <span>{{ this.exitItem[0].trnReqDt }}</span> -->
                </td>
                <!-- 출차일 -->
                <th>{{ $t('message.outDt') }}</th>
                <td>
                  <!-- <span>{{ this.exitItem[0].outDt }}</span> -->
                </td>
              </tr>
              <!-- <tr>
                사용여부
                <th>{{ $t('message.useYn') }}</th>
                <td>
                  <span>{{}}</span>
                </td>
              </tr> -->
            </tbody>
          </table>
        </div>

        <div class="modal_btn_contents_t05">
          <button class="btn_default" @click="$modal.hide('ExitItemDetail')">{{ $t('message.btnCheck') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  data() {
    return {
      exitItem: [],
    };
  },
  components: {},
  // props: ['page'],
  watch: {},
  methods: {
    async setItemInfo(event) {
      this.exitItem = event.params.item;
    },
    close() {
      this.exitItem = '';
    },
  },
  mounted() {},
};
</script>

<style></style>
