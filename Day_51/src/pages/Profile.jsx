import { useAuth0 } from '@auth0/auth0-react';
import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
import LoadingIcon from '../components/LoadingIcon';
function Profile() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { logout, user } = useAuth0();
  const form = useRef();
  const { VITE_APP_EMAILJS_SERVICE_ID, VITE_APP_EMAILJS_TEMPLATE_ID, VITE_APP_EMAILJS_PUBLIC_KEY } =
    import.meta.env;
  const handleSendMail = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await emailjs.sendForm(
        VITE_APP_EMAILJS_SERVICE_ID,
        VITE_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        {
          publicKey: VITE_APP_EMAILJS_PUBLIC_KEY,
        }
      );
      toast.success('Email sent successfully');
      setMessage('');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center font-bold">
      <div className="w-[500px] shadow-sm shadow-[#0000003d] shadow-opacity-60  rounded-lg p-5  text-black flex  flex-col my-8">
        <div className="text-center mx-auto">
          <img src={user.picture} alt={user.name} className="w-[100px] rounded-full " />
        </div>
        <h2 className="mt-5 text-2xl font-bold text-center">Have a nice day {user.name} !</h2>
        <p className="mt-5 text-xl font-normal text-center">
          Email:{' '}
          <a href={`mailto:${user.email}`} className="text-blue-500">
            {user.email}
          </a>
        </p>
        <form ref={form} action="" onSubmit={handleSendMail}>
          <div className="mt-5 ">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className="w-full border-2 border-[#ccc] p-2 rounded-lg outline-none mt-2"
              placeholder="Enter your name"
              value={user.name}
              id="name"
              name="name"
            />
          </div>
          <div className="mt-5 ">
            <label htmlFor="name">Email:</label>
            <input
              type="email"
              className="w-full border-2 border-[#ccc] p-2 rounded-lg outline-none mt-2"
              placeholder="Enter your name"
              value={user.email}
              id="email"
              name="email"
            />
          </div>
          <div className="mt-5 ">
            <label htmlFor="name">Name:</label>
            <textarea
              name="message"
              id="message"
              className="w-full border-2 border-[#ccc] p-2 rounded-lg outline-none mt-2 resize-none h-[130px]"
              placeholder="Enter your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-center items-center flex-col text-xl">
            <button
              disabled={loading}
              className="mt-5 p-4 flex items-center gap-3 justify-center text-white bg-blue-400 rounded-lg w-full hover:transform hover:scale-90 transition-transform"
            >
              Send
              {loading && <LoadingIcon />}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={logout}
              className="mt-5 p-4 bg-[#ff4500] text-white rounded-lg w-full hover:transform hover:scale-90 transition-transform"
            >
              Log out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Profile.propTypes = {};

export default Profile;
