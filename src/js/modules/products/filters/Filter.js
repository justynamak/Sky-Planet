class Filter {
  constructor(name) {
    this.name = name;
    this.value = [];
    this.selectors = null;
  }
  getName() {
    return this.name;
  }
  getValue() {
    return this.value;
  }

  setDataName(selectors) {
    selectors.forEach(
      selector =>
        (selector.dataset.value = selector.querySelector(
          ".sidebar__item-text"
        ).textContent)
    );
    this.setSelectors(selectors);
    this.handleEvents();
  }
  setSelectors(elems) {
    let selectors = {};
    elems.forEach(elem => (selectors[elem.dataset.value] = elem));
    this.selectors = selectors;
  }

  handleEvents() {
    for (let key in this.selectors) {
      this.selectors[key].addEventListener(
        "click",
        this.handleClick.bind(this)
      );
    }
  }
  handleClick(e) {
    e.preventDefault();
    const value = e.currentTarget.dataset.value;
    this.toggleItem(value);
  }
  toggleItem(value) {
    if (this.checkItemIsAddedToValue(value) && value !== "All products") {
      this.removeActiveClass(this.activeClassName, value);
      this.removeItemFromValue(value);
    } else if (value === "All products") {
      this.clearActiveClasses();
      this.value = ["All products"];

      this.addActiveClass();
    } else if (
      this.name === "category" &&
      value !== "All products" &&
      this.checkItemIsAddedToValue("All products")
    ) {
      this.removeItemFromValue();
      this.removeActiveClass();
      this.addItemToValue(value);
      this.addActiveClass(this.activeClassName, value);
    } else {
      this.addActiveClass(this.activeClassName, value);
      this.addItemToValue(value);
    }
  }
  checkItemIsAddedToValue(value) {
    if (this.value.includes(value)) return true;
    else return false;
  }
  addItemToValue(elem) {
    this.value.push(elem);
  }
  removeItemFromValue(elem = "All products") {
    const index = this.value.findIndex(item => item === elem);
    this.value.splice(index, 1);
  }
  removeActiveClass(
    className = "sidebar__item--active",
    value = "All products"
  ) {
    this.selectors[value].classList.remove(className);
  }
  addActiveClass(className = "sidebar__item--active", value = "All products") {
    this.selectors[value].classList.add(className);
  }
  clearActiveClasses(className = "sidebar__item--active") {
    for (let key in this.selectors) {
      this.selectors[key].classList.remove(className);
    }
  }
}
export { Filter };
