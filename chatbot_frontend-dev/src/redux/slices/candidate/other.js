import { apiSliceCandidate } from '../candidateApiSlice';

export const authApi = apiSliceCandidate.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		getState: builder.mutation({
			query: (body) => ({
				url: '/masterController/selectState',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

		getDistrict: builder.mutation({
			query: (body) => ({
				url: '/masterController/selectDistrict',
				method: 'POST',
				body: body,
			}),
		}),
		checkEmail: builder.mutation({
			query: (body) => ({
				url: '/masterController/selectEmailId',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
		checkPhoneNumber: builder.mutation({
			query: (body) => ({
				url: '/masterController/selectMobileNo',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

		notifications: builder.mutation({
			query: (language) => ({
				url: `common/public/notification?course_name=${import.meta.env.VITE_APPNAME_SMALL}`,
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),

		important: builder.mutation({
			query: (language) => ({
				url: `/common/public/importantDates?course_name=${import.meta.env.VITE_APPNAME_SMALL}`,
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),

		news: builder.mutation({
			query: (language) => ({
				url: `/common/public/news?course_name=${import.meta.env.VITE_APPNAME_SMALL}`,
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),

		download: builder.mutation({
			query: (language) => ({
				url: `/common/public/downloads?course_name=${import.meta.env.VITE_APPNAME_SMALL}`,
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),

		faq: builder.mutation({
			query: (language) => ({
				url: `common/public/faqs?course_name=${import.meta.env.VITE_APPNAME_SMALL}`,
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),

		getCategory: builder.mutation({
			query: () => ({
				url: `/masterController/selectCategory`,
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
		getSubCategory: builder.mutation({
			query: (body) => ({
				url: `/masterController/selectSubCategory`,
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

		getPhysicalDisa: builder.mutation({
			query: (body) => ({
				url: `/masterController/getPhDetails`,
				method: 'GET',
				body: body,
				// credentials: 'include',
			}),
		}),

		getDefenceStatus: builder.mutation({
			query: (body) => ({
				url: `/masterController/getDefence`,
				method: 'GET',
				body: body,
				// credentials: 'include',
			}),
		}),

		getAnnualIncome: builder.mutation({
			query: (body) => ({
				url: `/masterController/getIncomeRange`,
				method: 'GET',
				body: body,
				// credentials: 'include',
			}),
		}),
		getReligion: builder.mutation({
			query: (body) => ({
				url: `/masterController/getReligion`,
				method: 'GET',
				body: body,
				// credentials: 'include',
			}),
		}),
		getMotherTongue: builder.mutation({
			query: (body) => ({
				url: `/masterController/getLangauge`,
				method: 'GET',
				body: body,
				// credentials: 'include',
			}),
		}),
		getTaluka: builder.mutation({
			query: (body) => ({
				url: '/masterController/getTaluka',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
		getVillage: builder.mutation({
			query: (body) => ({
				url: '/masterController/getVillage',
				method: 'POST',
				body: body,
			}),
		}),
		// credentials: 'include',
		getHscBoard: builder.mutation({
			query: (body) => ({
				url: `/masterController/getHscBoard`,
				method: 'GET',
				body: body,
			}),
		}),

		getSscBoard: builder.mutation({
			query: (body) => ({
				url: `/masterController/getSscBoard`,
				method: 'GET',
				body: body,
			}),
		}),

		getReligionMinority: builder.mutation({
			query: (body) => ({
				url: `/masterController/getReligiousMinority`,
				method: 'POST',
				body: body,
			}),
		}),

		getLinguisticMinority: builder.mutation({
			query: (body) => ({
				url: `/masterController/getLinguasticMinority`,
				method: 'POST',
				body: body,
			}),
		}),
		getEmailAndMobile: builder.mutation({
			query: (body) => ({
				url: `masterController/emailIdForPersonalDetails`,
				method: 'GET',
				// body: body,
			}),
		}),
		getSMSLog: builder.mutation({
			query: (body) => ({
				url: `smsController/getsms`,
				method: 'GET',
				// body: body,
			}),
		}),
		getTransactionLogs: builder.mutation({
			query: (body) => ({
				url: `smsController/getTransactions`,
				method: 'GET',
				// body: body,
			}),
		}),
		fclist: builder.mutation({
			query: (body) => ({
				url: `masterController/fcList`,
				method: 'GET',
				//	body: body,
			}),
		}),

		getFClist: builder.mutation({
			query: (body) => ({
				url: `slotTimeController/fclistSlot`,
				method: 'POST',
				body: body,
			}),
		}),
		getTimeSlot: builder.mutation({
			query: (body) => ({
				url: `slotTimeController/timeSlot`,
				method: 'POST',
				body: body,
			}),
		}),
		getSubjects: builder.mutation({
			query: (body) => ({
				url: `masterController/subjectsForMessage`,
				method: 'GET',
				// body: body,
			}),
		}),
		getSlotData: builder.mutation({
			query: (body) => ({
				url: `slotTimeController/getSlotList`,
				method: 'GET',
				// body: body,
			}),
		}),
		getOnline: builder.mutation({
			query: (body) => ({
				url: `common/public/onliensystem?course_name=${import.meta.env.VITE_APPNAME_SMALL}`,
				method: 'GET',
				// body: body,
			}),
		}),
		getImportant: builder.mutation({
			query: (body) => ({
				url: `masterController/scrollingEvent`,
				method: 'GET',
				// body: body,
			}),
		}),
		getScrollingEvent: builder.mutation({
			query: (body) => ({
				url: `common/public/scrollingsystem?course_name=${import.meta.env.VITE_APPNAME_SMALL}`,
				method: 'GET',
				// body: body,
			}),
		}),
	}),
});

export const {
	useGetImportantMutation,
	useGetScrollingEventMutation,
	useGetOnlineMutation,
	useGetSlotDataMutation,
	useFclistMutation,
	useGetDistrictMutation,
	useGetStateMutation,
	useCheckEmailMutation,
	useCheckPhoneNumberMutation,
	useNotificationsMutation,
	useNewsMutation,
	useDownloadMutation,
	useImportantMutation,
	useFaqMutation,
	useGetCategoryMutation,
	useGetSubCategoryMutation,
	useGetPhysicalDisaMutation,
	useGetDefenceStatusMutation,
	useGetAnnualIncomeMutation,
	useGetMotherTongueMutation,
	useGetReligionMutation,
	useGetVillageMutation,
	useGetTalukaMutation,
	useGetHscBoardMutation,
	useGetSscBoardMutation,
	useGetReligionMinorityMutation,
	useGetLinguisticMinorityMutation,
	useGetEmailAndMobileMutation,
	useGetSMSLogMutation,
	useGetFClistMutation,
	useGetTimeSlotMutation,
	useGetSubjectsMutation,
	useGetTransactionLogsMutation,
} = authApi;
