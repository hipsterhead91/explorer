import { configureStore } from "@reduxjs/toolkit";
import currentChainReducer from './reducers//currentChainSlice';

const store = configureStore({
  reducer: {
    currentChain: currentChainReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;