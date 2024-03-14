import { AxiosResponse } from "axios";
import client from "./client/client";

type EndpoitProps = {
  url: string;
  data?: any;
  customHeaders?: any;
};

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
};

export type LoginResponse = {
  statusCode: number;
  message: string;
};

export const postApi = async ({
  url,
  data,
  customHeaders,
}: EndpoitProps): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await client.post(url, data, {
      headers: { ...headers, ...customHeaders },
    });

    return response.data;
  } catch (error: any) {
    if (error?.response.data) {
      return error?.response.data;
    }

    return error.data;
  }
};

export const getApi = async ({
  url,
  customHeaders,
}: EndpoitProps): Promise<AxiosResponse> => {
  try {
    const response = await client.get(url, {
      headers: { ...headers, ...customHeaders },
    });
    return response.data;
  } catch (error: any) {
    if (error?.response.data) {
      return error.response.data;
    }

    return error?.data;
  }
};
