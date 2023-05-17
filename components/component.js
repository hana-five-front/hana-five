function makeHeader() {
  fetch('/hana-five/components/header/index.html')
    .then(function (response) {
      if (response.ok) {
        return response.text();
      }
      throw new Error('Error: ' + response.status);
    })
    .then(function (headerContent) {
      document.getElementById('header').innerHTML = headerContent;
    })
    .catch(function (error) {
      console.log(error);
    });
}
// Footer 삽입
function makeFooter() {
  fetch('/hana-five/components/footer/index.html')
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
      console.log(error);
    });
}

makeHeader();
makeFooter();
