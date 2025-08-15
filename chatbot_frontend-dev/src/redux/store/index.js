import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './root-reducer';
// import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { apiSliceCandidate } from '../slices/candidateApiSlice';
import { apiSliceInstitute } from '../slices/instituteApiSlice';
import { apiSliceFC } from '../slices/fcApiSlice';
import { apiSliceCommon } from '../slices/commonApiSlice';

let devtool = false;
let middleware = [];
devtool = true;
middleware = [apiSliceCandidate.middleware, apiSliceInstitute.middleware,apiSliceFC.middleware,apiSliceCommon.middleware];
// middleware = [apiSliceInstitute.middleware];

/* @ts-ignore */
if (import.meta.env.DEV === true) {
  // middleware = [logger, apiSliceAdmin.middleware];
  middleware = [apiSliceCandidate.middleware, apiSliceInstitute.middleware,apiSliceFC.middleware,apiSliceCommon.middleware];
  // middleware = [apiSliceInstitute.middleware];
  devtool = true;
}

export const store = configureStore({
  reducer: rootReducer,
  devTools: devtool,
  middleware: (getDefaultMiddleware) =>
    // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
    getDefaultMiddleware().concat(...middleware),
});

export const useDispatch = () => useReduxDispatch();
// setupListeners(store.dispatch);
