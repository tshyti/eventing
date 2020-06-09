import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  UsersSliceState,
  GetUsersResponse,
  UpdateUserRequest,
  UpdateUserSuccessObject,
} from './models';

const initialState: UsersSliceState = {
  userResponse: null,
  loading: false,
  loadingUpdateUser: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loadingTableState(state, action: PayloadAction<boolean>) {
      return { ...state, loading: action.payload };
    },
    loadingUpdateUser(state, action: PayloadAction<boolean>) {
      return { ...state, loadingUpdateUser: action.payload };
    },
    getUsersSuccess(state, action: PayloadAction<GetUsersResponse>) {
      return { ...state, userResponse: action.payload };
    },
    updateUserSuccess(state, action: PayloadAction<UpdateUserSuccessObject>) {
      const {
        userRowIndex,
        firstname,
        lastname,
        organizationName,
      } = action.payload;

      const userResult = [...state.userResponse.result];
      userResult[userRowIndex] = {
        ...userResult[userRowIndex],
        firstname,
        lastname,
        organizationName,
      };

      return {
        ...state,
        userResponse: { ...state.userResponse, result: userResult },
      };
    },
  },
});

export const {
  loadingTableState,
  loadingUpdateUser,
  getUsersSuccess,
  updateUserSuccess,
} = usersSlice.actions;

export default usersSlice.reducer;
