import {cart,removeFromCart,calculateCartQunatity,updateQuantity,updateDeliveryOptions} from '../../data/cart.js';
import { products,getProduct } from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions,getDeliveryOption,calculateDeliveryDate} from '../../data/deliveryoptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

// const today = dayjs();
// const deliveryDate = today.add(7, 'days');
// const tempa = today.subtract(1,'months');


// // console.log(deliveryDate);
// console.log(tempa.format('dddd'));

// function isWeekend(date){
//     const day = date.format('dddd');
//     return day === 'Saturday' || day === 'Sunday';
// }
// let date = dayjs();
// console.log(isWeekend(date));

export function renderOrderSummary(){

let cartSummaryHTML = '';
cart.forEach((cartItem) => {

    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    
    // console.log(matchingProduct);
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    // const today = dayjs();
    // const deliveryDate = today.add(deliveryOption.deliveryDays , 'days');
    // const datestring = deliveryDate.format(
    //     'dddd , MMMM D'
    // );

    const datestring = calculateDeliveryDate(deliveryOption);
    
    cartSummaryHTML += 
`<div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: ${datestring}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name js-product-name-${matchingProduct.id}">
               ${matchingProduct.name}
            </div>
            <div class="product-price js-product-price-${matchingProduct.id} ">
                ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                <span class="quantity-label">
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity" data-product-id = "${matchingProduct.id}">
                Update
                </span>
                <input class = "quantity-input js-quantity-input-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                <span class = "save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
                <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id = "${matchingProduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            
            ${deliveryOptionsHtml(matchingProduct,cartItem)}
            </div>
        </div>
        </div>`
});

function deliveryOptionsHtml(matchingProduct,cartItem){
    let html = '';
deliveryOptions.forEach((deliveryOption) => {
    const datestring = calculateDeliveryDate(deliveryOption);

    const pricestring = deliveryOption.priceCents === 0 
    ? 'FREE'
    : `$${formatCurrency(deliveryOption.priceCents)} -`;
    const ischecked = deliveryOption.id === cartItem.deliveryOptionId;
    html += 
    `<div class="delivery-option js-delivery-option js-del-option-${matchingProduct.id}-${deliveryOption.id}"
    data-product-id = "${matchingProduct.id}"
    data-delivery-option-id = "${deliveryOption.id}">
            
               <input type="radio" ${ischecked ?'checked' : ' '}
                    class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        ${datestring}
                    </div>
                    <div class="delivery-option-price">
                        ${pricestring} Shipping
                    </div>
                    </div>
                </div>`
                
});
return html;
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
// console.log(cartSummaryHTML);

document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click' , () => {
        // console.log('delete');
        const productId = link.dataset.productId;
        // console.log(productId);
        removeFromCart(productId);
        // console.log(cart);

        // const container = document.querySelector(`.js-cart-item-container-${productId}`);
        // // console.log(container);
        // container.remove();
        // updateCartQuantity();
        renderOrderSummary();
        renderPaymentSummary();

    });
});
// function updateCartQuantity(){
//     const cartquantity = calculateCartQunatity();
    

//       document.querySelector('.js-header-update').innerHTML = `${cartquantity}`;
//     //   if(cartquantity!=0){
//     //   document.querySelector('.js-cart-quantity').innerHTML = cartquantity;
//     }

// updateCartQuantity();
renderCheckoutHeader();

// calculateCartQunatity();



// updateCartQuantity();

// document.querySelectorAll('.js-update-quantity').forEach((link)=>{
//     link.addEventListener('click',()=>{
//       const{productId} = link.dataset;
//       const container = document.querySelector(`.js-cart-item-container-${productId}`);
//       container.classList.add('is-editing-quantity');
      
//     });
//   });

document.querySelectorAll('.js-update-quantity').forEach((link) => {
    link.addEventListener('click' , ()=> {
        const productId = link.dataset.productId;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');

    });
});

function saveQuantity(productId){
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
        if(container){
            container.classList.remove('is-editing-quantity');
        }
        const quant = document.querySelector(`.js-quantity-input-${productId}`);
        const newQuant = Number(quant.value);
        // console.log(newQuant);
        updateQuantity(productId,newQuant);
        if(newQuant < 0  || newQuant >= 1000){
            alert('Enter a Valid Quantity');
            return;
        }

       else if(newQuant === 0){
            container.remove();
            // updateCartQuantity();
            renderCheckoutHeader();
            removeFromCart(productId);
        }

        const label = document.querySelector(`.js-quantity-label-${productId}`);
        
        label.innerHTML = newQuant;
        
        // updateQuantity(productId,newQuant);
        // updateCartQuantity();
        renderCheckoutHeader();
}

document.querySelectorAll('.save-quantity-link').forEach((link) => {
    link.addEventListener('click' , () =>{
        // console.log('checkhed');
        const productId = link.dataset.productId;
        saveQuantity(productId);
        renderPaymentSummary();
    });
});



document.querySelectorAll('.quantity-input').forEach((link) => {
    link.addEventListener('keydown' , (event) => {
        if(event.key === 'Enter'){
           const productId = link.dataset.productId;
           saveQuantity(productId);
           renderPaymentSummary();
        }
    })
})



document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click' , () => {
        const {productId , deliveryOptionId} = element.dataset;
        updateDeliveryOptions(productId , deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
    })
})

}

// renderOrderSummary();