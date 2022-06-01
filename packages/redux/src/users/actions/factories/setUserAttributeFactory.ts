import {
  SET_USER_ATTRIBUTE_FAILURE,
  SET_USER_ATTRIBUTE_REQUEST,
  SET_USER_ATTRIBUTE_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';
import type {
  PutUserAttribute,
  UserAttributesData,
} from '@farfetch/blackout-client/users/types';

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
const setUserAttributeFactory =
  (putUserAttribute: PutUserAttribute) =>
  (
    userId: number,
    attributeId: string,
    data: UserAttributesData,
    config?: Record<string, unknown>,
  ) =>
  async (dispatch: Dispatch): Promise<number> => {
    dispatch({
      type: SET_USER_ATTRIBUTE_REQUEST,
    });

    try {
      const result = await putUserAttribute(userId, attributeId, data, config);

      dispatch({
        type: SET_USER_ATTRIBUTE_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: SET_USER_ATTRIBUTE_FAILURE,
      });

      throw error;
    }
  };

export default setUserAttributeFactory;
