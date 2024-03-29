import numeral from "numeral";
import toast from "react-hot-toast";

export type FieldError = {
  field: string;
  message: string;
};

export const formatCurrency = (amount: string | number, float = false) => {
  let format = "$0,0";
  if (!amount && amount !== 0) {
    return "";
  }
  if (float) {
    format = "$0,0.00";
  }
  return numeral(amount).format(format);
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

export const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `#${randomColor}`;
};

export const delay = (time: number) => {
  return new Promise((res) => {
    setTimeout(res, time);
  });
};
