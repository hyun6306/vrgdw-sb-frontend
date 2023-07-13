/**
 * 컴포넌트 import가 vue script export default 안에서 동적으로 해결이 불가하여 컴포넌트 import 관련하여 따로 만듦.
 * 웹 개발자 도구 안에서 vue develop 을 봤을 때 로드되는것은 component :is 이후 배치되는 것으로 보임.
 * componentUrl.js에도 관련 정보를 등록해야함.
 */

/**
 * 견적
 */
import OrderDtls from '@/views/order/OrderDtls'; //  주문 - 견적관리 - 견적상세
import GeneralList from '@/views/order/GeneralList'; // 주문 - 견적관리 - 견적현황
import OrderGeneral from '@/views/order/OrderGeneral'; // 주문 - 견적관리 - 견적요청
import DashBoard from '@/views/main/DashBoard'; // 메인(대시보드)

import sampleOrder from '@/views/order/SampleOrder'; // 주문 - 생픔관리 - 샘플요청 ?
import QuoteDetail from '@/views/order/QuoteDetail'; //  주문 - 견적관리 - 견적상세
import BookingOrder from '@/views/booking/BookingOrder'; // 주문 - 부킹관리 - 부킹상세
import InventoryAllocationList from '@/views/order/InventoryAllocationList'; // 주문 - 부킹관리 - 재고할당관리
import SampleList from '@/views/order/SampleList'; // 주문 - 생픔관리 - 샘플 관리

import OrderList from '@/views/order/OrderList'; // 주문 - 레포트 - 거래내역조회
import CreditCurrent from '@/views/order/CreditCurrent'; // 주문 - 레포트 - 여신현황
import DeliveryList from '@/views/tran/DeliveryList'; // 배송- 배송관리 - 배송요청관리
import ClaimRegist from '@/views/service/ClaimRegist'; // 서비스 - 클레임관리 - 클레임등록
import ClaimList from '@/views/service/ClaimList'; // 서비스 - 클레임관리 - 클레임목록
import CustCardList from '@/views/sales/CustCardList'; // 영업활동 - 고객관리 - 고객카드
import PriceList from '@/views/sales/PriceList'; // 영업활동 - 판가관리 (기준판가관리 / 거래처별 판가관리)

// import ItemPriceDtlsList from '@/views/sales/ItemPriceDtlsList'; // 영업활동 - 판가관리 - 판가 관리 상세
import BiMain from '@/views/main/BiMain'; // 영업활동 - 영업 BI - view
import FreeReturn from '@/views/order/FreeReturn'; // 견적요청 - 견적관리 - 무상/반품 주문 등록

import PartnerList from '@/views/master/PartnerList'; // 마스터 - 고객관리 - 파트너 목록
import PartnerDtls from '@/views/master/PartnerDtls'; // 마스터 - 고객관리 - 파트너 목록 상세
import OutsourcingList from '@/views/master/OutsourcingList'; // 마스터 - 고객관리 - 외주 업체 관리
import ProductList from '@/views/master/ProductList'; // 마스터 - 제품관리 - 제품목록
import ProductChartList from '@/views/master/ProductChartList'; // 마스터 - 제품관리 - 특성항목관리
import ProductLevelList from '@/views/master/ProductLevelList'; // 마스터 - 제품관리 - 제품계층구조관리
import ProductCategoryList from '@/views/master/ProductCategoryList'; // 마스터 - 제품관리 - 품목군별 영업사원 관리
import TranStandardList from '@/views/master/TranStandardList'; // 마스터 - 주문관리 - 배송 납기 표준 관리
import ProductControlList from '@/views/master/ProductControlList'; // 마스터 - 주문관리 - 주문제어품목관리
import AreaManagement from '@/views/master/AreaManagement'; // 마스터 - 운송기준관리 - 권역 관리
import TranAreaManagement from '@/views/master/TranAreaManagement'; // 마스터 - 운송기준관리 - 권역 관리
import LogitsAreaList from '@/views/master/LogitsAreaList'; // 마스터 - 운송기준관리 - 물류 창고 관리
import CarTypeList from '@/views/master/CarTypeList'; // 마스터 - 운송기준관리 - 차량 유형 관리
import LogitsList from '@/views/master/LogitsList'; // 마스터 - 운송기준관리 - 상차지 관리
import CountryList from '@/views/master/CountryList'; // 마스터 - 공통기준관리 - 국가코드 관리
import CompanyList from '@/views/master/CompanyList'; // 마스터 - 공통기준관리 - 회사코드 관리
import ExchangeRateList from '@/views/master/ExchangeRateList'; // 마스터 - 공통기준관리 - 환율관리
import PlantList from '@/views/master/PlantList'; // 마스터 - 공통기준관리 - 플랜트관리
import StorageList from '@/views/master/StorageList'; // 마스터 - 공통기준관리 - 저장위치관리
import CurrencyList from '@/views/master/CurrencyList'; // 마스터 - 공통기준관리 - 통화관리
import HolidayList from '@/views/master/HolidayList'; // 마스터 - 공통기준관리 - 휴무일 관리
import TrnBlockList from '@/views/master/TrnBlockList'; // 마스터 - 공통기준관리 - 출고제한일 관리
import UserList from '@/views/master/UserList'; // 마스터 - 사용자관리
import OrderMonthManagement from '@/views/master/OrderMonthManagement'; // 마스터 - 주문관리 - 주문월관리
import ProductManagement from '@/views/master/ProductManagement'; // 마스터 - 제품관리 - 제품관리
import ProductManagementDetail from '@/views/master/ProductManagementDetail'; // 마스터 - 제품관리 - 제품관리(상세)

/**
 * UTILITY
 */
import UtilPage from '@/views/util/UtilPage'; // utility - 공지사항 / 메뉴얼
import UtilPrivate from '@/views/util/UtilPrivate'; // utility - 개인정보처리방침
import UtilAgree from '@/views/util/UtilAgree'; // utility - 이용약관

/**
 * Mypage
 */
import MyInfo from '@/views/mypage/MyInfo'; // mypage - 회원정보 설정
import StaffList from '@/views/mypage/StaffList'; // mypage - 직원관리 - 직원목록
import MyDeliveryList from '@/views/mypage/MyDeliveryList'; // mypage - 배송지목록
import CustList from '@/views/mypage/CustList'; // mypage - 고객사목록
import CustDtls from '@/views/mypage/CustDtls'; // mypage - 고객사목록 상세

/**
 * 운송
 */
import DepositFwReqManage from '@/views/tran/DepositFwReqManage'; // 운송 - 배차계획 - 예탁출고요청관리
import PoForwardingRequest from '@/views/tran/PoForwardingRequest'; // 운송 - 배차계획 - PO출고요청관리
import ForwardingReqManage from '@/views/tran/ForwardingReqManage'; // 운송 - 배차계획 - 출고요청관리
import CarManage from '@/views/tran/CarManage'; // 운송 - 운송실행 - 차량관리
import DispatchReqManage from '@/views/tran/DispatchReqManage'; // 운송 - 운송실행 - 배차요청관리
import DispatchConfirmManage from '@/views/tran/DispatchConfirmManage'; // 운송 - 운송실행 - 배차확정관리
import CarInOutManage from '@/views/tran/CarInOutManage'; // 운송 - 운송실행 - 차량 입/출차관리
import TakeOverManage from '@/views/tran/TakeOverManage'; // 운송 - 운송실행 - 인수관리
// import ReturnInAmountConfirm from '@/views/tran/ReturnInAmountConfirm'; // 운송 - 운송실행 - 반품 입고수량 확정
import ForwardingStatList from '@/views/tran/ForwardingStatList'; // 운송 - 운송실적 - 출고상태조회
import TranCostManage from '@/views/tran/TranCostManage'; // 운송 - 운송실적 - 운송비 관리
import TranCostList from '@/views/tran/TranCostList'; // 운송 - 운송실적 - 운송비 조회
import TranCostMonthClosingList from '@/views/tran/TranCostMonthClosingList'; // 운송 - 운송실적 - 운송비 월 마감 조회

// import TransportCost from '@/views/tran/TransportCost'; // 운송 - 운송실적 - 운송비 관리

/**
 * 시스템
 */
import MenuGroup from '@/views/system/MenuGroup'; // 시스템 - 메뉴그룹
import RouterList from '@/views/system/RouterList'; // 시스템 - 프로그램 관리
import CodeList from '@/views/system/CodeList'; // 시스템 - 공통 코드
import LanguageLang from '@/views/system/LanguageLang'; // 시스템 - 다국어 단어사전
import LanguagePage from '@/views/system/LanguagePage'; // 시스템 - 다국어 라우터 단어 연결
import PrivacyManage from '@/views/system/PrivacyManage'; // 시스템 - 개인정보활용동의 관리
import AgreeManage from '@/views/system/AgreeManage'; // 시스템 - 약관관리
import LogManage from '@/views/system/LogManage'; // 시스템 - 시스템관리 - API 로그 관리
import LoginList from '@/views/system/LoginList'; // 시스템 - 시스템관리 - 로그인 로그
import IntegratedNotificationList from '@/views/system/IntegratedNotificationList'; // 시스템 - 시스템관리 - 통합알림관리
import OrganizationManagement from '@/views/system/OrganizationManagement'; // 시스템 - 공통관리 - 조직관리
import HRInformationList from '@/views/system/HRInformationList'; // 시스템 - 사용자관리 - 인사정보 변경 조회
import ScheduleLog from '@/views/system/ScheduleLog'; // 시스템 - 시스템관리 - 로그인 로그

import RealGridSample from '@/views/devPage/RealGridSample'; // 시스템 - 시스템관리 - 로그인 로그
import TestRealGridSample from '@/views/devPage/TestRealGridSample'; // 시스템 - 시스템관리 - 로그인 로그

export const componentList = {
  SampleList,
  OrderDtls,
  GeneralList,
  OrderGeneral,
  QuoteDetail,
  DashBoard,
  sampleOrder,
  BookingOrder,
  MenuGroup,
  RouterList,
  CodeList,
  LanguageLang,
  OrderList,
  CreditCurrent,
  DeliveryList,
  ClaimRegist,
  ClaimList,
  CustCardList,
  PriceList,
  // ItemPriceDtlsList,
  BiMain,
  FreeReturn,
  PartnerList,
  PartnerDtls,
  OutsourcingList,
  ProductList,
  ProductChartList,
  ProductLevelList,
  ProductCategoryList,
  TranStandardList,
  ProductControlList,
  LogitsAreaList,
  CarTypeList,
  LogitsList,
  CountryList,
  CompanyList,
  ExchangeRateList,
  PlantList,
  StorageList,
  CurrencyList,
  HolidayList,
  TrnBlockList,
  InventoryAllocationList,
  UtilPage,
  LanguagePage,
  AgreeManage,
  PrivacyManage,
  DepositFwReqManage,
  UtilPrivate,
  UtilAgree,
  MyInfo,
  StaffList,
  MyDeliveryList,
  CustList,
  CustDtls,
  CarManage,
  PoForwardingRequest,
  ForwardingReqManage,
  DispatchReqManage,
  DispatchConfirmManage,
  CarInOutManage,
  TakeOverManage,
  ForwardingStatList,
  TranCostManage,
  TranCostList,
  TranCostMonthClosingList,
  LogManage,
  UserList,
  LoginList,
  IntegratedNotificationList,
  OrganizationManagement,
  AreaManagement,
  TranAreaManagement,
  HRInformationList,
  OrderMonthManagement,
  ProductManagement,
  ProductManagementDetail,
  ScheduleLog,
  RealGridSample,
  TestRealGridSample,
};
