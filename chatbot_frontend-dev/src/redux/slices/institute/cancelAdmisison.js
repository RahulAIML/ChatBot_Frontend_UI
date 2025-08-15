import { apiSliceInstitute } from '../instituteApiSlice';

export const authApi = apiSliceInstitute.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		cancelAdmissionRequest: builder.mutation({
			query: (body) => ({
				url: `institute/institutereporting/cancelCandidate/cancelAdmissionRequest?round=${body.round}`,
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
		cancelCandidateList: builder.mutation({
			query: (body) => ({
				url: `institute/institutereporting/cancelCandidate/candidateList?round=${body.round}&choiceCode=${body?.choiceCode}`,
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
		getSingleCandidateForCancelled: builder.mutation({
			query: (body) => ({
				url: `institute/institutereporting/cancelCandidate/singleCandidate?choiceCode=${body.choiceCode}&candidateId=${body.candidateId}&round=${body.round}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		cancelCandidate: builder.mutation({
			query: (body) => ({
				url: `institute/institutereporting/cancelCandidate/cancelCandidate`,
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
		cancelledChoiceCode: builder.mutation({
			query: (body) => ({
				url: `institute/institutereporting/cancelCandidate/cancelledChoiceCode?round=${body.round}`,
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
		cancelledCandidateList: builder.mutation({
			query: (body) => ({
				url: `institute/institutereporting/cancelCandidate/cancelledCandidateList?round=${body.round}&choiceCode=${body?.choiceCode}`,
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
		cancelledPrint: builder.mutation({
			query: (body) => ({
				url: `institute/institutereporting/cancelCandidate/cancelPrint?choiceCode=${body.choiceCode}&candidateId=${body.candidateId}&round=${body.round}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
	}),
});

export const {
	useCancelAdmissionRequestMutation,
	useCancelCandidateListMutation,
	useGetSingleCandidateForCancelledMutation,
	useCancelCandidateMutation,
	useCancelledChoiceCodeMutation,
	useCancelledCandidateListMutation,
	useCancelledPrintMutation,
} = authApi;
