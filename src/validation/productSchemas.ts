import { DISCOUNT_TYPES } from "@/utils/constants";
import * as Yup from "yup";

export const createProductValidationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  description: Yup.string().required("Desc is required"),
  price: Yup.number().required("The price of nthe product is required."),
  status: Yup.string().optional(),
  stock: Yup.number().optional(),
  weight: Yup.number().optional(),
  length: Yup.number().optional(),
  width: Yup.number().optional(),
  height: Yup.number().optional(),
  allowBackorders: Yup.boolean().optional(),
  discountType: Yup.string().optional(),
  fixedDiscount: Yup.number().when("discountType", (discountType, schema) => {
    if (discountType[0] === DISCOUNT_TYPES.fixed) {
      return schema.required("Fixed discount price is required");
    }
    return schema;
  }),
  percentDiscount: Yup.number().when("discountType", (discountType, schema) => {
    if (discountType[0] === DISCOUNT_TYPES.percentage) {
      return schema.required("Percentage disctount is required");
    }
    return schema;
  }),
});

export const updateProductValidationSchema = Yup.object().shape({
  name: Yup.string().optional(),
  description: Yup.string().optional(),
  price: Yup.number().optional(),
  status: Yup.string().optional(),
  stock: Yup.number().optional(),
  weight: Yup.number().optional(),
  length: Yup.number().optional(),
  width: Yup.number().optional(),
  height: Yup.number().optional(),
  allowBackorders: Yup.boolean().optional(),
  discountType: Yup.string().default(DISCOUNT_TYPES.none),
  fixedDiscount: Yup.number().when("discountType", (discountType, schema) => {
    if (discountType[0] === DISCOUNT_TYPES.fixed) {
      return schema.required("Fixed discount price is required");
    }
    return schema;
  }),
  percentDiscount: Yup.number().when("discountType", (discountType, schema) => {
    console.log(discountType, "::LL");
    if (discountType[0] === DISCOUNT_TYPES.percentage) {
      return schema.required("Percentage disctount is required");
    }
    return schema;
  }),
});
