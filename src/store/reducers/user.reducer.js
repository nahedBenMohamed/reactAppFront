import { createSlice } from '@reduxjs/toolkit';
import { action_user_getAllChild } from '../actions';
const initialState = {
	childList: null
};

export const userReducersSplice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(action_user_getAllChild.fulfilled, (state, action) => {
			state.childList = action.payload;
		});
	}
});

export default userReducersSplice.reducer;
