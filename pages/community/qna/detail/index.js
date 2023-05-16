document.addEventListener("DOMContentLoaded", function () {
  let detailTitle = document.querySelector(".detailTitle");
  let detailWriter = document.querySelector(".detailWriter");
  let detailDate = document.querySelector(".detailDate");
  let detailContext = document.querySelector(".detailContext");

  let postId = window.location.hash.substring(1).split("#");
  let posts = JSON.parse(localStorage.getItem("qnaPosts")) || [];

  let post = posts.find((post) => post.id == postId);

  if (post) {
    detailTitle.textContent = post.title;
    detailWriter.textContent = post.name || "익명";
    detailDate.textContent = post.date;
    detailContext.textContent = post.content;
  } else {
    // ID가 유효하지 않은 경우
    alert("해당 게시글을 찾을 수 없습니다.");
    window.location.href = "../index.html";
  }
});
