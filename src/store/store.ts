// Пакеты
import { configureStore } from "@reduxjs/toolkit";

// Redux
import currentChainReducer from "./reducers/currentChainSlice";
import currentLanguageReducer from "./reducers/currentLanguageSlice";
import currentThemeReducer from "./reducers/currentThemeSlice";

// API, сервисы
import { coinGeckoApi } from "../services/coinGecko";



const store = configureStore({
  reducer: {
    currentChain: currentChainReducer,
    currentLanguage: currentLanguageReducer,
    currentTheme: currentThemeReducer,
    [coinGeckoApi.reducerPath]: coinGeckoApi.reducer,
  },
  middleware:
    (getDefaultMiddleware) => getDefaultMiddleware().concat(coinGeckoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;