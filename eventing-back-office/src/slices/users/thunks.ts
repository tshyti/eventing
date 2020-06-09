import axios from 'utils/axiosConfig';
import { AxiosResponse } from 'axios';
import { GetUsersRequest, GetUsersResponse } from './models';
import { loadingGetUsers, getUsersSuccess } from './usersSlice';

export default function getAllUsers(userRequest: GetUsersRequest) {
  return async (dispatch) => {
    dispatch(loadingGetUsers(true));
    try {
      const res: AxiosResponse<GetUsersResponse> = await axios.get('users', {
        params: userRequest,
      });
      dispatch(getUsersSuccess(res.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(loadingGetUsers(false));
    }
  };
}
