import { findmatch } from "../../data/products.js";
import { cart } from "../../data/cart.js";
import { formatcurr } from "../util/money.js";
import { deliverymatch } from "../../data/delivery.js";

export function price() {
  let itemmoney = 0;
  let deliverymoney = 0;
  let prod;
  let deliveryitem;

  cart.forEach((cartitem) => {
    prod = findmatch(cartitem);
    itemmoney += Number(formatcurr(prod.priceCents) * cartitem.quantity);

    deliveryitem = deliverymatch(cartitem.id);
    deliverymoney += Number(formatcurr(deliveryitem.price) * cartitem.quantity);
  });

  let html = `<div class="payment-summary-row">
              <div>Items (3):</div>
              <div class="payment-summary-money">$${itemmoney.toFixed(2)}</div>
            </div>

            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money">$${deliverymoney}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money">$${(
                itemmoney + deliverymoney
              ).toFixed(2)}</div>
            </div>

            <div class="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="payment-summary-money">$${(
                (itemmoney + deliverymoney) *
                0.1
              ).toFixed(2)}</div>
            </div>

            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money">$${(
                Number(((itemmoney + deliverymoney) * 0.1).toFixed(2)) +
                itemmoney +
                deliverymoney
              ).toFixed(2)}</div>
            </div>`;

  console.log(html);
  document.querySelector(".js-details").innerHTML = html;
}
