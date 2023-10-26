// Пакеты
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Типизация
import IChain from "../../models/IChain";
import ICoin from "../../models/ICoin";
import ICurrentChainState from "../../models/ICurrentChainState";
import IValidator from "../../models/IValidator";
import IProposal from "../../models/IProposal";

// Redux
import { RootState } from "../store";



// ИСХОДНОЕ СОСТОЯНИЕ ТЕКУЩЕЙ СЕТИ
const initialChainState: ICurrentChainState = {
  chain: null,
  price: null,
  inflation: null,
  communityPool: null,
  totalBonded: null,
  unbondingTime: null,
  blockHeight: null,
  validators: null,
  Proposals: null,
};

// СЛАЙС ТЕКУЩЕЙ СЕТИ
/* Не знаю, один ли я офигеваю от неинтуитивности и непоследовательности Redax Toolkit, но тут есть приколы следующего характера: в поле reducers мы описываем редьюсеры setCurrentChain и resetCurrentChain, однако позже под этими же самыми именами мы будем извлекать из уже готового слайса не редьюсеры, а экшн криэйтеры. Причём извлекать мы их будем не из свойства actionCreators (что, казалось бы, логично), а из свойства actions. В первый раз, пока всё это раскурил, у меня чуть башка не взорвалась. */
export const currentChainSlice = createSlice({
  name: "currentChain",
  initialState: initialChainState,
  reducers: {
    setCurrentChain: (state, action: PayloadAction<IChain | null>) => {
      state.chain = action.payload;
    },
    setPrice: (state, action: PayloadAction<ICoin | null>) => {
      state.price = action.payload;
    },
    setInflation: (state, action: PayloadAction<string | null>) => {
      state.inflation = action.payload;
    },
    setCommunityPool: (state, action: PayloadAction<string | null>) => {
      state.communityPool = action.payload;
    },
    setTotalBonded: (state, action: PayloadAction<string | null>) => {
      state.totalBonded = action.payload;
    },
    setUnbondingTime: (state, action: PayloadAction<string | null>) => {
      state.unbondingTime = action.payload;
    },
    setBlockHeight: (state, action: PayloadAction<string | null>) => {
      state.blockHeight = action.payload;
    },
    setValidators: (state, action: PayloadAction<IValidator[] | null>) => {
      state.validators = action.payload;
    },
    setProposals: (state, action: PayloadAction<IProposal[] | null>) => {
      state.Proposals = action.payload;
    },
  },
});

/* Собственно, о чём я писал выше: извлекаем экшн криэйтеры, хотя в слайсе под этими именами мы описывали редьюсеры. Окей, из редьюсеров были автоматически сгенерированы экшн криэйтеры - но почему нельзя было назвать их чуть по-другому? И почему, если это именно криэйтеры, они находятся в свойстве actions? Мне это всё не понятно, но кого это волнует. */
export const {
  setCurrentChain,
  setPrice,
  setInflation,
  setCommunityPool,
  setTotalBonded,
  setUnbondingTime,
  setBlockHeight,
  setValidators,
  setProposals,
} = currentChainSlice.actions;

/* selectCurrentChain (как и остальные) - это функция, которую называют селектором; она предоставляет доступ к текущему стейту (в нашем случае это текущая сеть) и всем его свойствам. Однако, в голом виде функция-селектор не возвращает нужное нам значение: для этого её нужно использовать в качестве аргумента в хуке useAppSelector. В компоненте это будет выглядеть примерно так: const currentChain = useAppSelector(selectCurrentChain). */
export const selectCurrentChain = (state: RootState) => state.currentChain.chain;
export const selectPrice = (state: RootState) => state.currentChain.price;
export const selectInflation = (state: RootState) => state.currentChain.inflation;
export const selectCommunityPool = (state: RootState) => state.currentChain.communityPool;
export const selectTotalBonded = (state: RootState) => state.currentChain.totalBonded;
export const selectUnbondingTime = (state: RootState) => state.currentChain.unbondingTime;
export const selectBlockHeight = (state: RootState) => state.currentChain.blockHeight;
export const selectValidators = (state: RootState) => state.currentChain.validators;
export const selectProposals = (state: RootState) => state.currentChain.Proposals;

/* Напоминалка на будущее: экспорт по дефолту работает таким образом, что при импорте переменную сразу можно назвать любым именем. Именно поэтому здесь мы экспортируем currentChainSlice.reducer, а в store.ts импортируется "непонятно откуда взявшийся" currentChainReducer. Также, обрати внимание, что при создании слайса в нём описывалось поле reducers во множественном числе, а из готового слайса оно извлекается уже в единственном. Очередной прикол от Redux Toolkit, но как я понял, RTK просто генерирует из всех редьюсеров один общий. Просто прими это. */
export default currentChainSlice.reducer;