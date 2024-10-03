import { login } from '../actions/loginAction';
const requestLogin = (data) => {};
export const fetchAuth = (data) => {
  return (dispatch) => {
    dispatch(login(data));
  };
};
