<template>
  <modal name="NoticeModal" width="750" height="auto">
    <div class="modal" id="NoticeRegist">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('NoticeModal')"></button>
      </div>
      <p class="modal_title_t02">공지사항,메뉴얼</p>
      <div class="modal_content">
        <div class="result_box">
          <div class="address_info">
            <p class="company_title">
              <label class="chechbox_basic">
                <input type="checkbox" />
                <span class="checkmark"></span>
                공지
              </label>
            </p>
            <ul>
              <li class="address_list">
                <div class="multi_line">
                  <p class="address_list_title">게시기간</p>
                  <div class="form_calendar">
                    <input type="text" placeholder="기간 선택" />
                    <button class="icon_calendar" @click="datePicker('DateRangePicker')"><img src="@/assets/img/icon_calendar.png" /></button>
                  </div>
                  <span class="address_list_info"> 게시기간은 최대 6개월입니다.</span>
                </div>
                <div class="multi_line">
                  <p class="address_list_title">조회수</p>
                  <span class="address_list_info">12314</span>
                </div>
              </li>
              <li class="address_list">
                <p class="address_list_title">제목</p>
                <div class="form_input">
                  <input type="text" placeholder="" style="width: 100%" />
                </div>
              </li>
              <li class="address_list">
                <div class="multi_line">
                  <p class="address_list_title">작성자</p>
                  <div class="form_input">
                    <input type="text" placeholder="홍길동" class="disabled" disabled />
                  </div>
                </div>
                <div class="multi_line">
                  <p class="address_list_title">작성일시</p>
                  <div class="form_input">
                    <input type="text" placeholder="2022-08-09" class="disabled" disabled />
                  </div>
                </div>
              </li>
              <li class="address_list">
                <p class="address_list_title">첨부파일</p>
                <div class="form_input">
                  <div class="file_regist_box">
                    <div class="btn_regist"><input type="file" ref="files" name="images" @change="getval()" />파일선택</div>
                    <div class="registerd_box" v-for="(name, index) in fileNm" :key="index">{{ name }}<button class="btn_delete_file" @click="deletor(index)"></button></div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="board_write"></div>
      </div>
      <div class="modal_btn_contents_t05 mb-20">
        <button class="btn_default">닫기</button>
        <button class="btn_primary">{{ $t('button.ok') }}</button>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'NoticeModal',
  data() {
    return {
      fileNm: [],
    };
  },
  methods: {
    onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    },
    getval() {
      // find.getval(this.$refs.files);
      console.log(this.$refs.files);
      if (this.$refs.files && this.$refs.files.files[0]) {
        this.fileNm.push(this.$refs.files.files[0].name);
        var reader = new FileReader();
        reader.readAsDataURL(this.$refs.files.files[0]);
      }
    },
    deletor(index) {
      // find.deletor(id);
      this.fileNm.splice(index, 1);
      this.$refs.files.value = null;
    },
  },
};
</script>

<style></style>
