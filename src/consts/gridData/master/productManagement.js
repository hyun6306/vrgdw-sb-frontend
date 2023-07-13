/**
 * 그리드의 fields, columns 정적 부분 정의
 * savaPage와 비교하여 columns 는 순서 변경
 */
import { ValueType } from 'realgrid';

const _columns = [
  { fieldName: 'id', name: 'id', objectKey: 'productMngGrid01', dataType: ValueType.TEXT, header: { text: 'id' }, width: 30, visible: false },
  { fieldName: 'prdtCd', name: 'prdtCd', objectKey: 'productMngGrid02', dataType: ValueType.TEXT, header: { text: '제품 코드' } },
  {
    fieldName: 'erpPrdtNm',
    name: 'erpPrdtNm',
    objectKey: 'productMngGrid03',
    dataType: ValueType.TEXT,
    header: { text: 'ERP 제품 명' },
    renderer: {
      type: 'html',
      callback: function (grid, cell) {
        let str = cell.value;
        str = '<p class="underline">' + cell.value + '</p>';
        return str;
      },
    },
    width: 250,
  },
  { fieldName: 'prdtKorNm', name: 'prdtKorNm', objectKey: 'productMngGrid04', dataType: ValueType.TEXT, header: { text: '제품 한글 명' }, width: 250 },
  { fieldName: 'prdtEngNm', name: 'prdtEngNm', objectKey: 'productMngGrid05', dataType: ValueType.TEXT, header: { text: '제품 영어 명' }, width: 300 },
  { fieldName: 'prdtVnmNm', name: 'prdtVnmNm', objectKey: 'productMngGrid06', dataType: ValueType.TEXT, header: { text: '제품 베트남 명' }, width: 300 },
  { fieldName: 'tskType', name: 'tskType', objectKey: 'productMngGrid07', dataType: ValueType.TEXT, header: { text: '두께 타입' } },
  { fieldName: 'tskSpec', name: 'tskSpec', objectKey: 'productMngGrid08', dataType: ValueType.TEXT, header: { text: '두께 규격' } },
  { fieldName: 'hrsnType', name: 'hrsnType', objectKey: 'productMngGrid09', dataType: ValueType.TEXT, header: { text: '가로 타입' } },
  { fieldName: 'hrsnSpec', name: 'hrsnSpec', objectKey: 'productMngGrid10', dataType: ValueType.TEXT, header: { text: '가로 규격' } },

  { fieldName: 'vtclType', name: 'vtclType', objectKey: 'productMngGrid11', dataType: ValueType.TEXT, header: { text: '세로 타입' } },
  { fieldName: 'vtclSpec', name: 'vtclSpec', objectKey: 'productMngGrid12', dataType: ValueType.TEXT, header: { text: '세로 규격' } },
  { fieldName: 'brdDnst', name: 'brdDnst', objectKey: 'productMngGrid13', dataType: ValueType.TEXT, header: { text: '보드 등급' } },
  { fieldName: 'dnstType', name: 'dnstType', objectKey: 'productMngGrid14', dataType: ValueType.TEXT, header: { text: '보드 밀도' } },
  { fieldName: 'brdSpec', name: 'brdSpec', objectKey: 'productMngGrid15', dataType: ValueType.TEXT, header: { text: '밀도 타입' } },
  { fieldName: 'lpmFrtPttn1', name: 'lpmFrtPttn1', objectKey: 'productMngGrid16', dataType: ValueType.TEXT, header: { text: 'LPM 앞 패턴 1' } },
  { fieldName: 'lpmFrtPttn2', name: 'lpmFrtPttn2', objectKey: 'productMngGrid17', dataType: ValueType.TEXT, header: { text: 'LPM 앞 패턴 2' } },
  { fieldName: 'lpmBckPttn1', name: 'lpmBckPttn1', objectKey: 'productMngGrid18', dataType: ValueType.TEXT, header: { text: 'LPM 뒷 패턴 1' } },
  { fieldName: 'lpmBckPttn2', name: 'lpmBckPttn2', objectKey: 'productMngGrid19', dataType: ValueType.TEXT, header: { text: 'LPM 뒷 패턴 2' } },
  { fieldName: 'prsUpPttn', name: 'prsUpPttn', objectKey: 'productMngGrid20', dataType: ValueType.TEXT, header: { text: '경면판 위 패턴' } },

  { fieldName: 'prsDwPttn', name: 'prsDwPttn', objectKey: 'productMngGrid21', dataType: ValueType.TEXT, header: { text: '경면판 아래 패턴' } },
  { fieldName: 'saleUnitNmrtr', name: 'saleUnitNmrtr', objectKey: 'productMngGrid22', dataType: ValueType.TEXT, header: { text: '판매 단위 분자' } },
  { fieldName: 'saleUnitDenom', name: 'saleUnitDenom', objectKey: 'productMngGrid23', dataType: ValueType.TEXT, header: { text: '판매 단위 분모' } },
  { fieldName: 'ordUnitNmrtr', name: 'ordUnitNmrtr', objectKey: 'productMngGrid24', dataType: ValueType.TEXT, header: { text: '주문 단위 분자' } },
  { fieldName: 'ordUnitDenom', name: 'ordUnitDenom', objectKey: 'productMngGrid25', dataType: ValueType.TEXT, header: { text: '주문 단위 분모' } },
  { fieldName: 'wght', name: 'wght', objectKey: 'productMngGrid26', dataType: ValueType.TEXT, header: { text: '중량' } },
  { fieldName: 'totWght', name: 'totWght', objectKey: 'productMngGrid27', dataType: ValueType.TEXT, header: { text: '총 중량' } },
  { fieldName: 'totVol', name: 'totVol', objectKey: 'productMngGrid28', dataType: ValueType.TEXT, header: { text: '총 부피' } },
  { fieldName: 'totVolCal', name: 'totVolCal', objectKey: 'productMngGrid29', dataType: ValueType.TEXT, header: { text: '환산부피' } }, //상세 작업 시 컬럼명 확인
  { fieldName: 'currency', name: 'currency', objectKey: 'productMngGrid30', dataType: ValueType.TEXT, header: { text: '통화 단위' } },

  { fieldName: 'prdtRemark', name: 'prdtRemark', objectKey: 'productMngGrid31', dataType: ValueType.TEXT, header: { text: '제품 특이사항' } },
  { fieldName: 'useYn', name: 'useYn', objectKey: 'productMngGrid32', dataType: ValueType.TEXT, header: { text: '사용 Y/N' } },
  { fieldName: 'taxType', name: 'taxType', objectKey: 'productMngGrid33', dataType: ValueType.TEXT, header: { text: '세금 타입' } },
  { fieldName: 'prdtClsNm', name: 'prdtClsNm', objectKey: 'productMngGrid34', dataType: ValueType.TEXT, header: { text: '제품 분류' } },
  { fieldName: 'brandNm', name: 'brandNm', objectKey: 'productMngGrid35', dataType: ValueType.TEXT, header: { text: '브랜드 명' } },
  { fieldName: 'ecoNm', name: 'ecoNm', objectKey: 'productMngGrid36', dataType: ValueType.TEXT, header: { text: '친환경 명 코드' } },
  { fieldName: 'ordUnitNm', name: 'ordUnitNm', objectKey: 'productMngGrid37', dataType: ValueType.TEXT, header: { text: '주문단위 명' } },
  { fieldName: 'operClsNm', name: 'operClsNm', objectKey: 'productMngGrid38', dataType: ValueType.TEXT, header: { text: '운영구분 명' } },
  { fieldName: 'baseUnitNm', name: 'baseUnitNm', objectKey: 'productMngGrid39', dataType: ValueType.TEXT, header: { text: '기본단위 명' } },
  { fieldName: 'volUnitNm', name: 'volUnitNm', objectKey: 'productMngGrid40', dataType: ValueType.TEXT, header: { text: '볼륨단위 명' } },

  { fieldName: 'wghtUnitNm', name: 'wghtUnitNm', objectKey: 'productMngGrid41', dataType: ValueType.TEXT, header: { text: '무게단위 명' } },
  { fieldName: 'brdGradeNm', name: 'brdGradeNm', objectKey: 'productMngGrid42', dataType: ValueType.TEXT, header: { text: '보드등급 명' } },
  { fieldName: 'uptYn', name: 'uptYn', objectKey: 'productMngGrid43', dataType: ValueType.TEXT, header: { text: 'uptYn' }, visible: false },
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

export const layout = ['id', 'prdtCd', 'erpPrdtNm', 'prdtKorNm', 'prdtEngNm', 'prdtVnmNm', 'tskType', 'tskSpec', 'hrsnType', 'hrsnSpec', 'vtclType', 'vtclSpec', 'brdDnst', 'dnstType', 'brdSpec', 'lpmFrtPttn1', 'lpmFrtPttn2', 'lpmBckPttn1', 'lpmBckPttn2', 'prsUpPttn', 'prsDwPttn', 'saleUnitNmrtr', 'saleUnitDenom', 'ordUnitNmrtr', 'ordUnitDenom', 'wght', 'totWght', 'totVol', 'totVolCal', 'currency', 'prdtRemark', 'useYn', 'taxType', 'prdtClsNm', 'brandNm', 'ecoNm', 'ordUnitNm', 'operClsNm', 'baseUnitNm', 'volUnitNm', 'wghtUnitNm', 'brdGradeNm', 'uptYn'];
