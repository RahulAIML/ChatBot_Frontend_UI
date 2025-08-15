import { apiSliceCandidate } from '../candidateApiSlice';

export const authApi = apiSliceCandidate.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({

    meCandidateDetails: builder.mutation({
      query: (body) => ({
        url: '/auth/getUserDetails',
        method: 'GET',
        // body: body,
      }),
    }),

    loginCandidate: builder.mutation({
      query: (body) => ({
        url: '/auth/candidateLogin',
        method: 'POST',
         body: body,
      }),
    }),

    register: builder.mutation({
			query: (body) => ({
				url: '/auth/registration/candidateRegistration',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

    checkEmailOrPhone: builder.mutation({
			query: (body) => ({
				url: '/auth/registration/checkEmailOrPhone',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

    verifyRegistrationOtp: builder.mutation({
			query: (body) => ({
				url: '/auth/registration/verifyRegistrationOtp',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

    getDataForRegisterationVerify: builder.mutation({
			query: (body) => ({
				url: '/auth/registration/getDataForRegisterationVerify',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),


		forgotPasswordOTP: builder.mutation({
			query: (body) => ({
				url: '/auth/forgotPasswordOTP',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),	
		
		
		verifyForgotPasswordOtp: builder.mutation({
			query: (body) => ({
				url: '/auth/verifyForgotPasswordOtp',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),	

		formUnlock: builder.mutation({
			query: (body) => ({
				url: '/applicationForm/others/unlockCandidateForm',
				method: 'GET',
				//body: body,
			}),
		}),

		
		discrepancyListWithFillStatus: builder.mutation({
			query: (body) => ({
				url: `/discrepancy/getStepWiseCandidateDiscrepancy?step_id=${Number(body?.step_id)}`,
				method: 'GET',
				//body: body,
			}),
		}),

		changePassword: builder.mutation({
			query: (body) => ({
				url: 'auth/changePassword',
				method: 'POST',
				body: body,
			}),
		}),
		changePasswordOTpP: builder.mutation({
			query: (body) => ({
				url: 'auth/sendotpForChangePassword',
				method: 'POST',
				body: body,
			}),
		}),

		loginSSO: builder.mutation({
			query: (body) => ({
			  url: '/auth/ssologin',
			  method: 'POST',
			   body: body,
			}),
		  }),
		  logoutCandidate: builder.mutation({
			query: (body) => ({
			  url: '/auth/logout',
			  method: 'POST',
			   body: body,
			}),
		  }),

		  logoutCandidateSSO: builder.mutation({
			query: (body) => ({
			  url: '/auth/ssoLogout ',
			  method: 'POST',
			   body: body,
			}),
		  }),
  }),
});

export const {
  useMeCandidateDetailsMutation,
  useLoginCandidateMutation,
  useRegisterMutation,
  useCheckEmailOrPhoneMutation,
  useVerifyRegistrationOtpMutation,
  useGetDataForRegisterationVerifyMutation,
  useForgotPasswordOTPMutation,
  useVerifyForgotPasswordOtpMutation,
  useFormUnlockMutation,
  useChangePasswordMutation,
  useChangePasswordOTpPMutation,
  useDiscrepancyListWithFillStatusMutation,
  useLogoutCandidateMutation,
  useLoginSSOMutation,
  useLogoutCandidateSSOMutation,
} = authApi;