import { DISCOUNT_TYPES } from "@/utils/constants";
import * as Yup from "yup";

export const createProductValidationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  description: Yup.string().optional(),
  price: Yup.number().required("The price of nthe product is required."),
  status: Yup.string().optional(),
  stock: Yup.number()
    .min(0, "Stock must be greater than or equal to 0")
    .optional(),
  weight: Yup.number()
    .min(0, "Weight must be greater than or equal to 0")
    .optional(),
  length: Yup.number()
    .min(0, "Length must be greater than or equal to 0")
    .optional(),
  width: Yup.number()
    .min(0, "Width must be greater than or equal to 0")
    .optional(),
  height: Yup.number()
    .min(0, "Height must be greater than or equal to 0")
    .optional(),
  allowBackorders: Yup.boolean().optional(),
  discountType: Yup.string().optional(),
  fixedDiscount: Yup.number()
    .min(0, "Fixed Discount must be greater than or equal to 0")
    .when("discountType", (discountType, schema) => {
      if (discountType[0] === DISCOUNT_TYPES.fixed) {
        return schema.required("Fixed discount price is required");
      }
      return schema;
    }),
  percentDiscount: Yup.number()
    .min(0, "Percentage Discount must be greater than or equal to 0")
    .when("discountType", (discountType, schema) => {
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
  stock: Yup.number()
    .min(0, "Stock must be greater than or equal to 0")
    .optional(),
  weight: Yup.number()
    .min(0, "Weight must be greater than or equal to 0")
    .optional(),
  length: Yup.number()
    .min(0, "Length must be greater than or equal to 0")
    .optional(),
  width: Yup.number()
    .min(0, "Width must be greater than or equal to 0")
    .optional(),
  height: Yup.number()
    .min(0, "Height must be greater than or equal to 0")
    .optional(),
  allowBackorders: Yup.boolean().optional(),
  discountType: Yup.string().default(DISCOUNT_TYPES.none),
  fixedDiscount: Yup.number()
    .min(0, "Fixed Discount must be greater than or equal to 0")
    .when("discountType", (discountType, schema) => {
      if (discountType[0] === DISCOUNT_TYPES.fixed) {
        return schema.required("Fixed discount price is required");
      }
      if (discountType[0] === DISCOUNT_TYPES.none) {
        console.log("None >>>>>>>>");
        return schema.optional();
      }
      return schema;
    }),
  percentDiscount: Yup.number()
    .min(0, "Percentage Discount must be greater than or equal to 0")
    .when("discountType", (discountType, schema) => {
      if (discountType[0] === DISCOUNT_TYPES.percentage) {
        return schema.required("Percentage disctount is required");
      }
      return schema;
    }),
});
