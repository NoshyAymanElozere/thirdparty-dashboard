let copyContainers = document.querySelectorAll(".copyTex");

copyContainers.forEach((e) => {
  e.addEventListener("click", () => {
    navigator.clipboard.writeText(e.firstChild.textContent);
    showMessage("Copied To Clipboard");
  });
});

function showMessage(message) {
  let div = document.createElement("div");
  div.className = "popMess";
  let span = document.createElement("span");
  span.innerHTML = message;
  document.body.appendChild(div);
  div.appendChild(span);
  setTimeout(()=>{
    div.remove();
  },2000)
}
