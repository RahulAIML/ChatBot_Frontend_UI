import { apiSliceCandidate } from '../candidateApiSlice';


export const authApi = apiSliceCandidate.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		getDataForHome: builder.mutation({
			query: (body) => ({
				url: 'seat-acceptance/acceptance/homeDetails',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
		getDataForSeatAcceptanceForm: builder.mutation({
			query: (body) => ({
				url: 'seat-acceptance/acceptance/candidateDetailsForSeatAccept',
				method: 'GET',
			}),
		}),
		getParamsList: builder.mutation({
			query: (body) => ({
				url: 'seat-acceptance/acceptance/parametersList',
				method: 'GET',
			}),
		}),
		getDocsList: builder.mutation({
			query: (body) => ({
				url: 'seat-acceptance/acceptance/docList',
				method: 'GET',
			}),
		}),
		updateSeatAccept: builder.mutation({
			query: (body) => ({
				url: 'seat-acceptance/acceptance/candidateSelfArcConfirmation',
				method: 'POST',
				body: body,
			}),
		}),
		sentOtp: builder.mutation({
			query: (body) => ({
				url: 'seat-acceptance/acceptance/sentOtpForSeatAcceptance',
				method: 'GET',
			}),
		}),
		confirmSeatStatus: builder.mutation({
			query: (body) => ({
				url: 'seat-acceptance/acceptance/confirmSeatStatus',
				method: 'POST',
				body: body,
			}),
		}),

		seatAcceptancePrint: builder.mutation({
			query: (body) => ({
				url: `seat-acceptance/acceptance/seatAcceptancePrint?round=${body.round}`,
				method: 'GET',
				//body: body,
			}),
		}),
		seatAcceptancePrint2: builder.mutation({
			query: (body) => ({
				url: 'seat-acceptance/acceptance/seatAcceptancePrint2',
				method: 'GET',
				//body: body,
			}),
		}),
		submitGrivance: builder.mutation({
			query: (body) => ({
				url: '/selfArcGrivance/submitGrivance',
				method: 'POST',
				body: body,
			}),
		}),
		selfArcMarks: builder.mutation({
			query: (body) => ({
				url: '/selfArcGrivance/selfArcMarks',
				method: 'POST',
				body: body,
			}),
		}),
		parametersList: builder.mutation({
			query: (body) => ({
				url: '/selfArcGrivance/parametersList',
				method: 'GET',
				//body: body,
			}),
		}),
		docList: builder.mutation({
			query: (body) => ({
				url: '/selfArcGrivance/docList',
				method: 'GET',
				//body: body,
			}),
		}),
	}),
});

export const {
	useGetDataForHomeMutation,
	useGetDataForSeatAcceptanceFormMutation,
	useGetParamsListMutation,
	useGetDocsListMutation,
	useUpdateSeatAcceptMutation,
	useSentOtpMutation,
	useConfirmSeatStatusMutation,
	useSeatAcceptancePrint2Mutation,
	useSeatAcceptancePrintMutation,
	useSubmitGrivanceMutation,
	useSelfArcMarksMutation,
	useParametersListMutation,
	useDocListMutation,

} = authApi;
