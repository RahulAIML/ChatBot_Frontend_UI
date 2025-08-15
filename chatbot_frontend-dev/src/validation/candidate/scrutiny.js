import { z } from 'zod';

export const scrutinyValidate = z.object({
	mode: z.string().nonempty({ message: 'Please select the Scrutiny' }),
});
