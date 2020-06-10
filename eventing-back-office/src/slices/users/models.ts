import ValidationFormError from 'utils/models/ValidationFormError';

export interface UsersSliceState {
  userResponse?: GetUsersResponse;
  userRoles?: Role[];
  loading: boolean;
  loadingSubmitForm: boolean;
  haveAddedUser: boolean;
  userModalVisible: boolean;
  createUserError?: ValidationFormError;
}

export interface Role {
  id: string;
  name: string;
}

export interface UpdateUserRequest {
  firstname: string;
  lastname: string;
  organizationName: string;
}

export interface UpdateUserSuccessObject extends UpdateUserRequest {
  userRowIndex: number;
}

export interface CreateUserRequest {
  roleId: string;
  organizationName: string;
  firstname: string;
  lastname: string;
  email: string;
}

export interface GetUsersRequest {
  pageNumber: number;
  pageSize: number;
}

export interface GetUsersResponse {
  firstIndex: number;
  lastIndex: number;
  maxItems: number;
  pageCount: number;
  result: User[];
  pageNumber: number;
  pageSize: number;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  organizationName?: string;
  createdOn: Date;
}
