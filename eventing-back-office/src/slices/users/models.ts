export interface UsersSliceState {
  userResponse?: UserResponse;
  loading: boolean;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  organizationName?: string;
  createdOn: Date;
}

export interface UserResponse {
  firstIndex: number;
  lastIndex: number;
  maxItems: number;
  pageCount: number;
  result: User[];
  pageNumber: number;
  pageSize: number;
}
