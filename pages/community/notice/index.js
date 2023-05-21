
const noticeContainer = document.querySelector('.mainBottomNoticeBottom')


function markDowntoPlainWords (message) {
   return message.replace(/:[a-zA-Z0-9_]+:|[\*_`~]/g, '');
}

function dateToText(date) {
  return date.split("T")[0]
}

function makeNotice (posts) {
  let boardList = document.querySelector('.boardList');
  boardList.innerHTML = '';
  for (let i = 0; i < posts.length; i++) {
        let post = posts[i];
        let listItem = document.createElement('li');
        listItem.className = 'boardContent';
        let link = document.createElement('a');
        link.href = `./detail/index.html#${post.id}`;
    
        let title = document.createElement('p');
        title.className = 'boardContentTitle';
        title.textContent = markDowntoPlainWords(post.title);
        link.appendChild(title);
    
        let infoDiv = document.createElement('div');
        infoDiv.className = 'boardContentInformation';
    
        let name = document.createElement('p');
        name.className = 'boardContentName';
      
        name.textContent = post.userName;
        infoDiv.appendChild(name);
    
        let date = document.createElement('p');
        date.className = 'boardContentDate';
        date.textContent = dateToText(post.date);
        infoDiv.appendChild(date);
    
        link.appendChild(infoDiv);
        listItem.appendChild(link);
        boardList.appendChild(listItem);
      }
}

function getNotice () {
  fetch('http://43.200.63.91:3000/slackapi')
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Error: ' + response.status);
  })
  .then((data) =>  {
    console.log(data)
   data= data.map((e,idx)=>{return e = {...e,id:idx}}).reverse()
   makeNotice(data)
   return data
  })
  .catch(function (error) {
    console.log(error);
  });
}


  let boardList = document.querySelector('.boardList');

  getNotice()
