import numeral from "numeral";
import toast from "react-hot-toast";

export type FieldError = {
  field: string;
  message: string;
};

export const formatCurrency = (amount: string | number) => {
  if (!amount && amount !== 0) {
    return "";
  }
  return numeral(amount).format("$0,0");
};

export const getInitials = (name?: string) => {
  if (!name) {
    return "";
  }
  return name
    ?.match(/(\b\S)?/g)
    ?.join("")
    ?.toUpperCase();
};

export const formatErrors = (errors: FieldError[]) => {
  return Object.assign(
    {},
    ...errors.map((err) => ({
      [err.field]: err.message,
    }))
  );
};

export const notify = (message: string, type?: string) => {
  if (type === "error") {
    return toast.error(message);
  }
  if (type === "success") {
    return toast.success(message);
  }
  return toast(message);
};
