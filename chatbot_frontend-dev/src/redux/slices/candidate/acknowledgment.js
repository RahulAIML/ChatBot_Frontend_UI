import { apiSliceCandidate } from '../candidateApiSlice';

export const authApi = apiSliceCandidate.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		acknowledgment: builder.mutation({
			query: (body) => ({
				url: '/getPrint/receiptCumAck',
				method: 'GET',

				// credentials: 'include',
			}),
		}),
	}),
});

export const { useAcknowledgmentMutation } = authApi;
