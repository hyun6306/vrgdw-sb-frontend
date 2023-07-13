/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

const _columns = [
  { fieldName: 'id', name: 'id', dataType: ValueType.TEXT, header: { text: '번호' }, width: 10, objectKey: 'integratedNotiGrid01' }, // 번호
  { fieldName: 'sendType', name: 'sendType', dataType: ValueType.TEXT, header: { text: '발송타입' }, width: 40, objectKey: 'integratedNotiGrid02' }, // 발송타입
  {
    fieldName: 'alarmNm',
    name: 'alarmNm',
    dataType: ValueType.TEXT,
    header: { text: '발송분류' },
    width: 50,
    objectKey: 'integratedNotiGrid03',
  }, // 발송분류
  {
    fieldName: 'title',
    name: 'title',
    dataType: ValueType.TEXT,
    header: { text: '발송제목' },
    width: 50,
    objectKey: 'integratedNotiGrid04',
    renderer: {
      type: 'text',
      showTooltip: true,
    },
  }, // 발송제목
  { fieldName: 'contents', name: 'contents', dataType: ValueType.TEXT, header: { text: '발송내용' }, objectKey: 'integratedNotiGrid05' }, // 발송내용
  // { fieldName: 'shortUrl', name: 'shortUrl', dataType: ValueType.TEXT, header: { text: '링크' }, width: 50 }, // 링크
  {
    fieldName: 'shortUrl',
    name: 'shortUrl',
    dataType: ValueType.TEXT,
    header: { text: '링크' },
    width: 40,
    objectKey: 'integratedNotiGrid06',
    renderer: {
      type: 'button',
      hideWhenEmpty: true,
      // buttonStyle: 'staticBtnValue',
    },
  },
  { fieldName: 'target', name: 'target', dataType: ValueType.TEXT, header: { text: '수신자아이디' }, width: 50, objectKey: 'integratedNotiGrid07' }, // 수신자아이디
  { fieldName: 'updatedBy', name: 'updatedBy', dataType: ValueType.TEXT, header: { text: '발송자아이디' }, width: 50, objectKey: 'integratedNotiGrid08' }, // 발송자아이디
  { fieldName: 'updatedByNm', name: 'updatedByNm', dataType: ValueType.TEXT, header: { text: '발송자이름' }, width: 40, objectKey: 'integratedNotiGrid09' }, // 발송자이름
  { fieldName: 'updatedAt', name: 'updatedAt', dataType: ValueType.TEXT, header: { text: '발송일시' }, width: 40, objectKey: 'integratedNotiGrid10' }, // 발송일시
  { fieldName: 'alarmCd', name: 'alarmCd', dataType: ValueType.TEXT, header: { text: '발송 코드' }, width: 40, visible: false }, // 발송 코드
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
