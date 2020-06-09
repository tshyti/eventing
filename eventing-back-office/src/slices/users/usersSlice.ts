import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsersSliceState, GetUsersResponse } from './models';

const initialState: UsersSliceState = {
  userResponse: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loadingTableState(state, action: PayloadAction<boolean>) {
      return { ...state, loading: action.payload };
    },
    getUsersSuccess(state, action: PayloadAction<GetUsersResponse>) {
      return { ...state, userResponse: action.payload };
    },
  },
});

export const { loadingTableState, getUsersSuccess } = usersSlice.actions;

export default usersSlice.reducer;
