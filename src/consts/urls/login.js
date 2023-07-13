const LOGIN = {
  LOGIN: '/login',
  LOGIN_AD: '/v2/login',
  PUT_TEMP_PWD: '/v1/user/newPasswd',
  PUT_CHANGE_PWD: '/v1/user/expirePasswd',
  PUT_CHANGE_NEXT: '/v1/user/update/ExpireDt',
};

const FIND = {
  POST_FIND_ID: '/v2/login/findId',
  POST_FIND_PW: '/v2/login/findPw',
};

export { LOGIN, FIND };
