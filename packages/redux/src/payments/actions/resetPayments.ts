import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';
import type { ResetPaymentsAction } from '../types';

/**
 * Reset payments state and related entities to its initial value.
 */
const resetPayments =
  () =>
  (dispatch: Dispatch<ResetPaymentsAction>): void => {
    dispatch({
      type: actionTypes.RESET_PAYMENTS,
    });
  };

export default resetPayments;
