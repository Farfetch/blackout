import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type PutUserDefaultPersonalId,
  type PutUserDefaultPersonalIdData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Updates the user preferences.
 *
 * @param putUserDefaultPersonalId - Update default personal id client.
 *
 * @returns Thunk factory.
 */
const setUserDefaultPersonalIdFactory =
  (putUserDefaultPersonalId: PutUserDefaultPersonalId) =>
  (userId: number, data: PutUserDefaultPersonalIdData, config: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.SET_USER_DEFAULT_PERSONAL_ID_REQUEST,
      });

      const result = await putUserDefaultPersonalId(userId, data, config);

      dispatch({
        type: actionTypes.SET_USER_DEFAULT_PERSONAL_ID_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.SET_USER_DEFAULT_PERSONAL_ID_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default setUserDefaultPersonalIdFactory;
