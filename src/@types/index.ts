import { AxiosError } from "axios";
import { useOutletContext } from "react-router-dom";

export type LanguageType = "uz" | "en" | "ru";
export interface ErrorTypes {
  message: string;
  systemName: string;
  code: number;
}
export type AxsiosErrorType = AxiosError<{ error: ErrorTypes }>;
