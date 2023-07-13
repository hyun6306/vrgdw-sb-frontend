const STAFF_LIST = {
  GET_STAFF_LIST: '/v1/mypage/staff?filter=${filter}&useYn=${useYn}',
  SAVE_STAFF_LIST: '/v1/mypage/staff',
};

const MY_INFO = {
  GET_MY_INFO: '/v1/mypage/info',
  PUT_MY_INFO_SAVE: '/v1/mypage/info',
  CHANGE_MENU_GROUP: 'v1/mypage/menuGroup',
};

const MYPAGE = {
  STAFF_LIST,
  MY_INFO,
};

export { MYPAGE };
