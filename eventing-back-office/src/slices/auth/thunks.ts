import { AxiosError, AxiosResponse } from 'axios';
import { AppThunk } from 'store';
import axios from 'utils/axiosConfig';
import Router from 'next/router';
import { routeRedirectsFromLogin } from 'utils/routesConfig';
import RoleNamesEnum from 'utils/roleNamesEnum';
import { UserRequest, UserLoginResponse, UserAuthDetails } from './models';
import { loadingLogin, loginUserFail, loginUserSuccess } from './authSlice';

export function loginUser(payload: UserRequest): AppThunk {
  return async (dispatch) => {
    dispatch(loadingLogin(true));
    try {
      const res: AxiosResponse<string> = await axios.post(
        'auth/login',
        payload
      );

      const user = getUserObject(res.data);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch(loginUserSuccess(user));

      Router.replace(routeRedirectsFromLogin[RoleNamesEnum[user.role]]);
    } catch (e) {
      const {
        response: { data },
      } = e as AxiosError<{ [key: string]: string }>;

      const key = Object.keys(data)[0];
      dispatch(loginUserFail({ field: key, error: data[key] }));
    } finally {
      dispatch(loadingLogin(false));
    }
  };
}

function getUserObject(token: string): UserAuthDetails {
  const loginResponse = decodeJWT(token);
  return {
    firstName: loginResponse.unique_name,
    lastName: loginResponse.family_name,
    role: loginResponse.role,
    token,
  };
}

function decodeJWT(token: string): UserLoginResponse {
  return JSON.parse(window.atob(token.split('.')[1]));
}
