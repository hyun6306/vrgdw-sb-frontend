<template>
  <div>
    <div class="master_form">
      <h2 class="mypage_title">{{ $t('message.info') }}</h2>
      <div class="mypage_form_table">
        <table>
          <colgroup>
            <col style="width: 8%" />
            <col style="width: 17%" />
            <col style="width: 8%" />
            <col style="width: 17%" />
            <col style="width: 8%" />
            <col style="width: 17%" />
            <col style="width: 8%" />
            <col style="width: 17%" />
          </colgroup>
          <tr>
            <th>
              <label class="list_title" for="">{{ $t('message.prdtCd') }}</label>
            </th>
            <td>
              <div class="form_input">
                <input type="text" v-model="prdtCd" id="" class="w_100 t-l solo_input disabled" disabled placeholder="" />
              </div>
            </td>
            <th>
              <label class="list_title" for="">{{ $t('message.erpPrdtNm') }}</label>
            </th>
            <td>
              <div class="form_input">
                <input type="text" v-model="erpPrdtNm" id="" class="w_100 t-l solo_input disabled" disabled placeholder="" />
              </div>
            </td>
            <th>
              <label class="list_title" for="">{{ $t('message.savPosCd') }}</label>
            </th>
            <td>
              <div class="form_input">
                <input type="text" v-model="savPosCd" id="" class="w_100 t-l solo_input disabled" disabled placeholder="" />
              </div>
            </td>
            <th>
              <label class="list_title" for="">{{ $t('message.taxType') }}</label>
            </th>
            <td>
              <div class="form_input">
                <input type="text" v-model="taxType" id="" class="w_100 t-l solo_input disabled" disabled placeholder="" />
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <label class="list_title" for="">{{ $t('message.prdtClsCd') }}</label>
            </th>
            <td>
              <div class="form_input">
                <MultiSelect id="" style="width: 100%" class="" v-model="prdtClsCd" :options="prdtClsCdOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" label="text"></MultiSelect>
              </div>
            </td>
            <th>
              <label class="list_title" for="">{{ $t('message.mkplcCd') }}</label>
            </th>
            <td>
              <div class="form_input">
                <MultiSelect id="" style="width: 100%" class="" v-model="mkplcCd" :options="mkplcCdOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" label="text"></MultiSelect>
              </div>
            </td>
            <th>
              <label class="list_title" for="">{{ $t('message.manageCls') }}</label>
            </th>
            <td>
              <div class="form_input">
                <MultiSelect id="" style="width: 100%" class="" v-model="operClsCd" :options="operClsCdOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" label="text"></MultiSelect>
              </div>
            </td>
            <td></td>
          </tr>
          <tr>
            <th>
              <label class="list_title" for="">{{ $t('message.productLevel01') }}</label>
            </th>
            <td>
              <!--              <div class="form_input">-->
              <!--                <MultiSelect id="" style="width: 100%" class="" v-model="prdtLvlCls" :options="prdtLvlClsOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" label="text"></MultiSelect>-->
              <!--              </div>-->
              <div class="form_input">
                <MultiSelect id="" style="width: 100%" class="" v-model="prdtLvl1" :options="prdtLvl1Options" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" label="text" :class="{ validateError: $v.prdtLvl1.$invalid }"></MultiSelect>
              </div>
            </td>
            <th>
              <label class="list_title" for="">{{ $t('message.productLevel02') }}</label>
            </th>
            <td>
              <!--              <div class="form_input">-->
              <!--                <MultiSelect id="" style="width: 100%" class="" v-model="prdtLvl1" :options="prdtLvl1Options" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" label="text" :class="{ validateError: $v.prdtLvl1.$invalid }"></MultiSelect>-->
              <!--              </div>-->
              <div class="form_input">
                <MultiSelect id="" style="width: 100%" class="" v-model="prdtLvl2" :options="prdtLvl2Options" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" label="text"></MultiSelect>
                <!-- :class="{ validateError: $v.prdtLvl2.$invalid }"-->
              </div>
            </td>
            <th>
              <label class="list_title" for="">{{ $t('message.productLevel03') }}</label>
            </th>
            <td>
              <!--              <div class="form_input">-->
              <!--                <MultiSelect id="" style="width: 100%" class="" v-model="prdtLvl2" :options="prdtLvl2Options" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" label="text"></MultiSelect>-->
              <!--                &lt;!&ndash; :class="{ validateError: $v.prdtLvl2.$invalid }"&ndash;&gt;-->
              <!--              </div>-->
              <div class="form_input">
                <MultiSelect id="" style="width: 100%" class="" v-model="prdtLvl3" :options="prdtLvl3Options" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" label="text"></MultiSelect>
                <!-- :class="{ validateError: $v.prdtLvl2.$invalid }"-->
              </div>
            </td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>

    <div class="product_detail_info_section">
      <div class="product_di_box product_di_box03">
        <h2 class="mypage_title">{{ $t('message.dimensionsUnitInfo') }}</h2>
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 8%" />
              <col style="width: " />
              <col style="width: 8%" />
              <col style="width: " />
              <col style="width: 8%" />
              <col style="width: " />
              <col style="width: 8%" />
              <col style="width: " />
              <col style="width: 8%" />
              <col style="width: 26.4%" />
            </colgroup>
            <tbody>
              <tr>
                <th>{{ $t('message.baseUnit') }}</th>
                <td colspan="9">
                  <div class="form_input" style="width: 200px">
                    <!-- <input type="text" v-model="baseUnit" id="" class="w_100 t-c solo_input disabled" disabled placeholder="" /> -->
                    <MultiSelect v-model="baseUnit" id="" style="width: 100%" class="" :options="baseUnitOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" label="text" :class="{ validateError: $v.baseUnit.$invalid }"></MultiSelect>
                  </div>
                </td>
              </tr>
              <tr>
                <th>{{ $t('message.saleUnit') }}</th>
                <td colspan="3">
                  <div class="form_input">
                    <!-- <input type="text" v-model="saleUnit" id="" class="w_100 t-c solo_input disabled" disabled placeholder="" /> -->
                    <MultiSelect v-model="saleUnit" id="" style="width: 100%" class="" :options="saleUnitOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" label="text" :class="{ validateError: $v.saleUnit.$invalid }"></MultiSelect>
                    <input type="number" v-model="saleUnitNmrtr" id="" class="w_100 t-c solo_input" placeholder="" :class="{ validateError: $v.saleUnitNmrtr.$invalid }" />
                    <i>/</i>
                    <input type="number" v-model="saleUnitDenom" id="" class="w_100 t-c solo_input" placeholder="" :class="{ validateError: $v.saleUnitDenom.$invalid }" />
                  </div>
                </td>
                <th class="">{{ $t('message.ordUnit') }}</th>
                <td colspan="3">
                  <div class="form_input">
                    <MultiSelect v-model="ordUnit" id="" style="width: 100%" class="" :options="ordUnitOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" label="text" :class="{ validateError: $v.ordUnit.$invalid }"></MultiSelect>
                    <input type="number" v-model="ordUnitNmrtr" id="" class="w_100 t-c solo_input" placeholder="" :class="{ validateError: $v.ordUnitNmrtr.$invalid }" />
                    <i>/</i>
                    <input type="number" v-model="ordUnitDenom" id="" class="w_100 t-c solo_input" placeholder="" :class="{ validateError: $v.ordUnitDenom.$invalid }" />
                  </div>
                </td>
                <th class="">{{ $t('message.analUnit') }}</th>
                <td>
                  <div class="form_input">
                    <!-- <input type="text" id="" v-model="analUnit" class="w_100 t-c solo_input disabled" disabled placeholder="" /> -->
                    <MultiSelect v-model="analUnit" id="" style="width: 100%" class="" :options="analUnitOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" label="text" :class="{ validateError: $v.analUnit.$invalid }"></MultiSelect>
                    <input type="number" id="" v-model="analUnitNmrtr" class="w_100 t-c solo_input" placeholder="" :class="{ validateError: $v.analUnitNmrtr.$invalid }" />
                    <i>/</i>
                    <input type="number" id="" v-model="analUnitDenom" class="w_100 t-c solo_input" placeholder="" :class="{ validateError: $v.analUnitDenom.$invalid }" />
                  </div>
                </td>
              </tr>
              <tr>
                <th>{{ $t('message.weight') }}</th>
                <td>
                  <div class="form_input">
                    <input type="number" v-model="wght" id="" class="w_100 t-c solo_input" placeholder="" :class="{ validateError: $v.wght.$invalid }" />
                  </div>
                </td>
                <th>{{ $t('message.totWeight') }}</th>
                <td>
                  <div class="form_input">
                    <input type="number" v-model="totWght" id="" class="w_100 t-c solo_input" placeholder="" :class="{ validateError: $v.totWght.$invalid }" />
                  </div>
                </td>
                <th>{{ $t('message.weightUnit') }}</th>
                <td>
                  <div class="form_input">
                    <!-- <input type="text" v-model="wghtUnit" id="" class="w_100 t-c solo_input disabled" disabled placeholder="" /> -->
                    <MultiSelect v-model="wghtUnit" id="" style="width: 100%" class="" :options="wghtUnitOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" label="text" :class="{ validateError: $v.wghtUnit.$invalid }"></MultiSelect>
                  </div>
                </td>
                <th>{{ $t('message.totVol') }}</th>
                <td>
                  <div class="form_input">
                    <input type="number" v-model="totVol" id="" class="w_100 t-c solo_input" placeholder="" :class="{ validateError: $v.totVol.$invalid }" />
                  </div>
                </td>
                <th>{{ $t('message.volUnit') }}</th>
                <td>
                  <div class="form_input" style="width: 200px">
                    <!-- <input type="text" v-model="volUnit" id="" class="w_50 t-c solo_input disabled" disabled placeholder="" /> -->
                    <MultiSelect v-model="volUnit" id="" style="width: 100%" class="" :options="volUnitOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" label="text" :class="{ validateError: $v.volUnit.$invalid }"></MultiSelect>
                  </div>
                </td>
              </tr>
              <tr>
                <th>{{ $t('message.totVolCal') }}</th>
                <td colspan="9">
                  <div class="form_input" style="width: 300px">
                    <input type="number" v-model="totVolCal" id="" class="w_50 t-c solo_input" placeholder="" :class="{ validateError: $v.totVolCal.$invalid }" />
                    <button class="btn_default btn_critical_process" @click="getTotVolCal">{{ $t('message.btnLoad') }}</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="product_di_box product_di_box03">
        <h2 class="mypage_title">{{ $t('message.characteristicInfo') }}</h2>
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 8%" />
              <col style="width: " />
              <col style="width: 8%" />
              <col style="width: " />
              <col style="width: 8%" />
              <col style="width: " />
              <col style="width: 8%" />
              <col style="width: " />
              <col style="width: 8%" />
              <col style="width: " />
              <col style="width: 8%" />
              <col style="width: " />
            </colgroup>
            <tbody>
              <tr>
                <th>{{ $t('message.boardBrand') }}</th>
                <td colspan="3">
                  <div class="form_input">
                    <MultiSelect v-model="brandCd" id="" style="width: 100%" class="" :options="brandCdOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" label="text" :class="{ validateError: $v.brandCd.$invalid }"></MultiSelect>
                  </div>
                </td>
                <th>{{ $t('message.ecoCd') }}</th>
                <td>
                  <div class="form_input">
                    <MultiSelect v-model="ecoCd" id="" style="width: 100%" class="" :options="ecoCdOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" label="text" :class="{ validateError: $v.ecoCd.$invalid }"></MultiSelect>
                  </div>
                </td>
                <th>{{ $t('message.tskSpec') }}</th>
                <td>
                  <div class="form_input">
                    <MultiSelect v-model="tskSpec" id="" style="width: 100%" class="" :options="tskSpecOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" label="text" :class="{ validateError: $v.tskSpec.$invalid }"></MultiSelect>
                  </div>
                </td>
                <th>{{ $t('message.tskType') }}</th>
                <td>
                  <div class="form_input">
                    <input type="text" v-model="tskType" id="" class="w_100 t-c solo_input disabled" disabled placeholder="" />
                  </div>
                </td>
                <th>{{ $t('message.brdGrade') }}</th>
                <td>
                  <div class="form_input">
                    <MultiSelect v-model="brdGrade" id="" style="width: 100%" class="" :options="brdGradeOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" label="text" :class="{ validateError: $v.brdGrade.$invalid }"></MultiSelect>
                  </div>
                </td>
              </tr>
              <tr>
                <th>{{ $t('message.hrsnSpec') }}</th>
                <td colspan="3">
                  <div class="form_input f-wrap">
                    <input type="text" v-model="hrsnSpec" id="" style="width: 100px" class="t-c solo_input" placeholder="size" :class="{ validateError: $v.hrsnSpec.$invalid }" />
                    <input type="text" v-model="hrsnType" id="" style="width: calc(100% - 110px)" class="t-l solo_input" placeholder="desc" :class="{ validateError: $v.hrsnType.$invalid }" />
                    <!-- <span class="f-red">(1220 4ft/ 1397 4ft)</span> -->
                  </div>
                </td>
                <th>{{ $t('message.vtclSpec') }}</th>
                <td colspan="3">
                  <div class="form_input f-wrap">
                    <input type="text" v-model="vtclSpec" id="" style="width: 100px" class="t-c solo_input" placeholder="size" :class="{ validateError: $v.vtclSpec.$invalid }" />
                    <input type="text" v-model="vtclType" id="" style="width: calc(100% - 110px)" class="t-l solo_input" placeholder="desc" :class="{ validateError: $v.vtclType.$invalid }" />
                  </div>
                </td>
                <th>{{ $t('message.dnstType') }}</th>
                <td>
                  <div class="form_input">
                    <MultiSelect v-model="dnstType" id="" style="width: 100%" class="" :options="dnstTypeOptions" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false" placeholder="" label="text" :class="{ validateError: $v.dnstType.$invalid }"></MultiSelect>
                  </div>
                </td>
                <th>{{ $t('message.brdDnst') }}</th>
                <td>
                  <div class="form_input">
                    <input type="number" v-model="brdDnst" id="" class="w_100 t-c solo_input" placeholder="" :class="{ validateError: $v.brdDnst.$invalid }" />
                  </div>
                </td>
              </tr>
              <tr>
                <th>{{ $t('message.brdSpec') }}</th>
                <td colspan="11">
                  <div class="form_input">
                    <input type="text" v-model="brdSpec" id="" class="w_100 t-l solo_input" placeholder="" :class="{ validateError: $v.brdSpec.$invalid }" />
                  </div>
                </td>
              </tr>
              <tr v-if="prdtClsCd.value == 'AMN0_MFB'">
                <th>{{ $t('message.prsUpPttn') }}</th>
                <td>
                  <div class="form_input">
                    <input type="text" v-model="prsUpPttn" id="" class="w_100 t-c solo_input" placeholder="" :class="{ validateError: $v.prsUpPttn.$invalid }" />
                  </div>
                </td>
                <th>{{ $t('message.prsDwPttn') }}</th>
                <td>
                  <div class="form_input">
                    <input type="text" v-model="prsDwPttn" id="" class="w_100 t-c solo_input" placeholder="" :class="{ validateError: $v.prsDwPttn.$invalid }" />
                  </div>
                </td>
                <th>{{ $t('message.lpmFrtPttn1') }}</th>
                <td>
                  <div class="form_input">
                    <input type="text" v-model="lpmFrtPttn1" id="" class="w_100 t-c solo_input" placeholder="" :class="{ validateError: $v.lpmFrtPttn1.$invalid }" />
                  </div>
                </td>
                <th>{{ $t('message.lpmFrtPttn2') }}</th>
                <td>
                  <div class="form_input">
                    <input type="text" v-model="lpmFrtPttn2" id="" class="w_100 t-c solo_input" placeholder="" :class="{ validateError: $v.lpmFrtPttn2.$invalid }" />
                  </div>
                </td>
                <th>{{ $t('message.lpmBckPttn1') }}</th>
                <td>
                  <div class="form_input">
                    <input type="text" v-model="lpmBckPttn1" id="" class="w_100 t-c solo_input" placeholder="" :class="{ validateError: $v.lpmBckPttn1.$invalid }" />
                  </div>
                </td>
                <th>{{ $t('message.lpmBckPttn2') }}</th>
                <td>
                  <div class="form_input">
                    <input type="text" v-model="lpmBckPttn2" id="" class="w_100 t-c solo_input" placeholder="" :class="{ validateError: $v.lpmBckPttn2.$invalid }" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="product_di_box product_di_box03">
        <h2 class="mypage_title">{{ $t('message.language') }}</h2>
        <div class="table">
          <table>
            <colgroup>
              <col style="width: calc(100% / 3)" />
              <col style="width: calc(100% / 3)" />
              <col style="width: calc(100% / 3)" />
            </colgroup>
            <thead>
              <tr>
                <th>{{ $t('message.kor') }}</th>
                <th>{{ $t('message.eng') }}</th>
                <th>{{ $t('message.vnm') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="form_input">
                    <input type="text" v-model="prdtKorNm" id="" class="w_100 t-c solo_input" placeholder="" :class="{ validateError: $v.prdtKorNm.$invalid }" />
                  </div>
                </td>
                <td>
                  <div class="form_input">
                    <input type="text" v-model="prdtEngNm" id="" class="w_100 t-c solo_input" placeholder="" :class="{ validateError: $v.prdtEngNm.$invalid }" />
                  </div>
                </td>
                <td>
                  <div class="form_input">
                    <input type="text" v-model="prdtVnmNm" id="" class="w_100 t-c solo_input" placeholder="" :class="{ validateError: $v.prdtVnmNm.$invalid }" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="master_form">
      <h2 class="mypage_title">{{ $t('message.operationInfo') }}</h2>
      <div class="form_textarea" style="height: 90px"><textarea placeholder="" v-model.trim="prdtRemark"></textarea></div>
      <div class="board_footer">
        <div class="footer_left">
          <!-- <button class="btn_default btn_white">목록</button> -->
        </div>
        <div class="footer_right">
          <div class="error" v-if="!requiredCheck">{{ $t('message.msgValidEssential') }}</div>
          <button class="btn_default btn_function" @click="getProductDetail">{{ $t('message.btnInit') }}</button>
          <button class="btn_default btn_function" @click="save">{{ $t('message.btnSave') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import masterApi from '@/api/master/master';
import commonApi from '@/api/common';
import { validationMixin } from 'vuelidate';
import { required, requiredIf } from 'vuelidate/lib/validators';
//https://vuelidate.js.org/#sub-basic-usage

const mustBeSelect = sObj => sObj.value !== '';

export default {
  name: 'productDetail',
  components: {},
  props: ['authButton', 'savePage', 'menuId', 'page', 'openInfo', 'routerPath'],
  data() {
    return {
      // selectValue: { text: 'ALL', value: '' },
      prdtClsCdOptions: [],
      mkplcCdOptions: [],
      operClsCdOptions: [],
      prdtLvlClsOptions: [],
      prdtLvl1Options: [],
      prdtLvl2Options: [],
      prdtLvl3Options: [],
      prdtLvl1OptionsAll: [],
      prdtLvl2OptionsAll: [],
      prdtLvl3OptionsAll: [],
      baseUnitOptions: [],
      ordUnitOptions: [],
      saleUnitOptions: [],
      analUnitOptions: [],
      wghtUnitOptions: [],
      volUnitOptions: [],
      brandCdOptions: [],
      ecoCdOptions: [],
      tskSpecOptions: [],
      brdGradeOptions: [],
      dnstTypeOptions: [],

      prdtCd: this.openInfo.id,
      erpPrdtNm: '', //"FB,,MBR,E2,,N,(2.5*1855*2465),P",
      savPosCd: '', //"3100",
      taxType: '', //1

      prdtClsCd: '', //"ADM0_MDF",
      mkplcCd: '', //"V112",
      operClsCd: '', //"주문대상_운영",
      prdtLvlCls: '', //"Board",
      prdtLvl1: '', //"MDF",
      prdtLvl2: '', //"E2MBR",
      prdtLvl3: '', //"E2MBR",

      baseUnit: '', //"PC",
      saleUnit: '', //"BDL",
      saleUnitNmrtr: '', //1,
      saleUnitDenom: '', //220,
      ordUnit: '', //"BDL",
      ordUnitNmrtr: '', //1,
      ordUnitDenom: '', //220,
      analUnit: '', // "M3",
      analUnitNmrtr: '', // 11,
      analUnitDenom: '', // 1000,

      wght: '', //9.717,
      totWght: '', //9.805,
      wghtUnit: '', //"KG",
      totVol: '', //0.011,
      volUnit: '', //"M3",
      totVolCal: '', //0.011163000, //환산부피정보

      brandCd: '', //"MBR",
      ecoCd: '', //"E2",
      tskSpec: '', //2.50,
      tskType: '', //"2.0~3.0",
      brdGrade: '', //"P",
      brdDnst: '', //859,
      hrsnSpec: '', //1855,
      hrsnType: '', //"6",
      vtclSpec: '', //2465,
      vtclType: '', //"8",
      dnstType: '', //"HD",
      brdSpec: '', //"Normal",

      prsUpPttn: '', //"",
      prsDwPttn: '', //"",
      lpmFrtPttn1: '', //"",
      lpmFrtPttn2: '', //"",
      lpmBckPttn1: '', //"",
      lpmBckPttn2: '', //"",

      prdtKorNm: '', //"FB,,MBR,E2,,N,(2.5*1855*2465),P",
      prdtEngNm: '', //"MDF Premium MBR E2 2.5mm x 1830 x 2440 (FT25,25)",
      prdtVnmNm: '', //"MDF Premium MBR E2 2.5mm x 1830 x 2440 (FT25,25)",
      prdtRemark: '', //"",

      id: '', //11,
      compCd: '', //"V100",
      bizClsCd: '', //"Board BU",
      mtsMtoCd: '', //"MTS",
      stdSalePrice: '', //64199,
      useYn: '', //"Y",

      submitStatus: '',
      load_prdtLvl1: '', //"MDF",
      load_prdtLvl2: '', //"E2MBR",
    };
  },
  mixins: [validationMixin],
  validations: {
    prdtLvl1: {
      required,
      mustBeSelect: selectObj => selectObj.value !== '',
    },
    // prdtLvl2: {
    //   required,
    //   mustBeSelect,
    // },
    baseUnit: { required, mustBeSelect },
    saleUnit: { required, mustBeSelect },
    saleUnitNmrtr: { required },
    saleUnitDenom: { required },
    ordUnit: { required, mustBeSelect },
    ordUnitNmrtr: {
      required,
      // minLength: minLength(4)
      // between: between(20, 30)
    },
    ordUnitDenom: { required },
    analUnit: { required, mustBeSelect },
    analUnitNmrtr: { required },
    analUnitDenom: { required },
    wghtUnit: { required, mustBeSelect },
    wght: { required },
    totWght: { required },
    totVol: { required },
    volUnit: { required, mustBeSelect },
    totVolCal: { required },
    brandCd: { required, mustBeSelect },
    ecoCd: { required, mustBeSelect },
    tskSpec: { required, mustBeSelect },
    brdGrade: { required, mustBeSelect },
    hrsnSpec: { required },
    hrsnType: { required },
    vtclSpec: { required },
    vtclType: { required },
    dnstType: { required, mustBeSelect },
    brdDnst: { required },
    brdSpec: { required },
    prdtKorNm: { required },
    prdtEngNm: { required },
    prdtVnmNm: { required },

    prsUpPttn: {
      required: requiredIf('isOptional'),
    },
    prsDwPttn: {
      required: requiredIf('isOptional'),
    },
    lpmFrtPttn1: {
      required: requiredIf('isOptional'),
    },
    lpmFrtPttn2: {
      required: requiredIf('isOptional'),
    },
    lpmBckPttn1: {
      required: requiredIf('isOptional'),
    },
    lpmBckPttn2: {
      required: requiredIf('isOptional'),
    },
  },
  filters: {
    numberFormat: (value, numFix) => {
      value = parseFloat(value);
      if (!value) return '0';
      return value.toFixed(numFix).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  computed: {
    ...mapGetters({
      userLocale: 'userInfo/getUserLocale',
    }),
    isOptional() {
      return this.prdtClsCd.value == 'AMN0_MFB';
    },
    requiredCheck() {
      let reqMDF = this.$v.ordUnitNmrtr.required && this.$v.ordUnitDenom.required && this.$v.totVolCal.required && this.$v.hrsnSpec.required && this.$v.hrsnType.required && this.$v.vtclSpec.required && this.$v.vtclType.required && this.$v.brdDnst.required && this.$v.brdSpec.required && this.$v.prdtKorNm.required && this.$v.prdtEngNm.required && this.$v.prdtVnmNm.required;
      let reqMFB = this.$v.prsUpPttn.required && this.$v.prsDwPttn.required && this.$v.lpmFrtPttn1.required && this.$v.lpmFrtPttn2.required && this.$v.lpmBckPttn1.required && this.$v.lpmBckPttn2.required;
      return reqMDF && (this.isOptional ? reqMFB : true);
    },
  },
  watch: {
    openInfo() {
      if (this.openInfo.id) {
        this.prdtCd = this.openInfo.id;
        this.getProductDetail();
      }
    },
    tskSpec() {
      this.tskType = this.tskSpec.data1;
    },
    prdtLvlCls() {
      if (this.prdtLvlCls) {
        this.prdtLvl1Options.length = [];
        this.prdtLvl2Options.length = [];
        this.prdtLvl2 = '';

        if (this.load_prdtLvl1 !== '') {
          this.prdtLvl1 = this.load_prdtLvl1;
          this.load_prdtLvl1 = '';
        } else {
          this.prdtLvl1 = { value: '', text: this.$t('message.selectLevel') };
        }

        this.prdtLvl1OptionsAll.forEach(element => {
          if (this.prdtLvlCls.lvlId == element.parentId) {
            this.prdtLvl1Options.push(element);
          }
        });
        this.prdtLvl1Options.unshift({ text: this.$t('message.selectLevel'), value: '' });
      }
    },
    prdtLvl1() {
      if (this.prdtLvl1) {
        this.prdtLvl2Options.length = [];

        if (this.load_prdtLvl2 !== '') {
          this.prdtLvl2 = this.load_prdtLvl2;
          this.load_prdtLvl2 = '';
        } else {
          this.prdtLvl2 = { value: '', text: this.$t('message.selectLevel') };
        }

        this.prdtLvl2OptionsAll.forEach(element => {
          if (this.prdtLvl1.lvlId == element.parentId) {
            this.prdtLvl2Options.push(element);
          }
        });
        this.prdtLvl2Options.unshift({ text: this.$t('message.selectLevel'), value: '' });
      }
    },
  },

  methods: {
    getSearchList(list) {
      this.listRows = list;
    },
    getPageInfo(pageInfo) {
      this.pageInfo = pageInfo;
    },
    alterPageNumber(pageNumber) {
      this.pageNumber = pageNumber;
    },
    resetPageNumber() {
      this.$refs.PagIng.resetPageNumber();
    },

    async getProductDetail() {
      try {
        let vm = this;
        const param = {
          prdtCode: this.prdtCd,
        };
        const resp = await masterApi.getProductDetail(param);
        const optionGroup = ['prdtClsCd', 'mkplcCd', 'operClsCd', 'prdtLvlCls', 'prdtLvl1', 'prdtLvl2', 'prdtLvl3', 'baseUnit', 'ordUnit', 'saleUnit', 'analUnit', 'wghtUnit', 'volUnit', 'brandCd', 'ecoCd', 'tskSpec', 'brdGrade', 'dnstType'];
        let options = [];
        for (let [key, value] of Object.entries(resp.data.rs)) {
          if (optionGroup.includes(key)) {
            options = vm[`${key}Options`];
            for (let i = 0; i < options.length; i++) {
              if (options[i].value == value) {
                vm[key] = options[i];
                if (key == 'prdtLvl1') vm['load_prdtLvl1'] = options[i];
                if (key == 'prdtLvl2') vm['load_prdtLvl2'] = options[i];
                break;
              }
            }
          } else {
            vm[key] = value;
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
    },
    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: 'Y',
          prntCd: prntCd,
        };
        // const allItem = { text: this.$t('message.all'), value: '' };
        const response = await commonApi.getCommonCodeCombo(param);

        if (groupCd == 'PRDT_CLS_CD') {
          this.prdtClsCdOptions = response.data.ds;
          // this.prdtClsCdOptions.unshift(allItem);
        } else if (groupCd == 'OPER_CLS_CD') {
          this.operClsCdOptions = response.data.ds;
        } else if (groupCd == 'BRAND_CD') {
          this.brandCdOptions = response.data.ds;
        } else if (groupCd == 'UNIT_CD') {
          this.ordUnitOptions = response.data.ds;
          this.baseUnitOptions = response.data.ds;
          this.saleUnitOptions = response.data.ds;
          this.analUnitOptions = response.data.ds;
          this.wghtUnitOptions = response.data.ds;
          this.volUnitOptions = response.data.ds;
        } else if (groupCd == 'ECO_CD') {
          this.ecoCdOptions = response.data.ds;
        } else if (groupCd == 'PRDT_TSK') {
          this.tskSpecOptions = response.data.ds;
        } else if (groupCd == 'BRD_GRADE') {
          this.brdGradeOptions = response.data.ds;
        } else if (groupCd == 'DNST_TYPE') {
          this.dnstTypeOptions = response.data.ds;
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
    async getPlantCombo() {
      try {
        const resp = await commonApi.getPlantCombo();
        this.mkplcCdOptions = resp.data.ds;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getProductLevelCombo() {
      try {
        const resp = await masterApi.getProductLevel();
        for (let code of resp.data.ds) {
          // code.value = code.lvlCd;
          code.value = code.lvlNm; //221215: 제품레벨은 이름으로만 셀렉트 구성
          code.text = code.lvlNm;
          // if (code.level == 0) {
          //   this.prdtLvlClsOptions.push(code);
          // } else if (code.level == 1) {
          //   this.prdtLvl1OptionsAll.push(code);
          // } else if (code.level == 2) {
          //   this.prdtLvl2OptionsAll.push(code);
          // }
          if (code.level == 1) {
            this.prdtLvl1OptionsAll.push(code);
          } else if (code.level == 2) {
            this.prdtLvl2OptionsAll.push(code);
          } else if (code.level == 3) {
            this.prdtLvl3OptionsAll.push(code);
          }
        }
        this.prdtLvl1Options = this.prdtLvl1OptionsAll.slice();
        this.prdtLvl2Options = this.prdtLvl2OptionsAll.slice();
        this.prdtLvl3Options = this.prdtLvl2OptionsAll.slice();
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getTotVolCal() {
      try {
        const param = {
          prdtCd: this.prdtCd,
          compCd: this.compCd,
        };
        const resp = await masterApi.getProductVolCal(param);
        this.totVolCal = resp.data.rs.totVolCal;
      } catch (e) {
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    formReset() {
      this.getProductDetail();
    },
    save() {
      // todo: 필수값 체크 및 밸리데이션 확인
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
        this.$EventBus.$emit('openYesModal', 'message.msgValidEssential');
        return false;
      } else {
        this.submitStatus = '';
        // eslint-disable-next-line
        let { prdtClsCdOptions, mkplcCdOptions, operClsCdOptions, prdtLvlClsOptions, prdtLvl1Options, prdtLvl2Options, prdtLvl1OptionsAll, prdtLvl2OptionsAll, baseUnitOptions, ordUnitOptions, saleUnitOptions, analUnitOptions, wghtUnitOptions, volUnitOptions, brandCdOptions, ecoCdOptions, tskSpecOptions, brdGradeOptions, dnstTypeOptions, ...formData } = this.$data;
        formData.prdtClsCd = formData.prdtClsCd.value;
        formData.mkplcCd = formData.mkplcCd.value;
        formData.operClsCd = formData.operClsCd.value;
        formData.prdtLvlCls = formData.prdtLvlCls.value;
        formData.prdtLvl1 = formData.prdtLvl1.value;
        formData.prdtLvl2 = formData.prdtLvl2.value;
        formData.ordUnit = formData.ordUnit.value;
        formData.baseUnit = formData.baseUnit.value;
        formData.saleUnit = formData.saleUnit.value;
        formData.analUnit = formData.analUnit.value;
        formData.wghtUnit = formData.wghtUnit.value;
        formData.volUnit = formData.volUnit.value;
        formData.brandCd = formData.brandCd.value;
        formData.ecoCd = formData.ecoCd.value;
        formData.tskSpec = formData.tskSpec.value;
        formData.brdGrade = formData.brdGrade.value;
        formData.dnstType = formData.dnstType.value;

        if (formData.prdtClsCd == 'ADM0_MDF') {
          formData.prsUpPttn = '';
          formData.prsDwPttn = '';
          formData.lpmFrtPttn1 = '';
          formData.lpmFrtPttn2 = '';
          formData.lpmBckPttn1 = '';
          formData.lpmBckPttn2 = '';
        }
        this.putProductDetail(formData);
      }
    },
    async putProductDetail(formData) {
      try {
        const resp = await masterApi.putProductDetail(formData);
        let ment = '';
        if (resp.data.status == 200) {
          ment = 'message.msgSave';
        } else {
          ment = resp.data.message;
        }
        this.$EventBus.$emit('openYesModal', ment);
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
  created() {
    const vm = this;
    const promise01 = this.getCommonCodeCombo('PRDT_CLS_CD'); //제품분류
    const promise02 = this.getCommonCodeCombo('OPER_CLS_CD'); //운영구분
    const promise03 = this.getCommonCodeCombo('UNIT_CD'); //주문단위
    const promise04 = this.getCommonCodeCombo('BRAND_CD'); //보드브랜드
    const promise05 = this.getCommonCodeCombo('ECO_CD'); //친환경등급
    const promise06 = this.getCommonCodeCombo('PRDT_TSK'); //두께 규격
    const promise07 = this.getCommonCodeCombo('BRD_GRADE'); //보드등급
    const promise08 = this.getCommonCodeCombo('DNST_TYPE'); //밀도타입
    const promise09 = this.getPlantCombo(); //제조지 코드
    const promise10 = this.getProductLevelCombo(); //제품레벨 코드

    Promise.all([promise01, promise02, promise03, promise04, promise05, promise06, promise07, promise08, promise09, promise10]).then(() => {
      vm.getProductDetail();
    });
  },
  mounted() {
    // this.getProductDetail();
  },
  destroyed() {},
};
</script>

<style scoped>
.checkbox-label {
  display: block;
}
div.error {
  color: #cc0000;
  margin-right: 10px;
}
.validateError {
  border-color: #f79483 !important;
  border-width: 2px !important;
  border-style: solid;
}
</style>
