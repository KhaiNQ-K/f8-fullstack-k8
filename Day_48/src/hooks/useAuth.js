import { useEffect, useState } from 'react';
import { STORAGE_KEY } from '../constants/storage-key';

export const useAuth = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const userInfo = localStorage.getItem(STORAGE_KEY.USER);
    if (!userInfo) {
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
    }
  }, []);
  return isAuthenticated;
};
