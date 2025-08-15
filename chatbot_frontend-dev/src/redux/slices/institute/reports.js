import { apiSliceInstitute } from '../instituteApiSlice';

export const authApi = apiSliceInstitute.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    seatAcceptanceReport: builder.mutation({
      query: (body) => ({
        url: `/reports/capWiseSeatAcceptanceReport?round=${body.round}`,
        method: 'GET',
        //body: body,
        // credentials: 'include',
      }),
    }),
    seatAcceptanceReportList: builder.mutation({
      query: (body) => ({
        url: `/reports/capWiseSeatAcceptanceReportCandList?filterType=${body.type}&round=${body.round}`,
        method: 'GET',
        //body: body,
        // credentials: 'include',
      }),
    }),
    candFreezeAutoFreeze: builder.mutation({
      query: (body) => ({
        url: `institute/instituteReport/freezedAndAcceptedSeatButNotReportedInst?round=${body.round}`,
        method: 'GET',
        //body: body,
        // credentials: 'include',
      }),
    }),
    candAllotedNotAccepted: builder.mutation({
      query: (body) => ({
        url: `institute/instituteReport/allotedButNotAcceptedSeat?round=${body.round}`,
        method: 'GET',
        //body: body,
        // credentials: 'include',
      }),
    }),

    dateWiseInstiReport: builder.mutation({
      query: (body) => ({
        url: `institute/instituteReport/dateWiseInstReporting`,
        method: 'GET',
        //body: body,
        // credentials: 'include',
      }),
    }),
    dateWiseInstiReportList: builder.mutation({
      query: (body) => ({
        url: `/reports/dateWiseInstReportingList?date=${body.date}`,
        method: 'GET',
        //body: body,
        // credentials: 'include',
      }),
    }),
    fcConfirmCount: builder.mutation({
      query: (body) => ({
        url: '/reportController/fcConfirmCount',
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
        url: `institute/instituteReport/categoryWiseReported`,
        method: 'GET',
        //body: body,
        // credentials: 'include',
      }),
    }),
    getOptionFormreport: builder.mutation({
      query: (body) => ({
        url: '/reportController/candidate/getOptionFormreport',
        method: 'GET',
        //body: body,
        // credentials: 'include',
      }),
    }),
    getcumulativereport: builder.mutation({
      query: (body) => ({
        url: '/reportController/candidate/getcumulativereport',
        method: 'GET',
        //body: body,
        // credentials: 'include',
      }),
    }),
    genderWiseReport: builder.mutation({
      query: (body) => ({
        url: '/reportController/candidate/genderWiseReport',
        method: 'GET',
        //body: body,
        // credentials: 'include',
      }),
    }),
    incomeWiseReport: builder.mutation({
      query: (body) => ({
        url: 'reportController/candidate/incomeWiseReport',
        method: 'GET',
        //body: body,
        // credentials: 'include',
      }),
    }),
    typeWiseReport: builder.mutation({
      query: (body) => ({
        url: 'reportController/candidate/typeWiseReport',
        method: 'GET',
        //body: body,
        // credentials: 'include',
      }),
    }),
    getAfterconfirmedited: builder.mutation({
      query: (body) => ({
        url: 'reportController/candidate/getAfterconfirmedited',
        method: 'GET',
        //body: body,
        // credentials: 'include',
      }),
    }),
    getApplicationwise: builder.mutation({
      query: (body) => ({
        url: 'reportController/candidate/getApplicationwise',
        method: 'GET',
        //body: body,
        // credentials: 'include',
      }),
    }),
    getRegionWiseCompositeReportstep3: builder.mutation({
      query: (body) => ({
        url: `/getRegionWiseCompositeReportStep3?inst_id=${body.inst_id}`,
        method: 'Get',
      }),
    }),
    getFlatData: builder.mutation({
      query: (body) => ({
        url: 'institute/instituteReport/flatData',
        method: 'GET',
        //body: body,
        // credentials: 'include',
      }),
    }),
  }),
});

export const {
  useCategoryWiseReportMutation,
  useFcConfirmCountMutation,
  useFcConfirmMutation,
  useCandFreezeAutoFreezeMutation,
  useGetOptionFormreportMutation,
  useCandAllotedNotAcceptedMutation,
  useGetcumulativereportMutation,
  useGetApplicationwiseMutation,
  useGenderWiseReportMutation,
  useIncomeWiseReportMutation,
  useTypeWiseReportMutation,
  useGetAfterconfirmeditedMutation,
  useSeatAcceptanceReportMutation,
  useSeatAcceptanceReportListMutation,
  useDateWiseInstiReportMutation,
  useDateWiseInstiReportListMutation,
  useGetRegionWiseCompositeReportstep3Mutation,
  useGetFlatDataMutation,
} = authApi;
