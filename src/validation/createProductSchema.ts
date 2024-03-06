import * as Yup from "yup";

export const createProductValidationSchema = Yup.object().shape({
  productName: Yup.string().required("Product name is required"),
  description: Yup.string().required("Desc is required"),
});
