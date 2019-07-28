import { Filter } from "./Filter";

class Colors extends Filter {
  constructor() {
    super("color");
    this.value = [];
    const selectors = [...document.querySelectorAll(".filter__color")];
    this.activeClassName = "filter__color--active";
    this.setDataName(selectors);
  }
  setDataName(selectors) {
    selectors.forEach(
      selector => (selector.dataset.value = selector.textContent)
    );
    this.setSelectors(selectors);
    this.handleEvents();
  }
}
export { Colors };
