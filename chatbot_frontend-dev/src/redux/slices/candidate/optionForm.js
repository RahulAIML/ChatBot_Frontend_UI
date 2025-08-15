import { apiSliceCandidate } from '../candidateApiSlice';

export const authApi = apiSliceCandidate.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		getInstitutesTypesLists: builder.mutation({
			query: (body) => ({
				url: '/option-form/institutesTypes',
				method: 'GET',
			}),
		}),
		getUniversityTypesLists: builder.mutation({
			query: (body) => ({
				url: '/common/universityList',
				method: 'GET',
			}),
		}),

		getAutoInstitutesList: builder.mutation({
			query: (body) => ({
				url: '/option-form/autoinstitutesTypes',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
		getRegionAndDistrict: builder.mutation({
			query: (body) => ({
				url: '/option-form/regionAndDistricts',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
		getCourseList: builder.mutation({
			query: (body) => ({
				url: '/option-form/courseList',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
		getInstituteList: builder.mutation({
			query: (body) => ({
				url: '/option-form/instituesList',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

		getMeritStatus: builder.mutation({
			query: (body) => ({
				url: '/option-form/getMeritStatus',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),

		updateFilter: builder.mutation({
			query: (body) => ({
				url: '/option-form/updateFilter',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
		candidateSelectedCourse: builder.mutation({
			query: (body) => ({
				url: '/option-form/candidateSelectedCourse',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
		getListOfInstitutes: builder.mutation({
			query: (body) => ({
				url: '/option-form/getInstituteList',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
		updateInstituteSelection: builder.mutation({
			query: (body) => ({
				url: '/option-form/saveInstituteOptions',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
		getPrefenceList: builder.mutation({
			query: (body) => ({
				url: '/option-form/getPrefrenceList',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
		savePrefrence: builder.mutation({
			query: (body) => ({
				url: '/option-form/savePreference',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
		verifyPassword: builder.mutation({
			query: (body) => ({
				url: '/option-form/checkPassword',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
		otpVerifyForOptionForm: builder.mutation({
			query: (body) => ({
				url: '/option-form/verifyOptionFormOtp',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

		getConfirmAndData: builder.mutation({
			query: (body) => ({
				url: '/option-form/getConfirmAndData',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
		getDataForOptionPrint: builder.mutation({
			query: (body) => ({
				url: '/getPrint/optionForm',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
		getPreviousAllotment: builder.mutation({
			query: (body) => ({
				url: '/option-form/getPreviousAllotment',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
		optionPrint: builder.mutation({
			query: (body) => ({
				url: `/option-form/optionFormPrint?round=${body.round}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),

	}),
});

export const {
	useGetPreviousAllotmentMutation,
	useGetAutoInstitutesListMutation,
	useGetInstitutesTypesListsMutation,
	useGetRegionAndDistrictMutation,
	useGetUniversityTypesListsMutation,
	useGetCourseListMutation,
	useGetInstituteListMutation,
	useGetMeritStatusMutation,
	useUpdateFilterMutation,
	useCandidateSelectedCourseMutation,
	useGetListOfInstitutesMutation,
	useUpdateInstituteSelectionMutation,
	useGetPrefenceListMutation,
	useSavePrefrenceMutation,
	useVerifyPasswordMutation,
	useOtpVerifyForOptionFormMutation,
	useGetConfirmAndDataMutation,
	useGetDataForOptionPrintMutation,
	useOptionPrintMutation,
} = authApi;
