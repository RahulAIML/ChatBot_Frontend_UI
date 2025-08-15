import { z } from 'zod';

export const createSubFc = z.object({
	// subcoordUName: z.string().nonempty({ message: 'Required Field' }),
	coordinatorName: z.string().nonempty({ message: 'Please enter co-ordinator name' }),
	subcoordMobile: z
		.string()
		.nonempty({ message: 'Please enter the phone number' })
		.min(10, 'Please enter the valid phone number')
		.max(10, 'Please enter the valid phone number'),

	subcoordEmail: z
		.string()
		.email({ message: 'Invalid Email Format' })
		.nonempty({ message: 'Please enter valid email' }),
	password: z.string()
	.nonempty({ message: 'Please enter valid password' }),
	// .min(8, 'Invalid Credentials')
	// .max(16, 'Invalid Credentials')
	// .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/, 'Invalid Credentials'),
});
