import { config } from './apikey.js';

window.Kakao.init(config.apikey);

export const kakaoLoginInit = () => {
  const loginBtn = document.querySelector('#login');
  const loginBtnMobile = document.querySelector('#login2')
  const sessionUser = sessionStorage.getItem('userName');
  if (!sessionUser) {
    loginBtn.innerText = '로그인';
    loginBtnMobile.innerText = '로그인'
  } else {
    loginBtn.innerText = '로그아웃';
    loginBtnMobile.innerText= '로그아웃'
  }

  document.querySelector('#login').addEventListener('click', function () {
    if (loginBtn.innerText == '로그인') {
      window.Kakao.Auth.login({
        scope: 'profile_nickname, account_email',
        success: authObj => {
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: res => {
              loginBtn.innerText = '로그아웃';
              const kakao_account = res.kakao_account;
              alert('login success');

              window.sessionStorage.setItem(
                'userName',
                kakao_account.profile.nickname
              );
              window.sessionStorage.setItem('userMail', kakao_account.email);
              location.reload();
            },
            fail: res => {
              console.error(res);
            },
          });
        },
      });
    } else if (loginBtn.innerText == '로그아웃') {
      if (!Kakao.Auth.getAccessToken()) {
        alert('Not logged in.');
        return;
      } else {
        Kakao.Auth.logout(function () {
          window.sessionStorage.setItem('userName', '');
          window.sessionStorage.setItem('userMail', '');
          loginBtn.innerText = '로그인';
          alert('logout ok\naccess token -> ' + Kakao.Auth.getAccessToken());
          location.reload();
        });
      }
    }
  });
  document.querySelector('#login2').addEventListener('click', function () {
    if (loginBtnMobile.innerText == '로그인') {
      window.Kakao.Auth.login({
        scope: 'profile_nickname, account_email',
        success: authObj => {
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: res => {
              loginBtnMobile.innerText = '로그아웃';
              const kakao_account = res.kakao_account;
              alert('login success');

              window.sessionStorage.setItem(
                'userName',
                kakao_account.profile.nickname
              );
              window.sessionStorage.setItem('userMail', kakao_account.email);
              location.reload();
            },
            fail: res => {
              console.error(res);
            },
          });
        },
      });
    } else if (loginBtnMobile.innerText == '로그아웃') {
      if (!Kakao.Auth.getAccessToken()) {
        alert('Not logged in.');
        return;
      } else {
        Kakao.Auth.logout(function () {
          window.sessionStorage.setItem('userName', '');
          window.sessionStorage.setItem('userMail', '');
          loginBtnMobile.innerText = '로그인';
          alert('logout ok\naccess token -> ' + Kakao.Auth.getAccessToken());
          location.reload();
        });
      }
    }
  });
};
