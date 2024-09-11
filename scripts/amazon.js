// const products = [
//   {
//       image : 'images/products/athletic-cotton-socks-6-pairs.jpg',
//       name :  'Black and Gray Athletic Cotton Socks - 6 Pairs',
//       ratings : {
//           stars : 4.5,
//           count : 87
//       },
//       pricecents : 1090
//   },
//   {
//      image : 'images/products/intermediate-composite-basketball.jpg',
//      name : 'Intermediate Size Basketball',
//      ratings : {
//       stars : 4,
//       count : 127,
//      },
//      pricecents : 2095 
//   },
//   {
//       image : 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//      name : ' Adults Plain Cotton T-Shirt - 2 Pack',
//      ratings : {
//       stars : 4.5,
//       count : 56,
//      },
//      pricecents : 799
//   },
//   {
//     image : 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//    name : ' Adults Plain Cotton T-Shirt - 2 Pack',
//    ratings : {
//     stars : 4.5,
//     count : 56,
//    },
//    pricecents : 799
// }
// ];
import {cart,addToCart,calculateCartQunatity} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
let productshtml = '';
products.forEach((product) => {
    productshtml +=
     ` <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart new-added-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`
        ;

        // console.log(html);
});

// console.log(productshtml);
document.querySelector('.js-products-grid').innerHTML = productshtml;



function updateCartQuantity(){
  const cartquantity = calculateCartQunatity();
  document.querySelector('.js-cart-quantity').innerHTML = cartquantity;
}
updateCartQuantity();
// calculateCartQunatity();
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  let addedTimeoutId;
  button.addEventListener('click', () => {
    
      const {productId} = button.dataset;
      const val = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
      
      
      addToCart(productId,val);
    

      updateCartQuantity();
      
      const msg = document.querySelector(`.new-added-${productId}`);

      
      
      msg.classList.add('added-activated');
      
      if(addedTimeoutId){
        clearTimeout(addedTimeoutId);
      }
      const timeoutId = setTimeout(() => {
        msg.classList.remove('added-activated');
      },2000);

      addedTimeoutId = timeoutId;
    
  });
});


