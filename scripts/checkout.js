import { renderOrderSummary } from './checkout/orderSummary.js';

import { renderPaymentSummary } from './checkout/paymentSummary.js';

import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { loadProducts , loadProductsFetch } from '../data/products.js';
// import '../data/cart-class.js';
import '../data/car.js';
// import '../data/backend-practice.js';
import { loadCart } from '../data/cart.js';
async function loadPage(){
    // console.log('load page');
    await loadProductsFetch();
    await new Promise((resolve) => {
        loadCart(() =>{
            resolve();
        });
    });

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
    
    // return 'value2';
}
loadPage();
// Promise.all([
//     loadProductsFetch(),
//     new Promise((resolve) => {
//         loadCart(() =>{
//             resolve('value2');
//         });
//     })
// ]).then((values) =>{
//     console.log(values)
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
// })
// new Promise((resolve) => {
    
//     loadProducts(() => {
//         resolve('value1');
//     });
    
// }).then((value) => {
//     console.log(value);
//     return new Promise((resolve) => {
//         loadCart(() =>{
//             resolve();
//         });
//     });


// }).then(() => {
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
// })
// loadProducts(() => {
//     loadCart(() => {
//         renderCheckoutHeader();

// renderOrderSummary();
// renderPaymentSummary();
//     });
    
// });
