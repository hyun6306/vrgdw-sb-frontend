import Vue from 'vue';
import App from '@mb/App';
import router from '@mb/router';
import store from '@mb/store';
import i18n from '@mb/plugins/i18n';
import VModal from 'vue-js-modal'; //모달
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css'; // Multi-Select https://vue-multiselect.js.org/#sub-getting-started
import '@/assets/scss/vue2-daterange-picker.css'; //데이트피커
import VDatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import Autocomplete from 'v-autocomplete';
import 'v-autocomplete/dist/v-autocomplete.css';

import 'swiper/css/swiper.min.css';

Vue.component('VDatePicker', VDatePicker);
Vue.component('MultiSelect', Multiselect);
Vue.use(VModal);

Vue.use(Autocomplete);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
