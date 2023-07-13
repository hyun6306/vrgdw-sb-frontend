const MAIN = {
  CUSTOMER_CNT: '/main/customer/offrStat',
  CUSTOMER_BOOKING: '/main/customer/bokngStat?offrClsCd=${offrClsCd}',
  CUSTOMER_DELIVERY: '/main/customer/trnStat',
  VRGDW_CNT: '/main/sales/offrStat',
  VRGDW_BOOKING: '/main/sales/bokngStat',
  VRGDW_DELIVERY: '/main/sales/trnStat',
  TRANSCUS_CNT: '/main/trncus/offrStat?trncusId=${trncusId}',
  TRAN_CNT: '/main/logits/offrStat',
  PUSH_LIST: '/v1/user/push?pageSize=15&pageNumber=0',
};
export { MAIN };
