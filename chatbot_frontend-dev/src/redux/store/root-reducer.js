import { combineReducers } from '@reduxjs/toolkit';
// import { reducer as calendarReducer } from '../slices/calendar';
import authReducer from '../slices/features-slice/user';
import { apiSliceCandidate } from '../slices/candidateApiSlice';
import { apiSliceInstitute } from '../slices/instituteApiSlice';
import {apiSliceFC} from '../slices/fcApiSlice';
import { apiSliceCommon } from '../slices/commonApiSlice';
export const rootReducer = combineReducers({
  // auth: authReducer,
  [apiSliceCandidate.reducerPath]: apiSliceCandidate.reducer,
  [apiSliceInstitute.reducerPath]: apiSliceInstitute.reducer,
  [apiSliceFC.reducerPath]: apiSliceFC.reducer,
  [apiSliceCommon.reducerPath] : apiSliceCommon.reducer,
  auth: authReducer,
  // chat: chatReducer,
  // kanban: kanbanReducer,
  // mail: mailReducer
});
