import Vue from 'vue';
import VueI18n from 'vue-i18n';
import language from '@/api/language';
import _ from 'lodash';
import store from '@/store';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  silentTranslationWarn: true,
});

let loadedLanguages = {};

export async function loadLanguageAsync(path, menuId = 0) {
  let langSet = 'en';
  let localLang = localStorage.getItem('langset');

  if (localLang) {
    langSet = localLang;
  }

  let sendMenuId = menuId;
  let response = null;
  const userInfo = store.getters['userInfo/getUserInfo'];

  if (userInfo && userInfo.locale) {
    langSet = userInfo.locale;
  }

  try {
    response = await language.getRouterLanguage(path, sendMenuId, langSet);
    const set = {};
    store.commit('userInfo/setAuthButton', response.data.rs.button);
    store.commit('userInfo/setSavePage', response.data.rs.savePage);
    response.data.rs.language.forEach(list => {
      const id = _.camelCase(list.formKey);
      const text = list.text;
      set[id] = text;
    });

    const messages = {
      message: set,
    };

    const keys = Object.keys(loadedLanguages);
    if (keys.length > 0) {
      if (loadedLanguages[langSet] === undefined) {
        loadedLanguages[langSet] = messages;
      } else if (loadedLanguages[langSet]['message']) {
        const afterLagnguages = {
          ...loadedLanguages[langSet]['message'],
          ...messages['message'],
        };
        loadedLanguages[langSet] = {
          message: afterLagnguages,
        };
      }
    } else {
      loadedLanguages[langSet] = messages;
    }
    i18n.setLocaleMessage(langSet, loadedLanguages[langSet]);
    i18n.locale = langSet;
  } catch (e) {
    console.log(e);
  }
  return response;
}
