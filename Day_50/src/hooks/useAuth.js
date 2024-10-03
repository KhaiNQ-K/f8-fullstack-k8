import { AuthContext } from '@/provider/AuthContext';
import { useContext } from 'react';

export const useAuth = () => {
  return useContext(AuthContext);
};
