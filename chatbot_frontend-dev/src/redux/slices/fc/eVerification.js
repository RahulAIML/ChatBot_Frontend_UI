import { apiSliceFC } from '../fcApiSlice';

// import { HistoryProps } from '@/pages/Account/components/securityLoginHistory';
//import { simulateLoading } from '@/utils/helpers';

export const authApi = apiSliceFC.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		getEVerificationStat: builder.mutation({
			query: (body) => ({
				url: 'fc/efc/getEFCcount',
				method: 'GET',
			}),
		}),
		getFreshApplicationList: builder.mutation({
			query: (body) => ({
				url: 'fc/efc/pendingApplicationsList',
				method: 'GET',
				//body: body,
			}),
		}),

		getVerifiedApplicationList: builder.mutation({
			query: (body) => ({
				url: '/fc/efc/finalConfirmList',
				method: 'GET',
				//body: body,
			}),
		}),
		getDiscrepancyApplicationList: builder.mutation({
			query: (body) => ({
				url: 'fc/efc/discrepancyByARCList',
				method: 'GET',
				//body: body,
			}),
		}),

		freshCandiPickUnpick: builder.mutation({
			query: (body) => ({
				url: 'fc/efc/pickOrUnpickCandidate',
				method: 'POST',
				body: body,
			}),
		}),

		getCandidateDataFormHome: builder.mutation({
			query: (body) => ({
				url: `fc/efc/getCandidateDetailsForHome?candidateId=${body.candidateId}`,
				method: 'GET',
				//body: body,
			}),
		}),
		getCandidateDataFormStep: builder.mutation({
			query: (body) => ({
				url: `fc/efc/getCandidateDetailsForStep?candidateId=${body.candidateId}&stepId=${body.stepId}`,
				method: 'GET',
				//body: body,
			}),
		}),
		candidateSubmitStep: builder.mutation({
			query: (body) => ({
				url: 'fc/efc/confirmCandidateStep',
				method: 'POST',
				body: body,
			}),
		}),

		getCandidateDataFormSummery: builder.mutation({
			query: (body) => ({
				url: `fc/efc/getCandidateDetailsForAllStep?candidateId=${body.candidateId}`,
				method: 'GET',
				//body: body,
			}),
		}),

		getfreshcheckandconvertData: builder.mutation({
			query: (body) => ({
				url: `fc/efc/checkConverted?candidateId=${body.candidateId}`,
				method: 'GET',
				//body: body,
			}),
		}),

		candidateSubmitStepFinal: builder.mutation({
			query: (body) => ({
				url: 'fc/efc/confrimAndUpdate',
				method: 'POST',
				body: body,
			}),
		}),
		candidateDiscrepancyReverification: builder.mutation({
			query: (body) => ({
				url: 'fc/efc/discrepancyByCandidateList',
				method: 'GET',
				//body: body,
			}),
		}),
	}),
});

export const {
	useGetEVerificationStatMutation,
	useGetFreshApplicationListMutation,
	useFreshCandiPickUnpickMutation,
	useGetCandidateDataFormHomeMutation,
	useGetCandidateDataFormStepMutation,
	useCandidateSubmitStepMutation,
	useGetCandidateDataFormSummeryMutation,
	useGetfreshcheckandconvertDataMutation,
	useCandidateSubmitStepFinalMutation,
	useGetVerifiedApplicationListMutation,
	useGetDiscrepancyApplicationListMutation,
	useCandidateDiscrepancyReverificationMutation,
} = authApi;
