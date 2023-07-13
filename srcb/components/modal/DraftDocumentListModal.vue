<template>
  <modal name="DraftDocumentListModal" width="1000" height="auto">
    <div class="modal" id="">
      <div slot="top-right" class="btn_modal_close">
        <button @click="$modal.hide('EndModal')"></button>
      </div>
      <p class="modal_title_t04">FDM001255 / MDF 레귤러 25T E1 35형 (1220*2440)</p>
      <div class="modal_content a-c">
        <div class="table table_scroll">
          <table>
            <colgroup>
              <col style="width: 130px" />
              <col style="width: 200px" />
              <col style="width: 100px" />
              <col style="width: 100px" />
              <col style="width: " />
            </colgroup>
            <thead>
              <tr>
                <th>등로일</th>
                <th>기간</th>
                <th>기준판가</th>
                <th>상태</th>
                <th>결재번호</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2022-09-01</td>
                <td>2022-09-01 ~ 2022-09-30</td>
                <td class="t-r">10,000</td>
                <td>승인</td>
                <td>70024589-20220701-0008</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'DraftDocumentListModal',
  data() {
    return {
      active: false,
    };
  },
  methods: {
    onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    },
  },
};
</script>

<style></style>
