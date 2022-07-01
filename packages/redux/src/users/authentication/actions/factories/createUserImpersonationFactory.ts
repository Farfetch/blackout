import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostUserImpersonation,
  PostUserImpersonationData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * @param data   - The impersonate data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates user impersonation.
 *
 * @param postUserImpersonation - Post user impersonation client.
 *
 * @returns Thunk factory.
 */
const createUserImpersonationFactory =
  (postUserImpersonation: PostUserImpersonation) =>
  (data: PostUserImpersonationData, config?: Config) =>
  async (dispatch: Dispatch): Promise<any> => {
    try {
      dispatch({
        type: actionTypes.CREATE_USER_IMPERSONATION_REQUEST,
      });
      const result = await postUserImpersonation(data, config);

      dispatch({
        payload: result,
        type: actionTypes.CREATE_USER_IMPERSONATION_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_USER_IMPERSONATION_FAILURE,
      });

      throw error;
    }
  };

export default createUserImpersonationFactory;
