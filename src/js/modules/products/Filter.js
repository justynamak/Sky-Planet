class Filter {
  constructor(name) {
    this.name = name;
    this.value = null;
    this.selector = null;
  }
  getName() {
    return this.name;
  }
  getValue() {
    return this.value;
  }
  getSelector(selector) {
    this.selector = selector;
    this.setDataName();
  }
  setDataName() {
    this.selector.forEach(
      selector =>
        (selector.dataset.value = selector.querySelector(
          ".sidebar__item-text"
        ).textContent)
    );
    this.handleEvents();
  }

  handleEvents() {
    this.selector.forEach(item =>
      item.addEventListener("click", this.handleClick.bind(this))
    );
  }
  handleClick(e) {
    e.preventDefault();
    const value = e.currentTarget.dataset.value;
    this.value = value;

    this.addActiveClass();
  }
  addActiveClass() {
    this.clearActiveClasses();
    this.selector.filter(elem => {
      if (elem.dataset.value === this.value) {
        elem.classList.add("sidebar__item--active");
      }
    });
  }
  clearActiveClasses() {
    this.selector.forEach(filter =>
      filter.classList.remove("sidebar__item--active")
    );
  }
}
export { Filter };
