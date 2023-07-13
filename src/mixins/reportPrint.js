import { baseObj } from '@/common/properties';

export default {
  methods: {
    reportPrint(data, type, width = 1000, height = 1000) {
      let url = '';

      if (window.location.host.includes('localhost') || window.location.host.includes('dev') || window.location.host.includes('192')) {
        url = baseObj.reportUrlDev;
      } else {
        url = baseObj.reportUrl;
      }

      let left = screen.width ? (screen.width - width) / 2 : 0;
      let top = screen.height ? (screen.height - height) / 2 : 0;

      let attr = 'top=' + top + ', left=' + left + ', width=' + width + ', height=' + height + ', resizable=no,status=no';

      let form = document.createElement('form');
      form.setAttribute('Content-Type', 'application/json');
      form.setAttribute('method', 'post');
      if (type === 'debit') {
        // 데빗노트
        form.setAttribute('action', `${url}/report/debitNote/print`);
      } else if (type === 'quote') {
        // 견적서
        form.setAttribute('action', `${url}/report/offer/print`);
      } else if (type === 'contract') {
        // 계약서
        form.setAttribute('action', `${url}/report/contract/print`);
      } else if (type === 'custom') {
        // 배송요청 데빗노트
        form.setAttribute('action', `${url}/report/debitNote/print`);
      } else if (type === 'deliveryNote') {
        // 전자송장
        form.setAttribute('action', `${url}/report/takeOver/print`);
      }
      if (navigator.userAgent.indexOf('DWWV iOS') != -1) {
        //
      } else {
        form.setAttribute('target', 'ReportPopup');
      }

      let hiddenField = document.createElement('input');
      hiddenField.setAttribute('type', 'hidden');
      hiddenField.setAttribute('name', 'data');
      hiddenField.setAttribute('value', JSON.stringify(data));
      form.appendChild(hiddenField);
      document.body.appendChild(form);

      if (navigator.userAgent.indexOf('DWWV iOS') != -1) {
        form.submit();
      } else {
        this.pop = window.open('', 'ReportPopup', attr);
        form.submit();
      }
    },
  },
};
