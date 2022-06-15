import {
  FETCH_USER_ATTRIBUTE_FAILURE,
  FETCH_USER_ATTRIBUTE_REQUEST,
  FETCH_USER_ATTRIBUTE_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Dispatch } from 'redux';
import type {
  GetUserAttribute,
  UserAttributesResponse,
} from '@farfetch/blackout-client/users/types';

/**
 * @param id          - The user's id.
 * @param attributeId - The attribute id.
 * @param config      - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Get a specific attribute from user.
 *
 * @param getUserAttribute - Get a specific attribute client.
 *
 * @returns Thunk factory.
 */
const fetchUserAttributeFactory =
  (getUserAttribute: GetUserAttribute) =>
  (id: number, attributeId: string, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch): Promise<UserAttributesResponse> => {
    try {
      dispatch({
        type: FETCH_USER_ATTRIBUTE_REQUEST,
      });

      const result = await getUserAttribute(id, attributeId, config);

      dispatch({
        payload: result,
        type: FETCH_USER_ATTRIBUTE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: FETCH_USER_ATTRIBUTE_FAILURE,
      });

      throw error;
    }
  };

export default fetchUserAttributeFactory;