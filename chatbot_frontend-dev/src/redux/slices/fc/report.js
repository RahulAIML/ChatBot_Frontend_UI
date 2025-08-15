import { apiSliceFC } from '../fcApiSlice';

export const authApi = apiSliceFC.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		fcConfirmCount: builder.mutation({
			query: (body) => ({
				url: 'fc/report/getMasteReport_1',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		fcConfirm: builder.mutation({
			query: (body) => ({
				url: '/reportController/fcConfirm',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		categoryWiseReport: builder.mutation({
			query: (body) => ({
				url: 'fc/report/getCategoryReport',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		categoryWiseReportAll: builder.mutation({
			query: (body) => ({
				url: `fc/report/categoryReport?category=${body.id}`,
				method: 'GET',
				body: body,
				// credentials: 'include',
			}),
		}),
		getOptionFormreport: builder.mutation({
			query: (body) => ({
				url: 'fc/report/getOptionFormReport',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		getcumulativereport: builder.mutation({
			query: (body) => ({
				url: 'fc/report/getcumulativeReport',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		getinnercumulativereport: builder.mutation({
			query: (body) => ({
				url: `fc/report/cummulativeReport?date=${body.date}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		genderWiseReport: builder.mutation({
			query: (body) => ({
				url: 'fc/report/getGenderReport',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		incomeWiseReport: builder.mutation({
			query: (body) => ({
				url: 'fc/report/getIncomeReport',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		typeWiseReport: builder.mutation({
			query: (body) => ({
				url: 'fc/report/getTypeWisereport',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		getAfterconfirmedited: builder.mutation({
			query: (body) => ({
				url: 'fc/report/getAfterconfirmeditedReport',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		getAfterconfirmeditedNext: builder.mutation({
			query: (body) => ({
				url: `fc/report/innerAfterconfirmButNotConfirmAgain?user=${body?.id}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		getEditAfterconfirmedited: builder.mutation({
			query: (body) => ({
				url: 'fc/report/afterconfirmedButnotConfirmAgain',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		getEditAfterconfirmeditedNext: builder.mutation({
			query: (body) => ({
				url: `fc/report/innerEditAfterConfirm?user=${body?.id}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		getApplicationwise: builder.mutation({
			query: (body) => ({
				url: 'fc/report/getApplicationwise',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		getDistrictWise: builder.mutation({
			query: (body) => ({
				url: 'fc/report/getDistrictWiseReport',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		getTimeWise: builder.mutation({
			query: (body) => ({
				url: 'fc/report/gettimewiseReport',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		getReceiptCountWise: builder.mutation({
			query: (body) => ({
				url: 'fc/report/getReceiptCountnwise',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		getReceiptCountWiseSingle: builder.mutation({
			query: (body) => ({
				url: `fc/report/getReceiptCountnwiseNext?id=${body.id}`,
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		getHundredCollection: builder.mutation({
			query: (body) => ({
				url: 'fc/report/hundredCollection',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		getConvertCount: builder.mutation({
			query: (body) => ({
				url: 'fc/report/convertCountReport',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		getGenderInner: builder.mutation({
			query: (body) => ({
				url: `fc/report/genderReport?gender=${body.id}`,
				method: 'GET',
				//body: body,
				//credentials: 'include',
			}),
		}),
		getIncomeInner: builder.mutation({
			query: (body) => ({
				url: `fc/report/incomeReport?income=${body.income}`,
				method: 'GET',
				//body: body,
				//credentials: 'include',
			}),
		}),
		getInnerType: builder.mutation({
			query: (body) => ({
				url: `fc/report/candidateTypeReport?mastertypeId=${body.id}`,
				method: 'GET',
				//body: body,
				//credentials: 'include',
			}),
		}),
		getInnerCategory: builder.mutation({
			query: (body) => ({
				url: `/fc/report/categoryReport?category=${body.id}`,
				method: 'GET',
				//body: body,
				//credentials: 'include',
			}),
		}),
		getInnerAfterConfirm: builder.mutation({
			query: (body) => ({
				url: `reportController/candidate/innerEditAfterConfirm?user=${body.id}`,
				method: 'GET',
				//body: body,
				//credentials: 'include',
			}),
		}),
		getFcConfirm: builder.mutation({
			query: (body) => ({
				url: `fc/report/getMasteReport_2?arcid=${body.id}`,
				method: 'GET',
				//body: body,
				//credentials: 'include',
			}),
		}),
		getLoginDetails: builder.mutation({
			query: (body) => ({
				url: `fc/report/login_details`,
				method: 'GET',
				//body: body,
				//credentials: 'include',
			}),
		}),
		getScanerAndDoughtfullCases: builder.mutation({
			query: (body) => ({
				url: `fc/report/scannerCaseReports`,
				method: 'GET',
				//body: body,
				//credentials: 'include',
			}),
		}),
	}),
});

export const {
	useGetFcConfirmMutation,
	useGetInnerAfterConfirmMutation,
	useGetIncomeInnerMutation,
	useGetInnerCategoryMutation,
	useGetInnerTypeMutation,
	useGetReceiptCountWiseSingleMutation,
	useGetGenderInnerMutation,
	useGetConvertCountMutation,
	useGetHundredCollectionMutation,
	useGetReceiptCountWiseMutation,
	useGetTimeWiseMutation,
	useGetDistrictWiseMutation,
	useCategoryWiseReportMutation,
	useFcConfirmCountMutation,
	useFcConfirmMutation,
	useGetOptionFormreportMutation,
	useGetcumulativereportMutation,
	useGetApplicationwiseMutation,
	useGenderWiseReportMutation,
	useIncomeWiseReportMutation,
	useTypeWiseReportMutation,
	useGetAfterconfirmeditedMutation,
	useGetinnercumulativereportMutation,
	useGetAfterconfirmeditedNextMutation,
	useGetEditAfterconfirmeditedMutation,
	useGetEditAfterconfirmeditedNextMutation,
	useGetLoginDetailsMutation,

	useGetScanerAndDoughtfullCasesMutation,
} = authApi;
