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



// ИСХОДНОЕ СОСТОЯНИЕ ТЕКУЩЕЙ СЕТИ
const initialChainState: ICurrentChainState = {
  chain: null,
  api: null,
  avatars: null,
  avatarsStatus: null,
  avatarsError: null,
  validators: null,
  validatorsStatus: null,
  validatorsError: null,
  proposals: null,
  proposalsStatus: null,
  proposalsError: null,
  communityPool: null,
  communityPoolStatus: null,
  communityPoolError: null,
  totalBonded: null,
  totalBondedStatus: null,
  totalBondedError: null,
  inflation: null,
  inflationStatus: null,
  inflationError: null,
  unbondingTime: null,
  unbondingTimeStatus: null,
  unbondingTimeError: null,
  blockHeight: null,
  blockHeightStatus: null,
  blockHeightError: null,
};

// СЛАЙС ТЕКУЩЕЙ СЕТИ
/* Не знаю, один ли я офигеваю от неинтуитивности и непоследовательности Redux Toolkit, но тут есть приколы следующего характера: в поле reducers мы описываем редьюсеры setCurrentChain и resetCurrentChain, однако позже под этими же самыми именами мы будем извлекать из уже готового слайса не редьюсеры, а экшн криэйтеры. Причём извлекать мы их будем не из свойства actionCreators (что, казалось бы, логично), а из свойства actions. В первый раз, пока всё это раскурил, у меня чуть башка не взорвалась. */
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
      state.avatarsStatus = null;
      state.avatarsError = null;
      state.validators = null;
      state.validatorsStatus = null;
      state.validatorsError = null;
      state.proposals = null;
      state.proposalsStatus = null;
      state.proposalsError = null;
      state.communityPool = null;
      state.communityPoolStatus = null;
      state.communityPoolError = null;
      state.totalBonded = null;
      state.totalBondedStatus = null;
      state.totalBondedError = null;
      state.inflation = null;
      state.inflationStatus = null;
      state.inflationError = null;
      state.unbondingTime = null;
      state.unbondingTimeStatus = null;
      state.unbondingTimeError = null;
      state.blockHeight = null;
      state.blockHeightStatus = null;
      state.blockHeightError = null;
    }
  },
  extraReducers: (builder) => {

    // Аватары - загрузка
    builder.addCase(fetchAvatars.pending, (state) => {
      state.avatarsStatus = "loading";
      state.avatarsError = null;
    })

    // Аватары - успех
    builder.addCase(fetchAvatars.fulfilled, (state, action) => {
      state.avatarsStatus = "resolved";
      state.avatarsError = null;
      state.avatars = action.payload;
    })

    // Аватары - ошибка
    builder.addCase(fetchAvatars.rejected, (state, action) => {
      state.avatarsStatus = "rejected";
      state.avatarsError = action.payload;
    })

    // Валидаторы - загрузка
    builder.addCase(fetchValidators.pending, (state) => {
      state.validatorsStatus = "loading";
      state.validatorsError = null;
    })

    // Валидаторы - успех
    builder.addCase(fetchValidators.fulfilled, (state, action) => {
      state.validatorsStatus = "resolved";
      state.validatorsError = null;
      state.validators = action.payload;
    })

    // Валидаторы - ошибка
    builder.addCase(fetchValidators.rejected, (state, action) => {
      state.validatorsStatus = "rejected";
      state.validatorsError = action.payload;
    })

    // Пропозалы - загрузка
    builder.addCase(fetchProposals.pending, (state) => {
      state.proposalsStatus = "loading";
      state.proposalsError = null;
    })

    // Пропозалы - успех
    builder.addCase(fetchProposals.fulfilled, (state, action) => {
      state.proposalsStatus = "resolved";
      state.proposalsError = null;
      state.proposals = action.payload;
    })

    // Пропозалы - ошибка
    builder.addCase(fetchProposals.rejected, (state, action) => {
      state.proposalsStatus = "rejected";
      state.proposalsError = action.payload;
    })

    // Пул сообщества - загрузка
    builder.addCase(fetchCommunityPool.pending, (state) => {
      state.communityPoolStatus = "loading";
      state.communityPoolError = null;
    })

    // Пул сообщества - успех
    builder.addCase(fetchCommunityPool.fulfilled, (state, action) => {
      state.communityPoolStatus = "resolved";
      state.communityPoolError = null;
      state.communityPool = action.payload;
    })

    // Пул сообщества - ошибка
    builder.addCase(fetchCommunityPool.rejected, (state, action) => {
      state.communityPoolStatus = "rejected";
      state.communityPoolError = action.payload;
    })

    // Застейкано - загрузка
    builder.addCase(fetchTotalBonded.pending, (state) => {
      state.totalBondedStatus = "loading";
      state.totalBondedError = null;
    })

    // Застейкано - успех
    builder.addCase(fetchTotalBonded.fulfilled, (state, action) => {
      state.totalBondedStatus = "resolved";
      state.totalBondedError = null;
      state.totalBonded = action.payload;
    })

    // Застейкано - ошибка
    builder.addCase(fetchTotalBonded.rejected, (state, action) => {
      state.totalBondedStatus = "rejected";
      state.totalBondedError = action.payload;
    })

    // Инфляция - загрузка
    builder.addCase(fetchInflation.pending, (state) => {
      state.inflationStatus = "loading";
      state.inflationError = null;
    })

    // Инфляция - успех
    builder.addCase(fetchInflation.fulfilled, (state, action) => {
      state.inflationStatus = "resolved";
      state.inflationError = null;
      state.inflation = action.payload;
    })

    // Инфляция - ошибка
    builder.addCase(fetchInflation.rejected, (state, action) => {
      state.inflationStatus = "rejected";
      state.inflationError = action.payload;
    })

    // Анбондинг - загрузка
    builder.addCase(fetchUnbondingTime.pending, (state) => {
      state.unbondingTimeStatus = "loading";
      state.unbondingTimeError = null;
    })

    // Анбондинг - успех
    builder.addCase(fetchUnbondingTime.fulfilled, (state, action) => {
      state.unbondingTimeStatus = "resolved";
      state.unbondingTimeError = null;
      state.unbondingTime = action.payload;
    })

    // Анбондинг - ошибка
    builder.addCase(fetchUnbondingTime.rejected, (state, action) => {
      state.unbondingTimeStatus = "rejected";
      state.unbondingTimeError = action.payload;
    })

    // Высота блока - загрузка
    builder.addCase(fetchBlockHeight.pending, (state) => {
      state.blockHeightStatus = "loading";
      state.blockHeightError = null;
    })

    // Высота блока - успех
    builder.addCase(fetchBlockHeight.fulfilled, (state, action) => {
      state.blockHeightStatus = "resolved";
      state.blockHeightError = null;
      state.blockHeight = action.payload;
    })

    // Высота блока - ошибка
    builder.addCase(fetchBlockHeight.rejected, (state, action) => {
      state.blockHeightStatus = "rejected";
      state.blockHeightError = action.payload;
    })
  }
});

/* Собственно, о чём я писал выше: извлекаем экшн криэйтеры, хотя в слайсе под этими именами мы описывали редьюсеры. Окей, из редьюсеров были автоматически сгенерированы экшн криэйтеры - но почему нельзя было назвать их чуть по-другому? И почему, если это именно криэйтеры, они находятся в свойстве actions? Мне это всё не понятно, но кого это волнует. */
export const {
  setCurrentChain,
  setApi,
  resetAllChainData,
} = currentChainSlice.actions;

/* selectCurrentChain (как и остальные) - это функция, которую называют селектором; она предоставляет доступ к текущему стейту (в нашем случае это текущая сеть) и всем его свойствам. Однако, в голом виде функция-селектор не возвращает нужное нам значение: для этого её нужно использовать в качестве аргумента в хуке useAppSelector. В компоненте это будет выглядеть примерно так: const currentChain = useAppSelector(selectCurrentChain). */
export const selectCurrentChain = (state: RootState) => state.currentChain.chain;
export const selectApi = (state: RootState) => state.currentChain.api;
// export const selectPrice = (state: RootState) => state.currentChain.price;
export const selectAvatars = (state: RootState) => state.currentChain.avatars;
export const selectValidators = (state: RootState) => state.currentChain.validators;
export const selectProposals = (state: RootState) => state.currentChain.proposals;
export const selectCommunityPool = (state: RootState) => state.currentChain.communityPool;
export const selectTotalBonded = (state: RootState) => state.currentChain.totalBonded;
export const selectInflation = (state: RootState) => state.currentChain.inflation;
export const selectUnbondingTime = (state: RootState) => state.currentChain.unbondingTime;
export const selectBlockHeight = (state: RootState) => state.currentChain.blockHeight;

/* Напоминалка на будущее: экспорт по дефолту работает таким образом, что при импорте переменную сразу можно назвать любым именем. Именно поэтому здесь мы экспортируем currentChainSlice.reducer, а в store.ts импортируется "непонятно откуда взявшийся" currentChainReducer. Также, обрати внимание, что при создании слайса в нём описывалось поле reducers во множественном числе, а из готового слайса оно извлекается уже в единственном. Очередной прикол от Redux Toolkit, но как я понял, RTK просто генерирует из всех редьюсеров один общий. Просто прими это. */
export default currentChainSlice.reducer;