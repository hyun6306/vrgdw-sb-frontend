<template>
  <!-- 기본정보수정 -->
  <div class="client_section">
    <!-- board 리스트 -->
    <div class="notice_section">
      <div class="mypage_form">
        <h2 class="mypage_title">{{ $t('message.pushSet') }}</h2>

        <div class="mypage_form_table">
          <table>
            <colgroup>
              <col style="width: 20%" />
              <col style="width: 30%" />
              <col style="width: 20%" />
              <col style="width: 30%" />
            </colgroup>
            <tr>
              <th class="pa-10">PUSH</th>
              <td class="pa-10">
                <label class="chechbox_solo">
                  <input id="checkBox" ref="checkBox" type="checkbox" v-model="pushYn" true-value="Y" false-value="N" />
                  <span class="checkmark"></span>
                </label>
              </td>
              <th class="pa-10">EMAIL</th>
              <td class="pa-10">
                <label class="chechbox_solo">
                  <input id="checkBox" ref="checkBox" type="checkbox" v-model="emailYn" true-value="Y" false-value="N" />
                  <span class="checkmark"></span>
                </label>
              </td>
            </tr>
          </table>
          <div class="board_footer">
            <div class="footer_left"></div>
            <!-- 삭제버튼, 저장버튼 -->
            <div class="footer_right">
              <!-- <button class="btn_default btn_temp">{{ $t('message.btnCancel') }}</button> -->
              <!-- <button class="btn_default btn_quta" @click="saveInfo">{{ $t('message.btnSave') }}</button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- //board 리스트 -->
  </div>
  <!-- //기본정보수정 -->
</template>

<script>
export default {
  props: ['infoData'],
  data() {
    return {
      pushYn: 'N',
      emailYn: 'N',
    };
  },
  watch: {
    infoData() {
      this.setting();
    },
  },
  methods: {
    reset() {
      //초기화
      this.pushYn = 'N';
      this.emailYn = 'N';
    },
    save() {
      //저장버튼
      let pushParam = {
        pushYn: this.pushYn,
        emailYn: this.emailYn,
      };

      return pushParam;
    },
    setting() {
      this.pushYn = this.infoData.pushYn;
      this.emailYn = this.infoData.emailYn;
    },
  },
};
</script>

<style></style>
