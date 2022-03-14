import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';
import type { SubAreaType } from '../types/subArea.types';

/**
 * Resets the specific sub-area or the general authentication area error if no sub-area is specified.
 *
 *  @function doReset
 *
 * @memberof module:authentication/actions
 * @param {
 * ('LOGIN'
 * |'LOGOUT'
 * |'PASSWORD_CHANGE'
 * |'PASSWORD_RECOVER'
 * |'PASSWORD_RESET'
 * |'REGISTER'
 * |'VALIDATE_EMAIL'
 * |'REFRESH_EMAIL_TOKEN'
 * |'DELETE_USER_TOKEN'
 * |'DELETE_USER_IMPERSONATION'
 * |'CREATE_USER_IMPERSONATION'
 * |'CREATE_USER_TOKEN'
 * |'CREATE_CLIENT_CREDENTIALS_TOKEN'
 * |'REFRESH_USER_TOKEN')} [subArea] - Subarea to be reset.
 *
 * @returns {undefined}
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
