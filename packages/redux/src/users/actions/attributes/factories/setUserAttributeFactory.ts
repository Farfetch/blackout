import * as actionTypes from '../../../actionTypes';
import { toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type {
  PutUserAttribute,
  UserAttributesData,
} from '@farfetch/blackout-client/src/users/attributes/types';

/**
 * @param userId      - User's id to be filtered for.
 * @param attributeId - The attribute id to be filtered for.
 * @param data        - User attributes object.
 * @param config      - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Updates a specific user attribute.
 *
 * @param putUserAttribute - Update a specific user attribute.
 *
 * @returns Thunk factory.
 */
export const setUserAttributeFactory =
  (putUserAttribute: PutUserAttribute) =>
  (
    userId: number,
    attributeId: string,
    data: UserAttributesData,
    config?: Record<string, unknown>,
  ) =>
  async (dispatch: Dispatch): Promise<number> => {
    try {
      dispatch({
        type: actionTypes.SET_USER_ATTRIBUTE_REQUEST,
      });

      const result = await putUserAttribute(userId, attributeId, data, config);

      dispatch({
        type: actionTypes.SET_USER_ATTRIBUTE_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.SET_USER_ATTRIBUTE_FAILURE,
      });

      throw error;
    }
  };
