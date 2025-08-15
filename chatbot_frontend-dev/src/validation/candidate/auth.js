import { z } from 'zod';

export const SignUpSchema = z.object({
  userId: z
    .string()
    .nonempty({ message: 'Please enter the user Id' })
    .min(10, 'Please enter the valid User Id')
    .max(10, 'Please enter the valid User Id '),
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
    .min(10, 'Please enter the valid User Id')
    .max(10, 'Please enter the valid User Id '),
});

export const registerValidate = z
  .object({
    isForeign: z.string({ message: 'Please enter this field' }).min(1, 'Please enter this field'),
    foreignId: z.string().optional(),
    dob: z.string().optional(),
    email: z.string().email().nonempty({ message: 'Please enter the email address' }),

    fullname: z.string().superRefine((val, ctx) => {
      if (val.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,

          message: 'Please enter  Fullname',
          fatal: true,
        });
        return z.NEVER;
      }
      const regex = /^[A-Za-z' ]{2,}$/;

      if (!regex.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please enter valid name',
        });
      }
      if (/\s{2,}/.test(val)) {
				ctx.addIssue({
				  code: z.ZodIssueCode.custom,
				  message: "Invalid Fullname: Consecutive spaces are not allowed",
				});
			  }
    }),
    country: z.string().nonempty('Please select a country'),
    countryCode: z.string().optional(),
    stateCode: z.number().min(1, 'Please enter the state'),
    districtCode: z.number().min(1, 'Please select the district'),
    phone: z
      .string()
      .nonempty({ message: 'Please enter the phone number' })
      .min(10, 'Please enter the valid phone number')
      .max(10, 'Please enter the valid phone number'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(20, 'Password is too long (max 16 characters)')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one scpecial character and one number'
      ),
    confirmPassword: z
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
  })
  .refine(
    (input) => {
      if (Number(input.isForeign) == 1 && !input.foreignId) {
        return false;
      }
      return true;
    },
    {
      message: 'Please enter the Application ID',
      path: ['foreignId'],
    }
  )
  .refine(
    (input) => {
      if (Number(input.isForeign) == 1 && !input.dob) {
        return false;
      }
      return true;
    },
    {
      message: 'Please enter the DOB',
      path: ['dob'],
    }
  )
  .refine(
    (input) => {
      if (Number(input.country) == 2 && !input.countryCode) {
        return false;
      }
      return true;
    },
    {
      message: 'Please enter the Country Code',
      path: ['countryCode'],
    }
  );

export const resetPasswordVerfication = z.object({
  userId: z
    .string()
    .nonempty({ message: 'Please enter the User Id' })
    .min(10, 'Please enter the valid User Id')
    .max(10, 'Please enter the valid User Id'),
  mobile: z.string().nonempty({ message: 'Please enter the Mobile No' }),
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
    .min(10, 'Please enter the valid User Id')
    .max(10, 'Please enter the valid User Id '),
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
