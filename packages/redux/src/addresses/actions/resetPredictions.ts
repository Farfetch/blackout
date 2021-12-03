import { RESET_PREDICTION } from '../actionTypes';
import type { Dispatch } from 'redux';
import type { ResetPredictionAction } from '../types';

/**
 * Method responsible for resetting predictions.
 *
 * @memberof module:addresses/actions
 *
 * @name resetPredictions
 *
 * @returns {Function} Thunk factory.
 */
export default () =>
  (dispatch: Dispatch<ResetPredictionAction>): void => {
    dispatch({
      type: RESET_PREDICTION,
    });
  };
