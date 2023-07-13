<template>
  <modal name="ExcelUploadModal" width="840" height="auto">
    <div class="modal" id="ExcelUpload">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('ExcelUploadModal')"></button>
      </div>
      <p class="modal_title_t02">엑셀 업로드</p>
      <div class="modal_content excel_content">
        <span class="title">기초 데이터 업로드</span>
        <span class="sub_txt">(*)은 필수 입력 컬럼입니다. 각 칼럼의 값은 견적요청 화면을 참고 후 입력하세요.</span>
        <div class="excel_t">
          <table class="">
            <colgroup>
              <col style="width: 120px" />
              <col style="width: calc(100% - 120px)" />
            </colgroup>
            <tr>
              <th>업로드 템플릿</th>
              <td><button>템플릿 다운로드</button></td>
            </tr>
            <tr>
              <th>업로드 템플릿<i class="important">*</i></th>
              <td>
                <div class="a-l">
                  <div class="file_regist_box">
                    <div class="btn_regist"><input type="file" ref="files" name="images" @change="getval()" />파일선택</div>
                    <div class="registerd_box" v-for="(name, index) in fileNm" :key="index">{{ name }}<button class="btn_delete_file" @click="deletor(index)"></button></div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <span class="sub_txt">오류 항목을 확인해주세요</span>
        <div class="modal_btn_contents_t04">
          <button class="btn_default btn_primary">저장</button>
        </div>
        <span class="title">오류 항목</span>
        <div class="excel_t">
          <table class="">
            <colgroup>
              <col style="width: 20%" />
              <col style="width: 20%" />
              <col style="width: 20%" />
              <col style="width: 40%" />
            </colgroup>

            <thead>
              <tr>
                <th class="t-c">오류라인</th>
                <th class="t-c">항목</th>
                <th class="t-c">입력값</th>
                <th class="t-c">비고</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="t-c">17</td>
                <td class="t-c">제품코드</td>
                <td class="t-c">없음</td>
                <td class="t-c"></td>
              </tr>
              <tr>
                <td class="t-c">17</td>
                <td class="t-c">제품코드</td>
                <td class="t-c">없음</td>
                <td class="t-c"></td>
              </tr>
              <tr>
                <td class="t-c">17</td>
                <td class="t-c">제품코드</td>
                <td class="t-c">없음</td>
                <td class="t-c"></td>
              </tr>
              <tr>
                <td class="t-c">17</td>
                <td class="t-c">제품코드</td>
                <td class="t-c">없음</td>
                <td class="t-c"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <span class="sub_txt">오류 항목을 확인해주세요</span>
        <div class="modal_btn_contents_t05">
          <button class="btn_default">닫기</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
// import find from '@/mixins/style.js'; // js 추가

export default {
  name: 'ExcelUploadModal',
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
