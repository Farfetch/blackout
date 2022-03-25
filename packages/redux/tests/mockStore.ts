import configureStore from 'redux-mock-store';
import merge from 'lodash/merge';
import thunk from 'redux-thunk';

export const defaultContext = {
  cultureCode: 'en-GB',
  countryCode: 'US',
  currencyCode: 'USD',
};

export const getContext = () => defaultContext;

export const getInitialState = (reducer, override = {}) =>
  merge({}, reducer, override);

export const mockStore = (
  reducer,
  state,
  middlewares = [thunk.withExtraArgument({ getContext })],
) => configureStore(middlewares)(getInitialState(reducer, state));
