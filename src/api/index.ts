import { HttpRequestHeader } from "antd/es/upload/interface";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true; // adds cookies to the request
axios.defaults.baseURL = baseURL;

type EndpoitProps = {
  url: string;
  data?: any;
  customHeaders?: HttpRequestHeader;
};

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
};

export const postApi = async <T>({
  url,
  data,
  customHeaders = {},
}: EndpoitProps): Promise<T> => {
  try {
    const response = await axios.request<T>({
      method: "POST",
      url,
      headers: { ...headers, ...customHeaders },
      data,
    });
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return error.response.data;
    }
    if (error?.data) {
      return error.data;
    }
    return error;
  }
};

export const getApi = async <T>({
  url,
  customHeaders = {},
}: EndpoitProps): Promise<T> => {
  try {
    const response = await axios.request<T>({
      method: "GET",
      url,
      headers: { ...headers, ...customHeaders },
    });
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return error.response.data;
    }
    if (error?.data) {
      return error.data;
    }
    return error;
  }
};

export const putApi = async <T>({
  url,
  data,
  customHeaders = {},
}: EndpoitProps): Promise<T> => {
  try {
    const response = await axios.request<T>({
      method: "PUT",
      url,
      headers: { ...headers, ...customHeaders },
      data,
    });
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return error.response.data;
    }
    if (error?.data) {
      return error.data;
    }
    return error;
  }
};

export const patchApi = async <T>({
  url,
  data,
  customHeaders = {},
}: EndpoitProps): Promise<T> => {
  try {
    const response = await axios.request<T>({
      method: "PATCH",
      url,
      headers: { ...headers, ...customHeaders },
      data,
    });
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return error.response.data;
    }
    if (error?.data) {
      return error.data;
    }
    return error;
  }
};

export const deleteApi = async <T>({
  url,
  customHeaders = {},
}: EndpoitProps): Promise<T> => {
  try {
    const response = await axios.request<T>({
      method: "DELETE",
      url,
      headers: { ...headers, ...customHeaders },
    });
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return error.response.data;
    }
    if (error?.data) {
      return error.data;
    }
    return error;
  }
};
