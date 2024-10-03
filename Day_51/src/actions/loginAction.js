import { AUTH_ACTION } from './action-defined';

export const login = (data) => {
  return {
    type: AUTH_ACTION.LOGIN,
    payload: data,
  };
};
