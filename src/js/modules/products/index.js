import { ProductsCollection } from "./ProductsCollection";
import getProducts from "./getProducts";
import { Cart } from "./Cart";
import { Paginator } from "./Paginator";
import { getValueRange } from "./getValueRange";

export default () => {
  const url = "https://makuchdesign.pl/justyna/sky_planet/ajax.php";
  const mainCart = new Cart();
  const collection = new ProductsCollection(mainCart);
  const paginator = new Paginator(collection);
  const config = {
    url,
    collection,
    mainCart,
    paginator,
    method: ""
  };
  const loadedProducts = getProducts(config);
  mainCart.handleToggleContent();
  window.addEventListener("resize", () => paginator.showCurrentPage());
  window.addEventListener("resize", () => paginator.createPagination());

  getValueRange();
};
