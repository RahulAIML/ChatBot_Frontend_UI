import { z } from 'zod';

export const meritStatusValidate = z.object({
	// dob: z
	// 	.string()
	// 	.min(8, 'Invalid Credentials')
	// 	.max(16, 'Invalid Credentials')
	// 	.regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/, 'Invalid Credentials'),

	candidate: z
		.string()
		.min(10, 'Please enter the valid User Id')
		.max(10, 'Please enter the valid User Id '),

	dob: z.string().nonempty({ message: 'Please enter the BirthDate' }),
});
