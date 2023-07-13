<template>
  <div style="margin-top: 15px">
    <h2 class="table_title">
      <span>{{ $t('message.trnCusCost') }}</span>
      <!-- <div class="a-l">
                <button class="btn_default btn_deep_green">선택삭제</button>
          </div> -->
    </h2>
    <div class="table">
      <table>
        <colgroup>
          <col style="width: 25%" />
          <col style="width: 20%" />
          <col style="width: 25%" />
          <col style="width: 15%" />
          <col style="width: 15%" />
        </colgroup>
        <thead>
          <tr>
            <th>{{ $t('message.trncusSelect') }}</th>
            <th>{{ $t('message.carType') }}</th>
            <th>{{ $t('message.destination') }}</th>
            <th>{{ $t('message.basicTranCost') }}</th>
            <th>{{ $t('message.tranCostInput') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!readOnly">
            <td>
              <MultiSelect id="Material_Group" v-model="tranOne" :allow-empty="false" :close-on-select="true" :options="tranList" :searchable="false" :show-labels="false" label="text" placeholder="" style="width: 100%"></MultiSelect>
            </td>
            <td>
              <MultiSelect id="Material_Group" v-model="deliCarCd" :allow-empty="false" :close-on-select="true" :options="deliCarOptions" :searchable="false" :show-labels="false" label="text" placeholder="" style="width: 100%"></MultiSelect>
            </td>
            <td class="t-l">{{ addrInfo.cityNm }} {{ addrInfo.distrNm }}</td>
            <td>{{ areaPrice.areaPrice | priceFormat }}</td>
            <td>
              <input id="" :value="areaEtcPrice | priceFormat" class="t-r" placeholder="" style="width: 100%" type="text" @input="inputEtcPrice" />
            </td>
          </tr>
          <tr v-else>
            <td>{{ tranOne.text }}</td>
            <td>{{ deliCarCd.text }}</td>
            <td class="t-l">{{ addrInfo.cityNm }} {{ addrInfo.distrNm }}</td>
            <td>{{ areaPrice.areaPrice | priceFormat }}</td>
            <td>
              {{ areaEtcPrice | priceFormat }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import tranApi from '@/api/tran/tran';
import commonApi from '@/api/common';

export default {
  props: ['addrInfo', 'areaPriceAmt', 'readOnly', 'lessCarrier'],
  data() {
    return {
      areaEtcPrice: '',
      tranOne: '',
      tranList: [],
      deliCarOptions: [],
      deliCarCd: {},
      areaPrice: {},
    };
  },
  watch: {
    lessCarrier() {
      if (this.tranList.length > 0) this.tranOne = this.tranList.find(list => list.text === this.lessCarrier?.trncusNm);
    },
  },
  methods: {
    inputEtcPrice(event) {
      this.areaEtcPrice = new String(event.target.value.replace(/^0+|\D+/g, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'));
    },
    sendAreaInfo() {
      return { areaEtcPrice: this.areaEtcPrice, trncusId: this.tranOne.value, carType: this.deliCarCd.value };
    },
    async getTranList() {
      try {
        const resp = await tranApi.getTranList();
        this.tranList = resp.data.ds;
        if (this.tranList.length > 0) {
          this.tranOne = this.tranList.find(list => list.text === this.lessCarrier?.trncusNm);
          if (!this.tranOne) this.tranOne = this.tranList[0];
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: 'Y',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);

        if (groupCd === 'DELI_CAR_TYPE') {
          this.deliCarOptions = response.data.ds;
          if (this.deliCarOptions.length > 0) {
            // this.deliCarOptions.splice(0, 1);
            this.deliCarCd = this.deliCarOptions[0];
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getAreaPrice(row) {
      try {
        if (row.trncusId !== null && row.trncusId) {
          let tran = this.tranList.find(option => option.value == row.trncusId);
          this.tranOne = tran;
        }
        const param = {
          cityCd: row.cityCd,
          distrCd: row.distrCd,
          carType: this.deliCarCd?.value ? this.deliCarCd.value : 'CAR01',
        };
        const resp = await tranApi.getAreaPrice(param);
        this.areaPrice = resp.data.rs;
        this.areaEtcPrice = this.areaPrice.areaPrice + '';

        if (this.areaPriceAmt) {
          this.areaEtcPrice = this.areaPriceAmt + '';
        }

        this.areaEtcPrice = this.areaEtcPrice.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
      } catch (e) {
        console.log(e);
      }
    },
    existCarType() {
      return Object.keys(this.deliCarCd).length > 0;
    },
  },
  mounted() {
    this.getCommonCodeCombo('DELI_CAR_TYPE');
    this.getTranList();
  },
};
</script>

<style></style>
