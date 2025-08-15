import { z } from 'zod';

export const personaldetailsValidate = z
	.object({
		// email: z.string().email().nonempty({ message: 'Please enter the email address' }),
		fullName: z.string().superRefine((val, ctx) => {
			if (val.trim() === '') {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,

					message: 'Please enter Fullname',
					fatal: true,
				});
				return z.NEVER;
			}
			const regex = /^[A-Za-z' ]{2,}$/;

			if (!regex.test(val)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Please enter valid name',
				});
			}
			if (/\s{2,}/.test(val)) {
				ctx.addIssue({
				  code: z.ZodIssueCode.custom,
				  message: "Invalid Fullname: Consecutive spaces are not allowed",
				});
			  }
		}),		
	
		motherName: z.string().superRefine((val, ctx) => {
			if (val.trim() === '') {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,

					message: 'Please enter Mother Name',
					fatal: true,
				});
				return z.NEVER;
			}
			const regex = /^[A-Za-z' ]{2,}$/;

			if (!regex.test(val)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Please enter valid mother name',
				});
			}
			if (/\s{2,}/.test(val)) {
				ctx.addIssue({
				  code: z.ZodIssueCode.custom,
				  message: "Invalid Mother name: Consecutive spaces are not allowed",
				});
			  }
		}),	
		isTWFS: z.string().optional(),
		birthDate: z.string().nonempty({ message: 'Please enter the Date of Birth' }),
		cbirthDate: z.string().nonempty({ message: 'Please enter the Date of Birth' }),
		gender: z.string().nonempty({ message: 'Fill the Gender' }),
		confirmGender: z.string().nonempty({ message: 'Fill the Gender' }),
		isOrphan: z.string().nonempty({ message: 'Fill the Orphan ' }),
		annualIncome: z.string().nonempty({ message: 'Please enter the Annual Income Code' }),
		religionId: z.string().nonempty({ message: 'Please enter the Religion' }),
		motherTongue: z.string().nonempty({ message: 'Please enter the Mother Tongue' }),
		isMinority: z.string().optional(),
		isReligiousMinorityStatus: z.boolean().optional(),
		isLinguisticMinority: z.boolean().optional(),
		linguisticMinorityId: z.string().optional(),
		religiousMinorityId: z.string().optional(),
		domicileCertificate: z.string().optional(),
		religiousMinorityDoc: z.string().optional(),
		linguisticMinorityDoc: z.string().optional(),

		areaType: z.string().nonempty('Please enter the Area'),
		address: z.string().nonempty({ message: 'Please enter the Address' }),
		stateId: z.string().min(1, 'Please Select the State'),
		districtId: z.string().min(1, 'Please Select the district'),
		talukaId: z.string().min(1, 'Please Select the Taluka'),
		villageId: z.string().min(1, 'Please Select the Village'),
		pinCode: z
			.string()
			.nonempty({ message: 'Please enter the PIN Code' })
			.min(6, 'Please enter the valid PIN Code')
			.max(6, 'Please enter the valid PIN Code'),

		teliphoneNo2: z.string().optional(),
		teliphoneNo1: z.string().optional(),
		std1: z.string().optional(),
		std2: z.string().optional(),


		passportNo:z.string().optional(),

	
		
		passportValid:z.string().optional(),

		passportIssue:z.string().optional(),

	
		visaValid:z.string().optional(),

		visaIssue:z.string().optional(),
		

	
		visaNo:z.string().optional(),
	})

	.refine(
		(input) => {
		const income = Number(input.annualIncome);
		
        if (income >= 1 && income <= 15 && input.isTWFS == '') {
          return  false;
        }

        return true;
		},
		{
			message: 'Please select TWFS',
			path: ['isTWFS'],
		}
	)

	.refine(
		(input) => {
			if ((Number(input.mastercandidatetype_id) == 2)&&(input.passportNo == '') ) {
				return false;
			}
			return true;
		},
		{
			message: 'Please enter the Application number',
			path: ['passportNo'],
		}
	)
	.refine(
		(input) => {
			if (input.mastercandidatetype_id === 11 && (input.passportIssue) == ''){ return false;}

			return true;
		},
		{
			message: 'Please enter the Cet Roll No',
			path: ['passportIssue'],
		}
	)
	.refine(
		(input) => {
			if (input.mastercandidatetype_id === 11 && (input.passportIssue) == ''){ return false;}

			return true;
		},
		{
			message: 'Please enter the Cet Roll No',
			path: ['passportIssue'],
		}
	)
	
	  

	

	.refine((data) => data.birthDate === data.cbirthDate, {
		message: "Birthdate don't match",
		path: ['cbirthDate'],
	})
	.refine((data) => data.gender === data.confirmGender, {
		message: "Gender don't match",
		path: ['confirmGender'],
	})
	.refine(
		(input) => {
			if (
				Number(input.isMinority) == 1 &&
				input.motherTongue != 8 &&
				input.isLinguisticMinority != true &&
				input.isReligiousMinorityStatus != true
			) {
				return false;
			}
			return true;
		},
		{
			message: 'Please enter the  any of the following',
			path: ['isLinguisticMinority'],
		}
	)
	.refine(
		(input) => {
			if (
				Number(input.isMinority) == 1 &&
				input.religionId != 1 &&
				input.isReligiousMinorityStatus != true &&
				input.isLinguisticMinority != true
			) {
				return false;
			}
			return true;
		},
		{
			message: 'Please enter the  any of the following',
			path: ['isReligiousMinorityStatus'],
		}
	)

	.refine(
		(input) => {
	
				if (
					Number(input.isMinority) == 1 && input.domicileCertificate !=1 && input.domicileCertificate !=2 && input.domicileCertificate !=3)
			 {
				return false;
			}
			return true;
		},
		{
			message: 'Please select the Domicile Document',
			path: ['domicileCertificate'],
		}
	)
	.refine(
		(input) => {
			if (
				Number(input.isMinority) == 1 &&
				input.isLinguisticMinority == true &&
				!input.linguisticMinorityId
			) {
				return false;
			}
			return true;
		},
		{
			message: 'Please select one of the following',
			path: ['linguisticMinorityId'],
		}
	)
	.refine(
		(input) => {
			if (
				Number(input.isMinority) == 1 &&
				input.isLinguisticMinority == true &&
				!input.linguisticMinorityDoc
			) {
				return false;
			}
			return true;
		},
		{
			message: 'Please select one of the following',
			path: ['linguisticMinorityDoc'],
		}
	)
	.refine(
		(input) => {
			if (
				Number(input.isMinority) == 1 &&
				input.isReligiousMinorityStatus == true &&
				!input.religiousMinorityId
			) {
				return false;
			}
			return true;
		},
		{
			message: 'Please select one of the following',
			path: ['religiousMinorityId'],
		}
	)
	.refine(
		(input) => {
			if (
				Number(input.isMinority) == 1 &&
				input.isReligiousMinorityStatus == true &&
				!input.religiousMinorityDoc
			) {
				return false;
			}
			return true;
		},
		{
			message: 'Please select one of the following',
			path: ['religiousMinorityDoc'],
		}
	)
	.refine(
		(input) => {
			if (
				Number(input.isMinority) == 1 &&
				input.mastercandidatetype_id > 2 || Number(input.isMinority) == 1 &&  Number(input.religionId) == 1 &&
				Number(input.motherTongue) == 8
			) {
				return false;
			}
			return true;
		},
		{
			message: 'Minority Candidature Type  is not acceptable',
			path: ['isMinority'],
		}
	).refine(
		(input) => {
			console.log(input, 'input');
			if (
				(input.motherTongue != 8 || input.religionId != 1) &&
				(!input.isMinority || Number(input.isMinority) == 0)
			) {
				return false;
			}
			return true;
		},
		{
			message: 'Please enter the  any of the following',
			path: ['isMinority'],
		}
	);
