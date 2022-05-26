import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import country from '../../../entities/schemas/country';
import type { Config } from '@farfetch/blackout-client/types';
import type {
  Currencies,
  GetCountryCurrencies,
} from '@farfetch/blackout-client/locale/types';
import type { Dispatch } from 'redux';

/**
 * @param countryCode - Country identifier (ISO 3166-1 alpha-2) to find the currencies related.
 * @param config      - Custom configurations to send to the client instance.
 *
 * @returns Thunk to be dispatched to the redux store.
 */

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
        payload: { error: toError(error) },
        type: actionTypes.FETCH_COUNTRY_CURRENCIES_FAILURE,
      });

      throw error;
    }
  };

export default fetchCountryCurrenciesFactory;
