//상품검색 모달
function searchProduct() {
  let fliterContent = document.querySelector('.filter_content'); //eslint-disable-line no-unused-vars
  let filterBox = document.querySelectorAll('.filter_box'); //eslint-disable-line no-unused-vars
  let filterChoices = document.querySelectorAll('.choice_filters');
  let filterChoice = document.querySelectorAll('.choice_filter'); //eslint-disable-line no-unused-vars
  let filterTitle = document.querySelectorAll('.filter_title'); //eslint-disable-line no-unused-vars
  let filterBtn = document.querySelectorAll('.chechbox_product'); //eslint-disable-line no-unused-vars
  let tableList = document.querySelectorAll('.table_content'); //eslint-disable-line no-unused-vars

  filterBtn.forEach(function (item) {
    if (item.querySelector("input[type='checkbox']:checked") || item.querySelector("input[type='radio']:checked")) {
      item.classList.add('on');
      item.classList.remove('off');
    } else {
      item.classList.remove('on');
      item.classList.add('off');
    }
  });
  filterBox.forEach(function (title) {
    title.classList.add('auto');
  });
  filterChoices.forEach(function (title) {
    title.classList.add('auto');
  });
  filterChoice.forEach(function (title) {
    title.classList.add('auto');
  });
  filterTitle.forEach(function (title) {
    title.classList.add('off');
  });

  fliterContent.classList.add('on');
  tableList.forEach(item => {
    item.classList.add('on');
  });
}

function resetBtn(type = '') {
  let fliterContent = document.querySelector('.filter_content'); //eslint-disable-line no-unused-vars
  let filterBox = document.querySelectorAll('.filter_box'); //eslint-disable-line no-unused-vars
  let filterChoice = document.querySelectorAll('.choice_filter'); //eslint-disable-line no-unused-vars
  let filterTitle = document.querySelectorAll('.filter_title'); //eslint-disable-line no-unused-vars
  let filterBtn;
  if (type === 'size') {
    filterBtn = document.querySelectorAll('.checkbox_size'); //eslint-disable-line no-unused-vars
  } else if (type === 'tsk') {
    filterBtn = document.querySelectorAll('.checkbox_tsk'); //eslint-disable-line no-unused-vars
  } else {
    filterBtn = document.querySelectorAll('.chechbox_product'); //eslint-disable-line no-unused-vars
  }

  let tableList = document.querySelector('.table_content'); //eslint-disable-line no-unused-vars

  filterBtn.forEach(function (item) {
    if (item.classList[1] !== 'brand_check' && type !== 'CUSTOMER') {
      item.classList.remove('off');
      item.classList.add('on');
      if (item.querySelector("input[type='checkbox']:checked")) {
        item.querySelector("input[type='checkbox']:checked").checked = false;
      } else if (item.querySelector("input[type='radio']:checked")) {
        item.querySelector("input[type='radio']:checked").checked = false;
      }
    }
  });

  filterBox.forEach(function (title) {
    title.classList.remove('auto');
  });

  filterChoice.forEach(function (title) {
    title.classList.remove('auto');
  });

  filterTitle.forEach(function (title) {
    title.classList.remove('off');
  });

  fliterContent.classList.remove('on');
  tableList.classList.remove('on');
}

// 파일등록

function getval(sel) {
  if (sel.files && sel.files[0]) {
    let reader = new FileReader();

    reader.onload = function () {
      document.querySelector('.file_regist_box').insertAdjacentHTML('afterend', `<div class='registerd_box'>${sel.files[0].name}<button class='btn_delete_file' onclick='deletor(this);'></button></div>`);
    };

    reader.readAsDataURL(sel.files[0]);
  }
}
function deletor(id) {
  document.querySelector(id).closest('.registerd_box').remove();
}

function changeUnitType(type = '') {
  let filterBtn1 = document.querySelectorAll('.btn_base');
  let filterBtn2 = document.querySelectorAll('.btn_ord');

  if (type === 'base') {
    filterBtn1;
  } else if (type === 'ord') {
    filterBtn2;
  }

  filterBtn1.forEach(function (item) {
    if (type === 'base') {
      item.classList.add('btn_ref');
    } else if (type === 'ord') {
      item.classList.remove('btn_ref');
    }
  });

  filterBtn2.forEach(function (item) {
    if (type === 'base') {
      item.classList.remove('btn_ref');
    } else if (type === 'ord') {
      item.classList.add('btn_ref');
    }
  });
}

//클레임관리 사진등록
function getval02(sel) {
  if (sel.files && sel.files[0]) {
    let reader = new FileReader();

    reader.onload = function () {
      document.querySelector('.file_regist_box02').insertAdjacentHTML('afterend', `<div class='registerd_box02'><img class="preview" src="'+e.target.result+'" alt="your image" />${sel.files[0].name}<label class="chechbox_solo"><input type="checkbox" /><span class="checkmark"></span></label><button class='btn_delete_file' onclick='deletor02(this);'></button></div>`);
    };

    reader.readAsDataURL(sel.files[0]);
  }
}

function deletor02(id) {
  document.querySelector(id).closest('.registerd_box02').remove();
}

//클레임관리 파일등록
function getval03(fil) {
  if (fil.files02 && fil.files02[0]) {
    let reader = new FileReader();

    reader.onload = function () {
      document.querySelector('.file_regist_box03').insertAdjacentHTML(
        'afterend',
        `<tr class="registerd_box03"><td>
      <label class="chechbox_solo"><input type="checkbox" /><span class="checkmark"></span></label>
    </td>
    <td><a href="">${fil.files02[0].name}</a></td>
    <td>${fil.files02[0].name}</td></tr>`,
      );
    };

    reader.readAsDataURL(fil.files02[0]);
  }
}

function deletor03(id) {
  document.querySelector(id).closest('.registerd_box03').remove();
}

export default {
  searchProduct,
  resetBtn,
  getval,
  deletor,
  getval02,
  deletor02,
  getval03,
  deletor03,
  changeUnitType,
};
