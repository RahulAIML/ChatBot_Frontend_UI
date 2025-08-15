import { apiSliceCandidate } from '../candidateApiSlice';

export const authApi = apiSliceCandidate.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		getActivities: builder.mutation({
			query: (body) => ({
				url: '/auth/getActivities',
				method: 'GET',
				// credentials: 'include',
			}),
		}),
		getTransactionLog: builder.mutation({
			query: (body) => ({
				url: `/miscellaneous/getTransactions?type=${body.type}`,
				method: 'GET',
				// credentials: 'include',
			}),
		}),
		getOtpDetails: builder.mutation({
			query: (body) => ({
				url: '/miscellaneous/getOtpDetails',
				method: 'GET',
				// credentials: 'include',
			}),
		}),
		getSmsLog: builder.mutation({
			query: (body) => ({
				url: '/miscellaneous/getSMS',
				method: 'GET',
				// credentials: 'include',
			}),
		}),
		getPaymentTransaction: builder.mutation({
			query: (body) => ({
				url: '/miscellaneous/getPaymentTransactions',
				method: 'GET',
				// credentials: 'include',
			}),
		}),
		getSeatAcceptanceTransaction: builder.mutation({
			query: (body) => ({
				url: '/miscellaneous/getSeatAcceptaTransactions',
				method: 'GET',
				// credentials: 'include',
			}),
		}),
		getFeedback: builder.mutation({
			query: (body) => ({
				url: '/miscellaneous/getFeedback',
				method: 'GET',
				// credentials: 'include',
			}),
		}),
		feedback: builder.mutation({
			query: (body) => ({
				url: 'miscellaneous/feedback',
				method: 'POST',
			body:body,
			}),
		}),
	}),
});

export const { useGetActivitiesMutation,useGetTransactionLogMutation,useFeedbackMutation,useGetFeedbackMutation,useGetSmsLogMutation,useGetOtpDetailsMutation,useGetPaymentTransactionMutation,useGetSeatAcceptanceTransactionMutation } = authApi;
