import { AppThunk } from 'store';
import { increment, decrement } from 'slices/test/testSlice';

export function fetchUsers(): AppThunk {
  return async (dispatch) => {
    try {
      const repoDetails = await fetch('https://reqres.in/api/users');
      dispatch(increment());
    } catch (err) {
      dispatch(decrement());
    }
  };
}
