import { WindowSize } from "./WindowSize";
import { ProductsCollection } from "./ProductsCollection";
import { Product } from "./Product";

class Cart {
  constructor(products) {
    this.products = [];
    this.productsInCartSelectors = [];
    this.moneyToPay = 0;
    this.count = 0;
    this.countInCart = document.querySelector(".cart__count");
    this.cartSelector = document.querySelector(".cart");
    this.dropdownSelector = document.querySelector(".cart__dropdown");
    this.contentSelector = document.querySelector(".cart__dropdown-text");
    this.cartContainerSelector = document.querySelector(".cart__container");
    this.cartBtnSelector = document.querySelector(".cart__btn");
    this.buttonCloseSelector = document.querySelector(".popup__close");
    this.cartNotEmptySelector = document.querySelector(".cart__products");
    this.cartEmptySelector = document.querySelector(".cart__empty");
    this.removeBtn;
    this.toPaySelector;
    this.removeBtn = null;
    this.lastRemoved = null;

    this.handleRemoveFromCart();
    this.windowSize = new WindowSize();
  }

  setSelectorProductInCart(product, selectorItem) {
    const id = product.getId();

    const selector = {
      id,
      selectorInCart: selectorItem
    };
    this.productsInCartSelectors.push(selector);
  }
  handleToggleContent() {
    this.cartSelector.addEventListener(
      "mouseenter",
      this.showContent.bind(this)
    );
    this.cartSelector.addEventListener(
      "mouseleave",
      this.hideContent.bind(this)
    );
    this.cartSelector.addEventListener("click", this.showContent.bind(this));
    this.cartSelector.addEventListener("click", this.hideContent.bind(this));
  }
  handleRemoveFromCart() {
    this.cartContainerSelector.addEventListener(
      "click",
      this.removeFromCart.bind(this)
    );
  }
  handleUnregisterRemoveFromCart() {
    console.log("usuwany");
  }
  calculateThePrice() {
    const money = this.products.reduce((productA, productB) => {
      return productA + productB.getPrice();
    }, 0);
    this.moneyToPay = money;
  }
  showMoneyToPay() {
    console.log(this);
    this.toPaySelector.innerHTML = `${this.moneyToPay}$`;
  }
  showCountProducts() {
    this.count = this.products.length;
    this.countInCart.innerHTML = this.count;
  }
  showContent(e) {
    if (!this.windowSize.checkIfMobile() && e.type === "mouseenter") {
      this.dropdownSelector.classList.add("cart__dropdown--active");
      this.buttonCloseSelector.classList.remove("active");
      this.dropdownSelector.classList.remove("popup--active");
    } else if (this.windowSize.checkIfMobile() && e.type === "click") {
      this.dropdownSelector.classList.add("popup--active");
      this.buttonCloseSelector.classList.add("active");
      this.dropdownSelector.classList.remove("cart__dropdown--active");
    }
  }

  hideContent(e) {
    if (!this.windowSize.checkIfMobile() && e.type === "mouseleave") {
      this.dropdownSelector.classList.remove("cart__dropdown--active");
    } else if (
      this.windowSize.checkIfMobile() &&
      e.type === "click" &&
      e.target === this.buttonCloseSelector
    ) {
      this.dropdownSelector.classList.remove("popup--active");
      this.buttonCloseSelector.classList.remove("active");
    }
  }
  placeInCart(product) {
    if (!this.products.length) {
      this.generateHtmlList();
    }
    const selectorItem = this.generateHtmlItem(product);
    this.setSelectorProductInCart(product, selectorItem);
    this.products.push(product);
    this.calculateThePrice();
    this.showCountProducts();
    this.showMoneyToPay();
  }
  removeFromCart() {
    if (event.target.classList.contains("cart__list-btn")) {
      const selector = event.target.closest(".cart__list-item");

      const elem = this.productsInCartSelectors.find(
        product => product.selectorInCart === selector
      );

      const indexElem = this.productsInCartSelectors.findIndex(
        product => product.id === elem.id
      );
      const index = this.products.findIndex(
        product => product.getId() === elem.id
      );

      elem.selectorInCart.remove();
      this.productsInCartSelectors.splice(indexElem, 1);
      this.lastRemoved = this.products[index];
      this.products.splice(index, 1);
      this.showCountProducts();
      this.calculateThePrice();
      this.showMoneyToPay();
      this.lastRemoved.setAddedToCart(false);
      this.lastRemoved.removeAddedToCartInHtml();

      if (!this.products.length) {
        this.cartEmptySelector.classList.remove("hidden");
        this.cartNotEmptySelector.innerHTML = "";
      }
    }
  }

  generateHtmlList() {
    let productsList;
    this.cartEmptySelector.classList.add("hidden");
    this.countInCart.classList.add("active");
    productsList = document.createElement("ul");
    this.cartNotEmptySelector.appendChild(productsList);
    productsList.classList.add("cart__list");

    const hr = document.createElement("hr");
    this.cartNotEmptySelector.appendChild(hr);
    hr.classList.add("cart__line");
    this.cartBtnSelector.textContent = "Go to Cart";

    const money = document.createElement("p");
    this.cartNotEmptySelector.appendChild(money);
    money.classList.add("cart__pay");
    this.toPaySelector = document.querySelector(".cart__pay");

    const btn = document.createElement("button");
    const classes = ["btn", "cart__btn"];
    btn.classList.add(...classes);
    btn.textContent = "Go shopping";
    this.cartNotEmptySelector.appendChild(btn);

    money.classList.add("cart__pay");
  }

  generateHtmlItem(product) {
    const productList = document.querySelector(".cart__list");

    const li = document.createElement("li");
    productList.appendChild(li);
    li.classList.add("cart__list-item");
    li.setAttribute("data-id", `${product.getId()}`);

    const removeBtn = document.createElement("p");
    li.appendChild(removeBtn);
    removeBtn.classList.add("cart__list-btn");
    removeBtn.innerHTML = "x";
    this.removeBtn = document.querySelector(".cart__list-btn");

    const productImg = document.createElement("img");
    li.appendChild(productImg);
    const img =
      product.getId() < 8 ? product.getImage() : product.getTemporaryImage();
    productImg.src = `./assets/${img}.jpg`;
    productImg.classList.add("cart__list-img");

    const productName = document.createElement("p");
    li.appendChild(productName);
    productName.innerHTML = product.getName();

    const productPrice = document.createElement("p");
    li.appendChild(productPrice);
    productPrice.innerHTML = `${product.getPrice()}$`;

    return document.querySelector(`li[data-id="${product.getId()}"]`);
  }
}
export { Cart };
