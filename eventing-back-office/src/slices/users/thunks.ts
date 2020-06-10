import axios from 'utils/axiosConfig';
import { AxiosResponse } from 'axios';
import { message } from 'antd';
import {
  GetUsersRequest,
  GetUsersResponse,
  UpdateUserRequest,
  UpdateUserSuccessObject,
} from './models';
import {
  loadingTableState,
  loadingUpdateUser,
  getUsersSuccess,
  updateUserSuccess,
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
      message.success('Deleted Successfully');
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
    dispatch(loadingUpdateUser(true));
    try {
      await axios.put(`users/${userId}`, user);
      const updateUserObj: UpdateUserSuccessObject = {
        ...user,
        userRowIndex: userRowId,
      };
      dispatch(updateUserSuccess(updateUserObj));
    } finally {
      dispatch(loadingUpdateUser(false));
    }
  };
}
