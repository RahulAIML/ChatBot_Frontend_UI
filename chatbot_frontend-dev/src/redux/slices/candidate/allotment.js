
import { apiSliceCandidate } from '../candidateApiSlice';
export const authApi = apiSliceCandidate.injectEndpoints({
    // overrideExisting: true,
    endpoints: (builder) => ({
        allotmentPrint: builder.mutation({
            query: (body) => ({
                //url: `/print/finalMeritPrint?course_name=${import.meta.env.VITE_APPNAME_SMALL}&candidateId=${body.candidateId}&dob=${body.dob}`,
               url:'print/roundallotment' ,
                method: 'POST',
                body: body,
                // credentials: 'include',
            }),
        }),

        provisionalmerit: builder.mutation({
            query: (body) => ({
                url: `/print/provisionalMeritPrint?course_name=${import.meta.env.VITE_APPNAME_SMALL}&candidateId=${body.candidateId}&dob=${body.dob}`,
                method: 'GET',
                //body: body,
                // credentials: 'include',
            }),
        }),
        capRound: builder.mutation({
            query: (body) => ({
                url: 'getallotment/roundWiseAllotmentPrint',
                method: 'POST',
                body: body,
                // credentials: 'include',
            }),
        }),
        institudelist: builder.mutation({
            query: (body) => ({
                url: '/getmeritstatus/institutecourses',
                method: 'GET',
                body: body,
                // credentials: 'include',
            }),
        }),
        institudewiseAllotment: builder.mutation({
            query: (body) => ({
                url: '/getallotment/instituteWiseAllotment',
                method: 'GET',
                body: body,
                // credentials: 'include',
            }),
        }),
    }),
});

export const {
    useInstitudewiseAllotmentMutation,
useAllotmentPrintMutation,
    useProvisionalmeritMutation,
    useCapRoundMutation,
    useInstitudelistMutation,
} = authApi;
