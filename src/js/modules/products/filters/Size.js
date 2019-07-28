import { Filter } from "./Filter";

class Size extends Filter {
  constructor() {
    super("size");
    this.value = [];
    const selectors = [...document.querySelectorAll(".size .sidebar__item")];
    this.setDataName(selectors);
  }
}
export { Size };
