import * as actionTypes from '../../../actionTypes';
import { toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type {
  GetUserAttribute,
  UserAttributesResponse,
} from '@farfetch/blackout-client/src/users/attributes/types';

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
export const fetchUserAttributeFactory =
  (getUserAttribute: GetUserAttribute) =>
  (id: number, attributeId: string, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch): Promise<UserAttributesResponse> => {
    try {
      dispatch({
        type: actionTypes.FETCH_USER_ATTRIBUTE_REQUEST,
      });

      const result = await getUserAttribute(id, attributeId, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_USER_ATTRIBUTE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_USER_ATTRIBUTE_FAILURE,
      });

      throw error;
    }
  };
