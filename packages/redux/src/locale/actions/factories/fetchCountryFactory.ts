import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import country from '../../../entities/schemas/country';
import type {
  Country,
  GetCountry,
} from '@farfetch/blackout-client/locale/types';
import type { Dispatch } from 'redux';

/**
 * @param countryCode - Country identifier (ISO 3166-1 alpha-2).
 * @param config      - Custom configurations to send to the client instance.
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetch a specific country, by its country code.
 *
 * @param getCountry - Get country client.
 *
 * @returns Thunk factory.
 */
const fetchCountryFactory =
  (getCountry: GetCountry) =>
  (countryCode: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<Country> => {
    try {
      dispatch({
        meta: { countryCode },
        type: actionTypes.FETCH_COUNTRY_REQUEST,
      });

      const result = await getCountry(countryCode, config);

      dispatch({
        meta: { countryCode },
        payload: {
          ...normalize(result, country),
        },
        type: actionTypes.FETCH_COUNTRY_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { countryCode },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_COUNTRY_FAILURE,
      });

      throw error;
    }
  };

export default fetchCountryFactory;
