import {
  REMOVE_USER_ATTRIBUTE_FAILURE,
  REMOVE_USER_ATTRIBUTE_REQUEST,
  REMOVE_USER_ATTRIBUTE_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { DeleteUserAttribute } from '@farfetch/blackout-client/users/types';
import type { Dispatch } from 'redux';

/**
 * @param userId      - User's id to be filtered for.
 * @param attributeId - The attribute id to be filtered for.
 * @param config      - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Deletes a specific user attribute.
 *
 * @param deleteUserAttribute - Delete a specific user attribute.
 *
 * @returns Thunk factory.
 */
const removeUserAttributeFactory =
  (deleteUserAttribute: DeleteUserAttribute) =>
  (userId: number, attributeId: string, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch): Promise<number> => {
    try {
      dispatch({
        type: REMOVE_USER_ATTRIBUTE_REQUEST,
      });

      const result = await deleteUserAttribute(userId, attributeId, config);

      dispatch({
        type: REMOVE_USER_ATTRIBUTE_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: REMOVE_USER_ATTRIBUTE_FAILURE,
      });

      throw error;
    }
  };

export default removeUserAttributeFactory;
