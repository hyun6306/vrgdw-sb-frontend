import axios from 'axios';
import { baseObj } from '@/common/properties';
import store from '@/store/index';
import router from '@/router';
import router_m from '@m/router';

function setBaseUrl(location) {
  if (location.host.includes('localhost') || location.host.includes('dev') || location.host.includes('192')) {
    return baseObj.baseUrlDev;
  } else {
    return baseObj.baseUrl;
  }
}

let baseUrl = setBaseUrl(window.location);
let isMobile = location.host.includes('mdsales') ? true : false;

const HTTP = axios.create({
  baseURL: baseUrl + ':' + baseObj.basePort,
  timeout: 300000,
});

HTTP.interceptors.request.use(
  config => {
    store.commit('loading', true);
    config.headers.Authorization = store.getters['userInfo/getAuthorization'];
    return config;
  },
  async error => {
    store.commit('loading', false);
    store.commit('networkError', true);
    return Promise.reject(error);
  },
);

HTTP.interceptors.response.use(
  async response => {
    const {
      config,
      data: { status },
    } = response;

    if (status === 403) {
      const originalRequest = config;
      const vrgdwInfo = JSON.parse(sessionStorage.getItem('vrgdwInfo'));
      const refreshToken = store.getters['userInfo/getRefreshToken'];
      if (refreshToken !== 'undefined' && refreshToken) {
        const response = await axios.post(`${baseObj.baseUrl}:${baseObj.basePort}/v2/refresh`, {
          headers: {
            'Content-Type': 'application/json',
            Token: refreshToken,
          },
        });

        let {
          data: { status },
        } = response;
        if (status === 403 || status === 404) {
          store.commit('loading', false);
          store.commit('userInfo/reset');
          if (isMobile) router_m.push('/');
          else router.push('/');
        } else {
          const { rs } = response.data;
          const { Authorization: newAccessToken, Token: newRefreshToken } = rs;
          store.commit('userInfo/setAuthorization', newAccessToken);
          store.commit('userInfo/setRefreshToken', `${newRefreshToken}`);
          vrgdwInfo.Token = newRefreshToken;
          vrgdwInfo.Authorization = newAccessToken;
          sessionStorage.setItem('vrgdwInfo', JSON.stringify(vrgdwInfo));

          HTTP.defaults.headers.Authorization = `${newAccessToken}`;
          originalRequest.headers.Authorization = `${newAccessToken}`;

          return axios(originalRequest);
        }
      } else {
        store.commit('loading', false);
        store.commit('userInfo/reset');
        if (isMobile) router_m.push('/');
        else router.push('/');
      }
    }
    store.commit('loading', false);
    return response;
  },
  error => {
    store.commit('loading', false);
    store.commit('networkError', true);
    return Promise.reject(error);
  },
);

export default HTTP;
