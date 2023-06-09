import { getLocalStorageItems, setBoard } from '../community/community.js';

let boardList = document.querySelector('.mainBottomBoardBottom');

let postType = 'board';
document.addEventListener('DOMContentLoaded', setBoard);
let posts = getLocalStorageItems(postType).reverse().slice(0, 6);
for (let post of posts) {
  const { title, date, id } = post;
  const outerDiv = document.createElement('a');
  outerDiv.href = `../community/board/detail/index.html#${id}`;
  const innerDiv1 = document.createElement('div');
  const innerDiv2 = document.createElement('div');

  innerDiv1.textContent = title;
  innerDiv2.textContent = date;

  outerDiv.appendChild(innerDiv1);
  outerDiv.appendChild(innerDiv2);

  boardList.appendChild(outerDiv);
}
