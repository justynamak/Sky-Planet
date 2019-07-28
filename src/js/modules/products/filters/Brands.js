import { Filter } from "./Filter";

class Brands extends Filter {
  constructor() {
    super("brand");
    this.value = [];
    const selectors = [...document.querySelectorAll(".brands .sidebar__item")];
    this.setDataName(selectors);
  }
}
export { Brands };
