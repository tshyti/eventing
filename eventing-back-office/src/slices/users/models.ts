export interface UsersSliceState {
  userResponse?: GetUsersResponse;
  loading: boolean;
  loadingUpdateUser: boolean;
  error?: any;
}

export interface UpdateUserRequest {
  firstname: string;
  lastname: string;
  organizationName: string;
}

export interface UpdateUserSuccessObject extends UpdateUserRequest {
  userRowIndex: number;
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
  organizationName?: string;
  createdOn: Date;
}
