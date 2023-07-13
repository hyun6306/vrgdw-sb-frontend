<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import RealGridCreate from '@/mixins/realGridCreate';
import { fields, columns, layout, rows } from '@wb/consts/gridData/customerOrder';
import { fields as sFields, columns as sColumns, layout as sLayout, rows as sRows } from '@/consts/gridData/sample/sampleOrder';
import { fields as bFields, columns as bColumns, layout as bLayout, rows as bRows } from '@/consts/gridData/booking/bookingListOrder';

export default {
  props: ['gridName', 'selectMonth'],
  data() {
    return {
      // gridName: 'customerOrder',
      realGrid: null,
      selectRow: -1,
      lang: {
        prdtCd: {
          ko: '제품코드',
          en: 'Material Code',
        },
        prdtNm: {
          ko: '제품명',
          en: 'Material Name',
        },
        patFront: {
          ko: '전면(내)',
          en: 'Front(in)',
        },
        patBack: {
          ko: '후면(내)',
          en: 'Back(in)',
        },
        prsFront: {
          ko: '전면',
          en: 'Front',
        },
        prsBack: {
          ko: '후면',
          en: 'Back',
        },
        reqQty: {
          ko: '수량',
          en: 'PC',
        },
        reqQtyNm: {
          ko: '단위',
          en: 'PC',
        },
        reqBndl: {
          ko: '수량',
          en: 'Pack',
        },
        reqBndlNm: {
          ko: '단위',
          en: 'BLC',
        },
        reqQtyPrice: {
          ko: '판매단가',
          en: 'Standard Price',
        },
        currencyUnit: {
          ko: '통화단위',
          en: 'Currency unit',
        },
        tranPropMonth: {
          ko: '납품예상월',
          en: 'Estimated Delivery Month',
        },
        tranHopeMonth: {
          ko: '납품희망월',
          en: 'Requried Delivery Month',
        },
        reqOffrPrice: {
          ko: '판매금액',
          en: 'Total',
        },
        pattern: {
          ko: '패턴',
          en: 'Pattern',
        },
        prs: {
          ko: '경면판',
          en: 'Press',
        },
        qtyHeader: {
          ko: '요청수량 주문단위',
          en: 'Order Qty',
        },
        bndlHeader: {
          ko: '요청수량 기본단위',
          en: 'Base Qty',
        },
      },
    };
  },
  watch: {
    selectMonth() {
      this.realGrid.dataProvider.setValue(this.selectRow, 'tranHopeMonth', this.selectMonth);
    },
  },
  methods: {
    openCalendar(dataRow) {
      console.log('openCalendar');
      this.selectRow = dataRow;
      const currentMonth = this.realGrid.dataProvider.getValue(dataRow, 'tranHopeMonth');
      this.$emit('openSingleCalendar', currentMonth);
    },
    test() {
      console.log('click');
    },
  },
  mounted() {
    const vm = this;
    console.log('gridName: ', this.gridName);
    console.log('gridName: ', sFields);
    if (this.gridName === 'BookingOrder') {
      const setGridData = {
        gridName: this.gridName,
        columns: bColumns,
        fields: bFields,
        vm,
        existFavorite: true,
        layout: bLayout,
        existCalendar: true,
        setFilter: ['custNm'],
      };
      this.realGrid = new RealGridCreate(setGridData);
      const rowsList = [...bRows, ...bRows, ...bRows, ...bRows, ...bRows, ...bRows];
      this.realGrid.dataProvider.setRows(rowsList);
    } else if (this.gridName === 'SampleOrder') {
      const setGridData = {
        gridName: this.gridName,
        columns: sColumns,
        fields: sFields,
        vm,
        existFavorite: true,
        layout: sLayout,
        existCalendar: true,
      };
      this.realGrid = new RealGridCreate(setGridData);
      const rowsList = [...sRows, ...sRows, ...sRows, ...sRows, ...sRows, ...sRows];
      this.realGrid.dataProvider.setRows(rowsList);
    } else {
      columns.forEach(col => {
        if (col.header) {
          const test = this.lang[col.fieldName];
          if (test) {
            col.header.text = test[this.$i18n.locale];
          }
        }
      });
      layout.forEach(field => {
        if (field.name) {
          const test = this.lang[field.name];
          if (test) {
            field.header.text = test[this.$i18n.locale];
          }
        }
      });
      const setGridData = {
        gridName: this.gridName,
        columns,
        fields,
        vm,
        existFavorite: true,
        layout: layout,
        existCalendar: true,
      };
      this.realGrid = new RealGridCreate(setGridData);
      const rowsList = [...rows, ...rows, ...rows, ...rows, ...rows, ...rows];
      this.realGrid.dataProvider.setRows(rowsList);
    }
  },

  created() {},
};
</script>

<style></style>
