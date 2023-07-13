<template>
  <div>
    <!-- 검색필터 영역 -->
    <!-- <div class="search_content"></div> -->
    <!-- //검색필터 영역 -->

    <div class="client_section">
      <div id="TabS">
        <ul class="tab-menu">
          <li v-for="(tab, index) in tabs" v-bind:class="{ active: currentTab === index }" :key="index">
            <a v-on:click="currentTab = index">{{ tab }}</a>
          </li>
        </ul>
        <div class="tab-content tab-idpw-content">
          <div v-show="currentTab == 0">
            <!-- 검색필터 영역 -->
            <div class="search_content">
              <div class="search_box">
                <div class="search_box_title always_exposure">
                  <span>고객사 정보</span>
                </div>
                <div class="search_box_filter">
                  <div class="filter_list">
                    <label for="" class="filter_type">
                      <span class="filter_type_title">고객사</span>
                      <div class="form_inputnbtn">
                        <input type="text" style="" id="custoer_name" placeholder="Customer A" />
                        <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
                      </div>
                    </label>
                    <label for="" class="filter_type">
                      <span class="filter_type_title">고객사 담당자 명</span>
                      <input type="text" id="" style="" class="t-r" placeholder="" />
                    </label>
                    <label for="mobile_phone_number" class="filter_type">
                      <span class="filter_type_title" style="">고객사 연락처</span>
                      <div class="form_input">
                        <input type="text" id="mobile_phone_number01" style="width: 30%" class="t-c three_input" placeholder="0651" />
                        <i>-</i>
                        <input type="text" id="mobile_phone_number02" style="width: 30%" class="t-c three_input" placeholder="0651" />
                        <i>-</i>
                        <input type="text" id="mobile_phone_number03" style="width: 30%" class="t-c three_input" placeholder="0651" />
                      </div>
                    </label>
                  </div>
                </div>
                <div class="search_box_title always_exposure">
                  <span>실 사용 고객정보</span>
                </div>
                <div class="search_box_filter">
                  <div class="filter_list">
                    <label for="" class="filter_type">
                      <span class="filter_type_title">실 사용업체</span>
                      <div class="form_inputnbtn">
                        <input type="text" style="" id="custoer_name" placeholder="Customer A" />
                        <button class="btn_search_basic_info"><img src="@/assets/img/icon_search.png" /></button>
                      </div>
                    </label>
                    <label for="" class="filter_type">
                      <span class="filter_type_title">업체 담당자 명</span>
                      <input type="text" id="" style="" class="t-r" placeholder="" />
                    </label>
                    <label for="mobile_phone_number" class="filter_type">
                      <span class="filter_type_title" style="">업체 연락처</span>
                      <div class="form_input">
                        <input type="text" id="mobile_phone_number01" style="width: 30%" class="t-c three_input" placeholder="0651" />
                        <i>-</i>
                        <input type="text" id="mobile_phone_number02" style="width: 30%" class="t-c three_input" placeholder="0651" />
                        <i>-</i>
                        <input type="text" id="mobile_phone_number03" style="width: 30%" class="t-c three_input" placeholder="0651" />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <!-- //검색필터 영역 -->
            <!-- board 리스트 -->
            <div class="notice_section">
              <div class="mypage_form">
                <h2 class="mypage_title">클레임 정보</h2>
                <div class="mypage_form_table">
                  <table>
                    <colgroup>
                      <col style="width: 15%" />
                      <col style="width: 35%" />
                      <col style="width: 15%" />
                      <col style="width: 35%" />
                    </colgroup>
                    <tr>
                      <th><label class="list_title" for="">문제유형</label></th>
                      <td>
                        <div class="form_input">
                          <MultiSelect id="" class="" style="width: 50%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                        </div>
                      </td>
                      <th><label class="list_title" for="">문제유형상세</label></th>
                      <td>
                        <div class="form_input">
                          <MultiSelect id="" class="" style="width: 50%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th><label class="list_title" for="">불만내용</label></th>
                      <td colspan="3">
                        <div class="form_textarea" style="padding: 2px 10px">
                          <textarea type="text" id="" style="width: 100%" class="t-l" placeholder="" />
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>

                <h2 class="mypage_title">
                  <span>제품</span>
                  <div class="a-l">
                    <button class="btn_default btn_deep_green">선택삭제</button>
                    <button class="btn_default btn_deep_green">제품추가</button>
                  </div>
                </h2>
                <div class="table table_scroll">
                  <table>
                    <colgroup>
                      <col style="width: 52px" />
                      <col style="width: 80px" />
                      <col style="width: 300px" />
                      <col style="width: 200px" />
                      <col style="width: 180px" />
                      <col style="width: 150px" />
                      <col style="width: 150px" />
                      <col style="width: 180px" />
                      <col style="width: 300px" />
                      <col style="width: 150px" />
                      <col style="width: 120px" />
                      <col />
                    </colgroup>
                    <thead>
                      <tr>
                        <th></th>
                        <th>번호</th>
                        <th>배송번호(D/O NO.)</th>
                        <th>부킹번호</th>
                        <th>아이템 번호</th>
                        <th>배송 완료일</th>
                        <th>플랜트</th>
                        <th>제품코드</th>
                        <th>제품명</th>
                        <th>배송완료 수량(매)</th>
                        <th>문제수량</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <label class="chechbox_solo"><input type="checkbox" /><span class="checkmark"></span></label>
                        </td>
                        <td>1</td>
                        <td>D0000001</td>
                        <td>BK00000001</td>
                        <td>10</td>
                        <td>2022-10-31</td>
                        <td>MDF1</td>
                        <td>FDM001255</td>

                        <td>MDF 레귤러 20T E0 25형 (1220*2440)</td>
                        <td>30</td>
                        <td>
                          <div class="essential">
                            <input type="text" style="width: 100%" id="" placeholder="" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h2 class="mypage_title">
                  <span>사진</span>
                  <div class="a-l">
                    <button class="btn_default btn_deep_green">다운로드</button>
                    <!-- <button @change="getval()" class="btn_default btn_deep_green">파일첨부</button> -->
                    <div class="btn_regist02">
                      <input type="file" ref="files" name="images" @change="getval02()" />
                      사진선택
                    </div>
                  </div>
                </h2>
                <div class="upload_section">
                  <div class="list_slide">
                    <swiper class="swiper" :options="swiperOption">
                      <swiper-slide v-for="(info, index) in fileInfo" :key="index">
                        <div class="swiper-zoom-container">
                          <div class="registerd_box02">
                            <!-- {{ name }} -->
                            <img class="preview" :src="info.reader" alt="your image" />
                            <label class="chechbox_solo"><input type="checkbox" /><span class="checkmark"></span></label>
                            <button class="btn_delete_file" @click="deletor02(index)"></button>
                            <button class="btn_call"></button>
                          </div>
                        </div>
                      </swiper-slide>
                      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
                      <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
                      <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
                    </swiper>
                  </div>
                  <!-- <div class="picture_slide">
                    <swiper class="swiper" :options="swiperOption">
                      <swiper-slide v-for="(info, key) in fileInfo" :key="key">
                        <div class="swiper-zoom-container">
                          Slide 1
                          <img :src="info.reader" />
                        </div>
                      </swiper-slide>
                      <swiper-slide>Slide 2</swiper-slide>
                      <div class="swiper-pagination" slot="pagination"></div>
                      <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
                      <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
                    </swiper>
                  </div> -->

                  <!-- <div class="file_box">
                    <div class="file_regist_box02">
                      <div class="registerd_box02" v-for="(info, index) in fileInfo" :key="index">
                        <img class="preview" :src="info.reader" alt="your image" />
                        <label class="chechbox_solo"><input type="checkbox" /><span class="checkmark"></span></label>
                        <button class="btn_delete_file" @click="deletor02(index)"></button>
                      </div>
                    </div>
                  </div> -->
                </div>
                <h2 class="mypage_title">
                  첨부파일
                  <div class="a-l">
                    <button class="btn_default btn_deep_green">선택삭제</button>
                    <!-- <button class="btn_default btn_deep_green">제품추가</button> -->
                    <div class="btn_regist02">
                      <input type="file" ref="files02" name="fiel" @change="getval03()" />
                      제품추가
                    </div>
                  </div>
                </h2>
                <div class="table">
                  <table class="file_regist_box03">
                    <colgroup>
                      <col style="width: 55px" />
                      <col style="width: 40%" />
                      <col style="width: calc(60% - 55px)" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>
                          <label class="chechbox_solo"><input type="checkbox" /><span class="checkmark"></span></label>
                        </th>
                        <th>파일이름</th>
                        <th>파일크기</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <label class="chechbox_solo"><input type="checkbox" /><span class="checkmark"></span></label>
                        </td>
                        <td><a href="">파일이름</a></td>
                        <td>4030MB</td>
                      </tr>
                      <tr class="registerd_box03" v-for="(info, index) in fileInfo" :key="index">
                        <td>
                          <label class="chechbox_solo"><input type="checkbox" /><span class="checkmark"></span></label>
                        </td>
                        <td>
                          <a href="">{{ info.fileNm }}</a>
                        </td>
                        <td>{{ info.fileSize }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- //board 리스트 -->
            <div class="section_footer">
              <div class="footer_left">
                <button class="btn_default btn_white">초기화</button>
                <button class="btn_default btn_white">엑셀 업로드 템플릿</button>
                <button class="btn_default btn_white">엑셀 업로드</button>
              </div>
              <div class="footer_right">
                <button class="btn_default btn_temp">임시 저장</button>
                <button class="btn_default btn_temp">견적 요청</button>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-content">
          <div v-show="currentTab == 1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { EventBus } from '@/views/devPage/tabTest/EventBus';
// eslint-disable-next-line no-unused-vars
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      currentTab: 0,
      tabs: ['접수정보', '클레임분석', '방문계획', '조사보고서', '반품 및 무상주문관리'],
      currentMonth: '',
      selectMonth: '',
      selectValue: '',
      selectOptions: ['Select option', 'options', 'selected'],
      test: 0,
      searchOpen: true,
      // search_box_height: '',
      fileInfo: [],
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        //centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        observer: true,
        observeParents: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
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
    getByteSize(size) {
      const byteUnits = ['KB', 'MB', 'GB', 'TB'];

      for (let i = 0; i < byteUnits.length; i++) {
        size = size / 1024;

        if (size < 1024) return size.toFixed(2) + byteUnits[i];
      }
    },
    fileReaderFn(file) {
      return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    },
    async getval02() {
      console.log(this.$refs.files.files[0]);
      if (this.$refs.files && this.$refs.files.files[0]) {
        let src = await this.fileReaderFn(this.$refs.files.files[0]);
        const fileInfo = {
          reader: src,
          fileNm: this.$refs.files.files[0].name,
          fileSize: this.getByteSize(this.$refs.files.files[0].size),
        };
        this.fileInfo.push(fileInfo);
      }
    },
    deletor02(index) {
      // find.deletor(id);
      this.fileNm.splice(index, 1);
      this.$refs.files.value = null;
    },
    getval03() {
      // find.getval(this.$refs.files02);
      console.log(this.$refs.files02);
      if (this.$refs.files02 && this.$refs.files02.files02[0]) {
        this.fileNm.push(this.$refs.files02.files02[0].name);
        var reader = new FileReader();
        reader.readAsDataURL(this.$refs.files02.files02[0]);
      }
    },
    deletor03(index) {
      // find.deletor(id);
      this.fileNm.splice(index, 1);
      this.$refs.files02.value = null;
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

<style lang="scss" scoped>
// @import './base.scss';
// .swiper {

//   .swiper-slide {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     text-align: center;
//     font-weight: bold;
//     font-size: 30px;
//     background-color: #fff;
//   }
// }
// .swiper-slide {
//   width: 60%;
// }
// .swiper-slide:nth-child(2n) {
//   width: 40%;
// }
// .swiper-slide:nth-child(3n) {
//   width: 20%;
// }
</style>
