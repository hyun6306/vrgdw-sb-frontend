/**
 * UTILITY
 */

const NOTICE = {
  GET_NOTICE_LIST: '/v1/mypage/notice?filter=${filter}&pageNumber=${pageNumber}&pageSize=${pageSize}&showYn=${showYn}',
  GET_NOTICE: '/v1/mypage/notice/${id}',
};

const MANUAL = {
  GET_MANUAL_LIST: '/v1/mypage/manual?filter=${filter}&pageNumber=${pageNumber}&pageSize=${pageSize}&showYn=${showYn}',
  GET_MANUAL: '/v1/mypage/manual/${id}',
};

const UTILITY_COMMON = {
  FILE_DOWNLOAD: '/v1/mypage/download/${fileKey}',
  SAVE_BBSPOST: '/vrgdw/bbsPost',
  REMOVE_BBSPOST: '/vrgdw/bbsPost/remove',
  REMOVE_BBSPOST_FILE: '/vrgdw/bbsPost/fileRemove',
};

const PRIVACY_AGREE = {
  GET_PRIVACY: '/v1/mypage/privacy',
  GET_AGREE: '/v1/mypage/agree',
};

const UTILITY = {
  NOTICE,
  MANUAL,
  UTILITY_COMMON,
  PRIVACY_AGREE,
};

export { UTILITY };
