import systemApi from '@/api/system/system';
import masterApi from '@/api/master/master';

export default {
  methods: {
    addRow(num, data = {}) {
      this.$refs.commonCodeGrid.addRow(num, data);
    },
    getNewAndChangeData() {
      if (this.page == 'productChartList') {
        const rows = this.$refs.ProductChartGrid.getNewAndChangeData();
        this.$refs.ProductChartGrid.gridCommit();
        this.saveProductChartList(rows);
      } else {
        const rows = this.$refs.commonCodeGrid.getNewAndChangeData();
        // this.$refs.CommonCodeGrid.gridCommit();

        if (rows.length > 0) {
          const validationKeys = this.$refs.commonCodeGrid.validation;

          let checkValidation = rows.every(r => {
            return validationKeys.every(k => r[k]);
          });

          let existCode = [];
          if (this.backUpCommonCodeList?.length > 0) {
            existCode = this.backUpCommonCodeList.filter(list => rows.some(row => list.groupCd === row.groupCd && list.code === row.code && row.rowType === 'created'));
          }

          if (checkValidation) {
            if (existCode.length === 0) {
              this.setCommonCodeList(rows);
            } else {
              this.$EventBus.$emit('openYesModal', 'message.msgValidSameCode');
            }
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgValidEssential');
          }
        } else {
          this.$EventBus.$emit('openYesModal', 'message.noDataValidation');
        }
      }
    },
    async setCommonCodeList(rows) {
      try {
        const param = rows;
        const resp = await systemApi.setCommonCodeList(param);
        if (this.type == 'Modal') {
          await this.getCommonCodeList(this.row.groupCd, this.row.groupNm, '', '', this.row.code, this.row.cdLvl + 1);
        } else {
          await this.getCommonCodeList(rows[0].groupCd);
        }
        this.$EventBus.$emit('openYesModal', resp.data.message);
      } catch (e) {
        console.log(e);

        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else if (e && e.errMsg) {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async saveProductChartList(rows) {
      try {
        const param = rows;
        const resp = await masterApi.saveProductChartList(param);
        if (this.type == 'Modal') {
          await this.getProductChartList(this.row.groupCd, this.row.groupNm, '', '', this.row.code, this.row.cdLvl + 1);
        } else {
          await this.getProductChartList();
        }
        this.$EventBus.$emit('openYesModal', resp.data.message);
      } catch (e) {
        console.log(e);

        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else if (e && e.errMsg) {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    getCheckedData() {
      const rows = this.$refs.commonCodeGrid.getCheckedData();
      if (this.page == 'productChartList') {
        this.saveProductChartRemove(rows);
      } else {
        this.removeCommonCodeList(rows);
      }
    },
    async removeCommonCodeList(rows) {
      try {
        const param = rows;
        const resp = await systemApi.removeCommonCodeList(param);
        this.$EventBus.$emit('openYesModal', resp.data.message);
      } catch (e) {
        console.log(e);

        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else if (e && e.errMsg) {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async saveProductChartRemove(rows) {
      try {
        const param = rows;
        const resp = await masterApi.saveProductChartRemove(param);
        this.$EventBus.$emit('openYesModal', resp.data.message);
      } catch (e) {
        console.log(e);

        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else if (e && e.errMsg) {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
  },
  mounted() {},
};
