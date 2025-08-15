import { apiSliceCommon } from '../commonApiSlice';

export const authApi = apiSliceCommon.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({

    adminlogin: builder.mutation({
        query: (body) => ({
          url: `/admin/login/`,
          method: 'POST',
           body: body,
        }),
        
      }),


      viewDocs: builder.mutation({
        query: (body) => ({
          url: `/admin/view/`,
          method: 'GET',
         //  body: body,
        }),
        
      }),

      ackprint: builder.mutation({
        query: (body) => ({
          url: `/print/acknowledgementReceipt?candidate_user_id=${body.userId}`,
          method: 'GET',
          // body: body,
        }),
        
      }),
    
  }),
});

export const {
    useAdminloginMutation,useAckprintMutation,
    useViewDocsMutation
  
} = authApi;
