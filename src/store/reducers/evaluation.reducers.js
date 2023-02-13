import { createSlice } from '@reduxjs/toolkit';
import { action_evaluation_getAll, action_evaluation_getResultScore } from '../actions';
const initialState = {
	analysesList: null,
	analysisResult: null
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
			});
	}
});

export default evaluationReducersSplice.reducer;
