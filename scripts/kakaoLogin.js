var loginbtn = document.getElementById('login');

document.getElementById('login').addEventListener('click', function () {
  console.log('들어옴');
  if (loginbtn.innerText == '카카오\n로그인') {
    window.Kakao.Auth.login({
      scope: 'profile_nickname, account_email',
      success: authObj => {
        console.log('authObj : ');
        console.log(authObj);
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: res => {
            loginbtn.innerText = '카카오\n로그아웃';
            const kakao_account = res.kakao_account;
            console.log(kakao_account);
            console.log('success: ');
            console.log(res);
            alert('login success');
          },
          fail: res => {
            console.log(res);
          },
        });
      },
    });
  } else if (loginbtn.innerText == '카카오\n로그아웃') {
    if (!Kakao.Auth.getAccessToken()) {
      alert('Not logged in.');
      return;
    }
    Kakao.Auth.logout(function () {
      loginbtn.innerText = '카카오\n로그인';
      alert('logout ok\naccess token -> ' + Kakao.Auth.getAccessToken());
    });
  }
});

onclick = function () {};
