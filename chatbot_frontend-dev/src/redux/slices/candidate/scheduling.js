import { apiSliceCandidate } from '../candidateApiSlice';

export const authApi = apiSliceCandidate.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		slotBook: builder.mutation({
			query: (body) => ({
				url: '/applicationForm/scrutiny/selectSlot',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

		getTimeSlot: builder.mutation({
			query: (body) => ({
				url: '/applicationForm/scrutiny/getSlots',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

		getFClist: builder.mutation({
			query: (body) => ({
				url: `/applicationForm/scrutiny/getFcs`,
				method: 'POST',
				body: body,
			}),
		}),

		getSlotData: builder.mutation({
			query: (body) => ({
				url: `/applicationForm/scrutiny/getSelectedSlot`,
				method: 'GET',
				//body: body,
			}),
		}),
		
	}),
});

export const { useSlotBookMutation,useGetTimeSlotMutation,useGetFClistMutation,useGetSlotDataMutation } = authApi;
