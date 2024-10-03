import { useAuth } from '@/hooks/useAuth';
import { Box } from '@mui/material';
import LoginForm from '../LoginForm';
function Login() {
  const { login, loading } = useAuth();
  if (loading) return <div>loading</div>;
  const handleSubmit = (values) => {
    login(values);
  };
  return (
    <Box bgcolor="primary.main" className="flex justify-center items-center min-h-screen">
      <LoginForm onSubmit={handleSubmit} />
    </Box>
  );
}

Login.propTypes = {};

export default Login;
