import { z } from 'zod';

export const confirmCandidate = z.object({
	candidate: z
		.string()
		.nonempty({ message: 'Please enter the User Id' })
		.length(10, 'Please enter the Valid User Id'),
	version: z.string().nonempty({ message: 'Please enter version' }),
});

export const afterConfirmCandidate = z.object({
	candidate: z
		.string()
		.nonempty({ message: 'Please enter the User Id' })
		.length(10, 'Please enter the Valid User Id'),
});

export const confirmCandidateSubmitDocument = z.object({
	candidate: z
		.string()
		.nonempty({ message: 'Please enter the User Id' })
		.length(10, 'Please enter the Valid User Id'),
	files: z.string().nonempty({ message: 'Please enter version' }),
});
