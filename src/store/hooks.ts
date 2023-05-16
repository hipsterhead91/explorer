import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Типизированные кастомные хуки, которые следует использовать в приложении вместо стандартных useDispatch
// и useSelector. Первый - для отправки экшенов на исполнение, второй - для получения данных из стейта.
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;