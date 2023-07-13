/**
 * 구성 페이지 별로 url 관리를 위해 작업됨.
 * @/consts/urls/~ 하위에 작업하여 fnSetUrlsObj 함수로 최종 등록.
 * 같은 키 값으로 등록되지 않게 주의
 * COMMON.SET_EX1 형식이 @/const/urls/common 에 있을 경우
 * 다른 파일에서 COMMON 을 키 값으로 잡으면 안됨.
 * 덮어 씌워짐.
 * 로그 확인하면서 작업 필수
 */
// import _ from 'lodash';
import * as admin from '@/consts/urls/admin';
import * as common from '@/consts/urls/common';
import * as orderCustomer from '@/consts/urls/order';
import * as login from '@/consts/urls/login';
import * as join from '@/consts/urls/join';
import * as sales from '@/consts/urls/sales';
import * as tran from '@/consts/urls/tran';
import * as util from '@/consts/urls/utility';
import * as master from '@/consts/urls/master';
import * as mypage from '@/consts/urls/mypage';
import * as main from '@/consts/urls/main';

const fnSetUrlsObj = urlData => {
  Object.keys(urlData).forEach(element => {
    urls[element] = urlData[element];
  });
};

const urls = {};
fnSetUrlsObj(admin);
fnSetUrlsObj(common);
fnSetUrlsObj(orderCustomer);
fnSetUrlsObj(login);
fnSetUrlsObj(join);
fnSetUrlsObj(sales);
fnSetUrlsObj(tran);
fnSetUrlsObj(util);
fnSetUrlsObj(master);
fnSetUrlsObj(mypage);
fnSetUrlsObj(main);

export { urls };
