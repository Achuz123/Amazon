export const delivery = [
  {
    id: "1",
    days: "7",
    price: "0",
  },
  {
    id: "2",
    days: "3",
    price: "499",
  },
  {
    id: "3",
    days: "1",
    price: "999",
  },
];

export function deliverymatch(cartID) {
  let item;
  delivery.forEach((Delitem) => {
    if (Delitem.id == cartID) item = Delitem;
  });

  return item;
}
