import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../components/Loading';

function Login() {
  const { loginWithPopup, isLoading } = useAuth0();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginWithPopup();
  };
  if (isLoading) return <Loading />;
  return (
    <div className="min-h-screen flex justify-center items-center font-bold">
      <form action="" onSubmit={handleSubmit}>
        <div className="w-[450px] bg-[#ff4500] rounded-lg p-5 text-center text-white">
          <h1 className="text-3xl ">Welcome to F8</h1>
          <p className="mt-2 ">Thanks for using F8&apos;s services</p>
          <p className="mt-2 text-xl w-[350px] text-center mx-auto">
            If you have any questions or help, log in and ask here!
          </p>
          <button className="mt-5 p-4 bg-white text-[#ff4500] rounded-lg w-[240px] hover:transform hover:scale-90 transition-transform ">
            Login || Register
          </button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {};

export default Login;
