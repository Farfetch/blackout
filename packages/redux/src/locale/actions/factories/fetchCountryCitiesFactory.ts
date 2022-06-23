import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import state from '../../../entities/schemas/state';
import type {
  Cities,
  GetCountryCities,
} from '@farfetch/blackout-client/locale/types';
import type { Dispatch } from 'redux';

/**
 * @param countryCode - Country identifier (ISO 3166-1 alpha-2) to find the cities related.
 * @param stateId     - State identifier to find the cities related.
 * @param config      - Custom configurations to send to the client instance.
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetch all cities from an specific country and state.
 *
 * @param getCountryCities - Get cities client.
 *
 * @returns Thunk factory.
 */
const fetchCountryCitiesFactory =
  (getCountryCities: GetCountryCities) =>
  (countryCode: string, stateId: number, config?: Config) =>
  async (dispatch: Dispatch): Promise<Cities> => {
    try {
      dispatch({
        meta: {
          countryCode,
          stateId,
        },
        type: actionTypes.FETCH_COUNTRY_CITIES_REQUEST,
      });

      const result = await getCountryCities(countryCode, stateId, config);
      const stateWithCities = {
        id: stateId,
        cities: result,
      };

      dispatch({
        meta: {
          countryCode,
          stateId,
        },
        payload: {
          ...normalize(stateWithCities, state),
        },
        type: actionTypes.FETCH_COUNTRY_CITIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: {
          countryCode,
          stateId,
        },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_COUNTRY_CITIES_FAILURE,
      });

      throw error;
    }
  };

export default fetchCountryCitiesFactory;
