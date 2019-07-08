import { WindowSize } from "./WindowSize";

class ProductsCollection {
  constructor() {
    this.products = [];

    this.productsSelector = null;
    this.bagBtnsSelector = null;
    this.likesSelector = null;

    this.windowSize = new WindowSize();
    this.handleAddToCart();

    window.addEventListener("resize", this.showAddedElements.bind(this));
  }

  addProduct(product) {
    this.products.push(product);
  }
  getProductsSelectors() {
    this.productsSelector = [
      ...document.querySelectorAll(".product:not(#clone)")
    ];
    this.likesSelector = [...document.querySelectorAll(".product__like")];
    this.bagBtnsSelector = [...document.querySelectorAll(".product__bag")];
  }

  getAddedToCart() {
    return this.products.filter(product => product.addedToCart);
  }
  getNotAddedToCart() {
    return this.products.filter(product => !product.addedToCart);
  }
  getAddedToFavourites() {
    return this.products.filter(product => product.favourite);
  }
  getProducts() {
    return this.products;
  }
  setProducts(newArr) {
    this.products = newArr;
    return this.products;
  }
  setAddedToFavourites(id) {
    this.products.forEach(product => {
      if (product.id === id) {
        product.favourite = true;
      }
    });
  }
  setAddedToCart(id) {
    this.products.forEach(product => {
      if (product.id === id) {
        product.addedToCart = true;
      }
    });
  }
  showAddedElements() {
    const addedToCart = this.getAddedToCart();
    const addedToFav = this.getAddedToFavourites();

    addedToCart.forEach(product =>
      product.selectorInPageBtn.classList.add("active")
    );
    addedToFav.forEach(product =>
      product.selectorInPageFav.classList.add("active")
    );
  }
  removeAddedToCartInHtml() {
    const classess = ["active", "product__bag--active"];
    const notAdded = this.getNotAddedToCart();
    notAdded.forEach(product =>
      product.selectorInPageBtn.classList.remove(...classess)
    );
  }
  removeAddedToFavourites(id) {
    this.products.forEach(product => {
      if (product.id === id) {
        product.favourite = false;
      }
    });
  }
  removeAddedToCart(id) {
    this.products.forEach(product => {
      if (product.id === id) {
        product.addedToCart = false;
      }
    });
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
  handleAddToCart(mainCart) {
    if (this.bagBtnsSelector !== null) {
      this.bagBtnsSelector.forEach(btn => {
        btn.addEventListener("click", e => this.addToCart(e, mainCart));
      });
    }
  }
  findProductById(id) {
    return this.products.find(product => product.id === id);
  }
  mouseOver(e) {
    const productId = parseFloat(e.currentTarget.dataset.id);
    const currentProduct = this.findProductById(productId);

    if (!this.windowSize.checkIfMobile()) {
      const like = e.currentTarget.querySelector(".product__like");
      const bagBtn = e.currentTarget.querySelector(".product__bag");

      if (!currentProduct.addedToCart) {
        e.currentTarget
          .querySelector(".product__img-hover")
          .classList.add("product__img-hover--active");
        bagBtn.classList.add("active");
      }
      if (!currentProduct.favourite) {
        like.classList.add("active");
      }
      this.products.forEach(product => {
        if (product.id === productId) {
          product.hover = true;
        }
        return true;
      });
    } else return;
  }
  mouseLeave(e) {
    const productId = parseFloat(e.target.dataset.id);
    const currentProduct = this.findProductById(productId);

    if (!this.windowSize.checkIfMobile()) {
      const like = e.currentTarget.querySelector(".product__like");
      const btnBag = e.currentTarget.querySelector(".product__bag");

      if (!currentProduct.favourite) {
        like.classList.remove("active");
      }
      e.currentTarget
        .querySelector(".product__img-hover")
        .classList.remove("product__img-hover--active");

      if (!currentProduct.addedToCart) {
        btnBag.classList.remove("active");
      }
    } else return;
  }

  addToFavourites(e) {
    const productId = parseFloat(e.target.closest(".product").dataset.id);
    const currentProduct = this.findProductById(productId);

    if (currentProduct.favourite) {
      e.currentTarget.innerHTML = '<i class="far fa-heart"></i>';
      e.currentTarget.classList.remove("product__like--active");
      this.removeAddedToFavourites(productId);
    } else if (!currentProduct.favourite) {
      e.currentTarget.innerHTML = '<i class="fas fa-heart"></i>';
      e.currentTarget.classList.add("product__like--active");
      this.setAddedToFavourites(productId);
    }
  }

  addToCart(e, mainCart) {
    const productId = parseFloat(
      e.currentTarget.closest(".product").dataset.id
    );
    const currentProduct = this.findProductById(productId);

    if (!currentProduct.addedToCart) {
      this.setAddedToCart(productId);
      e.currentTarget.classList.add("product__bag--active");
      e.currentTarget.textContent = "Added to Cart";
      mainCart.placeInCart(currentProduct);
    }
  }
}

export { ProductsCollection };
