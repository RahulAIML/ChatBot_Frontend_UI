import { apiSliceInstitute } from '../instituteApiSlice';

export const authApi = apiSliceInstitute.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
	

		checkPayment: builder.mutation({
			query: (body) => ({
				url: `institute/instituteLevel/admit/checkPayment`,
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

		getSingleCandidateForInstitute: builder.mutation({
			query: (body) => ({
				url: `institute/instituteLevel/admit/singleCandidate?candidateId=${body.candidateId}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		getChoiceCode: builder.mutation({
			query: (body) => ({
				url: `institute/instituteLevel/admit/choiceCodeList`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		getAdmissionTypeList: builder.mutation({
			query: (body) => ({
				url: `institute/instituteLevel/admit/admissionTypes?choiceCode=${body.choiceCode}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

		admitCandidateInstLevel: builder.mutation({
			query: (body) => ({
				url: `institute/instituteLevel/admit/submitReporting`,
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

		ackPrintAdmittedInstLevel: builder.mutation({
			query: (body) => ({
				url: `institute/instituteLevel/admit/ackPrint?candidateId=${body.candidateId}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

		getAdmittedCandidateList: builder.mutation({
			query: (body) => ({
				url: `institute/instituteLevel/admit/getAdmittedCandidateList`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

		getSingleCandidateEdit: builder.mutation({
			query: (body) => ({
				url: `institute/instituteLevel/admit/singleCandidateEdit?candidateId=${body.candidateId}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

		editsubmitReporting: builder.mutation({
			query: (body) => ({
				url: `institute/instituteLevel/admit/editAdmitCandidate`,
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

		//cancel

		getCancelChoiceCode: builder.mutation({
			query: (body) => ({
				url: `institute/instituteLevel/cancel/choiceCodeWiseCancel`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

		getCancelCandidateList: builder.mutation({
			query: (body) => ({
				url: `institute/instituteLevel/cancel/cancelCandidateList?choiceCode=${body.choiceCode}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

		getCancelSingleCandidate: builder.mutation({
			query: (body) => ({
				url: `institute/instituteLevel/cancel/singleCandidateForCancel?choiceCode=${body.choiceCode}&candidateId=${body.candidateId}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

		cancelCandidateInst: builder.mutation({
			query: (body) => ({
				url: `institute/instituteLevel/cancel/cancelCandidate`,
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

		getCancelCandidatePrint: builder.mutation({
			query: (body) => ({
				url: `institute/instituteLevel/cancel/cancelPrint?choiceCode=${body.choiceCode}&candidateId=${body.candidateId}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

		getCancelledCandidateList: builder.mutation({
			query: (body) => ({
				url: `institute/instituteLevel/cancel/cancelledCandidateList`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
	}),
});

export const {
	
	useCheckPaymentMutation,
	useGetSingleCandidateForInstituteMutation,
	useGetChoiceCodeMutation,
	useGetAdmissionTypeListMutation,
	useAdmitCandidateInstLevelMutation,
	useAckPrintAdmittedInstLevelMutation,
	useGetAdmittedCandidateListMutation,
	useGetSingleCandidateEditMutation,
	useEditsubmitReportingMutation,
	//cancel
	useGetCancelChoiceCodeMutation,
	useGetCancelCandidateListMutation,
	useGetCancelSingleCandidateMutation,
	useCancelCandidateInstMutation,
	useGetCancelCandidatePrintMutation,
	useGetCancelledCandidateListMutation,
} = authApi;
