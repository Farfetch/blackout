import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetUserCredits,
  toBlackoutError,
  type User,
} from '@farfetch/blackout-client';
import { isEmpty } from 'lodash-es';
import type { Dispatch } from 'redux';

/**
 * Fetch user credits balance.
 *
 * @param getUserCredits - Get user credits client.
 *
 * @returns Thunk factory.
 */
const fetchUserCreditsFactory =
  (getUserCredits: GetUserCredits) =>
  (userId: User['id'], config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      const defaultZeroBalanceCredit = {
        currency: null,
        value: 0,
        formattedValue: null,
      };

      dispatch({
        type: actionTypes.FETCH_USER_CREDITS_REQUEST,
      });

      const result = await getUserCredits(userId, config);
      const credits = isEmpty(result[0]) ? [defaultZeroBalanceCredit] : result;

      dispatch({
        payload: { credits },
        type: actionTypes.FETCH_USER_CREDITS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_USER_CREDITS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchUserCreditsFactory;
