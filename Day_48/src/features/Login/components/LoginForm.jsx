import PropTypes from 'prop-types';
import { useState } from 'react';

function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const handleSubmitForm = (e) => {
    e.preventDefault();
    onSubmit?.(email);
  };
  return (
    <div className="flex justify-center items-center bg- p-6 rounded-lg w-1/3 text-gray-600 bg-white">
      <form onSubmit={handleSubmitForm} className="w-full mx-auto">
        <h1 className="text-3xl mb-4 text-center">Login</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label ">
            Email
          </label>
          <input
            type="text"
            className="form-control border border-gray-300 w-full px-2 py-3 mt-4 rounded-lg outline-none font-medium"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email ?? ''}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary  w-full block mx-auto bg-teal-500 py-3 px-2 rounded-lg text-white hover:bg-teal-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
