import { apiSliceFC } from '../fcApiSlice';

export const authApi = apiSliceFC.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    getActivitiesfc: builder.mutation({
      query: (body) => ({
        url: '/auth/getActivities',
        method: 'GET',
        // credentials: 'include',
      }),
    }),
   
  }),
});

export const {
  useGetActivitiesfcMutation,
 
} = authApi;
