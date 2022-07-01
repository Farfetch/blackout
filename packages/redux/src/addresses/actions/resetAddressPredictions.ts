import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';
import type { ResetAddressPredictionsAction } from '../types';

/**
 * Method responsible for resetting predictions.
 *
 * @returns Thunk factory.
 */
const resetAddressPredictions =
  () =>
  (dispatch: Dispatch<ResetAddressPredictionsAction>): void => {
    dispatch({
      type: actionTypes.RESET_ADDRESS_PREDICTIONS,
    });
  };

export default resetAddressPredictions;
