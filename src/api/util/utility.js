import axios from '@/plugins/axios';
import responseUtil from '@/utils/responseUtil';
import { urls } from '@/consts/urls';

function getNoticeList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.UTILITY.NOTICE.GET_NOTICE_LIST, param);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getNotice(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.UTILITY.NOTICE.GET_NOTICE, param);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getManualList(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.UTILITY.MANUAL.GET_MANUAL_LIST, param);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getManual(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.UTILITY.MANUAL.GET_MANUAL, param);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function saveFileUtility(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.UTILITY.UTILITY_COMMON.FILE_DOWNLOAD, param);
  return axios.get(httpUrl, { responseType: 'blob', responseFileNm: param.fileNm });
}

function saveBbsPost(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.UTILITY.UTILITY_COMMON.SAVE_BBSPOST, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function removeBbsPost(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.UTILITY.UTILITY_COMMON.REMOVE_BBSPOST, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function removeBbsPostFile(param) {
  const { httpUrl, params } = responseUtil.setHttpUrlReplace(urls.UTILITY.UTILITY_COMMON.REMOVE_BBSPOST_FILE, param);
  return axios.put(httpUrl, params).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getPrivacy(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.UTILITY.PRIVACY_AGREE.GET_PRIVACY, param);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

function getAgree(param) {
  const { httpUrl } = responseUtil.setHttpUrlReplace(urls.UTILITY.PRIVACY_AGREE.GET_AGREE, param);
  return axios.get(httpUrl).then(resp => responseUtil.rejectIfNotSuccessful(resp));
}

export default {
  getNoticeList,
  getNotice,
  getManualList,
  getManual,
  saveFileUtility,
  saveBbsPost,
  removeBbsPost,
  removeBbsPostFile,
  getPrivacy,
  getAgree,
};
