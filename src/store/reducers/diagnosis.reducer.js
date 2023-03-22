import { createSlice } from '@reduxjs/toolkit';
import {
	action_diagnosis_getAll,
	action_diagnosis_getInfo,
	action_diagnosis_getOneById,
	action_diagnosis_getGroups,
	action_diagnosis_getSessions,
	action_diagnosis_getDiagnosticContent,
	action_update_timer
} from '../actions';

const initialState = {
	diagnosticTestContent: [],
	diagnosisList: null,
	diagnostic: null,
	diagnosisInfo: null,
	diagnosisGroups: null,
	diagnosisSessions: null,
	seconds: 0
};

export const diagnosisReducersSplice = createSlice({
	name: 'diagnosis',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(action_diagnosis_getAll.fulfilled, (state, action) => {
				state.diagnosisList = action.payload;
			})
			.addCase(action_diagnosis_getOneById.fulfilled, (state, action) => {
				state.diagnostic = action.payload;
			})
			.addCase(action_diagnosis_getInfo.fulfilled, (state, action) => {
				state.diagnosisInfo = action.payload;
			})
			.addCase(action_diagnosis_getGroups.fulfilled, (state, action) => {
				state.diagnosisGroups = action.payload;
			})
			.addCase(action_diagnosis_getDiagnosticContent.fulfilled, (state, action) => {
				state.diagnosticTestContent = action.payload;
			})
			.addCase(action_diagnosis_getSessions.fulfilled, (state, action) => {
				state.diagnosisSessions = action.payload;
			})
			.addCase(action_update_timer.fulfilled, (state, action) => {
				state.seconds = action.payload;
			});
	}
});
export const selectSeconds = ({ GlobalDiagnosisState }) => GlobalDiagnosisState.seconds.payload;
export const selectDiagnosisSession = ({ GlobalDiagnosisState }) => GlobalDiagnosisState.diagnosisSessions;

export default diagnosisReducersSplice.reducer;
