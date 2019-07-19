import "../sass/main.scss";
import { Slider } from "./modules/Slider";
import { HamburgerMenu } from "./modules/HamburgerMenu";
import products from "./modules/products/index";

const slider = new Slider();
const hamburgerMenu = new HamburgerMenu();
products();
