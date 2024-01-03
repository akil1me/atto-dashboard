import { AxiosError, AxiosRequestConfig } from "axios";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { axiosInstans } from "../api/axiosIsntans";

export const useGetData = <T, Stype = T>(
  path: string,
  queryKey: string[],
  options?: Omit<UseQueryOptions<T, AxiosError, Stype>, "queryKey" | "queryFn">,
  params?: AxiosRequestConfig<any>
) => {
  async function getData() {
    const { data } = await axiosInstans.get<T>(path, params);
    return data;
  }

  return useQuery<T, AxiosError, Stype>({
    queryKey: [...queryKey],
    queryFn: getData,
    ...options,
  });
};
