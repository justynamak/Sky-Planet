import { WindowSize } from "./WindowSize";

class HamburgerMenu {
  constructor() {
    this.hamburgerVisible = false;
    this.menuIsOpen = false;

    this.buttonHamburgerSelector = document.querySelector(
      ".main-nav__hamburger"
    );
    this.navListSelector = document.querySelector(".main-nav__list");
    this.windowSize = new WindowSize();
    this.handleButtonHamburger();
  }
  setHamburgerVisible() {
    this.windowSize.checkIfMobile()
      ? (this.hamburgerVisible = true)
      : (this.hamburgerVisible = false);
  }
  setMenuIsOpen(val) {
    this.menuIsOpen = val;
  }

  toggleMenu() {
    this.setHamburgerVisible();
    if (this.hamburgerVisible && !this.menuIsOpen) {
      this.navListSelector.classList.add("main-nav__list--active");
      this.setMenuIsOpen(true);
    } else {
      this.navListSelector.classList.remove("main-nav__list--active");
      this.setMenuIsOpen(false);
    }
  }

  handleButtonHamburger() {
    this.buttonHamburgerSelector.addEventListener(
      "click",
      this.toggleMenu.bind(this)
    );
  }
}
export { HamburgerMenu };
