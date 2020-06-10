import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  UsersSliceState,
  GetUsersResponse,
  UpdateUserSuccessObject,
} from './models';

const initialState: UsersSliceState = {
  userResponse: null,
  loading: false,
  loadingUpdateUser: false,
  userModalVisible: false,
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
    setUserModalVisible(state, action: PayloadAction<boolean>) {
      return { ...state, userModalVisible: action.payload };
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
        userModalVisible: false,
      };
    },
  },
});

export const {
  loadingTableState,
  loadingUpdateUser,
  setUserModalVisible,
  getUsersSuccess,
  updateUserSuccess,
} = usersSlice.actions;

export default usersSlice.reducer;
