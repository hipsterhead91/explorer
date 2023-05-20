import { configureStore } from "@reduxjs/toolkit";
import currentChainReducer from './reducers//currentChainSlice';
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