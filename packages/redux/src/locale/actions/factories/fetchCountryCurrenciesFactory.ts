import * as actionTypes from '../../actionTypes';
import {
  Config,
  Currencies,
  GetCountryCurrencies,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import country from '../../../entities/schemas/country';
import type { Dispatch } from 'redux';

/**
 * Fetch all currencies from a specific country.
 *
 * @param getCountryCurrencies - Get currencies client.
 *
 * @returns Thunk factory.
 */
const fetchCountryCurrenciesFactory =
  (getCountryCurrencies: GetCountryCurrencies) =>
  (countryCode: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<Currencies> => {
    try {
      dispatch({
        meta: { countryCode },
        type: actionTypes.FETCH_COUNTRY_CURRENCIES_REQUEST,
      });

      const result = await getCountryCurrencies(countryCode, config);
      const countryWithCurrencies = {
        code: countryCode,
        currencies: result,
      };

      dispatch({
        meta: { countryCode },
        payload: {
          ...normalize(countryWithCurrencies, country),
        },
        type: actionTypes.FETCH_COUNTRY_CURRENCIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { countryCode },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_COUNTRY_CURRENCIES_FAILURE,
      });

      throw error;
    }
  };

export default fetchCountryCurrenciesFactory;
