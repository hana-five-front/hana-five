document.addEventListener('DOMContentLoaded', function(){
  let boardList = document.querySelector('.boardList');
  let posts = JSON.parse(localStorage.getItem('boardPosts')) || [];
  boardList.innerHTML = ''
  
  posts.forEach(function(post, index){
      let li = document.createElement('li');
      li.classList.add('boardContent');

      let a = document.createElement('a');
      a.href = './detail/index.html#' + post.id;

      let pTitle = document.createElement('p');
      pTitle.textContent = post.title;

      let pDate = document.createElement('p');
      pDate.textContent = post.date;

      a.appendChild(pTitle);
      a.appendChild(pDate);
      li.appendChild(a);
      boardList.appendChild(li);
  });
});