import { apiSliceCandidate } from '../candidateApiSlice';

export const authApi = apiSliceCandidate.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		getRatingList: builder.mutation({
			query: (body) => ({
				url: '/feedbackController/getFeedback',
				method: 'GET',

				// credentials: 'include',
			}),
		}),
		updateRating: builder.mutation({
			query: (body) => ({
				url: '/feedbackController/feedback',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
	}),
});

export const { useGetRatingListMutation, useUpdateRatingMutation } = authApi;
