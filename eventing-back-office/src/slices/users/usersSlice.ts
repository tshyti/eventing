import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ValidationFormError from 'utils/models/ValidationFormError';
import {
  UsersSliceState,
  GetUsersResponse,
  UpdateUserSuccessObject,
  User,
  Role,
} from './models';

const initialState: UsersSliceState = {
  userResponse: null,
  loading: false,
  loadingSubmitForm: false,
  userModalVisible: false,
  haveAddedUser: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loadingTableState(state, action: PayloadAction<boolean>) {
      return { ...state, loading: action.payload };
    },
    loadingSubmitForm(state, action: PayloadAction<boolean>) {
      return { ...state, loadingSubmitForm: action.payload };
    },
    setUserModalVisible(state, action: PayloadAction<boolean>) {
      return { ...state, userModalVisible: action.payload };
    },
    getUsersSuccess(state, action: PayloadAction<GetUsersResponse>) {
      return { ...state, userResponse: action.payload, haveAddedUser: false };
    },
    getUserRolesSuccess(state, action: PayloadAction<Role[]>) {
      return { ...state, userRoles: action.payload };
    },
    createUserSuccess(state, action: PayloadAction<User>) {
      const userResult = [...state.userResponse.result];
      userResult.pop();
      userResult.unshift(action.payload);

      return {
        ...state,
        haveAddedUser: true,
        userModalVisible: false,
        userResponse: {
          ...state.userResponse,
          maxItems: state.userResponse.maxItems + 1,
          result: userResult,
        },
      };
    },
    createUserError(state, action: PayloadAction<ValidationFormError>) {
      return { ...state, createUserError: action.payload };
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
  loadingSubmitForm,
  setUserModalVisible,
  getUsersSuccess,
  getUserRolesSuccess,
  updateUserSuccess,
  createUserSuccess,
  createUserError,
} = usersSlice.actions;

export default usersSlice.reducer;
