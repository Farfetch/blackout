import * as actionTypes from '../../actionTypes.js';
import {
  type AccountSettings,
  type AccountSettingsQuery,
  type Config,
  type GetAccountSettings,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { buildAccountSettingsQuery } from '../../utils.js';
import type { Dispatch } from 'redux';
import type { FetchAccountSettingsAction } from '../../types/index.js';

/**
 * Creates a thunk factory configured with the specified client to fetch all
 * settings.
 *
 * @param getAccountSettings - Get account settings client.
 *
 * @returns Thunk factory.
 */
const fetchAccountSettingsFactory =
  (getAccountSettings: GetAccountSettings) =>
  (query?: AccountSettingsQuery, config?: Config) =>
  async (
    dispatch: Dispatch<FetchAccountSettingsAction>,
  ): Promise<AccountSettings> => {
    const hash = buildAccountSettingsQuery(query);

    try {
      dispatch({
        type: actionTypes.FETCH_ACCOUNT_SETTINGS_REQUEST,
        meta: { hash },
      });

      const result = await getAccountSettings(query, config);

      dispatch({
        type: actionTypes.FETCH_ACCOUNT_SETTINGS_SUCCESS,
        payload: result,
        meta: { hash },
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        type: actionTypes.FETCH_ACCOUNT_SETTINGS_FAILURE,
        payload: { error: errorAsBlackoutError },
        meta: { hash },
      });
      throw errorAsBlackoutError;
    }
  };

export default fetchAccountSettingsFactory;
