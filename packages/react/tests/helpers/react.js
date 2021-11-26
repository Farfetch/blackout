import { mockStore } from './redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import React from 'react';

/**
 * Testing helper class to chain Providers as needed.
 * Start by passing the original component and calling the different returned
 * wrapping function until all the providers required for the test are in place.
 * Finish the sequence with the available render function.
 *
 * @param {ReactElement} component - The component to be wrapped.
 *
 * @returns {object} - Returns an object with available functions to wrap the component
 * in different providers as well as a render function.
 */
export const wrap = component => ({
  get component() {
    return component;
  },
  /**
   * Calls the @testing-library/react render method rendering the
   * component and returns it's results.
   *
   * @param {object} options - The render options. Check rtl docs to find out more.
   *
   * @returns {object} - The same return as the @testing-library/react's render method.
   */
  render(options = {}) {
    return render(component, options);
  },
  /**
   * Wraps the component in a Store Provider.
   *
   * @param {object} state - The store's state.
   *
   * @returns {this} - This helper class.
   */
  withStore(state = {}) {
    return wrap(<Provider store={mockStore(state)}>{component}</Provider>);
  },
});
