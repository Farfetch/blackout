import { mockStore } from './redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import React, { ReactNode } from 'react';
import type { StoreState } from '@farfetch/blackout-redux';

/**
 * Testing helper class to chain Providers as needed. Start by passing the original
 * component and calling the different returned wrapping function until all the
 * providers required for the test are in place. Finish the sequence with the
 * available render function.
 *
 * @param component - The component to be wrapped.
 *
 * @returns - Returns an object with available functions to wrap the component in different providers
 * as well as a render function.
 */
export const wrap = component => ({
  get component() {
    return component;
  },
  /**
   * Calls the @testing-library/react render method rendering the component and
   * returns it's results.
   *
   * @param options - The render options. Check rtl docs to find out more.
   *
   * @returns - The same return as the @testing-library/react's render method.
   */
  render(options = {}) {
    return render(component, options);
  },
  /**
   * Wraps the component in a Store Provider.
   *
   * @param state - The store's state.
   *
   * @returns - This helper class.
   */
  withStore(state = {}) {
    return wrap(<Provider store={mockStore(state)}>{component}</Provider>);
  },
});

export const withStore =
  (state: StoreState = {}): React.FC<{ children: ReactNode }> =>
  props =>
    <Provider store={mockStore(state)} {...props} />;
