import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';
import type { SubAreaType } from '../types/subArea.types';

/**
 * Resets the specific sub-area or the general authentication area error if no
 * sub-area is specified.
 *
 * @param subArea - Subarea to be reset.
 */
const resetAuthentication =
  (subArea?: SubAreaType) =>
  (dispatch: Dispatch): void => {
    const actionName = subArea && (`RESET_${subArea}` as const);
    const type = actionName && actionTypes[actionName];

    if (subArea && type) {
      dispatch({
        type,
      });
    } else {
      dispatch({
        type: actionTypes?.RESET_AUTHENTICATION,
      });
    }
  };

export default resetAuthentication;
