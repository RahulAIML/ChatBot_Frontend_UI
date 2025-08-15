import { apiSliceCandidate } from '../candidateApiSlice';

export const authApi = apiSliceCandidate.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		updateCandidature: builder.mutation({
			query: (body) => ({
				url: '/applicationForm/masterCandidatureType/updateDetails',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
		getCandidature: builder.mutation({
			query: (body) => ({
				url: '/applicationForm/masterCandidatureType/typeOfCandidatureList',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
	}),
});

export const { useUpdateCandidatureMutation, useGetCandidatureMutation } = authApi;
