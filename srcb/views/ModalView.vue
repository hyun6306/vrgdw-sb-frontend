<template>
  <div id="container">
    <div class="wrap">
      <h1>{{ $t('label.modalZip') }}</h1>
      <div class="modal_list_container">
        <h2>{{ $t('label.commonUseModal') }}</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="alarm">{{ $t('button.yesOrNoAlram') }}</button>
            <AlarmModal />
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="alarmYes">{{ $t('button.yesAlram') }}</button>
            <AlarmYesModal />
          </div>
          <!-- <div class="modal_list_section">
            <div class="form_calendar">
              <date-range-picker v-model="dateRange" :linkedCalendars="false" :locale-data="localeData" :ranges="false" style="height: 30px" :showDropdowns="true"></date-range-picker>

              <span class="icon_calendar"><img src="@/assets/img/icon_calendar.png" /></span>
            </div>
          </div>
          <div class="modal_list_section">
            <div class="form_calendar">
              <date-range-picker v-model="datepicker" :locale-data="localeData" :ranges="false" :singleDatePicker="true" :date-format="dateFormat" :showDropdowns="true"></date-range-picker>
              <span class="icon_calendar"><img src="@/assets/img/icon_calendar.png" /></span>
            </div>
          </div> -->
          <div class="modal_list_section">
            <h4>{{ $t('label.chooseDate') }}</h4>
            <div class="form_calendar">
              <input type="text" placeholder="날짜 선택" />
              <button class="icon_calendar" @click="datePicker('DatePicker')"><img src="@/assets/img/icon_calendar.png" /></button>
            </div>
            <DatePickerModal />
          </div>
          <div class="modal_list_section">
            <h4>{{ $t('label.chooseDateRange') }}</h4>
            <div class="form_calendar">
              <input type="text" placeholder="기간 선택" />
              <button class="icon_calendar" @click="datePicker('DateRangePicker')"><img src="@/assets/img/icon_calendar.png" /></button>
            </div>
            <DateRangePickerModal />
          </div>
          <div class="modal_list_section">
            <h4>{{ $t('label.chooseMonth') }}</h4>
            <div class="form_calendar">
              <input type="text" placeholder="달 선택" />
              <button class="icon_calendar" @click="datePicker('DateMonthPicker')"><img src="@/assets/img/icon_calendar.png" /></button>
            </div>
            <DateMonthPickerModal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>{{ $t('label.header') }}</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="favori">{{ $t('button.favorite') }}</button>
            <FavoritesModal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>{{ $t('label.idPwFind') }}</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="IdPw">{{ $t('button.idPwModal') }}</button>
            <IdPwModal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>{{ $t('label.login') }}</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="TempPw">{{ $t('button.tempPwModal') }}</button>
            <TempPwModal />
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="PwChange">{{ $t('button.oldPwModal') }}</button>
            <PwChangeModal />
          </div>
        </div>
      </div>

      <div class="modal_list_container">
        <h2>{{ $t('label.orderGeneralRequest') }}</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="productSearch">{{ $t('button.searchProductModal') }}</button>
            <ProductSearchModal />
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="shippingaddress">{{ $t('button.shippingChooseModal') }}</button>
            <ShippingAddressModal />
          </div>

          <div class="modal_list_section">
            <button type="primary" @click="excelUpload">{{ $t('button.excelUploadModal') }}</button>
            <ExcelUploadModal />
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="sample">{{ $t('button.sampleCriteriaModal') }}</button>
            <SampleStandardModal />
          </div>

          <div class="modal_list_section">
            <button type="primary" @click="specifics">{{ $t('button.shipSpeciModal') }}</button>
            <ShippingSpecificsModal />
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="cliendsearch">{{ $t('button.customerSearchModal') }}</button>
            <ClientSearchModal />
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="langselect">언어선택</button>
            <LanguageSelectModal />
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="print">{{ $t('button.printWordModal') }}</button>
            <PrintModal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>{{ $t('label.bookingDtl') }}</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="DeliveryRequest">{{ $t('button.requestShippingModal') }}</button>
            <DeliveryRequestModal />
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="end">잔량종료</button>
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="costcenter">코스트센터조회</button>
            <CostCenterModal />
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="complete">완료처리</button>
            <CompleteModal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>{{ $t('label.register') }}</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="terms">{{ $t('button.clauseModal') }}</button>
            <TermsModal />
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="personal">{{ $t('button.personalInfoModal') }}</button>
            <PersonalModal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>공통코드 관리</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="propertycode">속성코드 등록</button>
            <PropertyCodeModal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>재고할당 관리</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="plantselect">플랜트지정</button>
            <PlantSelectModal />
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="productiondate">생산일 지정</button>
            <ProductionDateModal />
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="end">잔량종료..</button>
            <EndModal />
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="comment">영업의견메모</button>
            <CommentModal />
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="alarmYes">알림(공용사용)</button>
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>예탁처리</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="depositorychange">예탁전환</button>
            <DepositoryChangeModal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>기준판가관리</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="draftdocument">기안문서번호입력</button>
            <DraftDocumentModal />
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="draftdocumentlist">기안문서 내역</button>
            <DraftDocumentListModal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>공지사항,메뉴얼</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="noitceRegist">공지사항</button>
            <NoticeModal />
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="deleteList">삭제</button>
            <DeleteModal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>고객사</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="deliveryReigst">고객사등록</button>
            <DeliveryReigstModal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>PO출고요청</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="deliveryAllRegist">배송지일괄적용</button>
            <DeliveryAllRegistModal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>출고요청관리</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="etcOrderRegist">기타주문등록</button>
            <EtcOrderRegistModal />
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="forwardingAgent">운송사 선택</button>
            <ForwardingAgentModal />
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="dispatchreleasedetail">출고상세</button>
            <DispatchReleaseDetailModal />
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="customercarchoice">고객차량 선택</button>
            <CustomerCarChoiceModal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>차량관리</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="carinfoRegist">차량정보입력</button>
            <CarInfoRegistModal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>배차요청관리</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="carnumber">차량번호 선택</button>
            <CarNumberModal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>인수관리</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="takeover">인수확정</button>
            <TakeOverModal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>견적관리</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="salesmemo">영업의견메모</button>
            <SalesMemoModal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>운송비 조회</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="tcdetail">운송비 상세</button>
            <TransportCostDetailModal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>운송비 관리</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="dispatchreleasedetail">출고상세</button>
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="tcedit">운송비 조정</button>
            <TransportCostEditModal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>주문제어품목관리</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="cliendsearch">{{ $t('button.customerSearchModal') }}</button>
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>품목군별 담당영업사원관리</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="desinationic">담당지정</button>
            <DesignationinChargeModal />
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="salessearch">영업사원 검색</button>
            <SalesSearchModal />
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="searchword">검색어</button>
            <SearchModal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>AD 사용자등록</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="salesteam">영업팀 검색</button>
            <SalesTeamModal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>캘린더</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="holidaym">휴일</button>
            <HolidayModal />
          </div>
          <div class="modal_list_section">
            <button type="primary" @click="calendaroutm">출고</button>
            <CalendarOutModal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>배송현황</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="products02">검색</button>
            <ProductSearch02Modal />
          </div>
        </div>
      </div>
      <div class="modal_list_container">
        <h2>마스터/품목군별담당영업사원관리</h2>
        <div class="modal_list_content">
          <div class="modal_list_section">
            <button type="primary" @click="salesmanage">영업사원관리</button>
            <SalesManageModal />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IdPwModal from '@wb/components/modal/IdPwModal'; //아이디/패스워드 찾기
import TempPwModal from '@wb/components/modal/TempPwModal'; //임시비밀번호 로그인
import PwChangeModal from '@wb/components/modal/PwChangeModal'; //90일 경과비밀번호 변경
import AlarmModal from '@wb/components/modal/order/AlarmModal'; //알람(예,아니오)
import AlarmYesModal from '@wb/components/modal/order/AlarmYesModal'; //알람(예)
import ProductSearchModal from '@wb/components/modal/order/ProductSearchModal'; //상품검색
import ShippingAddressModal from '@wb/components/modal/order/ShippingAddressModal'; //배송지선택
import ExcelUploadModal from '@wb/components/modal/order/ExcelUploadModal'; //엑셀업로드
import SampleStandardModal from '@wb/components/modal/order/SampleStandardModal'; //샘플기준 사이즈
import FavoritesModal from '@wb/components/modal/FavoritesModal.vue'; //즐겨찾기
import PrintModal from '@wb/components/modal/PrintModal.vue'; //문서인쇄
import ShippingSpecificsModal from '@wb/components/modal/order/ShippingSpecificsModal.vue'; //배송특이사항
// import DateRangePicker from 'vue2-daterange-picker';
import DatePickerModal from '@wb/components/modal/DatePickerModal.vue';
import DateRangePickerModal from '@wb/components/modal/DateRangePickerModal.vue';
import DateMonthPickerModal from '@wb/components/modal/DateMonthPickerModal.vue';
import DeliveryRequestModal from '@wb/components/modal/order/DeliveryRequestModal.vue'; //부킹상세/배송요청
import TermsModal from '@wb/components/modal/TermsModal.vue'; //이용약관
import PersonalModal from '@wb/components/modal/PersonalModal.vue'; //개인정보
import ClientSearchModal from '@wb/components/modal/order/ClientSearchModal.vue'; //고객사 검색
import PropertyCodeModal from '@wb/components/modal/PropertyCodeModal.vue'; //속성코드 등록
import PlantSelectModal from '@wb/components/modal/inventory/PlantSelectModal.vue'; //플랜트 지정
import ProductionDateModal from '@wb/components/modal/inventory/ProductionDateModal.vue'; //생산일 지정
import EndModal from '@wb/components/modal/inventory/EndModal.vue'; //선택한 제품이 잔량종료되었습니다..
import CommentModal from '@wb/components/modal/inventory/CommentModal.vue'; //영업의견메모
import DepositoryChangeModal from '@wb/components/modal/DepositoryChangeModal.vue'; //예탁전환
import DraftDocumentModal from '@wb/components/modal/DraftDocumentModal.vue'; //기안문서번호 입력
import DraftDocumentListModal from '@wb/components/modal/DraftDocumentListModal.vue'; //기안문서내역
import NoticeModal from '@wb/components/modal/NoticeModal.vue'; //공지사항 등록
import DeleteModal from '@wb/components/modal/DeleteModal.vue'; //삭제
import DeliveryReigstModal from '@wb/components/modal/DeliveryReigstModal.vue'; //고객사등록
import CompleteModal from '@wb/components/modal/CompleteModal.vue'; //완료처리
import CostCenterModal from '@wb/components/modal/CostCenterModal.vue'; //코스트센터조회
import DeliveryAllRegistModal from '@wb/components/modal/DeliveryAllRegistModal.vue'; //배송지일괄적용
import EtcOrderRegistModal from '@wb/components/modal/EtcOrderRegistModal.vue'; //기타주문등록
import ForwardingAgentModal from '@wb/components/modal/ForwardingAgentModal.vue'; //운송사 선택
import CarInfoRegistModal from '@wb/components/modal/CarInfoRegistModal.vue'; //차량 정보입력
import CarNumberModal from '@wb/components/modal/CarNumberModal.vue'; //차량 번호선택
import TakeOverModal from '@wb/components/modal/TakeOverModal.vue'; //인수확정
import SalesMemoModal from '@wb/components/modal/SalesMemoModal.vue'; //견적요청 영업의견메노
import DispatchReleaseDetailModal from '@wb/components/modal/DispatchReleaseDetailModal.vue'; //출고상세
import TransportCostDetailModal from '@wb/components/modal/TransportCostDetailModal.vue'; //운송비 상세
import LanguageSelectModal from '@wb/components/modal/order/LanguageSelectModal.vue'; //언어선택
import DesignationinChargeModal from '@wb/components/modal/DesignationinChargeModal.vue'; //담당지정
import SalesSearchModal from '@wb/components/modal/SalesSearchModal.vue'; //영업사원검색
import SearchModal from '@wb/components/modal/SearchModal.vue'; //마스터 / 검색
import TransportCostEditModal from '@wb/components/modal/TransportCostEditModal.vue'; //운송비 조정
import SalesTeamModal from '@wb/components/modal/SalesTeamModal.vue'; //영업팀 검색
import HolidayModal from '@wb/components/modal/HolidayModal.vue'; //캘린더 휴일
import CalendarOutModal from '@wb/components/modal/CalendarOutModal.vue'; //캘린더 출고
import ProductSearch02Modal from '@wb/components/modal/ProductSearch02Modal.vue'; //배송현황>검색
import SalesManageModal from '@wb/components/modal/SalesManageModal.vue'; //품목군별영업사원관리 모달
import CustomerCarChoiceModal from '@wb/components/modal/CustomerCarChoiceModal.vue'; //고객차량 기본정보 모달

export default {
  components: {
    IdPwModal,
    TempPwModal,
    PwChangeModal,
    AlarmModal,
    ProductSearchModal,
    ShippingAddressModal,
    ExcelUploadModal,
    SampleStandardModal,
    AlarmYesModal,
    FavoritesModal,
    PrintModal,
    ShippingSpecificsModal,
    DatePickerModal,
    DateRangePickerModal,
    DateMonthPickerModal,
    DeliveryRequestModal,
    TermsModal,
    PersonalModal,
    ClientSearchModal,
    PropertyCodeModal,
    PlantSelectModal,
    ProductionDateModal,
    EndModal,
    CommentModal,
    DepositoryChangeModal,
    DraftDocumentModal,
    DraftDocumentListModal,
    NoticeModal,
    DeleteModal,
    DeliveryReigstModal,
    CompleteModal,
    CostCenterModal,
    DeliveryAllRegistModal,
    EtcOrderRegistModal,
    ForwardingAgentModal,
    CarInfoRegistModal,
    CarNumberModal,
    TakeOverModal,
    SalesMemoModal,
    DispatchReleaseDetailModal,
    TransportCostDetailModal,
    LanguageSelectModal,
    DesignationinChargeModal,
    SalesSearchModal,
    SearchModal,
    TransportCostEditModal,
    SalesTeamModal,
    HolidayModal,
    CalendarOutModal,
    ProductSearch02Modal,
    SalesManageModal,
    CustomerCarChoiceModal,
  },
  data() {
    return {
      visible: false,
      loading: false,
      dateRange: {
        startDate: '2022-07-07',
        endDate: '2022-07-15',
      },
      datepicker: {
        startDate: '2022-07-07',
      },
      localeData: {
        direction: 'ltr',
        format: 'yyyy/mm/dd',
        separator: ' - ',
        applyLabel: ' 확인',
        cancelLabel: 'Cancel',
        weekLabel: 'W',
        customRangeLabel: 'Custom Range',
        daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        // monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        firstDay: 0,
      },
    };
  },
  methods: {
    datePicker(value) {
      this.$modal.show(value);
    },
    pageMove(path) {
      this.$router.push(path);
    },
    IdPw() {
      this.$modal.show('IdPwModal');
    },
    TempPw() {
      this.$modal.show('TempPwModal');
    },
    PwChange() {
      this.$modal.show('PwChangeModal');
    },
    productSearch() {
      this.$modal.show('ProductSearchModal');
    },
    shippingaddress() {
      this.$modal.show('ShippingAddressModal');
    },
    alarm() {
      this.$modal.show('AlarmModal');
    },
    alarmYes() {
      this.$modal.show('AlarmYesModal');
    },
    excelUpload() {
      this.$modal.show('ExcelUploadModal');
    },
    sample() {
      this.$modal.show('SampleStandardModal');
    },
    favori() {
      this.$modal.show('FavoritesModal');
    },
    print() {
      this.$modal.show('PrintModal');
    },
    specifics() {
      this.$modal.show('ShippingSpecificsModal');
    },
    DeliveryRequest() {
      this.$modal.show('DeliveryRequestModal');
    },
    terms() {
      this.$modal.show('TermsModal');
    },
    personal() {
      this.$modal.show('PersonalModal');
    },
    cliendsearch() {
      this.$modal.show('ClientSearchModal');
    },
    propertycode() {
      this.$modal.show('PropertyCodeModal');
    },
    plantselect() {
      this.$modal.show('PlantSelectModal');
    },
    productiondate() {
      this.$modal.show('ProductionDateModal');
    },
    end() {
      this.$modal.show('EndModal');
    },
    comment() {
      this.$modal.show('CommentModal');
    },
    depositorychange() {
      this.$modal.show('DepositoryChangeModal');
    },
    draftdocument() {
      this.$modal.show('DraftDocumentModal');
    },
    draftdocumentlist() {
      this.$modal.show('DraftDocumentListModal');
    },
    noitceRegist() {
      this.$modal.show('NoticeModal');
    },
    deleteList() {
      this.$modal.show('DeleteModal');
    },
    deliveryReigst() {
      this.$modal.show('DeliveryReigstModal');
    },
    complete() {
      this.$modal.show('CompleteModal');
    },
    costcenter() {
      this.$modal.show('CostCenterModal');
    },
    deliveryAllRegist() {
      this.$modal.show('DeliveryAllRegistModal');
    },
    etcOrderRegist() {
      this.$modal.show('EtcOrderRegistModal');
    },
    forwardingAgent() {
      this.$modal.show('ForwardingAgentModal');
    },
    carinfoRegist() {
      this.$modal.show('CarInfoRegistModal');
    },
    carnumber() {
      this.$modal.show('CarNumberModal');
    },
    takeover() {
      this.$modal.show('TakeOverModal');
    },
    salesmemo() {
      this.$modal.show('SalesMemoModal');
    },
    dispatchreleasedetail() {
      this.$modal.show('DispatchReleaseDetailModal');
    },
    customercarchoice() {
      this.$modal.show('CustomerCarChoiceModal');
    },

    tcdetail() {
      this.$modal.show('TransportCostDetailModal');
    },
    langselect() {
      this.$modal.show('LanguageSelectModal');
    },
    desinationic() {
      this.$modal.show('DesignationinChargeModal');
    },
    salessearch() {
      this.$modal.show('SalesSearchModal');
    },
    searchword() {
      this.$modal.show('SearchModal');
    },
    tcedit() {
      this.$modal.show('TransportCostEditModal');
    },
    salesteam() {
      this.$modal.show('SalesTeamModal');
    },
    holidaym() {
      this.$modal.show('HolidayModal');
    },
    calendaroutm() {
      this.$modal.show('CalendarOutModal');
    },
    products02() {
      this.$modal.show('ProductSearch02Modal');
    },
    salesmanage() {
      this.$modal.show('SalesManageModal');
    },
  },
};
</script>
