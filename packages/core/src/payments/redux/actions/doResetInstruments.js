import { RESET_INSTRUMENTS } from '../actionTypes';

/**
 * Method responsible for resetting instruments.
 *
 * @function doResetInstruments
 * @memberof module:payments/actions
 *
 * @returns {Function} Thunk factory.
 */
export default () => dispatch => {
  dispatch({
    type: RESET_INSTRUMENTS,
  });
};
