import { z } from 'zod';

export const confirmCandidate = z.object({

    tutionFee: z
        .string()
        .nonempty({ message: 'Please enter tutuion fee' })
        .refine(value => !isNaN(Number(value)), { message: 'Tuition fee must be a number' }),

    developmentFee: z
        .string()
        .nonempty({ message: 'Please enter development fee' })
        .refine(value => !isNaN(Number(value)), { message: 'Development fee must be a number' }),

    otherFee: z
        .string()
        .nonempty({ message: 'Please enter other fee' })
        .refine(value => !isNaN(Number(value)), { message: 'Other fee must be a number' }),

    admittionDate: z.string().nonempty({ message: 'Admission date is required' }),
    remark: z.string().nonempty({ message: 'Remark   is required' }),


});
export const confirmCandidateUserId = z.object({
	candidate: z
		.string()
		.nonempty({ message: 'Please enter the User Id' })
		.length(10, 'Please enter the Valid User Id'),
});


export const confirmInstLevelAdmCandidate = z.object({

    tutionFee: z
        .string()
        .nonempty({ message: 'Please enter tutuion fee' })
        .refine(value => !isNaN(Number(value)), { message: 'Tuition fee must be a number' }),

    developmentFee: z
        .string()
        .nonempty({ message: 'Please enter development fee' })
        .refine(value => !isNaN(Number(value)), { message: 'Development fee must be a number' }),

    otherFee: z
        .string()
        .nonempty({ message: 'Please enter other fee' })
        .refine(value => !isNaN(Number(value)), { message: 'Other fee must be a number' }),

    admittionDate: z.string().nonempty({ message: 'Admission date is required' }),
    remark: z.string().nonempty({ message: 'Remark   is required' }),
    choiceCode: z.string().nonempty({ message: 'Choice is required' }),
    admtype: z.string().nonempty({ message: 'Admission Type is required' }),
    ilRound: z.string().nonempty({ message: 'IL Round is required' }),
    instMeritNo: z.string().nonempty({ message: 'InstMeritNo is required' }),


});


export const confirmEditCandidate = z.object({

    tutionFee: z
        .string()
        .nonempty({ message: 'Please enter tutuion fee' })
        .refine(value => !isNaN(Number(value)), { message: 'Tuition fee must be a number' }),

    developmentFee: z
        .string()
        .nonempty({ message: 'Please enter development fee' })
        .refine(value => !isNaN(Number(value)), { message: 'Development fee must be a number' }),

    otherFee: z
        .string()
        .nonempty({ message: 'Please enter other fee' })
        .refine(value => !isNaN(Number(value)), { message: 'Other fee must be a number' }),
    remark: z.string().nonempty({ message: 'Remark   is required' }),


});