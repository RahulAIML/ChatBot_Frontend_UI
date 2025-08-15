import { z } from 'zod';

export const SignUpSchema = z.object({

	userId: z
	  .string()
	  .nonempty({ message: 'Please enter the user Id' })
	  .min(4, 'Please enter the valid User Id')
	  .max(5, 'Please enter the valid User Id '),
	password: z
	  .string()
	  .nonempty({ message: 'Please enter password' })
	  .min(1, { message: 'Invalid Password!' })
	  .max(16, { message: 'Invalid Password!' }),
  });

export const loginValidate = z.object({
	password: z
		.string()
		.min(8, 'Invalid Credentials')
		.max(20, 'Invalid Credentials')
		.regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/, 'Invalid Credentials'),

	userId: z
		.string()
		.min(4, 'Please enter the valid User Id')
		.max(5, 'Please enter the valid User Id '),
});


	export const resetPasswordVerfication = z.object({
		userId: z
		  .string()
		  .nonempty({ message: 'Please enter the User Id' })
		  .min(4, 'Please enter the valid User Id')
		  .max(5, 'Please enter the valid User Id'),
		mobile: z
		  .string()
		  .nonempty({ message: 'Please enter the Mobile No' })
		 
	  });

export const mobileValidate = z.object({
	phone: z
		.string()
		.nonempty({ message: 'Please enter the phone number' })
		.min(10, 'Please enter the valid phone number')
		.max(10, 'Please enter the valid phone number'),
});
export const emailValidate = z.object({
	email: z.string().email().nonempty({ message: 'Please enter the email address' }),
});

export const forgotPassword = z.object({
	phone: z
		.string()
		.nonempty({ message: 'Please enter the phone number' })
		.min(10, 'Please enter the valid phone number')
		.max(10, 'Please enter the valid phone number'),
	userId: z
		.string()
		.min(4, 'Please enter the valid User Id')
		.max(5, 'Please enter the valid User Id '),
});

export const forgotPasswordAuth = z
	.object({
		oldPassword: z
			.string()
			.min(8, 'Password must be at least 8 characters long')
			.max(20, 'Password is too long (max 16 characters)')
			.regex(
				/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/,
				'Password must contain at least one uppercase letter, one lowercase letter, one scpecial character and one number'
			),
		newPassword: z
			.string()
			.min(8, 'Password must be at least 8 characters long')
			.max(20, 'Password is too long (max 16 characters)')
			.regex(
				/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/,
				'Password must contain at least one uppercase letter, one lowercase letter, one scpecial character and one number'
			),

		reNewPassword: z
			.string()
			.min(8, 'Password must be at least 8 characters long')
			.max(20, 'Password is too long (max 16 characters)')
			.regex(
				/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/,
				'Password must contain at least one uppercase letter, one lowercase letter, one scpecial character and one number'
			),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});


	export const VerifyMobileOTP = z.object({
		mobileotp: z
		  .string()
		  .min(1, { message: 'OTP is required!' })
		  .min(6, { message: 'OTP must be at least 6 digit!' }),
	  });
	  
	  export const VerifyEmailOTP = z.object({
		emailotp: z
		  .string()
		  .min(1, { message: 'OTP is required!' })
		  .min(6, { message: 'OTP must be at least 6 digit!' }),
	  });
	  
	  export const VerifyWpOTP = z.object({
		wpotp: z
		  .string()
		  .min(1, { message: 'OTP is required!' })
		  .min(6, { message: 'OTP must be at least 6 digit!' }),
	  });
