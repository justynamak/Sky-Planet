import getProducts from "./getProducts";
import { WindowSize } from "./WindowSize";

class Paginator {
  constructor() {
    this.currentPage = 0;
    this.maxPages = 0;

    this.paginationItem;
    this.paginationListSelector;
    this.pagination = document.querySelector(".pagination");
    this.buttonMoreSelector = document.querySelector(".more");
    this.arrow;
    this.windowSize = new WindowSize();
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
  handleChangePage() {
    this.paginationItem.forEach(item =>
      item.addEventListener("click", e => this.changePage(e))
    );
  }
  handleChangePageMobile() {
    this.buttonMoreSelector.addEventListener("click", e =>
      this.changePage(e, true)
    );
  }
  handleChangePageByArrow() {
    this.pagination.addEventListener("click", e => this.changePageByArrow(e));
  }
  nextPage() {
    this.currentPage = this.currentPage + 1;
  }
  toggleButtonMore() {
    if (this.currentPage >= this.maxPages) {
      this.buttonMoreSelector.classList.add("hide");
    } else {
      this.buttonMoreSelector.classList.remove("hide");
    }
  }

  changePage(e, mobile = false) {
    e.preventDefault();
    let currentNumber;
    if (!mobile) {
      this.clearProducts();
      currentNumber = e.currentTarget.dataset.id;
      this.currentPage = currentNumber;
    } else {
      this.nextPage();
      this.toggleButtonMore();
    }
    getProducts(this.config);
  }
  changePageByArrow(e) {
    if (e.target === this.arrow) {
      this.clearProducts();
      this.nextPage();
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
    }
  }

  clearProducts() {
    const mainGrid = document.querySelector(".main__grid");
    const cache = document.querySelectorAll(".product:not(#clone)");
    cache.forEach(element => mainGrid.removeChild(element));
  }
  showCurrentPage() {
    if (!this.windowSize.checkIfMobile()) {
      this.clearProducts();
      getProducts(this.config);
    } else this.toggleButtonMore();
  }
}
export { Paginator };
