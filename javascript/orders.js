import { order } from "../data/orderdetails.js";
import { findmatch } from "../data/products.js";

export function renderorders() {
  let html = "";
  order.forEach((orderitem) => {
    html += `<div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderitem.orderDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${orderitem.subtotal}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderitem.orderID}</div>
            </div>
          </div>
          <div class="order-details-grid">`;
    let name = "";
    let arrival = "";
    let quantity = "";
    let image = "";

    const item = orderitem.items;
    item.forEach((itemelement) => {
      name = itemelement.name;
      arrival = itemelement.deliveryDate;
      quantity = itemelement.quantity;
      image = itemelement.image;
      //console.log(itemelement);
      //console.log(name);
      //console.log(arrival);
      //console.log(quantity);
      //console.log(image);

      html += `
            <div class="product-image-container">
              <img src="${image}" />
            </div>

            <div class="product-details">
              <div class="product-name">
                ${name}
              </div>
              <div class="product-delivery-date">${arrival}</div>
              <div class="product-quantity">Quantity: ${quantity}</div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>

            
          
        `;
    });
    html += `</div></div></div>`;
  });

  document.querySelector(".js-ordergen").innerHTML = html;
}
renderorders();
