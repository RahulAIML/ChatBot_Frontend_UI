import { apiSliceCandidate } from '../candidateApiSlice';

export const authApi = apiSliceCandidate.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		getDocDetails: builder.mutation({
			query: (body) => ({
				url: '/uploadController/getDocId',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),

		getDocDetailsEwsNcl: builder.mutation({
			query: (body) => ({
				url: '/uploadDocument/getDocId',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),

		submitDocDetailsEwsNcl: builder.mutation({
			query: (body) => ({
				url: '/uploadDocument/submitDocDetails',
				method: 'POST',
				// body: body,
				// credentials: 'include',
			}),
		}),
		
	}),
});

export const { useGetDocDetailsMutation,useGetDocDetailsEwsNclMutation,useSubmitDocDetailsEwsNclMutation } = authApi;
