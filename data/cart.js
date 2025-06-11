export let cart = [
  {
    product: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    quantity: 5,
  },
  {
    product: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    quantity: 4,
  },
];
export function AddtoCart(name) {
  let find;
  cart.forEach((item) => {
    if (item.product === name) {
      find = item;
    }
  });

  if (find) {
    find.quantity++;
  } else {
    cart.push({
      product: name,
      quantity: 1,
    });

    console.log(cart);
  }
}

export function removeCart(item) {
  let newc = [];

  cart.forEach((product) => {
    if (product.product != item) newc.push(product);
  });

  cart = newc;
}
