const noticeContainer = document.querySelector('.mainBottomNoticeBottom');

function markDowntoPlainWords(message) {
  return message.replace(/&gt;|:[a-zA-Z0-9_]+:|[\*_`~]/g, '');
}

function makeNotice(title, date, id) {
  const outerDiv = document.createElement('a');
  outerDiv.href = `../community/notice/detail/index.html#${id}`;
  const innerDiv1 = document.createElement('div');
  const innerDiv2 = document.createElement('div');

  innerDiv1.textContent = title;
  innerDiv2.textContent = date;

  outerDiv.appendChild(innerDiv1);
  outerDiv.appendChild(innerDiv2);

  noticeContainer.appendChild(outerDiv);
}

function dateToText(date) {
  return date.split('T')[0];
}

function getSlackNotice() {
  const data = JSON.parse(localStorage.getItem('notice'));
  if (data) {
    noticeContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      let { title, date, id } = data[i];
      date = dateToText(date);
      title = markDowntoPlainWords(title);
      makeNotice(title, date, id);
    }
  }
  fetch('http://localhost:3000/slackapi')
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error: ' + response.status);
    })
    .then(function (data) {
      data = data.map((e, idx) => {
        e.title = markDowntoPlainWords(e.title);
        e.content = e.content.map(e => markDowntoPlainWords(e));
        e.date = dateToText(e.date);
        e.name = e.name === '' ? '익명' : e.name;
        return (e = { ...e, id: idx });
      });
      localStorage.setItem('notice', JSON.stringify(data));
      noticeContainer.innerHTML = '';
      for (let i = 0; i < 5; i++) {
        let { title, date, id } = data[i];
        date = dateToText(date);
        title = markDowntoPlainWords(title);

        makeNotice(title, date, id);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

getSlackNotice();
