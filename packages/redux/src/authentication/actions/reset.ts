import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';
import type { SubAreaType } from '../types/subArea.types';

/**
 * Resets the specific sub-area or the general authentication area error if no
 * sub-area is specified.
 *
 * @param subArea - Subarea to be reset.
 */
export default (subArea?: SubAreaType) =>
  (dispatch: Dispatch): void => {
    const actionName = subArea && (`${subArea}_RESET` as const);
    const type = actionName && actionTypes[actionName];

    if (subArea && type) {
      dispatch({
        type,
      });
    } else {
      dispatch({
        type: actionTypes?.AUTHENTICATION_RESET,
      });
    }
  };
