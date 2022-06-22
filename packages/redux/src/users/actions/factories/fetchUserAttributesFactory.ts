import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Dispatch } from 'redux';
import type {
  GetUserAttributes,
  UserAttributesQuery,
  UserAttributesResponse,
} from '@farfetch/blackout-client/users/types';

/**
 * @param id     - The user's id.
 * @param query  - Query parameters for fetching user attributes.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Get user attributes from user.
 *
 * @param getUserAttributes - Get user attributes client.
 *
 * @returns Thunk factory.
 */
const fetchUserAttributesFactory =
  (getUserAttributes: GetUserAttributes) =>
  (id: number, query?: UserAttributesQuery, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch): Promise<UserAttributesResponse> => {
    try {
      dispatch({
        type: actionTypes.FETCH_USER_ATTRIBUTES_REQUEST,
      });

      const result = await getUserAttributes(id, query, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_USER_ATTRIBUTES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.FETCH_USER_ATTRIBUTES_FAILURE,
      });

      throw error;
    }
  };

export default fetchUserAttributesFactory;
