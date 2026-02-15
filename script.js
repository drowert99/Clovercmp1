function addPost() {
  const input = document.getElementById("postInput");
  const content = input.value.trim();
  if (!content) return;

  const post = document.createElement("div");
  post.className = "post";
  post.innerHTML = `
    <strong>Вы</strong>
    <p>${content}</p>
  `;

  document.getElementById("posts").prepend(post);
  input.value = "";
}