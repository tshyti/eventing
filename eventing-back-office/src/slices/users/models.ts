export interface UsersSliceState {
  userResponse?: GetUsersResponse;
  loading: boolean;
  error?: any;
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
