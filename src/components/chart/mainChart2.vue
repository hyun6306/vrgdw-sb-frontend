<template>
  <div>
    <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>

<script>
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';

exportingInit(Highcharts);

const asyncData = {
  name: 'Tokyo',
  marker: {
    symbol: 'square',
  },
  data: [
    7.0,
    6.9,
    9.5,
    14.5,
    18.2,
    21.5,
    25.2,
    {
      y: 26.5,
      marker: {
        symbol: 'url(http://www.highcharts.com/demo/gfx/sun.png)',
      },
    },
    23.3,
    18.3,
    13.9,
    9.6,
  ],
};

export default {
  components: {
    //VueHighcharts
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'bar', // 라인 형태 차트l
        },
        title: {
          text: '배송현황',
        },
        subtitle: {
          text: 'Source: WorldClimate.com',
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yAxis: {
          title: {
            text: 'Temperature',
          },
          labels: {
            formatter: function () {
              return this.value + '°';
            },
          },
        },
        legend: {
          layout: 'vertical',
          floating: true,
          backgroundColor: '#FFFFFF',
          align: 'right',
          verticalAlign: 'top',
          y: 60,
          x: -60,
        },
        tooltip: {
          crosshairs: true,
          shared: true,
        },
        credits: {
          enabled: false,
        },

        series: [
          {
            name: 'Jane',
            data: [1, 10, 4, 2, 1, 10, 4, 2],
          },
          //   {
          //     name: 'John2',
          //     data: [5, 7, 3, 8, 5, 7, 3, 8],
          //   },
        ],
      },
    };
  },
  methods: {
    load() {
      let lineCharts = this.$refs.lineCharts;
      lineCharts.delegateMethod('showLoading', 'Loading...');
      setTimeout(() => {
        lineCharts.addSeries(asyncData);
        lineCharts.hideLoading();
      }, 2000);
    },
  },
};
</script>
