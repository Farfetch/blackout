import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset collect points state.
 */
const resetCollectPointsState = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_COLLECT_POINTS_STATE,
  });
};

export default resetCollectPointsState;
