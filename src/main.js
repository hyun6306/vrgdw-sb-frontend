import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import { i18n } from '@/plugins/i18n';
import '@/assets/scss/realgrid-style.css';
import VModal from 'vue-js-modal'; //모달
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css'; // Multi-Select https://vue-multiselect.js.org/#sub-getting-started
import '@/assets/scss/vue2-daterange-picker.css'; //데이트피커
import VDatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import Autocomplete from 'v-autocomplete';
import 'v-autocomplete/dist/v-autocomplete.css';
import loadScript from 'vue-plugin-load-script';

import setDateFormat from '@/utils/dateUtil';

import VueDOMPurifyHTML from 'vue-dompurify-html';

Vue.use(VueDOMPurifyHTML);

Vue.component('VDatePicker', VDatePicker);
Vue.component('MultiSelect', Multiselect);
Vue.use(VModal);

Vue.use(Autocomplete);
Vue.use(loadScript);
Vue.use(setDateFormat);

Vue.config.productionTip = false;

Vue.prototype.$EventBus = new Vue();

if (window.location.host.includes('localhost') || window.location.host.includes('dev') || window.location.host.includes('192')) {
  Vue.config.devtools = true;
} else {
  Vue.config.devtools = false;
}

new Vue({
  router,
  store,
  i18n,
  loadScript,
  render: h => h(App),
}).$mount('#app');
