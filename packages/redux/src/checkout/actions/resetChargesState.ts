import { RESET_CHARGES_STATE } from '../actionTypes';

/**
 * Reset the charges state.
 */
export default () => (dispatch: any) => {
  dispatch({
    type: RESET_CHARGES_STATE,
  });
};
