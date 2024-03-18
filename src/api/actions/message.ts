import { ErrorType, MessageType } from "@/types/entities";
import { getApi, postApi } from "..";

export type GetMessages = {
  statusCode: number;
  messages?: MessageType[];
  errors?: ErrorType[];
};

export const getMessages = async (): Promise<GetMessages> => {
  const response = await getApi<GetMessages>({ url: "/messages" });
  return response;
};
