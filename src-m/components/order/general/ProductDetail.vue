<template>
  <div class="bottom_modal" :class="{ pd_open: productDetailOpen }" ref="bottom_modal_height" :style="`bottom:-${bottom_modal_height}`">
    <div class="header">
      <div class="header_title">
        <h1 class="logo in_txt"></h1>
      </div>
      <div class="header_left"></div>
      <div class="header_right">
        <button class="btn_header btn_close" @click="$emit('closeProductDetail', false)"></button>
      </div>
    </div>
    <div class="bottom_modal_contents">
      <div class="table">
        <table>
          <colgroup>
            <col style="width: 25%" />
            <col style="width: 25%" />
            <col style="width: 25%" />
            <col style="width: 25%" />
          </colgroup>
          <tbody>
            <tr>
              <th>{{ $t('message.categoryBrand') }}</th>
              <td>{{ prdt.brandNm }}</td>
              <th>{{ $t('message.categoryThick') }}</th>
              <td>{{ prdt.tskSpec }}</td>
            </tr>
            <tr>
              <th>{{ $t('message.density') }}</th>
              <td>{{ prdt.dnstType }}</td>
              <th>{{ $t('message.categorySize') }}</th>
              <td>{{ prdt.hrsnSpec }} * {{ prdt.vtclSpec }}</td>
            </tr>
            <tr>
              <th>{{ $t('message.ecoNm') }}</th>
              <td>{{ prdt.ecoNm }}</td>
              <th>{{ $t('message.brdGrade') }}</th>
              <td>{{ prdt.brdGradeNm }}</td>
            </tr>
            <tr v-if="mfb.includes(prdt.prdtClsCd)">
              <th class="4" colspan="4">{{ $t('message.pattern') }}</th>
            </tr>
            <tr v-if="mfb.includes(prdt.prdtClsCd)">
              <th>{{ $t('message.front') }}</th>
              <td>{{ prdt.lpmFrtPttnNm }}</td>
              <th>{{ $t('message.back') }}</th>
              <td>{{ prdt.lpmBckPttnNm }}</td>
            </tr>
            <tr v-if="mfb.includes(prdt.prdtClsCd)">
              <th class="4" colspan="4">{{ $t('message.prs') }}</th>
            </tr>
            <tr v-if="mfb.includes(prdt.prdtClsCd)">
              <th>{{ $t('message.front') }}</th>
              <td>{{ prdt.prsUpPttnNm }}</td>
              <th>{{ $t('message.back') }}</th>
              <td>{{ prdt.prsDwPttnNm }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import defs from '@/consts/defs';

export default {
  props: ['productDetailOpen', 'prdt'],
  data() {
    return {
      bottom_modal_height: '',
      mfb: defs.prdtClsCd.MFB,
    };
  },
  methods: {
    getInfoHeight() {
      let val = this.$refs.bottom_modal_height.scrollHeight + 15;
      // search_box_height 의 높이값 받아온다
      this.bottom_modal_height = `${val}px`;
    },
  },
  mounted: function () {
    this.getInfoHeight();
  },
};
</script>

<style></style>
