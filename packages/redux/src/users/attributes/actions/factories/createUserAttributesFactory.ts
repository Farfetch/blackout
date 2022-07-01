import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostUserAttribute,
  toBlackoutError,
  UserAttributeData,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Method responsible for creating an user attribute.
 *
 * @param postUserAttributes - Post user attribute client.
 *
 * @returns Thunk factory.
 */
export const createUserAttributesFactory =
  (postUserAttributes: PostUserAttribute) =>
  (userId: number, data: UserAttributeData, config?: Config) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({
        type: actionTypes.CREATE_USER_ATTRIBUTES_REQUEST,
      });

      const result = await postUserAttributes(userId, data, config);

      dispatch({
        type: actionTypes.CREATE_USER_ATTRIBUTES_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_USER_ATTRIBUTES_FAILURE,
      });

      throw error;
    }
  };
