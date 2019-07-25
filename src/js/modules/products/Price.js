import { Filter } from "./Filter";

class Price extends Filter {
  constructor() {
    super("price");
    this.value;
    this.minSelector = document.querySelector(".price #from");
    this.maxSelector = document.querySelector(".price #to");
    this.setValue();
  }
  setValue() {
    console.log(this);
  }
}
export { Price };
