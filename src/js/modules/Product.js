class Product {
  constructor(id, name, price, image, count) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.number = count;
    this.hover = false;
    this.favourite = false;
    this.addedToCart = false;
    this.big = false;
    this.selectorInPage;
    this.selectorInPageBtn;
    this.selectorInPageFav;
    this.temporaryImage = "photo";

    this.generateHtml();
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getPrice() {
    return this.price;
  }
  getImage() {
    return this.image;
  }
  getTemporaryImage() {
    return this.temporaryImage;
  }
  getHover() {
    return this.hover;
  }
  getFavourite() {
    return this.favourite;
  }
  getAddedToCart() {
    return this.addedToCart;
  }
  getSelectorInPage() {
    return this.selectorInPage;
  }
  getSelectorInPageBtn() {
    return this.selectorInPageBtn;
  }
  getSelectorInPageBtnText() {
    return this.selectorInPageBtnText;
  }
  getSelectorInPageBtnIcon() {
    return this.selectorInPageBtnIcon;
  }
  getSelectorInPageFav() {
    return this.selectorInPageFav;
  }
  getSelectorImgHover() {
    return this.selectorImgHover;
  }
  setHover(val) {
    this.hover = val;
  }
  setAddedToFavourites(val) {
    this.favourite = val;
  }
  setAddedToCart(val) {
    this.addedToCart = val;
  }

  setSelectors() {
    this.selectorInPage = document.querySelector(
      `.main__product-${this.number}`
    );
    this.selectorInPageBtn = document.querySelector(
      `.main__product-${this.number} .product__bag`
    );
    this.selectorInPageFav = document.querySelector(
      `.main__product-${this.number} .product__like`
    );
    this.selectorImgHover = document.querySelector(
      `.main__product-${this.number} .product__img-hover`
    );
    this.selectorInPageBtnText = document.querySelector(
      `.main__product-${this.number} .product__bag .product__bag-text`
    );
    this.selectorInPageBtnIcon = document.querySelector(
      `.main__product-${this.number} .product__bag .product__bag-icon`
    );
  }

  replaceStringInHtml(strings, cloneReplace, temporaryImage) {
    let cloneRep = cloneReplace;
    let repValue;

    strings.map(string => {
      let repValue =
        string === "image" && temporaryImage
          ? this.temporaryImage
          : Object.getOwnPropertyDescriptor(this, string).value;

      cloneRep = cloneRep.replace(`{${string}}`, repValue);
    });
    return cloneRep;
  }
  generateHtml() {
    const mainGrid = document.querySelector(".main__grid");
    const clone = document.querySelector("#clone").cloneNode(true);

    clone.removeAttribute("id");
    clone.removeAttribute("style");
    const cloneHtml = clone.outerHTML;
    let cloneReplace = cloneHtml.toString();
    const strings = [
      "number",
      "id",
      "name",
      "price",
      "image",
      "image",
      "image"
    ];
    const temporaryImage = this.id < 8 ? false : true;

    cloneReplace = this.replaceStringInHtml.call(
      this,
      strings,
      cloneReplace,
      temporaryImage
    );
    const insert = document.createElement("article");

    mainGrid.appendChild(insert);
    insert.outerHTML = cloneReplace;
    if (this.number === 3) this.addClassBig();
    this.setSelectors();
    return cloneReplace;
  }

  addClassBig() {
    const product3 = document.querySelector(".main__product-3");
    const product3Img = [...product3.querySelectorAll(".product__img")];
    product3Img.forEach(img => img.classList.add("product__img--big"));
    this.big = true;
  }
}
export { Product };
