document.addEventListener('DOMContentLoaded', function(){
  let boardList = document.querySelector('.boardList');
  let posts = (JSON.parse(localStorage.getItem('qnaPosts')) || []).reverse();
  boardList.innerHTML = ''
  
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    let listItem = document.createElement('li');
    listItem.className = 'boardContent';
    let link = document.createElement('a');
    link.href = `./detail/index.html#${post.id}`;
    
    let title = document.createElement('p');
    title.className = 'boardContentTitle';
    title.textContent = post.title;
    link.appendChild(title);
    
    let infoDiv = document.createElement('div');  // 게시글 정보를 담을 새 div 생성
    infoDiv.className = 'boardContentInformation';  // 적절한 CSS 클래스 이름 설정
    
    let name = document.createElement('p');  // 작성자를 나타내는 새로운 요소 생성
    name.className = 'boardContentName';  // 적절한 CSS 클래스 이름 설정
    name.textContent = post.name;  // 작성자 이름 설정
    infoDiv.appendChild(name);  // 작성자 요소를 정보 div에 추가
    
    let date = document.createElement('p');
    date.className = 'boardContentDate';
    date.textContent = post.date;
    infoDiv.appendChild(date);  // 날짜 요소를 정보 div에 추가
    
    link.appendChild(infoDiv);  // 정보 div를 링크 요소에 추가
    listItem.appendChild(link);
    boardList.appendChild(listItem);
  }
});