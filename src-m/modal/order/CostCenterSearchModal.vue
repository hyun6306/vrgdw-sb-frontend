<template>
  <modal name="CostCenterSearchModal" width="100%" height="100%" :adaptive="true">
    <div class="page_modal">
      <!-- 상단 헤더 -->
      <div class="header">
        <div class="header_title">
          <h1 class="logo in_txt">{{ $t('message.searchCenter') }}</h1>
        </div>
        <div class="header_left"></div>
        <div class="header_right">
          <button class="btn_header btn_close" @click="close()"></button>
        </div>
      </div>
      <!-- //상단 헤더 -->

      <!-- 컨텐츠 바디 -->
      <div class="container">
        <!-- 배코스트센터송지 검색 -->
        <!-- <div class="delivery_search_contents">
          <input type="text" id="" class="" v-model="costCntrNm" />
          <button class="btn_search" @click="filter">sự tìm kiếm</button>
        </div> -->
        <!-- //코스트센터 검색 -->
        <!-- 코스트센터 검색결과 목록 -->
        <div class="customer_search_list_contents">
          <div class="table">
            <table>
              <colgroup>
                <col style="width: 100%" />
              </colgroup>
              <tbody>
                <tr v-for="(cost, index) in costList" :key="index">
                  <!-- 요기 td v-for 하시면 됩니다. -->
                  <td class="pa-0" @click="selectCost = cost">
                    <ul class="customer_slc_list">
                      <li class="customer_slc_list_check">
                        <label class="chechbox_solo">
                          <input type="checkbox" v-model="selectCost" :true-value="cost" />
                          <span class="checkmark"></span>
                        </label>
                      </li>
                      <li class="customer_slc_list_info">
                        <strong>{{ cost.centerCd }}</strong>
                        <span>{{ cost.centerNm }}</span>
                      </li>
                    </ul>
                  </td>
                  <!-- //요기 td v-for 하시면 됩니다. -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- //코스트센터 검색결과 목록 -->
        <!-- 하단 버튼 -->
        <div class="bottom_select_result_contents">
          <div class="btn_box">
            <button class="btn_tempsave" @click="confirm()">{{ $t('message.btnYes') }}</button>
          </div>
        </div>
        <!-- //하단 버튼 -->
      </div>
      <!-- //컨텐츠 바디 -->
    </div>
  </modal>
</template>

<script>
import detailApi from '@/api/order/detail';

export default {
  data() {
    return {
      costCntrNm: '',
      originCostList: [],
      costList: [],
      selectCost: {},
    };
  },
  methods: {
    close() {
      this.costList = this.originCostList;
      this.costCntrNm = '';
      this.$modal.hide('CostCenterSearchModal');
    },
    open(event) {
      this.costCntrNm = event.params.costCntrNm;
      if (this.costCntrNm && this.constCntrNm !== '') {
        this.filter();
      }
    },
    filter() {
      this.costList = this.originCostList.filter(list => {
        return list.centerCd.includes(this.costCntrNm) || list.centerNm.includes(this.costCntrNm);
      });
    },
    async getCostcenter() {
      try {
        const param = {
          ordErpCls: 'ZFD6',
        };
        const resp = await detailApi.getCostcenter(param);
        this.costList = resp.data.ds;
        this.originCostList = this.costList;
        if (this.costCntrNm && this.constCntrNm !== '') {
          this.filter();
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
    confirm() {
      this.$emit('onSelectCost', { costCntrCd: this.selectCost.centerCd, costCntrNm: this.selectCost.centerNm });
      this.close();
    },
  },
  mounted() {
    this.getCostcenter();
  },
};
</script>

<style></style>
