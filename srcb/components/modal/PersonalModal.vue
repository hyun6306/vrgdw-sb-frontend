<template>
  <modal name="PersonalModal" width="650" height="650">
    <div class="modal" id="Personal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('PersonalModal')"></button>
      </div>
      <p class="modal_title_t02">개인정보취급방침</p>
      <div class="modal_content a-c">
        <div class="specialty_box">동화기업㈜ (http://www.dongwha.com'이하 '동화')는 개인정보보호법 ...</div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'PersonalModal',
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
