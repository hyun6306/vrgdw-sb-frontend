import axios from '@/plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';

//직원 목록
function getStaffList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.MYPAGE.STAFF_LIST.GET_STAFF_LIST, param);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}
//직원 저장
function saveStaffList(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.MYPAGE.STAFF_LIST.SAVE_STAFF_LIST, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

export default {
  getStaffList,
  saveStaffList,
};
