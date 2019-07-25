import { Filter } from "./Filter";
import { Categories } from "./Categories";
import { Price } from "./Price";
import getProducts from "./getProducts";
import config from "./index";

class FilterCollection {
  constructor() {
    this.filters = [];

    const collection = [new Categories(), new Price()];
    this.addToCollection(collection);
  }
  addToCollection(collection) {
    collection.forEach(elem => this.filters.push(elem));
  }
  getFilters() {
    let filters = {};

    this.filters.forEach(filter => {
      filters[filter.getName()] = filter.getValue();
    });

    return filters;
  }
}
export { FilterCollection };
