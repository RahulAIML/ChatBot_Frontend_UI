import { apiSliceInstitute } from '../instituteApiSlice';

export const authApi = apiSliceInstitute.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		getCandidateName: builder.mutation({
			query: (body) => ({
				url: '/instLoginController/getCandidateName',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),

		instlogin: builder.mutation({
			query: (body) => ({
				url: 'institute/auth/login',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

		instme: builder.mutation({
			query: (body) => ({
				url: 'institute/auth/getInstituteDetails',
				method: 'GET',
				// body: body,
			}),
		}),

		forgotPassword: builder.mutation({
			query: (body) => ({
				url: 'institute/auth/forgotPasswordOTP',
				method: 'POST',
				body: body,
			}),
		}),

		forgotPasswordOtpVerify: builder.mutation({
			query: (body) => ({
				url: 'institute/auth/verifyForgotPasswordOtp',
				method: 'POST',
				body: body,
			}),
		}),
		changePassword: builder.mutation({
			query: (body) => ({
				url: 'institute/auth/changePassword',
				method: 'POST',
				body: body,
			}),
		}),
		changePasswordOTpP: builder.mutation({
			query: (body) => ({
				url: 'institute/auth/sendotpForChangePassword',
				method: 'POST',
				body: body,
			}),
		}),
		instlogout: builder.mutation({
			query: (body) => ({
				url: 'institute/auth/logout',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
	}),
});

export const {
	useInstloginMutation,
	useInstmeMutation,
	useRegisterMutation,
	useOtpVerifyMutation,
	useGetCandidateNameMutation,
	useResendOtpMutation,
	useForgotPasswordMutation,
	useForgotPasswordOtpVerifyMutation,
	useChangePasswordMutation,
	useChangePasswordOTpPMutation,
	useLogoutMutation,
	useInstlogoutMutation
} = authApi;
