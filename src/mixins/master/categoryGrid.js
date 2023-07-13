export default {
  watch: {},
  methods: {
    clearCurrent() {
      this.realGrid.gridView.clearCurrent();
    },
    clearCheckCount() {
      this.realGrid.gridView.checkAll(false);
    },
    isEmpty() {
      this.realGrid.gridView.setDisplayOptions({
        showEmptyMessage: true,
        emptyMessage: this.$t('message.gridMessageNoSearch'),
      });
    },
    isInsertGrid() {
      this.realGrid.gridView.setDisplayOptions({
        showEmptyMessage: true,
        emptyMessage: this.$t('message.gridMessageInsertData'),
      });
    },
  },
  mounted() {},
};
