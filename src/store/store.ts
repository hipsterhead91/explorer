// Пакеты
import { configureStore } from "@reduxjs/toolkit";

// Redux
import currentChainReducer from './reducers//currentChainSlice';

// API, сервисы
import { coinGeckoApi } from "../services/coinGecko";



const store = configureStore({
  reducer: {
    currentChain: currentChainReducer,
    [coinGeckoApi.reducerPath]: coinGeckoApi.reducer,
  },
  middleware:
    (getDefaultMiddleware) => getDefaultMiddleware().concat(coinGeckoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;