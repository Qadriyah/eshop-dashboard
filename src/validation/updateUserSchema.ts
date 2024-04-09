import * as Yup from "yup";

export const updateSchema = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
});
