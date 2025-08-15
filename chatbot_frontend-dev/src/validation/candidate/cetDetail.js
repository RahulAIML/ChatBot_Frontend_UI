import { z } from 'zod';
export const cetDetailsValidate = z
  .object({
    isCet: z.string().nonempty('Please select Cet Status'),
    rollNo: z.string().optional(),
    // otherCet:  z.string().nonempty(`Please select ${import.meta.env.VITE_PGETA_SCORE} Status`),
    applicationNo: z.string().optional(),
    // otherCetScore: z.string().optional(),
    // otherCetApplicationNo : z.string().optional(),
  })

  .refine(
    (input) => {
      if (Number(input.isCet) == 1 && (Number(input.rollNo) == 0 || !input.rollNo)) {
        return false;
      }

      return true;
    },
    {
      message: `Please enter the ${import.meta.env.VITE_CET_SCORE} Roll Number`,
      path: ['rollNo'],
    }
  )
  .refine(
    (input) => {
      if (Number(input.isCet) == 1 && (Number(input.applicationNo) == 0 || !input.applicationNo)) {
        return false;
      }
      return true;
    },
    {
      message: `Please enter the ${import.meta.env.VITE_CET_SCORE} Application  Number`,
      path: ['applicationNo'],
    }
  );
// .refine(
// 	(input) => {
// 		console.log(input,"pp")
// 		if (Number(input.otherCet) == 1 && (Number(input.otherCetScore) == 0 || !input.otherCetScore))
// 			{
// 				return false;
// 			}

// 		return true;
// 	},
// 	{
// 		message: `Please enter the ${import.meta.env.VITE_PGETA_SCORE} Score`,
// 		path: ['otherCetScore'],
// 	}
// )
// .refine(
// 	(input) => {
// 		if (Number(input.otherCet) == 1 && (Number(input.otherCetApplicationNo) == 0 || !input.otherCetApplicationNo)){
// 			return false;
// 		}
// 		return true;
// 	},
// 	{
// 		message: `Please enter the ${import.meta.env.VITE_PGETA_SCORE} Application Number`,
// 		path: ['otherCetApplicationNo'],
// 	}
// );
