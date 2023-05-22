document.addEventListener('DOMContentLoaded', function () {
  let postingButton = document.querySelector('.postingButton');
  let titleInput = document.querySelector('.postingInputTitle');
  let nameInput = document.querySelector('.postingInputName');
  let contentInput = document.querySelector('.postingInputContext');

  postingButton.addEventListener('click', function (event) {
    event.preventDefault();

    let title = titleInput.value;
    let name = nameInput.value;
    if (name === '') {
      name = '익명';
    }
    let content = contentInput.value;
    let date = new Date().toISOString().split('T')[0];

    if (title === '' || content === '') {
      alert('제목과 내용을 모두 입력해주세요.');
    } else {
      let posts = JSON.parse(localStorage.getItem('notice')) || [];
      let post = {
        id: posts.length,
        title: titleInput.value,
        name: name,
        contents: contentInput.value.split('\n'),
        date: date,
      };
      posts.push(post);

      let text = [title + '\n', ...contentInput.value].join('');
      fetch('http://localhost:3000/slackapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      localStorage.setItem('notice', JSON.stringify(posts));
      titleInput.value = '';
      nameInput.value = '';
      contentInput.value = '';

      window.location.href = '../detail/index.html#' + post.id;
    }
  });
});

// import { submitPost } from '../../community.js';

// let postType = 'noticePosts';
// let postingButton = document.querySelector('.postingButton');

// postingButton.addEventListener('click', function (event) {
//   event.preventDefault();
//   submitPost(postType);
// });