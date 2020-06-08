import { useEffect, useRef } from 'react';

const useDidUpdate = () => {
  const isMountRef = useRef(false);
  useEffect(() => {
    isMountRef.current = true;
  }, []);
  return isMountRef.current;
};

export default useDidUpdate;
