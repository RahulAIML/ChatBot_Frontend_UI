import { z } from 'zod';

export const candidatureValidation = z.object({
	claimType: z.string().nonempty({ message: 'Please select the Type' }),
});
