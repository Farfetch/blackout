import * as actionTypes from '../actionTypes';

/**
 * Resets the specific sub-area or the general authentication area error if no sub-area is specified.
 *
 *  @function doReset
 *
 * @memberof module:authentication/actions
 * @param {
 * ('LOGIN'
 * |'LOGOUT'
 * |'REGISTER'
 * |'PASSWORD_CHANGE'
 * |'PASSWORD_RESET'
 * |'PASSWORD_RECOVER'
 * |'VALIDATE_EMAIL'
 * |'REFRESH_TOKEN'
 * |'REFRESH_EMAIL_TOKEN')} [subArea] - Subarea to be reset.
 *
 * @returns {undefined}
 */
export default subArea => async dispatch => {
  const type = actionTypes[`${subArea}_RESET`];

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
