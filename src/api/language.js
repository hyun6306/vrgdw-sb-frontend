import axios from '../plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';
import defs from '@/consts/defs';

/**
 *
 * @param routerPath
 * @param menuId
 * @param language
 * @param gridYn 다국어 조회 시 grid에 대한 정보만 받을 것인지, 그 외의 다국어를 받을것인지 구분자 (Y이면 langCls가 GRID 인 것만 조회)
 * @returns {Promise<AxiosResponse<any>>}
 */
function getRouterLanguage(routerPath, menuId, language, gridYn = 'N') {
  const param = {
    routerPath,
    menuId,
    gridYn,
  };
  let url = urls.COMMON.ROUTER_LANGUAGE;

  defs.v2RouterPath.forEach(path => {
    if (path === routerPath) {
      url = url.replace('v1', 'v2');
    }
  });
  const { httpUrl } = responseUtil.setHttpUrlReplace(url, param);
  return axios.get(httpUrl, { headers: { language } });
}

export default {
  getRouterLanguage,
};
