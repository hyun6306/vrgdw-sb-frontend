function emailFormatCheck(email) {
  if (email) {
    // eslint-disable-next-line
    const emailCheck = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/.test([email])
    return emailCheck;
  }
}

function pwdFormatCheck(pwd) {
  if (pwd) {
    let pwdCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/.test([pwd]);
    pwdCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/.test([pwd]);
    // 영어 대문자, 소문자, 숫자는 1개는 필수로 들어가야하며 8자 이상(특수문자는 필수는 아니지만 넣을수있음)
    return pwdCheck;
  } else {
    // return pwdCheck;
  }
}

function dataShowBtn(type) {
  if (type == 'password') {
    const showType = {
      ynShow: 'btn_view_password on see',
      type: 'text',
    };
    return showType;
  } else if (type == 'text') {
    const showType = {
      ynShow: 'btn_view_password on',
      type: 'password',
    };
    return showType;
  }
}

export default { emailFormatCheck, pwdFormatCheck, dataShowBtn };
