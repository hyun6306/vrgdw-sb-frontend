<template>
  <div>
    <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>

<script>
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import { mapGetters } from 'vuex';

exportingInit(Highcharts);

export default {
  data() {
    return {
      chartOptions: {
        // type: 'area', // 영역 형태 차트
        // backgroundColor: '#000', // => 차트 배경 색상
        // animation: false, // => 차트 변화 업데이트 시 애니메이션 적용 여부
        // borderColor: '#EBBA95', borderWidth: 2, borderRadius: 20px // => 차트 테두리 선
        // className: 'class' // => 스타일을 위한 클래스 이름 지정 가능
        // displayErrors: false // => 차트에 직접적으로 에러 표시 여부 (기본 값 true)
        // evets: {}, // => 차트 이벤트 리스너
        // height: 300, // => 차트 높이 조절
        // inverted: true, // => x축, y축 반전 여부
        // margin: 100, // => 상우하좌 마진
        // zoomType: 'y',
        // panning: true,
        // panKey: 'shift', // => 차트 줌 인/아웃 기능
        // plotBackgroundColor: {
        //   linearGradient: [0, 0, 500, 500],
        //   stops: [
        //     [0, 'rgb(255, 255, 255)'],
        //     [1, 'rgb(200, 200, 255)'],
        //   ],
        // }, // 플롯 영역 배경 색  or 그라데이션
        // plotBackgroundImage => 이미지 링크 문자열
        // plotBorderColor: '#346691',
        // plotBorderWidth: 2, // => 플롯 영역 보더 색상
        // plotShadow: true, // => 플롯 영역 그림자
        // reflow: false, // => 창 크기 조절 시 차트 영역 반응형 여부
        // scrollablePlotArea: {
        //   minWidth: 700,
        //   scrollPositionX: 1,
        // }, // => 창 크기가 작아졌을 때 스크롤 기능
        // shadow: true, // => 차트 그림자
        type: 'line', // 라인 형태 차트
        title: {
          text: '부킹현황',
        },
        xAxis: {
          categories: ['Apples', 'Bananas', 'Oranges', 'Grapes', 'Apples', 'Bananas', 'Oranges', 'Grapes'],
        },
        yAxis: {
          title: {
            text: 'Fruit eaten',
          },
        },
        series: [
          {
            name: 'Jane',
            data: [1, 10, 4, 2, 1, 10, 4, 2],
          },
          {
            name: 'John',
            data: [5, 7, 3, 8, 5, 7, 3, 8],
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      userMenuGrpCd: 'userInfo/getUserMenuGrpCd',
    }),
  },
};
</script>
