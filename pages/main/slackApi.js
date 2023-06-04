const noticeContainer = document.querySelector('.mainBottomNoticeBottom');

function markDownToPlainWords(message) {
  return message.replace(/&gt;|&lt;|:[a-zA-Z0-9_]+:|[\*_`]/g, '');
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
function makeErrorNotice() {
  noticeContainer.innerHTML=''
  const outerDiv = document.createElement('div')
  const outerBlank1 = document.createElement('div')
  const outerBlank2 = document.createElement('div')
  const outerBlank3 = document.createElement('div')
  const outerBlank4 = document.createElement('div')
  outerDiv.textContent = '공지사항 글이 없습니다.'
  noticeContainer.appendChild(outerDiv)
  noticeContainer.appendChild(outerBlank1)
  noticeContainer.appendChild(outerBlank2)
  noticeContainer.appendChild(outerBlank3)
  noticeContainer.appendChild(outerBlank4)
}
function dataArrange(data) {
  if(isValidJson(data)) {
    data= JSON.parse(data)
  }
  data = data.map((e, idx) => {
    e.title = markDownToPlainWords(e.title);
    e.content = e.content.map(e => markDownToPlainWords(e));
    e.date = dateToText(e.date);
    e.name = e.name === '' ? '익명' : e.name;
    return (e = { ...e, id: idx });
  });
  return data
}
function setLocalStorageNotice (data) {
  return localStorage.setItem('notice', JSON.stringify(data));
}
function dateToText(date) {
  return date.split('T')[0];
}
function isValidJson(jsonString) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
}

function renderNoticeInMainPage(data) {
  noticeContainer.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    let { title, date, id } = data[i];
    date = dateToText(date);
    title = markDownToPlainWords(title);
    makeNotice(title, date, id);
  }
}

function getSlackNotice() {
  const localData = JSON.parse(localStorage.getItem('notice'));
  if (localData) {
     renderNoticeInMainPage(localData)
  }
  fetch('http://localhost:8000/slackapi')
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error: ' + response.status);
    })
    .then(function (data) {
      data = dataArrange(data)
      setLocalStorageNotice(data)
      renderNoticeInMainPage(data)
    })
    .catch(function (error) {
      console.error(error);
      if(!localData)
      makeErrorNotice();
    });
}

getSlackNotice();

