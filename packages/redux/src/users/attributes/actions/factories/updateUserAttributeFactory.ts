import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PatchUserAttribute,
  type PatchUserAttributeData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

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
    config?: Config,
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.UPDATE_USER_ATTRIBUTE_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default updateUserAttributeFactory;
