import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type Configurations,
  type ConfigurationsQuery,
  type GetConfigurations,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import configurationSchema from '../../../entities/schemas/configuration.js';
import type { Dispatch } from 'redux';
import type { FetchConfigurationsAction } from '../../types/index.js';

/**
 * Creates a thunk factory configured with the specified client to fetch all
 * configurations.
 *
 * @param getConfigurations - Get configurations client.
 *
 * @returns Thunk factory.
 */
const fetchConfigurationsFactory =
  (getConfigurations: GetConfigurations) =>
  (query?: ConfigurationsQuery, config?: Config) =>
  async (
    dispatch: Dispatch<FetchConfigurationsAction>,
  ): Promise<Configurations> => {
    try {
      dispatch({
        type: actionTypes.FETCH_CONFIGURATIONS_REQUEST,
      });

      const result = await getConfigurations(query, config);

      dispatch({
        type: actionTypes.FETCH_CONFIGURATIONS_SUCCESS,
        payload: normalize(result, [configurationSchema]),
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        type: actionTypes.FETCH_CONFIGURATIONS_FAILURE,
        payload: { error: errorAsBlackoutError },
      });
      throw errorAsBlackoutError;
    }
  };

export default fetchConfigurationsFactory;
