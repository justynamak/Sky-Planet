import { Filter } from "./Filter";
import { getValueRange } from "./getValueRange";

class Price extends Filter {
  constructor() {
    super("price");
    this.value = [];
    this.minSelector = document.querySelector(".price #from");
    this.maxSelector = document.querySelector(".price #to");
    this.selectors = document.querySelectorAll(".filter__price-value");
    getValueRange(this);
  }
  setValue() {
    const min = parseFloat(this.minSelector.value);
    const max = parseFloat(this.maxSelector.value);
    this.value = [min, max];
  }
}
export { Price };
