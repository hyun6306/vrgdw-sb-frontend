import commonApi from '@/api/common';

export default {
  data() {
    return {
      setCommonCodeIng: {},
      commonCodes: null,
      count: {
        total: 0,
        cdLvl1: 0,
        cdLvl2: 0,
      },
      intervalId: '',
    };
  },
  methods: {
    async getCommonCodeCombo(groupCd = '', prntCd = '') {
      try {
        const param = {
          groupCd: groupCd,
          useYn: 'Y',
          prntCd: prntCd,
        };
        const response = await commonApi.getCommonCodeCombo(param);
        if (groupCd === 'VNM_CITY') {
          if (prntCd !== '') {
            let distrOptions = response.data.ds;
            distrOptions.forEach(list => {
              list.prntCd = prntCd;
            });
            if (this.setCommonCodeIng.distrOptions) distrOptions = [...this.setCommonCodeIng.distrOptions, ...distrOptions];
            this.setCommonCodeIng = { ...this.setCommonCodeIng, ...{ distrOptions: distrOptions } };
            this.count.cdLvl2++;

            // this.count.cdLvl2++;
            // if (this.count.cdLvl1 === this.count.cdLvl2) {
            //   // this.realGrid.gridView.addLookupSource(distrCdCodes);
            // }
          } else {
            let cityOptions = response.data.ds;
            this.setCommonCodeIng = { ...this.setCommonCodeIng, ...{ cityOptions: cityOptions } };
            this.count.total++;
            cityOptions.forEach(async list => {
              this.count.cdLvl1++;
              await this.getCommonCodeCombo(groupCd, list.value);
            });
          }
        } else if (groupCd === 'TIME_CD') {
          let timeOptions = response.data.ds;
          this.setCommonCodeIng = { ...this.setCommonCodeIng, ...{ timeOptions: timeOptions } };
          this.count.total++;
        } else if (groupCd === 'OUT_STATUS') {
          let outStatOptions = response.data.ds;
          this.setCommonCodeIng = { ...this.setCommonCodeIng, ...{ outStatOptions: outStatOptions } };
          this.count.total++;
        } else if (groupCd === 'CAR_TYPE_SAMPLE') {
          let carTypeOptions = response.data.ds;
          this.setCommonCodeIng = { ...this.setCommonCodeIng, ...{ carTypeOptions: carTypeOptions } };
          this.count.total++;
        } else if (groupCd === 'TRN_CLS') {
          let trnClsOptions = response.data.ds;
          this.setCommonCodeIng = { ...this.setCommonCodeIng, ...{ trnClsOptions: trnClsOptions } };
          this.count.total++;
        } else if (groupCd === 'OFFR_CLS') {
          let offrClsOptions = response.data.ds;
          this.setCommonCodeIng = { ...this.setCommonCodeIng, ...{ offrClsOptions: offrClsOptions } };
          this.count.total++;
        }
      } catch (e) {
        console.log(e);
        this.count.total++;
      }
    },
    async getPlantCombo() {
      try {
        const param = {};
        const response = await commonApi.getPlantCombo(param);
        let plntOptions = response.data.ds;
        // plntOptions.unshift({ text: this.$t('message.all'), value: '00' });
        this.setCommonCodeIng = { ...this.setCommonCodeIng, ...{ plntOptions: plntOptions } };
        this.count.total++;
      } catch (e) {
        console.log(e);
        this.count.total++;
      }
    },
    getCommonCode() {
      this.getCommonCodeCombo('VNM_CITY');
      this.getCommonCodeCombo('TIME_CD');
      this.getCommonCodeCombo('OUT_STATUS');
      this.getCommonCodeCombo('CAR_TYPE_SAMPLE');
      this.getCommonCodeCombo('TRN_CLS');
      this.getCommonCodeCombo('OFFR_CLS');
      this.getPlantCombo();
    },
    setCommonCode() {
      if (this.count.total === 7 && this.count.cdLvl1 === this.count.cdLvl2) {
        clearInterval(this.intervalId);
        this.commonCodes = JSON.parse(JSON.stringify(this.setCommonCodeIng));
      }
    },
    init() {
      this.getCommonCode();
      this.intervalId = setInterval(this.setCommonCode, 100);
    },
  },
  mounted() {
    this.init();
  },
  created() {},
};
