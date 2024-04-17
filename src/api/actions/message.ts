import { ApiResponse, MessageType } from "@/types/entities";
import { getApi } from "..";

export interface GetMessages extends ApiResponse {
  statusCode: number;
  messages?: MessageType[];
}

export const getMessages = async (): Promise<GetMessages> => {
  const response = await getApi<GetMessages>({ url: "/messages" });
  return response;
};
