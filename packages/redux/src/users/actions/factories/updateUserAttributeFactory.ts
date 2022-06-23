import * as actionTypes from '../../actionTypes';
import { toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type {
  PatchUserAttribute,
  PatchUserAttributeData,
} from '@farfetch/blackout-client/users/attributes/types';

/**
 * @param userId      - User's id to be filtered for.
 * @param attributeId - The attribute id to be filtered for.
 * @param data        - User attribute data.
 * @param config      - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Updates a specific user attribute.
 *
 * @param patchUserAttribute - Update a specific user attribute.
 *
 * @returns Thunk factory.
 */
const updateUserAttributeFactory =
  (patchUserAttribute: PatchUserAttribute) =>
  (
    userId: number,
    attributeId: string,
    data: PatchUserAttributeData[],
    config?: Record<string, unknown>,
  ) =>
  async (dispatch: Dispatch): Promise<number> => {
    try {
      dispatch({
        type: actionTypes.UPDATE_USER_ATTRIBUTE_REQUEST,
      });

      const result = await patchUserAttribute(
        userId,
        attributeId,
        data,
        config,
      );

      dispatch({
        type: actionTypes.UPDATE_USER_ATTRIBUTE_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.UPDATE_USER_ATTRIBUTE_FAILURE,
      });

      throw error;
    }
  };

export default updateUserAttributeFactory;
