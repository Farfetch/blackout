import { SET_PROMOCODE_RESET } from '../actionTypes';

/**
 * Method responsible for resetting the promocode.
 *
 * @function reset
 * @memberof module:checkout/actions
 *
 * @returns {Function} - Thunk.
 */
export default () => dispatch => {
  dispatch({
    type: SET_PROMOCODE_RESET,
  });
};
