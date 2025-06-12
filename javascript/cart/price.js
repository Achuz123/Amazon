import { findmatch } from "../../data/products.js";
import { cart } from "../../data/cart.js";
import { formatcurr } from "../util/money.js";
import { deliverymatch, delivery } from "../../data/delivery.js";
import { order, localSaveorder } from "../../data/orderdetails.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export function price() {
  const dat = dayjs();
  const formatted = dat.format("dddd,MMMM D");
  let formatted123 = "";

  let itemmoney = 0;
  let deliverymoney = 0;
  const orderItems = [];

  cart.forEach((cartitem) => {
    const delivery = deliverymatch(cartitem.id);

    const del = dat.add(delivery.days, "days");
    formatted123 = del.format("dddd,MMMM D");

    const prod = findmatch(cartitem);
    itemmoney += Number(formatcurr(prod.priceCents) * cartitem.quantity);

    const deliveryitem = deliverymatch(cartitem.id);
    deliverymoney += Number(formatcurr(deliveryitem.price) * cartitem.quantity);

    orderItems.push({
      name: prod.name,
      id: prod.id,
      image: prod.image,
      quantity: cartitem.quantity,
      price: prod.priceCents,
      deliveryDate: formatted123,
      deliveryPrice: deliveryitem.price,
    });
  });

  let html = `<div class="payment-summary-row">
              <div>Items (${cart.length}):</div>
              <div class="payment-summary-money">$${itemmoney.toFixed(2)}</div>
            </div>

            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money">$${deliverymoney.toFixed(
                2
              )}</div>
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
            </div>
             <button class="place-order-button button-primary js-ordercapture">
            Place your order
          </button>`;

  document.querySelector(".js-details").innerHTML = html;

  document.querySelector(".js-ordercapture").addEventListener("click", () => {
    const orderId = generateOrderId();
    order.push({
      orderID: orderId,
      orderDate: formatted,
      items: orderItems,
      subtotal: itemmoney,
      delivery: deliverymoney,
      tax: (itemmoney + deliverymoney) * 0.1,
      total:
        Number(((itemmoney + deliverymoney) * 0.1).toFixed(2)) +
        itemmoney +
        deliverymoney,
    });
    localSaveorder(order);
  });
}

function generateOrderId() {
  return "xxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx".replace(/[x]/g, function () {
    return ((Math.random() * 16) | 0).toString(16);
  });
}
