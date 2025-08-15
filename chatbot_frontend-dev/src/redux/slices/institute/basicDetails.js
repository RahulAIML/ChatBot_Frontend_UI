import { apiSliceInstitute } from '../instituteApiSlice';

export const authApi = apiSliceInstitute.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    getActivitiesInst: builder.mutation({
      query: (body) => ({
        url: 'institute/auth/getActivities',
        method: 'GET',
        // credentials: 'include',
      }),
    }),
   
  }),
});

export const {
  useGetActivitiesInstMutation,
 
} = authApi;
