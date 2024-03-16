import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface products {
  key?: string;
  productName: string;
  productId: string;
  price: number | string;
  status: string;
  discount?: string | number;
  description?: any;
  image?: string;
  images?: string[];
}
// payload props
interface ProductPayload extends products {
  discountType?: string;
  productId: string;
  percentDiscount?: number | number[];
  fixedDiscount?: string | number;
}

const initialState: products[] = [
  {
    key: `${Math.round(Math.random() * 10000)}`,
    productName: "T-Shirt",
    productId: `${Math.round(Math.random() * 10000)}`,
    price: 100,
    status: "Draft",
    image: "/assets/images/watch.webp",
  },
  {
    key: `${Math.round(Math.random() * 10000)}`,
    productName: "Trouser",
    productId: `${Math.round(Math.random() * 10000)}`,
    price: 150,
    status: "Inactive",
    image: "/assets/images/watch.webp",
  },
];

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    createProduct: (state, action: PayloadAction<ProductPayload>) => {
      state.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const productIndex = state.findIndex(
        (product) => product.productId === productId
      );
      state.splice(productIndex, 1);
    },
    editProduct: (state, action: PayloadAction<ProductPayload>) => {
      const {
        productId,
        productName,
        price,
        status,
        discountType,
        description,
        image,
      } = action.payload;
      const existingProduct = state.find(
        (product) => product.productId === productId
      );
      if (!existingProduct) {
        return state;
      }
      existingProduct.productName = productName;
      existingProduct.price = price;
      existingProduct.status = status;
      existingProduct.discount = discountType;
      existingProduct.description = description;
      existingProduct.image = image;
    },
  },
});

export const { createProduct, deleteProduct, editProduct } =
  productSlice.actions;

export default productSlice;
