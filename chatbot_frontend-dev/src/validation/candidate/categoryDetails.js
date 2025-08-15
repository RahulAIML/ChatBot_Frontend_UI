import { z } from 'zod';

export const categoryDetailForBValidate = z
	.object({
		categoryName: z.string().nonempty({ message: 'Please Select Category' }),
		category: z.string().optional(),
		subCategory: z.string().optional(),
		isNclAvailable: z.string().optional(),

		isEwsAvailable: z.string().optional(),
		ph_category: z.string().nonempty({ message: 'Please Select Physical Disability' }),
		physicalDisabilityId: z.string().optional(),

		ewsStatus: z.string().optional(),
		selectedTypeId: z.number().optional(),

		nationalitydoc: z.string().optional(),
		casteCerIss: z.string().optional(),
		caste_tribe_cartificate_status: z.string().optional(),
		cvcApplicationNo: z.string().optional(),
		authName: z.string().optional(),
		dateOfApplication: z.string().optional(),
		candidateName: z.string().optional(),
		casteCerNo: z.string().optional(),
	})

	.refine(
		(input) => {
			if (Number(input.categoryName) == 2 && Number(input.category) == 1) {
				return false;
			}
			return true;
		},
		{
			message: 'Please Select the Category',
			path: ['category'],
		}
	)
	.refine(
		(input) => {
			if (Number(input.subCategory) && Number(input.caste_tribe_cartificate_status)==0) {
				return false;
			}
			return true;
		},
		{
			message: 'Please Select status',
			path: ['caste_tribe_cartificate_status'],
		}
	)
	.refine(
		(input) => {
			if (
				Number(input.categoryName) == 2 &&
				Number(input.category) >= 2 &&
				Number(input.category) <= 9 &&
				!input.subCategory
			) {
				return false;
			}
			return true;
		},
		{
			message: 'Please enter the Sub Category',
			path: ['subCategory'],
		}
	)
	.refine(
		(input) => {
			if (
				Number(input.categoryName) == 2 &&
				Number(input.category) >= 4 &&
				// Number(input.category) <= 9 &&
				!input.isNclAvailable
			) {
				return false;
			}
			return true;
		},
		{
			message: 'Please enter the Status',
			path: ['isNclAvailable'],
		}
	)
	
	.refine(
		(input) => {
			if (
				Number(input.categoryName) == 1 &&
				input.selectedTypeId != 5 &&
				input.selectedTypeId != 8 &&
				input.selectedTypeId != 11 &&
				input.selectedTypeId != 13 &&
				input.selectedTypeId != 14 &&
				!input.ewsStatus
			) {
				return false;
			}
			return true;
		},
		{
			message: 'Please Select EWS',
			path: ['ewsStatus'],
		}
	)
	.refine(
		(input) => {
			if (Number(input.ph_category) == 1 && !input.physicalDisabilityId) {
				return false;
			}
			return true;
		},
		{
			message: 'Please Select',
			path: ['physicalDisabilityId'],
		}
	)
	.refine(
		(input) => {
			console.log(input.selectedTypeId, 'input.selectedTypeId');
			if (
				Number(input.categoryName) == 1 &&
				input.selectedTypeId != 5 &&
				input.selectedTypeId != 11 &&
				input.ewsStatus == 1 &&
				!input.isEwsAvailable
			) {
				return false;
			}
			return true;
		},
		{
			message: 'Please Select EWS Status',
			path: ['isEwsAvailable'],
		}
	)
	.refine(
		(input) => {
			if (
				(input.selectedTypeId == 1 ||
					input.selectedTypeId == 2 ||
					input.selectedTypeId == 3 ||
					input.selectedTypeId == 4 ||
					input.selectedTypeId == 5 ||
					input.selectedTypeId == 6) &&
				!input.nationalitydoc
			) {
				return false;
			}
			return true;
		},
		{
			message: 'Please Select the Nationality Document',
			path: ['nationalitydoc'],
		}
	)
	.refine(
		(input) => {
			if (Number(input.categoryName) == 2 && !input.casteCerIss) {
				return false;
			}
			return true;
		},
		{
			message: 'Please Select the Issuing Authority',
			path: ['casteCerIss'],
		}
	)
	.refine(
		(input) => {
			if (Number(input.caste_tribe_cartificate_status) == 2 && !input.cvcApplicationNo) {
				return false;
			}
			return true;
		},
		{
			message: 'Please enter  the Number',
			path: ['cvcApplicationNo'],
		}
	)
	.refine(
		(input) => {
			if (Number(input.caste_tribe_cartificate_status) == 2 && !input.authName) {
				return false;
			}
			return true;
		},
		{
			message: 'Please enter  the Authority Name',
			path: ['authName'],
		}
	)
	.refine(
		(input) => {
			if (Number(input.caste_tribe_cartificate_status) == 2 && !input.dateOfApplication) {
				return false;
			}
			return true;
		},
		{
			message: 'Please enter  the Date of Application',
			path: ['dateOfApplication'],
		}
	)
	.refine(
		(input) => {
			if (Number(input.caste_tribe_cartificate_status) == 2 && !input.candidateName) {
				return false;
			}
			return true;
		},
		{
			message: 'Please enter  the candidate name',
			path: ['candidateName'],
		}
	)
	.refine(
		(input) => {
			if (Number(input.caste_tribe_cartificate_status) == 2 && !input.casteCerNo) {
				return false;
			}
			return true;
		},
		{
			message: 'Please enter  the Certificate No',
			path: ['casteCerNo'],
		}
	)
	
