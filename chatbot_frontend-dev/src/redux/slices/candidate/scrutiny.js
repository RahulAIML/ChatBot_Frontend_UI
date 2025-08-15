import { apiSliceCandidate } from '../candidateApiSlice';

export const authApi = apiSliceCandidate.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		
		updateScrutiny: builder.mutation({
			query: (body) => ({
				url: '/applicationForm/scrutiny/updateScrutinyMode',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
	}),
});

export const {  useUpdateScrutinyMutation } = authApi;
