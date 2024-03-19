import { ErrorType } from "@/types/entities";
import { deleteApi, postApi } from "..";

export type UploadFile = {
  statusCode: number;
  filePath: string;
  errors?: ErrorType[];
};

export const uploadProductIcon = async (
  id: string,
  file: FormData
): Promise<UploadFile> => {
  const response = await postApi<UploadFile>({
    url: `/files/upload/${id}/icon`,
    data: file,
    customHeaders: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const uploadProductImage = async (
  id: string,
  file: FormData
): Promise<UploadFile> => {
  const response = await postApi<UploadFile>({
    url: `/files/upload/${id}`,
    data: file,
    customHeaders: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const deleteProductImage = async (
  id: string,
  filePath: string
): Promise<UploadFile> => {
  const response = await deleteApi<UploadFile>({
    url: `/files/upload/${id}?file-path=${filePath}`,
  });
  return response;
};