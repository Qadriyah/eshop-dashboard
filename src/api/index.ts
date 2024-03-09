import { AxiosResponse } from "axios";
import client from "./client/client";

type EndpoitProps = {
  url: string;
  data?: any;
  customHeaders: any;
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
  const response: AxiosResponse = await client.post(url, data, {
    headers: { ...headers, ...customHeaders },
  });
  if (!response.data) {
    throw new Error("Unexpected error has occured");
  }

  return response.data;
};
