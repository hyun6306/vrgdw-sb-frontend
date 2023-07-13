<template>
  <div class="kind_search_contents">
    <!-- 검색 영역 -->
    <div class="ks_select_section">
      <div class="ks_select_box" :class="{ ksSelect_open: ksSelectOpen }">
        <div class="ks_search_form">
          <label class="list_title">검색어</label>
          <span class="list_form"><input type="text" placeholder="" class="d_input" /></span>
        </div>
        <div class="ks_select_filter" :class="{ ksSelect_open: ksSelectOpen }">
          <ul class="ksf_list_box">
            <li class="ksf_list">
              <strong>제목</strong>
              <div class="ksf_list_form">
                <div class="choice_filter">
                  <label class="chechbox_product checkbox_size">
                    <input type="checkbox" />
                    <span class="checktxt">MDF</span>
                  </label>
                </div>
                <div class="choice_filter">
                  <label class="chechbox_product checkbox_size">
                    <input type="checkbox" />
                    <span class="checktxt">MFB</span>
                  </label>
                </div>
              </div>
            </li>
            <li class="ksf_list">
              <strong>제목</strong>
              <div class="ksf_list_form">
                <MultiSelect id="" style="width: 100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="county districts"></MultiSelect>
              </div>
              <div class="choice_select_box">
                <p class="selected">
                  <span>HBR</span>
                  <button class="in_img"><img src="@m/assets/img/icon_selected_delete.png" /></button>
                </p>
                <p class="selected">
                  <span>HBR</span>
                  <button class="in_img"><img src="@m/assets/img/icon_selected_delete.png" /></button>
                </p>
              </div>
            </li>
            <li class="ksf_list">
              <strong>제목</strong>
              <div class="ksf_list_form">
                <MultiSelect id="" style="width: 100%" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="county districts"></MultiSelect>
                <span class="form_row product_list_coulmn">
                  <input type="text" id="" class="d_input" />
                  <input type="text" id="" class="d_input" />
                </span>
              </div>
            </li>
            <li class="ksf_list">
              <strong>제목</strong>
              <div class="ksf_list_form">
                <label class="chechbox_basic">
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                  전면과 후면 동일
                </label>
              </div>
              <div class="sub_ksf_list">
                <strong>제목</strong>
                <MultiSelect id="" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="county districts"></MultiSelect>
              </div>
              <div class="sub_ksf_list">
                <strong>제목</strong>
                <MultiSelect id="" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="county districts"></MultiSelect>
              </div>
              <div class="sub_ksf_list">
                <strong>제목</strong>
                <MultiSelect id="" class="" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="county districts"></MultiSelect>
              </div>
            </li>
            <li class="ksf_list">
              <strong>제목</strong>
              <div class="ksf_list_form">
                <div class="choice_filter">
                  <label class="chechbox_product checkbox_size">
                    <input type="checkbox" />
                    <span class="checktxt">MDF</span>
                  </label>
                </div>
                <div class="choice_filter">
                  <label class="chechbox_product checkbox_size">
                    <input type="checkbox" />
                    <span class="checktxt">MFB</span>
                  </label>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="ks_checkbox">
          <label class="chechbox_basic">
            <input type="checkbox" />
            <span class="checkmark"></span>
            선택 조건을 유지합니다.
          </label>
        </div>
        <div class="btn_box btns_ks_select">
          <button class="btn_reset">초기화</button>
          <button class="btn_search">검색</button>
        </div>
        <p class="alert_txt"><i class="icon_warning"></i>선택조건 해제 후 초기화</p>
      </div>
      <button class="btn_over" @click="ksSelectOpen = !ksSelectOpen" :class="{ ksSelect_open: ksSelectOpen }"><img src="@m/assets/img/btn_over_up.png" /></button>
    </div>

    <!-- //검색 영역 -->
    <!-- 검색결과 목록 영역 -->
    <div class="ks_result_section">
      <div class="result_num_txt">
        <strong>총</strong>
        <span><i>4</i>건</span>
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
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                          </label>
                        </th>
                        <th colspan="3" class="fb f_impact t-l">제품코드</th>
                      </tr>
                      <tr>
                        <th colspan="3" class="fb f_impact t-l">제품명</th>
                      </tr>
                      <tr>
                        <th colspan="3" class="fb f_impact t-l">브랜드</th>
                      </tr>
                      <tr>
                        <th>밀도</th>
                        <th>친환경</th>
                        <th>등급</th>
                      </tr>
                      <tr>
                        <th colspan="3" class="pa-0">
                          <div class="half_cell">패턴전면</div>
                          <div class="half_cell">패턴후면</div>
                        </th>
                      </tr>
                      <tr>
                        <th colspan="3" class="pa-0">
                          <div class="half_cell">경면판 전면</div>
                          <div class="half_cell">경면판 후면</div>
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
                    <tbody>
                      <!-- 검색값 반복영역 -->
                      <tr>
                        <td rowspan="6">No</td>
                        <td rowspan="6">
                          <label class="chechbox_solo">
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                          </label>
                        </td>
                        <td colspan="3" class="fb f_impact t-l">FDM0011414</td>
                      </tr>
                      <tr>
                        <td colspan="3" class="fb f_impact t-l">MDF Regular 25T E1 35 (1220*2440)</td>
                      </tr>
                      <tr>
                        <td colspan="3" class="fb f_impact t-l">HBR</td>
                      </tr>
                      <tr>
                        <td>MD</td>
                        <td>E0</td>
                        <td>Premium</td>
                      </tr>
                      <tr>
                        <td colspan="3" class="pa-0">
                          <div class="half_cell">HK77_WHITE_80</div>
                          <div class="half_cell">HK77_WHITE_80</div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="3" class="pa-0">
                          <div class="half_cell">HK77_WHITE_80</div>
                          <div class="half_cell">HK77_WHITE_80</div>
                        </td>
                      </tr>
                      <!-- //검색값 반복영역 -->
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
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
                    <tbody>
                      <!-- 검색값 반복영역 -->
                      <tr>
                        <td rowspan="6">No</td>
                        <td rowspan="6">
                          <label class="chechbox_solo">
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                          </label>
                        </td>
                        <td colspan="3" class="fb f_impact t-l">FDM0011414</td>
                      </tr>
                      <tr>
                        <td colspan="3" class="fb f_impact t-l">MDF Regular 25T E1 35 (1220*2440)</td>
                      </tr>
                      <tr>
                        <td colspan="3" class="fb f_impact t-l">HBR</td>
                      </tr>
                      <tr>
                        <td>MD</td>
                        <td>E0</td>
                        <td>Premium</td>
                      </tr>
                      <tr>
                        <td colspan="3" class="pa-0">
                          <div class="half_cell">HK77_WHITE_80</div>
                          <div class="half_cell">HK77_WHITE_80</div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="3" class="pa-0">
                          <div class="half_cell">HK77_WHITE_80</div>
                          <div class="half_cell">HK77_WHITE_80</div>
                        </td>
                      </tr>
                      <!-- //검색값 반복영역 -->
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="btn_more_list" @click="limit = limit + 10">더보기</button>
    </div>
    <!-- //검색결과 목록 영역 -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      current: [],
      ksSelectOpen: false,
      bookmark: false,
      selectValue: '',
      selectOptions: ['KOREA', 'ENGLISH', 'VIETNAM'],
    };
  },
  computed: {
    ...mapGetters({
      notLogin: 'userInfo/getNotLogin',
      menuList: 'userInfo/getMenuList',
    }),
  },
  methods: {
    pageMove(page) {
      this.$router.push(`${page}`);
    },
  },
};
</script>

<style></style>
