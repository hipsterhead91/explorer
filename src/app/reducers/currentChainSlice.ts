import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IChain from "../../models/IChain";
import { RootState } from "../store";

export interface ICurrentChainState {
  value: IChain | null;
}

const initialState: ICurrentChainState = {
  value: null,
};

export const currentChainSlice = createSlice({
  name: "currentChain",
  initialState,
  reducers: {
    setCurrentChain: (state, action: PayloadAction<IChain>) => {
      state.value = action.payload;
    },
    resetCurrentChain: (state) => {
      state.value = null;
    },
  },
});

export const { setCurrentChain, resetCurrentChain } = currentChainSlice.actions;

// selectCurrentChain - это функция, которую называют селектором; сама она не возвращает значение из стейта -
// для этого её нужно использовать как аргумент в хуке useAppSelector().
export const selectCurrentChain = (state: RootState) => state.currentChain.value;

// Напоминалка на будущее: экспортируя что-то по дефолту, при импорте мы можем давать ему любое название.
// Именно поэтому в файле store.ts ты обнаружишь импорт некоего currentChainReducer из текущего файла, хотя,
// казалось бы, такая переменная здесь не создавалась. Но это и есть currentChainSlice.reducer из экспорта ниже.
export default currentChainSlice.reducer;

// Примечание: обрати внимание, что создавая слайс currentChainSlice, мы описывали в нём поле reducers
// (во множественном числе), а экспортируем currentChainSlice.reducer (в единственном). Так делается в официальной
// документации, и по началу я не очень врубился, почему так. Но если я всё правильно понял, эти две вещи напрямую
// не связаны. То есть, для создания слайса мы используем инструмент редакс тулкита createSlice, который требует
// заполнения поля reducers; далее, видимо, происходят какие-то действия "под капотом", после которых у уже готового
// слайса появляется свойство reducer. На мой взгляд, это как-то неинтуитивно и некрасиво, но кто меня спрашивает.