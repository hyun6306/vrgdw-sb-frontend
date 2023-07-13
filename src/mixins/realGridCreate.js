import { GridView, LocalDataProvider } from 'realgrid';
import defs from '@/consts/defs';

class RealGridCreate {
  constructor(gridData) {
    this.dataProvider = new LocalDataProvider(false);
    this.gridView = new GridView(gridData.gridName);

    if (this.gridView) {
      this.gridView.setEditOptions({
        insertable: true,
        appendable: true,
        // commitWhenExitLast: true,
        editable: false,
        commitByCell: true,
        enterToTab: true,
        columnEditableFirst: true,
      });
      this.gridView.setDataSource(this.dataProvider);
      this.gridView.setColumns(gridData.columns);
      this.dataProvider.setFields(gridData.fields);

      this.vm = gridData.vm;

      // 필터 다국어
      this.gridView.filteringOptions.selector.searchPlaceholder = this.vm.$t('message.gridFilterSearchPlaceHolder'); // 전체 초기화
      this.gridView.filteringOptions.selector.allCheckText = this.vm.$t('message.gridFilterAllCheck'); // 검색..
      this.gridView.filteringOptions.selector.filterResetText = this.vm.$t('message.gridFilterReset'); // 초기화
      this.gridView.filteringOptions.selector.filtersResetText = this.vm.$t('message.gridFilterAllReset'); // 전체 초기화
      this.gridView.filteringOptions.selector.activeWhenEnter = true; // 필터 내 엔터 기능

      if (gridData.existFavorite) {
        // 별 아이콘
        this.setFavoriteBtn();
      }

      if (gridData.existCalendar) {
        // 캘린더 아이콘
        this.setCalendarBtn();
      }

      if (gridData.layout) {
        // 레이아웃 적용
        this.gridView.setColumnLayout(gridData.layout);
      }

      if (gridData.existAddr) {
        // 셀 내 메모 아이콘
        this.setImgBtn();
      }

      if (gridData.existFile) {
        // 셀 내 파일 아이콘
        this.setFileBtn();
      }

      if (gridData.existSearch) {
        // 셀 내 돋보기 아이콘
        this.setSearchBtn();
      }

      let options = {
        display: {
          rowHeight: 32,
          columnResizable: true,
        },
        header: {
          height: 50,
        },
        stateBar: { visible: false },
        footers: { visible: false },
        rowIndicator: {
          visible: gridData.rowIndicator === 'NO' ? false : true, // 행번호 visible 여부
          width: 30,
        },
        checkBar: {
          visible: gridData.checkBarVisible === 'NO' ? false : true, // 체크박스 visible 여부
          showAll: gridData.checkBarVisible === 'NO' ? false : true, // 전체 체크박스 visible 여부
          exclusive: gridData.radioButton === 'YES' ? true : false, // 라디오버튼으러 전환 여부
          width: 30,
        },
      };

      this.gridView.setOptions(options);
      if (gridData.setFilter) {
        // 필터 적용할 컬럼들만 적용
        gridData.setFilter.forEach(filterNm => {
          this.gridView.setColumnProperty(filterNm, 'autoFilter', true);
        });
      }

      this.gridView.displayOptions.fitStyle = 'even';
      this.fnEditRowChanged(); // 셀 수정 완료 시 호출
      this.fnItemChecked(); // 행 체크박스 체크 후 호출
      this.fnItemsChecked(); // 병합된 행 체크박스 체크 후 호출
      this.gridView.checkBar.syncHeadCheck = true;
      // 전체 체크박스 체크후 호출
      if (gridData.checkBarVisible !== 'NO') this.fnItemAllChecked();

      const columnNames = this.gridView.getColumnNames(true, false);

      this.gridView.setRowStyleCallback(function (grid, item, fixed) {
        // 특정 column의 특정 값에 따라 row backgroud 색 처리
        fixed;
        let orderYn = '';
        let price = undefined;
        let offrStat = '';
        let offrStatCd = '';
        let bokngStatCd = '';
        let soFail = '';
        let trnPsbBaseQty = '';
        let trnPsbOrdQty = '';
        let uptYn = '';
        let outStatCd = '';

        columnNames.forEach(name => {
          // if (name === 'prdtClsCd') {
          //   prdtClsCd = grid.getValue(item.index, 'prdtClsCd');
          // } else
          if (name === 'priceStat') {
            price = grid.getValue(item.index, 'priceStat');
          } else if (name === 'reqQtyPrice') {
            price = grid.getValue(item.index, 'reqQtyPrice');
          } else if (name === 'offrDtlsStatCd') {
            offrStat = grid.getValue(item.index, 'offrDtlsStatCd');
          } else if (name == 'offrStatCd') {
            offrStatCd = grid.getValue(item.index, 'offrStatCd');
          } else if (name === 'orderYn') {
            orderYn = grid.getValue(item.index, 'orderYn');
          } else if (name === 'bokngStatCd') {
            bokngStatCd = grid.getValue(item.index, 'bokngStatCd');
          } else if (name === 'soFail') {
            soFail = grid.getValue(item.index, 'soFail');
          } else if (name === 'trnPsbBaseQty' || name === 'trnPsbOrdQty') {
            trnPsbBaseQty = grid.getValue(item.index, 'trnPsbBaseQty');
            trnPsbOrdQty = grid.getValue(item.index, 'trnPsbOrdQty');
          } else if (name === 'uptYn') {
            uptYn = grid.getValue(item.index, 'uptYn');
          } else if (name === 'outStatCd') {
            outStatCd = grid.getValue(item.index, 'outStatCd');
          }
        });

        if (offrStat == defs.offrStatCd.end) {
          return 'rg-prdt-disble';
        }

        if (offrStatCd == defs.offrStatCd.request || bokngStatCd == defs.bokngStatCd.confirmNeed) {
          return 'rg-request-row';
        }

        if (offrStatCd == defs.offrStatCd.end) {
          return 'rg-prdt-disble';
        }

        if (price && price.disbleYn === 'Y') {
          return 'rg-prdt-disble';
        }

        if (orderYn === 'N') {
          return 'rg-prdt-disble';
        }

        if (soFail === 'fail') {
          return 'rg-fail-row';
        }

        if (trnPsbBaseQty < 0 || trnPsbOrdQty < 0) {
          return 'rg-qty-zero-row';
        }

        if (uptYn === 'Y') {
          return 'rg-fail-row';
        }

        if (outStatCd == defs.outStatCd.disEnd && gridData.gridName == 'DispatchConfirmGrid') {
          return 'rg-outstate-row';
        }
      });
      columnNames.forEach(name => {
        if (name === 'orderYn') {
          this.gridView.setCheckableExpression("values['orderYn'] = 'Y'", true);
        }
      });
    }
  }

  setFavoriteBtn() {
    const vm = this.vm;
    this.gridView.registerCustomRenderer('favoriteImgbtn', {
      initContent: function (parent) {
        let span = (this._span = document.createElement('span'));
        span.className = 'custom_render_span';
        parent.appendChild(span);
        parent.appendChild((this._button1 = document.createElement('span')));
        parent.appendChild((this._button2 = document.createElement('span')));
      },

      canClick: function () {
        return true;
      },

      clearContent: function (parent) {
        parent.innerHTML = '';
      },

      render: function (grid, model) {
        let span = this._span;
        // text설정.
        span.textContent = model.value;

        this._value = model.value;
        this._button1.className = '';
        switch (model.value) {
          case 'Y':
            this._button1.className = 'custom_search';
            break;
          case 'N':
            this._button1.className = 'custom_search2';
            break;
        }
      },

      click: function (event) {
        let index = this.index.toProxy();
        event.preventDefault;

        if (event.target === this._button1) {
          if (this._button1.className === 'custom_search') {
            this._button1.className = 'custom_search2';
            vm.changeFavoriteUseYn(index.dataRow);
          } else {
            this._button1.className = 'custom_search';
            vm.changeFavoriteUseYn(index.dataRow);
          }
        }
      },
    });
  }

  setCalendarBtn() {
    const vm = this.vm;
    this.gridView.registerCustomRenderer('calendarImgbtn', {
      initContent: function (parent) {
        let input = (this._input = document.createElement('input'));
        input.type = 'text';
        input.className = 'calendar_render_span';
        parent.appendChild(input);
        parent.appendChild((this._button1 = document.createElement('span')));
      },

      canClick: function () {
        return true;
      },

      clearContent: function (parent) {
        parent.innerHTML = '';
      },

      render: function (grid, model) {
        let input = this._input;
        let index = this.index.toProxy();
        // text설정.

        if (model.value) {
          input.value = model.value;
        } else {
          input.value = '';
        }

        if (vm.page === 'ForwardingReqManage') {
          let trnPlnNum = grid.getValue(index.dataRow, 'trnPlnNum');
          if (trnPlnNum === '') {
            input.className = 'calendar_render_span';
            this._button1.className = 'rg_caleandar_btn';
          } else {
            input.className = 'calendar_render_span_disable';
            this._button1.className = '';
          }
        } else {
          this._button1.className = 'rg_caleandar_btn';
        }
      },

      click: function (event) {
        let index = this.index.toProxy(); //
        event.preventDefault;

        if (event.target === this._button1 || event.target === this._input) {
          if (vm.page === 'ForwardingReqManage') {
            let trnPlnNum = vm.realGrid.dataProvider.getValue(index.dataRow, 'trnPlnNum');

            if (trnPlnNum === '') vm.openCalendar(index.dataRow, index);
          } else {
            vm.openCalendar(index.dataRow, index);
          }
        }
      },
    });
  }

  fnEditRowChanged() {
    this.gridView.onEditRowChanged = (grid, itemIndex, dataRow, field, oldValue, newValue) => {
      this.vm.onEditRowChanged(grid, itemIndex, dataRow, field, oldValue, newValue);
    };
  }

  fnItemChecked() {
    const vm = this.vm;
    this.gridView.onItemChecked = function (grid, itemIndex, checked) {
      vm.onItemChecked(grid, itemIndex, checked);
    };
  }

  fnItemsChecked() {
    const vm = this.vm;
    this.gridView.onItemsChecked = function (grid, items, checked) {
      vm.onItemsChecked(grid, items, checked);
    };
  }

  fnItemAllChecked() {
    const vm = this.vm;
    this.gridView.onItemAllChecked = function (grid, checked) {
      if (vm.onItemAllChecked !== undefined) vm.onItemAllChecked(grid, checked);
    };
  }

  setImgBtn() {
    const vm = this.vm;
    this.gridView.registerCustomRenderer('imgbtn', {
      initContent: function (parent) {
        let index = this.index.toProxy();
        let span = (this._span = document.createElement('span'));
        if (index.column.fieldName === 'dfcEndTypeCd') {
          span.className = 'calendar_render_span';
        } else if (index.column.fieldName === 'addrInfo') {
          span.className = 'custom_render_span';
        } else if (index.column.fieldName === 'custReqRemarkYn') {
          span.className = 'custom_render_span';
        } else if (index.column.fieldName === 'salesResultCommt') {
          span.className = 'custom_render_span';
        } else if (index.column.fieldName === 'salesMngRemarkYn') {
          span.className = 'custom_render_span';
        } else if (index.column.fieldName === 'custReqRemark') {
          span.className = 'custom_render_span';
        } else if (index.column.fieldName === 'reqData') {
          span.className = 'custom_render_span';
        } else if (index.column.fieldName === 'resData') {
          span.className = 'custom_render_span';
        } else if (index.column.fieldName === 'parameter') {
          span.className = 'custom_render_span';
        } else if (index.column.fieldName === 'etcTrnPriceAmt') {
          span.className = 'calendar_render_span';
        } else if (index.column.fieldName === 'trnReqRemark') {
          span.className = 'custom_render_span';
        } else if (index.column.fieldName === 'info') {
          span.className = 'custom_render_span';
        }
        parent.appendChild(span);
        parent.appendChild((this._button1 = document.createElement('span')));
      },

      canClick: function () {
        return true;
      },

      clearContent: function (parent) {
        parent.innerHTML = '';
      },

      render: function (grid, model) {
        let index = this.index.toProxy();
        let span = this._span;
        // text설정.
        span.textContent = model.value;

        this._value = model.value;

        this._button1.className = '';
        if (index.column.fieldName === 'dfcEndTypeCd') {
          if (this._value) {
            this._button1.className = 'end_read';
          } else {
            this._button1.className = '';
          }
        } else if (index.column.fieldName === 'addrInfo') {
          this._button1.className = 'addrInfo_read';
        } else if (index.column.fieldName === 'custReqRemarkYn') {
          if (this._value == 'N') {
            this._button1.className = '';
          } else {
            this._button1.className = 'addrInfo_read';
          }
        } else if (index.column.fieldName === 'salesResultCommt') {
          if (this._value == 'N') {
            this._button1.className = '';
          } else {
            this._button1.className = 'addrInfo_read';
          }
        } else if (index.column.fieldName === 'custReqRemark' || index.column.fieldName === 'trnReqRemark' || index.column.fieldName === 'reqData' || index.column.fieldName === 'resData' || index.column.fieldName === 'parameter') {
          if (this._value) {
            this._button1.className = 'addrInfo_read';
          } else {
            this._button1.className = '';
          }
        } else if (index.column.fieldName === 'salesMngRemarkYn') {
          if (this._value === 'N') {
            vm.userMenuGrpCd !== 'CUSTOMER' ? (this._button1.className = 'pen_read') : (this._button1.className = '');
          } else if (this._value === 'Y') {
            this._button1.className = 'addrInfo_read';
          }
        } else if (index.column.fieldName === 'info') {
          this._button1.className = 'addrInfo_read';
        }
      },

      click: function (event) {
        let index = this.index.toProxy();
        event.preventDefault;

        if (index.column.fieldName === 'reqData' || index.column.fieldName === 'resData' || index.column.fieldName === 'parameter') {
          vm.openJsonData(index);
        }
        if (event.target === this._button1) {
          if (index.column.fieldName === 'dfcEndTypeCd') {
            vm.openAddrInfo(index);
          } else if (index.column.fieldName === 'addrInfo') {
            vm.openAddrInfo(index);
          } else if (index.column.fieldName === 'custReqRemarkYn') {
            vm.openAddrInfo(index);
          } else if (index.column.fieldName === 'salesMngRemarkYn') {
            vm.openSalesMemo(index);
          }
        }
      },
    });
  }

  setFileBtn() {
    const vm = this.vm;
    this.gridView.registerCustomRenderer('fileImgbtn', {
      initContent: function (parent) {
        parent.appendChild((this._button1 = document.createElement('span')));
      },

      canClick: function () {
        return true;
      },

      clearContent: function (parent) {
        parent.innerHTML = '';
      },

      render: function (grid, model) {
        model;
        if (model.value === 'Y') {
          this._button1.className = 'rg_file_btn';
        }
      },

      click: function (event) {
        let index = this.index.toProxy();
        event.preventDefault;

        if (event.target === this._button1 || event.target === this._span) {
          vm.fileDownload(index.dataRow);
        }
      },
    });
  }

  setSearchBtn() {
    const vm = this.vm;
    this.gridView.registerCustomRenderer('searchImgbtn', {
      initContent: function (parent) {
        let span = (this._span = document.createElement('input'));
        span.className = 'search_render_span';
        parent.appendChild(span);
        parent.appendChild((this._button1 = document.createElement('span')));
      },

      canClick: function () {
        return true;
      },

      clearContent: function (parent) {
        parent.innerHTML = '';
      },

      render: function (grid, model) {
        let span = this._span;
        // text설정.
        if (model.value) {
          span.value = model.value;
        }

        this._value = model.value;
        this._button1.className = 'rg_search_btn';
      },

      click: function (event) {
        let index = this.index.toProxy();
        event.preventDefault;

        if (event.target === this._button1 || event.target === this._span) {
          vm.openSearch(index.dataRow);
        }
      },
    });
  }
}

export default RealGridCreate;
