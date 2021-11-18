import { RESET_CHARGES } from '../actionTypes';

/**
 * Method responsible for resetting the charges.
 *
 * @function doResetCharges
 * @memberof module:checkout/actions
 *
 * @returns {Function} Thunk factory.
 */
export default () => dispatch => {
  dispatch({
    type: RESET_CHARGES,
  });
};
