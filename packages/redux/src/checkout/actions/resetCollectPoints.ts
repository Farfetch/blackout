import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset collect points state.
 */
const resetCollectPoints = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_COLLECT_POINTS_STATE,
  });
};

export default resetCollectPoints;
