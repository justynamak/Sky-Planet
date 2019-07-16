import "../sass/main.scss";
import { ProductsCollection } from "./modules/ProductsCollection";
import getProducts from "./modules/getProducts";
import { Cart } from "./modules/Cart";
import { Paginator } from "./modules/Paginator";
import { getValueRange } from "./modules/getValueRange";

const url = "https://makuchdesign.pl/justyna/sky_planet/ajax.php";
const mainCart = new Cart();
const collection = new ProductsCollection(mainCart);
const paginator = new Paginator();
const config = {
  url,
  collection,
  mainCart,
  paginator
};
const loadedProducts = getProducts(config);
mainCart.handleToggleContent();
window.addEventListener("resize", () => paginator.showCurrentPage());
window.addEventListener("resize", () => paginator.createPagination());

getValueRange();
