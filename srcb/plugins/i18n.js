import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from '@wb/locales/en.json';
import ko from '@wb/locales/ko.json';

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'ko',
  fallbackLocale: 'ko',
  messages: { en, ko },
});
