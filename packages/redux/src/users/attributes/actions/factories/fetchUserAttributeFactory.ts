import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type GetUserAttribute,
  toBlackoutError,
  type UserAttribute,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Get a specific attribute from user.
 *
 * @param getUserAttribute - Get a specific attribute client.
 *
 * @returns Thunk factory.
 */
const fetchUserAttributeFactory =
  (getUserAttribute: GetUserAttribute) =>
  (id: number, attributeId: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<UserAttribute> => {
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_USER_ATTRIBUTE_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchUserAttributeFactory;
