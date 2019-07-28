import { Filter } from "./Filter";

class Categories extends Filter {
  constructor() {
    super("category");
    this.value = ["All products"];
    const selectors = [
      ...document.querySelectorAll(".categories .sidebar__item")
    ];
    this.setDataName(selectors);
    this.addActiveClass();
  }
}
export { Categories };
