/**
 * 정적인 데이터를 공톡적으로 정의하는 곳
 */
const error = {
  STATUS_ERROR: -1,
};

/**
 * menuId가 0 또는 빈값으로 처리되어야 하는 목록들
 * 다국어 정보 불러올 때 request header 에 token이 없어도 조회되어야 하는 목록
 * @/router/index.js beforeEach
 */
const v2RouterPath = ['/signin', '/signup', '/signin/pw-search', '/id-search', '/mypage/old-pw-update', '/mypage/tmp-pw-update', '/consentAccess', '/checkView'];

const offrClsCd = {
  order: 'GENR',
  sample: 'SMPL',
  free: 'FREE',
  return: 'RTRN',
};

const offrStatCd = {
  temp: 'TMP',
  request: 'REQ',
  confirm: 'CFM',
  proceed: 'ING',
  end: 'END',
  cancel: 'CAN',
};

const offrDtlsStatCd = {
  temp: 'TMP',
  request: 'REQ',
  confirm: 'CFM',
  proceed: 'ING',
  end: 'END',
  cancel: 'CAN',
};

const bokngStatCd = {
  all: 'BK00',
  payNeed: 'BK01',
  confirmNeed: 'BK02',
  bokngConfirm: 'BK03',
  request: 'BK04',
  assiIng: 'BK05',
  assiEnd: 'BK06',
  cancel: 'BK07',
  remainEnd: 'BK08',
  end: 'BK09',
};

const bokngClsCd = {
  order: 'GENR',
  deposit: 'RSVT',
};

const exptStatCd = {
  new: 'EXPTNEW',
  request: 'EXPTREQ',
  confirm: 'EXPTCFM',
};

const apprStatCd = {
  need: 'NED',
  report: 'REQ',
  return: 'RTN',
  end: 'END',
};

const trnClsCd = {
  all: 'TRCLS00',
  general: 'TRCLS01',
  free: 'TRCLS02',
  sample: 'TRCLS03',
  deposit: 'TRCLS04',
  return: 'TRCLS05',
  move: 'TRCLS06',
  etc: 'TRCLS07',
};

const prdtClsCd = {
  MDF: 'ADM0_MDF',
  MFB: 'AMN0_MFB',
};

const unitCd = {
  pc: 'PC',
  bdl: 'BDL',
  m3: 'M3',
  kg: 'KG',
};

const outStatCd = {
  all: 'OUT00',
  trnReq: 'OUT01',
  disReq: 'OUT02',
  disEnd: 'OUT03',
  disCon: 'OUT04',
  delIng: 'OUT05',
  cancel: 'OUT06',
  delEnd: 'OUT07',
};

const outTypeCd = {
  판매운송: 'OTY01',
  반품운송: 'OTY02',
  사내이적: 'OTY03',
  외부창고운송: 'OTY04',
  영업외운송: 'OTY05',
  // 팔레트: 'OTY06',
  팔레트: 'OTY07',
  미세칩운반: 'OTY08',
  매출처이관: 'OTY09',
  외주운송비: 'OTY10',
  전산매출처리: 'OTY11',
};

const carTypeCd = {
  VRGDW: 'VRGDW',
  CUSTOMER: 'CUSTOMER',
};

export default {
  error,
  v2RouterPath,
  offrClsCd,
  offrStatCd,
  offrDtlsStatCd,
  bokngStatCd,
  bokngClsCd,
  exptStatCd,
  apprStatCd,
  trnClsCd,
  prdtClsCd,
  unitCd,
  outStatCd,
  outTypeCd,
  carTypeCd,
};
