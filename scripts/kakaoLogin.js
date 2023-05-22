import { config } from './apikey.js';

window.Kakao.init(config.apikey);

export const kakaoLoginInit = () => {
  const loginBtn = document.querySelector('#login');

  const sessionUser = sessionStorage.getItem('userName');
  if (!sessionUser) {
    loginBtn.innerText = '카카오\n로그인';
  } else {
    loginBtn.innerText = '카카오\n로그아웃';
  }

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

              window.sessionStorage.setItem(
                'userName',
                kakao_account.profile.nickname
              );
              window.sessionStorage.setItem('userMail', kakao_account.email);
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
      } else {
        Kakao.Auth.logout(function () {
          window.sessionStorage.setItem('userName', '');
          window.sessionStorage.setItem('userMail', '');
          loginBtn.innerText = '카카오\n로그인';
          alert('logout ok\naccess token -> ' + Kakao.Auth.getAccessToken());
        });
      }
    }
  });
};
