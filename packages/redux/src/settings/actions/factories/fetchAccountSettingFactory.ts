import * as actionTypes from '../../actionTypes.js';
import {
  type AccountSetting,
  type Config,
  type GetAccountSetting,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchAccountSettingAction } from '../../types/index.js';

/**
 * Creates a thunk factory configured with the specified client to fetch a setting by id.
 *
 * @param getAccountSetting - Get account settings client.
 *
 * @returns Thunk factory.
 */
const fetchAccountSettingFactory =
  (getAccountSetting: GetAccountSetting) =>
  (settingId: AccountSetting['id'], config?: Config) =>
  async (
    dispatch: Dispatch<FetchAccountSettingAction>,
  ): Promise<AccountSetting> => {
    try {
      dispatch({
        type: actionTypes.FETCH_ACCOUNT_SETTING_REQUEST,
        meta: { id: settingId },
      });

      const result = await getAccountSetting(settingId, config);

      dispatch({
        type: actionTypes.FETCH_ACCOUNT_SETTING_SUCCESS,
        payload: result,
        meta: { id: settingId },
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        type: actionTypes.FETCH_ACCOUNT_SETTING_FAILURE,
        payload: { error: errorAsBlackoutError },
        meta: { id: settingId },
      });
      throw errorAsBlackoutError;
    }
  };

export default fetchAccountSettingFactory;
