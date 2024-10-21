import { useSelector } from 'react-redux';

export const useAuth = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isLoggedIn = !!currentUser.email;
  return { currentUser, isLoggedIn };
};
