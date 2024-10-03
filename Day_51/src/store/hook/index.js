import { useContext, useReducer } from 'react';
import { StateContext } from '../StateProvider';

export const useDispatch = () => {
  const { dispatch } = useContext(StateContext);
  return dispatch;
};
export const useSelector = (callback) => {
  if (typeof callback !== 'function') throw new Error('Callback is not a function');
  const { state } = useContext(StateContext);
  return callback(state);
};
export const useReducerWithMiddleware = (reducer, initialState, middleware) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchThunk = (action) => {
    const store = {
      getState: () => state,
      dispatch,
    };
    const middlewareFn = middleware(store);
    if (typeof middlewareFn !== 'function') throw new Error('Middleware is not a function');
    middlewareFn(action);
    dispatch(action);
  };
  return [state, dispatchThunk];
};
