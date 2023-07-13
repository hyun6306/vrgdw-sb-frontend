import { GridView, LocalDataProvider } from 'realgrid';

class RealGridCreate {
  constructor(grideViewName, columns, fields, vm, layout1) {
    this.dataProvider = new LocalDataProvider(false);
    this.gridView = new GridView(grideViewName);

    if (this.gridView) {
      this.gridView.setEditOptions({
        insertable: true,
        appendable: true,
      });
      this.gridView.setDataSource(this.dataProvider);
      // this.gridView.footers.visible = false;

      if (layout1 != null) {
        this.gridView.setColumnLayout(layout1);
      }

      this.gridView.setColumns(columns);
      this.dataProvider.setFields(fields);
      this.vm = vm;
      this.setFavoriteBtn();
      let options = {
        display: {
          rowHeight: 32,
          columnResizable: true,
          // fitStyle: 'fill',
        },
        header: {
          height: 50,
        },
        stateBar: { visible: false },
        footers: { visible: false },
      };
      this.gridView.setOptions(options);
      // this.gridView.displayOptions.syncGridHeight = 'always';
    }
  }

  setFavoriteBtn() {
    const vm = this.vm;
    this.gridView.registerCustomRenderer('favoriteImgbtn', {
      initContent: function (parent) {
        var span = (this._span = document.createElement('span'));
        span.className = 'custom_render_span';
        parent.appendChild(span);
        parent.appendChild((this._button1 = document.createElement('span')));
        parent.appendChild((this._button2 = document.createElement('span')));
      },

      canClick: function () {
        return true;
      },

      clearContent: function (parent) {
        console.log('DISPOSED......');
        parent.innerHTML = '';
      },

      render: function (grid, model) {
        // info = info || {};
        var span = this._span;
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
        // var grid = this.grid.handler; //
        // var index = this.index.toProxy(); //
        event.preventDefault;

        if (event.target === this._button1) {
          // alert('조회버튼: ' + this._value);
          if (this._button1.className === 'custom_search') {
            this._button1.className = 'custom_search2';
            vm.test();
          } else {
            this._button1.className = 'custom_search';
          }
        }
      },
    });
  }
}
export default RealGridCreate;
