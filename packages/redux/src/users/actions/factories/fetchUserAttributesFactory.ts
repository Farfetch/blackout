import {
  FETCH_USER_ATTRIBUTES_FAILURE,
  FETCH_USER_ATTRIBUTES_REQUEST,
  FETCH_USER_ATTRIBUTES_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';
import type {
  GetUserAttributes,
  UserAttributesQuery,
  UserAttributesResponse,
} from '@farfetch/blackout-client/users/types';

/**
 * @typedef {object} GetUserAttributesQuery
 * @property {string} channelCode - Channel code.
 * @property {string} type - Possible value: Castle, Generic,
 * AddressPredictionProvider, FarfetchLogin.
 */

/**
 * @callback GetUserAttributesThunkFactory
 * @param {string} id - The user's id.
 * @param {GetUserAttributesQuery} [query] - Query parameters for fetching user attributes.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Get user attributes from user.
 *
 * @function doGetUserAttributes
 * @memberof module:users/actions
 *
 * @param {Function} getUserAttributes - Get user attributes client.
 *
 * @returns {GetUserAttributesThunkFactory} Thunk factory.
 */
const fetchUserAttributesFactory =
  (getUserAttributes: GetUserAttributes) =>
  (id: number, query?: UserAttributesQuery, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch): Promise<UserAttributesResponse> => {
    dispatch({
      type: FETCH_USER_ATTRIBUTES_REQUEST,
    });

    try {
      const result = await getUserAttributes(id, query, config);

      dispatch({
        payload: result,
        type: FETCH_USER_ATTRIBUTES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_USER_ATTRIBUTES_FAILURE,
      });

      throw error;
    }
  };

export default fetchUserAttributesFactory;
