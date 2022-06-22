import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';
import type { ResetPredictionAction } from '../types';

/**
 * Method responsible for resetting predictions.
 *
 * @returns Thunk factory.
 */
export default () =>
  (dispatch: Dispatch<ResetPredictionAction>): void => {
    dispatch({
      type: actionTypes.RESET_PREDICTION,
    });
  };
