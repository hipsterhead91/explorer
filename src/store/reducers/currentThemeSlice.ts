// Пакеты
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Типизация
import ICurrentThemeState from "../../models/ICurrentThemeState";

// Redux
import { RootState } from "../store";



// ИСХОДНОЕ СОСТОЯНИЕ ТЕКУЩЕГО ЯЗЫКА
const initialThemeState: ICurrentThemeState = {
  theme: "light-theme",
}

// СЛАЙС ТЕКУЩЕГО ЯЗЫКА
export const currentThemeSlice = createSlice({
  name: "currentTheme",
  initialState: initialThemeState,
  reducers: {
    setCurrentTheme: (state, action: PayloadAction<"light-theme" | "dark-theme">) => {
      state.theme = action.payload;
    },
  }
});

export const { setCurrentTheme } = currentThemeSlice.actions;
export const selectCurrentTheme = (state: RootState) => state.currentTheme.theme;
export default currentThemeSlice.reducer;