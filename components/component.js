import { kakaoLoginInit } from '../scripts/kakaoLogin.js';

function makeHeader() {
  fetch('/components/header/index.html')
    .then(function (response) {
      if (response.ok) {
        return response.text();
      }
      throw new Error('Error: ' + response.status);
    })
    .then(function (headerContent) {
      document.getElementById('header').innerHTML = headerContent;
      onClickSideBar();
    })
    .catch(function (error) {
      console.error(error);
    })
    .finally(() => {
      kakaoLoginInit();
    });
}

function onClickSideBar() {
  const sideBar = document.querySelector('.sideBar');
  const sideIcon = document.querySelector('.imo');
  sideIcon.addEventListener('click', function () {
    if (sideBar.style.display === 'none' || sideBar.style.display == '') {
      sideBar.style.display = 'block';
    } else {
      sideBar.style.display = 'none';
    }
  });
}
// Footer 삽입
function makeFooter() {
  fetch('/components/footer/index.html')
    .then(function (response) {
      if (response.ok) {
        return response.text();
      }
      throw new Error('Error: ' + response.status);
    })
    .then(function (footerContent) {
      document.getElementById('footer').innerHTML = footerContent;
    })
    .catch(function (error) {
      console.error(error);
    });
}

makeHeader();
makeFooter();
