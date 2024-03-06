interface Invoice {
  image: string;
  title: string;
  deliverydate: string;
  sku: number;
  qty: number;
  total: number;
}

export const invoices: Invoice[] = [
  {
    image: `${window.location.origin}/assets/images/watch.webp`,
    title: "Watch",
    deliverydate: "04/04/2023",
    sku: Math.round(Math.random() * 1000000),
    qty: 2,
    total: 240,
  },
  {
    image: `${window.location.origin}/assets/images/watch.webp`,
    title: "Watch",
    deliverydate: "04/04/2023",
    sku: Math.round(Math.random() * 1000000),
    qty: 2,
    total: 240,
  },
];
