import { apiSliceFC } from '../fcApiSlice';

export const authApi = apiSliceFC.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		checkGrievance: builder.mutation({
			query: (body) => ({
				url: '/fc/grivance/checkGrievance',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
		documentsList: builder.mutation({
			query: (body) => ({
				url: `/fc/grivance/getcandidateDocuments?candidateId=${body.userId}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		approvedGrievanceList: builder.mutation({
			query: (body) => ({
				url: '/fc/grivance/approveGrievanceList',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
		rejectGrievanceList: builder.mutation({
			query: (body) => ({
				url: '/fc/grivance/rejectGrievanceList',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
		approveGrienvance: builder.mutation({
			query: (body) => ({
				url: '/fc/grivance/approveGrievance',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
		rejectGrienvance: builder.mutation({
			query: (body) => ({
				url: '/fc/grivance/rejectGrievance',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
	}),
});

export const {
	useCheckGrievanceMutation,
	useDocumentsListMutation,
	useApproveGrienvanceMutation,
	useRejectGrienvanceMutation,
	useApprovedGrievanceListMutation,
	useRejectGrievanceListMutation,
} = authApi;
