import * as actionTypes from '../../actionTypes';
import {
  Config,
  Country,
  GetCountry,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import country from '../../../entities/schemas/country';
import type { Dispatch } from 'redux';

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
