interface DetailsProps {
  productName: string;
  deliverydate: string;
  image: string;
  sku: number | string;
  qty: number;
  unitPrice: number;
}

export const details: DetailsProps[] = [
  {
    productName: "Smat watch",
    deliverydate: "04/04/2023",
    image: `${window.location.origin}/assets/images/watch.webp`,
    sku: Math.round(Math.random() * 100000),
    qty: 2,
    unitPrice: 120,
  },
  {
    productName: "Smat watch",
    deliverydate: "04/04/2023",
    image: `${window.location.origin}/assets/images/watch.webp`,
    sku: Math.round(Math.random() * 100000),
    qty: 1,
    unitPrice: 50,
  },
];
