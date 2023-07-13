/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

const _columns = [
  { fieldName: 'id', name: 'id', dataType: ValueType.NUMBER, header: { text: 'id' }, visible: false }, // : id
  { fieldName: 'trncusId', name: 'trncusId', dataType: ValueType.NUMBER, header: { text: 'trncusId' }, visible: false }, // : id
  { fieldName: 'trncusNm', name: 'trncusNm', dataType: ValueType.TEXT, header: { text: '운송사' }, styleName: 't-l', width: 300 }, // : 운송사
  {
    fieldName: 'trnPlnNum',
    name: 'trnPlnNum',
    dataType: ValueType.TEXT,
    header: { text: '배차계획번호' },
    renderer: {
      type: 'html',
      callback: function (grid, cell) {
        let str = cell.value;
        str = '<p class="underline">' + cell.value + '</p>';

        return str;
      },
    },
    mergeRule: {
      criteria: 'value',
    },
  }, // : 배차계획번호
  {
    fieldName: 'trnCarNum',
    name: 'trnCarNum',
    dataType: ValueType.TEXT,
    header: { text: '차량번호' },
    renderer: {
      type: 'html',
      callback: function (grid, cell) {
        let str = cell.value;
        str = '<p class="underline">' + cell.value + '</p>';

        return str;
      },
    },
  }, // : 차량번호
  { fieldName: 'trnCfmAt', name: 'trnCfmAt', dataType: ValueType.TEXT, header: { text: '배차확정일시' }, width: 200 }, // : 배차확정일시
  { fieldName: 'outAt', name: 'outAt', dataType: ValueType.TEXT, header: { text: '출차일시' }, width: 200 }, // : 출차일시
  { fieldName: 'outStatCd', name: 'outStatCd', dataType: ValueType.TEXT, header: { text: 'outStatCd' }, visible: false }, // : outStatCd
  { fieldName: 'outStatNm', name: 'outStatNm', dataType: ValueType.TEXT, header: { text: '배송상태' } }, // : 배송상태
  { fieldName: 'trnDoNum', name: 'trnDoNum', dataType: ValueType.TEXT, header: { text: 'D/O번호' } }, // : D/O번호
  { fieldName: 'trnDoItemNum', name: 'trnDoItemNum', dataType: ValueType.NUMBER, header: { text: 'D/O 아이템 번호' }, numberFormat: '#' }, // : D/O 아이템 번호
  { fieldName: 'custCd', name: 'custCd', dataType: ValueType.TEXT, header: { text: '고객코드' } }, // : 고객코드
  { fieldName: 'plntNm', name: 'plntNm', dataType: ValueType.TEXT, header: { text: '플랜트' } }, // : 플랜트
  {
    fieldName: 'trnNum',
    name: 'trnNum',
    dataType: ValueType.TEXT,
    header: { text: '배송번호' },
    renderer: {
      type: 'html',
      callback: function (grid, cell) {
        let str = cell.value;
        str = '<p class="underline">' + cell.value + '</p>';
        return str;
      },
    },
  }, // : 배송번호
  { fieldName: 'trnSpltNum', name: 'trnSpltNum', dataType: ValueType.TEXT, header: { text: '분할번호' } }, // : 분할번호
  { fieldName: 'offrId', name: 'offrId', dataType: ValueType.NUMBER, header: { text: 'offrId' }, visible: false }, // : offrId
  { fieldName: 'offrDtlsId', name: 'offrDtlsId', dataType: ValueType.NUMBER, header: { text: 'offrDtlsId' }, visible: false }, // : offrDtlsId
  { fieldName: 'offrNum', name: 'offrNum', dataType: ValueType.TEXT, header: { text: '주문번호' }, visible: false }, // : 주문번호
  { fieldName: 'bokngSoItemNum', name: 'bokngSoItemNum', dataType: ValueType.NUMBER, header: { text: 'Item No.' }, numberFormat: '#' }, // : Item No.
  { fieldName: 'bokngSoNum', name: 'bokngSoNum', dataType: ValueType.TEXT, header: { text: 'SAP 주문번호' } }, // : SAP 주문번호
  { fieldName: 'trnClsNm', name: 'trnClsNm', dataType: ValueType.TEXT, header: { text: '출고구분' } }, // : 출고구분
  { fieldName: 'trnClsCd', name: 'trnClsCd', dataType: ValueType.TEXT, header: { text: '출고구분' } }, // : 출고구분
  { fieldName: 'trnHopeDt', name: 'trnHopeDt', dataType: ValueType.TEXT, header: { text: '배송희망일' }, visible: false }, // : 배송희망일
  { fieldName: 'trnHopeTiNm', name: 'trnHopeTiNm', dataType: ValueType.TEXT, header: { text: '배송희망시간' }, visible: false }, // : 배송희망시간
  { fieldName: 'takeOverAt', name: 'takeOverAt', dataType: ValueType.TEXT, header: { text: '인수완료일시' }, visible: false }, // : 인수완료일시
  { fieldName: 'trnDelayReason', name: 'trnDelayReason', dataType: ValueType.TEXT, header: { text: '배송지연사유' } }, // : 배송지연사유
  { fieldName: 'upSiteNm', name: 'upSiteNm', dataType: ValueType.TEXT, header: { text: '상차지' }, styleName: 't-l' }, // : 상차지
  { fieldName: 'custNm', name: 'custNm', dataType: ValueType.TEXT, header: { text: '고객사명' }, styleName: 't-l', width: 200 }, // : 고객사명
  { fieldName: 'logitsAlias', name: 'logitsAlias', dataType: ValueType.TEXT, header: { text: '배송지명' }, styleName: 't-l', width: 200 }, // : 배송지명
  { fieldName: 'postNum', name: 'postNum', dataType: ValueType.TEXT, header: { text: '우편번호' } }, // : 우편번호
  { fieldName: 'cityNm', name: 'cityNm', dataType: ValueType.TEXT, header: { text: '대권역' } }, // : 대권역
  { fieldName: 'distrNm', name: 'distrNm', dataType: ValueType.TEXT, header: { text: '중권역' } }, // : 중권역
  { fieldName: 'addr', name: 'addr', dataType: ValueType.TEXT, header: { text: '상세주소' }, styleName: 't-l', width: 200 }, // : 상세주소
  { fieldName: 'logitsPhoneNum1', name: 'logitsPhoneNum1', dataType: ValueType.TEXT, header: { text: '배송지 전화번호' } }, // : 배송지 전화번호
  { fieldName: 'invoiceNum', name: 'invoiceNum', dataType: ValueType.TEXT, header: { text: '송장번호' } }, // : 송장번호
  { fieldName: 'compNm', name: 'compNm', dataType: ValueType.TEXT, header: { text: '사업부' }, visible: false }, // : 사업부
  { fieldName: 'prdtCd', name: 'prdtCd', dataType: ValueType.TEXT, header: { text: '제품코드' } }, // : 제품코드
  { fieldName: 'prdtNm', name: 'prdtNm', dataType: ValueType.TEXT, header: { text: '제품명' }, styleName: 't-l', width: 200 }, // : 제품명
  { fieldName: 'baseUnitNm', name: 'baseUnitNm', dataType: ValueType.TEXT, header: { text: '단위' } }, // : 단위
  { fieldName: 'trnReqBaseQty', name: 'trnReqBaseQty', dataType: ValueType.NUMBER, header: { text: '출고기본수량' }, numberFormat: '#,###.###', styleName: 't-r' }, // : 출고기본수량
  { fieldName: 'ordUnitNm', name: 'ordUnitNm', dataType: ValueType.TEXT, header: { text: '단위' } }, // : 단위
  { fieldName: 'trnReqOrdQty', name: 'trnReqOrdQty', dataType: ValueType.NUMBER, header: { text: '출고주문수량' }, numberFormat: '#,###.###', styleName: 't-r' }, // : 출고주문수량
  { fieldName: 'volUnitNm', name: 'volUnitNm', dataType: ValueType.TEXT, header: { text: '단위' } }, // : 단위
  { fieldName: 'trnReqVol', name: 'trnReqVol', dataType: ValueType.NUMBER, header: { text: '출고부피' }, numberFormat: '#,###.###', styleName: 't-r' }, // : 출고부피
  { fieldName: 'wghtUnitNm', name: 'wghtUnitNm', dataType: ValueType.TEXT, header: { text: '단위' } }, // : 단위
  { fieldName: 'trnReqWght', name: 'trnReqWght', dataType: ValueType.NUMBER, header: { text: '출고중량' }, numberFormat: '#,###.###', styleName: 't-r' }, // : 출고중량
  { fieldName: 'custReqRemark', name: 'custReqRemark', dataType: ValueType.TEXT, header: { text: '주문특이사항' }, styleName: 't-l', width: 200 }, // : 주문특이사항
  { fieldName: 'trnPsbDt', name: 'trnPsbDt', dataType: ValueType.TEXT, header: { text: '최종 배송 가능일' }, visible: false }, // : 최종 배송 가능일
  { fieldName: 'trnPsbDtTo', name: 'trnPsbDtTo', dataType: ValueType.TEXT, header: { text: '최종 배송 가능일2' } }, // : 최종 배송 가능일2
  { fieldName: 'takeOverDt', name: 'takeOverDt', dataType: ValueType.TEXT, header: { text: '인수 완료일' } }, // : 인수 완료일
  { fieldName: 'kpiComplianceYn', name: 'kpiComplianceYn', dataType: ValueType.TEXT, header: { text: 'KPI 준수여부' } }, // : KPI 준수여부
  { fieldName: 'trnCarType', name: 'trnCarType', dataType: ValueType.TEXT, header: { text: 'trnCarType' }, visible: false }, // : trnCarType
  { fieldName: 'bokngNum', name: 'bokngNum', dataType: ValueType.TEXT, header: { text: '부킹번호' } }, // : 부킹번호
  { fieldName: 'itemNum', name: 'itemNum', dataType: ValueType.NUMBER, header: { text: 'Item No.' }, numberFormat: '#' }, // :Item No.
  { fieldName: 'trnPsbTiNm', name: 'trnPsbTiNm', dataType: ValueType.TEXT, header: { text: '시간' } }, // 시간
];

export const fields = _columns.map(({ fieldName, dataType }) => ({
  fieldName,
  dataType,
}));

export const columns = _columns.map(({ fieldName, name, header, ...rest }) => ({
  fieldName,
  name,
  header,
  ...rest,
}));

export const layout = [
  'trnClsNm', // 배송유형, (기타, 일반, 예탁, 이동), 1
  'trnCarType', // (동화차량, 고객차량)
  'trnNum', // 배차요청번호, 2
  'trnSpltNum', // 분할번호, 3
  'trnPlnNum', // 출고계획번호, 4
  'trnDoNum', // D/O번호, 5
  'trnDoItemNum', // D/O 아이템번호, 6
  'invoiceNum', // 송장번호, 7
  'trncusNm', // 운송사, 8
  'trnCarNum', // 차량번호, 9
  {
    name: 'finalDtTi', // 배송계획일
    direction: 'horizontal',
    header: {
      text: '배송계획일',
      tooltip: '배송계획일',
      showTooltip: true,
    },
    items: ['trnPsbDtTo', 'trnPsbTiNm'], // 날짜, 시간, 10
  },
  'trnCfmAt', // 배차확정일, 11
  'outAt', // 출차일, 12
  'outStatNm', // 출고상태, 13
  'takeOverDt', // 인수완료일, 14
  'kpiComplianceYn', // KPI, 15
  'trnDelayReason', // 배송지연사유, 16
  'custCd', // 고객코드, 17
  'custNm', // 고객, 18
  'logitsAlias', // 배송지, 19
  'postNum', // 우편번호, 20
  {
    name: 'cityDistr', // 주소
    direction: 'cityDistr',
    hideChildHeaders: false,
    header: {
      text: '배송지 권역',
    },
    items: ['cityNm', 'distrNm'], // 대권역, 중권역, 21, 22
  },
  'addr', // 주소, 23
  'logitsPhoneNum1', // 연락처, 24
  'custReqRemark', // 특이사항, 25
  'plntNm', // 플랜트, 26
  'upSiteNm', // 상차지, 27
  'prdtCd', // 제품코드, 28
  'prdtNm', // 제품명, 29
  {
    name: 'forwardingOrd', // 주문단위
    direction: 'forwardingOrd',
    header: {
      text: '출고주문단위',
    },
    items: ['trnReqOrdQty', 'ordUnitNm'], // 수량, 단위, 30, 31
  },
  {
    name: 'forwardingBase', // 기본단위
    direction: 'forwardingBase',

    header: {
      text: '출고기본단위',
    },
    items: ['trnReqBaseQty', 'baseUnitNm'], // 수량, 단위, 32, 33
  },
  {
    name: 'forwardingVol', // 부피
    direction: 'logitsCd',
    header: {
      text: '부피단위',
    },
    items: ['trnReqVol', 'volUnitNm'], // 수량, 단위, 34, 35
  },
  {
    name: 'forwardingWght', // 중량
    direction: 'logitsCd',
    header: {
      text: '중량단위',
    },
    items: ['trnReqWght', 'wghtUnitNm'], // 수량, 단위, 36, 37
  },
  'bokngNum', // 부킹번호, 38
  'itemNum', // 부킹아이템번호, 39
  'bokngSoNum', // ERP S/O 번호, 40
  'bokngSoItemNum', // ERP S/O 아이템번호, 41
  'id',
  'trncusId',
  'outStatCd',
  'compNm',
  'offrId',
  'offrDtlsId',
  'offrNum',
  'trnHopeDt',
  'trnHopeTiNm',
  'takeOverAt',
];
