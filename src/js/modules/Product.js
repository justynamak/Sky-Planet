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

    this.generateHtml();
  }

  replaceStringInHtml(strings, cloneReplace) {
    let cloneRep = cloneReplace;
    let repValue;

    strings.map(string => {
      let repValue = Object.getOwnPropertyDescriptor(this, string).value;
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

    cloneReplace = this.replaceStringInHtml.call(this, strings, cloneReplace);
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
  setSelectors() {
    this.selectorInPage = document.querySelector(
      `.main__product-${this.number}`
    );
    this.selectorInPageBtn = this.selectorInPage.querySelector(".product__bag");
    this.selectorInPageFav = this.selectorInPage.querySelector(
      ".product__like"
    );
  }
}
export { Product };
