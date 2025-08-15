import { apiSliceInstitute } from '../instituteApiSlice';

export const authApi = apiSliceInstitute.injectEndpoints({
	endpoints: (builder) => ({
		getRegionWiseCompositeReportstep3: builder.mutation({
			query: (body) => ({
				url: `/getRegionWiseCompositeReportStep3?inst_id=${body.inst_id}`,
				method: 'Get',
			}),
		}),
		getRegionWiseCompositeReportstep4: builder.mutation({
			query: (body) => ({
				url: `/getRegionWiseCompositeReportStep4?choice_code=${body.choice_code}`,
				method: 'Get',
			}),
		}),
	}),
});

export const {
	useGetRegionWiseCompositeReportstep3Mutation,
	useGetRegionWiseCompositeReportstep4Mutation,
} = authApi;
