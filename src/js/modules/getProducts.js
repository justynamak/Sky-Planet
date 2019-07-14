import { ProductsCollection } from "./ProductsCollection";
import { Product } from "./Product";
import { Paginator } from "./Paginator";

export default function(config) {
  const { url, collection, mainCart, paginator } = config;

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
        const { id, name, price, image } = product;
        counter <= 7 ? counter++ : (counter = 0);
        return new Product(id, name, price, image, counter);
      });
    })
    .then(arr => {
      collection.setProducts(arr);
      return collection.getProducts();
    })
    .then(arr => collection.setProductsSelectors())
    .then(arr => {
      collection.showAddedToCart();
      paginator.createPagination(config);
      return arr;
    })
    .then(arr => console.log(collection))
    .catch(err => console.log(err));
}
