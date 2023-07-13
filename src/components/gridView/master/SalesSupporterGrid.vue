<template>
  <div :id="gridName" style="width: 100%"></div>
</template>

<script>
import commonGridJs from '@/mixins/commonGrid';
import searchtJs from '@/mixins/master/searchGrid';

export default {
  props: ['gridName'],
  data() {
    return {
      realGrid: null,
      gridView: null,
      dataProvider: null,
      gridData: null,
    };
  },
  mixins: [commonGridJs, searchtJs],
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style></style>
