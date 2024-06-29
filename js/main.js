let nav = document.querySelector("nav");
let menu = document.querySelector(".menu");
menu.addEventListener("click", () => {
  nav.classList.toggle("activeMenu");
});
let acc = document.querySelector(".account");
let drop = document.querySelectorAll(".drop");

drop.forEach((e) => {
  e.addEventListener("click", () => {
    acc.classList.remove("showAcc");
    drop.forEach((el) => {
      el !== e ? el.classList.remove("showMenu") : "";
    });
    e.classList.toggle("showMenu");
  });
});

acc.addEventListener("click", () => {
  drop.forEach((el) => {
    el.classList.remove("showMenu");
  });
  acc.classList.toggle("showAcc");
});
