import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type Configuration,
  type ConfigurationQuery,
  type GetConfiguration,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import configurationSchema from '../../../entities/schemas/configuration.js';
import type { Dispatch } from 'redux';
import type { FetchConfigurationAction } from '../../types/index.js';

/**
 * Creates a thunk factory configured with the specified client to fetch a
 * configuration by code.
 *
 * @param getConfiguration - Get configuration client.
 *
 * @returns Thunk factory.
 */
const fetchConfigurationFactory =
  (getConfiguration: GetConfiguration) =>
  (code: Configuration['code'], query?: ConfigurationQuery, config?: Config) =>
  async (
    dispatch: Dispatch<FetchConfigurationAction>,
  ): Promise<Configuration> => {
    try {
      dispatch({
        meta: { code },
        type: actionTypes.FETCH_CONFIGURATION_REQUEST,
      });

      const result = await getConfiguration(code, query, config);

      dispatch({
        meta: { code },
        payload: normalize(result, configurationSchema),
        type: actionTypes.FETCH_CONFIGURATION_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { code },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_CONFIGURATION_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchConfigurationFactory;
