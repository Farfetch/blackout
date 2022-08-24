import configureStore from 'redux-mock-store';
import merge from 'lodash/merge';
import thunk from 'redux-thunk';
import type { MockStore } from './types';

export const defaultContext = {
  cultureCode: 'en-GB',
  countryCode: 'US',
  currencyCode: 'USD',
};

export const getContext = () => defaultContext;

export const getInitialState = (
  reducer: Record<string, unknown> | null,
  override = {},
) => merge({}, reducer, override);

export const mockStore: MockStore = (
  reducer,
  state,
  middlewares = [thunk.withExtraArgument({ getContext })],
) => configureStore(middlewares)(getInitialState(reducer, state));
