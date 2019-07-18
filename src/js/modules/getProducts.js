import { ProductsCollection } from "./ProductsCollection";
import { Product } from "./Product";
import { Paginator } from "./Paginator";
import { WindowSize } from "./WindowSize";

export default function(config) {
  const { url, collection, mainCart, paginator, method } = config;
  const windowSize = new WindowSize();

  const formData = new FormData();
  formData.append("page", paginator.getCurrentPage());

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
        return new Product(id, name, price, image, counter, addBefore);
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
      collection.generateProducts();
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
    .then(arr => console.log(collection))
    .catch(err => console.log(err));
}
