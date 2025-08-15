import { apiSliceInstitute } from '../instituteApiSlice';

export const authApi = apiSliceInstitute.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		editDraftAllotment: builder.mutation({
			query: (body) => ({
				url: '/draftAllotment/editDraftAllotment',
				method: 'POST',
				body: body,
			}),
		}),
		getDraftAllotment: builder.mutation({
			query: (body) => ({
				url: '/draftAllotment/getDraftAllotment',
				method: 'GET',
				// body: body,
			}),
		}),
	}),
});

export const { useEditDraftAllotmentMutation, useGetDraftAllotmentMutation } = authApi;
