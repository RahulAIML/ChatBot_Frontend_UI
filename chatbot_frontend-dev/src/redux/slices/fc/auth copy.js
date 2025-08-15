import { apiSliceFC } from '../fcApiSlice';

export const authApi = apiSliceFC.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({

    meFCDetails: builder.mutation({
      query: (body) => ({
        url: 'fc/auth/getFCUserDetails',
        method: 'GET',
        // body: body,
      }),
    }),

    loginFC: builder.mutation({
      query: (body) => ({
        url: 'fc/auth/login',
        method: 'POST',
         body: body,
      }),
    }),

    bookSlot: builder.mutation({
      query: (body) => ({
        url: '/physicalVerification/getBookSlots',
        method: 'GET',
        //body: body,
      }),
    }),

    forgotPassword: builder.mutation({
			query: (body) => ({
				url: 'fc/auth/forgotPasswordOTP',
				method: 'POST',
				body: body,
			}),
		}),

		forgotPasswordOtpVerify: builder.mutation({
			query: (body) => ({
				url: 'fc/auth/verifyForgotPasswordOtp',
				method: 'POST',
				body: body,
			}),
		}),

    changePassword: builder.mutation({
			query: (body) => ({
				url: 'fc/auth/changePassword',
				method: 'POST',
				body: body,
			}),
		}),
		changePasswordOTpP: builder.mutation({
			query: (body) => ({
				url: 'fc/auth/sendotpForChangePassword',
				method: 'POST',
				body: body,
			}),
		}),
  }),
});

export const {
  useLoginFCMutation,
  useMeFCDetailsMutation,
  useBookSlotMutation,
  useForgotPasswordMutation,
  useForgotPasswordOtpVerifyMutation,
  useChangePasswordMutation,
	useChangePasswordOTpPMutation,
} = authApi;
