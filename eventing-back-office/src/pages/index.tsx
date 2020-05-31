import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUsers } from 'slices/test/thunks';
import { RootState } from 'store';

export default function Home() {
  const num = useSelector<RootState>((state) => state.test);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return <h1>Hello world</h1>;
}
