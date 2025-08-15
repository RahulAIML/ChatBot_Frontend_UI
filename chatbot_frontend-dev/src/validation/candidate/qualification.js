import { z } from 'zod';

export const qualificationValidation = z
  .object({
    grad_faculty: z.string().nonempty({ message: 'Please select the Gradution Faculty' }),
    candidateUniversity: z.string().nonempty({ message: 'Please select the Gradution University' }),
    mathematics_at: z.string().nonempty({ message: 'Please select mathematics at' }),
    grad_univ_other: z.string().optional(),
    subName: z.string().optional(),

    grad_passing_year: z.string().min(1, 'Please Select the Passing Year'),
    grad_place_passing: z.string().min(1, 'Please Select the Passing Place'),

    grad_type: z.string().nonempty({ message: 'Please select Graduation Type' }),
    diplomastatus: z.string().nonempty({ message: 'Please select Graduation Status' }),
    grad_marks_type: z.string().optional(),

    hscObt: z.string().nonempty({ message: 'Please select the HSC obtained' }),
    hscTot: z.string().nonempty({ message: 'Please select the HSC Total' }),
    hscPer: z.string().superRefine((val, ctx) => {
      if (val.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,

          message: 'This is required field ',
          fatal: true,
        });
        return z.NEVER;
      }

      if (Number(val) < import.meta.env.VITE_HSC_PERCENTAGE) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Minimum marks should be ${import.meta.env.VITE_HSC_PERCENTAGE}%`,
        });
      }
    }),

    sscObt: z.string().nonempty({ message: 'Please enter the SSC obtained' }),
    sscTot: z.string().nonempty({ message: 'Please enter the SSC Total' }),
    sscTotPer: z.string().superRefine((val, ctx) => {
      if (val.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,

          message: 'This is required field ',
          fatal: true,
        });
        return z.NEVER;
      }

      if (Number(val) < import.meta.env.VITE_SSC_PERCENTAGE) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Minimum marks should be ${import.meta.env.VITE_SSC_PERCENTAGE}%`,
        });
      }
    }),

    sscMathobt: z.string().nonempty({ message: 'Please enter the Math obtained' }),
    sscMathtot: z.string().nonempty({ message: 'Please enter the Math Total' }),
    sscMathPer: z.string().superRefine((val, ctx) => {
      if (val.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,

          message: 'This is required field ',
          fatal: true,
        });
        return z.NEVER;
      }

      if (Number(val) < import.meta.env.VITE_SSC_PERCENTAGE) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Minimum marks should be ${import.meta.env.VITE_SSC_PERCENTAGE}%`,
        });
      }
    }),

    sscSciObt: z.string().nonempty({ message: 'Please enter the Science obtained marks' }),
    sscSciTot: z.string().nonempty({ message: 'Please enter the Science total marks' }),
    sscSciPer: z.string().superRefine((val, ctx) => {
      if (val.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,

          message: 'This is required field ',
          fatal: true,
        });
        return z.NEVER;
      }

      if (Number(val) < import.meta.env.VITE_SSC_PERCENTAGE) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Minimum marks should be ${import.meta.env.VITE_SSC_PERCENTAGE}%`,
        });
      }
    }),

    sscEngobt: z.string().nonempty({ message: 'Please select the English obtained marks' }),
    sscEngtot: z.string().nonempty({ message: 'Please select the English total marks' }),
    sscEngPer: z.string().superRefine((val, ctx) => {
      if (val.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,

          message: 'This is required field ',
          fatal: true,
        });
        return z.NEVER;
      }

      if (Number(val) < import.meta.env.VITE_SSC_PERCENTAGE) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Minimum marks should be ${import.meta.env.VITE_SSC_PERCENTAGE}%`,
        });
      }
    }),

    diplomamarksobt: z.string().optional(),
    diplomamarkstot: z.string().optional(),
    diplomamarksPer: z.string().optional(),
    mathsobt: z.string().optional(),
    mathstot: z.string().optional(),
    mathsmamarksPer: z.string().optional(),

    // superRefine((val, ctx) => {
    // 	if (val.trim() === '') {
    // 		ctx.addIssue({
    // 			code: z.ZodIssueCode.custom,

    // 			message: 'This is required field ',
    // 			fatal: true,
    // 		});
    // 		return z.NEVER;
    // 	}

    // 	if (Number(val) < 35) {
    // 		ctx.addIssue({
    // 			code: z.ZodIssueCode.custom,
    // 			message: 'Minimum marks should be 35%',
    // 		});
    // 	}
    // }),

    // drawing: z.string().nonempty({ message: 'Please select the Yes or No' }),
  })
  .refine(
    (input) => {
      if (Number(input.sscObt) > Number(input.sscTot)) {
        return false;
      }
      return true;
    },
    {
      message: 'Total marks should be greater than Obtained marks',
      path: ['sscTot'],
    }
  )
  .refine(
    (input) => {
      if (Number(input.mathsobt) > Number(input.mathstot)) {
        return false;
      }
      return true;
    },
    {
      message: 'Total marks should be greater than Obtained marks',
      path: ['mathstot'],
    }
  )
  .refine(
    (input) => {
      if (Number(input.mathsobt) == 0 && Number(input.mathematics_at) == 1) {
        return false;
      }
      return true;
    },
    {
      message: 'Please enter obtained marks',
      path: ['mathsobt'],
    }
  )
  .refine(
    (input) => {
      if (Number(input.mathstot) == 0 && Number(input.mathematics_at) == 1) {
        return false;
      }
      return true;
    },
    {
      message: 'Please enter total marks',
      path: ['mathstot'],
    }
  )
  .refine(
    (input) => {
      if (!input.subName && Number(input.mathematics_at) == 1) {
        return false;
      }
      return true;
    },
    {
      message: 'Please enter subject name',
      path: ['subName'],
    }
  )
  .refine(
    (input) => {
      if (Number(input.diplomastatus) == 1 && Number(input.grad_marks_type)==0) {
        return false;
      }
      return true;
    },
    {
      message: 'Please select the Marks Type',
      path: ['grad_marks_type'],
    }
  )
  // .refine(
  // 	(input) => {

  // 	  // Assuming 'state' and 'val' are defined somewhere in your scope
  // 	  const reseverdMin = 45; // Change as per your requirements
  // 	  const openMin = 50; // Change as per your requirements

  // 	  // Applying additional conditions
  // 	  if (input.category_id !== 1) {
  // 		if (input.diplomamarksPer < reseverdMin) {
  // 		  setState((_prevState) => ({
  // 			..._prevState,
  // 			diplomamarksPer: val,
  // 			diplomamarksPerErr: false,
  // 			diplomamarksPerErrMsg: "Marks 45% Required",
  // 		  }));
  // 		}
  // 	  } else if (
  // 		input.category_id === 1 &&
  // 		((input.physicaldisability_id !== 5 && input.physicaldisability_id !== 0) || input.ews === 1)
  // 	  ) {
  // 		if (input.diplomamarksPer < reseverdMin) {
  // 		  setState((_prevState) => ({
  // 			..._prevState,
  // 			diplomamarksPer: val,
  // 			diplomamarksPerErr: false,
  // 			diplomamarksPerErrMsg: "Minimum 45% Required",
  // 		  }));
  // 		}
  // 	  } else {
  // 		if (inpute.diplomamarksPer < openMin) {
  // 		  setState((_prevState) => ({
  // 			..._prevState,
  // 			diplomamarksPer: val,
  // 			diplomamarksPerErr: false,
  // 			diplomamarksPerErrMsg: "Marks 50% Required",
  // 		  }));
  // 		}
  // 	  }

  // 	  return true;
  // 	},

  //   )

  .refine(
    (input) => {
      if (Number(input.sscMathobt) > Number(input.sscMathtot)) {
        return false;
      }
      return true;
    },
    {
      message: 'Total marks should be greater than Obtained marks',
      path: ['sscMathtot'],
    }
  )
  .refine(
    (input) => {
      if (Number(input.hscObt) > Number(input.hscTot)) {
        return false;
      }
      return true;
    },
    {
      message: 'Total marks should be greater than Obtained marks',
      path: ['hscTot'],
    }
  )
  .refine(
    (input) => {
      if (Number(input.sscSciObt) > Number(input.sscSciTot)) {
        return false;
      }
      return true;
    },
    {
      message: 'Total marks should be greater than Obtained marks',
      path: ['sscSciTot'],
    }
  )
  .refine(
    (input) => {
      if (Number(input.sscEngobt) > Number(input.sscEngtot)) {
        return false;
      }
      return true;
    },
    {
      message: 'Total marks should be greater than Obtained marks',
      path: ['sscEngtot'],
    }
  )
  .refine(
    (input) => {
      if (
        Number(input.diplomastatus == 1) &&
        (!input.diplomamarksobt || Number(input.diplomamarksobt <= 0))
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Please enter the Obtained marks',
      path: ['diplomamarksobt'],
    }
  )
  .refine(
    (input) => {
      if (
        Number(input.diplomastatus == 1) &&
        (!input.diplomamarkstot || Number(input.diplomamarkstot <= 0))
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Please enter the Total marks',
      path: ['diplomamarkstot'],
    }
  )
  .refine(
    (input) => {
      if (
        Number(input.diplomastatus == 1) &&
        (!input.diplomamarksPer || Number(input.diplomamarksPer <= 0))
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'This is required',
      path: ['diplomamarksPer'],
    }
  )
  .refine(
    (input) => {
      if (
        Number(input.diplomastatus == 1) &&
        (!input.diplomamarksPer || Number(input.diplomamarksPer < 35))
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Minimum marks should be 35%',
      path: ['diplomamarksPer'],
    }
  )
  .refine(
    (input) => {
      if (
        Number(input.diplomastatus == 1) &&
        Number(input.diplomamarksobt) > Number(input.diplomamarkstot)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Total marks should be greater than Obtained marks',
      path: ['diplomamarkstot'],
    }
  )

  .refine(
    (input) => {
      if (Number(input.candidateUniversity) == 9999 && !input.grad_univ_other) {
        return false;
      }
      return true;
    },
    {
      message: 'Please enter the University Name',
      path: ['grad_univ_other'],
    }
  )
  
