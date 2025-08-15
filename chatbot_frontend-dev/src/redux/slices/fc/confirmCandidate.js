import { apiSliceFC } from '../fcApiSlice';

export const authApi = apiSliceFC.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		getDetailsForPhysicalConfirm: builder.mutation({
			query: (body) => ({
				url: `/fc/phyfc/checkCandidateForVerification?version=${body.version}&candidateId=${body.candidate}`,
				method: 'GET',
				//body: body,
			}),
		}),
		getDetailsForConfirm: builder.mutation({
			query: (body) => ({
				url: `/print/applicationForm?candidate_user_id=${body.candidate}`,
				method: 'GET',
				//body: body,
			}),
		}),
		getdetailsAfterConfirm: builder.mutation({
			query: (body) => ({
				url: `/auth/getCandidateDetailsAfterConfirm?candidate_user_id=${body.candidate_user_name}`,
				method: 'GET',
				//body: body,
			}),
		}),
		candidateDocCheck: builder.mutation({
			query: (body) => ({
				url: '/fc/phyfc/confirmCandidateDocuments',
				method: 'POST',
				body: body,
			}),
		}),
		checkConverted: builder.mutation({
			query: (body) => ({
				url: `/fc/phyfc/checkConverted?checkConfirm=${body.checkConfirm}&candidateId=${body.candidate}`,
				method: 'GET',
				//body: body,
			}),
		}),
		confrimAndUpdate: builder.mutation({
			query: (body) => ({
				url: '/fc/phyfc/confrimAndUpdate',
				method: 'POST',
				body: body,
			}),
		}),
	}),
});

export const {
	useGetDetailsForConfirmMutation,
	useGetdetailsAfterConfirmMutation,
	useCandidateDocCheckMutation,
	useCheckConvertedMutation,
	useConfrimAndUpdateMutation,
	useGetDetailsForPhysicalConfirmMutation,
} = authApi;
