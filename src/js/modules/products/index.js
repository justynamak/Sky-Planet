import { ProductsCollection } from "./ProductsCollection";
import getProducts from "./getProducts";
import { Cart } from "./Cart";
import { Paginator } from "./Paginator";
import { getValueRange } from "./filters/getValueRange";
import { FilterCollection } from "./filters/FilterCollection";
import togglePopupFilters from "./filters/togglePopupFilters";

let config;
export default () => {
  const buttonFilter = document.querySelector(".filter__button");
  const buttonShowPopup = [
    ...document.querySelectorAll(".popup-show:not(.cart)")
  ];
  const url = "https://makuchdesign.pl/justyna/sky_planet/ajax.php";
  const mainCart = new Cart();
  const collection = new ProductsCollection(mainCart);
  const paginator = new Paginator(collection);
  const filterCollection = new FilterCollection();

  config = {
    url,
    collection,
    mainCart,
    paginator,
    method: "",
    filterCollection
  };

  const loadedProducts = getProducts(config);
  mainCart.handleToggleContent();
  window.addEventListener("resize", () => paginator.showCurrentPage());
  window.addEventListener("resize", () => paginator.createPagination());

  buttonShowPopup.forEach(button =>
    button.addEventListener("click", togglePopupFilters)
  );

  buttonFilter.addEventListener("click", () => {
    paginator.setCurrentPage(1);
    getProducts(config);
  });
};

export { config };
