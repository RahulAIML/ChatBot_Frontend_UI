import { apiSliceCommon } from './commonApiSlice';

export const authApi = apiSliceCommon.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    fcList: builder.mutation({
      query: (body) => ({
        url: `/common/public/fcList?course_name=${body.course_name}`,
        method: 'GET',
        // body: body,
      }),
    }),

    institudelist: builder.mutation({
      query: (body) => ({
        url: `/common/public/institutecourses?course_name=${body.course_name}`,
        method: 'GET',
        // body: body,
        // credentials: 'include',
      }),
    }),
    institudewiselist: builder.mutation({
      query: (body) => ({
        url: `/common/public/instituteWiseAllotment?course_name=${body.course_name}`,
        method: 'GET',
        // body: body,
        // credentials: 'include',
      }),
    }),
  }),
});

export const { useFcListMutation, useInstitudelistMutation, useInstitudewiselistMutation } =
  authApi;