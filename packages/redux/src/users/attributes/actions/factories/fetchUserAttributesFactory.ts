import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetUserAttributes,
  type GetUserAttributesQuery,
  toBlackoutError,
  type UserAttribute,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Get user attributes from user.
 *
 * @param getUserAttributes - Get user attributes client.
 *
 * @returns Thunk factory.
 */
const fetchUserAttributesFactory =
  (getUserAttributes: GetUserAttributes) =>
  (id: number, query?: GetUserAttributesQuery, config?: Config) =>
  async (dispatch: Dispatch): Promise<UserAttribute[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_USER_ATTRIBUTES_REQUEST,
      });

      const result = await getUserAttributes(id, query, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_USER_ATTRIBUTES_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_USER_ATTRIBUTES_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchUserAttributesFactory;
