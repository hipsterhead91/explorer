// Пакеты
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Типизация
import IChain from "../../models/IChain";
import ICurrentChainState from "../../models/ICurrentChainState";
import IChainApi from "../../models/IChainApi";

// Redux
import { RootState } from "../store";
import { fetchAvatars } from "../../services/fetchAvatars";
import { fetchValidators } from "../../services/fetchValidators";
import { fetchProposals } from "../../services/fetchProposals";
import { fetchCommunityPool } from "../../services/fetchCommunityPool";
import { fetchTotalBonded } from "../../services/fetchTotalBonded";
import { fetchInflation } from "../../services/fetchInflation";
import { fetchUnbondingTime } from "../../services/fetchUnbondingTime";
import { fetchBlockHeight } from "../../services/fetchBlockHeight";
import { fetchSupply } from "../../services/fetchSupply";



// ИСХОДНОЕ СОСТОЯНИЕ ТЕКУЩЕЙ СЕТИ
const initialChainState: ICurrentChainState = {
  chain: null,
  api: null,
  avatars: null,
  validators: null,
  proposals: null,
  communityPool: null,
  totalBonded: null,
  inflation: null,
  unbondingTime: null,
  blockHeight: null,
  supply: null,
};

// СЛАЙС ТЕКУЩЕЙ СЕТИ
export const currentChainSlice = createSlice({
  name: "currentChain",
  initialState: initialChainState,
  reducers: {
    setCurrentChain: (state, action: PayloadAction<IChain | null>) => {
      state.chain = action.payload;
    },
    setApi: (state, action: PayloadAction<IChainApi | null>) => {
      state.api = action.payload;
    },
    resetAllChainData: (state) => {
      state.chain = null;
      state.api = null;
      state.avatars = null;
      state.validators = null;
      state.proposals = null;
      state.communityPool = null;
      state.totalBonded = null;
      state.inflation = null;
      state.unbondingTime = null;
      state.blockHeight = null;
      state.supply = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAvatars.fulfilled, (state, action) => {
      state.avatars = action.payload;
    })

    builder.addCase(fetchValidators.fulfilled, (state, action) => {
      state.validators = action.payload;
    })

    builder.addCase(fetchProposals.fulfilled, (state, action) => {
      state.proposals = action.payload;
    })

    builder.addCase(fetchCommunityPool.fulfilled, (state, action) => {
      state.communityPool = action.payload;
    })

    builder.addCase(fetchTotalBonded.fulfilled, (state, action) => {
      state.totalBonded = action.payload;
    })

    builder.addCase(fetchInflation.fulfilled, (state, action) => {
      state.inflation = action.payload;
    })

    builder.addCase(fetchUnbondingTime.fulfilled, (state, action) => {
      state.unbondingTime = action.payload;
    })

    builder.addCase(fetchBlockHeight.fulfilled, (state, action) => {
      state.blockHeight = action.payload;
    })

    builder.addCase(fetchSupply.fulfilled, (state, action) => {
      state.supply = action.payload;
    })
  }
});

export const {
  setCurrentChain,
  setApi,
  resetAllChainData,
} = currentChainSlice.actions;

export const selectCurrentChain = (state: RootState) => state.currentChain.chain;
export const selectApi = (state: RootState) => state.currentChain.api;
export const selectAvatars = (state: RootState) => state.currentChain.avatars;
export const selectValidators = (state: RootState) => state.currentChain.validators;
export const selectProposals = (state: RootState) => state.currentChain.proposals;
export const selectCommunityPool = (state: RootState) => state.currentChain.communityPool;
export const selectTotalBonded = (state: RootState) => state.currentChain.totalBonded;
export const selectInflation = (state: RootState) => state.currentChain.inflation;
export const selectUnbondingTime = (state: RootState) => state.currentChain.unbondingTime;
export const selectBlockHeight = (state: RootState) => state.currentChain.blockHeight;
export const selectSupply = (state: RootState) => state.currentChain.supply;

/* Напоминалка на будущее: экспорт по дефолту работает таким образом, что при импорте переменную сразу можно назвать любым именем. Именно поэтому здесь мы экспортируем currentChainSlice.reducer, а в store.ts импортируется "непонятно откуда взявшийся" currentChainReducer. Также, обрати внимание, что при создании слайса в нём описывалось поле reducers во множественном числе, а из готового слайса оно извлекается уже в единственном. Очередной прикол от Redux Toolkit, но как я понял, RTK просто генерирует из всех редьюсеров один общий. Просто прими это. */
export default currentChainSlice.reducer;