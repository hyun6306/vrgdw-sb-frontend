<template>
  <div class="ks_result_section" v-if="list.length > 0">
    <div class="result_num_txt">
      <strong>{{ $t('message.totalSelection1') }}</strong>
      <span
        ><i>{{ pageInfo.totalCount }}</i
        >{{ $t('message.totalSelection2') }}</span
      >
    </div>
    <div class="table">
      <table>
        <colgroup>
          <col style="width: 10%" />
          <col style="width: 10%" />
          <col style="width: calc(80% / 4)" />
          <col style="width: calc(80% / 4)" />
          <col style="width: calc(80% / 4)" />
          <col style="width: calc(80% / 4)" />
        </colgroup>
        <thead>
          <tr>
            <td colspan="6" class="pa-0 ba-0">
              <div class="in_table">
                <table>
                  <colgroup>
                    <col style="width: 10%" />
                    <col style="width: 10%" />
                    <col style="width: calc(80% / 3)" />
                    <col style="width: calc(80% / 3)" />
                    <col style="width: calc(80% / 3)" />
                  </colgroup>
                  <thead>
                    <!-- 검색값 반복영역 -->
                    <tr>
                      <th rowspan="6">No</th>
                      <th rowspan="6">
                        <label class="chechbox_solo">
                          <input type="checkbox" v-model="allChecked" @change="allCheckedChange" ref="allCheck" />
                          <span class="checkmark"></span>
                        </label>
                      </th>
                      <th colspan="3" class="fb f_impact t-l">{{ $t('message.materialCode') }}</th>
                    </tr>
                    <tr>
                      <th colspan="3" class="fb f_impact t-l">{{ $t('message.prdNm') }}</th>
                    </tr>
                    <tr>
                      <th colspan="3" class="fb f_impact t-l">{{ $t('message.categoryBrand') }}</th>
                    </tr>
                    <tr>
                      <th>{{ $t('message.density') }}</th>
                      <th>{{ $t('message.ecoNm') }}</th>
                      <th>{{ $t('message.brdGrade') }}</th>
                    </tr>
                    <tr v-if="prdtClsCd.includes('MFB')">
                      <th colspan="3" class="pa-0">
                        <div class="half_cell">{{ $t('message.pattFront') }}</div>
                        <div class="half_cell">{{ $t('message.pattBack') }}</div>
                      </th>
                    </tr>
                    <tr v-if="prdtClsCd.includes('MFB')">
                      <th colspan="3" class="pa-0">
                        <div class="half_cell">{{ $t('message.front') }}</div>
                        <div class="half_cell">{{ $t('message.back') }}</div>
                      </th>
                    </tr>
                    <!-- //검색값 반복영역 -->
                  </thead>
                </table>
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          <!-- 검색값 반복영역 -->
          <tr>
            <td colspan="6" class="pa-0 ba-0">
              <div class="in_table" v-for="(prdt, index) in list" :key="index">
                <table>
                  <colgroup>
                    <col style="width: 10%" />
                    <col style="width: 10%" />
                    <col style="width: calc(80% / 3)" />
                    <col style="width: calc(80% / 3)" />
                    <col style="width: calc(80% / 3)" />
                  </colgroup>
                  <tbody>
                    <!-- 검색값 반복영역 -->
                    <tr>
                      <td rowspan="6">{{ index + 1 }}</td>
                      <td rowspan="6">
                        <label class="chechbox_solo">
                          <input type="checkbox" v-model="prdt.checked" ref="prdtCheck" @change="checkedChange" />
                          <span class="checkmark"></span>
                        </label>
                      </td>
                      <td colspan="3" class="fb f_impact t-l">{{ prdt.prdtCd }}</td>
                    </tr>
                    <tr>
                      <td colspan="3" class="fb f_impact t-l">{{ prdt.prdtNm }}</td>
                    </tr>
                    <tr>
                      <td colspan="3" class="fb f_impact t-l">{{ prdt.brandNm }}</td>
                    </tr>
                    <tr>
                      <td>{{ prdt.dnstType }}</td>
                      <td>{{ prdt.ecoNm }}</td>
                      <td>{{ prdt.brdGrade }}</td>
                    </tr>
                    <tr v-if="prdtClsCd.includes('MFB')">
                      <td colspan="3" class="pa-0">
                        <div class="half_cell">{{ prdt.lpmFrtPttnNm }}</div>
                        <div class="half_cell">{{ prdt.lpmBckPttnNm }}</div>
                      </td>
                    </tr>
                    <tr v-if="prdtClsCd.includes('MFB')">
                      <td colspan="3" class="pa-0">
                        <div class="half_cell">{{ prdt.prsUpPttnNm }}</div>
                        <div class="half_cell">{{ prdt.prsDwPttnNm }}</div>
                      </td>
                    </tr>
                    <!-- //검색값 반복영역 -->
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
          <!-- //검색값 반복영역 -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import productApi from '@/api/order/product';

export default {
  props: ['list', 'pageInfo'],
  computed: {
    ...mapGetters({
      authButton: 'userInfo/getAuthButton',
    }),
    prdtClsCd() {
      return this.list.length > 0 ? this.list[0].prdtClsCd : '';
    },
  },
  data() {
    return {
      bookmark: false,
      allChecked: false,
      checkedCount: 0,
      // limit: 10,
    };
  },
  watch: {
    list() {
      let count = 0;
      this.list.forEach(prdt => {
        if (prdt.favoritYn === 'Y') count++;
      });
      if (count === this.list.length) {
        this.bookmark = true;
      } else {
        this.bookmark = false;
      }
    },
  },
  methods: {
    changeFavorite(prdt) {
      if (prdt.favoritYn === 'Y') {
        prdt.favoritYn = 'N';
      } else {
        prdt.favoritYn = 'Y';
      }
      this.saveProductFavorite(prdt);
    },
    async saveProductFavorite(prdt) {
      try {
        const param = {
          prdtCd: prdt.prdtCd,
          useYn: prdt.favoritYn,
        };
        await productApi.saveProductFavorite(param);
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
        if (prdt.favoritYn === 'Y') {
          prdt.favoritYn = 'N';
        } else {
          prdt.favoritYn = 'Y';
        }
      }
    },
    allFavoriteChange() {
      this.bookmark = !this.bookmark;
      if (this.bookmark) {
        this.list.forEach(prdt => {
          prdt.favoritYn = 'Y';
          this.saveProductFavorite(prdt);
        });
      } else {
        this.list.forEach(prdt => {
          prdt.favoritYn = 'N';
          this.saveProductFavorite(prdt);
        });
      }
    },
    checkedProduct() {
      return this.list.filter(prdt => prdt.checked);
    },
    allCheckedChange(event) {
      this.list.forEach((prdt, index) => {
        index;
        prdt.checked = event.target.checked;
        // this.$refs.prdtCheck[index].checked = event.target.checked;
      });
      if (event.target.checked) {
        this.checkedCount = this.list.length;
      } else {
        this.checkedCount = 0;
      }
    },
    checkedChange(event) {
      if (event.target.checked) {
        this.checkedCount++;
      } else {
        this.checkedCount--;
      }

      if (this.checkedCount === this.list.length) {
        this.allChecked = true;
        this.$refs.allCheck.checked = true;
      } else {
        this.allChecked = false;
        this.$refs.allCheck.checked = false;
      }
    },
  },
};
</script>

<style></style>
