import { createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../config/index';
import instance from '../../shared/providers/apiInstance';
const {
	API_Config: { record }
} = config;

export const action_record_create = createAsyncThunk(
	'record/create',
	async (body, { rejectWithValue }) => {
		try {
			const response = await instance.post(record.basePath, body, {
				headers: { 'content-type': 'multipart/form-data' }
			});
			const results = await response.data.data;
			return results;
		} catch (error) {
			if (error?.response?.data) return rejectWithValue(error.response.data);
		}
	}
);


export const action_record_getAllBySession = createAsyncThunk(
	'record/getAllBySession',
	async (sessionId, { dispatch, rejectWithValue }) => {
		try {
			const response = await instance.get(record.basePath + record.getAll(sessionId));
			const results = await response.data.data;
			return results;
		} catch (error) {
			if (error?.response?.data) return rejectWithValue(error.response.data);
		}
	}
);


export const action_record_deleteOne = createAsyncThunk('record/deleteOne', async ({ recordId, session }, { dispatch }) => {
	console.log(recordId);
	console.log(session);
	const response = await instance.delete(record.basePath + record.delete(recordId));
	const results = await response.data.data;
	dispatch(action_record_getAllBySession(session));
	return results;
});