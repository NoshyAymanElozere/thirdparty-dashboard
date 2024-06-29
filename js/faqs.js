let faqs = document.querySelectorAll(".faqs .fa");
faqs.forEach((e) => {
  e.addEventListener("click", () => {
    faqs.forEach((e) => {
      e.classList.remove("active");
    });
    e.classList.add("active");
  });
});
