import PropTypes from 'prop-types';
import React from 'react';
import { middleware } from '../middlewares';
import { useReducerWithMiddleware } from './hook';
import { initialState, rootReducer } from './rootReducer';
export const StateContext = React.createContext();
function StateProvider({ children }) {
  const [state, dispatch] = useReducerWithMiddleware(rootReducer, initialState, middleware);
  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>;
}

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StateProvider;
