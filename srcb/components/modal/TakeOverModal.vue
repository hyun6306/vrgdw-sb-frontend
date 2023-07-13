<template>
  <modal name="TakeOverModal" width="400" height="260" :adaptive="true">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('TakeOverModal')"></button>
      </div>
      <p class="modal_title_t02">인수확정</p>
      <div class="modal_content a-c">
        <div class="form_production_date">
          <span class="">배송지연사유</span>
          <MultiSelect id="" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
        </div>
        <span class="sub_txt">! 배송지연사유는 일괄로 적용됩니다.</span>
        <div class="modal_btn_contents_t05 mt-a mb-0">
          <button class="btn_default">취소</button>
          <button class="btn_default btn_primary">인수확정</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'TakeOverModal',
  data() {
    return {
      selectOptions: ['Select option', 'options', 'selected', 'selected', 'selected'],
    };
  },
};
</script>

<style></style>
