import { WindowSize } from "./WindowSize";
import { ProductsCollection } from "./ProductsCollection";

class Cart {
  constructor(products) {
    this.products = [];
    this.moneyToPay = 0;
    this.count = 0;
    this.countInCart = document.querySelector(".cart__count");
    this.cartSelector = document.querySelector(".cart");
    this.dropdownSelector = document.querySelector(".cart__dropdown");
    this.contentSelector = document.querySelector(".cart__dropdown-text");
    this.cartContainerSelector = document.querySelector(".cart__container");
    this.cartBtnSelector = document.querySelector(".cart__btn");
    this.buttonClose = document.querySelector(".popup__close");
    this.cartNotEmptySelector = document.querySelector(".cart__products");
    this.cartEmptySelector = document.querySelector(".cart__empty");
    this.removeBtn = null;
    this.lastRemoved = null;

    this.windowSize = new WindowSize();
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
  handleRemoveFromCart(collection) {
    this.cartContainerSelector.addEventListener("click", e =>
      this.removeFromCart(e, collection)
    );
  }
  calculateThePrice() {
    this.moneyToPay = this.products.reduce((productA, productB) => {
      return productA + productB.price;
    }, 0);
  }
  showMoneyToPay() {
    const toPay = document.querySelector(".cart__pay");
    toPay.innerHTML = `${this.moneyToPay}$`;
  }
  showCountProducts() {
    this.count = this.products.length;
    this.countInCart.innerHTML = this.count;
  }
  showContent(e) {
    if (!this.windowSize.checkIfMobile() && e.type === "mouseenter") {
      this.dropdownSelector.classList.add("cart__dropdown--active");
      this.buttonClose.classList.remove("active");
      this.dropdownSelector.classList.remove("popup--active");
    } else if (this.windowSize.checkIfMobile() && e.type === "click") {
      this.dropdownSelector.classList.add("popup--active");
      this.buttonClose.classList.add("active");
      this.dropdownSelector.classList.remove("cart__dropdown--active");
    }
  }

  hideContent(e) {
    if (!this.windowSize.checkIfMobile() && e.type === "mouseleave") {
      this.dropdownSelector.classList.remove("cart__dropdown--active");
    } else if (
      this.windowSize.checkIfMobile() &&
      e.type === "click" &&
      e.target === this.buttonClose
    ) {
      this.dropdownSelector.classList.remove("popup--active");
      this.buttonClose.classList.remove("active");
    }
  }
  placeInCart(product) {
    if (!this.products.length) {
      this.generateHtmlList();
    }
    product.selectorProductInCart = this.generateHtmlItem(product);
    this.products.push(product);
    this.calculateThePrice();
    this.showCountProducts();
    this.showMoneyToPay();
  }
  removeFromCart(e, collection) {
    if (e.target.classList.contains("cart__list-btn")) {
      const selector = e.target.closest(".cart__list-item");
      const product = this.products.find(
        product => product.selectorProductInCart === selector
      );
      const index = this.products.findIndex(
        product => product.selectorProductInCart === selector
      );

      product.selectorProductInCart.remove();
      this.products.splice(index, 1);
      this.lastRemoved = product;
      this.showCountProducts();
      this.calculateThePrice();
      this.showMoneyToPay();

      if (!this.products.length) {
        this.cartEmptySelector.classList.remove("hidden");
        this.cartNotEmptySelector.innerHTML = "";
      }
      collection.removeAddedToCart(this.lastRemoved.id);
      collection.removeAddedToCartInHtml();
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
    li.setAttribute("data-id", `${product.id}`);

    const removeBtn = document.createElement("p");
    li.appendChild(removeBtn);
    removeBtn.classList.add("cart__list-btn");
    removeBtn.innerHTML = "x";
    this.removeBtn = document.querySelector(".cart__list-btn");

    const productImg = document.createElement("img");
    li.appendChild(productImg);
    productImg.src = `./assets/${product.image}.jpg`;
    productImg.classList.add("cart__list-img");

    const productName = document.createElement("p");
    li.appendChild(productName);
    productName.innerHTML = product.name;

    const productPrice = document.createElement("p");
    li.appendChild(productPrice);
    productPrice.innerHTML = `${product.price}$`;

    return document.querySelector(`li[data-id="${product.id}"]`);
  }
}
export { Cart };
