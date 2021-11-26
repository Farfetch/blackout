import { RESET_PREDICTION } from '../actionTypes';

/**
 * Method responsible for resetting predictions.
 *
 * @memberof module:addresses/actions
 *
 * @name resetPredictions
 *
 * @returns {Function} Thunk factory.
 */
export default () => dispatch => {
  dispatch({
    type: RESET_PREDICTION,
  });
};
