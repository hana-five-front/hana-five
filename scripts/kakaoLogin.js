export const kakaoLoginInit = () => {
  const loginBtn = document.querySelector('#login');

  document.querySelector('#login').addEventListener('click', function () {
    if (loginBtn.innerText == '카카오\n로그인') {
      window.Kakao.Auth.login({
        scope: 'profile_nickname, account_email',
        success: authObj => {
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: res => {
              loginBtn.innerText = '카카오\n로그아웃';
              const kakao_account = res.kakao_account;
              alert('login success');
            },
            fail: res => {
              console.error(res);
            },
          });
        },
      });
    } else if (loginBtn.innerText == '카카오\n로그아웃') {
      if (!Kakao.Auth.getAccessToken()) {
        alert('Not logged in.');
        return;
      }
      Kakao.Auth.logout(function () {
        loginBtn.innerText = '카카오\n로그인';
        alert('logout ok\naccess token -> ' + Kakao.Auth.getAccessToken());
      });
    }
  });
};
