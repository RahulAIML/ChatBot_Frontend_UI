import { apiSliceInstitute } from '../instituteApiSlice';



export const authApi = apiSliceInstitute.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		editInstitute: builder.mutation({
			query: (body) => ({
				url: 'institute/editInstDetails/editInstituteDetails',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
		getFcInstituteDetails: builder.mutation({
			query: (body) => ({
				url: 'institute/editInstDetails/getInstDetails',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
	}),
});

export const { useEditInstituteMutation, useGetFcInstituteDetailsMutation } = authApi;
