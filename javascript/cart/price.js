import { findmatch } from "../../data/products.js";
import { cart, localSave } from "../../data/cart.js";
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

    showOrderConfirmation(orderId, itemmoney, deliverymoney);
  });
}

function generateOrderId() {
  return "xxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx".replace(/[x]/g, function () {
    return ((Math.random() * 16) | 0).toString(16);
  });
}

function showOrderConfirmation(orderId, itemmoney, deliverymoney) {
  const confirmationHTML = `
    <div id="confirmation-box" class="confirmation-box">
      <div class="confirmation-content">
        <div class="confetti-container"></div>
        <i class="fas fa-check-circle"></i>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your purchase. Your order has been received and is being processed.</p>
        <div class="order-details">
          <p><strong>Order ID:</strong> <span class="js-order-id">${
            orderId || "N/A" || "N/A"
          }</span></p>
          <p><strong>Total:</strong> $<span class="js-order-total">${
            itemmoney?.toFixed(2) || "0.00"
          }</span></p>
          <p><strong>Estimated Delivery:</strong> <span class="js-delivery-date">${
            deliverymoney || "3-5 business days"
          }</span></p>
        </div>
        <button id="close-confirmation" class="continue-btn">Continue Shopping</button>
      </div>
    </div>
  `;

  // Add the confirmation box to the body if it doesn't exist
  if (!document.getElementById("confirmation-box")) {
    document.body.insertAdjacentHTML("beforeend", confirmationHTML);

    // Add the CSS styles
    const style = document.createElement("style");
    style.textContent = `
      .confirmation-box {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 1000;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s;
      }
      
      .confirmation-box.show {
        display: flex;
      }
      
      .confirmation-content {
        background-color: white;
        padding: 30px;
        border-radius: 10px;
        text-align: center;
        max-width: 500px;
        width: 90%;
        position: relative;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        overflow: hidden;
      }
      
      .confirmation-content i {
        font-size: 60px;
        color: #4CAF50;
        margin-bottom: 20px;
      }
      
      .confirmation-content h2 {
        margin-bottom: 15px;
        color: #333;
      }
      
      .confirmation-content p {
        margin-bottom: 20px;
        color: #666;
      }
      
      .order-details {
        text-align: left;
        background: #f9f9f9;
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 20px;
      }
      
      .order-details p {
        margin-bottom: 8px;
      }
      
      .continue-btn {
        background-color: #4CAF50;
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s;
      }
      
      .continue-btn:hover {
        background-color: #45a049;
      }
      
      /* Confetti animation */
      .confetti-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: -1;
      }
      
      .confetti {
        position: absolute;
        width: 10px;
        height: 10px;
        opacity: 0.7;
        animation: confetti-fall linear infinite;
        border-radius: 50%;
      }
      
      @keyframes confetti-fall {
        0% {
          transform: translateY(-100px) rotate(0deg);
        }
        100% {
          transform: translateY(100vh) rotate(360deg);
        }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    let htmlforempty = `
  <div style="width: 60%; margin: 100px auto; text-align: center; font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 40px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); background-color: #fff;">
    <h2 style="color: #002f6c; font-size: 24px; margin-bottom: 20px;">
      Your Cart is Empty
    </h2>
    <p style="font-size: 18px; color: #555;">
      Looks like you haven't added anything to your cart yet.
    </p>
    <a
      href="\peedika.html"
      style="display: inline-block; margin-top: 30px; padding: 12px 25px; font-size: 16px; background-color: #0099ff; color: white; text-decoration: none; border-radius: 5px;"
    >
      Start Shopping
    </a>
  </div>
`;

    // Add event listener for closing the confirmation
    document
      .getElementById("close-confirmation")
      .addEventListener("click", () => {
        document.querySelector(".js-order").innerHTML = htmlforempty;
        cart.length = 0;
        document.getElementById("confirmation-box").classList.remove("show");
        localSave();
      });
  }

  // Create confetti elements
  const container = document.querySelector(".confetti-container");
  container.innerHTML = "";

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDuration = `${3 + Math.random() * 4}s`;
    confetti.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(confetti);
  }

  // Show the confirmation box
  document.getElementById("confirmation-box").classList.add("show");
}
