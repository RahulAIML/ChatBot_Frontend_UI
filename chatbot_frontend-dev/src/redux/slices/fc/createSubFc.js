import { apiSliceFC } from '../fcApiSlice';

export const authApi = apiSliceFC.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		createSubFc: builder.mutation({
			query: (body) => ({
				url: '/fc/editFC/createSubFc',
				method: 'POST', 
				body: body,
				// credentials: 'include',
			}),
		}),
		subFcList: builder.mutation({
			query: (body) => ({
				url: `/fc/editFC/subFcList`,
				method: 'GET', 
				//body: body,
				// credentials: 'include',
			}),
		}),
	}),
});

export const { useCreateSubFcMutation, useSubFcListMutation } = authApi;
