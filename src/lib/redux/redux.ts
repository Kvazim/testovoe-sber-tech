import {
  asyncThunkCreator,
  buildCreateSlice,
  combineSlices,
  createAsyncThunk,
  createListenerMiddleware,
  createSelector,
  ThunkAction,
  UnknownAction,
  addListener
} from '@reduxjs/toolkit';
import { appStore, extraArgument } from '../../client/components/app/app-store';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { createDynamicMiddleware } from '@reduxjs/toolkit/react';

export const listenerMiddleware = createListenerMiddleware();
const dinamicMiddleware = createDynamicMiddleware();

export const reducer = combineSlices();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppState = any;
export type AppDispatch = typeof appStore.dispatch;
export type AppThunk<R = void> = ThunkAction<
  R,
  AppState,
  typeof extraArgument,
  UnknownAction
>;
export type ExtraArgument = typeof extraArgument;
export type MiddlewareApiConfig = {
  state: AppState;
  dispatch: AppDispatch;
};

const {
  middleware,
  addMiddleware,
  withMiddleware,
  createDispatchWithMiddlewareHook,
} = dinamicMiddleware;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppStore = useStore.withTypes<typeof appStore>();
export const createAppSelector = createSelector.withTypes<AppState>();
export const createAppAsynkThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
  extra: typeof extraArgument;
}>();

export const startAppListening = listenerMiddleware.startListening.withTypes<
  AppState,
  AppDispatch,
  typeof extraArgument
>();

export const addAppListener = addListener.withTypes<AppState, AppDispatch, typeof extraArgument>();

export const addAppMiddleware = addMiddleware.withTypes<MiddlewareApiConfig>();
export const withAppMiddleware = withMiddleware.withTypes<MiddlewareApiConfig>();
export const createAppDispatchWithMiddlewareHook = createDispatchWithMiddlewareHook.withTypes<MiddlewareApiConfig>();
export default middleware;

export const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator }
});