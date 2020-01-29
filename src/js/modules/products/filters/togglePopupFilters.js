export default function(e) {
  const parent = e.currentTarget.parentNode;
  const popup = parent.querySelector(".popup");
  const close = parent.querySelector(".popup__close");
  const filterButton = parent.querySelector(".filter__button");

  const closePopup = () => {
    close.classList.remove("active");
    popup.classList.remove("active");
  };
  const openPopup = () => {
    close.classList.add("active");
    popup.classList.add("active");
  };
  openPopup();
  close.addEventListener("click", closePopup);
  window.addEventListener("resize", closePopup);

  if (filterButton) {
    filterButton.addEventListener("click", closePopup);
  }
}
