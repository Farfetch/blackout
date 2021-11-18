import { RESET_PREDICTION } from '../actionTypes';

/**
 * Method responsible for resetting predictions.
 *
 * @function doResetPredictions
 * @memberof module:addresses/actions
 *
 * @returns {Function} Thunk factory.
 */
export default () => dispatch => {
  dispatch({
    type: RESET_PREDICTION,
  });
};
