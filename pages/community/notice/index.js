document.addEventListener("DOMContentLoaded", function () {
  let boardList = document.querySelector(".boardList");
  let posts = (JSON.parse(localStorage.getItem("noticePosts")) || []).reverse();
  boardList.innerHTML = "";

  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    let listItem = document.createElement("li");
    listItem.className = "boardContent";
    let link = document.createElement("a");
    link.href = `./detail/index.html#${post.id}`;

    let title = document.createElement("p");
    title.className = "boardContentTitle";
    title.textContent = post.title;
    link.appendChild(title);

    let infoDiv = document.createElement("div");
    infoDiv.className = "boardContentInformation";

    let name = document.createElement("p");
    name.className = "boardContentName";
    name.textContent = post.name;
    infoDiv.appendChild(name);

    let date = document.createElement("p");
    date.className = "boardContentDate";
    date.textContent = post.date;
    infoDiv.appendChild(date);

    link.appendChild(infoDiv);
    listItem.appendChild(link);
    boardList.appendChild(listItem);
  }
});
