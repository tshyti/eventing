import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ValidationFormError from 'utils/models/ValidationFormError';
import { SliceState, UserAuthDetails } from './models';

const initialState: SliceState = {
  user: {
    token: '',
    firstName: '',
    lastName: '',
    role: '',
  },
  userRequestFailed: null,
  loadingLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadingLogin(state, action: PayloadAction<boolean>) {
      return { ...state, loadingLogin: action.payload };
    },
    loginUserSuccess(state, action: PayloadAction<UserAuthDetails>) {
      return { ...state, user: action.payload, userRequestFailed: null };
    },
    loginUserFail(state, action: PayloadAction<ValidationFormError>) {
      return { ...state, userRequestFailed: action.payload };
    },
  },
});

export const {
  loadingLogin,
  loginUserSuccess,
  loginUserFail,
} = authSlice.actions;

export default authSlice.reducer;
