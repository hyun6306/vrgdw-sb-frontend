import axios from '@/plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';

//직원 목록
function getMyInfo() {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MYPAGE.MY_INFO.GET_MY_INFO);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}
//직원 저장
function saveMyInfoSave(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MYPAGE.MY_INFO.PUT_MY_INFO_SAVE, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function changeMenuGroup(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MYPAGE.MY_INFO.CHANGE_MENU_GROUP, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

export default {
  getMyInfo,
  saveMyInfoSave,
  changeMenuGroup,
};
