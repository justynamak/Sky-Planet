import getProducts from "./getProducts";

class Paginator {
  constructor() {
    this.currentPage = 0;
    this.maxPages = 0;

    this.paginationItem;
    this.paginationListSelector;
    this.pagination = document.querySelector(".pagination");
    this.arrow;
  }
  handleChangePage(config) {
    this.paginationItem.forEach(item =>
      item.addEventListener("click", e => this.changePage(e, config))
    );
  }
  changePage(e, config) {
    e.preventDefault();
    this.clearProducts();
    const currentNumber = e.currentTarget.dataset.id;
    this.currentPage = currentNumber;
    getProducts(config);
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
  createPagination(config) {
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
    this.handleChangePage(config);
  }
  clearProducts() {
    const mainGrid = document.querySelector(".main__grid");
    const cache = document.querySelectorAll(".product:not(#clone)");
    cache.forEach(element => mainGrid.removeChild(element));
  }
}
export { Paginator };
