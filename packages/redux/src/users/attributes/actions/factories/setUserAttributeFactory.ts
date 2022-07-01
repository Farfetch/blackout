import * as actionTypes from '../../actionTypes';
import {
  Config,
  PutUserAttribute,
  toBlackoutError,
  UserAttributeData,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

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
    data: UserAttributeData,
    config?: Config,
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
