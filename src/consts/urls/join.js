const JOIN_CUST = {
  GET_CUSTOMER_DEFAULT: '/v2/customer?email=${email}',
  SET_CUSTOMER_DEFAULT: '/v2/customer',
  SET_CUSTOMER_ADDR: '/v2/customer/addressInfo',
  GET_CUSTOMER_AREA_DTAIL: '/v2/customer/area?prntCd=${prntCd}',
  GET_CUSTOMER_AREA: '/v2/customer/area',
  POST_CUSTOMER_TEMPPWD: '/v2/customer/tempPassWord',
};
const JOIN_TRANS = {
  GET_TRANS_DEFAULT: '/v2/transcus?email=${email}',
  SET_TRANS_DEFAULT: '/v2/transcus',
  SET_TRANS_ADDR: '/v2/transcus/addressInfo',
};

const PRIVACY_AGREE = {
  GET_V2_PRIVACY: '/v2/privacy',
  GET_V2_AGREE: '/v2/agree',
};

const JOIN = {
  JOIN_CUST,
  JOIN_TRANS,
  PRIVACY_AGREE,
};

export { JOIN };
