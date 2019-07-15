import { WindowSize } from "./WindowSize";
import { Cart } from "./Cart";
import { Product } from "./Product";

class ProductsCollection {
  constructor(mainCart) {
    this.products = [];
    this.productsSelector = null;
    this.bagBtnsSelector = null;
    this.likesSelector = null;
    this.mainCart = mainCart;
    this.favouritesProducts = [];

    this.windowSize = new WindowSize();
    this.saveToSessionStorage();

    window.addEventListener("resize", this.showAddedToCart.bind(this));
    window.addEventListener("resize", this.showAddedToFavourites.bind(this));
  }

  getProducts() {
    return this.products;
  }

  setProductsSelectors() {
    this.productsSelector = [
      ...document.querySelectorAll(".product:not(#clone)")
    ];
    this.likesSelector = [...document.querySelectorAll(".product__like")];
    this.bagBtnsSelector = [...document.querySelectorAll(".product__bag")];

    this.handleMouseEvent();
    this.handleAddToFavourites();
    this.handleAddToCart();
  }

  setProducts(newArr) {
    this.products = newArr;
  }

  handleMouseEvent() {
    if (this.productsSelector !== null) {
      this.productsSelector.forEach(product => {
        product.addEventListener("mouseover", this.mouseOver.bind(this));
        product.addEventListener("mouseleave", this.mouseLeave.bind(this));
      });
    } else return;
  }
  handleAddToFavourites() {
    if (this.likesSelector !== null)
      this.likesSelector.forEach(like => {
        like.addEventListener("click", this.addToFavourites.bind(this));
      });
  }
  handleAddToCart() {
    if (this.bagBtnsSelector !== null) {
      this.bagBtnsSelector.forEach(btn => {
        btn.addEventListener("click", e => this.addToCart(e));
      });
    }
  }
  findProductById(id) {
    return this.products.find(product => product.getId() === id);
  }
  mouseOver(e) {
    const productId = parseFloat(e.currentTarget.dataset.id);
    const currentProduct = this.findProductById(productId);

    if (!this.windowSize.checkIfMobile()) {
      if (!currentProduct.getAddedToCart()) {
        currentProduct
          .getSelectorImgHover()
          .classList.add("product__img-hover--active");
        currentProduct.getSelectorInPageBtn().classList.add("active");
      }
      if (!currentProduct.getFavourite()) {
        currentProduct.getSelectorInPageFav().classList.add("active");
      }
      currentProduct.setHover(true);
    } else return;
  }
  mouseLeave(e) {
    const productId = parseFloat(e.target.dataset.id);
    const currentProduct = this.findProductById(productId);

    if (!this.windowSize.checkIfMobile()) {
      if (!currentProduct.getFavourite()) {
        currentProduct.getSelectorInPageFav().classList.remove("active");
      }
      currentProduct
        .getSelectorImgHover()
        .classList.remove("product__img-hover--active");

      if (!currentProduct.getAddedToCart()) {
        currentProduct.getSelectorInPageBtn().classList.remove("active");
      }
      currentProduct.setHover(false);
    } else return;
  }

  addToFavourites(e) {
    const productId = parseFloat(e.target.closest(".product").dataset.id);
    const currentProduct = this.findProductById(productId);
    const index = this.favouritesProducts.findIndex(
      product => product.id === currentProduct.getId()
    );
    this.toggleFavouritesInHtml(currentProduct, index);
  }
  toggleFavouritesInHtml(currentProduct, index) {
    if (currentProduct.getFavourite()) {
      currentProduct.getSelectorInPageFav().innerHTML =
        '<i class="far fa-heart"></i>';
      currentProduct
        .getSelectorInPageFav()
        .classList.remove("product__like--active");

      currentProduct.setAddedToFavourites(false);
      this.favouritesProducts.splice(index, 1);
      this.saveToSessionStorage();
    } else if (!currentProduct.getFavourite()) {
      currentProduct.getSelectorInPageFav().innerHTML =
        '<i class="fas fa-heart"></i>';
      currentProduct
        .getSelectorInPageFav()
        .classList.add("product__like--active");
      currentProduct.getSelectorInPageFav().classList.add("active");
      currentProduct.setAddedToFavourites(true);
      this.favouritesProducts.push(currentProduct);

      this.saveToSessionStorage();
    }
  }
  checkFavouritesInHtml(product) {
    product.getSelectorInPageFav().innerHTML = '<i class="fas fa-heart"></i>';
    product.getSelectorInPageFav().classList.add("product__like--active");
    product.getSelectorInPageFav().classList.add("active");
  }
  addToCart(e) {
    const productId = parseFloat(
      e.currentTarget.closest(".product").dataset.id
    );
    const currentProduct = this.findProductById(productId);

    if (!currentProduct.getAddedToCart()) {
      currentProduct.setAddedToCart(true);
      currentProduct
        .getSelectorInPageBtn()
        .classList.add("product__bag--active");
      currentProduct.getSelectorInPageBtnText().innerHTML = "Added to Cart";
      currentProduct.getSelectorInPageBtnIcon().classList.add("hide");
      this.mainCart.placeInCart(currentProduct);
    }
  }
  removeAddedToCartInHtml({ id }) {
    this.products.forEach(product => {
      if (product.getId() === id) {
        product.setAddedToCart(false);
        const classess = ["active", "product__bag--active"];

        classess.forEach(name => {
          product.getSelectorInPageBtn().classList.remove(`${name}`);
        });
        product.getSelectorInPageBtnText().innerHTML = "Add to Cart";
        product.getSelectorInPageBtnIcon().classList.remove("hide");
      }
    });
  }
  showAddedToCart() {
    const { products } = this.mainCart;
    const addedToCart = this.products.filter(product => {
      const arr = products.filter(elem => product.getId() === elem.id);
      if (arr.length) return true;
      else return false;
    });

    addedToCart.forEach(product => {
      const classess = ["active", "product__bag--active"];
      classess.forEach(name =>
        product.getSelectorInPageBtn().classList.add(`${name}`)
      );
      product.setAddedToCart(true);
    });
  }
  showAddedToFavourites() {
    const data = sessionStorage.getItem("products");
    this.favouritesProducts = JSON.parse(data);
    let addedToCart;
    addedToCart = this.products.filter(product => {
      const arr = this.favouritesProducts.filter(
        elem => product.getId() === elem.id
      );
      if (arr.length) return true;
      else return false;
    });

    addedToCart.forEach(product => {
      this.checkFavouritesInHtml(product);
      product.setAddedToFavourites(true);
    });
  }
  saveToSessionStorage() {
    sessionStorage.setItem("products", JSON.stringify(this.favouritesProducts));
  }
}

export { ProductsCollection };
