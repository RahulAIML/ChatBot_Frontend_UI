import { apiSliceInstitute } from '../instituteApiSlice';

export const authApi = apiSliceInstitute.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		getCourseWiseData: builder.mutation({
			query: (body) => ({
				url: `institute/institutereporting/admitCandidate/courseWiseData?round=${body.round}`,
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
		getCapAllotedCandidateList: builder.mutation({
			query: (body) => ({
				url: `institute/institutereporting/allotedCandidate/capAllotedCandidateList?round=${body.round}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		isAcceptedUpdate: builder.mutation({
			query: (body) => ({
				url: 'institute/institutereporting/allotedCandidate/isAcceptedUpdate',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
		isReportedUpdate: builder.mutation({
			query: (body) => ({
				url: 'institute/institutereporting/allotedCandidate/isReportedUpdate',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
		getCandidateList: builder.mutation({
			query: (body) => ({
				url: `institute/institutereporting/admitCandidate/candidateList?choiceCode=${body.choiceCode}&round=${body.round}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		getSingleCandidate: builder.mutation({
			query: (body) => ({
				url: `institute/institutereporting/admitCandidate/singleCandidate?choiceCode=${body.choiceCode}&candidateId=${body.candidateId}&round=${body.round}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		sentOtp: builder.mutation({
			query: (body) => ({
				url: `institute/institutereporting/admitCandidate/sendOtpForInstReporting?&candidateId=${body.candidateId}&round=${body.round}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		admitCandidate: builder.mutation({
			query: (body) => ({
				url: `institute/institutereporting/admitCandidate/admitCandidate`,
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

		bettermentList: builder.mutation({
			query: (body) => ({
				url: `institute/instituteReporting/betterment/bettermentList?round=${body.round}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

		bettermentCandidateList: builder.mutation({
			query: (body) => ({
				url: `institute/institutereporting/betterment/candidateList?choiceCode=${body.choiceCode}&round=${body.round}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

		checkArcCancelled: builder.mutation({
			query: (body) => ({
				url: `institute/institutereporting/selfArcCancelled/checkSelfArcCancelled`,
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

		cancelledCandidate: builder.mutation({
			query: (body) => ({
				url: `institute/institutereporting/selfArcCancelled/cancelledCandidate`,
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

		getDataSelfArcCancelled: builder.mutation({
			query: (body) => ({
				url: `institute/institutereporting/selfArcCancelled/getDataForSlefArcCancelled?candidate=${body.candidate}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		ackPrint: builder.mutation({
			query: (body) => ({
				url: `institute/institutereporting/admitCandidate/ackPrint?candidateId=${body.candidateId}&round=${body.round}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

		getAdmittedCourdeWiseData: builder.mutation({
			query: (body) => ({
				url: `institute/institutereporting/admittedCandidate/courseWiseData?round=${body.round}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		getAdmittedCandidateListData: builder.mutation({
			query: (body) => ({
				url: `institute/institutereporting/admittedCandidate/candidateList?choiceCode=${body.choiceCode}&round=${body.round}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

		getAdmittedSingleCandidate: builder.mutation({
			query: (body) => ({
				url: `institute/institutereporting/admittedCandidate/singleCandidate?choiceCode=${body.choiceCode}&candidateId=${body.candidateId}&round=${body.round}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

		updateAdmittedCandidate: builder.mutation({
			query: (body) => ({
				url: `institute/institutereporting/admittedCandidate/admitCandidate`,
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
	}),
});

export const {
	useGetCourseWiseDataMutation,
	useGetCapAllotedCandidateListMutation,
	useIsAcceptedUpdateMutation,
	useIsReportedUpdateMutation,
	useGetCandidateListMutation,
	useGetSingleCandidateMutation,
	useSentOtpMutation,
	useAdmitCandidateMutation,
	useBettermentListMutation,
	useBettermentCandidateListMutation,
	useCheckArcCancelledMutation,
	useCancelledCandidateMutation,
	useGetDataSelfArcCancelledMutation,
	useAckPrintMutation,
	useGetAdmittedCourdeWiseDataMutation,
	useGetAdmittedCandidateListDataMutation,
	useGetAdmittedSingleCandidateMutation,
	useUpdateAdmittedCandidateMutation,
} = authApi;
