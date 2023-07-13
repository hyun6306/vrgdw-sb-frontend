import defs from '@/consts/defs';

/**
 * request 보낼 때 param Setting 하는 메소드
 * get 통신의 경우 ${} 를 이용하여 param 을 Setting
 * json 일 경우 key / value 값 세팅
 * array 일 경우 array 형태로 전달
 * form-data 요청건인지 확인
 * @param {string} url
 * @param {json, array} restArgs
 * @param {string} type
 */
function setHttpUrlReplace(url, restArgs, type = 'noForm') {
  let params = {};

  if (type === 'noForm') {
    if (restArgs && !Array.isArray(restArgs)) {
      for (const [key, value] of Object.entries(restArgs)) {
        let rpKey = '${' + key.toString() + '}';
        if (url.indexOf(rpKey) > -1) {
          url = url.replace('${' + key.toString() + '}', value ? value : '');
        } else {
          if (value) {
            params[key] = value;
          }
        }
      }
    } else if (Array.isArray(restArgs)) {
      params = restArgs;
    }
    return { httpUrl: url, params: params };
  } else {
    const headers = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    };
    return { httpUrl: url, params: restArgs, headers };
  }
}

/**
 * response 가 json 인지 확인
 * @param {json} resp
 * @returns true / false
 */
function isJsonObject(resp) {
  return typeof resp === 'object';
}

/**
 * response data status 값 반환
 * @param {json} resp
 * @returns number
 */
function getResponseStatus(resp) {
  if (!isJsonObject(resp) || resp.data.status === undefined) {
    return defs.error.STATUS_ERROR;
  } else {
    return resp.data.status;
  }
}

/**
 * response data status 가 200 이 아니면 Error 로 처리
 * @param {json} response
 * @returns resp / error
 */
function rejectIfNotSuccessful(resp) {
  const status = getResponseStatus(resp);
  if (isNaN(status) || Number('' + status) === defs.error.STATUS_ERROR) {
    return Promise.reject({
      errMsg: '알수없는 응답포맷',
      err: resp,
    });
  }
  if (Number('' + status) !== 200) {
    return Promise.reject({
      errMsg: 'System Error',
      err: resp,
    });
  }
  return resp;
}
/**
 * response data result 값 반환
 * @param {json} resp
 * @returns number
 */
function getResponseResult(resp) {
  if (!isJsonObject(resp) || resp.data.result === undefined) {
    return defs.error.STATUS_ERROR;
  } else {
    return resp.data.result;
  }
}
function rejectIfNotSuccessfulResult(resp) {
  const result = getResponseResult(resp);
  if (isNaN(result) || Number('' + result) === defs.error.STATUS_ERROR) {
    return Promise.reject({
      errMsg: '알수없는 응답포맷',
      err: resp,
    });
  }
  if (result !== '00') {
    return Promise.reject({
      errMsg: 'API 호출 실패',
      err: resp,
    });
  }
  return resp;
}

export default {
  setHttpUrlReplace,
  getResponseStatus,
  rejectIfNotSuccessful,
  rejectIfNotSuccessfulResult,
};
