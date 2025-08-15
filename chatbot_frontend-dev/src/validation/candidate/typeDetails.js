import { z } from 'zod';

export const typeDetailForAValidate = z.object({
	hscdistrict: z.number().min(1, 'Please Select the district'),
	dipdegdistrict: z.number().min(1, 'Please Select the district'),
	document: z.string().nonempty('Please select any one of Document'),
	
});

export const typeDetailForBValidate = z
	.object({
		districtId: z.number().min(1, 'Please select the district'),
		domicileType: z.string().nonempty({ message: 'Fill the Domicile Type' }),
		motherName: z.string().optional(),
	})
	.refine(
		(input) => {
			// allows bar to be optional only when foo is 'foo'
			console.log(input);
			if (input.domicileType == 'M' && input.motherName == '') return false;

			return true;
		},
		{
			message: 'Please enter the Mother Name',
			path: ['motherName'],
		}
	);
export const typeDetailForCValidate = z
	.object({
		districtId: z.number().min(1, 'Please select the district'),
		domicileType: z.string().min(1, 'Please Select the Domicile Type'),
		motherName: z.string().optional(),
	})
	.refine(
		(input) => {
			// allows bar to be optional only when foo is 'foo'
			console.log(input);
			if (input.domicileType == 'M' && input.motherName == '') return false;

			return true;
		},
		{
			message: 'Please enter the Mother Name',
			path: ['motherName'],
		}
	);

export const typeDetailForDValidate = z
	.object({
		districtId: z.number().min(1, 'Please select the district'),
		domicileType: z.string().min(1, 'Please Select the Domicile Type'),
		motherName: z.string().optional(),
		retired: z.string().min(1, 'Please select Yes or No'),
	})
	.refine(
		(input) => {
			// allows bar to be optional only when foo is 'foo'
			console.log(input);
			if (input.domicileType == 'M' && input.motherName == '') return false;

			return true;
		},
		{
			message: 'Please enter the Mother Name',
			path: ['motherName'],
		}
	);

export const typeDetailForEValidate = z.object({
	dipdegDistrict: z.number().min(1, 'Please select the district'),
	hscdistrict: z.number().min(1, 'Please select the district'),
	language_id: z.number().min(1, 'Please enter the Language'),
});

export const typeDetailForOMSValidate = z.object({
	mainDistrict: z.number().min(1, 'Please enter the State'),
	dipdegDistrict: z.number().min(1, 'Please select the district'),
	diplomaDeginst_oms: z.string().min(1, 'Please enter the Institute Name'),
});
