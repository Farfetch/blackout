import { merge } from 'lodash-es';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import type { MockStore } from './types/index.js';

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

// The typings from `redux-mock-store` are incorrect for ESM
// but when running jest due to the way that babel-preset-env
// configures the babel-plugin-transform-modules-commonjs plugin,
// there is interop code that will pick up the default export correctly.
// So we just need to trick typescript that the type of `configureStore`
// is correct.
export const mockStore: MockStore = (
  reducer,
  state,
  middlewares = [thunk.withExtraArgument({ getContext })],
) =>
  (configureStore as unknown as typeof configureStore.default)(middlewares)(
    getInitialState(reducer, state),
  );
