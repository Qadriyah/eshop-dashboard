import * as Yup from "yup";

export const createProductValidationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  price: Yup.string().required("The price of the product is required."),
  status: Yup.string().optional(),
  stock: Yup.string().optional(),
  weight: Yup.string().optional(),
  width: Yup.string().optional(),
  height: Yup.string().optional(),
  length: Yup.string().optional(),
});
