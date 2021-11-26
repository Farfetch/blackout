import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import country from '../../../entities/schemas/country';
import type { Config } from '@farfetch/blackout-client/types';
import type {
  Currencies,
  GetCountryCurrencies,
} from '@farfetch/blackout-client/locale/types';
import type { Dispatch } from 'redux';

/**
 * @callback FetchCountryCurrenciesThunkFactory
 *
 * @memberof module:locale/actions/factories
 *
 * @param {string} countryCode - Country identifier (ISO 3166-1 alpha-2) to find the currencies related.
 * @param {Object} [config] - Custom configurations to send to the client
 * instance.
 *
 * @returns {FetchCountryCurrenciesThunkFactory} Thunk to be dispatched to the redux store.
 */

/**
 * Fetch all currencies from a specific country.
 *
 * @memberof module:locale/actions/factories
 *
 * @param {Function} getCountryCurrencies - Get currencies client.
 *
 * @returns {FetchCountryCurrenciesThunkFactory} Thunk factory.
 */
const fetchCountryCurrenciesFactory =
  (getCountryCurrencies: GetCountryCurrencies) =>
  (countryCode: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<Currencies> => {
    dispatch({
      meta: { countryCode },
      type: actionTypes.FETCH_COUNTRY_CURRENCIES_REQUEST,
    });

    try {
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
        payload: { error },
        type: actionTypes.FETCH_COUNTRY_CURRENCIES_FAILURE,
      });

      throw error;
    }
  };

export default fetchCountryCurrenciesFactory;
