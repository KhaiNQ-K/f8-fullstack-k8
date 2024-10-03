import { AUTH_ACTION } from '../actions/action-defined';
export const initialState = {
  auth: {
    user: {},
    loading: true,
  },
};
export const rootReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTION.LOGIN: {
      return {
        ...state,
        auth: {
          ...state.auth.user,
          user: action.payload,
        },
      };
    }
    case AUTH_ACTION.LOADING: {
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: false,
        },
      };
    }
    case AUTH_ACTION.LOGOUT: {
      return {
        ...state,
        auth: {},
      };
    }
    default:
      return state;
  }
};
