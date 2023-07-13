<template>
  <modal name="DepositoryChangeModal" width="1000" height="auto" :adaptive="true">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('DepositoryChangeModal')"></button>
      </div>
      <p class="modal_title_t02">예탁전환</p>
      <div class="modal_content a-c">
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 100px" />
              <col style="width: 100px" />
              <col style="width: 264px" />
              <col style="width: 100px" />
              <col style="width: 50px" />
              <col style="width: 100px" />
              <col style="width: 50px" />
              <col style="width: 100px" />
              <col style="width: 50px" />
            </colgroup>
            <thead>
              <tr>
                <th rowspan="2">플랜트코드</th>
                <th rowspan="2">제품코드</th>
                <th rowspan="2">제품명</th>
                <th colspan="2">배송가능 주문수량</th>
                <th colspan="2">배송가능 기본수량</th>
                <th colspan="2">예탁 전환 기본수량</th>
              </tr>
              <tr>
                <th>수량</th>
                <th>단위</th>
                <th>수량</th>
                <th>단위</th>
                <th>수량</th>
                <th>단위</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>MDF 1</td>
                <td>FDM001141</td>
                <td>MDF 레귤러 25T E1 35형(1220*2440)</td>
                <td>100</td>
                <td>매</td>
                <td>1,400</td>
                <td>매</td>
                <td>
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
                <td>매</td>
              </tr>
            </tbody>
          </table>
          <span class="sub_txt">! 전환수량이 배송가능수량보다 많습니다.</span>
        </div>

        <div class="modal_btn_contents_t05">
          <button class="btn_default">취소</button>
          <button class="btn_default btn_primary">예탁전환</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'DepositoryChangeModal',
};
</script>

<style></style>
