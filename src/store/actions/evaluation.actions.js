import { createAsyncThunk } from '@reduxjs/toolkit';

import config from '../../config/index';
import { mapBodyToQueries } from '../../shared/helpers/properties';
import instance from '../../shared/providers/apiInstance';
import { action_diagnosis_getSessions } from './diagnosis.actions';
const {
	API_Config: { evaluation }
} = config;

export const action_evaluation_getAll = createAsyncThunk('evaluation/getAll', async childId => {
	const queries = mapBodyToQueries({ childId });
	const response = await instance.get(evaluation.basePath + evaluation.getAll + queries);
	const results = await response.data.data;
	return results;
});
export const action_evaluation_update = createAsyncThunk(
	'evaluation/update',
	async ({ userId, diagnosisId, childId, body }, { dispatch, rejectWithValue }) => {
		try {
			const response = await instance.patch(evaluation.basePath + evaluation.update, body);
			const results = await response.data.data;
			diagnosisId &&
				dispatch(action_diagnosis_getSessions({ userId: userId, childId: childId, diagnosisId: diagnosisId }));
			childId && dispatch(action_evaluation_getAll(childId));

			return results;
		} catch (error) {
			if (error?.response?.data) return rejectWithValue(error.response.data);
		}
	}
);

export const action_evaluation_update_phonetics = createAsyncThunk(
	'evaluation/update_phonetics',
	async ({ userId, diagnosisId, childId, body }, { dispatch, rejectWithValue }) => {
		try {
			const response = await instance.patch(evaluation.basePath + evaluation.updatePhonetics, body);
			const results = await response.data.data;
			diagnosisId &&
				dispatch(action_diagnosis_getSessions({ userId: userId, childId: childId, diagnosisId: diagnosisId }));
			childId && dispatch(action_evaluation_getAll(childId));

			return results;
		} catch (error) {
			if (error?.response?.data) return rejectWithValue(error.response.data);
		}
	}
);
export const action_evaluation_getResultScore = createAsyncThunk('evaluation/getResultScore', async session => {
	const queries = mapBodyToQueries({ session });

	const response = await instance.get(evaluation.basePath + evaluation.getResultScore + queries);
	const results = await response.data.data;
	return results;
});
export const action_evaluation_getResultGrammarScore = createAsyncThunk('evaluation/getResultGrammarScore', async body => {
	const queries = mapBodyToQueries({ session: body.session, childAgeInMonths: body.childAgeInMonths });
	const response = await instance.get(evaluation.basePath + evaluation.getResultGrammarScore + queries);
	const results = await response.data.data;
	return results;
});

export const action_evaluation_getDataToExport = createAsyncThunk('evaluation/getDataToExport', async body => {
	const queries = mapBodyToQueries( {childId: body.childId, diagnosticId: body.diagnosticId} );
	const response = await instance.get(evaluation.getEvaluationTestsByChild + queries);
	const results = await response.data.data;
	return results;
});

export const action_evaluation_getArticulations = createAsyncThunk('evaluation/articulations', async () => {
	const response = await instance.get(evaluation.basePath + evaluation.getArticulations );
	const results = await response.data.data;
	return results;
});