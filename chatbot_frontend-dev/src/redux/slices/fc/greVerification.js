import { apiSliceFC } from '../fcApiSlice';

export const authApi = apiSliceFC.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		getGreVerificationStat: builder.mutation({
			query: (body) => ({
				url: '/fc/grivance/getEFCcount',
				method: 'GET',
			}),
		}),
		getGreFreshApplicationList: builder.mutation({
			query: (body) => ({
				url: '/fc/grivance/pendingApplicationsList',
				method: 'GET',
				// body: body,
			}),
		}),

		getGreVerifiedApplicationList: builder.mutation({
			query: (body) => ({
				url: '/fc/grivance/finalConfirmList',
				method: 'GET',
				// body: body,
			}),
		}),
		getGreDiscrepancyApplicationList: builder.mutation({
			query: (body) => ({
				url: '/fc/grivance/discrepancyByARCList',
				method: 'GET',
				// body: body,
			}),
		}),

		greCandiPickUnpick: builder.mutation({
			query: (body) => ({
				url: `/fc/grivance/pickOrUnpickCandidate`,
				method: 'POST',
				body: body,
			}),
		}),

		getCandidateDataFormHomeGrie: builder.mutation({
			query: (body) => ({
				url: `/fc/grivance/getCandidateDetailsForHome?candidateId=${body.candidateId}`,
				method: 'GET',
				//body: body,
			}),
		}),
		getCandidateDataFormStepGrie: builder.mutation({
			query: (body) => ({
				url: `fc/grivance/getCandidateDetailsForStep?candidateId=${body.candidateId}&stepId=${body.stepId}`,
				method: 'GET',
				//body: body,
			}),
		}),
		candidateSubmitStepGrie: builder.mutation({
			query: (body) => ({
				url: 'fc/grivance/confirmCandidateStep',
				method: 'POST',
				body: body,
			}),
		}),

		getCandidateDataFormSummeryGrie: builder.mutation({
			query: (body) => ({
				url: `fc/grivance/getCandidateDetailsForAllStep?candidateId=${body.candidateId}`,
				method: 'GET',
				//body: body,
			}),
		}),

		getfreshcheckandconvertDataGrie: builder.mutation({
			query: (body) => ({
				url: `fc/grivance/checkConverted?candidateId=${body.candidateId}`,
				method: 'GET',
				//body: body,
			}),
		}),

		candidateSubmitStepFinalGrie: builder.mutation({
			query: (body) => ({
				url: 'fc/grivance/confrimAndUpdate',
				method: 'POST',
				body: body,
			}),
		}),
		
		grecandidateDiscrepancyReverification: builder.mutation({
			query: (body) => ({
				url: '/fc/grivance/discrepancyByCandidateList',
				method: 'GET',
				// body: body,
			}),
		}),
	}),
});

export const {
	useGetGreVerificationStatMutation,
	useGetGreFreshApplicationListMutation,
	useGreCandiPickUnpickMutation,
	useGetCandidateDataFormHomeGrieMutation,
	useGetGreDiscrepancyApplicationListMutation,
	useGetGreVerifiedApplicationListMutation,
	useGrecandidateDiscrepancyReverificationMutation,
	

	useGetCandidateDataFormStepGrieMutation,
	useCandidateSubmitStepGrieMutation,
    useGetCandidateDataFormSummeryGrieMutation,
    useGetfreshcheckandconvertDataGrieMutation,
    useCandidateSubmitStepFinalGrieMutation,
} = authApi;
