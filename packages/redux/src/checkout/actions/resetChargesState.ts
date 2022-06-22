import * as actionTypes from '../actionTypes';

/**
 * Reset the charges state.
 */
export default () => (dispatch: any) => {
  dispatch({
    type: actionTypes.RESET_CHARGES_STATE,
  });
};
