import axios from 'utils/axiosConfig';
import { AxiosResponse } from 'axios';
import { message } from 'antd';
import { GetUsersRequest, GetUsersResponse } from './models';
import { loadingTableState, getUsersSuccess } from './usersSlice';

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
