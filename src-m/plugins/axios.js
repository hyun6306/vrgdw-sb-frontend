import axios from 'axios';
import { baseObj } from '@m/common/properties';
import store from '@m/store/index';

const HTTP = axios.create({
  baseURL: baseObj.baseUrl + ':' + baseObj.basePort,
  timeout: 300000,
});

HTTP.interceptors.request.use(
  config => {
    let vrgdwInfo = localStorage.getItem('vrgdwInfo');
    if (vrgdwInfo) {
      vrgdwInfo = JSON.parse(vrgdwInfo);
    }

    if (HTTP.defaults.headers.Authorization === undefined && config.url != '/login') {
      HTTP.defaults.headers.Authorization = vrgdwInfo.Authorization;
      config.headers.Authorization = vrgdwInfo.Authorization;
    }
    return config;
  },
  async error => {
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
      const vrgdwInfo = JSON.parse(localStorage.getItem('vrgdwInfo'));
      const refreshToken = vrgdwInfo.Token;
      const response = await axios.post(
        `${baseObj.baseUrl}:${baseObj.basePort}/v2/refresh`,
        {
          userCd: vrgdwInfo.userCd,
          userPs: vrgdwInfo.userPs,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Token: refreshToken,
          },
        },
      );

      const { rs } = response.data;
      const { Authorization: newAccessToken, Token: newRefreshToken } = rs;
      store.commit('userInfo/setAuthorization', newAccessToken);
      store.commit('userInfo/setRefreshToken', `${newRefreshToken}`);
      vrgdwInfo.Token = newRefreshToken;
      vrgdwInfo.Authorization = newAccessToken;
      localStorage.setItem('vrgdwInfo', JSON.stringify(vrgdwInfo));

      HTTP.defaults.headers.Authorization = `${newAccessToken}`;
      originalRequest.headers.Authorization = `${newAccessToken}`;

      return axios(originalRequest);
    }

    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default HTTP;
