import { apiSliceCandidate } from '../candidateApiSlice';

export const authApi = apiSliceCandidate.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		getCancelPrint: builder.mutation({
			query: (body) => ({ 
				url: 'seat-acceptance/cancel/cancelladmissionprint',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		sendOtp: builder.mutation({
			query: (body) => ({
				url: `seat-acceptance/cancel/checkPassword`,
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

		submitApplication: builder.mutation({
			query: (body) => ({
				url: `seat-acceptance/cancel/submitApplication`,
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

		getCancelAdmissionData: builder.mutation({
			query: (body) => ({ 
				url: 'seat-acceptance/cancel/getCancellationDetails',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		
	}),
});

export const { useGetCancelPrintMutation,useSendOtpMutation,useSubmitApplicationMutation,useGetCancelAdmissionDataMutation } = authApi;
