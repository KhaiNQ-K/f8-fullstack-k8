import { toast } from 'react-toastify';
import LoginForm from './components/LoginForm';
import { loginApi } from '../../api/loginApi';
import { STORAGE_KEY } from '../../constants/storage-key';

function Login() {
  const handleSubmitForm = async (payload) => {
    try {
      const { data, message, code } = await loginApi.login(payload);
      if (data && code === 200) {
        localStorage.setItem(STORAGE_KEY.USER, JSON.stringify({ email: payload }));
        localStorage.setItem(STORAGE_KEY.API_KEY, JSON.stringify(data.apiKey));
        toast.success(message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      toast.error('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại');
    }
  };
  return (
    <main className="  bg-[#6b7280] w-full min-h-screen flex justify-center items-center">
      <LoginForm onSubmit={handleSubmitForm} />
    </main>
  );
}

Login.propTypes = {};

export default Login;
