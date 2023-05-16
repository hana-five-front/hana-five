document.addEventListener("DOMContentLoaded", function () {
  let postingButton = document.querySelector(".postingButton");
  let titleInput = document.querySelector(".postingInputTitle");
  let nameInput = document.querySelector(".postingInputName");
  let contentInput = document.querySelector(".postingInputContext");

  postingButton.addEventListener("click", function (event) {
    event.preventDefault();

    let title = titleInput.value;
    let name = nameInput.value;
    if (name === "") {
      name = "익명";
    }
    let content = contentInput.value;
    let date = new Date().toISOString().split("T")[0];

    if (title === "" || content === "") {
      alert("제목과 내용을 모두 입력해주세요.");
    } else {
      let post = {
        id: Date.now(),
        title: titleInput.value,
        name: name,
        content: contentInput.value,
        date: date,
      };

      let posts = JSON.parse(localStorage.getItem("boardPosts")) || [];

      posts.push(post);
      localStorage.setItem("boardPosts", JSON.stringify(posts));

      window.location.href = "../detail/index.html#" + post.id; // 여기에 실제 게시글 목록 페이지의 URL을 입력하세요
    }

    // 입력 필드 초기화
    titleInput.value = "";
    nameInput.value = "";
    contentInput.value = "";
  });
});
