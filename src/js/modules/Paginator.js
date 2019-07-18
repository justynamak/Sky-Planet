import getProducts from "./getProducts";
import { WindowSize } from "./WindowSize";
import { ProductsCollection } from "./ProductsCollection";

class Paginator {
  constructor(collection) {
    this.currentPage = 0;
    this.maxPages = 0;
    this.minPage;
    this.maxPage;
    this.clear = false;
    this.paginationItem;
    this.paginationListSelector;
    this.pagination = document.querySelector(".pagination");
    this.buttonMoreSelector = document.querySelector(".pagination__more");
    this.buttonPrevSelector = document.querySelector(".main__prev");
    this.arrow;
    this.windowSize = new WindowSize();
    this.collection = collection;
    this.event = false;
    this.handleChangePageByArrow();
  }
  getCurrentPage() {
    return this.currentPage;
  }
  getMaxPages() {
    return this.maxPages;
  }
  setCurrentPage(number) {
    this.currentPage = number;
  }
  setMaxPages(number) {
    this.maxPages = number;
  }
  setConfig(config) {
    this.config = config;
  }
  setMinPage() {
    if (!this.minPage) {
      this.minPage = this.currentPage;
    }
  }
  setMaxPage() {
    if (!this.maxPage) {
      this.maxPage = this.currentPage;
    }
  }
  handleChangePage() {
    this.paginationItem.forEach(item =>
      item.addEventListener("click", e => this.changePage(e))
    );
  }
  handleChangePageMobile() {
    this.buttonMoreSelector.addEventListener("click", e =>
      this.changePageByButtonMore()
    );
    this.buttonPrevSelector.addEventListener("click", e =>
      this.changePageByButtonPrev()
    );
  }
  handleChangePageByArrow() {
    this.pagination.addEventListener("click", e => this.changePageByArrow(e));
  }

  nextPage() {
    if (this.currentPage < this.maxPages) {
      this.currentPage = this.maxPage + 1;
    }
    this.maxPage = this.currentPage;
    console.log(this);
  }
  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage = this.minPage - 1;
    }
    this.minPage = this.currentPage;
    console.log(this);
  }
  toggleButtonMore() {
    //tu zamiast 39 właściwość z serwera
    // const lastProductIsVisible =
    //   this.collection.findProductById(39) !== undefined ? true : false;
    const lastPageIsVisible =
      this.maxPage === this.maxPages || this.currentPage === this.maxPages
        ? true
        : false;
    console.log(lastPageIsVisible);
    if (lastPageIsVisible) {
      this.buttonMoreSelector.classList.add("hide");
    } else {
      this.buttonMoreSelector.classList.remove("hide");
    }
  }
  toggleButtonPrev() {
    const firstPageIsVisible =
      this.minPage <= 1 || this.currentPage <= 1 ? true : false;
    console.log(firstPageIsVisible, this);
    if (firstPageIsVisible) {
      this.buttonPrevSelector.classList.add("hide");
    } else {
      this.buttonPrevSelector.classList.remove("hide");
    }
  }
  changePageByButtonMore() {
    this.setMaxPage();
    this.nextPage();
    this.config.method = "addAfter";
    getProducts(this.config);
    this.toggleButtonMore();
  }
  changePageByButtonPrev() {
    this.setMinPage();
    this.prevPage();
    this.collection.clearProductsInHtml();
    this.toggleButtonMore();
    this.config.method = "addBefore";
    getProducts(this.config);
    this.toggleButtonPrev();
  }
  changePage(e) {
    e.preventDefault();
    let currentNumber;
    this.collection.clearProductsInHtml();
    currentNumber = e.currentTarget.dataset.id;
    this.currentPage = currentNumber;
    getProducts(this.config);
  }
  changePageByArrow(e) {
    if (e.target === this.arrow) {
      this.collection.clearProductsInHtml();
      this.currentPage = this.currentPage + 1;
      getProducts(this.config);
    }
  }

  createPagination() {
    if (!this.windowSize.checkIfMobile()) {
      this.pagination.innerHTML = "";
      const ul = document.createElement("ul");
      ul.classList.add("pagination__list");
      this.pagination.appendChild(ul);
      this.paginationListSelector = document.querySelector(".pagination__list");

      for (let i = 1; i <= this.maxPages; i++) {
        let li = document.createElement("li");
        this.paginationListSelector.appendChild(li);
        li.setAttribute("data-id", `${i}`);
        li.classList.add("pagination__item");
        this.paginationItem = document.querySelectorAll(".pagination__item");

        const nth = document.querySelector(`.pagination__item:nth-child(${i})`);
        let a = document.createElement("a");
        a.textContent = `0${i}`;
        a.href = "#";
        nth.appendChild(a);
      }
      if (this.maxPages > 1 && this.maxPages !== this.currentPage) {
        const arrow = document.createElement("img");
        arrow.src = "./assets/iconmonstr-arrow-right-thin.svg";
        this.pagination.appendChild(arrow);
        arrow.classList.add("pagination__arrow");
        this.arrow = document.querySelector(".pagination__arrow");
      }
      document
        .querySelector(`.pagination__item:nth-child(${this.currentPage})`)
        .classList.add("pagination__item--active");
      this.handleChangePage();
    } else if (!this.event && this.windowSize.checkIfMobile()) {
      this.handleChangePageMobile();
      this.event = true;
      this.toggleButtonPrev();
      this.toggleButtonMore();
    }
  }

  showCurrentPage() {
    if (!this.windowSize.checkIfMobile()) {
      this.collection.clearProductsInHtml();
      getProducts(this.config);
      this.clear = false;
      this.minPage = 0;
      this.maxPage = 0;
    } else {
      this.setMinPage();
      this.setMaxPage();
      this.toggleButtonMore();
      this.toggleButtonPrev();
      if (!this.clear) {
        this.collection.clearProducts();
        this.clear = true;
        getProducts(this.config);
      }
    }
  }
}

export { Paginator };
