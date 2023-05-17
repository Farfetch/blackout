import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// The typings from `redux-mock-store` are incorrect for ESM
// but when running jest due to the way that babel-preset-env
// configures the babel-plugin-transform-modules-commonjs plugin,
// there is interop code that will pick up the default export correctly.
// So we just need to trick typescript that the type of `configureStore`
// is correct.
const store = (configureStore as unknown as typeof configureStore.default)([
  thunk,
]);

export const mockStore = (state: unknown) => store(state);
