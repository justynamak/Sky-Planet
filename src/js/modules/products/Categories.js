import { Filter } from "./Filter";

class Categories extends Filter {
  constructor() {
    super("category");
    this.value = "All products";
    const selector = [
      ...document.querySelectorAll(".categories .sidebar__item")
    ];
    this.getSelector(selector);
    this.addActiveClass();
  }
}
export { Categories };
