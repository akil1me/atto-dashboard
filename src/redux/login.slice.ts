import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { LanguageType } from "../@types";

interface InitialStateType {
  token: null | string;
  lang: LanguageType;
}

const getToken: string | null = JSON.parse(Cookies.get("token") || "null");
const getLang: LanguageType = (Cookies.get("lang") as LanguageType) || "ru";

const initialState: InitialStateType = {
  token: "token", //getToken,
  lang: getLang,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setToken(state, { payload }: PayloadAction<string | null>) {
      state.token = payload;
      Cookies.set("token", JSON.stringify(payload), {
        expires: 1 / 24,
      });
    },

    setLang(state, { payload }: PayloadAction<LanguageType>) {
      state.lang = payload;
      Cookies.set("lang", payload, {
        expires: 365,
      });
    },
  },
});

export const { actions: loginActions, reducer: loginReducer } = loginSlice;

// export const getToken = (state: RootState) => state.token.token;
