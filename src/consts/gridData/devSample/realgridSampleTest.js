import { ValueType } from 'realgrid';

export const fields = [
  {
    fieldName: 'group1',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'group2',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'Name',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'FullName',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'Age',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'Company',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'Email',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'DropDown',
    dataType: ValueType.LIST,
  },
  {
    fieldName: 'Date',
    dataType: ValueType.DATE,
    datetimeFormat: 'yyyy-MM-dd',
  },
];

export const columns = [
  {
    name: 'group1',
    fieldName: 'group1',
    type: 'data',
    width: '50',
    styles: {
      textAlignment: 'center',
    },
    header: {
      text: 'group1',
      showTooltip: false,
    },
  },
  {
    name: 'group2',
    fieldName: 'savePosCd',
    type: 'data',
    styles: {
      textAlignment: 'center',
    },
    header: {
      text: 'savePosCd',
      showTooltip: false,
    },
  },
  {
    name: 'Name',
    fieldName: 'Name',
    type: 'data',
    width: '80',
    styles: {
      textAlignment: 'center',
    },
    header: {
      text: 'Name',
      showTooltip: true,
      tooltip: '<span style="color: red;">이름</span>',
    },
    renderer: {
      type: 'text',
      showTooltip: true,
    },
  },
  {
    name: 'FullName',
    fieldName: 'FullName',
    type: 'data',
    width: '150',
    styles: {
      textAlignment: 'center',
    },
    header: {
      text: 'Full Name',
      showTooltip: false,
    },
  },
  {
    name: 'Age',
    fieldName: 'Age',
    type: 'data',
    width: '130',
    styles: {
      textAlignment: 'center',
    },
    header: {
      text: 'Age',
      showTooltip: false,
    },
    numberFormat: '0',
    autoFilter: true,
  },
  {
    name: 'Company',
    fieldName: 'Company',
    type: 'data',
    width: '220',
    styles: {
      textAlignment: 'center',
    },
    header: 'Company Name',
    autoFilter: true,
  },
  {
    name: 'Email',
    fieldName: 'Email',
    type: 'data',
    width: '300',
    styles: {
      textAlignment: 'center',
    },
    header: {
      text: 'Email',
      showTooltip: false,
    },
  },
  {
    name: 'DropDown',
    fieldName: 'DropDown',
    width: '150',

    editButtonVisibility: 'always',

    header: {
      text: 'DropDown',
    },
    styles: {
      textAlignment: 'center',
    },
    lookupDisplay: true,
    autoFilter: true,
    editor: {
      type: 'dropdown',
      values: ['test1', 'test2', 'test3'],
      labels: ['label1', 'label2', 'label3'],
      displayLabels: 'value',
      textReadOnly: true,
      dropDownCount: 2,
    },
  },
  {
    name: 'Date',
    fieldName: 'Date',

    editButtonVisibility: 'always',

    width: '150',
    header: {
      text: 'Date',
    },
    styles: {
      textAlignment: 'center',
    },
    editor: {
      type: 'date',
      datetimeFormat: 'yyyy/MM/dd',
    },
  },
];

export const rows = [
  {
    Name: 'Kessie',
    FullName: 'Vijendra N. Raj',
    Age: '17',
    Company: 'Arcu Et Pede Incorporated',
    Email: 'mus.Donec.dignissim@Praesent.edu',
    Date: 20190101,
    DropDown: 'test1',
    group1: 'test1',
    group2: 'test2',
  },
  {
    Name: 'Evelyn',
    FullName: 'Hridaynath K. Ismail',
    Email: 'fringilla.euismod@elementum.edu',
    Company: 'Aliquam Tincidunt Ltd',
    Age: '28',
    Date: 20190101,
    group1: 'test1',
    group2: 'test2',
    DropDown: 'test2',
  },
  {
    Name: 'Colleen',
    FullName: 'Kanwalkishore C. Khan',
    Email: 'tellus.non.magna@porttitorvulputate.org',
    Company: 'Ultrices Duis Volutpat Institute',
    Age: '38',
    Date: 20190101,
    group1: 'test1',
    group2: 'test2',
  },
  {
    Name: 'Velma',
    FullName: 'Dharani P. Patel',
    Email: 'ipsum@orcilobortisaugue.net',
    Company: 'Posuere Associates',
    Age: '25',
  },
  {
    Name: 'Fallon',
    FullName: 'Preeti M. Singh',
    Email: 'rutrum@orci.com',
    Company: 'Turpis Nec Inc.',
    Age: '46',
  },
  {
    Name: 'Alexis',
    FullName: 'Karnik Y. Patel',
    Email: 'auctor.nunc.nulla@egestas.net',
    Company: 'Massa Quisque Porttitor Industries',
    Age: '34',
  },
  {
    Name: 'Camille',
    FullName: 'Satyamurty A. Singh',
    Email: 'Nunc@blanditenimconsequat.co.uk',
    Company: 'Lorem Lorem Luctus PC',
    Age: '22',
  },
  {
    Name: 'Aristotle',
    FullName: 'Ora C. Rowe',
    Email: 'sed.orci@libero.edu',
    Company: 'Integer Aliquam Corporation',
    Age: 53,
  },
  {
    Name: 'Anthony',
    FullName: 'Alea Bailey',
    Email: 'orci.luctus.et@Cum.ca',
    Company: 'Eros Nam Corp.',
    Age: 58,
  },
  {
    Name: 'Hakeem',
    FullName: 'Kadeem J. Patel',
    Email: 'aliquet.diam.Sed@penatibuset.com',
    Company: 'Ligula Aenean Gravida Consulting',
    Age: 36,
  },
  {
    Name: 'Raja',
    FullName: 'Chloe Valentine',
    Email: 'Cras.dictum@vulputatenisi.ca',
    Company: 'Erat Eget Tincidunt Institute',
    Age: 40,
  },
  {
    Name: 'Shad',
    FullName: 'Zoe P. Boyd',
    Email: 'Sed@semperpretium.edu',
    Company: 'Amet LLP',
    Age: 22,
  },
];

// let layout1;

export const layouts = [
  {
    name: 'ColumnGrouping',
    direction: 'horizontal',
    items: ['group1', 'group2'],
    header: {
      text: 'ColumnGrouping',
    },
  },
  'Name',
  'FullName',
  'Age',
  'DropDown',
  'Company',
];

// GridView.setColumnLayout(layout1);
