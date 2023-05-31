fetch('https://server-eternalclash.koyeb.app/header')
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Error: ' + response.status);
  })
  .then(function (data) {
    window.Kakao.init(data.header);
  })
  .catch(function (error) {
    console.error(error);
  });

export const kakaoLoginInit = () => {
  const loginBtn = document.querySelector('#login');
  const loginBtnMobile = document.querySelector('#login2');
  const sessionUser = sessionStorage.getItem('userName');
  if (!sessionUser) {
    loginBtn.innerText = '로그인';
    loginBtnMobile.innerText = '로그인';
  } else {
    loginBtn.innerText = '로그아웃';
    loginBtnMobile.innerText = '로그아웃';
  }

  loginBtn.addEventListener('click', () => handleLogin(loginBtn));
  loginBtnMobile.addEventListener('click', () => handleLogin(loginBtnMobile));
};

export const handleLogin = $target => {
  if ($target.innerText == '로그인') {
    window.Kakao.Auth.login({
      scope: 'profile_nickname, account_email',
      success: authObj => {
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: res => {
            $target.innerText = '로그아웃';
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
  } else if (!window.sessionStorage.getItem('userName')) {
    window.sessionStorage.setItem('userName', '');
    window.sessionStorage.setItem('userMail', '');
    $target.innerText = '로그인';
    alert('logout ok');
    location.reload();
  } else {
    Kakao.Auth.logout(function () {
      window.sessionStorage.setItem('userName', '');
      window.sessionStorage.setItem('userMail', '');
      $target.innerText = '로그인';
      alert('logout ok\naccess token -> ' + Kakao.Auth.getAccessToken());
      location.reload();
    });
  }
};
