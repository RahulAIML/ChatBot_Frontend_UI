import { apiSliceFC } from '../fcApiSlice';
export const authApi = apiSliceFC.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		editFc: builder.mutation({
			query: (body) => ({
				url: '/fc/editFC/editFcDetails',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
		getFcEditDetails: builder.mutation({
			query: (body) => ({
				url: 'fc/editFC/getFcDetails',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
	}),
});

export const { useEditFcMutation, useGetFcEditDetailsMutation } = authApi;
