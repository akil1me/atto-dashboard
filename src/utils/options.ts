import { QueryClient } from "@tanstack/react-query";
import { LanguageType } from "../@types";
import { store } from "../redux";

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
});
