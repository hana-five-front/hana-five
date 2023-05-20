const noticeContainer = document.querySelector('.mainBottomNoticeBottom')


function markDowntoPlainWords (message) {
   return message.replace(/:[a-zA-Z0-9_]+:|[\*_`~]/g, '');
}

function makeNotice(title, date) {
  const outerDiv = document.createElement('div');
  const innerDiv1 = document.createElement('div');
  const innerDiv2 = document.createElement('div');

  innerDiv1.textContent = title;
  innerDiv2.textContent = date;

  outerDiv.appendChild(innerDiv1);
  outerDiv.appendChild(innerDiv2);

  noticeContainer.appendChild(outerDiv);
}

function dateToText(date) {
  return date.split("T")[0]
}

function getNotice () {
  fetch('http://43.200.63.91:3000/slackapi')
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Error: ' + response.status);
  })
  .then(function (data) {

    for (let i = 2; i >= 0; i--) {
       let {title,date} = data[i]
       date = dateToText(date)
       title = markDowntoPlainWords(title)
       makeNotice(title,date)
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

getNotice()
