<template>
  <modal :name="`DraftDocumentListModal${page}`" width="1000" height="auto" :clickToClose="false" @before-open="beforeOpen">
    <div class="modal" id="">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide(`DraftDocumentListModal${page}`)"></button>
      </div>
      <p class="modal_title_t04">{{ searchInfo.prdtCd }} / {{ searchInfo.prdtNm }}</p>
      <div class="modal_content a-c">
        <div class="table table_scroll">
          <table>
            <colgroup>
              <col style="width: 130px" />
              <col style="width: 200px" />
              <col style="width: 100px" />
              <col style="width: 100px" />
              <col style="width: " />
            </colgroup>
            <thead>
              <tr>
                <th>{{ $t('message.registrDate') }}</th>
                <th>{{ $t('message.rangeDt') }}</th>
                <th v-if="page === 'itemPriceList'">{{ $t('message.standardPrice') }}</th>
                <th v-else-if="page === 'salePriceList'">{{ $t('message.orderPrice') }}</th>
                <th>{{ $t('message.status') }}</th>
                <th>{{ $t('message.apprDocNum') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(appr, index) in apprList" :key="index">
                <td>{{ appr.updatedAt | vnDateFormatD }}</td>
                <td>{{ appr.sttDt | vnDateFormatD }} ~ {{ appr.endDt | vnDateFormatD }}</td>
                <td class="t-r">{{ appr.aplyPrice }}</td>
                <!-- <td class="t-r" v-if="page === 'itemPriceList'">{{ appr.aplyPrice }}</td> -->
                <!-- <td class="t-r" v-else-if="page === 'salePriceList'">{{ appr.basePrice }}</td> -->
                <td>{{ appr.apprStat }}</td>
                <td>{{ appr.apprDocNum }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'DraftDocumentListModal',
  props: ['page'],
  data() {
    return {
      active: false,
      apprList: [],
      searchInfo: {},
    };
  },
  methods: {
    beforeOpen(event) {
      this.searchInfo = event.params.searchInfo;
      this.apprList = event.params.apprList;
      this.apprDocNumText = event.params.apprDocNumText;
      this.apprList.forEach(list => {
        list.updatedAt = dayjs(list.updatedAt).format('YYYY-MM-DD');
        if (list.aplyPrice && list.aplyPrice !== '' && list.aplyPrice !== 0) {
          list.aplyPrice = Number(list.aplyPrice).toLocaleString('en');
        } else {
          list.aplyPrice = 0;
        }
        // if (list.basePrice && list.basePrice !== '' && list.basePrice !== 0) {
        //   list.basePrice = Number(list.basePrice).toLocaleString('en');
        // } else {
        //   list.basePrice = 0;
        // }
        if (list.apprDocNum && list.apprDocNum !== '') {
          list.apprStat = this.apprDocNumText.apprDocNumY;
        } else {
          list.apprStat = this.apprDocNumText.apprDocNumN;
        }
      });
    },
  },
};
</script>

<style></style>
