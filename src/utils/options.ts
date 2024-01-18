import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { AxsiosErrorType, LanguageType } from "../@types";
import { store } from "../redux";
import toast from "react-hot-toast";

export const getLanguage = (): LanguageType | string => {
  return store.getState().login.lang;
};

export const getToken = (): string | null => {
  return store.getState().login.token;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 500,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (err: unknown) => {
      const error = err as AxsiosErrorType;

      if (error.response?.data) {
        if (!error.response.data.error.message) {
          return toast.error(error.response.data.error.systemName, {
            id: "mutate",
            duration: 2000,
          });
        }

        return toast.error(error.response.data.error.message, {
          id: "mutate",
          duration: 2000,
        });
      } else {
        return toast.error("Server Error", {
          id: "mutate",
          duration: 2000,
        });
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (err: unknown) => {
      const error = err as AxsiosErrorType;
      console.log(error.response?.data.error.message);
      if (error.response?.data.error.message) {
        return toast.error(error.response.data.error.message, {
          id: "mutate",
          duration: 2000,
        });
      } else {
        return toast.error("Server Error", {
          id: "mutate",
          duration: 2000,
        });
      }
    },
  }),
});
