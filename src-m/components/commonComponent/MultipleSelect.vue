<template>
  <div :class="`mcheckbox_multiselect ${rand}`">
    <button class="select_default" :class="[disabled ? 'select_default disabled' : 'select_default']" @click="isClose(this_)" @keyup.esc="checkboxMultiselect = false" :disabled="disabled">
      <div class="select_title">
        <span>{{ title }}</span>
      </div>
      <i :class="{ on: checkboxMultiselect }"></i>
    </button>
    <ul class="dropdown" :class="{ on: checkboxMultiselect }">
      <li v-for="option in cdOptions" :key="option.value" :class="option.$isDisabled ? 'disabled' : ''">
        <label class="chechbox_basic" :class="option.$isDisabled ? 'disabled' : ''">
          <input type="checkbox" v-model="option.checked" @change="select(option)" :disabled="option.$isDisabled" />
          <span class="checkmark"></span>
          {{ option.text }}
        </label>
      </li>
    </ul>
  </div>
  <!-- //체크박스 멀티 셀렉트 -->
</template>

<script>
import _ from 'lodash';

export default {
  props: ['options', 'all', 'default', 'isBefore', 'dataKey', 'page', 'disabled'],
  data() {
    return {
      statCd: [],
      cdOptions: [],
      checkboxMultiselect: false,
      focus: false,
      this_: this,
      rand: Math.random(),
    };
  },
  computed: {
    title() {
      let title = '';
      for (let i = 0; i < this.statCd.length; i++) {
        if (this.statCd[i].value === '전체' || this.statCd[i].value === '' || (this.statCd[i].value.includes('00') && !this.statCd[i].value.includes('D'))) {
          title = this.statCd[i].text;
          break;
        } else {
          title += this.statCd[i].text + ', ';
        }
      }
      if (title !== '전체' && title.toUpperCase() !== 'ALL') title = title.substr(0, title.length - 2);
      return title;
    },
  },
  watch: {
    options() {
      this.cdOptions = JSON.parse(JSON.stringify(this.options));
      this.cdOptions.forEach(option => {
        if (typeof this.default === 'object') {
          this.default.forEach(data => {
            if (data === option.value) {
              option.checked = true;
            }
          });
        } else {
          if (this.default === option.value) {
            option.checked = true;
          } else if (!this.default) {
            option.checked = this.all;
          }
        }
      });
      this.statCd = this.cdOptions.filter(option => option.checked);
    },
    statCd() {
      if (this.dataKey) {
        this.$emit('select', this.statCd, this.dataKey);
      } else {
        this.$emit('select', this.statCd);
      }
    },
  },
  methods: {
    select(selectOption) {
      if ((selectOption.value === '전체' || selectOption.value === '' || (selectOption.value.includes('00') && !selectOption.value.includes('D'))) && selectOption.checked) {
        this.cdOptions.forEach(option => {
          option.checked = true;
        });
      } else if ((selectOption.value === '전체' || selectOption.value === '' || (selectOption.value.includes('00') && !selectOption.value.includes('D'))) && !selectOption.checked) {
        this.cdOptions.forEach(option => {
          option.checked = false;
        });
      } else if (selectOption.value == 'reset') {
        this.cdOptions.forEach(option => {
          if (this.default) {
            if (this.default === option.value) {
              option.checked = true;
            } else {
              option.checked = false;
            }
          } else if (!this.default) {
            option.checked = this.all;
          }
        });
      } else {
        let count = 0;

        this.cdOptions.forEach(option => {
          if (!selectOption.checked && (option.value === '전체' || option.value === '' || (option.value.includes('00') && !option.value.includes('D'))) && option.checked) {
            option.checked = false;
          }
          if (option.checked) {
            count++;
          }
        });
        if (this.cdOptions.length - 1 === count) {
          const optionAll = this.cdOptions.find(option => {
            return option.value === '전체' || option.value === '' || (option.value.includes('00') && !option.value.includes('D'));
          });

          if (optionAll) {
            optionAll.checked = true;
          }
        }
      }
      this.cdOptions = JSON.parse(JSON.stringify(this.cdOptions));
      this.statCd = this.cdOptions.filter(option => option.checked);
    },
    isOpen() {
      this.checkboxMultiselect = true;
      document.addEventListener('click', this.checkParent);
      document.addEventListener('touchstart', this.checkParent);
    },
    checkParent(event) {
      let existCheckboxMultiSelect = false;
      if (event) {
        event.composedPath().forEach(path => {
          if (path.className && path.className.includes(`checkbox_multiselect ${this.rand}`)) {
            existCheckboxMultiSelect = true;
          }
        });
      }
      if (!existCheckboxMultiSelect) {
        this.isClose(this);
        document.removeEventListener('click', this.checkParent);
        document.removeEventListener('touchstart', this.checkParent);
      }
    },
    isClose: _.debounce(vm => {
      if (vm.checkboxMultiselect) {
        vm.checkboxMultiselect = false;
        document.removeEventListener('click', vm.checkParent);
        document.removeEventListener('touchstart', vm.checkParent);
      } else {
        vm.isOpen();
      }
    }, 30),
  },
  mounted() {
    this.cdOptions = JSON.parse(JSON.stringify(this.options));

    this.cdOptions.forEach(option => {
      if (typeof this.default === 'object') {
        this.default.forEach(data => {
          if (data === option.value) {
            option.checked = true;
          }
        });
      } else {
        if (this.default === option.value) {
          option.checked = true;
        } else if (!this.default) {
          option.checked = this.all;
        }
      }
    });

    if (this.isBefore) {
      let isBefore = this.isBefore.split(',');
      this.cdOptions.forEach(option => {
        option.checked = false;
      });
      this.cdOptions.forEach(option => {
        isBefore.forEach(before => {
          if (before === option.value) {
            option.checked = true;
          }
        });
      });
    }
    this.statCd = this.cdOptions.filter(option => option.checked);
  },
};
</script>

<style></style>
