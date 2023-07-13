<template>
  <modal name="PlantSelectModal" width="480" height="auto" :adaptive="true" :clickToClose="false">
    <div class="modal">
      <div slot="top-right" class="btn_modal_close_t02">
        <button @click="$modal.hide('PlantSelectModal')"></button>
      </div>
      <p class="modal_title_t02">{{ $t('message.setPlant') }}</p>
      <div class="modal_content a-c">
        <span>{{ $t('message.plant') }}</span>
        <div class="plant_radio_box">
          <label class="radio_t" v-for="(plant, index) in this.plntCdOptions" :key="index">
            <input type="radio" name="radio" @change="selectPlant = plant" />
            <span class="checkmark"></span>
            {{ plant.text }}
          </label>
        </div>
        <div class="modal_btn_contents_t05">
          <button class="btn_default" @click="$modal.hide('PlantSelectModal')">{{ $t('message.btnCancel') }}</button>
          <button class="btn_default btn_primary" @click="sendPlant">{{ $t('message.btnCheck') }}</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  props: ['plntCdOptions'],
  name: 'PlantSelectModal',
  data() {
    return {
      selectPlant: {},
    };
  },
  methods: {
    sendPlant() {
      this.$emit('sendPlant', this.selectPlant);
      this.$modal.hide('PlantSelectModal');
    },
  },
};
</script>

<style></style>
