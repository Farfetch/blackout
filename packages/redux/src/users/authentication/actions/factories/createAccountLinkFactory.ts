import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PostAccountLink,
  type PostAccountLinkData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Merges social provider and Farfetch accounts.
 *
 * @param postAccountLink - Merges social provider and Farfetch accounts.
 *
 * @returns Thunk factory.
 */
const createAccountLinkFactory =
  (postAccountLink: PostAccountLink) =>
  (data: PostAccountLinkData, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.CREATE_ACCOUNT_LINK_REQUEST,
      });

      const result = await postAccountLink(data, config);
      const user = result;
      const userEntity = {
        entities: { user },
      };

      dispatch({
        payload: userEntity,
        type: actionTypes.CREATE_ACCOUNT_LINK_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.CREATE_ACCOUNT_LINK_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default createAccountLinkFactory;
