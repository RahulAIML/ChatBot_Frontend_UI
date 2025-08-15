import { apiSliceFC } from '../fcApiSlice';

export const authApi = apiSliceFC.injectEndpoints({
  endpoints: (builder) => ({
    getEFCcount: builder.mutation({
      query: (body) => ({
        url: 'fc/fcgraph/getEFCcount',
        method: 'GET',
        // body: body,
        // credentials: 'include',
      }),
    }),
    getGrievanceCount: builder.mutation({
      query: (body) => ({
        url: 'fc/fcgraph/getGrievanceCount',
        method: 'GET',
        // body: body,
        // credentials: 'include',
      }),
    }),
    getDateWiseSlot: builder.mutation({
      query: (body) => ({
        url: 'fc/fcgraph/dateWiseSlot',
        method: 'GET',
        // body: body,
        // credentials: 'include',
      }),
    }),
  }),
});

export const { useGetEFCcountMutation, useGetGrievanceCountMutation, useGetDateWiseSlotMutation } =
  authApi;
