<template>
  <modal name="SampleStandardModal" width="840" height="auto">
    <div class="modal" id="SampleStandard">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('SampleStandardModal')"></button>
      </div>
      <p class="modal_title_t02">샘플기준 사이즈</p>
      <div class="modal_content a-c">
        <!-- 리얼그리드 -->
        <div class="realgrid_container sample_realgrid">
          <div class="real_body">
            <CustomerOrderGrid style="height: 300px" />
          </div>
        </div>
        <!-- //리얼그리드 -->
        <div class="modal_btn_contents_t05">
          <button class="btn_default btn_primary">확인</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import find from '@/mixins/style.js'; // js 추가
import CustomerOrderGrid from '@wb/components/gridComponent/CustomerOrderGrid.vue';

export default {
  name: 'SampleStandardModal',
  components: { CustomerOrderGrid },
  methods: {
    onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    },
    getval() {
      find.getval(this.$refs.files);
    },
    deletor() {
      find.deletor();
    },
  },
};
</script>

<style></style>
