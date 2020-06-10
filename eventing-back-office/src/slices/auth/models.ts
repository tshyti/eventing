import ValidationFormError from 'utils/models/ValidationFormError';

export interface SliceState {
  user?: UserAuthDetails;
  userRequestFailed?: ValidationFormError;
  loadingLogin: boolean;
}

export interface UserAuthDetails {
  token: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface UserRequest {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  email: string;
  exp: number;
  family_name: string;
  iat: number;
  iss: string;
  nbf: number;
  role: string;
  unique_name: string;
}
