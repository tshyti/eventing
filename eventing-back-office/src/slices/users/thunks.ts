import axios from 'utils/axiosConfig';
import { AxiosResponse, AxiosError } from 'axios';
import { message } from 'antd';
import {
  GetUsersRequest,
  GetUsersResponse,
  CreateUserRequest,
  UpdateUserRequest,
  UpdateUserSuccessObject,
  User,
  Role,
} from './models';
import {
  loadingTableState,
  loadingSubmitForm,
  getUsersSuccess,
  updateUserSuccess,
  createUserSuccess,
  getUserRolesSuccess,
  createUserError,
} from './usersSlice';

// TODO: add error handling in axios interceptor
export function getAllUsers(userRequest: GetUsersRequest) {
  return async (dispatch) => {
    dispatch(loadingTableState(true));
    try {
      const users = await getUsersFromApi(userRequest);
      dispatch(getUsersSuccess(users));
    } finally {
      dispatch(loadingTableState(false));
    }
  };
}

async function getUsersFromApi(userRequest: GetUsersRequest) {
  const res: AxiosResponse<GetUsersResponse> = await axios.get('users', {
    params: userRequest,
  });
  return res.data;
}

export function getUserRoles() {
  return async (dispatch) => {
    try {
      const res: AxiosResponse<Role[]> = await axios.get('users/getroles');
      dispatch(getUserRolesSuccess(res.data));
    } finally {
    }
  };
}

export function deleteUser(
  userId: string,
  pageNumber: number,
  pageSize: number
) {
  return async (dispatch) => {
    dispatch(loadingTableState(true));
    try {
      await axios.delete(`users/${userId}`);
      const users = await getUsersFromApi({ pageNumber, pageSize });
      message.success('User Deleted Successfully');
      dispatch(getUsersSuccess(users));
    } finally {
      dispatch(loadingTableState(false));
    }
  };
}

export function updateUser(
  userId: string,
  user: UpdateUserRequest,
  userRowId: number
) {
  return async (dispatch) => {
    dispatch(loadingSubmitForm(true));
    try {
      await axios.put(`users/${userId}`, user);
      const updateUserObj: UpdateUserSuccessObject = {
        ...user,
        userRowIndex: userRowId,
      };
      dispatch(updateUserSuccess(updateUserObj));
      message.success(`User updated successfully`);
    } finally {
      dispatch(loadingSubmitForm(false));
    }
  };
}

export function createUser(createUserRequest: CreateUserRequest) {
  return async (dispatch) => {
    dispatch(loadingSubmitForm(true));
    try {
      const res: AxiosResponse<User> = await axios.post(
        'users',
        createUserRequest
      );
      dispatch(createUserSuccess(res.data));
    } catch (err) {
      const { response } = err as AxiosError;
      if (response.status == 409) {
        dispatch(
          createUserError({
            field: 'email',
            error: 'Email is already registered!',
          })
        );
      }
    } finally {
      dispatch(loadingSubmitForm(false));
    }
  };
}
