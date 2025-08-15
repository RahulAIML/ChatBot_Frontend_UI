import { Dashboard } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuthenticated: 'disconnected',
	isInitialized: false,
	user: { fillStatus: 0, lockForm: 0, mode: 0,groupID:0 },
	permission: {
		dashboard: true,
		print: true,
		scrutiny: true,
		form: false,
		message: true,
		password: true,
		acknowledgement: false,
		pMerit: false,
		fMerit: true,
		capOne: false,
		capTwo: false,
		capThree: false,
		allotOne: false,
		allotTwo: false,
		allotThree: false,
		grivancy: false,
		seat: false,
		feedback: true,
		convertFee: false,
		optionFormConfirmation: false,
		seatAccepted: false,
		candidateOptionPrint: false,
		candidateSeatAcceptancePrint: false,
		cancelAdmission: false,
	},
	optionFormCompleteData: [],
	seatAcceptedData: null,
};

export const slice = createSlice({
	name: 'authState',
	initialState,
	reducers: {
		setAuthUserState: (_state, _action) => {
			const {
				user,
				isAuthenticated,
				isInitialized,
				permisson,
				optionFormCompleteData,
				seatAcceptedData,
			} = _action.payload;
			return {
				..._state,
				isAuthenticated: isAuthenticated,
				user: user,
				isInitialized: isInitialized,
				permission: permisson,
				optionFormCompleteData: optionFormCompleteData,
				seatAcceptedData: seatAcceptedData,
			};
		},
		updateReduxState: (_state, _action) => {
			const { user, isAuthenticated, isInitialized } = _action.payload;
			return {
				..._state,
				[_action.payload.key]: _action.payload.value,
			};
		},
		updateFillStatus: (state, action) => {
			state.user.fillStatus = action.payload;
		},
		updateLockForm: (state, action) => {
			state.user.lockForm = action.payload;
		},
		updateConvertFee: (state, action) => {
			state.permission.convertFee = action.payload;
		},
		logout: (_state, _action) => {
			localStorage.clear();
			return { ..._state, user: { fillStatus: 0, mode: 0 }, isAuthenticated: 'disconnected' };
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setAuthUserState,
	logout,
	updateReduxState,
	updateFillStatus,
	updateLockForm,
	updateConvertFee,
} = slice.actions;

export default slice.reducer;

export const getAuthState = (state) => state.auth;
