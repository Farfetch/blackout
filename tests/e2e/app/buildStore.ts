import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import { type StoreState } from '@farfetch/blackout-redux';
import coreMiddlewares from './middlewares';
import coreReducer from './reducer';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (...args: any[]) => any;
  }
}

const buildStore = (initialState: StoreState) => {
  const reducer = combineReducers({
    ...coreReducer,
  });

  const middlewares = [...coreMiddlewares];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(...enhancers),
  );

  return store;
};

export default buildStore;
