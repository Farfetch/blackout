import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../../package.json';
import {
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
} from '../actionTypes';
import { warnDeprecatedMethod } from '../../../helpers';

/**
 * @typedef {object} RefreshTokenData
 * @property {string} username - User's email.
 */

/**
 * @callback RefreshTokenThunkFactory
 * @param {RefreshTokenData} data - Details to refresh the user's validation token.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Refreshes the user's validation token.
 * To be used when the user went past the token's expiration date or
 * there was other kind of error validation the user's email.
 *
 * @function doRefreshToken
 * @memberof module:authentication/actions
 *
 * @deprecated Since version 1.x.x.
 * Will be deleted in version 2.0.0.
 * In case you need this behavior, use the doRefreshEmailToken method from
 * "@bw/core/authentication/redux".
 *
 * @param {Function} postRefreshToken - Post refresh token client.
 *
 * @returns {RefreshTokenThunkFactory} Thunk factory.
 */
export default postRefreshToken => (data, config) => async dispatch => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    '@farfetch/blackout-core/authentication/redux/doRefreshToken',
    '@farfetch/blackout-core/authentication/redux/doRefreshEmailToken',
  );

  dispatch({
    type: REFRESH_TOKEN_REQUEST,
  });

  try {
    await postRefreshToken(data, config);

    dispatch({
      type: REFRESH_TOKEN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: REFRESH_TOKEN_FAILURE,
    });

    throw error;
  }
};
