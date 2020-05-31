import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type sliceState = {
  token: string;
  firstName: string;
  lastName: string;
};

const initialState: sliceState = {
  token: 'testtest',
  firstName: '',
  lastName: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUser(state, action: PayloadAction<sliceState>) {
      return { ...action.payload };
    },
  },
});

export const { saveUser } = authSlice.actions;

export default authSlice.reducer;
