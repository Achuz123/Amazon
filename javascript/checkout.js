import { cart, removeCart, cartdelupdate } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatcurr } from "../javascript/util/money.js";
import { delivery } from "../data/delivery.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

function rendersummary() {
  let HTML = "";
  let i = 0;

  cart.forEach((item) => {
    let match;

    products.forEach((product) => {
      if (product.id == item.product) {
        match = product;
      }
    });

    const deliveryoption = item.id;
    let deloption;

    delivery.forEach((delitem) => {
      if (delitem.id == deliveryoption) {
        deloption = delitem;
      }
    });
    const dat = dayjs();
    const del = dat.add(deloption.days, "days");
    const formatted = del.format("dddd,MMMM D");

    HTML += `<div class="cart-item-container cart-item-container-${match.id}">
            <div class="delivery-date">
              Delivery date: ${formatted}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${match.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${match.name}
                </div>
                <div class="product-price">
                  $${formatcurr(match.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${
                      item.quantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete" data-product=${
                    match.id
                  }>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryUpdate(i, item, match.id)}
                </div>
                </div>
              </div>
            </div>
          </div>`;

    i++;
  });

  //console.log(HTML);
  document.querySelector(".js-order").innerHTML = HTML;

  document.querySelectorAll(".js-delete").forEach((link) => {
    link.addEventListener("click", () => {
      removeCart(link.dataset.product);

      document
        .querySelector(`.cart-item-container-${link.dataset.product}`)
        .remove();
    });
  });

  function deliveryUpdate(i, item, productID) {
    let html = "";
    delivery.forEach((deliverys) => {
      const dat = dayjs();

      const del = dat.add(deliverys.days, "days");

      const formatted = del.format("dddd,MMMM D");

      const text =
        deliverys.id == 1 ? "FREE" : `${formatcurr(deliverys.price)}`;
      const chck = deliverys.id === item.id ? "checked" : "";
      html += `
                <div class="delivery-option js-selection-value"data-product-id="${productID}" data-delivery-option="${deliverys.id}">
                  <input type="radio" ${chck}
                    class="delivery-option-input"
                    name="delivery-option-1${i}">
                  <div>
                    <div class="delivery-option-date">
                      ${formatted}
                    </div>
                    <div class="delivery-option-price">
                      ${text}
                    </div>
                  </div>
                </div>                
               `;
    });

    return html;
  }

  document.querySelectorAll(".js-selection-value").forEach((item) => {
    item.addEventListener("click", () => {
      const delID = item.dataset.deliveryOption;
      const prodID = item.dataset.productId;

      cartdelupdate(prodID, delID);
      rendersummary();
    });
  });
}
rendersummary();
