import {
  CREATE_USER_IMPERSONATION_FAILURE,
  CREATE_USER_IMPERSONATION_REQUEST,
  CREATE_USER_IMPERSONATION_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';

/**
 * @typedef {object} PostUserImpersonationData
 * @property {string} username - User's email.
 * @property {string} password - User's password.
 * @property {string} impersonateeUserName - The user name to impersonate.
 */

/**
 * @callback PostUserImpersonationThunkFactory
 * @param {PostUserImpersonationData} data - The impersonate data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates user impersonation.
 *
 * @function createUserImpersonation
 * @memberof module:authentication/actions/factories
 *
 * @param {Function} postUserImpersonation - Post user impersonation client.
 *
 * @returns {PostUserImpersonationThunkFactory} Thunk factory.
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
    dispatch({
      type: CREATE_USER_IMPERSONATION_REQUEST,
    });

    try {
      const result = await postUserImpersonation(data, config);

      dispatch({
        payload: result,
        type: CREATE_USER_IMPERSONATION_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: CREATE_USER_IMPERSONATION_FAILURE,
      });

      throw error;
    }
  };
