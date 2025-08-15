import { apiSliceFC } from '../fcApiSlice';
export const authApi = apiSliceFC.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		capacityList: builder.mutation({
			query: (body) => ({
				url: '/fc/editFC/capacityList',
				method: 'GET',
				//body: body,
			}),
		}),
		editCapacity: builder.mutation({
			query: (body) => ({
				url: '/fc/editFC/editFcCapacity',
				method: 'POST',
				body: body,
			}),
		}),
		activeCapacity: builder.mutation({
			query: (body) => ({
				url: 'fc/editFC/editFcActiveInactive',
				method: 'POST',
				body: body,
			}),
		}),
	}),
});

export const { useCapacityListMutation, useActiveCapacityMutation, useEditCapacityMutation } =
	authApi;
