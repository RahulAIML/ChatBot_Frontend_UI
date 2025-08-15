import { apiSliceInstitute } from '../instituteApiSlice';

export const authApi = apiSliceInstitute.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    capWiseStatus: builder.mutation({
      query: (body) => ({
        url: 'institute/instituteGraphs/capWiseStatus',
        method: 'GET',
        // body: body,
        // credentials: 'include',
      }),
    }),
    dateWiseStatus: builder.mutation({
      query: (body) => ({
        url: 'institute/instituteGraphs/dateWiseStatus',
        method: 'GET',
        // body: body,
        // credentials: 'include',
      }),
    }),
    allotedButNotAcceptted: builder.mutation({
      query: (body) => ({
        url: 'institute/instituteGraphs/allotedButNotAcceptted',
        method: 'GET',
        // body: body,
        // credentials: 'include',
      }),
    }),
    getCapwiseCount: builder.mutation({
      query: (body) => ({
        url: 'institute/instituteGraphs/getCapwiseCount',
        method: 'GET',
        // body: body,
        // credentials: 'include',
      }),
    }),
    capWiseAllotedStatus: builder.mutation({
      query: (body) => ({
        url: 'institute/instituteGraphs/capWiseAllotedStatus',
        method: 'GET',
        // body: body,
        // credentials: 'include',
      }),
    }),
  }),
});

export const {
  useCapWiseStatusMutation,
  useAllotedButNotAccepttedMutation,
  useDateWiseStatusMutation,
  useGetCapwiseCountMutation,
  useCapWiseAllotedStatusMutation,
} = authApi;
