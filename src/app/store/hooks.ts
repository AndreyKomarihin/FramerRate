import {TypedUseSelectorHook, useDispatch, useSelector, useStore} from 'react-redux'
import store, {SearchState} from "@/app/store/store";

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()