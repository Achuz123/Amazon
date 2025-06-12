export let order = JSON.parse(localStorage.getItem("order"));

if (!order) {
  order = [
    {
      orderID: "918c0e-6449-4d5c-0878-3a11d66fecdf",
      orderDate: "Thursday,June 12",
      items: [
        {
          name: "Intermediate Size Basketball",
          id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          image: "images/products/intermediate-composite-basketball.jpg",
          quantity: 1,
          price: 2095,
          deliveryDate: "Friday,June 13",
          deliveryPrice: "999",
        },
        {
          name: "Adults Plain Cotton T-Shirt - 2 Pack",
          id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
          image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
          quantity: 1,
          price: 7950,
          deliveryDate: "Thursday,June 19",
          deliveryPrice: "0",
        },
      ],
      subtotal: 100.45,
      delivery: 9.99,
      tax: 11.044,
      total: 121.48,
    },
  ];
}

export function localSaveorder() {
  localStorage.setItem("order", JSON.stringify(order));
  console.log(order);
}
