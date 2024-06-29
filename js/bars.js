let bars = document.querySelectorAll(".bar i");
bars.forEach((e) => {
  e.style.width = e.parentElement.dataset.value;
});
