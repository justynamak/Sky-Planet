import { ProductsCollection } from "./ProductsCollection";
import { Product } from "./Product";

export default function(url, collection, mainCart) {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(data => {
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
    .then(arr => collection.setProducts(arr))
    .then(arr => collection.getProductsSelectors())
    .then(arr => {
      collection.handleMouseEvent();
      collection.handleAddToFavourites();
      collection.handleAddToCart(mainCart);
      mainCart.handleRemoveFromCart(collection);
      return arr;
    })
    .then(arr => console.log(collection))
    .catch(err => console.log(err));
}
