<template>
  <div>
    <div class="master_form">
      <h2 class="mypage_title">기본정보</h2>
      <div class="mypage_form_table">
        <table>
          <colgroup>
            <col style="width: 13.3%" />
            <col style="width: 20%" />
            <col style="width: 13.3%" />
            <col style="width: 20%" />
            <col style="width: 13.3%" />
            <col style="width: 20%" />
          </colgroup>
          <tr>
            <th><label class="list_title" for="">제품코드</label></th>
            <td>
              <div class="form_input">
                <input type="text" id="" class="w_100 t-l solo_input disabled" disabled placeholder="" />
              </div>
            </td>
            <th><label class="list_title" for="">ERP 제품명</label></th>
            <td>
              <div class="form_input">
                <input type="text" id="" class="w_100 t-l solo_input disabled" disabled placeholder="" />
              </div>
            </td>
            <th><label class="list_title" for="">제조지코드</label></th>
            <td>
              <div class="form_input">
                <input type="text" id="" class="w_100 t-l solo_input disabled" disabled placeholder="" />
              </div>
            </td>
          </tr>
          <tr>
            <th><label class="list_title" for="">저장위치코드</label></th>
            <td>
              <div class="form_input">
                <input type="text" id="" class="w_100 t-l solo_input disabled" disabled placeholder="" />
              </div>
            </td>
            <th><label class="list_title" for="">브랜드코드</label></th>
            <td>
              <div class="form_input">
                <input type="text" id="" class="w_100 t-l solo_input disabled" disabled placeholder="" />
              </div>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th><label class="list_title" for="">제품레벨1</label></th>
            <td>
              <div class="form_input">
                <MultiSelect id="" style="width: 100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder=""></MultiSelect>
              </div>
            </td>
            <th><label class="list_title" for="">제품레벨2</label></th>
            <td>
              <div class="form_input">
                <MultiSelect id="" style="width: 100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder=""></MultiSelect>
              </div>
            </td>
            <th><label class="list_title" for="">운영구분</label></th>
            <td>
              <div class="form_input">
                <MultiSelect id="" style="width: 100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder=""></MultiSelect>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class="product_detail_info_section">
      <div class="product_di_box product_di_box02">
        <h2 class="mypage_title">규격 및 단위 정보</h2>
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
                <th>기본단위</th>
                <td colspan="9">
                  <div class="form_input" style="width: 200px">
                    <input type="text" id="" class="w_100 t-c solo_input disabled" disabled placeholder="KG" />
                  </div>
                </td>
              </tr>
              <tr>
                <th>판매단위</th>
                <td colspan="3">
                  <div class="form_input">
                    <input type="text" id="" class="w_100 t-c solo_input disabled" disabled placeholder="KG" />
                    <input type="text" id="" class="w_100 t-c solo_input disabled" disabled placeholder="1" />
                    <i>/</i>
                    <input type="text" id="" class="w_100 t-c solo_input disabled" disabled placeholder="1" />
                  </div>
                </td>
                <th class="">주문단위</th>
                <td colspan="3">
                  <div class="form_input">
                    <MultiSelect id="" style="width: 100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="KG"></MultiSelect>
                    <input type="text" id="" class="w_100 t-c solo_input" placeholder="" />
                    <i>/</i>
                    <input type="text" id="" class="w_100 t-c solo_input" placeholder="" />
                  </div>
                </td>
                <th class="">분석단위</th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="w_100 t-c solo_input disabled" disabled placeholder="KG" />
                    <input type="text" id="" class="w_100 t-c solo_input disabled" disabled placeholder="1" />
                    <i>/</i>
                    <input type="text" id="" class="w_100 t-c solo_input disabled" disabled placeholder="1" />
                  </div>
                </td>
              </tr>
              <tr>
                <th>중량</th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="w_100 t-c solo_input disabled" disabled placeholder="1" />
                  </div>
                </td>
                <th>총중량</th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="w_100 t-c solo_input disabled" disabled placeholder="1" />
                  </div>
                </td>
                <th>중량단위</th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="w_100 t-c solo_input disabled" disabled placeholder="KG" />
                  </div>
                </td>
                <th>총부피</th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="w_100 t-c solo_input disabled" disabled placeholder="1" />
                  </div>
                </td>
                <th>부피단위</th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="w_50 t-c solo_input disabled" disabled placeholder="m" />
                  </div>
                </td>
              </tr>
              <tr>
                <th>환산부피정보</th>
                <td colspan="9">
                  <div class="form_input" style="width: 300px">
                    <input type="text" id="" class="w_50 t-c solo_input disabled" disabled placeholder="KG" />
                    <button class="btn_intable">가져오기</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="product_di_box product_di_box01">
        <h2 class="mypage_title">물류창고별 제품정보</h2>
        <div class="table master_tabel_scroll">
          <table>
            <colgroup>
              <col style="width: 9%" />
              <col style="width: 17%" />
              <col style="width: 16%" />
              <col style="width: 25%" />
              <col style="width: 19%" />
              <col style="width: 15%" />
            </colgroup>
            <thead>
              <tr>
                <th>No</th>
                <th>플랜트코드</th>
                <th>플랜트</th>
                <th>생산저장위치코드</th>
                <th>생산저장위치</th>
                <th>사용여부</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>K122</td>
                <td>RESIN1</td>
                <td>3100</td>
                <td>3100</td>
                <td>
                  <label class="chechbox_solo"><input type="checkbox" /><span class="checkmark"></span></label>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>K122</td>
                <td>RESIN1</td>
                <td>3100</td>
                <td>3100</td>
                <td>
                  <label class="chechbox_solo"><input type="checkbox" /><span class="checkmark"></span></label>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>K122</td>
                <td>RESIN1</td>
                <td>3100</td>
                <td>3100</td>
                <td>
                  <label class="chechbox_solo"><input type="checkbox" /><span class="checkmark"></span></label>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>K122</td>
                <td>RESIN1</td>
                <td>3100</td>
                <td>3100</td>
                <td>
                  <label class="chechbox_solo"><input type="checkbox" /><span class="checkmark"></span></label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="product_di_box product_di_box03">
        <h2 class="mypage_title">특성정보</h2>
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: " />
              <col style="width: 7%" />
              <col style="width: " />
              <col style="width: 7%" />
              <col style="width: " />
              <col style="width: 7%" />
              <col style="width: 15%" />
              <col style="width: 7%" />
              <col style="width: " />
            </colgroup>
            <tbody>
              <tr>
                <th>클래스(품목)</th>
                <td colspan="11" class="t-l">MDF</td>
              </tr>
              <tr>
                <th>제조지</th>
                <td>MDF2(신)</td>
                <th>보드브랜드</th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="w_100 t-c solo_input" placeholder="REGULAR" />
                  </div>
                </td>
                <th>친환경등급</th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="w_100 t-c solo_input" placeholder="EQ" />
                  </div>
                </td>
                <th>규격(두께)</th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="w_100 t-c solo_input" placeholder="12" />
                  </div>
                </td>
                <th>규격(폭*길이)</th>
                <td>
                  <div class="form_input f-wrap">
                    <input type="text" id="" style="width: 120px" class="t-c solo_input" placeholder="1220*2440" />
                    <span class="f-red">(1220 4ft/ 1397 4ft)</span>
                  </div>
                </td>
                <th>보드등급</th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="w_100 t-c solo_input" placeholder="P" />
                  </div>
                </td>
              </tr>
              <tr>
                <th>경면판 위 패턴</th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="w_100 t-c solo_input" placeholder="" />
                  </div>
                </td>
                <th>경면판 아래 패턴</th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="w_100 t-c solo_input" placeholder="" />
                  </div>
                </td>
                <th>LPM 위 패턴</th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="w_100 t-c solo_input" placeholder="" />
                  </div>
                </td>
                <th>LPM 뒤 패턴</th>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="w_100 t-c solo_input" placeholder="" />
                  </div>
                </td>
                <td colspan="4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="product_di_box product_di_box03">
        <h2 class="mypage_title">다국어</h2>
        <div class="table">
          <table>
            <colgroup>
              <col style="width: calc(100% / 3)" />
              <col style="width: calc(100% / 3)" />
              <col style="width: calc(100% / 3)" />
            </colgroup>
            <thead>
              <tr>
                <th>한글</th>
                <th>영문</th>
                <th>베트남</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="w_100 t-c solo_input" placeholder="" />
                  </div>
                </td>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="w_100 t-c solo_input" placeholder="" />
                  </div>
                </td>
                <td>
                  <div class="form_input">
                    <input type="text" id="" class="w_100 t-c solo_input" placeholder="" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 리얼그리드 -->

    <div class="master_form">
      <h2 class="mypage_title">운영정보</h2>
      <div class="form_textarea" style="height: 120px"><textarea placeholder="특이사항"></textarea></div>
      <div class="board_footer">
        <div class="footer_left">
          <button class="btn_default btn_white">목록</button>
        </div>
        <div class="footer_right">
          <button class="btn_default btn_temp">초기화</button>
          <button class="btn_default btn_temp">저장</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import CustomerOrderGrid from '@wb/components/gridComponent/CustomerOrderGrid.vue';
//import DatePickerModal from '@/modal/DateMonthPickerModal';
// import { EventBus } from '@/views/devPage/tabTest/EventBus';

export default {
  components: {
    //CustomerOrderGrid,
    //DatePickerModal,
  },
  data() {
    return {
      currentMonth: '',
      selectMonth: '',
      selectValue: '',
      selectOptions: ['Select option', 'options', 'selected'],
      test: 0,
      dropUnitOpen: false,
      layoutOpen: false,
      searchOpen: false,
      search_box_height: '',
      options: [
        {
          language: 'JavaScript',
          library: 'Vue.js',
        },
        {
          language: 'JavaScript',
          library: 'Vue-Multiselect',
        },
        {
          language: 'JavaScript',
          library: 'Vuelidate',
        },
      ],
      value: [],
    };
  },
  methods: {
    chooseMonth(day) {
      this.selectMonth = day;
    },
    openSingleCalendar(currentMonth) {
      this.currentMonth = currentMonth;
      console.log('tetettetet: ', currentMonth);
      this.$modal.show('DateMonthPicker');
    },
    changeData() {
      this.test++;
    },
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    // getInfoHeight() {
    //   let val = this.$refs.search_box_height.scrollHeight;
    //   // search_box_height 의 높이값 받아온다
    //   this.search_box_height = `${val}px`;
    // },
    customLabel(option) {
      return `${option.library} - ${option.language}`;
    },
    isSelected(option) {
      /* unfortunatelly following line does not work as VueMultiselect for some (strange) reason 
        fills the v-model array with copies instead of original objects contained in options
      */
      // return this.value.includes(option)
      return this.value.some(op => op.library === option.library);
    },
  },
  created() {
    console.log('SampleOneCreated');
    // EventBus.$on('changeData', this.changeData);
  },
  mounted() {
    // this.getInfoHeight();
  },
  destroyed() {},
};
</script>

<style>
.checkbox-label {
  display: block;
}
</style>
