import * as actionTypes from '../../../actionTypes.js';
import {
  type Closet,
  type Config,
  type GetUserClosets,
  toBlackoutError,
  type User,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchUserClosetsAction } from '../../types/actions.types.js';

/**
 * Method responsible for fetching the user closets.
 *
 * @param getUserClosets - Get user closets client.
 *
 * @returns Thunk factory.
 */
const fetchUserClosetsFactory =
  (getUserClosets: GetUserClosets) =>
  (userId: User['id'], config?: Config) =>
  async (dispatch: Dispatch<FetchUserClosetsAction>): Promise<Closet[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_USER_CLOSETS_REQUEST,
      });

      const result = await getUserClosets(userId, config);

      dispatch({
        type: actionTypes.FETCH_USER_CLOSETS_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_USER_CLOSETS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchUserClosetsFactory;
