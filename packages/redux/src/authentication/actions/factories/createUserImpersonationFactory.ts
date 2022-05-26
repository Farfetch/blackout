import {
  CREATE_USER_IMPERSONATION_FAILURE,
  CREATE_USER_IMPERSONATION_REQUEST,
  CREATE_USER_IMPERSONATION_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
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
export default (postUserImpersonation: any) =>
  (
    data: {
      username: string;
      password: string;
      impersonateeUserName: string;
    },
    config?: {
      [k: string]: any;
    },
  ) =>
  async (dispatch: Dispatch): Promise<any> => {
    try {
      dispatch({
        type: CREATE_USER_IMPERSONATION_REQUEST,
      });
      const result = await postUserImpersonation(data, config);

      dispatch({
        payload: result,
        type: CREATE_USER_IMPERSONATION_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: CREATE_USER_IMPERSONATION_FAILURE,
      });

      throw error;
    }
  };
