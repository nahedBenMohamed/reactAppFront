import { createSlice } from '@reduxjs/toolkit';
import {
	action_evaluation_getAll,
	action_evaluation_getResultScore,
	action_evaluation_getDataToExport,
	action_evaluation_getArticulations,
	action_evaluation_getResultGrammarScore
} from '../actions';
const initialState = {
	analysesList: null,
	analysisResult: null,
	analysisScores: null,
	analysisGrammarScores: null,
	articulations: null
};

export const evaluationReducersSplice = createSlice({
	name: 'evaluation',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(action_evaluation_getAll.fulfilled, (state, action) => {
				state.analysesList = action.payload;
			})
			.addCase(action_evaluation_getResultScore.fulfilled, (state, action) => {
				state.analysisResult = action.payload;
			})
			.addCase(action_evaluation_getDataToExport.fulfilled, (state, action) => {
				state.analysisScores = action.payload;
			})
			.addCase(action_evaluation_getResultGrammarScore.fulfilled, (state, action) => {
				state.analysisGrammarScores = action.payload;
			});
	}
});

export const selectArticulations = ({ GlobalEvaluationState }) => GlobalEvaluationState.articulations;
export default evaluationReducersSplice.reducer;
