import * as Yup from "yup";

export const updateSchema = Yup.object().shape({
  firstName: Yup.string().required("Please enter your First name"),
  lastName: Yup.string().required("Please enter your Last name"),
  phone: Yup.string().required("Please enter your phone number"),
});
