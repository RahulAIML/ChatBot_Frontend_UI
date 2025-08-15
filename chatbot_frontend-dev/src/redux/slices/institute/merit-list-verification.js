import { apiSliceInstitute } from '../instituteApiSlice';

export const authApi = apiSliceInstitute.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		getMarkForCancelChoiceCodeList: builder.mutation({
			query: (body) => ({
				url: `meritVerification/markAscancel/admittedCourseWiseData`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

        getMarkForCandidateList: builder.mutation({
			query: (body) => ({
				url: `meritVerification/markAscancel/candidateList?choiceCode=${body.choiceCode}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

        cancelCandidateInMerit: builder.mutation({
			query: (body) => ({
				url: `meritVerification/markAscancel/markAsCancelled`,
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

        restoreCandidateInMerit: builder.mutation({
			query: (body) => ({
				url: `meritVerification/markAscancel/restoreCancelled`,
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

        getMarkForCancelCandidateList: builder.mutation({
			query: (body) => ({
				url: `meritVerification/markAscancel/cancelledCandidateList?choiceCode=${body.choiceCode}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

		


		getVerifyAdmittedDocsChoiceCodeList: builder.mutation({
			query: (body) => ({
				url: `meritVerification/admittedCanddiateDocs/admittedCourseWiseData`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

		getVerifyAdmittedDocsCandidateList: builder.mutation({
			query: (body) => ({
				url: `meritVerification/admittedCanddiateDocs/candidateList?choiceCode=${body.choiceCode}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

		admittedackInstPrint: builder.mutation({
			query: (body) => ({
				url: `meritVerification/admittedCanddiateDocs/instPrint?candidateId=${body.candidateId}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

		admittedackCAPPrint: builder.mutation({
			query: (body) => ({
				url: `meritVerification/admittedCanddiateDocs/capPrint?candidateId=${body.candidateId}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

		verifyAdmittedChoiceCodeList: builder.mutation({
			query: (body) => ({
				url: `meritVerification/verifyAdmitted/admittedCourseWiseData`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

        getVerifyAdmittedCandidateList: builder.mutation({
			query: (body) => ({
				url: `meritVerification/verifyAdmitted/candidateList?choiceCode=${body.choiceCode}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

		lockVerifyAdmittedChoiceCode: builder.mutation({
			query: (body) => ({
				url: `meritVerification/verifyAdmitted/lockVerification`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),



	}),
});

export const {
	useGetMarkForCancelChoiceCodeListMutation,
    useGetMarkForCandidateListMutation,
    useCancelCandidateInMeritMutation,
    useRestoreCandidateInMeritMutation,
    useGetMarkForCancelCandidateListMutation,
	useGetVerifyAdmittedDocsChoiceCodeListMutation,
	useGetVerifyAdmittedDocsCandidateListMutation,
	useAdmittedackInstPrintMutation,
	useAdmittedackCAPPrintMutation,
	useVerifyAdmittedChoiceCodeListMutation,
    useGetVerifyAdmittedCandidateListMutation,
	useLockVerifyAdmittedChoiceCodeMutation,
} = authApi;
