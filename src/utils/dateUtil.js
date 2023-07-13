import dayjs from 'dayjs';

export default {
  install(Vue) {
    Vue.prototype.$vnDateFormatM = date => {
      return dayjs(date).format('MM-YYYY');
    };
    Vue.prototype.$vnDateFormatD = date => {
      return dayjs(date).format('DD-MM-YYYY');
    };
    Vue.prototype.$vnDateFormatDt = date => {
      return dayjs(date).format('DD-MM-YYYY HH:mm:ss');
    };
    Vue.prototype.$revertDateFormatM = date => {
      const dateArr = date.split('-');
      date = dateArr[1] + '-' + dateArr[0] + '-' + dateArr[0];
      return dayjs(date).format('YYYY-MM');
    };
    Vue.prototype.$revertDateFormatD = date => {
      const dateArr = date.split('-');
      date = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
      return dayjs(date).format('YYYY-MM-DD');
    };

    Vue.prototype.$priceFormat = price => {
      return price ? price.toLocaleString('en') : 0;
    };

    Vue.filter('vnDateFormatM', date => {
      return dayjs(date).format('MM-YYYY');
    });

    Vue.filter('vnDateFormatD', date => {
      if (date === null || date === '' || date === undefined) return '';
      return dayjs(date).format('DD-MM-YYYY');
    });

    Vue.filter('revertDateFormatM', date => {
      if (date === null || date === '' || date === undefined) return '';
      const dateArr = date.split('-');
      date = dateArr[1] + '-' + dateArr[0] + '-' + dateArr[0];
      return dayjs(date).format('YYYY-MM');
    });

    Vue.filter('revertDateFormatD', date => {
      if (date === null || date === '' || date === undefined) return '';
      return dayjs(date).format('YYYY-MM-DD');
    });

    Vue.filter('priceFormat', price => {
      return price ? price.toLocaleString('en') : 0;
    });

    Vue.filter('itemNumFormat', itemNum => {
      return itemNum ? itemNum * 1 : '';
    });
  },
};
