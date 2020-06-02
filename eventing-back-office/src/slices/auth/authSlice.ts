import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceState, User, UserRequestFailed } from './models';

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
    loginUserSuccess(state, action: PayloadAction<User>) {
      return { ...state, user: action.payload, userRequestFailed: null };
    },
    loginUserFail(state, action: PayloadAction<UserRequestFailed>) {
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
