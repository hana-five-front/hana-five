var loginbtn = document.getElementById('login');

document.getElementById('login').onclick = function () {
  if (loginbtn.innerText == '로그인') {
    window.Kakao.Auth.login({
      scope: 'profile_nickname, account_email',
      success: authObj => {
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: res => {
            loginbtn.innerText = '로그아웃';
            const kakao_account = res.kakao_account;
            alert('login success');
          },
          fail: res => {
            console.error(res);
          },
        });
      },
    });
  } else if (loginbtn.innerText == '로그아웃') {
    if (!Kakao.Auth.getAccessToken()) {
      alert('Not logged in.');
      return;
    }
    Kakao.Auth.logout(function () {
      loginbtn.innerText = '로그인';
      alert('logout ok\naccess token -> ' + Kakao.Auth.getAccessToken());
    });
  }
};
