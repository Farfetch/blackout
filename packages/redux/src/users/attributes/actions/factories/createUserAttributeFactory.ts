import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PostUserAttribute,
  toBlackoutError,
  type User,
  type UserAttributeData,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Method responsible for creating an user attribute.
 *
 * @param postUserAttribute - Post user attribute client.
 *
 * @returns Thunk factory.
 */
const createUserAttributesFactory =
  (postUserAttributes: PostUserAttribute) =>
  (userId: User['id'], data: UserAttributeData, config?: Config) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({
        type: actionTypes.CREATE_USER_ATTRIBUTE_REQUEST,
      });

      const result = await postUserAttributes(userId, data, config);

      dispatch({
        type: actionTypes.CREATE_USER_ATTRIBUTE_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.CREATE_USER_ATTRIBUTE_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default createUserAttributesFactory;
