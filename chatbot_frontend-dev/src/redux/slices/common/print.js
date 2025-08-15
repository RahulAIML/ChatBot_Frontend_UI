import { apiSliceCommon } from '../commonApiSlice';

export const authApi = apiSliceCommon.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({

    applicationFormPrint: builder.mutation({
        query: (body) => ({
          url: `/print/applicationForm?candidate_user_id=${body.userId}`,
          method: 'GET',
          // body: body,
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
    useApplicationFormPrintMutation,useAckprintMutation
  
} = authApi;
