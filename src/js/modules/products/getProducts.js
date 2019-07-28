import { ProductsCollection } from "./ProductsCollection";
import { Product } from "./Product";
import { Paginator } from "./Paginator";
import { WindowSize } from "../WindowSize";
import { FilterCollection } from "./filters/FilterCollection";

export default function(config) {
  const {
    url,
    collection,
    mainCart,
    paginator,
    method,
    filterCollection
  } = config;

  const windowSize = new WindowSize();
  const formData = new FormData();
  formData.append("page", paginator.getCurrentPage());
  formData.append("filters", JSON.stringify(filterCollection.getFilters()));

  fetch(url, {
    method: "post",
    body: formData
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(data => {
      paginator.setCurrentPage(data.page);
      paginator.setMaxPages(data.maxPages);
      collection.setCountProducts(data.count);
      collection.setPageLimit(data.pageLimit);
      return data.products;
    })
    .then(products => {
      let counter = 0;
      return products.map(product => {
        const addBefore = method === "addBefore" ? true : false;
        const { id, name, price, image } = product;
        if (!windowSize.checkIfMobile()) {
          counter <= 7 ? counter++ : (counter = 0);
        } else counter = id;
        return new Product(id, name, price, image, counter);
      });
    })
    .then(arr => {
      !windowSize.checkIfMobile() || method === ""
        ? collection.setProducts(arr)
        : collection.setProducts(arr, true, method);
      return collection.getProducts();
    })
    .then(arr => {
      collection.clearProductsInHtml();
      collection.showTheNumberOfProducts(paginator.getCurrentPage());
      if (collection.getProducts().length) {
        collection.hideInfoNoProducts();
        collection.generateProducts();
      } else {
        collection.showInfoNoProducts();
        paginator.clearPagination();
        return Promise.reject("no products");
      }
    })
    .then(arr => collection.setProductsSelectors())
    .then(arr => {
      mainCart.setCollection(collection);
      collection.showAddedToCart();
      collection.showAddedToFavourites();
      paginator.setConfig(config);
      paginator.createPagination();
      return arr;
    })
    .catch(err => console.log(err));
}
