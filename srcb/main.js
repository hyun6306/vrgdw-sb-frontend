import Vue from 'vue';
import App from '@wb/App';
import router from '@wb/router';
import store from '@wb/store';
import i18n from '@wb/plugins/i18n';
import '@/assets/scss/realgrid-style.css';
import VModal from 'vue-js-modal'; //모달
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css'; // Multi-Select https://vue-multiselect.js.org/#sub-getting-started
import '@/assets/scss/vue2-daterange-picker.css'; //데이트피커
import VDatePicker from 'vue2-datepicker';
import VCalendar from 'v-calendar';
import 'vue2-datepicker/index.css';

import Autocomplete from 'v-autocomplete';
import 'v-autocomplete/dist/v-autocomplete.css';

import 'swiper/css/swiper.min.css';
// import 'swiper/css/pagination';

Vue.component('VDatePicker', VDatePicker);
Vue.use(VCalendar);
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
