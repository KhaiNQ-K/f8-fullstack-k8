import { authApi } from '@/api/authApi';
import useStorage from '@/hooks/useStorage';
import { STORAGE_KEY } from '@/utils/storage-key';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext();
function AuthProvider({ children }) {
  const [authData, setAuthData] = useStorage(STORAGE_KEY.USER_INFO, null);
  const [loading, setLoading] = useState(false);
  const login = async (email) => {
    setLoading(true);
    try {
      const { data, code } = await authApi.login(email);
      if (data && code === 200) {
        toast.success('Đăng nhập thành công');
        setAuthData({
          apiKey: data.apiKey,
          userInfo: JSON.stringify({ email }),
        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setLoading(false); // Set loading to false once localStorage is checked
  }, []);
  return (
    <AuthContext.Provider value={{ authData, login, loading }}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
