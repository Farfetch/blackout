import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type DeleteUserAttribute,
  toBlackoutError,
  type User,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Deletes a specific user attribute.
 *
 * @param deleteUserAttribute - Delete a specific user attribute.
 *
 * @returns Thunk factory.
 */
const removeUserAttributeFactory =
  (deleteUserAttribute: DeleteUserAttribute) =>
  (userId: User['id'], attributeId: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<number> => {
    try {
      dispatch({
        type: actionTypes.REMOVE_USER_ATTRIBUTE_REQUEST,
      });

      const result = await deleteUserAttribute(userId, attributeId, config);

      dispatch({
        type: actionTypes.REMOVE_USER_ATTRIBUTE_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.REMOVE_USER_ATTRIBUTE_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default removeUserAttributeFactory;
