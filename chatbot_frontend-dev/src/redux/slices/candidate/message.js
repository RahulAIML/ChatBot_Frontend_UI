import { apiSliceCandidate } from '../candidateApiSlice';

export const authApi = apiSliceCandidate.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		getMessages: builder.mutation({
			query: (body) => ({
				url: '/messageBox/getAllComposeMessage',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
		starredOrUnstarred: builder.mutation({
			query: (body) => ({
				url: '/messageBox/starMessage',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

		replyMessagess: builder.mutation({
			query: (body) => ({
				url: '/messageBox/getAllReplyMessage',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
		notificationMessagess: builder.mutation({
			query: (body) => ({
				url: '/messageBox/notificationMessage',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
	}),
});

export const {
	useGetMessagesMutation,
	useStarredOrUnstarredMutation,
	useReplyMessagessMutation,
	useNotificationMessagessMutation,
} = authApi;
