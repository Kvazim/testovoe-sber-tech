import { configureStore } from '@reduxjs/toolkit';
import middleware, { listenerMiddleware, reducer } from '@lib/redux/redux';
import { setupListeners } from '@reduxjs/toolkit/query';

export const extraArgument = {};

export const appStore = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument }
    })
      .concat(listenerMiddleware.middleware)
      .prepend(middleware),
});

setupListeners(appStore.dispatch);