import { RESET_CHECKOUT } from '../actionTypes';

/**
 * Method responsible for resetting the checkout.
 *
 * @function reset
 * @memberof module:checkout/actions
 *
 * @returns {Function} - Thunk.
 */
export default () => dispatch => {
  dispatch({
    type: RESET_CHECKOUT,
  });
};
