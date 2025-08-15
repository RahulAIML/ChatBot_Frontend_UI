import { apiSliceInstitute } from '../instituteApiSlice';

export const authApi = apiSliceInstitute.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({

		notUploadLcList : builder.mutation({
			query: (body) => ({
				url: '/lcController/notUploadLcList ',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),

		getLCDetails: builder.mutation({
			query: (body) => ({
				url: '/lcController/getLCDetails',
				method: 'POST',
				 body: body,
				// credentials: 'include',
			}),
		}),

        submitLCDetails: builder.mutation({
			query: (body) => ({
				url: '/lcController/singleDocument',
				method: 'POST',
				 body: body,
				// credentials: 'include',
			}),
		}),
    
	}),
});

export const {
	useNotUploadLcListMutation,
	useGetLCDetailsMutation,
    useSubmitLCDetailsMutation,
	
} = authApi;


