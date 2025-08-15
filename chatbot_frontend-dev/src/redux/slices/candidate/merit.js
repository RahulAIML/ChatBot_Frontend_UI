import { apiSliceCandidate } from '../candidateApiSlice';

export const authApi = apiSliceCandidate.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		getFinalMerit: builder.mutation({
			query: (body) => ({
				url: '/getPrint/finalMeritPrint',
				method: 'GET',

				// credentials: 'include',
			}),
		}),
		getProvisionalMerit: builder.mutation({
			query: (body) => ({
				url: '/getPrint/provisionalMeritPrint',
				method: 'GET',

				// credentials: 'include',
			}),
		}),
		getRoundOne: builder.mutation({
			query: (body) => ({
				url: '/getallotment/roundWiseAllotmentPrintForCand',
				method: 'GET',

				// credentials: 'include',
			}),
		}),
		getRoundTwo: builder.mutation({
			query: (body) => ({
				url: '/getallotment/roundWiseAllotmentPrintForCand2',
				method: 'GET',

				// credentials: 'include',
			}),
		}),
		getRoundThree: builder.mutation({
			query: (body) => ({
				url: '/getallotment/roundWiseAllotmentPrintForCand3',
				method: 'GET',

				// credentials: 'include',
			}),
		}),
	}),
});

export const { useGetFinalMeritMutation, useGetProvisionalMeritMutation,useGetRoundOneMutation,useGetRoundTwoMutation,useGetRoundThreeMutation } = authApi;
