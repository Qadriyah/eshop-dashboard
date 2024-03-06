import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";

type DispatchFunction = () => AppDispatch;

export const useDispatchHook: DispatchFunction = useDispatch;

export const useSelectorHook: TypedUseSelectorHook<RootState> = useSelector;
