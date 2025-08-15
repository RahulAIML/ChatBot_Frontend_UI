import { z } from 'zod';

export const fcEdit = z.object({
	howToReach: z.string().nonempty({ message: 'Required Field' }),
	coordinatorName: z.string().nonempty({ message: 'Required Field' }),
	coordinatorDesignation: z.string().nonempty({ message: 'Required Field' }),
	coordinatorMobile: z
		.string()
		.nonempty({ message: 'Please enter the phone number' })
		.min(10, 'Please enter the valid phone number')
		.max(10, 'Please enter the valid phone number'),
	coordinatorPhone: z
		.string()
		.nonempty({ message: 'Please enter the phone number' })
		.min(10, 'Please enter the valid phone number')
		.max(10, 'Please enter the valid phone number'),
	coordinatorEmail: z.string().email().nonempty({ message: 'Please enter the email address' }),
	altCoordinatorName: z.string(),
	altCoordinatorDesignation: z.string(),

	altCoordinatorMobile: z.string().superRefine((val, ctx) => {
		if (val.trim() != '' && val.trim().length !== 10) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Please enter the valid phone number',
			});
		}
	}),
	altCoordinatorPhone: z.string().superRefine((val, ctx) => {
		if (val.trim() != '' && val.trim().length !== 10) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Please enter the valid phone number',
			});
		}
	}),

	altCoordinatorEmail: z.string().refine(
		(value) => {
			if (value.trim() !== '') {
				// If not empty, validate the email format
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				return emailRegex.test(value);
			}

			return true;
		},
		{ message: 'Invalid email format or empty' }
	),
});
