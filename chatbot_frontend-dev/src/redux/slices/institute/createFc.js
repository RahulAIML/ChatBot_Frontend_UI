import { apiSliceInstitute } from '../instituteApiSlice';

export const authApi = apiSliceInstitute.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		createFc: builder.mutation({
			query: (body) => ({
				url: '/institute/createFc//createFc',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
		getFCDetails: builder.mutation({
			query: (body) => ({
				url: '/institute/createFc/getFCDetails',
				method: 'GET',
				body: body,
				// credentials: 'include',
			}),
		}),
	}),
});

export const { useCreateFcMutation, useGetFCDetailsMutation } = authApi;
