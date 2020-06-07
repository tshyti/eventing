import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsersSliceState } from './models';

const initialState: UsersSliceState = {
  userResponse: null,
  loading: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loadingGetUsers(state, action: PayloadAction<boolean>) {
      return { ...state, loading: action.payload };
    },
  },
});
