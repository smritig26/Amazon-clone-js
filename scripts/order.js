import { orders } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from "./utils/money.js";
import { Order } from "../data/orders.js";

function productsListHTML(order) {
  let productlisthtml = '';
  order.products.forEach((productDetails) => {
    const product = getProduct(productDetails.productId);
    productlisthtml += `
      <div class="product-image-container">
        <img src="${product.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-delivery-date">
          ${dayjs(productDetails.deliveryDate).format('MMMM D')}
        </div>
        <div class="product-quantity">
          ${productDetails.quantity}
        </div>
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${order.id}&productId=${productDetails.productId}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `;
  });
  return productlisthtml;
}

function renderOrderPage() {
  let orderHTML = '';

  orders.forEach((order) => {
    const orderTime = dayjs(order.placedAt).format('MMMM D, YYYY');
    const totalCostDollars = order.totalCostCents / 100;

    orderHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTime}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(totalCostDollars)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">
          ${productsListHTML(order)}
        </div>
      </div>
    `;
  });

  const ordersGrid = document.querySelector('.js-orders-grid');
  if (ordersGrid) {
    ordersGrid.innerHTML = orderHTML;
  }
}

renderOrderPage();
