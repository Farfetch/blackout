import { RESET_CHARGES_STATE } from '../actionTypes';

/**
 * Reset the charges state.
 *
 * @memberof module:checkout/actions
 *
 * @name resetChargesState
 *
 * @returns {ResetChargesStateThunkFactory}
 */
export default () => (dispatch: any) => {
  dispatch({
    type: RESET_CHARGES_STATE,
  });
};
