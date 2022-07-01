import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetUserAttributes,
  GetUserAttributesQuery,
  toBlackoutError,
  UserAttribute,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Get user attributes from user.
 *
 * @param getUserAttributes - Get user attributes client.
 *
 * @returns Thunk factory.
 */
export const fetchUserAttributesFactory =
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
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_USER_ATTRIBUTES_FAILURE,
      });

      throw error;
    }
  };
