// Пакеты
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Типизация
import ICurrentLanguageState from "../../models/ICurrentLanguageState";

// Redux
import { RootState } from "../store";



// ИСХОДНОЕ СОСТОЯНИЕ ТЕКУЩЕГО ЯЗЫКА
const initialLanguageState: ICurrentLanguageState = {
  language: "eng",
}

// СЛАЙС ТЕКУЩЕГО ЯЗЫКА
export const currentLanguageSlice = createSlice({
  name: "currentLanguage",
  initialState: initialLanguageState,
  reducers: {
    setCurrentLanguage: (state, action: PayloadAction<"eng" | "rus">) => {
      state.language = action.payload;
    },
  }
});

export const { setCurrentLanguage } = currentLanguageSlice.actions;
export const selectCurrentLanguage = (state: RootState) => state.currentLanguage.language;
export default currentLanguageSlice.reducer;