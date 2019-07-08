import "../sass/main.scss";
import { ProductsCollection } from "./modules/ProductsCollection";
import getProducts from "./modules/getProducts";
import { Cart } from "./modules/Cart";

const url = "https://makuchdesign.pl/justyna/sky_planet/ajax.php";
const collection = new ProductsCollection();
const mainCart = new Cart();
const loadedProducts = getProducts(url, collection, mainCart);
mainCart.handleToggleContent();
