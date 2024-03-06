import { ObjectSchema } from "yup";

const isValid = async (schema: ObjectSchema<any>, request: any) => {
  const parsedRequest = await schema.validate(request).catch((err) => {
    return err;
  });
  return parsedRequest;
};

export default isValid;
