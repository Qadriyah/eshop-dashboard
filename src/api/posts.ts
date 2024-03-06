import { useQuery } from "@tanstack/react-query";
import client from "./client/client";
import { AxiosResponse } from "axios";

export const useGetPosts = useQuery({
  queryKey: ["posts"],
  queryFn: async () => {
    const response: AxiosResponse = await client.get("/photos");
    if (!response.data) {
      throw new Error("An error has occured");
    }

    return response.data;
  },
});
