import * as Yup from "yup";

export const createProductValidationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  description: Yup.string().required("Desc is required"),
  price: Yup.string().required("The price of nthe product is required."),
});
