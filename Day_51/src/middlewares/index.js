export const middleware = (store) => {
  const { dispatch } = store;
  return (action) => {
    if (typeof action === 'function') {
      action(dispatch, store.getState);
    }
  };
};
