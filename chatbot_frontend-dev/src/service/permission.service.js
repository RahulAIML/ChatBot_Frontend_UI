export function permisson(data) {
	let permission = {
		dashboard: true,
		print: true,
		scrutiny: false,
		form: false,
		message: true,
		password: true,
		acknowledgement: false,
		pMerit: false,
		fMerit: false,
		capOne: false,
		capTwo: false,
		capThree: false,
		capFour: false,
		allotOne: false,
		allotTwo: false,
		allotThree: false,
		allotFour: false,
		grivancy: false,
		seat: false,
		feedback: true,
		convertFee: false,
		optionFormConfirmation: false,
		seatAccepted: false,
		candidateOptionPrint: false,
		candidateSeatAcceptancePrint: false,
		cancelAdmission: false,
	};

	if (data?.mode == 1) {
		if (data?.lock_form == 0 && !data?.isCandidateinFinalMerit) {
			permission.form = true;
			if (data?.discrepancy != 1) {
				permission.scrutiny = true;
			}
		} else {
			permission.form = false;
		}
	} else {
		if (data?.isarcconfirmed == 0 && !data?.isCandidateinFinalMerit) {
			permission.form = true;
			if (data?.discrepancy != 1) {
				permission.scrutiny = true;
			}
		} else {
			permission.form = false;
		}
	}
	if (data?.isarcconfirmed == 1) {
		permission.acknowledgement = true;

		permission.scrutiny = false;
	}

	if (data?.mode == 1 && data?.isarcconfirmed == 1 && !data?.isCandidateinFinalMerit) {
		permission.grivancy = true;
	}
	// if (data?.mode == 1) {
	if (data?.isconvert_payment_status == 'N') {
		if (
			data.isconvert_fee > 0 &&
			data?.isconvert_paid_amt + data?.paid_amt + data?.diff_amt_paid < import.meta.env.VITE_CONVERT_MAX_AMT 
		) {
			permission.convertFee = true;
		}
	}
	// }

	if (data?.isCandidateinProMerit) {
		permission.pMerit = true;
	}
	if (data?.isCandidateinFinalMerit) {
		permission.fMerit = true;
	}
	if (data?.isCandidateCapRound1) {
		permission.capOne = true;
	}
	if (data?.isCandidateCapRound2) {
		permission.capTwo = true;
	}
	if (data?.isCandidateCapRound3) {
		permission.capThree = true;
	}
	if (data?.isCandidateCapRound4) {
		permission.capFour = true;
	  }
	if (data?.optionFormConfirmation) {
		permission.optionFormConfirmation = true;
	}

	if (data?.seatAccepted) {
		permission.seatAccepted = true;
	}
	if (data?.candidateOptionPrint) {
		permission.candidateOptionPrint = true;
	}
	if (data?.isCandidateAllotmentRound1) {
		permission.allotOne = true;
	}
	if (data?.isCandidateAllotmentRound2) {
		permission.allotTwo = true;
	}
	if (data?.isCandidateAllotmentRound3) {
		permission.allotThree = true;
	}
	if (data?.isCandidateAllotmentRound4) {
		permission.allotFour = true;
	  }
	if (data?.allowForSeat && !data?.cancelAdmission) {
		permission.seat = true;
	}

	if (data?.instituteReportDone) {
		permission.cancelAdmission = true;
	}

	if (data?.seatAcceptDetails) {
		permission.candidateSeatAcceptancePrint = true;
	}

	return permission;
}
