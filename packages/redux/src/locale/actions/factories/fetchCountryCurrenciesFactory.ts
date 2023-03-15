import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type Currency,
  type GetCountryCurrencies,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import country from '../../../entities/schemas/country';
import type { Dispatch } from 'redux';
import type { FetchCountryCurrenciesAction } from '../../types';

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
  async (
    dispatch: Dispatch<FetchCountryCurrenciesAction>,
  ): Promise<Currency[]> => {
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { countryCode },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_COUNTRY_CURRENCIES_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchCountryCurrenciesFactory;
